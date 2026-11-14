import { describe, expect, it } from 'vitest'

import {
  abilityKey,
  addCreature,
  addPc,
  addParty,
  addPlaceholder,
  adjustHp,
  canStepBack,
  createEncounter,
  deleteEncounter,
  duplicateEncounter,
  encounterForScene,
  findEncounter,
  renameEncounter,
  updateEncounter,
  combatantName,
  emptyStore,
  liveStats,
  moveCombatant,
  parseStore,
  recharge,
  removeCombatant,
  resetCombatant,
  resetEncounter,
  setStat,
  spendUse,
  stepTurn,
  remainingUses,
  type Encounter,
  type StartingStats,
  type EncounterStore,
} from './encounter'

const knight = { ref: 'npc', key: 'knight' } as const
const wolf = { ref: 'beast', key: 'wolf' } as const
/** Starting values a derived stat block supplies. */
const wolfStats: StartingStats = { maxHp: 24, ac: 14 }
const pounce = abilityKey('action', 'Pounce')

/** One NPC, two copies of one beast, and a player placeholder: the agreed local trial. */
function trial(): Encounter {
  const blank: Encounter = { id: 'trial', name: 'Trial', roster: [], round: 1, values: {} }
  return addPlaceholder(addCreature(addCreature(addCreature(blank, knight), wolf), wolf), 'Devan')
}

/** A store holding the trial encounter. */
function trialStore(): EncounterStore {
  return { ...emptyStore(), encounters: [trial()] }
}

describe('encounter roster', () => {
  it('gives each copy of one record its own combatant', () => {
    const { roster, active, round } = trial()
    expect(roster.map((entry) => entry.id)).toEqual([
      'npc:knight:1',
      'beast:wolf:1',
      'beast:wolf:2',
      'placeholder:1',
    ])
    expect(active).toBe('npc:knight:1')
    expect(round).toBe(1)
  })

  it('reuses the lowest free copy number', () => {
    const encounter = addCreature(removeCombatant(trial(), 'beast:wolf:1'), wolf)
    expect(encounter.roster.at(-1)?.id).toBe('beast:wolf:1')
  })

  it('adds each PC once', () => {
    const pc = { ref: 'pc', key: 'devan' } as const
    expect(
      addPc(addPc(trial(), pc), pc).roster.filter((entry) => entry.kind === 'pc'),
    ).toHaveLength(1)
  })

  it('numbers copies only when it disambiguates', () => {
    const { roster } = trial()
    expect(combatantName(roster[0]!, roster, 'Knight')).toBe('Knight')
    expect(combatantName(roster[2]!, roster, 'Wolf')).toBe('Wolf 2')
    expect(combatantName(roster[1]!, [roster[1]!], 'Wolf')).toBe('Wolf')
  })
})

describe('turn order', () => {
  it('wraps to the first entry and advances the round', () => {
    let encounter = trial()
    for (let step = 0; step < 4; step += 1) encounter = stepTurn(encounter, 1)
    expect(encounter).toMatchObject({ active: 'npc:knight:1', round: 2 })
    encounter = stepTurn(encounter, -1)
    expect(encounter).toMatchObject({ active: 'placeholder:1', round: 1 })
  })

  it('does not rewind before the first turn', () => {
    const encounter = trial()
    expect(canStepBack(encounter)).toBe(false)
    expect(stepTurn(encounter, -1)).toBe(encounter)
  })

  it('keeps the same combatant active when reordering', () => {
    const encounter = moveCombatant(stepTurn(trial(), 1), 'beast:wolf:1', 3)
    expect(encounter.roster.map((entry) => entry.id)).toEqual([
      'npc:knight:1',
      'beast:wolf:2',
      'placeholder:1',
      'beast:wolf:1',
    ])
    expect(encounter.active).toBe('beast:wolf:1')
  })

  it('hands the turn on when the active combatant is removed', () => {
    expect(removeCombatant(trial(), 'npc:knight:1').active).toBe('beast:wolf:1')
  })
})

describe('combatant values', () => {
  it('starts from the stat block and tracks each copy separately', () => {
    const encounter = adjustHp(trial(), 'beast:wolf:1', wolfStats, -7)
    expect(liveStats(wolfStats, encounter.values['beast:wolf:1'])).toEqual({
      hp: 17,
      maxHp: 24,
      ac: 14,
    })
    expect(liveStats(wolfStats, encounter.values['beast:wolf:2'])).toEqual({
      hp: 24,
      maxHp: 24,
      ac: 14,
    })
  })

  it('corrects damage and stops healing at maximum HP', () => {
    let encounter = adjustHp(trial(), 'w', wolfStats, -3)
    encounter = adjustHp(encounter, 'w', wolfStats, 10)
    expect(liveStats(wolfStats, encounter.values.w).hp).toBe(24)
    expect(adjustHp(encounter, 'w', wolfStats, -100).values.w?.hp).toBe(0)
  })

  it('lets the DM fill in missing stats', () => {
    const encounter = setStat(setStat(trial(), 'x', 'maxHp', 30), 'x', 'ac', 12)
    expect(liveStats(undefined, encounter.values.x)).toEqual({ hp: 30, maxHp: 30, ac: 12 })
    expect(setStat(encounter, 'x', 'maxHp', 0)).toBe(encounter)
  })

  it('spends uses and recharges only when the DM says so, regardless of turns', () => {
    const id = 'beast:wolf:1'
    let encounter = spendUse(trial(), id, pounce, remainingUses(1, undefined, pounce)!)
    expect(remainingUses(1, encounter.values[id], pounce)).toEqual({ uses: 0, maxUses: 1 })

    for (let step = 0; step < 8; step += 1) encounter = stepTurn(encounter, 1)
    expect(remainingUses(1, encounter.values[id], pounce)?.uses).toBe(0)

    encounter = recharge(encounter, id, pounce, remainingUses(1, encounter.values[id], pounce)!)
    expect(remainingUses(1, encounter.values[id], pounce)?.uses).toBe(1)
  })

  it('resets one combatant, or the whole encounter, to full HP and uses', () => {
    const hurt = spendUse(
      adjustHp(adjustHp(trial(), 'beast:wolf:1', wolfStats, -5), 'beast:wolf:2', wolfStats, -1),
      'beast:wolf:1',
      pounce,
      { uses: 1, maxUses: 1 },
    )
    const one = resetCombatant(hurt, 'beast:wolf:1')
    expect(liveStats(wolfStats, one.values['beast:wolf:1']).hp).toBe(24)
    expect(liveStats(wolfStats, one.values['beast:wolf:2']).hp).toBe(23)

    const all = resetEncounter(hurt)
    expect(all.values).toEqual({})
    expect(all.roster).toEqual(hurt.roster)
  })

  it('forgets a removed combatant’s values', () => {
    const encounter = removeCombatant(
      adjustHp(trial(), 'beast:wolf:1', wolfStats, -5),
      'beast:wolf:1',
    )
    expect(addCreature(encounter, wolf).values['beast:wolf:1']).toBeUndefined()
  })

  it('treats unlimited abilities as having no count', () => {
    expect(remainingUses(undefined, undefined, 'action:Bite')).toBeUndefined()
  })
})

