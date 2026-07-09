import { Link } from '@tanstack/react-router'
import { ArrowLeft, Calendar } from 'lucide-react'

import type { Event } from '#/definitions/event.ts'
import type { Location } from '#/definitions/location.ts'
import type { NPC } from '#/definitions/npc.ts'
import type { Organization } from '#/definitions/organization.ts'
import type { PC } from '#/definitions/pc.ts'
import type { Quest } from '#/definitions/quest.ts'
import type { Session } from '#/definitions/session.ts'
import { ContentRenderer, EntityLink, InlineContent, Portrait } from '@/components/content-renderer'
import { LocationMapImage } from '@/components/map-placeholder'
import { LocationTypeIcon, locationTypeLabel } from '@/lib/location-icons'
import { SessionTimeline } from '@/components/session-timeline'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  allEntities,
  COLLECTION_LABELS,
  COLLECTION_PATH,
  contentToText,
  entityHref,
  eventLocation,
  getEntity,
  locationAbsolutePosition,
  locationAncestors,
  locationChildren,
  membershipOrg,
  npcLocation,
  organizationMembers,
  pcStatLine,
  reverseLinks,
  sessionNumber,
  sessionPcs,
  type Entity,
  type EntityKind,
} from '@/lib/campaign'

export function CollectionPage({ kind }: { kind: EntityKind }) {
  const items = allEntities(kind).toSorted((a, b) => a.data.name.localeCompare(b.data.name))

  return (
    <div className="space-y-6">
      <header>
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          {COLLECTION_LABELS[kind]}
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{COLLECTION_LABELS[kind]}</h1>
        <p className="text-muted-foreground mt-2">{items.length} entries in the campaign log.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <EntityCard key={item.slug} entity={item} />
        ))}
      </div>
    </div>
  )
}

function cardTeaser(entity: Entity): string {
  const data = entity.data
  if ('summary' in data && data.summary) return contentToText(data.summary)
  if (entity.kind === 'pc') return pcStatLine(data as PC)
  if (entity.kind === 'location') {
    const description = (data as Location).description
    return description ? contentToText(description) : ''
  }
  if (entity.kind === 'quest') return (data as Quest).description
  return ''
}

export function EntityCard({ entity }: { entity: Entity }) {
  const summary = cardTeaser(entity)

  return (
    <Link to={entityHref(entity.kind, entity.slug)}>
      <Card className="hover:border-primary/40 hover:bg-accent/20 h-full transition-colors">
        <CardHeader className="pb-6">
          <CardTitle className="text-base">{entity.data.name}</CardTitle>
          {summary ? <CardDescription className="line-clamp-2">{summary}</CardDescription> : null}
        </CardHeader>
      </Card>
    </Link>
  )
}

