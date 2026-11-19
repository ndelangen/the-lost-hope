import { describe, expect, it } from 'vitest'

import {
  abilityKey,
  addCreature,
  addPc,
  addParty,
  addPlaceholder,
  adjustHp,
  bringIn,
  canStepBack,
  emptyEncounter,
  fightKey,
  isRunning,
  loadPreset,
  combatantName,
  liveStats,
  moveCombatant,
  parseEncounter,
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
} from './encounter'

const knight = { ref: 'npc', key: 'knight' } as const
const wolf = { ref: 'beast', key: 'wolf' } as const
/** Starting values a derived stat block supplies. */
const wolfStats: StartingStats = { maxHp: 24, ac: 14 }
const pounce = abilityKey('action', 'Pounce')

/** One NPC, two copies of one beast, and a player placeholder: the agreed local trial. */
function trial(): Encounter {
  const blank: Encounter = {
    roster: [],
    round: 1,
    values: {},
    joined: {},
  }
  return addPlaceholder(addCreature(addCreature(addCreature(blank, knight), wolf), wolf), 'Devan')
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
    const encounter = adjustHp(stepTurn(trial(), 1), 'beast:wolf:1', wolfStats, -2)
    expect(parseEncounter(JSON.stringify(encounter))).toEqual(encounter)
  })

  it('starts empty when nothing valid is saved', () => {
    expect(parseEncounter(null)).toEqual(emptyEncounter())
    expect(parseEncounter('{not json')).toEqual(emptyEncounter())
    expect(parseEncounter('{"encounters":[]}')).toEqual(emptyEncounter())
    expect(isRunning(emptyEncounter())).toBe(false)
    expect(isRunning(trial())).toBe(true)
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

describe('presets', () => {
  const ambush = { ref: 'scene', key: 'ambush' } as const
  const keep = { ref: 'scene', key: 'keep' } as const

  it('adds a prepared group to the running fight, counting each time it joins', () => {
    const once = loadPreset(
      trial(),
      { scene: ambush, fight: 'The bow', creatures: [wolf, wolf] },
      'add',
    )
    expect(once.roster.map(({ id }) => id)).toEqual([
      'npc:knight:1',
      'beast:wolf:1',
      'beast:wolf:2',
      'placeholder:1',
      'beast:wolf:3',
      'beast:wolf:4',
    ])
    expect(once.scene).toEqual(ambush)
    const twice = loadPreset(once, { scene: ambush, fight: 'The bow', creatures: [wolf] }, 'add')
    expect(twice.joined).toEqual({ [fightKey(ambush, 'The bow')]: 2 })
    expect(loadPreset(twice, { scene: keep, creatures: [knight] }, 'add').scene).toEqual(ambush)
  })

  it('replaces the fight, keeping the PCs and their HP, and starts from the first turn', () => {
    const fought = adjustHp(
      adjustHp(
        addPc(stepTurn(trial(), 1), { ref: 'pc', key: 'devan' }),
        'pc:devan',
        { maxHp: 40 },
        -5,
      ),
      'beast:wolf:1',
      wolfStats,
      -3,
    )
    const fresh = loadPreset(
      fought,
      { scene: keep, fight: 'The gate', creatures: [knight] },
      'replace',
    )
    expect(fresh.roster.map(({ id }) => id)).toEqual(['placeholder:1', 'pc:devan', 'npc:knight:1'])
    expect(fresh).toMatchObject({
      scene: keep,
      round: 1,
      active: 'placeholder:1',
      values: { 'pc:devan': { hp: 35 } },
      joined: { [fightKey(keep, 'The gate')]: 1 },
    })
    expect(fresh.values['beast:wolf:1']).toBeUndefined()
  })

  it('brings enemies in at the end of the round, or right after the current turn', () => {
    const start = { ...trial(), active: 'beast:wolf:1' }
    expect(bringIn(start, [knight, knight]).roster.map(({ id }) => id)).toEqual([
      'npc:knight:1',
      'beast:wolf:1',
      'beast:wolf:2',
      'placeholder:1',
      'npc:knight:2',
      'npc:knight:3',
    ])
    const next = bringIn(start, [knight, wolf], 'next')
    expect(next.roster.map(({ id }) => id)).toEqual([
      'npc:knight:1',
      'beast:wolf:1',
      'npc:knight:2',
      'beast:wolf:3',
      'beast:wolf:2',
      'placeholder:1',
    ])
    expect(next.active).toBe('beast:wolf:1')
    expect(
      bringIn(start, [], 'next', [{ ref: 'pc', key: 'swift' }]).roster.map(({ id }) => id),
    ).toEqual(['npc:knight:1', 'beast:wolf:1', 'pc:swift', 'beast:wolf:2', 'placeholder:1'])
  })
})
