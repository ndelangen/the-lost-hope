import { Link, createFileRoute, notFound, useNavigate } from '@tanstack/react-router'
import { ArrowRight, ChevronRight, Pin, Sword, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'

import { ContentRenderer } from '#/components/content-renderer'
import { DmFaces } from '#/components/dm/dm-faces'
import { DmQuickLinks } from '#/components/dm/dm-quick-links'
import { SceneBranches } from '#/components/dm/scene-branches'
import { BeatBody, SceneScript } from '#/components/dm/scene-script'
import { SceneShipDamage } from '#/components/dm/scene-ship-damage'
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
import { nextScenes } from '#/lib/scene-flow'
import { buildSceneScript, buildScriptBeat } from '#/lib/scene-script'
import { cn } from '#/lib/utils'

const npcRecords: Readonly<
  Record<string, (typeof SOURCE_REGISTRIES.npc)[keyof typeof SOURCE_REGISTRIES.npc]>
> = SOURCE_REGISTRIES.npc
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
  const locations = [scene.location, ...scene.alternateLocations]
  const battleMaps = scene.battleMaps.flatMap((ref) => {
    const place = Object.hasOwn(locationRecords, ref.key) ? locationRecords[ref.key] : undefined
    return place ? [{ ref, place }] : []
  })
  const hasSecret = (item: EntityRef<'item'>) =>
    Object.hasOwn(itemRecords, item.key) && itemRecords[item.key]?.background !== undefined
  // The script comes before the "at any time" branches on the page, and they share who and what
  // has had its details, so each record is detailed once.
  const briefed = new Set<string>()
  const script = buildSceneScript(scene.beats, hasSecret, briefed)
  const branches = buildSceneBranches(scene.outcomes, hasSecret, '', briefed)
  const sceneImage: PlayerScreenImage = { image: 'illustration', ref: { ref: 'scene', key } }
  // The player screen only runs in local dev, and only shows scenes that have a picture.
  const picture =
    import.meta.env.DEV && resolvePlayerScreenImage(sceneImage) ? sceneImage : undefined
  const ship = sceneShipUnderFire(scene)
  const vessel = ship ? resolveSourceRef(ship.vessel) : undefined
  const search = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const shipFirst = Boolean(ship && vessel) && search.layout !== 'full'
  // The room whose notes are open under the ship, by the title of its beat.
  const [room, setRoom] = useState<string>()
  // The sheet is read on its own, so it details everyone its beat names.
  const roomAt = scene.beats.findIndex((beat) => beat.title === room)
  const roomBeat =
    roomAt >= 0 ? buildScriptBeat(scene.beats[roomAt]!, roomAt + 1, hasSecret) : undefined
  const roomSheet = useRef<HTMLElement>(null)
  useEffect(() => {
    if (room) roomSheet.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [room])

  const illustration = scene.illustration ? (
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
  const cast =
    scene.npcs.length > 0 ? (
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
    ) : null
  const setup = <ContentRenderer content={scene.setup} />
  const shipBoard =
    ship && vessel ? (
      <SceneShipDamage
        sceneKey={key}
        vesselName={vessel.name}
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
          {ship && vessel ? (
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
            {cast ? <Fold title={`Cast · ${scene.npcs.length}`}>{cast}</Fold> : null}
            {illustration || battleMapList ? (
              <Fold title="Pictures and battlemaps">
                {illustration}
                {battleMapList ? <Titled title="Battlemaps">{battleMapList}</Titled> : null}
              </Fold>
            ) : null}
          </>
        ) : (
          <>
            {illustration}
            {battleMapList ? <Titled title="Battlemaps">{battleMapList}</Titled> : null}
            {cast ? <Titled title="NPCs">{cast}</Titled> : null}
            <Titled title="Setup">{setup}</Titled>
            {shipBoard}
            {scriptList}
            {anyTime ? <Titled title="At any time, if…">{anyTime}</Titled> : null}
          </>
        )}
        {nextList}
      </article>
      <aside className="min-w-0">
        <DmQuickLinks />
      </aside>
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

function NpcDetail({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-1">
      <h3 className="text-muted-foreground text-xs font-semibold uppercase">{title}</h3>
      {children}
    </section>
  )
}
