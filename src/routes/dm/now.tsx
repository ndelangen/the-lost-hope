import { createFileRoute } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'

import { LiveFight } from '#/components/dm/encounter/live-fight'
import { useEncounter } from '#/components/dm/encounter/use-encounter-store'
import { SceneScript } from '#/components/dm/scene-script'
import { ImageViewer } from '#/components/image-viewer'
import type { Location } from '#/definitions/location'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { scenes, table } from '#/lib/dm-campaign'
import { resolvePlayerScreenImage } from '#/lib/player-screen'
import type { PlayerScreenImage } from '#/lib/player-screen-state'
import { buildSceneScript } from '#/lib/scene-script'
import { cn } from '#/lib/utils'

/** Remembers in this browser that the DM folded the beats away beside the fight. */
const SIDE_HIDDEN_KEY = 'the-lost-hope:dm-now-beats-hidden'
/** Tailwind's xl: from here the beats sit beside the fight instead of in a drawer. */
const WIDE_QUERY = '(min-width: 80rem)'

const locationRecords: Readonly<Partial<Record<string, Location>>> = SOURCE_REGISTRIES.location

const Search = z.strictObject({
  /** The scene to run; without one, the fight's scene or the first likely scene. */
  scene: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/dm/now')({
  validateSearch: Search,
  head: () => ({
    meta: [{ title: 'Now | DM' }, { name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: NowRoute,
})

/** The one screen at the table: the scene's maps and beats beside the running fight. */
function NowRoute() {
  const search = Route.useSearch()
  const [encounter] = useEncounter()
  const sceneKey =
    Object.entries(scenes).find(([, scene]) => scene.slug === search.scene)?.[0] ??
    encounter?.scene?.key ??
    table.likely[0]?.key
  const scene = sceneKey ? scenes[sceneKey] : undefined
  const [beatsOpen, setBeatsOpen] = useState(false)
  const [sideHidden, setSideHidden] = useState(false)
  const [wide, setWide] = useState(false)

  useEffect(() => {
    try {
      setSideHidden(window.localStorage.getItem(SIDE_HIDDEN_KEY) === '1')
    } catch {
      // Without storage the beats simply start shown.
    }
    const query = window.matchMedia(WIDE_QUERY)
    setWide(query.matches)
    const onChange = (event: MediaQueryListEvent) => setWide(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const setHidden = (hidden: boolean) => {
    setSideHidden(hidden)
    try {
      window.localStorage.setItem(SIDE_HIDDEN_KEY, hidden ? '1' : '0')
    } catch {
      // Only this visit remembers it.
    }
  }
  // Wide, the beats fold in and out beside the fight; narrow, they slide in as a drawer.
  const toggleBeats = () => {
    if (wide) setHidden(!sideHidden)
    else setBeatsOpen((open) => !open)
  }
  const toggleRef = useRef(toggleBeats)
  toggleRef.current = toggleBeats

  // B shows and hides the beats.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key === 'b' || event.key === 'B') toggleRef.current()
      else if (event.key === 'Escape') setBeatsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const script = scene ? buildSceneScript(scene.beats, scene.illustrations) : []
  const sceneImage: PlayerScreenImage | undefined = sceneKey
    ? { image: 'illustration', ref: { ref: 'scene', key: sceneKey }, index: 0 }
    : undefined
  const picture =
    import.meta.env.DEV && sceneImage && resolvePlayerScreenImage(sceneImage)
      ? sceneImage
      : undefined

  const beats =
    sceneKey && script.length > 0 ? (
      <SceneScript sceneKey={sceneKey} script={script} picture={picture} compact />
    ) : (
      <p className="text-muted-foreground">This scene has no beats.</p>
    )
  // The scene's battle maps, or the map of where it happens when it has none.
  const maps = scene
    ? (scene.battleMaps.length > 0 ? scene.battleMaps : [scene.location]).flatMap((ref) => {
        const place = Object.hasOwn(locationRecords, ref.key) ? locationRecords[ref.key] : undefined
        return place?.map ? [{ ref, place, map: place.map }] : []
      })
    : []
  const mapList =
    maps.length > 0 ? (
      <ul className="grid gap-3">
        {maps.map(({ ref, place, map }, index) => (
          <li key={ref.key} className="grid min-w-0 gap-1">
            <ImageViewer
              priority={index === 0}
              src={map.url}
              alt={place.name}
              title={place.name}
              eyebrow="Battlemap"
              accessibleLabel={`battlemap of ${place.name}`}
              previewSizes="28rem"
              previewMaxWidth={768}
              className="aspect-[3/2] h-auto w-full rounded-lg"
              playerScreen={{ image: 'map', ref }}
            />
            <p className="text-sm font-medium">{place.name}</p>
          </li>
        ))}
      </ul>
    ) : null

  const beatsDrawer = beatsOpen ? (
    <aside
      aria-label="Beats"
      className="border-border bg-background fixed inset-y-0 left-0 z-40 grid w-[min(28rem,100vw)] content-start gap-3 overflow-y-auto border-r-2 p-4 shadow-2xl"
    >
      <header className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">{scene?.name ?? 'Beats'}</h2>
        <button
          type="button"
          onClick={() => setBeatsOpen(false)}
          className="border-border hover:bg-muted flex h-11 items-center gap-2 rounded-xl border px-3 font-semibold"
        >
          <X className="size-5" aria-hidden /> Close
        </button>
      </header>
      {mapList}
      {beats}
    </aside>
  ) : null

  // Beats on the left follow the DM down; the fight takes the rest of the width.
  // Below xl there is no room beside the fight, so the beats slide in on B instead.
  return (
    <div
      className={cn(
        'grid grid-cols-[minmax(0,1fr)] items-start gap-3',
        !sideHidden && 'xl:grid-cols-[24rem_minmax(0,1fr)] 2xl:grid-cols-[28rem_minmax(0,1fr)]',
      )}
    >
      <aside
        aria-label="Beats"
        className={cn(
          'border-border bg-card hidden content-start gap-3 rounded-xl border p-3 xl:sticky xl:top-3 xl:max-h-[calc(100vh-1.5rem)] xl:overflow-y-auto',
          !sideHidden && 'xl:grid',
        )}
      >
        {mapList}
        {beats}
      </aside>
      <LiveFight beats={{ shown: wide ? !sideHidden : beatsOpen, onToggle: toggleBeats }} />
      {beatsDrawer}
    </div>
  )
}
