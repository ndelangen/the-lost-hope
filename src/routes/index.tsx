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
import { EntityKindPill } from '#/components/entity-kind-pill'
import { EventReference } from '#/components/event-reference'
import { HomeActionCard } from '#/components/home-action-card'
import { LocationReference } from '#/components/location-reference'
import { QuestReference } from '#/components/quest-reference'
import { SessionReference } from '#/components/session-reference'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { Grid, Inline, Stack, SwitchLayout } from '#/components/ui/layout'
import { Pill } from '#/components/ui/pill'
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
import { publicPageHeadForPath } from '#/lib/public-page-metadata'
import { questProgressText } from '#/lib/quest-catalogue-data'
import { formatSessionDate } from '#/lib/session-date'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/')({
  head: () => publicPageHeadForPath('/'),
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
  item: 'Browse notable equipment and artifacts',
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
          <Pill variant="secondary">Campaign companion</Pill>
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
            className="w-full max-w-2xl"
            inputClassName="h-11 bg-background"
          />
          <Grid gap="md" smTemplate={2} className="max-w-2xl">
            <HomeActionCard
              destination={{ to: '/intro' }}
              eyebrow="New to the story?"
              icon={BookOpen}
              title="Start with the intro"
              variant="primary"
            />
            {latestSession ? (
              <HomeActionCard
                destination={{
                  entity: {
                    kind: 'session',
                    slug: latestSession.slug,
                  },
                }}
                eyebrow="Pick up where you left off"
                icon={ScrollText}
                title={`Continue session ${sessionNumber(latestSession.slug)}`}
                variant="secondary"
              />
            ) : null}
          </Grid>
        </Stack>
      </section>

      <Grid as="section" gap="lg" lgTemplate="content-aside">
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
                            {formatSessionDate(latestSession.data.date, 'long')}
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
                  <Grid gap="2xs" template="auto-content" align="center" className="py-3">
                    <p className="text-muted-foreground text-xs font-semibold tracking-wide whitespace-nowrap uppercase">
                      Last recorded event
                    </p>
                    <EventReference
                      slug={latestEvent.slug}
                      wrapperClassName="min-w-0"
                      className="block truncate"
                    />
                  </Grid>
                  <Grid
                    gap="2xs"
                    smTemplate="label-content"
                    smAlign="center"
                    className="border-border border-t py-3"
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
              <EntityKindPill kind="quest">{mysteries.length}</EntityKindPill>
            </Inline>
            <CardDescription>Story threads the party has not resolved.</CardDescription>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <Stack gap="none">
              {mysteries.slice(0, 4).map((quest) => (
                <QuestReference
                  key={quest.slug}
                  slug={quest.slug}
                  label={quest.data.name}
                  unstyled
                  wrapperClassName="block"
                  className="group hover:bg-accent focus-visible:bg-accent block rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none"
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
                      <ArrowRight className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </Inline>
                  )}
                </QuestReference>
              ))}
              <Link
                to="/quests"
                className="text-primary hover:bg-muted block rounded-md px-3 py-2 text-sm"
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
        <Grid gap="md" smTemplate={2} xlTemplate={4}>
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
                      <EntityKindPill kind={kind}>{allEntities(kind).length}</EntityKindPill>
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
        rowAlign="center"
        rowJustify="between"
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
