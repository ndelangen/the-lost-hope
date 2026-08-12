export type SessionCalendarSource = {
  date: Date
  name: string
  number: number
  slug: string
}

export type SessionCalendarEntry = SessionCalendarSource & {
  day: number
}

export type SessionCalendarDay = {
  day: number | null
  sessions: SessionCalendarEntry[]
  slot: number
}

export type SessionCalendarMonth = {
  index: number
  label: string
  weeks: SessionCalendarDay[][]
  sessionCount: number
}

export type SessionCalendarYear = {
  year: number
  months: SessionCalendarMonth[]
  sessionCount: number
}

export type SessionCalendarDisplayRow =
  | { kind: 'months'; months: SessionCalendarMonth[] }
  | { kind: 'quiet'; fromMonth: string; throughMonth: string }

const MONTH_FORMATTER = new Intl.DateTimeFormat('en', { month: 'long', timeZone: 'UTC' })

export function buildSessionCalendarYears(
  sessions: readonly SessionCalendarSource[],
): SessionCalendarYear[] {
  const sessionsByYear = new Map<number, SessionCalendarSource[]>()
  for (const session of sessions) {
    const year = session.date.getUTCFullYear()
    const entries = sessionsByYear.get(year) ?? []
    entries.push(session)
    sessionsByYear.set(year, entries)
  }

  return [...sessionsByYear.entries()]
    .toSorted(([left], [right]) => right - left)
    .map(([year, yearSessions]) => buildYear(year, yearSessions))
}

export function compactSessionCalendarRows(
  months: readonly SessionCalendarMonth[],
): SessionCalendarDisplayRow[] {
  const monthRows = Array.from({ length: Math.ceil(months.length / 3) }, (_, index) =>
    months.slice(index * 3, index * 3 + 3),
  )
  const displayRows: SessionCalendarDisplayRow[] = []

  for (const row of monthRows) {
    if (row.some((month) => month.sessionCount > 0)) {
      displayRows.push({ kind: 'months', months: row })
      continue
    }

    const previous = displayRows.at(-1)
    if (previous?.kind === 'quiet') {
      previous.throughMonth = row.at(-1)?.label ?? previous.throughMonth
      continue
    }

    displayRows.push({
      kind: 'quiet',
      fromMonth: row[0]?.label ?? '',
      throughMonth: row.at(-1)?.label ?? '',
    })
  }

  return displayRows
}

function buildYear(year: number, sessions: readonly SessionCalendarSource[]): SessionCalendarYear {
  return {
    year,
    sessionCount: sessions.length,
    months: Array.from({ length: 12 }, (_, month) => buildMonth(year, month, sessions)),
  }
}

function buildMonth(
  year: number,
  month: number,
  sessions: readonly SessionCalendarSource[],
): SessionCalendarMonth {
  const sessionsByDay = new Map<number, SessionCalendarEntry[]>()
  for (const session of sessions) {
    if (session.date.getUTCMonth() !== month) continue
    const day = session.date.getUTCDate()
    const entries = sessionsByDay.get(day) ?? []
    entries.push({ ...session, day })
    sessionsByDay.set(day, entries)
  }

  for (const entries of sessionsByDay.values()) {
    entries.sort((left, right) => left.number - right.number)
  }

  const firstWeekday = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7
  const dayCount = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
  const days = Array.from({ length: 42 }, (_, index): SessionCalendarDay => {
    const day = index - firstWeekday + 1
    if (day < 1 || day > dayCount) return { day: null, sessions: [], slot: index }
    return { day, sessions: sessionsByDay.get(day) ?? [], slot: index }
  })
  const weeks = Array.from({ length: 6 }, (_, index) => days.slice(index * 7, index * 7 + 7))

  return {
    index: month,
    label: MONTH_FORMATTER.format(new Date(Date.UTC(year, month, 1))),
    weeks,
    sessionCount: [...sessionsByDay.values()].reduce((count, entries) => count + entries.length, 0),
  }
}
