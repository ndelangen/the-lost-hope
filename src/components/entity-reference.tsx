import { CalendarRange } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'

import { Avatar } from '#/components/ui/avatar'
import { EntityReference as EntityReferenceLink } from '#/components/ui/entity-reference'
import type { PreviewSide } from '#/components/ui/hover-preview'
import { Inline } from '#/components/ui/layout'
import type { EventMark } from '#/definitions/event'
import { DEFAULT_AVATAR } from '#/definitions/media'
import {
  contentToText,
  eventLocation,
  getEntity,
  locationParent,
  locationTypeOf,
  npcLocation,
  pcStatLine,
  pcStatusLabel,
  questProgress,
  refLink,
  resolveRef,
  sessionNumber,
  sessionSlugForEvent,
  type EntityKind,
} from '#/lib/campaign'
import { EventMarkIcon } from '#/lib/event-icons'
import { ItemIcon } from '#/lib/item-icons'
import { LocationIcon, LocationTypeIcon, locationTypeLabel } from '#/lib/location-icons'
import { OrganizationIcon } from '#/lib/organization-icons'
import { QuestIcon } from '#/lib/quest-icons'
import { SessionIcon } from '#/lib/session-icons'

export type EntityReferenceRenderData = {
  label: string
  icon: ReactNode
}

export type EntityReferenceProps = {
  kind: EntityKind
  slug: string
  label?: string
  className?: string
  wrapperClassName?: string
  wrapperStyle?: CSSProperties
  previewSide?: PreviewSide
  unstyled?: boolean
  children?: (reference: EntityReferenceRenderData) => ReactNode
  onNavigate?: () => void
}

/** The exhaustive canonical inline reference for every campaign entity kind. */
export function EntityReference({
  kind,
  slug,
  label,
  className,
  wrapperClassName,
  wrapperStyle,
  previewSide,
  unstyled,
  children,
  onNavigate,
}: EntityReferenceProps) {
  const presentation = referencePresentation(kind, slug, label)
  return (
    <EntityReferenceLink
      kind={kind}
      slug={slug}
      label={presentation.label}
      icon={presentation.icon}
      tooltip={presentation.preview}
      className={className}
      wrapperClassName={wrapperClassName}
      wrapperStyle={wrapperStyle}
      previewSide={previewSide}
      unstyled={unstyled}
      onNavigate={onNavigate}
    >
      {children?.({ label: presentation.label, icon: presentation.icon })}
    </EntityReferenceLink>
  )
}

/** Shared preview content for compact navigation and other purpose-built links. */
export function EntityReferencePreview({
  kind,
  slug,
}: Pick<EntityReferenceProps, 'kind' | 'slug'>) {
  return referencePresentation(kind, slug).preview
}

