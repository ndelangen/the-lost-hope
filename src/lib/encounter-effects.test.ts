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
  type Encounter,
} from './encounter'
import { damageReminders, type EffectApplication } from './encounter-combat'

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
