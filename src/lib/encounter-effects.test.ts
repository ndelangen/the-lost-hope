import { describe, expect, it } from 'vitest'

import {
  addCreature,
  advanceTurn,
  applyEffect,
  removeCombatant,
  removeCondition,
  removeEffect,
  setConcentration,
  parseEncounter,
  recordSave,
  type Encounter,
} from './encounter'
import { damageReminders, saveChoices, type EffectApplication } from './encounter-combat'

const wolf = { ref: 'beast', key: 'wolf' } as const
const [w1, w2] = ['beast:wolf:1', 'beast:wolf:2']

function fight(): Encounter {
  const blank: Encounter = { roster: [], round: 1, values: {}, joined: {} }
  return addCreature(addCreature(blank, wolf), wolf)
}
const ids = () => {
  let n = 0
  return () => `e${++n}`
}
const next = (encounter: Encounter) => advanceTurn(encounter, {})

const holdPerson: EffectApplication = {
  origin: { kind: 'spell', spell: { ref: 'spell', key: 'hold_person' }, caster: w2 },
  conditions: ['paralyzed'],
  duration: { kind: 'save-ends', dc: 13, ability: 'wis' },
}

describe('applied effects', () => {
  it('gives each target its own effect, with its conditions linked and traced to the origin', () => {
    const encounter = applyEffect(fight(), [w1, w2], holdPerson, ids())
    const held = encounter.values[w1]!
    expect(held.appliedEffects).toEqual([
      expect.objectContaining({ id: 'e1', origin: holdPerson.origin }),
    ])
    expect(held.conditions).toEqual([
      expect.objectContaining({ condition: 'paralyzed', effect: 'e1' }),
    ])
    expect(encounter.values[w2]?.appliedEffects?.[0]?.id).toBe('e2')
  })

  it('keeps a rider that is not a condition', () => {
    const encounter = applyEffect(
      fight(),
      [w1],
      {
        origin: { kind: 'ability', combatant: w2, ability: 'bite' },
        conditions: [],
        text: '  Its speed is 0.  ',
        duration: { kind: 'end-of-turn', of: w2 },
      },
      ids(),
    )
    expect(encounter.values[w1]?.appliedEffects?.[0]?.text).toBe('Its speed is 0.')
    expect(encounter.values[w1]?.conditions).toEqual([])
  })

  it('asks for one save per effect, not one per condition, and ends them together', () => {
    let encounter = applyEffect(
      fight(),
      [w1],
      { ...holdPerson, conditions: ['paralyzed', 'prone'] },
      ids(),
    )
    const turnEnds = next(encounter) // wolf 1's turn ends
    const saves = turnEnds.notes.filter(
      (note) => note.kind === 'effect-save' || note.kind === 'save-to-end',
    )
    expect(saves).toEqual([expect.objectContaining({ kind: 'effect-save', combatant: w1, dc: 13 })])

    encounter = applyEffect(
      fight(),
      [w1],
      {
        ...holdPerson,
        conditions: ['paralyzed', 'prone'],
        duration: { kind: 'start-of-turn', of: w2 },
      },
      ids(),
    )
    const ended = next(encounter) // wolf 2 starts
    expect(ended.encounter.values[w1]?.conditions).toEqual([])
    expect(ended.encounter.values[w1]?.appliedEffects).toEqual([])
    expect(ended.notes).toEqual([
      expect.objectContaining({ kind: 'effect-expired', conditions: ['paralyzed', 'prone'] }),
    ])
  })

  it('removes an effect with its conditions, and an effect whose last condition is removed', () => {
    const applied = applyEffect(fight(), [w1], holdPerson, ids())
    expect(removeEffect(applied, w1, 'e1').values[w1]).toMatchObject({
      appliedEffects: [],
      conditions: [],
    })
    expect(removeCondition(applied, w1, 'e1-0').values[w1]).toMatchObject({
      appliedEffects: [],
      conditions: [],
    })
  })

  it('keeps a condition another effect holds, so each effect still ends on its own', () => {
    let encounter = applyEffect(fight(), [w1], holdPerson, ids())
    encounter = applyEffect(
      encounter,
      [w1],
      {
        ...holdPerson,
        origin: { kind: 'spell', spell: { ref: 'spell', key: 'hold_person' }, caster: w1 },
      },
      () => 'x',
    )
    expect(encounter.values[w1]?.conditions?.map((condition) => condition.effect)).toEqual([
      'e1',
      'x',
    ])
    const freed = removeEffect(encounter, w1, 'x').values[w1]
    expect(freed?.appliedEffects?.map((effect) => effect.id)).toEqual(['e1'])
    expect(freed?.conditions?.map((condition) => condition.effect)).toEqual(['e1'])
  })

  it('ends a concentration spell’s effects when its caster stops, recasts, or leaves', () => {
    const spell = { ref: 'spell', key: 'hold_person' } as const
    let encounter = setConcentration(fight(), w2, 'Hold Person', spell)
    encounter = applyEffect(encounter, [w1], holdPerson, ids())
    // Concentrating is tied to the spell by its ref, not the name typed.
    expect(setConcentration(encounter, w2, undefined).values[w1]).toMatchObject({
      appliedEffects: [],
      conditions: [],
    })
    expect(setConcentration(encounter, w2, 'Hold Person', spell).values[w1]?.conditions).toEqual([])
    expect(removeCombatant(encounter, w2).values[w1]?.conditions).toEqual([])
    // A caster concentrating on something typed by hand holds no applied effects.
    const typed = setConcentration(applyEffect(fight(), [w1], holdPerson, ids()), w2, 'hold person')
    expect(setConcentration(typed, w2, undefined).values[w1]?.conditions).toHaveLength(1)
  })

  it('reads saves whose conditions still carry a copy of the origin', () => {
    const saved = applyEffect(fight(), [w1], holdPerson, ids())
    const condition = { ...saved.values[w1]!.conditions![0]!, origin: holdPerson.origin }
    const parsed = parseEncounter(
      JSON.stringify({
        ...saved,
        values: { ...saved.values, [w1]: { ...saved.values[w1], conditions: [condition] } },
      }),
    )
    expect(parsed.values[w1]?.conditions?.[0]?.condition).toBe('paralyzed')
    expect(parsed.values[w1]?.conditions?.[0]).not.toHaveProperty('origin')
  })
})

