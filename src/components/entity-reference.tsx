import { CalendarRange } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'

import {
  CardSuitIcon,
  EffectIcon,
  EventMarkIcon,
  ItemIcon,
  LocationIcon,
  LocationTypeIcon,
  LocationTypeName,
  OrganizationIcon,
  QuestIcon,
  SessionIcon,
} from '#/components/entity-icons'
import { Avatar } from '#/components/ui/avatar'
import { EntityReference as EntityReferenceLink } from '#/components/ui/entity-reference'
import type { PreviewSide } from '#/components/ui/hover-preview'
import { Inline } from '#/components/ui/layout'
import { CARD_TONE_LABELS } from '#/definitions/card'
import { DEFAULT_AVATAR } from '#/definitions/media'
import {
  contentToText,
  effectEntry,
  eventMarkVisual,
  eventLocation,
  getEntity,
  locationParent,
  locationTypeOf,
  npcLocation,
  pcStatLine,
  pcStatusLabel,
  questProgress,
  joinNames,
  refLink,
  resolveRef,
  sessionNumber,
  sessionSlugForEvent,
  type EntityKind,
  type EventMarkVisual,
} from '#/lib/campaign'
import { EFFECT_STATUS_LABELS } from '#/lib/effects'
import { formatSessionDate } from '#/lib/session-date'

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

/** The small face beside a character's or creature's name in running text. */
export function ReferenceAvatar({ src }: { src: string | undefined }) {
  return <Avatar src={src ?? DEFAULT_AVATAR} sizes="14px" maxWidth={32} className="size-3.5" />
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

function referencePresentation(
  kind: EntityKind,
  slug: string,
  label?: string,
): { label: string; icon: ReactNode; preview: ReactNode } {
  switch (kind) {
    case 'pc': {
      const pc = getEntity('pc', slug)?.data
      const name = label ?? pc?.name ?? slug
      const icon = <ReferenceAvatar src={pc?.avatar} />
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
      const icon = <ReferenceAvatar src={npc?.avatar} />
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
      const icon = <ReferenceAvatar src={beast?.avatar} />
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
              {type ? <LocationTypeName type={type} /> : 'Location'}
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
      const icon = (
        <EventReferenceIcon
          mark={event ? eventMarkVisual(event) : undefined}
          className="size-3.5"
        />
      )
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
                {formatSessionDate(session.date, 'medium')} · {session.events.length} events
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
      const icon = item?.avatar ? (
        <Avatar src={item.avatar} sizes="14px" maxWidth={32} className="size-3.5" />
      ) : (
        item && <ItemIcon icon={item.icon} className="size-3.5" />
      )
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
    case 'effect': {
      const effect = getEntity('effect', slug)
      const name = label ?? effect?.data.name ?? slug
      const bearers = effect
        ? joinNames(effect.data.on.map((ref) => refLink(ref)?.name ?? ref.key))
        : undefined
      const status = effect ? EFFECT_STATUS_LABELS[effectEntry(effect).status] : undefined
      const icon = effect ? <EffectIcon icon={effect.data.icon} className="size-3.5" /> : null
      return {
        label: name,
        icon,
        preview: (
          <ReferencePreviewHeader icon={icon} name={name}>
            <span className="text-muted-foreground">Effect{bearers ? ` on ${bearers}` : ''}</span>
            {status ? <span className="text-muted-foreground">{status}</span> : null}
          </ReferencePreviewHeader>
        ),
      }
    }
    case 'card': {
      const card = getEntity('card', slug)
      const name = label ?? card?.data.name ?? slug
      const icon = card ? <CardSuitIcon suit={card.data.suit} className="size-3.5" /> : null
      return {
        label: name,
        icon,
        preview: (
          <ReferencePreviewHeader icon={icon} name={name}>
            <span className="text-muted-foreground">
              Card{card ? ` · ${CARD_TONE_LABELS[card.data.tone]}` : ''}
            </span>
            {card?.data.benefit ? (
              <span className="text-muted-foreground">Benefit: {card.data.benefit}</span>
            ) : null}
            {card?.data.drawback ? (
              <span className="text-muted-foreground">Drawback: {card.data.drawback}</span>
            ) : null}
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

function EventReferenceIcon({ mark, className }: { mark?: EventMarkVisual; className?: string }) {
  if (mark?.type === 'avatar') {
    return (
      <Avatar
        src={mark.url}
        sizes="14px"
        maxWidth={32}
        className={`${className ?? ''} rounded-full`}
      />
    )
  }
  if (mark?.type === 'icon') return <EventMarkIcon name={mark.name} className={className} />
  return <CalendarRange className={className} aria-hidden />
}
