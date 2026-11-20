import { describe, expect, it } from 'vitest'

import {
  eventProse,
  foretoldDueLabel,
  foretoldEntries,
  formatForetoldOutcome,
  formatForetoldWhen,
} from './foretold'

const bridge = [['The bridge opens.']]

describe('foretoldEntries', () => {
  it('counts spans from the event day and orders the most pressing first', () => {
    const { pending, cameTrue, abandoned } = foretoldEntries(
      [
        {
          kind: 'item',
          slug: 'box',
          name: 'Box',
          foretold: [{ what: [['Opens.']], when: { type: 'fullMoon' } }],
        },
        {
          kind: 'event',
          slug: 'bob',
          name: 'Bob',
          day: 17,
          foretold: [{ what: [['Delivers.']], when: { type: 'after', span: { months: 4 } } }],
        },
        {
          kind: 'event',
          slug: 'yard',
          name: 'Yard',
          day: 24,
          foretold: [
            { what: [['Finished.']], when: { type: 'within', span: { days: 3 } } },
            { what: bridge },
            {
              what: [['Walks.']],
              outcome: { type: 'cameTrue', event: { ref: 'event', key: 'n2_e204' } },
            },
            {
              what: [['Is famed.']],
              outcome: { type: 'abandoned', event: { ref: 'event', key: 'n2_e212' } },
            },
          ],
        },
      ],
      26,
    )
    expect(pending.map((entry) => [entry.source.slug, entry.status, entry.dueDay])).toEqual([
      ['yard', 'upcoming', 27],
      ['bob', 'upcoming', 137],
      ['box', 'fullMoon', undefined],
      ['yard', 'open', undefined],
    ])
    expect(cameTrue.map((entry) => entry.id)).toEqual(['event:yard:2'])
    expect(abandoned.map((entry) => entry.id)).toEqual(['event:yard:3'])
  })

  it('marks a promise overdue once its day has passed', () => {
    const { pending } = foretoldEntries(
      [
        {
          kind: 'event',
          slug: 'yard',
          name: 'Yard',
          day: 24,
          foretold: [{ what: bridge, when: { type: 'within', span: { days: 3 } } }],
        },
      ],
      28,
    )
    expect(pending[0]?.status).toBe('overdue')
    expect(foretoldDueLabel(pending[0]!, 28)).toBe('Overdue · by day 27')
  })
})

describe('labels', () => {
  it('reads the timing in words', () => {
    expect(formatForetoldWhen({ type: 'within', span: { days: 3 } })).toBe('Within 3 days')
    expect(formatForetoldWhen({ type: 'after', span: { months: 4 } })).toBe('After 4 months')
    expect(formatForetoldWhen({ type: 'fullMoon' })).toBe('Next full moon')
    expect(formatForetoldWhen(undefined)).toBe('No set time')
    expect(formatForetoldOutcome({ type: 'cameTrue' })).toBe('Came true')
    expect(formatForetoldOutcome({ type: 'abandoned' })).toBe('Abandoned')
    expect(foretoldDueLabel({ when: { type: 'after', span: { days: 2 } }, dueDay: 26 }, 25)).toBe(
      'In 1 day · from day 26',
    )
  })
})

describe('eventProse', () => {
  it('reads the notes, then what was foretold', () => {
    expect(eventProse({ notes: [['Met.']], foretold: [{ what: bridge }] })).toEqual([
      ['Met.'],
      ['The bridge opens.'],
    ])
  })
})
