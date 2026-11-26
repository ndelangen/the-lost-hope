import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { BookOpen } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { DmReference } from '#/components/dm/dm-reference'
import { EntityReference } from '#/components/entity-reference'
import { ForetoldList } from '#/components/foretold-list'
import { LibraryImage } from '#/components/library/library-image'
import { ITEM_STATUS_LABELS, VESSEL_CLASS_LABELS } from '#/definitions/item'
import type { EntityRef } from '#/definitions/kind'
import { refLink, reverseLinks } from '#/lib/campaign'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { resolveSourceRef } from '#/lib/dm-campaign'
import { ItemIcon } from '#/lib/item-icons'
import {
  formatItemPrice,
  itemCategoryTone,
  loadItemFacts,
  scenesMentioningItem,
} from '#/lib/item-view'
import { cn } from '#/lib/utils'

const items: Readonly<
  Record<string, (typeof SOURCE_REGISTRIES.item)[keyof typeof SOURCE_REGISTRIES.item]>
> = SOURCE_REGISTRIES.item

/** DM pages use the same slug as the item's player page, so the two addresses match. */
export const Route = createFileRoute('/dm/items/$slug')({
  loader: async ({ params }) => {
    const key = Object.keys(items).find((candidate) => items[candidate]?.slug === params.slug)
    if (!key) throw notFound()
    return { key, facts: await loadItemFacts(items[key]!) }
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
  const { key, facts } = Route.useLoaderData()
  const item = items[key]!
  const tone = itemCategoryTone(facts.category)
  const holders = [
    ['Owned by', item.currentOwner],
    ['Carried by', item.carriedBy],
    ['Made by', item.craftedBy],
    ...(item.controlledBy ? ([['Controlled by', item.controlledBy]] as const) : []),
  ] as const
  const chips = [
    facts.price ? ['Worth', formatItemPrice(facts.price)] : undefined,
    item.quantity ? ['Quantity', String(item.quantity)] : undefined,
    item.vessel ? ['Vessel', VESSEL_CLASS_LABELS[item.vessel]] : undefined,
    item.status ? ['Status', ITEM_STATUS_LABELS[item.status]] : undefined,
  ].filter((fact): fact is [string, string] => fact !== undefined)
  const scenes = scenesMentioningItem(key)
  const events = reverseLinks('item', item.slug).filter((link) => link.entity.kind === 'event')

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <article className="border-border bg-card min-w-0 content-start overflow-hidden rounded-xl border">
        <header className={cn('flex items-center gap-5 p-6 ring-1 ring-inset', tone)}>
          {facts.library?.picture ? (
            <LibraryImage
              src={facts.library.picture}
              alt=""
              sizes="128px"
              maxWidth={384}
              className="size-32 shrink-0 rounded-2xl object-contain shadow-sm"
            />
          ) : (
            <div className="bg-card/80 grid size-20 shrink-0 place-items-center rounded-2xl shadow-sm">
              <ItemIcon icon={item.icon} className="size-12" />
            </div>
          )}
          <div className="grid min-w-0 flex-1 gap-1">
            <p className="text-xs font-semibold tracking-wider uppercase opacity-80">
              {facts.category} · DM view
            </p>
            <h1 className="text-foreground text-3xl font-bold">{item.name}</h1>
            {chips.length > 0 ? (
              <dl className="mt-1 flex flex-wrap gap-2">
                {chips.map(([label, value]) => (
                  <div
                    key={label}
                    className="bg-card/80 text-foreground flex items-baseline gap-1.5 rounded-full px-3 py-1 text-sm shadow-sm"
                  >
                    <dt className="text-muted-foreground text-xs">{label}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {facts.library ? (
              <Link
                to="/library/$type/$slug"
                params={{ type: 'items', slug: facts.library.slug }}
                className="text-foreground mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
              >
                <BookOpen aria-hidden className="size-4" />
                Library entry: {facts.library.name}
              </Link>
            ) : null}
          </div>
        </header>

        <div className="grid gap-6 p-6">
          <dl className="grid gap-3 sm:grid-cols-3">
            {holders.map(([label, ref]) => (
              <div key={label} className="border-border grid gap-1 rounded-lg border p-3">
                <dt className="text-muted-foreground text-xs font-semibold uppercase">{label}</dt>
                <dd className="text-sm">
                  {ref ? (
                    <RecordLink reference={ref} />
                  ) : (
                    <span className="text-muted-foreground">Unknown</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <Section title="What players can learn">
            {item.notes ? <ContentRenderer content={item.notes} /> : <Empty />}
          </Section>
          <Section title="Background">
            {item.background ? <ContentRenderer content={item.background} /> : <Empty />}
          </Section>
          {item.foretold ? (
            <Section title="Foretold">
              <ForetoldList foretold={item.foretold} />
            </Section>
          ) : null}
          <div className="grid gap-6 sm:grid-cols-2">
            <Section title="In prepared scenes">
              {scenes.length > 0 ? (
                <ul className="grid gap-1 text-sm">
                  {scenes.map((scene) => (
                    <li key={scene.key}>
                      <DmReference reference={scene} />
                    </li>
                  ))}
                </ul>
              ) : (
                <Empty />
              )}
            </Section>
            <Section title="In played events">
              {events.length > 0 ? (
                <ul className="grid gap-1 text-sm">
                  {events.map(({ entity }) => (
                    <li key={entity.slug}>
                      <EntityReference kind={entity.kind} slug={entity.slug} />
                    </li>
                  ))}
                </ul>
              ) : (
                <Empty />
              )}
            </Section>
          </div>
        </div>
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
    <section className="grid content-start gap-2">
      <h2 className="text-muted-foreground text-xs font-semibold uppercase">{title}</h2>
      {children}
    </section>
  )
}

function Empty() {
  return <p className="text-muted-foreground text-sm">Nothing recorded.</p>
}
