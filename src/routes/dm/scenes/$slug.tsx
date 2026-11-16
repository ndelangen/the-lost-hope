import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ChevronRight, Pin, Sword } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { DmFaces } from '#/components/dm/dm-faces'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { NpcStatLine } from '#/components/dm/npc-stat-line'
import { SceneBranches } from '#/components/dm/scene-branches'
import { EntityReference } from '#/components/entity-reference'
import { ImageViewer } from '#/components/image-viewer'
import { ShowToPlayersButton } from '#/components/player-screen/show-to-players-button'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { arcs, resolveSourceRef, scenes, table } from '#/lib/dm-campaign'
import { plotsByScene } from '#/lib/dm-dashboard'
import { resolvePlayerScreenImage } from '#/lib/player-screen'
import type { PlayerScreenImage } from '#/lib/player-screen-state'
import { buildSceneBranches } from '#/lib/scene-branches'

const npcRecords: Readonly<
  Record<string, (typeof SOURCE_REGISTRIES.npc)[keyof typeof SOURCE_REGISTRIES.npc]>
> = SOURCE_REGISTRIES.npc

export const Route = createFileRoute('/dm/scenes/$slug')({
  loader: ({ params }) => {
    const entry = Object.entries(scenes).find(([, scene]) => scene.slug === params.slug)
    if (!entry) throw notFound()
    return { key: entry[0] }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData ? scenes[loaderData.key]?.name : 'Scene'} | DM` },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: SceneRoute,
})

function SceneRoute() {
  const { key } = Route.useLoaderData()
  const scene = scenes[key]!
  const plots = plotsByScene(arcs).get(key) ?? []
  const pinned = table.pinned.some((ref) => ref.key === key)
  const location = resolveSourceRef(scene.location)
  const branches = buildSceneBranches(scene.outcomes)

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <article className="border-border bg-card grid min-w-0 content-start gap-5 rounded-xl border p-6">
        <header className="grid gap-1">
          <p className="text-muted-foreground text-xs">
            {plots.map(({ arc, arcKey, plot }) => (
              <span key={`${arcKey}:${plot.slug}`} className="mr-3">
                <Link to="/dm/arcs/$slug" params={{ slug: arc.slug }} className="hover:underline">
                  {arc.name}
                </Link>{' '}
                › {plot.name}
              </span>
            ))}
          </p>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            {pinned ? <Pin aria-label="Pinned" className="size-5 text-amber-600" /> : null}
            {scene.name}
          </h1>
          <Link
            to="/dm/encounter"
            search={{ scene: scene.slug }}
            className="border-border hover:bg-muted flex w-fit items-center gap-2 rounded-md border px-3 py-1.5 text-sm"
          >
            <Sword className="size-4" /> Run encounter
            {scene.npcs.length > 0 ? ' with this scene’s NPCs' : ''}
          </Link>
          <p className="text-sm">
            at{' '}
            {location ? (
              <EntityReference kind="location" slug={location.slug} className="font-medium" />
            ) : null}
          </p>
        </header>

        {scene.illustration ? (
          <ImageViewer
            src={scene.illustration}
            alt={scene.name}
            title={scene.name}
            eyebrow="Scene illustration"
            accessibleLabel={`illustration of ${scene.name}`}
            previewSizes="(min-width: 1024px) 800px, calc(100vw - 4rem)"
            previewMaxWidth={960}
            className="aspect-[3/2] w-full overflow-hidden rounded-lg"
            playerScreen={{ image: 'illustration', ref: { ref: 'scene', key } }}
          />
        ) : null}

        {scene.npcs.length > 0 ? (
          <section className="grid gap-2">
            <h2 className="text-muted-foreground text-xs font-semibold uppercase">NPCs</h2>
            <ul className="grid gap-3">
              {scene.npcs.map((npc) => {
                const record = Object.hasOwn(npcRecords, npc.key) ? npcRecords[npc.key] : undefined
                const portrait: PlayerScreenImage = { image: 'avatar', ref: npc }
                const canShow = import.meta.env.DEV && resolvePlayerScreenImage(portrait)
                return (
                  <li key={npc.key} className="border-border grid gap-3 rounded-lg border p-3">
                    <div className="flex flex-wrap items-start gap-3">
                      <DmFaces people={[npc]} size="md" />
                      <div className="grid min-w-0 flex-1 basis-60 gap-1">
                        <Link
                          to="/dm/npcs/$key"
                          params={{ key: npc.key }}
                          className="w-fit font-medium hover:underline"
                        >
                          {record?.name ?? resolveSourceRef(npc)?.name}
                        </Link>
                        {record?.motivations ? (
                          <ContentRenderer
                            content={record.motivations}
                            className="text-muted-foreground"
                          />
                        ) : null}
                      </div>
                      {canShow ? <ShowToPlayersButton selection={portrait} tone="card" /> : null}
                    </div>
                    {record ? (
                      <details className="group">
                        <summary className="text-muted-foreground hover:text-foreground flex h-12 w-fit cursor-pointer list-none items-center gap-2 text-sm font-medium">
                          <ChevronRight
                            className="size-4 transition-transform group-open:rotate-90"
                            aria-hidden
                          />
                          Details on {record.name}
                        </summary>
                        <div className="grid gap-3 pt-1 pl-6">
                          {record.notes ? (
                            <NpcDetail title="What players can learn">
                              <ContentRenderer content={record.notes} />
                            </NpcDetail>
                          ) : null}
                          {record.background ? (
                            <NpcDetail title="Background">
                              <ContentRenderer content={record.background} />
                            </NpcDetail>
                          ) : null}
                          <NpcDetail title="Stat block">
                            <NpcStatLine npc={record} />
                          </NpcDetail>
                          <Link
                            to="/dm/npcs/$key"
                            params={{ key: npc.key }}
                            className="text-sm font-medium underline-offset-4 hover:underline"
                          >
                            Open {record.name}’s DM page
                          </Link>
                        </div>
                      </details>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </section>
        ) : null}

        <section className="grid gap-1">
          <h2 className="text-muted-foreground text-xs font-semibold uppercase">Setup</h2>
          <ContentRenderer content={scene.setup} />
        </section>

        {scene.outcomes.length > 0 ? (
          <section className="grid gap-2">
            <h2 className="text-muted-foreground text-xs font-semibold uppercase">If…</h2>
            <SceneBranches branches={branches} />
          </section>
        ) : null}

        {scene.notes ? (
          <section className="grid gap-1">
            <h2 className="text-muted-foreground text-xs font-semibold uppercase">Notes</h2>
            <ContentRenderer content={scene.notes} />
          </section>
        ) : null}
      </article>
      <aside className="min-w-0">
        <DmQuickLinks />
      </aside>
    </div>
  )
}

function NpcDetail({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-1">
      <h3 className="text-muted-foreground text-xs font-semibold uppercase">{title}</h3>
      {children}
    </section>
  )
}
