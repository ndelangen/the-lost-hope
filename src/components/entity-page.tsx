import { Link } from '@tanstack/react-router'
import { ArrowLeft, Clock3 } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'

import { EntityReference } from '#/components/entity-reference'
import { Card, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { Grid, Inline, Stack, SwitchLayout } from '#/components/ui/layout'
import { COLLECTION_LABELS, collectionTo, type EntityKind } from '#/lib/campaign'
import { ENTITY_KIND_VISUALS } from '#/lib/entity-kind-visuals'
import type { EntityCardItem, ReferencedByItem } from '#/lib/entity-page-data'
import { cn } from '#/lib/utils'

type CollectionIcon = ComponentType<{ className?: string; 'aria-hidden'?: boolean }>

type EntityDetailVisual = {
  variant: 'avatar' | 'icon'
  content: ReactNode
}

export function EntityCollection({
  label,
  items,
  iconForItem,
}: {
  label: string
  items: EntityCardItem[]
  iconForItem?: (item: EntityCardItem) => CollectionIcon
}) {
  return (
    <Stack gap="xl">
      <Stack as="header" gap="sm">
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          {label}
        </p>
        <h1 className="text-3xl font-bold tracking-tight">{label}</h1>
        <p className="text-muted-foreground">{items.length} entries in the campaign log.</p>
      </Stack>

      <Grid gap="lg" smTemplate={2}>
        {items.map((item) => {
          const visual = ENTITY_KIND_VISUALS[item.kind]
          const Icon = iconForItem?.(item) ?? visual.icon
          return (
            <EntityReference
              key={`${item.kind}-${item.slug}`}
              kind={item.kind}
              slug={item.slug}
              unstyled
              wrapperClassName="block h-full"
              className="group block h-full rounded-xl focus-visible:ring-2 focus-visible:outline-none"
            >
              {() => (
                <Card
                  className={cn(
                    'relative h-full overflow-hidden transition-colors',
                    visual.hoverClassName,
                  )}
                >
                  <Icon
                    className={cn(
                      'pointer-events-none absolute -right-4 -bottom-5 size-24 rotate-[-8deg] opacity-[0.06] transition-all group-hover:scale-110 group-hover:opacity-[0.16]',
                      visual.accentClassName,
                    )}
                    aria-hidden
                  />
                  <CardHeader className="relative z-10 pb-6">
                    <Inline gap="md" align="start">
                      <Icon
                        className={cn('size-5 shrink-0 translate-y-0.5', visual.accentClassName)}
                      />
                      <Stack gap="xs" className="min-w-0">
                        <CardTitle className="text-base">{item.name}</CardTitle>
                        {item.meta ? (
                          <Inline as="p" gap="xs" className="text-muted-foreground text-xs">
                            <Clock3 className="size-3.5" />
                            {item.meta}
                          </Inline>
                        ) : null}
                        {item.description ? (
                          <CardDescription className="line-clamp-2">
                            {item.description}
                          </CardDescription>
                        ) : null}
                      </Stack>
                    </Inline>
                  </CardHeader>
                </Card>
              )}
            </EntityReference>
          )
        })}
      </Grid>
    </Stack>
  )
}

export function EntityDetail({
  kind,
  title,
  typeLabel,
  visual,
  headerContext,
  headerAside,
  headerContent,
  correction,
  referencedBy,
  children,
}: {
  kind: EntityKind
  title: string
  typeLabel?: ReactNode
  visual?: EntityDetailVisual | false
  headerContext?: ReactNode
  headerAside?: ReactNode
  headerContent?: ReactNode
  correction: ReactNode
  referencedBy: ReferencedByItem[]
  children?: ReactNode
}) {
  return (
    <Stack as="article" gap="2xl">
      <EntityBackLink kind={kind} />
      <EntityDetailHeader
        kind={kind}
        title={title}
        typeLabel={typeLabel}
        visual={visual}
        context={headerContext}
        aside={headerAside}
      >
        {headerContent}
      </EntityDetailHeader>
      {children}
      {correction}
      {referencedBy.length > 0 ? <ReferencedBy items={referencedBy} /> : null}
    </Stack>
  )
}

const ENTITY_DETAIL_LABELS: Record<EntityKind, string> = {
  beast: 'Beast',
  pc: 'Player character',
  npc: 'NPC',
  location: 'Location',
  event: 'Event',
  session: 'Session',
  quest: 'Quest',
  organization: 'Organization',
  item: 'Item',
}

export function EntityDetailHeader({
  kind,
  title,
  typeLabel = ENTITY_DETAIL_LABELS[kind],
  visual,
  context,
  aside,
  children,
}: {
  kind: EntityKind
  title: string
  typeLabel?: ReactNode
  visual?: EntityDetailVisual | false
  context?: ReactNode
  aside?: ReactNode
  children?: ReactNode
}) {
  const kindVisual = ENTITY_KIND_VISUALS[kind]
  const KindIcon = kindVisual.icon
  const hasVisual = visual !== false
  const visualVariant = visual === false ? undefined : (visual?.variant ?? 'icon')
  const typeLabelContent = (
    <p className={cn('text-xs font-semibold tracking-wider uppercase', kindVisual.accentClassName)}>
      {typeLabel}
    </p>
  )

  return (
    <SwitchLayout
      as="header"
      gap="lg"
      rowAlign={visualVariant === 'avatar' || aside ? 'start' : 'center'}
      className={visualVariant === 'icon' ? 'flex-row' : undefined}
    >
      {hasVisual ? (
        <Inline
          gap="none"
          justify="center"
          className={cn(
            'shrink-0 overflow-hidden',
            visualVariant === 'avatar'
              ? 'size-40 rounded-2xl'
              : [
                  'size-16 rounded-xl border sm:size-24',
                  kindVisual.accentClassName,
                  kindVisual.borderClassName,
                  kindVisual.surfaceClassName,
                ],
          )}
        >
          {visual === undefined ? <KindIcon className="size-10" aria-hidden /> : visual.content}
        </Inline>
      ) : null}
      <Stack
        gap="sm"
        className={cn('min-w-0', visualVariant === 'icon' ? 'flex-1' : aside && 'w-full sm:flex-1')}
      >
        {aside ? (
          <Inline gap="sm" align="center" justify="between">
            {typeLabelContent}
            <Inline as="span" inline gap="none" className="shrink-0">
              {aside}
            </Inline>
          </Inline>
        ) : (
          typeLabelContent
        )}
        {context}
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h1>
        {children}
      </Stack>
    </SwitchLayout>
  )
}

export function EntityNotFound({ kind }: { kind: EntityKind }) {
  return (
    <Stack gap="lg">
      <EntityBackLink kind={kind} />
      <p className="text-destructive">Entry not found.</p>
    </Stack>
  )
}

function EntityBackLink({ kind }: { kind: EntityKind }) {
  return (
    <Link to={collectionTo(kind)} className="text-muted-foreground hover:text-foreground text-sm">
      <Inline as="span" inline gap="2xs">
        <ArrowLeft className="size-3.5" />
        All {COLLECTION_LABELS[kind]}
      </Inline>
    </Link>
  )
}

function ReferencedBy({ items }: { items: ReferencedByItem[] }) {
  return (
    <Stack as="section" gap="md" className="border-border border-t pt-6">
      <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
        Referenced by
      </h2>
      <ul className="columns-1 gap-x-8 md:columns-2 xl:columns-3">
        {items.map((item) => (
          <li key={`${item.kind}-${item.slug}`} className="mb-2 break-inside-avoid">
            <EntityReference
              kind={item.kind}
              slug={item.slug}
              label={item.name}
              unstyled
              className="hover:text-primary text-sm"
            >
              {({ label }) => label}
            </EntityReference>
          </li>
        ))}
      </ul>
    </Stack>
  )
}