function referencePresentation(
  kind: EntityKind,
  slug: string,
  label?: string,
): { label: string; icon: ReactNode; preview: ReactNode } {
  switch (kind) {
    case 'pc': {
      const pc = getEntity('pc', slug)?.data
      const name = label ?? pc?.name ?? slug
      const icon = <Avatar src={pc?.avatar ?? DEFAULT_AVATAR} className="size-3.5" />
      return {
        label: name,
        icon,
        preview: (
          <ReferencePreviewHeader icon={icon} name={name}>
            <span className="text-muted-foreground">
              {pc ? pcStatLine(pc) || 'Player character' : 'Player character'}
            </span>
            {pc ? (
              <span className="text-muted-foreground">Played by {pc.player || 'unknown'}</span>
            ) : null}
            {pc && pc.status !== 'active' ? (
              <span className="text-muted-foreground">{pcStatusLabel(pc.status)}</span>
            ) : null}
          </ReferencePreviewHeader>
        ),
      }
    }
    case 'npc': {
      const npc = getEntity('npc', slug)?.data
      const name = label ?? npc?.name ?? slug
      const home = npc ? npcLocation(npc) : undefined
      const icon = <Avatar src={npc?.avatar ?? DEFAULT_AVATAR} className="size-3.5" />
      return {
        label: name,
        icon,
        preview: (
          <ReferencePreviewHeader icon={icon} name={name}>
            <span className="text-muted-foreground">
              {npc?.species ? `NPC · ${npc.species}` : 'NPC'}
            </span>
            {home ? <PreviewLocation name={home.name} icon={home.icon} /> : null}
          </ReferencePreviewHeader>
        ),
      }
    }
    case 'beast': {
      const beast = getEntity('beast', slug)?.data
      const name = label ?? beast?.name ?? slug
      const locationEntity = beast?.location ? resolveRef(beast.location) : undefined
      const home = locationEntity?.kind === 'location' ? locationEntity.data : undefined
      const icon = <Avatar src={beast?.avatar ?? DEFAULT_AVATAR} className="size-3.5" />
      return {
        label: name,
        icon,
        preview: (
          <ReferencePreviewHeader icon={icon} name={name}>
            <span className="text-muted-foreground">
              {beast?.species ? `Beast · ${beast.species}` : 'Beast'}
            </span>
            {home ? <PreviewLocation name={home.name} icon={home.icon} /> : null}
          </ReferencePreviewHeader>
        ),
      }
    }
    case 'location': {
      const location = getEntity('location', slug)?.data
      const name = label ?? location?.name ?? slug
      const type = location ? locationTypeOf(location) : undefined
      const parent = location ? locationParent(location) : undefined
      const icon = <LocationIcon icon={location?.icon} className="size-3.5" />
      return {
        label: name,
        icon,
        preview: (
          <ReferencePreviewHeader icon={icon} name={name}>
            <Inline as="span" inline gap="xs" className="text-muted-foreground">
              {type ? <LocationTypeIcon type={type} className="size-3.5" /> : null}
              {type ? locationTypeLabel(type) : 'Location'}
            </Inline>
            {parent ? <PreviewLocation name={`in ${parent.name}`} icon={parent.icon} /> : null}
          </ReferencePreviewHeader>
        ),
      }
    }
    case 'event': {
      const event = getEntity('event', slug)?.data
      const name = label ?? event?.name ?? slug
      const place = event ? eventLocation(event) : undefined
      const sessionSlug = sessionSlugForEvent(slug)
      const session = sessionSlug ? getEntity('session', sessionSlug) : undefined
      const icon = <EventReferenceIcon mark={event?.mark} className="size-3.5" />
      return {
        label: name,
        icon,
        preview: (
          <ReferencePreviewHeader icon={icon} name={name}>
            <span className="text-muted-foreground">{event ? `day ${event.day}` : 'Event'}</span>
            {session ? (
              <span className="text-muted-foreground">
                Session {sessionNumber(session.slug)} · {session.data.name}
              </span>
            ) : null}
            {place ? <PreviewLocation name={place.name} icon={place.icon} /> : null}
          </ReferencePreviewHeader>
        ),
      }
    }
    case 'session': {
      const session = getEntity('session', slug)?.data
      const name = label ?? session?.name ?? slug
      const icon = <SessionIcon icon={session?.icon} className="size-3.5" />
      return {
        label: name,
        icon,
        preview: (
          <ReferencePreviewHeader icon={icon} name={name}>
            <span className="text-muted-foreground">Session {sessionNumber(slug) ?? '—'}</span>
            {session ? (
              <span className="text-muted-foreground">
                {session.date.toLocaleDateString(undefined, { dateStyle: 'medium' })} ·{' '}
                {session.events.length} events
              </span>
            ) : null}
          </ReferencePreviewHeader>
        ),
      }
    }
    case 'quest': {
      const quest = getEntity('quest', slug)?.data
      const name = label ?? quest?.name ?? slug
      const progress = quest ? questProgress(quest) : undefined
      const icon = quest ? <QuestIcon icon={quest.icon} className="size-3.5" /> : null
      const daysAgo = progress?.campaignDaysAgo
      return {
        label: name,
        icon,
        preview: (
          <ReferencePreviewHeader icon={icon} name={name}>
            <span className="text-muted-foreground capitalize">
              {quest ? `${quest.status} quest` : 'Quest'}
            </span>
            <span className="text-muted-foreground">
              {progress
                ? `${daysAgo === 0 ? 'Current day' : `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`} · ${progress.event.data.name}`
                : 'No linked progress'}
            </span>
          </ReferencePreviewHeader>
        ),
      }
    }
    case 'organization': {
      const organization = getEntity('organization', slug)?.data
      const name = label ?? organization?.name ?? slug
      const notes = organization?.notes ? contentToText(organization.notes) : undefined
      const icon = <OrganizationIcon icon={organization?.icon} className="size-3.5" />
      return {
        label: name,
        icon,
        preview: (
          <ReferencePreviewHeader icon={icon} name={name}>
            <span className="text-muted-foreground">Organization</span>
            {notes ? <span className="text-muted-foreground line-clamp-3">{notes}</span> : null}
          </ReferencePreviewHeader>
        ),
      }
    }
    case 'item': {
      const item = getEntity('item', slug)?.data
      const name = label ?? item?.name ?? slug
      const owner = item?.currentOwner ? refLink(item.currentOwner) : undefined
      const carrier = item?.carriedBy ? refLink(item.carriedBy) : undefined
      const icon = item ? <ItemIcon icon={item.icon} className="size-3.5" /> : null
      return {
        label: name,
        icon,
        preview: (
          <ReferencePreviewHeader icon={icon} name={name}>
            <span className="text-muted-foreground">Item</span>
            <span className="text-muted-foreground">Owner: {owner?.name ?? 'Unknown'}</span>
            <span className="text-muted-foreground">Carried by: {carrier?.name ?? 'Unknown'}</span>
          </ReferencePreviewHeader>
        ),
      }
    }
  }
}

function ReferencePreviewHeader({
  icon,
  name,
  children,
}: {
  icon: ReactNode
  name: string
  children: ReactNode
}) {
  return (
    <>
      <Inline as="span" inline gap="xs" className="font-medium">
        {icon}
        {name}
      </Inline>
      {children}
    </>
  )
}

function PreviewLocation({ name, icon }: { name: string; icon?: string }) {
  return (
    <Inline as="span" inline gap="xs" className="text-muted-foreground">
      <LocationIcon icon={icon} className="size-3" />
      {name}
    </Inline>
  )
}

function EventReferenceIcon({ mark, className }: { mark?: EventMark; className?: string }) {
  if (mark?.type === 'avatar') {
    return <img src={mark.url} alt="" className={`${className ?? ''} rounded-full object-cover`} />
  }
  if (mark?.type === 'icon') return <EventMarkIcon name={mark.name} className={className} />
  return <CalendarRange className={className} aria-hidden />
}
