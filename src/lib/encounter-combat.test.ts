import { describe, expect, it } from 'vitest'

import {
  addCondition,
  addCreature,
  advanceTurn,
  backUp,
  deathSave,
  markDead,
  recordLairAction,
  removeCondition,
  setConcentration,
  setInLair,
  setStat,
  startDying,
  stepTurn,
  type Encounter,
} from './encounter'
import {
  concentrationDc,
  describeDuration,
  effectTriggerReminders,
  lairPrompts,
  makeCondition,
  rollsToRecharge,
  startOfTurnReminders,
} from './encounter-combat'

const wolf = { ref: 'beast', key: 'wolf' } as const
const mimic = { ref: 'beast', key: 'mimic' } as const

/** Three combatants: wolf 1, wolf 2, mimic. */
function fight(): Encounter {
  const blank: Encounter = { roster: [], round: 1, values: {}, joined: {} }
  return addCreature(addCreature(addCreature(blank, wolf), wolf), mimic)
}
const [w1, w2, m] = ['beast:wolf:1', 'beast:wolf:2', 'beast:mimic:1']

const next = (encounter: Encounter, legendaryUses?: (id: string) => number | undefined) =>
  advanceTurn(encounter, { legendaryUses })

describe('condition durations', () => {
  it('ends "until the end of its next turn" after that turn, not the current one', () => {
    // Wolf 1 is knocked prone during its own turn: it lasts through its next turn.
    let encounter = addCondition(fight(), w1, 'prone', { kind: 'end-of-turn', of: w1 }, 'c1')
    encounter = next(next(next(encounter).encounter).encounter).encounter // round 2, wolf 1
    expect(encounter.values[w1]?.conditions).toHaveLength(1)
    const ended = next(encounter)
    expect(ended.encounter.values[w1]?.conditions).toEqual([])
    expect(ended.notes).toContainEqual({ kind: 'expired', combatant: w1, condition: 'prone' })
  })

  it('ends "until the start of its next turn" when that turn starts', () => {
    let encounter = addCondition(fight(), w2, 'frightened', { kind: 'start-of-turn', of: m }, 'c1')
    encounter = next(encounter).encounter // wolf 2
    expect(encounter.values[w2]?.conditions).toHaveLength(1)
    expect(next(encounter).encounter.values[w2]?.conditions).toEqual([]) // mimic starts
  })

  it('counts rounds from the turn it was applied in', () => {
    let encounter = addCondition(
      fight(),
      m,
      'poisoned',
      { kind: 'rounds', rounds: 1, of: w1 },
      'c1',
    )
    for (let step = 0; step < 2; step += 1) encounter = next(encounter).encounter
    expect(encounter.values[m]?.conditions).toHaveLength(1)
    expect(next(encounter).encounter.values[m]?.conditions).toEqual([]) // round 2, wolf 1
  })

  it('asks for a save at the end of the holder’s turn when the save ends it', () => {
    const encounter = addCondition(
      fight(),
      w1,
      'restrained',
      { kind: 'save-ends', dc: 12, ability: 'str' },
      'c1',
    )
    const { notes, encounter: after } = next(encounter)
    expect(notes).toContainEqual({
      kind: 'save-to-end',
      combatant: w1,
      condition: 'restrained',
      dc: 12,
      ability: 'str',
    })
    expect(after.values[w1]?.conditions).toHaveLength(1)
  })

  it('keeps conditions until removed, and replaces a repeated condition', () => {
    let encounter = addCondition(fight(), w1, 'grappled', { kind: 'until-removed' }, 'a')
    encounter = addCondition(encounter, w1, 'grappled', { kind: 'end-of-turn', of: w2 }, 'b')
    expect(encounter.values[w1]?.conditions?.map((c) => c.id)).toEqual(['b'])
    expect(removeCondition(encounter, w1, 'b').values[w1]?.conditions).toEqual([])
  })

  it('describes durations for reading', () => {
    const name = (id: string) => (id === w1 ? 'Wolf 1' : id)
    expect(describeDuration({ kind: 'end-of-turn', of: w1 }, name)).toBe(
      'until the end of Wolf 1’s next turn',
    )
    expect(describeDuration({ kind: 'save-ends', dc: 13, ability: 'con' }, name)).toBe(
      'save ends: DC 13 Constitution',
    )
  })
})

describe('turn boundaries', () => {
  it('refills legendary actions at the start of the creature’s turn', () => {
    const spent: Encounter = {
      ...fight(),
      active: w2,
      values: { [m]: { uses: { legendary: 0 } } },
    }
    const { encounter, notes } = next(spent, (id) => (id === m ? 2 : undefined))
    expect(encounter.active).toBe(m)
    expect(encounter.values[m]?.uses?.legendary).toBeUndefined()
    expect(notes).toContainEqual({ kind: 'legendary-refilled', combatant: m, uses: 2 })
  })

  it('skips combatants who are out of the fight', () => {
    const encounter = stepTurn(fight(), 1, (id) => id === w2)
    expect(encounter.active).toBe(m)
    const wrapped = stepTurn({ ...fight(), active: m }, 1, (id) => id === w1)
    expect(wrapped).toMatchObject({ active: w2, round: 2 })
  })
})

describe('concentration', () => {
  it('sets the save DC to 10 or half the damage', () => {
    expect(concentrationDc(7)).toBe(10)
    expect(concentrationDc(30)).toBe(15)
  })

  it('marks and clears concentration', () => {
    const encounter = setConcentration(fight(), w1, 'Hold Person')
    expect(encounter.values[w1]?.concentration).toEqual({ on: 'Hold Person' })
    expect(setConcentration(encounter, w1, undefined).values[w1]?.concentration).toBeUndefined()
  })
})

