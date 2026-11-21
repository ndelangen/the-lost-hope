import { Link, createFileRoute, notFound, useNavigate } from '@tanstack/react-router'
import { ArrowRight, ChevronRight, Pin, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'

import { ContentRenderer } from '#/components/content-renderer'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { SceneBranches } from '#/components/dm/scene-branches'
import { SceneBriefsPanel } from '#/components/dm/scene-briefs'
import { SceneEncounterStart } from '#/components/dm/scene-encounter-start'
import { BeatBody, SceneScript } from '#/components/dm/scene-script'
import { ShipRoomBoard } from '#/components/dm/ship-room-board'
import { ImageViewer } from '#/components/image-viewer'
import type { Item } from '#/definitions/item'
import type { EntityRef } from '#/definitions/kind'
import type { Location } from '#/definitions/location'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { arcs, sceneBriefs, sceneShipAboard, scenes, table } from '#/lib/dm-campaign'
import { plotsByScene } from '#/lib/dm-dashboard'
import { resolvePlayerScreenImage } from '#/lib/player-screen'
import type { PlayerScreenImage } from '#/lib/player-screen-state'
import { buildSceneBranches } from '#/lib/scene-branches'
import { nextScenes } from '#/lib/scene-flow'
import { buildSceneScript, buildScriptBeat } from '#/lib/scene-script'
import { cn } from '#/lib/utils'

const locationRecords: Readonly<Partial<Record<string, Location>>> = SOURCE_REGISTRIES.location
const itemRecords: Readonly<Partial<Record<string, Item>>> = SOURCE_REGISTRIES.item

const Search = z.strictObject({
  /** A scene aboard a ship leads with the ship; `full` is the whole page top to bottom. */
  layout: z.enum(['ship', 'full']).optional().catch(undefined),
})

export const Route = createFileRoute('/dm/scenes/$slug')({
  validateSearch: Search,
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
  const past = table.past.some((ref) => ref.key === key)
  const locations = [scene.location, ...scene.alternateLocations]
  const battleMaps = scene.battleMaps.flatMap((ref) => {
    const place = Object.hasOwn(locationRecords, ref.key) ? locationRecords[ref.key] : undefined
    return place ? [{ ref, place }] : []
  })
  const hasSecret = (item: EntityRef<'item'>) =>
    Object.hasOwn(itemRecords, item.key) && itemRecords[item.key]?.background !== undefined
  const script = buildSceneScript(scene.beats)
  const branches = buildSceneBranches(scene.outcomes)
  // People and secret items are detailed once, in their own panel; the script only links to them.
  const briefs = sceneBriefs(scene, hasSecret)
  const briefCount = briefs.cast.length + briefs.named.length + briefs.items.length
  const sceneImage: PlayerScreenImage = {
    image: 'illustration',
    ref: { ref: 'scene', key },
    index: 0,
  }
  // The player screen only runs in local dev, and only shows scenes that have a picture.
  const picture =
    import.meta.env.DEV && resolvePlayerScreenImage(sceneImage) ? sceneImage : undefined
  const ship = sceneShipAboard(scene)
  const search = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const shipFirst = Boolean(ship) && search.layout !== 'full'
  // The room whose notes are open under the ship, by the title of its beat.
  const [room, setRoom] = useState<string>()
  const roomAt = scene.beats.findIndex((beat) => beat.title === room)
  const roomBeat = roomAt >= 0 ? buildScriptBeat(scene.beats[roomAt]!, roomAt + 1) : undefined
  const roomSheet = useRef<HTMLElement>(null)
  useEffect(() => {
    if (room) roomSheet.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [room])

  const illustrations =
    scene.illustrations.length > 0 ? (
      <div className={cn('grid gap-3', scene.illustrations.length > 1 && 'sm:grid-cols-2')}>
        {scene.illustrations.map((src, index) => {
          const title =
            scene.illustrations.length > 1
              ? `${scene.name}, image ${index + 1} of ${scene.illustrations.length}`
              : scene.name
          return (
            <ImageViewer
              key={src}
              src={src}
              alt={title}
              title={title}
              eyebrow="Scene illustration"
              accessibleLabel={`illustration of ${title}`}
              previewSizes={
                scene.illustrations.length > 1
                  ? '(min-width: 640px) 400px, calc(100vw - 4rem)'
                  : '(min-width: 1024px) 800px, calc(100vw - 4rem)'
              }
              previewMaxWidth={960}
              className="aspect-[3/2] w-full overflow-hidden rounded-lg"
              playerScreen={{ image: 'illustration', ref: { ref: 'scene', key }, index }}
            />
          )
        })}
      </div>
    ) : null

  const battleMapList =
    battleMaps.length > 0 ? (
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
    ) : null
  const briefsPanel = briefCount > 0 ? <SceneBriefsPanel briefs={briefs} /> : null
  const setup = <ContentRenderer content={scene.setup} />
  const shipBoard = ship ? (
    <ShipRoomBoard
      sceneKey={key}
      ship={ship}
      onNotes={shipFirst ? (fight) => setRoom(fight.key) : undefined}
    />
  ) : null
  const scriptList =
    script.length > 0 ? <SceneScript sceneKey={key} script={script} picture={picture} /> : null
  const anyTime = scene.outcomes.length > 0 ? <SceneBranches branches={branches} /> : null

  const next = nextScenes(key, { scenes, table })
  const nextList =
    next.length > 0 ? (
      <section aria-labelledby="next-scenes" className="border-border grid gap-3 border-t-2 pt-5">
        <h2 id="next-scenes" className="text-lg font-semibold">
          Next likely {next.length === 1 ? 'scene' : 'scenes'}
        </h2>
        <ul className="grid gap-5">
          {next.map(({ scene: ref, when, planned }) => {
            const target = scenes[ref.key]
            if (!target) return null
            return (
              <li key={ref.key} className="grid gap-1.5">
                {planned || when.length > 0 ? (
                  <div className="grid gap-1 px-1 text-sm">
                    {planned ? (
                      <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                        Next in your plan
                      </p>
                    ) : null}
                    {when.map((reason, at) => (
                      <div key={at} className="flex gap-2">
                        <span className="text-muted-foreground shrink-0 font-semibold">If</span>
                        <ContentRenderer content={reason} />
                      </div>
                    ))}
                  </div>
                ) : null}
                <Link
                  to="/dm/scenes/$slug"
                  params={{ slug: target.slug }}
                  className={cn(
                    'focus-visible:ring-ring/50 flex min-h-14 items-center justify-between gap-3 rounded-xl border-2 px-5 py-2 text-lg leading-tight font-bold outline-none focus-visible:ring-3',
                    planned
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 border-transparent'
                      : 'border-border hover:bg-muted',
                  )}
                >
                  {target.name}
                  <ArrowRight className="size-6 shrink-0" aria-hidden />
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    ) : null

  return (
    // The ship board needs the width, so the shortcuts sit in a row above the scene.
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
      <DmQuickLinks stackAt="never" />
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
            {past ? (
              <span className="border-border text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs font-medium">
                Past scene
              </span>
            ) : null}
          </h1>
          <SceneEncounterStart sceneKey={key} scene={scene} />
          <ContentRenderer
            content={[locations.flatMap((ref, index) => [index === 0 ? 'at ' : ' or ', ref])]}
          />
          {ship ? (
            <fieldset className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
              <legend className="sr-only">Page layout</legend>
              <span aria-hidden className="text-sm font-semibold">
                Page layout
              </span>
              <div className="border-border flex overflow-hidden rounded-xl border-2">
                {(
                  [
                    ['ship', 'Ship first'],
                    ['full', 'Full page'],
                  ] as const
                ).map(([value, label]) => (
                  <label
                    key={value}
                    className={cn(
                      'border-border has-focus-visible:ring-ring/50 grid h-12 cursor-pointer place-items-center border-l-2 px-4 text-base font-bold first:border-l-0 has-focus-visible:ring-3',
                      (value === 'ship') === shipFirst
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted',
                    )}
                  >
                    <input
                      type="radio"
                      name="scene-layout"
                      className="sr-only"
                      checked={(value === 'ship') === shipFirst}
                      onChange={() =>
                        void navigate({
                          search: { layout: value === 'full' ? 'full' : undefined },
                          replace: true,
                          resetScroll: false,
                        })
                      }
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
          ) : null}
        </header>

        {shipFirst ? (
          <>
            {shipBoard}
            {roomBeat ? (
              <section
                ref={roomSheet}
                aria-label={`Notes for ${roomBeat.title}`}
                className="border-primary ring-primary/30 bg-card grid scroll-mt-20 gap-4 rounded-xl border p-4 ring-2"
              >
                <header className="flex items-center gap-3">
                  <h2 className="min-w-0 flex-1 text-lg leading-tight font-semibold">
                    {roomBeat.title}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setRoom(undefined)}
                    className="border-border hover:bg-muted flex h-12 items-center gap-2 rounded-xl border px-4 font-semibold"
                  >
                    <X className="size-5" aria-hidden /> Close
                  </button>
                </header>
                <BeatBody beat={roomBeat} />
              </section>
            ) : null}
            <Fold title="Setup">{setup}</Fold>
            {scriptList ? (
              <Fold title={`Script · ${script.length} beats`}>{scriptList}</Fold>
            ) : null}
            {anyTime ? (
              <Fold title={`At any time, if… · ${scene.outcomes.length}`}>{anyTime}</Fold>
            ) : null}
            {briefsPanel ? (
              <Fold title={`People and items · ${briefCount}`}>{briefsPanel}</Fold>
            ) : null}
            {illustrations || battleMapList ? (
              <Fold title="Pictures and battlemaps">
                {illustrations}
                {battleMapList ? <Titled title="Battlemaps">{battleMapList}</Titled> : null}
              </Fold>
            ) : null}
          </>
        ) : (
          <>
            {illustrations}
            {battleMapList ? <Titled title="Battlemaps">{battleMapList}</Titled> : null}
            {/* The ship board needs the full width, so it sits above the side column. */}
            {shipBoard}
            {/* From lg up, the people stay in reach in a column that follows the script down. */}
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
              {briefsPanel ? (
                <aside
                  aria-label="People and items"
                  className="lg:sticky lg:top-20 lg:col-start-2 lg:row-start-1 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto"
                >
                  {briefsPanel}
                </aside>
              ) : null}
              <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-5 lg:col-start-1 lg:row-start-1">
                <Titled title="Setup">{setup}</Titled>
                {scriptList}
                {anyTime ? <Titled title="At any time, if…">{anyTime}</Titled> : null}
              </div>
            </div>
          </>
        )}
        {nextList}
      </article>
    </div>
  )
}

/** A section of the page folded down to its title, opened when the DM needs it. */
function Fold({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-border rounded-xl border">
      <summary className="hover:bg-muted flex h-12 cursor-pointer list-none items-center gap-2 rounded-xl px-4 font-semibold [&::-webkit-details-marker]:hidden">
        <ChevronRight className="size-5 transition-transform group-open:rotate-90" aria-hidden />
        {title}
      </summary>
      <div className="grid gap-5 p-4 pt-2">{children}</div>
    </details>
  )
}

/** A section of the page under a small heading. */
function Titled({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-2">
      <h2 className="text-muted-foreground text-xs font-semibold uppercase">{title}</h2>
      {children}
    </section>
  )
}
