import { createFileRoute, notFound } from '@tanstack/react-router'

import { ContentRenderer } from '#/components/content-renderer'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { DmReference } from '#/components/dm/dm-reference'
import { EntityReference } from '#/components/entity-reference'
import type { EntityRef } from '#/definitions/kind'
import { refLink } from '#/lib/campaign'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { resolveSourceRef } from '#/lib/dm-campaign'
import { ItemIcon } from '#/lib/item-icons'

const items: Readonly<
  Record<string, (typeof SOURCE_REGISTRIES.item)[keyof typeof SOURCE_REGISTRIES.item]>
> = SOURCE_REGISTRIES.item

/** DM pages use the same slug as the item's player page, so the two addresses match. */
export const Route = createFileRoute('/dm/items/$slug')({
  loader: ({ params }) => {
    const key = Object.keys(items).find((candidate) => items[candidate]?.slug === params.slug)
    if (!key) throw notFound()
    return { key }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData ? items[loaderData.key]?.name : 'Item'} | DM` },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: DmItemRoute,
})

function DmItemRoute() {
  const { key } = Route.useLoaderData()
  const item = items[key]!
  const people = [
    ['Made by', item.craftedBy],
    ['Owned by', item.currentOwner],
    ['Carried by', item.carriedBy],
  ] as const

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <article className="border-border bg-card grid min-w-0 content-start gap-5 rounded-xl border p-6">
        <header className="flex items-start gap-4">
          <ItemIcon icon={item.icon} className="text-muted-foreground mt-1 size-8" />
          <div className="grid min-w-0 flex-1 gap-1">
            <p className="text-muted-foreground text-xs font-semibold uppercase">Item · DM view</p>
            <h1 className="text-2xl font-bold">{item.name}</h1>
            <dl className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {people.map(([label, ref]) =>
                ref ? (
                  <div key={label} className="flex gap-1">
                    <dt>{label}</dt>
                    <dd>
                      <RecordLink reference={ref} />
                    </dd>
                  </div>
                ) : null,
              )}
            </dl>
          </div>
        </header>

        <Section title="What players can learn">
          {item.notes ? <ContentRenderer content={item.notes} /> : <Empty />}
        </Section>
        <Section title="Background">
          {item.background ? <ContentRenderer content={item.background} /> : <Empty />}
        </Section>
      </article>
      <aside className="min-w-0">
        <DmQuickLinks />
      </aside>
    </div>
  )
}

/** A record linked to its player page when players have met it, or marked hidden when not. */
function RecordLink({ reference }: { reference: EntityRef }) {
  const record = resolveSourceRef(reference)
  if (!record) return null
  return refLink(reference) ? (
    <EntityReference kind={reference.ref} slug={record.slug} />
  ) : (
    <DmReference reference={reference} />
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-2">
      <h2 className="text-muted-foreground text-xs font-semibold uppercase">{title}</h2>
      {children}
    </section>
  )
}

function Empty() {
  return <p className="text-muted-foreground text-sm">Nothing recorded.</p>
}
