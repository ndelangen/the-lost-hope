import { UserPlus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { resolveScene } from '#/lib/dm-campaign'
import {
  combatantView,
  creatureCandidate,
  currentParty,
  encounterCandidates,
  encounterDifficulty,
  presetScenes,
  sceneAllies,
  sceneEnemies,
  sceneFights,
  turnOrderInputs,
} from '#/lib/dm-encounter'
import {
  LEGENDARY_POOL,
  abilityKey,
  addCondition,
  adjustHp,
  applyEffect,
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
  removeEffect,
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
  type UseCount,
} from '#/lib/encounter'
import {
  concentrationDc,
  effectTriggerReminders,
  lairPrompts,
  startOfTurnReminders,
  type TurnNote,
} from '#/lib/encounter-combat'
import { focusShortcut, type EncounterDrawer } from '#/lib/encounter-focus'
import { enemyLetters } from '#/lib/player-turn-order'
import { cn } from '#/lib/utils'

import { AddEnemiesSheet } from './add-enemies-sheet'
import type { ApplyEffectActions } from './apply-effect'
import { CombatStatus, type CombatStatusActions } from './combat-status'
import { CombatantPanel, type CombatantActions, type UseActions } from './combatant-panel'
import { EncounterDensity } from './density'
import { DmScreen } from './dm-screen'
import { EncounterNotes, notedFields } from './encounter-notes'
import { EncounterToolbar } from './encounter-toolbar'
import { ActionButton } from './icon-button'
import { InitiativeRail, type RosterRow } from './initiative-rail'
import { LegendaryRow, type LegendaryGroup } from './legendary-row'
import { PresetPicker } from './preset-picker'
import { ConcentrationPrompt, TurnCard } from './turn-card'
import { newConditionId, useEncounter } from './use-encounter-store'

/**
 * The one running fight: the turn order, the current turn and the combatant in focus, with the
 * drawers to add to the fight, read the prep notes, or open the DM screen. Pages that run the fight
 * place it; it keeps its own fight state and shortcuts.
 */
export function LiveFight({
  beats,
}: {
  /** The page's beats beside the fight, shown and hidden from the fight's bar. */
  beats?: { shown: boolean; onToggle: () => void }
}) {
  const [encounter, update] = useEncounter()
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
  const [drawer, setDrawer] = useState<EncounterDrawer>()
  // What just happened at the last turn boundary, and reminders the DM has answered.
  const [turnNotes, setTurnNotes] = useState<TurnNote[]>([])
  const [answered, setAnswered] = useState<ReadonlySet<string>>(new Set())
  const [concentrationCheck, setConcentrationCheck] = useState<{ id: string; dc: number }>()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing = Boolean(target?.closest('input, textarea, select, [contenteditable="true"]'))
      const action = focusShortcut(event, { typing, open: drawer })
      if (!action) return
      event.preventDefault()
      setDrawer(action === 'close' ? undefined : action)
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
  const sceneRef = encounter.scene
  const joinedFights =
    scene && sceneRef
      ? sceneFights(scene).filter((fight) => encounter.joined[fightKey(sceneRef, fight.key)])
      : []
  const hasNotes = Boolean(
    scene && (notedFields(scene.combat).length > 0 || joinedFights.length > 0),
  )

  const combatants = encounter.roster.map((entry) => combatantView(entry, encounter.roster))
  const allies = scene ? sceneAllies(scene) : undefined
  const letters = enemyLetters(turnOrderInputs(encounter, allies))
  const rows: RosterRow[] = combatants.map((combatant) => {
    const saved = values[combatant.id]
    const live = liveStats(combatant.start, saved)
    const down = combatant.tracked && combatant.kind !== 'PC' && live.hp === 0
    return {
      ...combatant,
      live,
      combat: {
        conditions: saved?.conditions ?? [],
        appliedEffects: saved?.appliedEffects ?? [],
        concentration: saved?.concentration,
        dying: saved?.dying,
        stable: saved?.stable,
        dead: saved?.dead,
        down,
        hp: live.hp,
      },
      out: Boolean(saved?.dead) || down,
      letter: letters.get(combatant.id),
    }
  })
  const nameOf = (rowId: string) => rows.find((row) => row.id === rowId)?.name ?? 'someone'
  const abilityName = (rowId: string, key: string) =>
    rows.find((row) => row.id === rowId)?.stats?.abilities.find((ability) => ability.key === key)
      ?.name
  const applyEffects: ApplyEffectActions = {
    combatants: rows.map(({ id: rowId, name }) => ({ id: rowId, name })),
    activeId: encounter.active,
    apply: (targets, application, concentrate) =>
      updateEncounter((current) =>
        // Concentrating first ends whatever the caster held before, a casting of the same spell too.
        applyEffect(
          concentrate
            ? setConcentration(current, concentrate.caster, concentrate.on, concentrate.spell)
            : current,
          targets,
          application,
          newConditionId,
        ),
      ),
  }
  const isOut = (rowId: string) => rows.find((row) => row.id === rowId)?.out ?? false
  const difficulty = encounterDifficulty(encounter.roster, isOut, allies)
  const addEnemiesSheet = (
    <AddEnemiesSheet
      open={drawer === 'add'}
      onClose={() => setDrawer(undefined)}
      sceneName={scene?.name}
      sceneEnemies={scene ? sceneEnemies(scene).map(creatureCandidate) : []}
      candidates={enemyCandidates}
      budget={difficulty.budget}
      standingXp={difficulty.standingXp}
      activeName={rows.find((row) => row.id === encounter.active)?.name}
      party={party.filter(
        (member) => !encounter.roster.some((entry) => entry.id === `pc:${member.source.key}`),
      )}
      presets={
        <PresetPicker
          scenes={presetScenes(encounter.scene)}
          running={running}
          joinedOf={({ preset }) =>
            preset.fight ? (encounter.joined[fightKey(preset.scene, preset.fight)] ?? 0) : 0
          }
          onLoad={({ preset }, mode) => {
            updateEncounter((current) => loadPreset(current, preset, mode))
            setDrawer(undefined)
          }}
        />
      }
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

  const controlsFor = (
    row: RosterRow,
  ): { counts: Record<string, UseCount | undefined>; actions: CombatantActions } => ({
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
    removeEffect: (effectId) =>
      updateEncounter((current) => removeEffect(current, rowId, effectId)),
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
      applyEffects={{ ...applyEffects, id: row.id, abilityName }}
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
        applyEffects={applyEffects}
      />
    )
  }

  const activeRow = rows.find(({ id: rowId }) => rowId === encounter.active)
  const turnCard = activeRow ? (
    <TurnCard
      name={activeRow.name}
      nameOf={nameOf}
      // A save that already ended its effect has nothing left to ask.
      notes={turnNotes.filter(
        (note) =>
          note.kind !== 'effect-save' ||
          values[note.combatant]?.appliedEffects?.some(({ id }) => id === note.effect.id),
      )}
      abilityName={abilityName}
      onEndEffect={(rowId, effectId) =>
        updateEncounter((current) => removeEffect(current, rowId, effectId))
      }
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

  return (
    <EncounterDensity value="focus">
      <div className="@container grid gap-3">
        <h1 className="sr-only">{title}, encounter</h1>
        <EncounterToolbar
          name={title}
          sceneSlug={scene?.slug}
          round={encounter.round}
          activeName={activeRow?.name}
          running={running}
          canStepBack={canStepBack(encounter)}
          onStep={step}
          onAdd={() => setDrawer('add')}
          notesOpen={hasNotes ? drawer === 'notes' : undefined}
          onToggleNotes={() => setDrawer(drawer === 'notes' ? undefined : 'notes')}
          screenOpen={drawer === 'screen'}
          onToggleScreen={() => setDrawer(drawer === 'screen' ? undefined : 'screen')}
          onReset={() => {
            if (window.confirm('Restore every combatant to full HP and uses?'))
              updateEncounter(resetEncounter)
          }}
          onClear={() => {
            if (window.confirm('End this fight and clear everyone from it?'))
              updateEncounter(emptyEncounter)
          }}
          beats={beats}
        />
        <DmScreen open={drawer === 'screen'} onClose={() => setDrawer(undefined)} />
        {scene ? (
          <EncounterNotes
            open={drawer === 'notes'}
            onClose={() => setDrawer(undefined)}
            sceneName={scene.name}
            notes={scene.combat}
            fights={joinedFights}
          />
        ) : null}
        {addEnemiesSheet}
        {running ? (
          <div
            className={cn(
              'grid grid-cols-[minmax(0,1fr)] items-start gap-3 @2xl:grid-cols-[minmax(0,1fr)_17rem] @5xl:grid-cols-[minmax(0,1fr)_20rem]',
              // In dev the player-screen dock floats over the fight's bottom right; leave it room.
              import.meta.env.DEV && 'pb-16',
            )}
          >
            {/* Stacked, the turn order stays on top; side by side, it sits right of the fight. */}
            <InitiativeRail
              rows={rows}
              active={encounter.active}
              selected={focusId}
              onInspect={inspect}
              onMove={(id, toIndex) =>
                updateEncounter((current) => moveCombatant(current, id, toIndex))
              }
            />
            <div className="grid min-w-0 content-start gap-3 @2xl:order-first">
              {concentrationPrompt}
              {turnCard}
              {legendaryRow}
              {focus ? panelFor(focus) : null}
            </div>
          </div>
        ) : (
          <div className="border-border grid justify-items-center gap-4 rounded-2xl border-2 border-dashed p-12 text-center">
            <p className="text-xl font-semibold">Nobody is in the fight yet.</p>
            <p className="text-muted-foreground max-w-md">
              Load a prepared group from a scene, or pick the party and enemies yourself.
            </p>
            <ActionButton size="lg" tone="primary" onClick={() => setDrawer('add')}>
              <UserPlus aria-hidden /> Add to the fight
            </ActionButton>
          </div>
        )}
      </div>
    </EncounterDensity>
  )
}
