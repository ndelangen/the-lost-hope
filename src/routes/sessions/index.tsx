import { createFileRoute } from '@tanstack/react-router'

import { SessionsYearCalendar } from '#/components/sessions-year-calendar'
import { sessionNumber, sortedSessions } from '#/lib/campaign'
import { publicPageHeadForPath } from '#/lib/public-page-metadata'
import { buildSessionCalendarYears } from '#/lib/session-calendar'

export const Route = createFileRoute('/sessions/')({
  head: () => publicPageHeadForPath('/sessions'),
  component: SessionsPage,
})

function SessionsPage() {
  const sessions = sortedSessions()
  const years = buildSessionCalendarYears(
    sessions.map((session) => ({
      date: session.data.date,
      name: session.data.name,
      number: sessionNumber(session.slug) ?? 0,
      slug: session.slug,
    })),
  )

  return <SessionsYearCalendar years={years} sessionCount={sessions.length} />
}
