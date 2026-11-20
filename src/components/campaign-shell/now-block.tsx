import { Link } from '@tanstack/react-router'

import { LocationReference } from '#/components/location-reference'
import { SessionReference } from '#/components/session-reference'
import { Card, CardContent } from '#/components/ui/card'
import { Inline, Stack } from '#/components/ui/layout'
import {
  activePcs,
  eventLocation,
  openQuests,
  sessionNumber,
  sortedEvents,
  sortedSessions,
} from '#/lib/campaign'

type NowBlockProps = {
  onNavigate?: () => void
}

export function NowBlock({ onNavigate }: NowBlockProps) {
  const currentSession = sortedSessions()[0]
  const partyCount = activePcs().length
  const questCount = openQuests().length
  const latestEvent = sortedEvents()[0]
  const currentLocation = latestEvent ? eventLocation(latestEvent.data) : undefined

  return (
    <Card className="shadow-none">
      <CardContent className="p-3">
        <Stack gap="sm">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
            Now
          </p>
          {currentSession ? (
            <SessionReference
              slug={currentSession.slug}
              label={currentSession.data.name}
              previewSide="right"
              wrapperClassName="block"
              unstyled
              className="hover:text-primary block truncate text-sm font-medium"
              onNavigate={onNavigate}
            >
              {() => (
                <>
                  Session {sessionNumber(currentSession.slug)} · {currentSession.data.name}
                </>
              )}
            </SessionReference>
          ) : null}
          <Inline gap="md" wrap className="text-xs">
            <Link to="/pcs" className="text-primary hover:underline" onClick={onNavigate}>
              Party: {partyCount}
            </Link>
            <Link to="/quests" className="text-primary hover:underline" onClick={onNavigate}>
              Open quests: {questCount}
            </Link>
          </Inline>
          {currentLocation ? (
            <p className="text-muted-foreground truncate text-xs">
              Where: <LocationReference slug={currentLocation.slug} onNavigate={onNavigate} />
            </p>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  )
}
