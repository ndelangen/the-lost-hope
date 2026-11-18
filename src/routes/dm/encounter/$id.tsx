import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { Maximize2, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { z } from 'zod'

import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { AddCombatant } from '#/components/dm/encounter/add-combatant'
import { AddParty } from '#/components/dm/encounter/add-party'
import { CombatStatus, type CombatStatusActions } from '#/components/dm/encounter/combat-status'
import { CombatTable, type CombatantControls } from '#/components/dm/encounter/combat-table'
import { CombatantPanel, type UseActions } from '#/components/dm/encounter/combatant-panel'
import { EncounterDensity } from '#/components/dm/encounter/density'
import { DmScreen } from '#/components/dm/encounter/dm-screen'
import { EncounterNotes } from '#/components/dm/encounter/encounter-notes'
import { EncounterRoster, type RosterRow } from '#/components/dm/encounter/encounter-roster'
import { FocusToolbar } from '#/components/dm/encounter/focus-toolbar'
import { ActionButton } from '#/components/dm/encounter/icon-button'
import { InitiativeRail } from '#/components/dm/encounter/initiative-rail'
import { InitiativeRow } from '#/components/dm/encounter/initiative-row'
import { LegendaryRow, type LegendaryGroup } from '#/components/dm/encounter/legendary-row'
import { PartyStrip } from '#/components/dm/encounter/party-strip'
import { ConcentrationPrompt, TurnCard } from '#/components/dm/encounter/turn-card'
import { newEncounterId, useEncounterStore } from '#/components/dm/encounter/use-encounter-store'
import { SceneShipDamage } from '#/components/dm/scene-ship-damage'
import { resolveScene, resolveSourceRef, sceneShipUnderFire } from '#/lib/dm-campaign'
import { combatantView, currentParty, encounterCandidates } from '#/lib/dm-encounter'
import {
  LEGENDARY_POOL,
  abilityKey,
  addCondition,
  addCreature,
  addPc,
  addParty,
  addPlaceholder,
  adjustHp,
  advanceTurn,
  backUp,
  canStepBack,
  deathSave,
  findEncounter,
  liveStats,
  markDead,
  moveCombatant,
  recordLairAction,
  recharge,
  removeCombatant,
  removeCondition,
  resetCombatant,
  resetEncounter,
  setConcentration,
  setInLair,
  setStat,
  setUses,
  spendUse,
  startDying,
  stepTurn,
  updateEncounter as updateEncounterIn,
  remainingUses,
  type Encounter,
} from '#/lib/encounter'
import {
  concentrationDc,
  effectTriggerReminders,
  lairPrompts,
  startOfTurnReminders,
  type TurnNote,
} from '#/lib/encounter-combat'
import {
  DEFAULT_FOCUS_LAYOUT,
  FOCUS_LAYOUTS,
  focusShortcut,
  type FocusLayout,
} from '#/lib/encounter-focus'

const Search = z.strictObject({
  /** Combat focus: hide everything but what runs the fight. */
  combat: z.boolean().optional().catch(undefined),
  layout: z
    .enum(Object.keys(FOCUS_LAYOUTS) as [FocusLayout, ...FocusLayout[]])
    .optional()
    .catch(undefined),
})

export const Route = createFileRoute('/dm/encounter/$id')({
  validateSearch: Search,
  head: () => ({
    meta: [{ title: 'Encounter | DM' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: EncounterRoute,
})

function EncounterRoute() {
  const { id } = Route.useParams()
  const search = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const focused = search.combat === true
  const layout = search.layout ?? DEFAULT_FOCUS_LAYOUT
  const setFocus = (next: boolean) =>
    void navigate({
      search: (prev) => ({ ...prev, combat: next ? true : undefined }),
      replace: true,
      resetScroll: false,
    })
  const [store, update] = useEncounterStore()
  const [selected, setSelected] = useState<string>()
  const [openAbility, setOpenAbility] = useState<string>()
  const [openLegendary, setOpenLegendary] = useState<{ id: string; name: string }>()
  const candidates = useMemo(encounterCandidates, [])
  const party = useMemo(currentParty, [])
  const [expanded, setExpanded] = useState<string>()
  const [screenOpen, setScreenOpen] = useState(false)
  // What just happened at the last turn boundary, and reminders the DM has answered.
  const [turnNotes, setTurnNotes] = useState<TurnNote[]>([])
  const [answered, setAnswered] = useState<ReadonlySet<string>>(new Set())
  const [concentrationCheck, setConcentrationCheck] = useState<{ id: string; dc: number }>()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing = Boolean(target?.closest('input, textarea, select, [contenteditable="true"]'))
      const action = focusShortcut(event, { typing, focused, screenOpen })
      if (!action) return
      event.preventDefault()
      if (action === 'screen') setScreenOpen(true)
      else if (action === 'close-screen') setScreenOpen(false)
      else {
        setScreenOpen(false)
        setFocus(action === 'toggle' ? !focused : false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  if (!store) {
    return <p className="text-muted-foreground">Loading encounter…</p>
  }

  const encounter = findEncounter(store, id)
  if (!encounter) {
    return (
      <p className="text-muted-foreground">
        This encounter is not saved in this browser.{' '}
        <Link to="/dm/encounter" className="underline">
          See all encounters
        </Link>
      </p>
    )
  }
  const { values } = encounter
  const updateEncounter = (change: (current: Encounter) => Encounter) =>
    update((current) => updateEncounterIn(current, id, change))
  const scene = encounter.scene ? resolveScene(encounter.scene) : undefined
  const ship = scene ? sceneShipUnderFire(scene) : undefined
  const shipDamage =
    encounter.scene && ship
      ? {
          sceneKey: encounter.scene.key,
          ship,
          vesselName: resolveSourceRef(ship.vessel)?.name,
        }
      : undefined

  const combatants = encounter.roster.map((entry) => combatantView(entry, encounter.roster))
  const rows: RosterRow[] = combatants.map((combatant) => {
    const saved = values[combatant.id]
    const live = liveStats(combatant.start, saved)
    const down = combatant.tracked && combatant.kind !== 'PC' && live.hp === 0
    return {
      ...combatant,
      live,
      combat: {
        conditions: saved?.conditions ?? [],
        concentration: saved?.concentration,
        dying: saved?.dying,
        stable: saved?.stable,
        dead: saved?.dead,
        down,
        hp: live.hp,
      },
      out: Boolean(saved?.dead) || down,
    }
  })
  const nameOf = (rowId: string) => rows.find((row) => row.id === rowId)?.name ?? 'someone'
  const isOut = (rowId: string) => rows.find((row) => row.id === rowId)?.out ?? false
  const focusId =
    selected && combatants.some(({ id }) => id === selected) ? selected : encounter.active
  const focus = rows.find(({ id }) => id === focusId)

  const usesFor = (combatant: string): UseActions => ({
    use: (key, count) => updateEncounter((current) => spendUse(current, combatant, key, count)),
    recharge: (key, count) =>
      updateEncounter((current) => recharge(current, combatant, key, count)),
    setUses: (key, field, value) =>
      updateEncounter((current) => setUses(current, combatant, key, field, value)),
  })

  const legendary: LegendaryGroup[] = combatants.flatMap(({ id, name, stats, derived }) =>
    stats?.legendary && derived
      ? [
          {
            id,
            name,
            stats,
            block: derived,
            actions: stats.legendary.actions,
            pool: remainingUses(stats.legendary.uses, values[id], LEGENDARY_POOL)!,
          },
        ]
      : [],
  )

  const inspect = (id: string) => {
    setSelected(id)
    setOpenAbility(undefined)
  }

  const controlsFor = (row: RosterRow): CombatantControls => ({
    counts: Object.fromEntries(
      (row.stats?.abilities ?? []).map((ability) => {
        const key = abilityKey(ability.timing, ability.name)
        return [key, remainingUses(ability.uses, values[row.id], key)]
      }),
    ),
    actions: {
      ...usesFor(row.id),
      setStat: (field, value) =>
        updateEncounter((current) => setStat(current, row.id, field, value)),
      adjustHp: (delta) => {
        updateEncounter((current) => adjustHp(current, row.id, row.start, delta))
        // Damage to a concentrating creature calls for a save right away.
        if (delta < 0 && values[row.id]?.concentration)
          setConcentrationCheck({ id: row.id, dc: concentrationDc(-delta) })
      },
      reset: () => updateEncounter((current) => resetCombatant(current, row.id)),
      toggleAbility: (key) => setOpenAbility((current) => (current === key ? undefined : key)),
    },
  })

  const combatActionsFor = (rowId: string): CombatStatusActions => ({
    addCondition: (condition, duration) =>
      updateEncounter((current) =>
        addCondition(current, rowId, condition, duration, newEncounterId()),
      ),
    removeCondition: (conditionId) =>
      updateEncounter((current) => removeCondition(current, rowId, conditionId)),
    setConcentration: (on) => updateEncounter((current) => setConcentration(current, rowId, on)),
    startDying: () => updateEncounter((current) => startDying(current, rowId)),
    deathSave: (result, count) =>
      updateEncounter((current) => deathSave(current, rowId, result, count)),
    backUp: () => updateEncounter((current) => backUp(current, rowId)),
    markDead: (dead) => updateEncounter((current) => markDead(current, rowId, dead)),
  })

  const statusFor = (row: RosterRow) => (
    <CombatStatus
      name={row.name}
      isPc={row.kind === 'PC' || row.kind === 'Player'}
      state={row.combat}
      combatants={rows.map(({ id: rowId, name }) => ({ id: rowId, name }))}
      activeId={encounter.active}
      nameOf={nameOf}
      actions={combatActionsFor(row.id)}
      effects={row.effects}
      lair={
        row.stats?.lairActions
          ? {
              inLair: Boolean(values[row.id]?.inLair),
              onChange: (inLair) =>
                updateEncounter((current) => setInLair(current, row.id, inLair)),
            }
          : undefined
      }
    />
  )

  const step = (direction: 1 | -1) => {
    if (direction === 1) {
      const result = advanceTurn(encounter, {
        isOut,
        legendaryUses: (rowId) => rows.find((row) => row.id === rowId)?.stats?.legendary?.uses,
      })
      update((current) => updateEncounterIn(current, id, () => result.encounter))
      setTurnNotes(result.notes)
    } else {
      updateEncounter((current) => stepTurn(current, -1))
      setTurnNotes([])
    }
    setAnswered(new Set())
    setSelected(undefined)
    setOpenAbility(undefined)
    setExpanded(undefined)
  }

  const legendaryRow = (
    <LegendaryRow
      groups={legendary}
      open={openLegendary}
      onToggle={(owner, name) =>
        setOpenLegendary((current) =>
          current?.id === owner && current.name === name ? undefined : { id: owner, name },
        )
      }
      actionsFor={usesFor}
    />
  )

  const panelFor = (row: RosterRow) => {
    const { counts, actions } = controlsFor(row)
    return (
      <CombatantPanel
        combatant={row}
        isActive={row.id === encounter.active}
        live={row.live}
        counts={counts}
        openAbility={openAbility}
        actions={actions}
        status={statusFor(row)}
      />
    )
  }

  const activeRow = rows.find(({ id: rowId }) => rowId === encounter.active)
  const turnCard = activeRow ? (
    <TurnCard
      name={activeRow.name}
      nameOf={nameOf}
      notes={turnNotes}
      reminders={startOfTurnReminders({
        abilities: (activeRow.stats?.abilities ?? []).map((ability) => {
          const useKey = abilityKey(ability.timing, ability.name)
          return {
            useKey,
            name: ability.name,
            recharge: ability.recharge,
            count: remainingUses(ability.uses, values[activeRow.id], useKey),
          }
        }),
        values: values[activeRow.id],
      }).filter((reminder) => reminder.kind !== 'recharge' || !answered.has(reminder.useKey))}
      onRecharge={(useKey) => {
        const ability = activeRow.stats?.abilities.find(
          (candidate) => abilityKey(candidate.timing, candidate.name) === useKey,
        )
        const count = remainingUses(ability?.uses, values[activeRow.id], useKey)
        if (count) updateEncounter((current) => recharge(current, activeRow.id, useKey, count))
      }}
      onDismissRecharge={(useKey) => setAnswered((current) => new Set([...current, useKey]))}
      lair={
        // Initiative 20 comes before anyone acts: show it as the round starts.
        encounter.roster[0]?.id === encounter.active
          ? lairPrompts(
              rows.flatMap((row) =>
                row.stats?.lairActions && !row.out
                  ? [
                      {
                        id: row.id,
                        name: row.name,
                        inLair: Boolean(values[row.id]?.inLair),
                        actions: row.stats.lairActions,
                        lastLairAction: values[row.id]?.lastLairAction,
                      },
                    ]
                  : [],
              ),
              encounter.round,
            )
          : []
      }
      effectReminders={
        encounter.round === 1 && encounter.roster[0]?.id === encounter.active
          ? effectTriggerReminders(rows, 'encounterStart')
          : []
      }
      onLairAction={(combatant, key) =>
        updateEncounter((current) => recordLairAction(current, combatant, key))
      }
    />
  ) : null

  const checkTarget = concentrationCheck
    ? rows.find((row) => row.id === concentrationCheck.id)
    : undefined
  const concentrationPrompt =
    concentrationCheck && checkTarget ? (
      <ConcentrationPrompt
        name={checkTarget.name}
        on={checkTarget.combat.concentration?.on ?? ''}
        dc={concentrationCheck.dc}
        onKept={() => setConcentrationCheck(undefined)}
        onLost={() => {
          updateEncounter((current) => setConcentration(current, checkTarget.id, undefined))
          setConcentrationCheck(undefined)
        }}
      />
    ) : null

  if (focused) {
    return (
      <EncounterDensity value="focus">
        <div className="grid gap-3">
          <h1 className="sr-only">{encounter.name}, combat focus</h1>
          <FocusToolbar
            name={encounter.name}
            round={encounter.round}
            activeName={activeRow?.name}
            canStepBack={canStepBack(encounter)}
            canStep={rows.length > 0}
            layout={layout}
            onStep={step}
            onLayout={(next) =>
              void navigate({
                search: (prev) => ({ ...prev, layout: next }),
                replace: true,
                resetScroll: false,
              })
            }
            onExit={() => setFocus(false)}
            screenOpen={screenOpen}
            onToggleScreen={() => setScreenOpen((open) => !open)}
          />
          <DmScreen open={screenOpen} onClose={() => setScreenOpen(false)} />
          {scene ? <EncounterNotes sceneName={scene.name} notes={scene.combat} /> : null}
          {shipDamage?.vesselName ? (
            <SceneShipDamage
              sceneKey={shipDamage.sceneKey}
              vesselName={shipDamage.vesselName}
              ship={shipDamage.ship}
            />
          ) : null}
          <PartyStrip
            party={rows.filter((row) => row.kind === 'PC')}
            active={encounter.active}
            onInspect={inspect}
          />
          {concentrationPrompt}
          {turnCard}
          {legendaryRow}
          {layout === 'turn' ? (
            <div className="grid items-start gap-3 md:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[18rem_minmax(0,1fr)]">
              <InitiativeRail
                rows={rows}
                active={encounter.active}
                selected={focusId}
                onInspect={inspect}
              />
              {focus ? panelFor(focus) : null}
            </div>
          ) : (
            <CombatTable
              rows={rows}
              active={encounter.active}
              expanded={expanded}
              openAbility={openAbility}
              controlsFor={controlsFor}
              onExpand={(rowId, ability) => {
                setExpanded(rowId)
                setOpenAbility(ability)
              }}
            />
          )}
        </div>
      </EncounterDensity>
    )
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_12rem]">
      <div className="grid min-w-0 grid-cols-1 content-start gap-3">
        <header className="grid gap-1">
          <p className="text-muted-foreground text-xs">
            <Link to="/dm/encounter" className="hover:underline">
              Encounters
            </Link>
            {scene ? (
              <>
                {' · '}
                <Link
                  to="/dm/scenes/$slug"
                  params={{ slug: scene.slug }}
                  className="hover:underline"
                >
                  {scene.name}
                </Link>
              </>
            ) : null}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-3xl font-bold">{encounter.name}</h1>
            <div className="flex flex-wrap gap-3">
              <ActionButton
                onClick={() => {
                  if (window.confirm('Restore every combatant to full HP and uses?'))
                    updateEncounter(resetEncounter)
                }}
              >
                <RotateCcw aria-hidden /> Reset HP and uses
              </ActionButton>
              <ActionButton tone="primary" onClick={() => setFocus(true)} title="Combat focus (F)">
                <Maximize2 aria-hidden /> Focus
              </ActionButton>
            </div>
          </div>
        </header>

        <InitiativeRow
          combatants={combatants}
          active={encounter.active}
          selected={focusId}
          round={encounter.round}
          canStepBack={canStepBack(encounter)}
          onInspect={inspect}
          onMove={(id, toIndex) =>
            updateEncounter((current) => moveCombatant(current, id, toIndex))
          }
          onStep={step}
        />

        {concentrationPrompt}
        {turnCard}
        {legendaryRow}

        <div className="grid gap-3 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)]">
          <div className="grid content-start gap-3">
            <EncounterRoster
              rows={rows}
              active={encounter.active}
              selected={focusId}
              onInspect={inspect}
              onRemove={(id) => updateEncounter((current) => removeCombatant(current, id))}
            />
            <AddParty
              party={party}
              inRoster={
                new Set(
                  encounter.roster.flatMap((entry) =>
                    entry.kind === 'pc' ? [entry.source.key] : [],
                  ),
                )
              }
              onAdd={(pcs) => updateEncounter((current) => addParty(current, pcs))}
            />
            <AddCombatant
              candidates={candidates}
              onAdd={({ source }) =>
                updateEncounter((current) =>
                  source.ref === 'pc'
                    ? addPc(current, { ref: 'pc', key: source.key })
                    : addCreature(current, source),
                )
              }
              onAddPlaceholder={(label) =>
                updateEncounter((current) => addPlaceholder(current, label))
              }
            />
          </div>
          {focus ? (
            panelFor(focus)
          ) : (
            <p className="text-muted-foreground border-border rounded-xl border border-dashed p-6 text-sm">
              Add the party and combatants to start the encounter.
            </p>
          )}
        </div>
      </div>
      <aside className="min-w-0">
        <DmQuickLinks stackAt="xl" />
      </aside>
    </div>
  )
}
