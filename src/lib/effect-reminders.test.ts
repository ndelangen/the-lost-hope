import { describe, expect, it } from 'vitest'

import type { Effect } from '#/definitions/effect'

import {
  closeReminders,
  dismissReminder,
  effectsCarriedBy,
  fireTrigger,
  initialLiveState,
  meetObligation,
  obligationKey,
  obligationStatuses,
  pendingReminders,
  triggerReminders,
  type LiveEffect,
} from './effect-reminders'

const vessel: LiveEffect = {
  slug: 'vessel',
  name: 'Vessel',
  carrier: 'Jim',
  beganDay: 10,
  data: {
    triggers: [
      { on: 'longRest', reminder: [['Regain a stored spell']] },
      { on: 'newDay', reminder: [['Check the storm']] },
    ],
    obligations: [
      { label: 'Store a spell', within: { days: 1 }, otherwise: [{ dice: '2d8', type: 'force' }] },
      { label: 'Cast a spell', within: { days: 7 }, otherwise: [{ dice: '3d8', type: 'force' }] },
    ],
  } as Effect,
}

describe('effect reminders', () => {
  it('advances the live day only on a new campaign day', () => {
    const start = initialLiveState(10)
    expect(fireTrigger(start, 'newDay').day).toBe(11)
    expect(fireTrigger(start, 'longRest').day).toBe(10)
  })

  it('shows the fired trigger’s reminders until dismissed or closed', () => {
    const fired = fireTrigger(initialLiveState(10), 'longRest')
    const reminders = pendingReminders(fired, [vessel])
    expect(reminders.map((reminder) => reminder.id)).toEqual(['vessel:longRest'])
    expect(pendingReminders(dismissReminder(fired, 'vessel:longRest'), [vessel])).toEqual([])
    expect(pendingReminders(closeReminders(fired), [vessel])).toEqual([])
  })

  it('counts obligation deadlines from the effect’s start until met', () => {
    const later = { ...initialLiveState(10), day: 12 }
    const [store, cast] = obligationStatuses(later, [vessel])
    expect(store).toMatchObject({ label: 'Store a spell', since: 10, due: 11, overdue: true })
    expect(cast).toMatchObject({ label: 'Cast a spell', due: 17, overdue: false })

    const met = meetObligation(later, obligationKey('vessel', 'Store a spell'))
    expect(obligationStatuses(met, [vessel])[0]).toMatchObject({
      since: 12,
      due: 13,
      overdue: false,
    })
  })
})

describe('effects in an encounter', () => {
  const carried: LiveEffect = {
    ...vessel,
    slug: 'guard',
    data: {
      ...vessel.data,
      on: { ref: 'npc', key: 'bob' },
      triggers: [{ on: 'encounterStart', reminder: [['Bob raises his ward']] }],
    } as Effect,
  }
  const elsewhere: LiveEffect = {
    ...carried,
    slug: 'other',
    data: { ...carried.data, on: { ref: 'npc', key: 'someone_else' } } as Effect,
  }

  it('keeps only the effects carried by combatants', () => {
    const inPlay = effectsCarriedBy([carried, elsewhere], [{ ref: 'npc', key: 'bob' }])
    expect(inPlay.map((effect) => effect.slug)).toEqual(['guard'])
    expect(triggerReminders(inPlay, 'encounterStart').map((reminder) => reminder.id)).toEqual([
      'guard:encounterStart',
    ])
  })
})
