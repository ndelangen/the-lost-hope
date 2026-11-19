import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { Eraser, ListOrdered, Maximize2, RotateCcw, UserPlus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { z } from 'zod'

import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { AddCombatant } from '#/components/dm/encounter/add-combatant'
import { AddEnemiesSheet } from '#/components/dm/encounter/add-enemies-sheet'
import { AddParty } from '#/components/dm/encounter/add-party'
import { CombatStatus, type CombatStatusActions } from '#/components/dm/encounter/combat-status'
import { CombatTable, type CombatantControls } from '#/components/dm/encounter/combat-table'
import { CombatantPanel, type UseActions } from '#/components/dm/encounter/combatant-panel'
import { EncounterDensity } from '#/components/dm/encounter/density'
import { DmScreen } from '#/components/dm/encounter/dm-screen'
import { EncounterFights } from '#/components/dm/encounter/encounter-fights'
import { EncounterNotes } from '#/components/dm/encounter/encounter-notes'
import { EncounterRoster, type RosterRow } from '#/components/dm/encounter/encounter-roster'
import { FocusToolbar } from '#/components/dm/encounter/focus-toolbar'
import { ActionButton } from '#/components/dm/encounter/icon-button'
import { InitiativeRail } from '#/components/dm/encounter/initiative-rail'
import { InitiativeRow } from '#/components/dm/encounter/initiative-row'
import { LegendaryRow, type LegendaryGroup } from '#/components/dm/encounter/legendary-row'
import { PartyStrip } from '#/components/dm/encounter/party-strip'
import { ConcentrationPrompt, TurnCard } from '#/components/dm/encounter/turn-card'
import { newConditionId, useEncounter } from '#/components/dm/encounter/use-encounter-store'
import { SceneShipDamage } from '#/components/dm/scene-ship-damage'
import { usePlayerScreen } from '#/components/player-screen/use-player-screen'
import { resolveScene, resolveSourceRef, sceneShipUnderFire } from '#/lib/dm-campaign'
import {
  combatantView,
  creatureCandidate,
  currentParty,
  encounterCandidates,
  encounterDifficulty,
  fightPreset,
  sceneAllies,
  sceneEnemies,
  sceneFights,
} from '#/lib/dm-encounter'
import {
  LEGENDARY_POOL,
  abilityKey,
  addCondition,
  addCreature,
  addPc,
  addParty,
  addPlaceholder,
  adjustHp,
  bringIn,
  advanceTurn,
  backUp,
  canStepBack,
  deathSave,
  emptyEncounter,
  fightKey,
  isRunning,
  loadPreset,
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
import { cn } from '#/lib/utils'

const Search = z.strictObject({
  /** Combat focus: hide everything but what runs the fight. */
  combat: z.boolean().optional().catch(undefined),
  layout: z
    .enum(Object.keys(FOCUS_LAYOUTS) as [FocusLayout, ...FocusLayout[]])
    .optional()
    .catch(undefined),
})

export const Route = createFileRoute('/dm/encounter/')({
  validateSearch: Search,
  head: () => ({
    meta: [{ title: 'Encounter | DM' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: EncounterRoute,
})

function EncounterRoute() {
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
  const [encounter, update] = useEncounter()
  const [playerScreen, updatePlayerScreen] = usePlayerScreen()
  const [selected, setSelected] = useState<string>()
  const [openAbility, setOpenAbility] = useState<string>()
  const [openLegendary, setOpenLegendary] = useState<{ id: string; name: string }>()
  const candidates = useMemo(encounterCandidates, [])
  const enemyCandidates = useMemo(
    () =>
      candidates.flatMap(({ source }) => (source.ref === 'pc' ? [] : [creatureCandidate(source)])),
    [candidates],
  )
  const party = useMemo(currentParty, [])
  const [expanded, setExpanded] = useState<string>()
  const [screenOpen, setScreenOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  // What just happened at the last turn boundary, and reminders the DM has answered.
  const [turnNotes, setTurnNotes] = useState<TurnNote[]>([])
  const [answered, setAnswered] = useState<ReadonlySet<string>>(new Set())
  const [concentrationCheck, setConcentrationCheck] = useState<{ id: string; dc: number }>()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing = Boolean(target?.closest('input, textarea, select, [contenteditable="true"]'))
      const action = focusShortcut(event, { typing, focused, screenOpen: screenOpen || addOpen })
      if (!action) return
      event.preventDefault()
      if (action === 'add') {
        setScreenOpen(false)
        setAddOpen(true)
      } else if (action === 'screen') setScreenOpen(true)
      else if (action === 'close-screen') {
        setScreenOpen(false)
        setAddOpen(false)
      } else {
        setScreenOpen(false)
        setAddOpen(false)
        setFocus(action === 'toggle' ? !focused : false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  if (!encounter) {
    return <p className="text-muted-foreground">Loading encounter…</p>
  }

  const { values } = encounter
  const updateEncounter = (change: (current: Encounter) => Encounter) => update(change)
  const running = isRunning(encounter)
  const scene = encounter.scene ? resolveScene(encounter.scene) : undefined
  const title = scene?.name ?? 'Encounter'
  const ship = scene ? sceneShipUnderFire(scene) : undefined
  const shipDamage =
    encounter.scene && ship
      ? {
          sceneKey: encounter.scene.key,
          ship,
          vesselName: resolveSourceRef(ship.vessel)?.name,
        }
      : undefined

  const sceneRef = encounter.scene
  const fights =
    scene && sceneRef
      ? sceneFights(scene).map((fight) => ({
          ...fight,
          joined: encounter.joined[fightKey(sceneRef, fight.key)] ?? 0,
        }))
      : []
  const fightsPanel =
    scene && sceneRef && fights.length > 0 ? (
      <EncounterFights
        sceneName={scene.name}
        fights={fights}
        running={running}
        onLoad={(fight, mode) =>
          updateEncounter((current) => loadPreset(current, fightPreset(sceneRef, fight), mode))
        }
      />
    ) : null

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
  const difficulty = encounterDifficulty(
    encounter.roster,
    isOut,
    scene ? sceneAllies(scene) : undefined,
  )
  const openAddEnemies = () => {
    setScreenOpen(false)
    setAddOpen(true)
  }
  const addEnemiesSheet = (
    <AddEnemiesSheet
      open={addOpen}
      onClose={() => setAddOpen(false)}
      sceneName={scene?.name}
      sceneEnemies={scene ? sceneEnemies(scene).map(creatureCandidate) : []}
      candidates={enemyCandidates}
      budget={difficulty.budget}
      standingXp={difficulty.standingXp}
      activeName={rows.find((row) => row.id === encounter.active)?.name}
      party={party.filter(
        (member) => !encounter.roster.some((entry) => entry.id === `pc:${member.source.key}`),
      )}
      onAdd={(picks, pcs, arrival) =>
        updateEncounter((current) =>
          bringIn(
            current,
            picks.flatMap(({ source, count }) => Array.from({ length: count }, () => source)),
            arrival,
            pcs,
          ),
        )
      }
    />
  )
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
      remove: () => updateEncounter((current) => removeCombatant(current, row.id)),
      toggleAbility: (key) => setOpenAbility((current) => (current === key ? undefined : key)),
    },
  })

  const combatActionsFor = (rowId: string): CombatStatusActions => ({
    addCondition: (condition, duration) =>
      updateEncounter((current) =>
        addCondition(current, rowId, condition, duration, newConditionId()),
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
      update(() => result.encounter)
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
          <h1 className="sr-only">{title}, combat focus</h1>
          <FocusToolbar
            name={title}
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
            onToggleScreen={() => {
              setAddOpen(false)
              setScreenOpen((open) => !open)
            }}
            onAddEnemies={openAddEnemies}
            turnOrderShown={playerScreen.turnOrder}
            onToggleTurnOrder={() =>
              updatePlayerScreen((current) => ({ ...current, turnOrder: !current.turnOrder }))
            }
          />
          <DmScreen open={screenOpen} onClose={() => setScreenOpen(false)} />
          {addEnemiesSheet}
          {scene ? <EncounterNotes sceneName={scene.name} notes={scene.combat} /> : null}
          {fightsPanel}
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
          {scene ? (
            <p className="text-muted-foreground text-xs">
              From{' '}
              <Link to="/dm/scenes/$slug" params={{ slug: scene.slug }} className="hover:underline">
                {scene.name}
              </Link>
            </p>
          ) : null}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex flex-wrap gap-3">
              <ActionButton
                disabled={!running}
                onClick={() => {
                  if (window.confirm('End this fight and clear everyone from it?'))
                    updateEncounter(emptyEncounter)
                }}
              >
                <Eraser aria-hidden /> Clear the fight
              </ActionButton>
              <ActionButton
                onClick={() => {
                  if (window.confirm('Restore every combatant to full HP and uses?'))
                    updateEncounter(resetEncounter)
                }}
              >
                <RotateCcw aria-hidden /> Reset HP and uses
              </ActionButton>
              <ActionButton
                aria-pressed={playerScreen.turnOrder}
                onClick={() =>
                  updatePlayerScreen((current) => ({ ...current, turnOrder: !current.turnOrder }))
                }
                className={cn(playerScreen.turnOrder && 'border-amber-500 bg-amber-500/15')}
              >
                <ListOrdered aria-hidden /> Turn order on player screen
              </ActionButton>
              <ActionButton onClick={openAddEnemies} title="Add to the fight (A)">
                <UserPlus aria-hidden /> Add to fight
              </ActionButton>
              <ActionButton tone="primary" onClick={() => setFocus(true)} title="Combat focus (F)">
                <Maximize2 aria-hidden /> Focus
              </ActionButton>
            </div>
          </div>
        </header>

        {addEnemiesSheet}
        {fightsPanel}

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
