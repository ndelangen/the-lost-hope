import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, BookOpen, Building2, MapPin, ScrollText, Users } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { Badge } from '#/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import {
  activePcs,
  allEntities,
  campaign,
  COLLECTION_LABELS,
  collectionTo,
  COLLECTIONS,
  entityLink,
  openQuests,
  sessionNumber,
  sortedSessions,
  type EntityKind,
} from '#/lib/campaign'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const ICONS: Record<EntityKind, React.ComponentType<{ className?: string }>> = {
  session: ScrollText,
  location: MapPin,
  npc: Users,
  pc: Users,
  event: BookOpen,
  quest: ScrollText,
  organization: Building2,
}

function HomePage() {
  const latestSession = sortedSessions()[0]
  const mysteries = openQuests()

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <Badge variant="secondary">D&D 5e · Homebrew</Badge>
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {campaign.name}
        </h1>
        <ContentRenderer
          content={campaign.description}
          className="text-muted-foreground max-w-3xl text-lg"
        />
      </section>

      {campaign.pitch ? (
        <section className="border-border bg-card rounded-xl border p-6">
          <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
            Call to adventure
          </h2>
          <div className="mt-4">
            {campaign.pitch ? <ContentRenderer content={campaign.pitch} /> : null}
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active party</CardTitle>
            <CardDescription>Who is travelling together right now.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {activePcs().map((pc) => (
              <Link
                key={pc.slug}
                {...entityLink('pc', pc.slug)}
                className="hover:bg-accent/40 flex items-center justify-between rounded-md px-2 py-1.5"
              >
                <span className="font-medium">{pc.data.name}</span>
                <ArrowRight className="text-muted-foreground size-4" />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open mysteries</CardTitle>
            <CardDescription>Quests and clues still unresolved.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {mysteries.map((quest) => (
              <Link
                key={quest.slug}
                {...entityLink('quest', quest.slug)}
                className="hover:bg-accent/40 block rounded-md px-2 py-1.5"
              >
                <p className="font-medium">{quest.data.name}</p>
                <p className="text-muted-foreground text-xs">
                  {quest.data.clues?.length ?? 0} clues tracked
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest session</CardTitle>
            <CardDescription>Most recent play history.</CardDescription>
          </CardHeader>
          <CardContent>
            {latestSession ? (
              <Link
                {...entityLink('session', latestSession.slug)}
                className="group hover:bg-accent/40 block space-y-2 rounded-md p-2"
              >
                <p className="font-medium">
                  Session {sessionNumber(latestSession.slug)} · {latestSession.data.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {latestSession.data.events.length} events ·{' '}
                  {latestSession.data.date.toLocaleDateString(undefined, { dateStyle: 'long' })}
                </p>
                <span className="text-primary inline-flex items-center gap-1 text-sm">
                  Read session
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ) : null}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((kind) => {
          const Icon = ICONS[kind]
          const items = allEntities(kind)
          const featured = kind === 'session' ? sortedSessions()[0] : items[0]
          return (
            <Card key={kind}>
              <CardHeader>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Icon className="size-4" />
                  <CardTitle className="text-base">{COLLECTION_LABELS[kind]}</CardTitle>
                  <Badge variant="secondary" className="ml-auto">
                    {items.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {featured ? (
                  <Link
                    {...entityLink(featured.kind, featured.slug)}
                    className="hover:text-primary font-medium"
                  >
                    {featured.data.name}
                  </Link>
                ) : null}
                <Link to={collectionTo(kind)} className="text-primary text-sm hover:underline">
                  Browse all →
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </section>
    </div>
  )
}