describe('effects that react to damage', () => {
  it('remembers what damage does, and reminds once per effect', () => {
    const encounter = applyEffect(
      fight(),
      [w1],
      { ...holdPerson, onDamage: { kind: 'save', dc: 13, ability: 'wis' } },
      ids(),
    )
    expect(damageReminders(w1, encounter.values[w1])).toEqual([
      {
        combatant: w1,
        effect: expect.objectContaining({ id: 'e1' }),
        onDamage: { kind: 'save', dc: 13, ability: 'wis' },
      },
    ])
    expect(damageReminders(w2, encounter.values[w2])).toEqual([])
  })
})

describe('staged effects', () => {
  const gaze: EffectApplication = {
    origin: {
      kind: 'ability',
      combatant: w2,
      ability: 'petrifying-gaze',
      effect: 'gaze-restrained',
    },
    conditions: ['restrained'],
    duration: { kind: 'save-ends', dc: 12, ability: 'con' },
    becomes: {
      failures: 1,
      effect: 'gaze-petrified',
      name: 'Petrified',
      conditions: ['petrified'],
      duration: { kind: 'until-removed' },
    },
  }

  it('turns into its next stage on a failed repeat save, traced to the stage', () => {
    const start = applyEffect(fight(), [w1], gaze, ids())
    const petrified = recordSave(start, w1, 'e1', 'failed', () => 'e2')
    const held = petrified.values[w1]!
    expect(held.appliedEffects).toEqual([
      expect.objectContaining({
        id: 'e2',
        origin: { ...gaze.origin, effect: 'gaze-petrified' },
        duration: { kind: 'until-removed' },
      }),
    ])
    expect(held.conditions?.map((condition) => condition.condition)).toEqual(['petrified'])
  })

  it('ends on a successful repeat save', () => {
    const start = applyEffect(fight(), [w1], gaze, ids())
    const saved = recordSave(start, w1, 'e1', 'saved', () => 'e2')
    expect(saved.values[w1]?.appliedEffects).toEqual([])
    expect(saved.values[w1]?.conditions).toEqual([])
  })

  it('counts saves when it takes three successes or three failures', () => {
    const fleshToStone: EffectApplication = {
      ...gaze,
      successes: 3,
      becomes: { ...gaze.becomes!, failures: 3 },
    }
    let encounter = applyEffect(fight(), [w1], fleshToStone, ids())
    const effect = () => encounter.values[w1]!.appliedEffects![0]!
    expect(saveChoices(effect())).toEqual({ saved: 'Saved: 1 of 3', failed: 'Failed: 1 of 3' })
    encounter = recordSave(encounter, w1, 'e1', 'failed', () => 'x')
    encounter = recordSave(encounter, w1, 'e1', 'saved', () => 'x')
    encounter = recordSave(encounter, w1, 'e1', 'failed', () => 'x')
    expect(effect().tally).toMatchObject({ made: 1, failed: 2 })
    expect(saveChoices(effect())).toEqual({ saved: 'Saved: 2 of 3', failed: 'Failed: Petrified' })
    encounter = recordSave(encounter, w1, 'e1', 'failed', () => 'e9')
    expect(effect().id).toBe('e9')
    expect(encounter.values[w1]?.conditions?.map(({ condition }) => condition)).toEqual([
      'petrified',
    ])
  })

  it('offers only Saved when a failure changes nothing', () => {
    expect(saveChoices({})).toEqual({ saved: 'Saved: end it' })
  })
})

describe('staged effects and concentration', () => {
  const petrify: EffectApplication = {
    origin: {
      kind: 'spell',
      spell: { ref: 'spell', key: 'petrify' },
      caster: w2,
      effect: 'turning',
    },
    conditions: ['restrained'],
    duration: { kind: 'save-ends', dc: 14, ability: 'con' },
    becomes: {
      failures: 1,
      effect: 'petrified',
      name: 'Petrified',
      outlastsConcentration: true,
      conditions: ['petrified'],
      duration: { kind: 'until-removed' },
    },
  }

  it('keeps a stage that outlasts concentration when the caster stops', () => {
    let encounter = setConcentration(applyEffect(fight(), [w1], petrify, ids()), w2, 'Petrify', {
      ref: 'spell',
      key: 'petrify',
    })
    encounter = recordSave(encounter, w1, 'e1', 'failed', () => 'e2')
    encounter = setConcentration(encounter, w2, undefined)
    expect(encounter.values[w1]?.conditions?.map(({ condition }) => condition)).toEqual([
      'petrified',
    ])
  })

  it('records the turn a save was counted in', () => {
    const counted = recordSave(
      applyEffect(fight(), [w1], { ...petrify, successes: 3 }, ids()),
      w1,
      'e1',
      'saved',
      () => 'x',
    )
    expect(counted.values[w1]?.appliedEffects?.[0]?.tally).toEqual({
      made: 1,
      failed: 0,
      at: { round: 1, active: w1 },
    })
  })
})
