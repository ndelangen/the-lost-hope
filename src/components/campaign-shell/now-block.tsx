import { Link } from '@tanstack/react-router'
import { ScrollText } from 'lucide-react'
import { useMemo } from 'react'

import { LocationReference } from '#/components/location-reference'
import { Card, CardContent } from '#/components/ui/card'
import {
  activePcs,
  entityLink,
  eventLocation,
  openQuests,
  sessionNumber,
  sortedEvents,
  sortedSessions,
} from '#/lib/campaign'

type NowBlockProps = {
  collapsed?: boolean
  onNavigate?: () => void
}

export function NowBlock({ collapsed, onNavigate }: NowBlockProps) {
  const sessions = useMemo(() => sortedSessions(), [])
  const currentSession = sessions[0]
  const partyCount = useMemo(() => activePcs().length, [])
  const questCount = useMemo(() => openQuests().length, [])
  const latestEvent = useMemo(() => sortedEvents()[0], [])
  const currentLocation = useMemo(() => {
    if (!latestEvent) return undefined
    return eventLocation(latestEvent.data)
  }, [latestEvent])

  if (collapsed) {
    return (
      <Link
        {...(currentSession ? entityLink('session', currentSession.slug) : { to: '/' })}
        className="text-muted-foreground hover:text-foreground hover:bg-muted flex justify-center rounded-md p-2"
        title="Current session"
        onClick={onNavigate}
      >
        <ScrollText className="size-4" />
      </Link>
    )
  }

  return (
    <Card className="shadow-none">
      <CardContent className="space-y-2 p-3">
        <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
          Now
        </p>
        {currentSession ? (
          <Link
            {...entityLink('session', currentSession.slug)}
            className="hover:text-primary block truncate text-sm font-medium"
            onClick={onNavigate}
          >
            Session {sessionNumber(currentSession.slug)} · {currentSession.data.name}
          </Link>
        ) : null}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
          <Link to="/pcs" className="text-primary hover:underline" onClick={onNavigate}>
            Party: {partyCount}
          </Link>
          <Link to="/quests" className="text-primary hover:underline" onClick={onNavigate}>
            Open quests: {questCount}
          </Link>
        </div>
        {currentLocation ? (
          <p className="text-muted-foreground truncate text-xs">
            Where: <LocationReference slug={currentLocation.slug} onNavigate={onNavigate} />
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}
