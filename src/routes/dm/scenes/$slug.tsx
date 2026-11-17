import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ChevronRight, Pin, Sword } from 'lucide-react'

import { ContentRenderer } from '#/components/content-renderer'
import { DmFaces } from '#/components/dm/dm-faces'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { SceneBranches } from '#/components/dm/scene-branches'
import { SceneScript } from '#/components/dm/scene-script'
import { ShipDamageClock } from '#/components/dm/ship-damage-clock'
import { StatBlockSummary } from '#/components/dm/stat-block-summary'
import { ImageViewer } from '#/components/image-viewer'
import { ShowToPlayersButton } from '#/components/player-screen/show-to-players-button'
import type { Item } from '#/definitions/item'
import type { EntityRef } from '#/definitions/kind'
import type { Location } from '#/definitions/location'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { arcs, resolveSourceRef, sceneShipUnderFire, scenes, table } from '#/lib/dm-campaign'
import { plotsByScene } from '#/lib/dm-dashboard'
import { resolvePlayerScreenImage } from '#/lib/player-screen'
import type { PlayerScreenImage } from '#/lib/player-screen-state'
import { buildSceneBranches } from '#/lib/scene-branches'
import { buildSceneScript } from '#/lib/scene-script'

const npcRecords: Readonly<
  Record<string, (typeof SOURCE_REGISTRIES.npc)[keyof typeof SOURCE_REGISTRIES.npc]>
> = SOURCE_REGISTRIES.npc
const locationRecords: Readonly<Partial<Record<string, Location>>> = SOURCE_REGISTRIES.location
const itemRecords: Readonly<Partial<Record<string, Item>>> = SOURCE_REGISTRIES.item

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
  const locations = [scene.location, ...scene.alternateLocations]
  const battleMaps = scene.battleMaps.flatMap((ref) => {
    const place = Object.hasOwn(locationRecords, ref.key) ? locationRecords[ref.key] : undefined
    return place ? [{ ref, place }] : []
  })
  const hasSecret = (item: EntityRef<'item'>) =>
    Object.hasOwn(itemRecords, item.key) && itemRecords[item.key]?.background !== undefined
  const branches = buildSceneBranches(scene.outcomes, hasSecret)
  const script = buildSceneScript(scene.beats, hasSecret)
  const ship = sceneShipUnderFire(scene)
  const vessel = ship ? resolveSourceRef(ship.vessel) : undefined

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
            {scene.opponents.length > 0 ? ' against this scene’s opponents' : ''}
          </Link>
          <ContentRenderer
            content={[locations.flatMap((ref, index) => [index === 0 ? 'at ' : ' or ', ref])]}
          />
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

        {battleMaps.length > 0 ? (
          <section className="grid gap-2">
            <h2 className="text-muted-foreground text-xs font-semibold uppercase">Battlemaps</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {battleMaps.map(({ ref, place }) => (
                <li key={ref.key} className="min-w-0">
                  <ImageViewer
                    src={place.map.url}
                    alt={place.name}
                    title={place.name}
                    eyebrow="Battlemap"
                    accessibleLabel={`battlemap of ${place.name}`}
                    previewSizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw"
                    previewMaxWidth={768}
                    className="aspect-[3/2] h-auto w-full rounded-lg"
                    playerScreen={{ image: 'map', ref }}
                  />
                  <p className="mt-1 text-sm font-medium">{place.name}</p>
                </li>
              ))}
            </ul>
          </section>
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
                            <StatBlockSummary stats={record.stats} />
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

        {ship && vessel ? (
          <ShipDamageClock sceneKey={key} vesselName={vessel.name} ship={ship} />
        ) : null}

        {script.length > 0 ? <SceneScript sceneKey={key} script={script} /> : null}

        {scene.outcomes.length > 0 ? (
          <section className="grid gap-2">
            <h2 className="text-muted-foreground text-xs font-semibold uppercase">
              At any time, if…
            </h2>
            <SceneBranches branches={branches} />
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