describe('saved state', () => {
  it('survives a reload', () => {
    const store = updateEncounter(trialStore(), 'trial', (encounter) =>
      adjustHp(stepTurn(encounter, 1), 'beast:wolf:1', wolfStats, -2),
    )
    expect(parseStore(JSON.stringify(store))).toEqual(store)
  })

  it('starts empty when nothing valid is saved', () => {
    expect(parseStore(null)).toEqual(emptyStore())
    expect(parseStore('{not json')).toEqual(emptyStore())
    expect(parseStore('{"encounters":[],"values":{}}')).toEqual(emptyStore())
  })
})

describe('the party', () => {
  const party = ['devan', 'cassian', 'swift'].map((key) => ({ ref: 'pc', key }) as const)

  it('adds the whole party once, skipping PCs already in the roster', () => {
    const withDevan = addPc(trial(), party[0]!)
    const encounter = addParty(addParty(withDevan, party), party)
    expect(
      encounter.roster.filter((entry) => entry.kind === 'pc').map((entry) => entry.id),
    ).toEqual(['pc:devan', 'pc:cassian', 'pc:swift'])
  })

  it('adds part of the party', () => {
    const encounter = addParty(trial(), [party[1]!])
    expect(encounter.roster.at(-1)?.id).toBe('pc:cassian')
  })
})

describe('prepared encounters', () => {
  const ambush = { ref: 'scene', key: 'ambush' } as const

  it('keeps several encounters, each with its own roster and turn', () => {
    let store = createEncounter(trialStore(), {
      id: 'ambush',
      name: 'Ambush',
      scene: ambush,
      build: (encounter) => addCreature(encounter, wolf),
    })
    store = updateEncounter(store, 'trial', (encounter) => stepTurn(encounter, 1))
    expect(findEncounter(store, 'trial')?.active).toBe('beast:wolf:1')
    expect(findEncounter(store, 'ambush')).toMatchObject({
      name: 'Ambush',
      active: 'beast:wolf:1',
      round: 1,
      roster: [{ id: 'beast:wolf:1' }],
    })
    expect(encounterForScene(store, ambush)?.id).toBe('ambush')
  })

  it('renames, ignoring blank names', () => {
    const store = renameEncounter(trialStore(), 'trial', '  Bridge fight ')
    expect(findEncounter(store, 'trial')?.name).toBe('Bridge fight')
    expect(renameEncounter(store, 'trial', '  ')).toBe(store)
  })

  it('keeps HP separate per encounter', () => {
    let store = createEncounter(trialStore(), {
      id: 'other',
      name: 'Other',
      build: (encounter) => addCreature(encounter, wolf),
    })
    store = updateEncounter(store, 'trial', (encounter) =>
      adjustHp(encounter, 'beast:wolf:1', wolfStats, -9),
    )
    expect(liveStats(wolfStats, findEncounter(store, 'trial')?.values['beast:wolf:1']).hp).toBe(15)
    expect(liveStats(wolfStats, findEncounter(store, 'other')?.values['beast:wolf:1']).hp).toBe(24)
  })

  it('duplicates the roster and current HP, starting the copy from the first turn', () => {
    const played = updateEncounter(trialStore(), 'trial', (encounter) =>
      adjustHp(stepTurn(encounter, 1), 'beast:wolf:1', wolfStats, -4),
    )
    let store = duplicateEncounter(played, 'trial', 'copy')
    expect(store.encounters.map((encounter) => encounter.id)).toEqual(['trial', 'copy'])
    expect(findEncounter(store, 'copy')).toMatchObject({
      name: 'Trial (copy)',
      active: 'npc:knight:1',
      round: 1,
      values: { 'beast:wolf:1': { hp: 20 } },
    })
    expect(findEncounter(store, 'copy')?.roster).toEqual(findEncounter(store, 'trial')?.roster)

    store = updateEncounter(store, 'copy', (encounter) =>
      adjustHp(encounter, 'beast:wolf:1', wolfStats, -10),
    )
    expect(findEncounter(store, 'trial')?.values['beast:wolf:1']?.hp).toBe(20)
  })

  it('deletes an encounter', () => {
    expect(deleteEncounter(trialStore(), 'trial').encounters).toEqual([])
  })
})
