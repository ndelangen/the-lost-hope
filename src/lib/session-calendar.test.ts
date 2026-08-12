import { describe, expect, it } from 'vitest'

import {
  buildSessionCalendarYears,
  compactSessionCalendarRows,
  type SessionCalendarSource,
} from './session-calendar'

const sessions: SessionCalendarSource[] = [
  { slug: 'first', name: 'First', number: 1, date: new Date(Date.UTC(2026, 7, 9)) },
  { slug: 'second', name: 'Second', number: 2, date: new Date(Date.UTC(2026, 7, 10)) },
  { slug: 'previous', name: 'Previous year', number: 0, date: new Date(Date.UTC(2025, 11, 31)) },
]

describe('buildSessionCalendarYears', () => {
  it('builds complete years ordered newest first', () => {
    const years = buildSessionCalendarYears(sessions)

    expect(years.map((year) => year.year)).toEqual([2026, 2025])
    expect(years[0].months).toHaveLength(12)
    expect(years[0].months.every((month) => month.weeks.every((week) => week.length === 7))).toBe(
      true,
    )
  })

  it('places sessions in a complete month grid', () => {
    const august = buildSessionCalendarYears(sessions)[0].months[7]
    const sessionDays = august.weeks.flat().filter((day) => day.sessions.length > 0)

    expect(august.label).toBe('August')
    expect(august.sessionCount).toBe(2)
    expect(august.weeks).toHaveLength(6)
    expect(sessionDays.map((day) => day.day)).toEqual([9, 10])
    expect(sessionDays.flatMap((day) => day.sessions.map((session) => session.number))).toEqual([
      1, 2,
    ])
  })

  it('retains date grids for quiet months inside an active calendar row', () => {
    const year = buildSessionCalendarYears(sessions)[0]
    const activeMonths = year.months.filter((month) => month.sessionCount > 0)

    expect(activeMonths.map((month) => month.label)).toEqual(['August'])
    expect(year.months[0].weeks).toHaveLength(6)
    expect(year.months[0].weeks.flat().filter((day) => day.day !== null)).toHaveLength(31)
  })

  it('collapses consecutive quiet calendar rows into one range', () => {
    const rows = compactSessionCalendarRows(buildSessionCalendarYears(sessions)[0].months)

    expect(rows).toMatchObject([
      { kind: 'quiet', fromMonth: 'January', throughMonth: 'June' },
      { kind: 'months', months: [{ label: 'July' }, { label: 'August' }, { label: 'September' }] },
      { kind: 'quiet', fromMonth: 'October', throughMonth: 'December' },
    ])
  })
})
