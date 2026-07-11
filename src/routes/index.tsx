import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CircleHelp,
  Clock3,
  ScrollText,
  Users,
} from 'lucide-react'
import { useState } from 'react'

import { CampaignSearch } from '#/components/campaign-shell/campaign-search'
import { EventReference } from '#/components/event-reference'
import { LocationReference } from '#/components/location-reference'
import { QuestReference } from '#/components/quest-reference'
import { SessionReference } from '#/components/session-reference'
import { Badge } from '#/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { Grid, Inline, Stack, SwitchLayout } from '#/components/ui/layout'
import {
  COLLECTIONS,
  COLLECTION_LABELS,
  activePcs,
  allEntities,
  campaign,
  collectionTo,
  eventLocation,
  openQuests,
  questProgress,
  sessionNumber,
  sortedEvents,
  sortedSessions,
} from '#/lib/campaign'
import { ENTITY_KIND_VISUALS } from '#/lib/entity-kind-visuals'
import { questProgressText } from '#/lib/entity-page-data'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const collectionDescriptions = {
  session: 'Catch up on play history',
  event: 'Follow the story in order',
  location: 'Explore the known world',
  npc: 'Remember who you met',
  beast: 'Review encountered creatures',
  pc: 'Meet the player characters',
  quest: 'Track clues and mysteries',
  organization: 'Understand groups and allegiances',
} as const