export function EntityDetailPage({ kind, slug }: { kind: EntityKind; slug: string }) {
  const entity = getEntity(kind, slug)
  if (!entity) {
    return (
      <div>
        <BackLink kind={kind} />
        <p className="text-destructive mt-4">Entry not found.</p>
      </div>
    )
  }

  const links = reverseLinks(kind, slug)

  return (
    <article className="space-y-8">
      <BackLink kind={kind} />
      {renderHeader(entity)}
      {renderBody(entity)}
      {links.length > 0 ? (
        <section className="border-border space-y-3 border-t pt-6">
          <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
            Referenced by
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {links.map(({ entity: ref, reason }) => (
              <li key={`${ref.kind}-${ref.slug}`}>
                <Link to={entityHref(ref.kind, ref.slug)} className="hover:text-primary text-sm">
                  {ref.data.name}
                  <span className="text-muted-foreground"> · {reason}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}

function BackLink({ kind }: { kind: EntityKind }) {
  return (
    <Link
      to={`/${COLLECTION_PATH[kind]}`}
      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm"
    >
      <ArrowLeft className="size-3.5" />
      All {COLLECTION_LABELS[kind]}
    </Link>
  )
}

function renderHeader(entity: Entity) {
  switch (entity.kind) {
    case 'pc': {
      const pc = entity.data as PC
      return (
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <Portrait src={pc.avatar} alt={pc.name} />
          <div className="space-y-3">
            <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Player character
            </p>
            <h1 className="text-4xl font-bold tracking-tight">{pc.name}</h1>
            <div className="flex flex-wrap gap-2">
              <Badge variant={pc.status === 'active' ? 'success' : 'outline'}>{pc.status}</Badge>
              {pc.species ? <Badge variant="secondary">{pc.species}</Badge> : null}
              {pc.class ? <Badge variant="outline">{pc.class}</Badge> : null}
              {pc.subclass ? <Badge variant="outline">{pc.subclass}</Badge> : null}
              {pc.level ? <Badge variant="outline">Level {pc.level}</Badge> : null}
            </div>
            <p className="text-muted-foreground text-sm">Played by {pc.player}</p>
            {pc.languages?.length ? (
              <p className="text-muted-foreground text-sm">
                <span className="font-medium">Languages:</span> {pc.languages.join(', ')}
              </p>
            ) : null}
            {pc.url ? (
              <a
                href={pc.url}
                target="_blank"
                rel="noreferrer"
                className="text-primary text-sm hover:underline"
              >
                Character sheet →
              </a>
            ) : null}
          </div>
        </header>
      )
    }
    case 'npc': {
      const npc = entity.data as NPC
      const home = npcLocation(npc)
      return (
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <Portrait src={npc.avatar} alt={npc.name} />
          <div className="space-y-3">
            <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              NPC
            </p>
            <h1 className="text-4xl font-bold tracking-tight">{npc.name}</h1>
            <div className="flex flex-wrap gap-2">
              {npc.role ? <Badge variant="secondary">{npc.role}</Badge> : null}
              {npc.species ? <Badge variant="outline">{npc.species}</Badge> : null}
              {home ? (
                <EntityLink kind="location" slug={home.slug} label={`📍 ${home.name}`} />
              ) : null}
            </div>
            {npc.languages?.length ? (
              <p className="text-muted-foreground text-sm">
                <span className="font-medium">Languages:</span> {npc.languages.join(', ')}
              </p>
            ) : null}
            {npc.summary ? (
              <p className="text-muted-foreground">
                <InlineContent content={npc.summary} />
              </p>
            ) : null}
          </div>
        </header>
      )
    }
    case 'location': {
      const location = entity.data as Location
      const ancestors = locationAncestors(location)
      const coordinates = locationAbsolutePosition(location)
      return (
        <header className="space-y-4">
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Location
          </p>
          {ancestors.length > 0 ? (
            <p className="text-muted-foreground text-sm">
              {ancestors.map((ancestor, index) => (
                <span key={ancestor.slug}>
                  {index > 0 ? <span className="mx-1.5 opacity-50">›</span> : null}
                  <Link
                    to={entityHref('location', ancestor.slug)}
                    className="hover:text-primary transition-colors"
                  >
                    {ancestor.name}
                  </Link>
                </span>
              ))}
            </p>
          ) : null}
          <h1 className="text-4xl font-bold tracking-tight">{location.name}</h1>
          {location.aliases?.length ? (
            <p className="text-muted-foreground text-sm">
              Also known as {location.aliases.join(', ')}
            </p>
          ) : null}
          {'type' in location ? (
            <Badge variant="secondary" className="gap-1">
              <LocationTypeIcon type={location.type} className="size-3" />
              {locationTypeLabel(location.type, true)}
            </Badge>
          ) : null}
          <LocationMapImage
            src={location.map?.url ?? ''}
            alt={location.name}
            coordinates={coordinates}
          />
        </header>
      )
    }
    case 'session': {
      const session = entity.data as Session
      return (
        <header className="space-y-3">
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Session {sessionNumber(entity.slug)}
          </p>
          <h1 className="text-4xl font-bold tracking-tight">{session.name}</h1>
          <div className="text-muted-foreground flex flex-wrap gap-2 text-sm">
            <span className="border-border inline-flex items-center gap-1 rounded-full border px-2.5 py-1">
              <Calendar className="size-3.5" />
              {session.date.toLocaleDateString(undefined, { dateStyle: 'long' })}
            </span>
            <Badge variant="secondary">{session.events.length} events</Badge>
          </div>
        </header>
      )
    }
    case 'event': {
      const event = entity.data as Event
      const place = eventLocation(event)
      return (
        <header className="space-y-3">
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Event
          </p>
          <h1 className="text-4xl font-bold tracking-tight">{event.name}</h1>
          <div className="text-muted-foreground flex flex-wrap gap-2 text-sm">
            <span className="border-border inline-flex items-center gap-1 rounded-full border px-2.5 py-1">
              <Calendar className="size-3.5" />
              {event.date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
            {place ? <EntityLink kind="location" slug={place.slug} label={place.name} /> : null}
          </div>
        </header>
      )
    }
    case 'quest': {
      const quest = entity.data as Quest
      return (
        <header className="space-y-3">
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Quest
          </p>
          <h1 className="text-4xl font-bold tracking-tight">{quest.name}</h1>
          <Badge variant={quest.status === 'open' ? 'warning' : 'success'}>{quest.status}</Badge>
          <p className="text-muted-foreground">{quest.description}</p>
        </header>
      )
    }
    case 'organization': {
      const organization = entity.data as Organization
      return (
        <header className="space-y-3">
          <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Organization
          </p>
          <h1 className="text-4xl font-bold tracking-tight">{organization.name}</h1>
          {organization.summary ? (
            <p className="text-muted-foreground text-lg">
              <InlineContent content={organization.summary} />
            </p>
          ) : null}
        </header>
      )
    }
  }
}

function MemberOf({ character }: { character: PC | NPC }) {
  const memberships = character.memberships
  if (!memberships?.length) return null

  return (
    <section className="space-y-3">
      <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
        Member of
      </h2>
      <ul className="space-y-2">
        {memberships.map((membership) => {
          const org = membershipOrg(membership)
          if (!org) return null
          return (
            <li
              key={org.slug}
              className="border-border flex flex-wrap items-center gap-2 rounded-md border px-3 py-2"
            >
              <Link
                to={entityHref('organization', org.slug)}
                className="text-primary font-medium hover:underline"
              >
                {org.name}
              </Link>
              <Badge variant="secondary">{membership.rank}</Badge>
              <Badge variant={membership.status === 'active' ? 'success' : 'outline'}>
                {membership.status}
              </Badge>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function OrganizationMembers({ organization }: { organization: Organization }) {
  const groups = organizationMembers(organization)
  if (groups.length === 0) return null

  return (
    <section className="space-y-6">
      <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
        Members
      </h2>
      {groups.map((group) => (
        <div key={group.status} className="space-y-4">
          <h3 className="text-lg font-semibold capitalize">{group.status}</h3>
          {group.ranks.map((rankGroup) => (
            <div key={`${group.status}-${rankGroup.rank}`} className="space-y-3">
              <h4 className="text-muted-foreground text-sm font-medium">{rankGroup.rank}</h4>
              <ul className="flex flex-wrap gap-3">
                {rankGroup.members.map((member) => (
                  <li key={`${member.kind}-${member.slug}`}>
                    <Link
                      to={entityHref(member.kind, member.slug)}
                      className="border-border bg-card hover:border-primary/40 hover:bg-accent/20 flex items-center gap-2 rounded-full border py-1 pr-4 pl-1 transition-colors"
                    >
                      <Avatar
                        src={member.avatar}
                        alt={member.name}
                        loading="lazy"
                        className="border-border size-9 border"
                      />
                      <span className="text-sm font-medium">{member.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}

function SessionParty({ session }: { session: Session }) {
  const pcs = sessionPcs(session)
  if (pcs.length === 0) return null

  return (
    <section className="space-y-4">
      <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
        Party present
      </h2>
      <ul className="flex flex-wrap gap-3">
        {pcs.map((pc) => (
          <li key={pc.slug}>
            <Link
              to={entityHref('pc', pc.slug)}
              className="border-border bg-card hover:border-primary/40 hover:bg-accent/20 flex items-center gap-2 rounded-full border py-1 pr-4 pl-1 transition-colors"
            >
              <Avatar
                src={pc.avatar}
                alt={pc.name}
                loading="lazy"
                className="border-border size-9 border"
              />
              <span className="text-sm font-medium">{pc.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function renderBody(entity: Entity) {
  switch (entity.kind) {
    case 'pc':
    case 'npc': {
      const character = entity.data as PC | NPC
      const notes = character.notes
      return (
        <div className="space-y-8">
          <MemberOf character={character} />
          {notes ? <ContentRenderer content={notes} /> : null}
        </div>
      )
    }
    case 'location': {
      const location = entity.data as Location
      const children = locationChildren(entity.slug)
      return (
        <div className="space-y-8">
          {children.length > 0 ? (
            <section className="space-y-3">
              <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                Places within
              </h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {children.map((child) => (
                  <li key={child.slug}>
                    <Link
                      to={entityHref('location', child.slug)}
                      className="border-border hover:border-primary/40 hover:bg-accent/20 block rounded-md border px-3 py-2 transition-colors"
                    >
                      <span className="text-sm font-medium">{child.data.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {location.description ? <ContentRenderer content={location.description} /> : null}
        </div>
      )
    }
    case 'session': {
      const session = entity.data as Session
      return (
        <div className="space-y-8">
          <SessionParty session={session} />
          <SessionTimeline session={session} />
        </div>
      )
    }
    case 'event': {
      const event = entity.data as Event
      return (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">What happened</h2>
          <ContentRenderer content={event.parts} />
        </section>
      )
    }
    case 'quest': {
      const quest = entity.data as Quest
      return (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Clues</CardTitle>
              <CardDescription>What the party has picked up so far.</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentRenderer content={quest.clues} />
            </CardContent>
          </Card>
          {quest.conclusion.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Conclusion</CardTitle>
              </CardHeader>
              <CardContent>
                <ContentRenderer content={quest.conclusion} />
              </CardContent>
            </Card>
          ) : null}
        </div>
      )
    }
    case 'organization': {
      const organization = entity.data as Organization
      const notes = organization.notes
      return (
        <div className="space-y-8">
          <OrganizationMembers organization={organization} />
          {notes ? <ContentRenderer content={notes} /> : null}
        </div>
      )
    }
  }
}