describe('0 HP', () => {
  it('tracks death saves until stable or dead', () => {
    let encounter = startDying(fight(), w1)
    encounter = deathSave(encounter, w1, 'failure', 2) // a melee crit at 0 HP
    expect(encounter.values[w1]?.dying).toEqual({ successes: 0, failures: 2 })
    expect(deathSave(encounter, w1, 'failure').values[w1]).toMatchObject({ dead: true })

    let saved = startDying(fight(), w1)
    for (let roll = 0; roll < 3; roll += 1) saved = deathSave(saved, w1, 'success')
    expect(saved.values[w1]).toMatchObject({ stable: true, dying: undefined })
  })

  it('clears death saves when the PC is back up', () => {
    const encounter = backUp(deathSave(startDying(fight(), w1), w1, 'failure'), w1)
    expect(encounter.values[w1]).toEqual({})
  })

  it('can mark and unmark a combatant dead', () => {
    const dead = markDead(setStat(fight(), w1, 'hp', 0), w1, true)
    expect(dead.values[w1]).toMatchObject({ hp: 0, dead: true })
    expect(markDead(dead, w1, false).values[w1]?.dead).toBeUndefined()
  })
})

describe('recharge reminders', () => {
  it('rolls only for dice recharges', () => {
    expect(rollsToRecharge('Recharge 5–6')).toBe(true)
    expect(rollsToRecharge('Short or long rest')).toBe(false)
    expect(rollsToRecharge(undefined)).toBe(false)
  })
})

describe('start-of-turn reminders', () => {
  const web = { useKey: 'action:Web', name: 'Web', recharge: 'Recharge 5–6' }

  it('asks to roll for spent dice-recharge abilities only', () => {
    const reminders = startOfTurnReminders({
      abilities: [
        { ...web, count: { uses: 0, maxUses: 1 } },
        {
          useKey: 'bonus action:Second Wind',
          name: 'Second Wind',
          recharge: 'Short or long rest',
          count: { uses: 0, maxUses: 1 },
        },
        { useKey: 'action:Bite', name: 'Bite' },
      ],
      values: undefined,
    })
    expect(reminders).toEqual([
      { kind: 'recharge', useKey: 'action:Web', name: 'Web', recharge: 'Recharge 5–6' },
    ])
    expect(
      startOfTurnReminders({
        abilities: [{ ...web, count: { uses: 1, maxUses: 1 } }],
        values: undefined,
      }),
    ).toEqual([])
  })

  it('lists dying, conditions, and concentration', () => {
    const held = makeCondition(
      'prone',
      { kind: 'until-removed' },
      { id: 'c', round: 1, active: undefined },
    )
    expect(
      startOfTurnReminders({
        abilities: [],
        values: {
          dying: { successes: 0, failures: 1 },
          conditions: [held],
          concentration: { on: 'Bless' },
        },
      }).map((reminder) => reminder.kind),
    ).toEqual(['dying', 'condition', 'concentrating'])
  })
})

describe('lair actions', () => {
  const dragon = {
    id: 'dragon',
    name: 'Dragon',
    inLair: true,
    actions: [
      { key: 'tremor', name: 'Tremor' },
      { key: 'smoke', name: 'Smoke' },
    ],
  }

  it('prompts creatures in their lair, blocking last round’s choice', () => {
    const [prompt] = lairPrompts([{ ...dragon, lastLairAction: { key: 'tremor', round: 1 } }], 2)
    expect(prompt?.options).toEqual([
      { key: 'tremor', name: 'Tremor', blocked: true },
      { key: 'smoke', name: 'Smoke', blocked: false },
    ])
    expect(prompt?.used).toBeUndefined()
  })

  it('shows this round’s choice once made', () => {
    expect(
      lairPrompts([{ ...dragon, lastLairAction: { key: 'smoke', round: 3 } }], 3)[0]?.used,
    ).toBe('Smoke')
  })

  it('skips creatures outside their lair', () => {
    expect(lairPrompts([{ ...dragon, inLair: false }], 1)).toEqual([])
  })

  it('records the lair action for the round', () => {
    const encounter = recordLairAction(setInLair(fight(), m, true), m, 'smoke')
    expect(encounter.values[m]).toEqual({
      inLair: true,
      lastLairAction: { key: 'smoke', round: 1 },
    })
    expect(setInLair(encounter, m, false).values[m]?.inLair).toBeUndefined()
  })
})

describe('campaign effect reminders', () => {
  const reminder = [['Check whether the curse flares.']]
  const combatants = [
    {
      id: 'pc:cassian',
      name: 'Cassian',
      effects: [
        {
          name: 'Curse',
          icon: 'gi/GiCursedStar',
          triggers: [
            { on: 'encounterStart' as const, reminder },
            { on: 'longRest' as const, reminder: [['Rest note.']] },
          ],
        },
        { name: 'Quiet', icon: 'gi/GiCursedStar' },
      ],
    },
  ]

  it('collects the reminders for one trigger', () => {
    expect(effectTriggerReminders(combatants, 'encounterStart')).toEqual([
      {
        combatant: 'pc:cassian',
        name: 'Cassian',
        effect: 'Curse',
        icon: 'gi/GiCursedStar',
        reminder,
      },
    ])
    expect(effectTriggerReminders(combatants, 'newDay')).toEqual([])
  })
})
