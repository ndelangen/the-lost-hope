import { Link } from '@tanstack/react-router'
import { ArrowLeft, Clock3 } from 'lucide-react'

import { EntityReference } from '#/components/entity-reference'
import { Avatar } from '#/components/ui/avatar'
import { Card, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { Grid, Inline, Stack } from '#/components/ui/layout'
import { COLLECTION_LABELS, collectionTo, type EntityKind } from '#/lib/campaign'
import { ENTITY_KIND_VISUALS } from '#/lib/entity-kind-visuals'
import type { EntityCardItem, ReferencedByItem } from '#/lib/entity-page-data'
import { cn } from '#/lib/utils'

export function EntityCollection({ label, items }: { label: string; items: EntityCardItem[] }) {
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
          const Icon = visual.icon
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
  referencedBy,
  children,
}: {
  kind: EntityKind
  referencedBy: ReferencedByItem[]
  children: React.ReactNode
}) {
  return (
    <Stack as="article" gap="2xl">
      <EntityBackLink kind={kind} />
      {children}
      {referencedBy.length > 0 ? <ReferencedBy items={referencedBy} /> : null}
    </Stack>
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
      <Grid as="ul" gap="sm" smTemplate={2}>
        {items.map((item) => (
          <li key={`${item.kind}-${item.slug}`}>
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
      </Grid>
    </Stack>
  )
}

export function EntityChip({
  kind,
  slug,
  name,
  avatar,
}: {
  kind: EntityKind
  slug: string
  name: string
  avatar: string
}) {
  return (
    <EntityReference
      kind={kind}
      slug={slug}
      label={name}
      unstyled
      className="border-border bg-card hover:border-primary/40 hover:bg-accent/20 inline-block rounded-full border py-1 pr-4 pl-1 transition-colors"
    >
      {() => (
        <Inline as="span" inline gap="sm">
          <Avatar src={avatar} alt={name} loading="lazy" className="border-border size-9 border" />
          <span className="text-sm font-medium">{name}</span>
        </Inline>
      )}
    </EntityReference>
  )
}

export function EntityPortrait({ src, alt }: { src: string; alt: string }) {
  return (
    <Avatar
      src={src}
      alt={alt}
      loading="lazy"
      className="border-border size-24 border shadow-sm sm:size-28"
    />
  )
}
