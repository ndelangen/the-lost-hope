import { createFileRoute, notFound } from '@tanstack/react-router'
import { lazy, Suspense, useState } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { DmFaces } from '#/components/dm/dm-faces'
import { DmHiddenReference } from '#/components/dm/dm-hidden-reference'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { StatBlockSheet, type StatBlockLayout } from '#/components/dm/stat-block-sheet'
import { EntityReference } from '#/components/entity-reference'
import { ShowToPlayersButton } from '#/components/player-screen/show-to-players-button'
import { PortraitGallery } from '#/components/portrait-gallery'
import { refLink } from '#/lib/campaign'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { creatures, resolveSourceRef, resolveStatBlock } from '#/lib/dm-campaign'
import { playableStats } from '#/lib/dm-encounter'
import { resolvePlayerScreenImage } from '#/lib/player-screen'

const npcs: Readonly<
  Record<string, (typeof SOURCE_REGISTRIES.npc)[keyof typeof SOURCE_REGISTRIES.npc]>
> = SOURCE_REGISTRIES.npc

/** The portrait job only exists in local dev; the static build drops this import. */
const PortraitStatus = import.meta.env.DEV
  ? lazy(() =>
      import('#/components/dm/npc-portrait-status').then((module) => ({
        default: module.NpcPortraitStatus,
      })),
    )
  : undefined

export const Route = createFileRoute('/dm/npcs/$key')({
  loader: ({ params }) => {
    if (!Object.hasOwn(npcs, params.key)) throw notFound()
    return { key: params.key }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData ? npcs[loaderData.key]?.name : 'NPC'} | DM` },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: DmNpcRoute,
})

function DmNpcRoute() {
  const { key } = Route.useLoaderData()
  const npc = npcs[key]!
  const location = npc.location ? resolveSourceRef(npc.location) : undefined
  const stats = resolveStatBlock(npc.stats)
  const shared = 'ref' in npc.stats ? creatures[npc.stats.key] : undefined
  // Preview only: both layouts side by side until one is chosen.
  const [layout, setLayout] = useState<StatBlockLayout>('written')

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <article className="border-border bg-card grid min-w-0 content-start gap-5 rounded-xl border p-6">
        <header className="flex items-start gap-4">
          <DmFaces people={[{ ref: 'npc', key }]} size="md" />
          <div className="grid min-w-0 flex-1 gap-1">
            <p className="text-muted-foreground text-xs font-semibold uppercase">NPC · DM view</p>
            <h1 className="text-2xl font-bold">{npc.name}</h1>
            <p className="text-muted-foreground text-sm">
              {[npc.species, npc.languages?.join(', ')].filter(Boolean).join(' · ')}
              {npc.location && location ? (
                <>
                  {' · '}
                  {refLink(npc.location) ? (
                    <EntityReference kind="location" slug={location.slug} />
                  ) : (
                    <DmHiddenReference reference={npc.location} />
                  )}
                </>
              ) : null}
            </p>
          </div>
          {import.meta.env.DEV &&
          resolvePlayerScreenImage({ image: 'avatar', ref: { ref: 'npc', key } }) ? (
            <ShowToPlayersButton
              selection={{ image: 'avatar', ref: { ref: 'npc', key } }}
              tone="card"
            />
          ) : null}
        </header>

        {PortraitStatus ? (
          <Suspense fallback={null}>
            <PortraitStatus npcKey={key} />
          </Suspense>
        ) : null}

        {npc.previousPortraits ? (
          <PortraitGallery kind="previous" subject={npc.name} portraits={npc.previousPortraits} />
        ) : null}

        <Section title="What players can learn">
          {npc.notes ? <ContentRenderer content={npc.notes} /> : <Empty />}
        </Section>
        <Section title="Motivations">
          {npc.motivations ? <ContentRenderer content={npc.motivations} /> : <Empty />}
        </Section>
        <Section title="Background">
          {npc.background ? <ContentRenderer content={npc.background} /> : <Empty />}
        </Section>
        {stats ? (
          <Section title={shared ? `Stat block · shared ${shared.name}` : 'Stat block'}>
            <div className="flex gap-2 text-sm">
              {(['written', 'icons'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLayout(option)}
                  className={
                    layout === option
                      ? 'bg-primary text-primary-foreground rounded-md px-3 py-1 font-semibold'
                      : 'border-border rounded-md border px-3 py-1'
                  }
                >
                  {option === 'written' ? 'Option A: written out' : 'Option B: icons'}
                </button>
              ))}
            </div>
            <StatBlockSheet stats={stats} block={playableStats(stats)} layout={layout} />
          </Section>
        ) : null}
      </article>
      <aside className="min-w-0">
        <DmQuickLinks />
      </aside>
    </div>
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
