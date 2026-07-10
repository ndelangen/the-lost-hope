import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { Avatar } from '#/components/ui/avatar'
import { Card, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { COLLECTION_LABELS, collectionTo, entityLink, type EntityKind } from '#/lib/campaign'
import type { EntityCardItem, ReferencedByItem } from '#/lib/entity-page-data'

export function EntityCollection({ label, items }: { label: string; items: EntityCardItem[] }) {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          {label}
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{label}</h1>
        <p className="text-muted-foreground mt-2">{items.length} entries in the campaign log.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <Link key={`${item.kind}-${item.slug}`} {...entityLink(item.kind, item.slug)}>
            <Card className="hover:border-primary/40 hover:bg-accent/20 h-full transition-colors">
              <CardHeader className="pb-6">
                <CardTitle className="text-base">{item.name}</CardTitle>
                {item.description ? (
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                ) : null}
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
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
    <article className="space-y-8">
      <EntityBackLink kind={kind} />
      {children}
      {referencedBy.length > 0 ? <ReferencedBy items={referencedBy} /> : null}
    </article>
  )
}

export function EntityNotFound({ kind }: { kind: EntityKind }) {
  return (
    <div>
      <EntityBackLink kind={kind} />
      <p className="text-destructive mt-4">Entry not found.</p>
    </div>
  )
}

function EntityBackLink({ kind }: { kind: EntityKind }) {
  return (
    <Link
      to={collectionTo(kind)}
      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm"
    >
      <ArrowLeft className="size-3.5" />
      All {COLLECTION_LABELS[kind]}
    </Link>
  )
}

function ReferencedBy({ items }: { items: ReferencedByItem[] }) {
  return (
    <section className="border-border space-y-3 border-t pt-6">
      <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
        Referenced by
      </h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={`${item.kind}-${item.slug}`}>
            <Link {...entityLink(item.kind, item.slug)} className="hover:text-primary text-sm">
              {item.name}
              <span className="text-muted-foreground"> · {item.reason}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
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
    <Link
      {...entityLink(kind, slug)}
      className="border-border bg-card hover:border-primary/40 hover:bg-accent/20 flex items-center gap-2 rounded-full border py-1 pr-4 pl-1 transition-colors"
    >
      <Avatar src={avatar} alt={name} loading="lazy" className="border-border size-9 border" />
      <span className="text-sm font-medium">{name}</span>
    </Link>
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