function HomePage() {
  const [query, setQuery] = useState('')
  const latestSession = sortedSessions()[0]
  const latestEvent = sortedEvents()[0]
  const currentLocation = latestEvent ? eventLocation(latestEvent.data) : undefined
  const mysteries = openQuests()
  const party = activePcs()

  return (
    <Stack gap="3xl">
      <section className="border-border bg-card rounded-2xl border p-6 sm:p-8">
        <Stack gap="lg" className="max-w-3xl">
          <Badge variant="secondary">Campaign companion</Badge>
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {campaign.name}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed text-balance">
            Catch up on the story, follow an open mystery, or jump straight to any person, place,
            quest, or session.
          </p>
          <CampaignSearch
            query={query}
            onQueryChange={setQuery}
            className="w-full pt-1"
            inputClassName="h-11 bg-background"
          />
          <Grid gap="md" smColumns={2} className="max-w-2xl pt-1">
            <Link
              to="/intro"
              className="bg-primary text-primary-foreground group relative min-h-24 overflow-hidden rounded-xl border border-transparent p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <BookOpen
                className="text-primary-foreground/10 pointer-events-none absolute -right-3 -bottom-4 size-24 rotate-[-10deg] transition-transform group-hover:scale-110"
                aria-hidden
              />
              <Inline as="span" justify="between" gap="md" className="relative z-10 h-full">
                <Inline as="span" gap="md">
                  <Inline
                    as="span"
                    gap="none"
                    justify="center"
                    className="bg-primary-foreground/15 size-10 shrink-0 rounded-lg"
                  >
                    <BookOpen className="size-5" />
                  </Inline>
                  <Stack as="span" gap="2xs" className="min-w-0 text-left">
                    <span className="text-primary-foreground/70 block text-xs">
                      New to the story?
                    </span>
                    <span className="block font-semibold">Start with the intro</span>
                  </Stack>
                </Inline>
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </Inline>
            </Link>
            {latestSession ? (
              <SessionReference
                slug={latestSession.slug}
                label={latestSession.data.name}
                unstyled
                wrapperClassName="block"
                className="group relative block min-h-24 overflow-hidden rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-blue-950 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:outline-none dark:border-blue-900 dark:bg-blue-950/20 dark:text-blue-100 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
              >
                {() => (
                  <>
                    <ScrollText
                      className="pointer-events-none absolute -right-3 -bottom-4 size-24 rotate-[-10deg] text-blue-600/10 transition-transform group-hover:scale-110 dark:text-blue-300/10"
                      aria-hidden
                    />
                    <Inline as="span" justify="between" gap="md" className="relative z-10 h-full">
                      <Inline as="span" gap="md">
                        <Inline
                          as="span"
                          gap="none"
                          justify="center"
                          className="size-10 shrink-0 rounded-lg bg-blue-600/10 text-blue-700 dark:bg-blue-300/10 dark:text-blue-300"
                        >
                          <ScrollText className="size-5" />
                        </Inline>
                        <Stack as="span" gap="2xs" className="min-w-0 text-left">
                          <span className="block text-xs text-blue-700/70 dark:text-blue-300/70">
                            Pick up where you left off
                          </span>
                          <span className="block truncate font-semibold">
                            Continue session {sessionNumber(latestSession.slug)}
                          </span>
                        </Stack>
                      </Inline>
                      <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </Inline>
                  </>
                )}
              </SessionReference>
            ) : null}
          </Grid>
        </Stack>
      </section>

      <Grid as="section" gap="lg" className="lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)]">
        <Card>
          <CardHeader>
            <Inline gap="sm">
              <Clock3 className="text-primary size-5" />
              <CardTitle>Where the story stands</CardTitle>
            </Inline>
            <CardDescription>The latest point in the party's journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap="lg">
              {latestSession ? (
                <SessionReference
                  slug={latestSession.slug}
                  label={latestSession.data.name}
                  unstyled
                  wrapperClassName="block"
                  className="group hover:bg-accent/40 block rounded-lg p-3 transition-colors"
                >
                  {() => (
                    <Stack as="span" gap="md">
                      <Stack as="span" gap="2xs">
                        <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                          Latest session
                        </span>
                        <span className="text-lg font-semibold">
                          Session {sessionNumber(latestSession.slug)} · {latestSession.data.name}
                        </span>
                        <Inline as="span" gap="md" wrap className="text-muted-foreground text-sm">
                          <Inline as="span" inline gap="xs">
                            <CalendarDays className="size-4" />
                            {latestSession.data.date.toLocaleDateString(undefined, {
                              dateStyle: 'long',
                            })}
                          </Inline>
                          <span>{latestSession.data.events.length} events</span>
                        </Inline>
                      </Stack>
                      <Inline
                        as="span"
                        inline
                        gap="2xs"
                        className="text-primary text-sm font-medium"
                      >
                        Read the recap
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </Inline>
                    </Stack>
                  )}
                </SessionReference>
              ) : null}
              {latestEvent ? (
                <div className="border-border border-t">
                  <Grid
                    gap="2xs"
                    className="py-3 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center"
                  >
                    <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                      Last recorded event
                    </p>
                    <EventReference slug={latestEvent.slug} />
                  </Grid>
                  <Grid
                    gap="2xs"
                    className="border-border border-t py-3 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center"
                  >
                    <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                      Current location
                    </p>
                    <p className="font-medium">
                      {currentLocation ? (
                        <LocationReference slug={currentLocation.slug} />
                      ) : (
                        <span>Unknown</span>
                      )}
                    </p>
                  </Grid>
                </div>
              ) : null}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Inline justify="between" gap="sm">
              <Inline gap="sm">
                <CircleHelp className="text-primary size-5" />
                <CardTitle>Open mysteries</CardTitle>
              </Inline>
              <Badge variant="secondary">{mysteries.length}</Badge>
            </Inline>
            <CardDescription>Story threads the party has not resolved.</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap="2xs">
              {mysteries.slice(0, 4).map((quest) => (
                <QuestReference
                  key={quest.slug}
                  slug={quest.slug}
                  label={quest.data.name}
                  unstyled
                  wrapperClassName="block"
                  className="hover:bg-accent/40 rounded-md px-2 py-2 text-sm"
                >
                  {() => (
                    <Inline as="span" justify="between" gap="md">
                      <Stack as="span" gap="2xs" className="min-w-0">
                        <span className="block font-medium">{quest.data.name}</span>
                        <Inline
                          as="span"
                          inline
                          gap="2xs"
                          className="text-muted-foreground text-xs"
                        >
                          <Clock3 className="size-3" />
                          {questProgressText(questProgress(quest.data))}
                        </Inline>
                      </Stack>
                      <ArrowRight className="text-muted-foreground size-4 shrink-0" />
                    </Inline>
                  )}
                </QuestReference>
              ))}
              <Link
                to="/quests"
                className="text-primary inline-block px-2 pt-3 text-sm hover:underline"
              >
                View all quests →
              </Link>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Stack as="section" gap="lg">
        <Stack gap="2xs">
          <h2 className="text-2xl font-semibold tracking-tight">Explore the campaign</h2>
          <p className="text-muted-foreground text-sm">
            Go directly to the part of the archive you need.
          </p>
        </Stack>
        <Grid gap="md" smColumns={2} xlColumns={4}>
          {COLLECTIONS.map((kind) => {
            const visual = ENTITY_KIND_VISUALS[kind]
            const Icon = visual.icon
            return (
              <Link
                key={kind}
                to={collectionTo(kind)}
                className={cn(
                  'border-border bg-card group relative overflow-hidden rounded-xl border p-4 transition-colors focus-visible:outline-none focus-visible:ring-2',
                  visual.hoverClassName,
                )}
              >
                <Icon
                  className={cn(
                    'pointer-events-none absolute -right-5 -bottom-7 size-28 rotate-[-9deg] opacity-[0.07] transition-all group-hover:scale-110 group-hover:opacity-[0.18]',
                    visual.accentClassName,
                  )}
                  aria-hidden
                />
                <Stack gap="lg" className="relative z-10">
                  <Stack gap="sm">
                    <Inline justify="between" gap="sm">
                      <Inline gap="sm">
                        <Icon className={cn('size-5', visual.accentClassName)} />
                        <span className="font-semibold">{COLLECTION_LABELS[kind]}</span>
                      </Inline>
                      <Badge variant="secondary">{allEntities(kind).length}</Badge>
                    </Inline>
                    <p className="text-muted-foreground text-sm">{collectionDescriptions[kind]}</p>
                  </Stack>
                  <ArrowRight
                    className={cn(
                      'size-4 transition-transform group-hover:translate-x-0.5',
                      visual.accentClassName,
                    )}
                  />
                </Stack>
              </Link>
            )
          })}
        </Grid>
      </Stack>

      <SwitchLayout
        as="section"
        gap="lg"
        align="center"
        justify="between"
        className="border-border border-t pt-6"
      >
        <Inline gap="md">
          <Users className="text-primary size-5" />
          <Stack gap="none">
            <h2 className="font-semibold">Current party</h2>
            <p className="text-muted-foreground text-sm">
              {party.map((pc) => pc.data.name).join(', ')}
            </p>
          </Stack>
        </Inline>
        <Link to="/pcs" className="text-primary text-sm font-medium hover:underline">
          Meet the party →
        </Link>
      </SwitchLayout>
    </Stack>
  )
}
