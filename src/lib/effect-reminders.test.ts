import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import type { Effect } from '#/definitions/effect'

import {
  closeReminders,
  dismissReminder,
  effectsEndedAtTable,
  effectsInPlay,
  endEffect,
  fireTrigger,
  initialLiveState,
  meetObligation,
  obligationKey,
  obligationStatuses,
  pendingReminders,
  restoreEffect,
  type LiveEffect,
} from './effect-reminders'

const vessel: LiveEffect = {
  slug: 'vessel',
  name: 'Vessel',
  carrier: 'Jim',
  beganDay: 10,
  expiryDay: undefined,
  data: {
    triggers: [
      { on: 'longRest', reminder: [['Regain a stored spell']] },
      { on: 'newDay', reminder: [['Check the storm']] },
    ],
    obligations: [
      {
        label: 'Store a spell',
        within: { days: 1 },
        otherwise: [{ dice: '2d8', type: refs.rules.force }],
      },
      {
        label: 'Cast a spell',
        within: { days: 7 },
        otherwise: [{ dice: '3d8', type: refs.rules.force }],
      },
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

  it('drops a timed effect once New day reaches its expiry', () => {
    const blessing: LiveEffect = {
      slug: 'blessing',
      name: 'Blessing',
      carrier: 'Swift',
      beganDay: 10,
      expiryDay: 12,
      data: { duration: { days: 2 } } as Effect,
    }
    const dayTen = initialLiveState(10)
    const dayEleven = fireTrigger(dayTen, 'newDay')
    const dayTwelve = fireTrigger(dayEleven, 'newDay')
    expect(effectsInPlay(dayEleven, [blessing, vessel])).toEqual([blessing, vessel])
    expect(effectsInPlay(dayTwelve, [blessing, vessel])).toEqual([vessel])
    const fired = pendingReminders(dayTwelve, effectsInPlay(dayTwelve, [blessing, vessel]))
    expect(fired.map((reminder) => reminder.effect.slug)).toEqual(['vessel'])
  })

  it('ends an effect at the table until the DM undoes it', () => {
    const ended = endEffect(fireTrigger(initialLiveState(10), 'newDay'), 'vessel')
    expect(ended.ended).toEqual({ vessel: 11 })
    expect(effectsInPlay(ended, [vessel])).toEqual([])
    expect(effectsEndedAtTable(ended, [vessel])).toEqual([vessel])
    expect(obligationStatuses(ended, effectsInPlay(ended, [vessel]))).toEqual([])
    const restored = restoreEffect(ended, 'vessel')
    expect(effectsInPlay(restored, [vessel])).toEqual([vessel])
    expect(effectsEndedAtTable(restored, [vessel])).toEqual([])
  })
})
