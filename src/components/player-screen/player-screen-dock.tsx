import { useRouterState } from '@tanstack/react-router'
import { EyeOff, Monitor, MonitorOff, MonitorUp, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { ResponsiveImage } from '#/components/responsive-image'
import { SearchInput } from '#/components/ui/search-input'
import {
  filterPlayerScreenOptions,
  playerScreenOptions,
  playerScreenOptionsForPage,
  resolvePlayerScreenImage,
  type PlayerScreenGroup,
  type PlayerScreenOption,
} from '#/lib/player-screen'
import { samePlayerScreenImage, type PlayerScreenImage } from '#/lib/player-screen-state'
import { cn } from '#/lib/utils'

import { openPlayerScreen, usePlayerScreen, usePlayerScreenPresent } from './use-player-screen'

/** The DM's small control for choosing what the players' monitor shows, from any page. */
export function PlayerScreenDock() {
  const [open, setOpen] = useState(false)
  const [{ showing, captions }, update] = usePlayerScreen()
  const present = usePlayerScreenPresent()
  const current = showing ? resolvePlayerScreenImage(showing) : undefined
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const show = (selection: PlayerScreenImage | null) =>
    update((state) => ({ ...state, showing: selection }))

  return (
    <div ref={panelRef} className="fixed right-4 bottom-4 z-[150] flex flex-col items-end gap-3">
      {open ? (
        <PlayerScreenPanel
          showing={showing}
          captions={captions}
          present={present}
          onShow={show}
          onCaptions={(value) => update((state) => ({ ...state, captions: value }))}
          onClose={() => setOpen(false)}
        />
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Player screen controls"
        className="bg-card text-card-foreground border-border hover:bg-muted flex h-14 items-center gap-3 rounded-full border py-1.5 pr-5 pl-1.5 shadow-lg transition-colors"
      >
        <span className="relative grid h-11 w-16 place-items-center overflow-hidden rounded-full bg-black">
          {current ? (
            <ResponsiveImage
              src={current.src}
              alt=""
              sizes="64px"
              maxWidth={128}
              className="size-full object-cover"
            />
          ) : (
            <MonitorOff className="size-5 text-white/60" aria-hidden />
          )}
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="flex items-center gap-1.5 text-sm font-semibold">
            <span
              className={cn('size-2 rounded-full', present ? 'bg-emerald-500' : 'bg-zinc-400')}
              aria-hidden
            />
            Player screen
          </span>
          <span className="text-muted-foreground max-w-40 truncate text-xs">
            {current ? current.name : 'Blank'}
          </span>
        </span>
      </button>
    </div>
  )
}

const GROUP_LABEL: Record<PlayerScreenGroup, string> = {
  Scenes: 'Scene',
  Maps: 'Map',
  Places: 'Place',
  Characters: 'Portrait',
  Creatures: 'Creature',
}

const GROUPS: readonly PlayerScreenGroup[] = ['Scenes', 'Maps', 'Places', 'Characters', 'Creatures']

function PlayerScreenPanel({
  showing,
  captions,
  present,
  onShow,
  onCaptions,
  onClose,
}: {
  showing: PlayerScreenImage | null
  captions: boolean
  present: boolean
  onShow: (selection: PlayerScreenImage | null) => void
  onCaptions: (value: boolean) => void
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const options = useMemo(() => playerScreenOptions(), [])
  const onThisPage = useMemo(
    () => playerScreenOptionsForPage(options, pathname),
    [options, pathname],
  )
  const matches = useMemo(() => filterPlayerScreenOptions(options, query), [options, query])

  return (
    <section
      aria-label="Player screen"
      className="bg-card text-card-foreground border-border flex max-h-[min(44rem,calc(100dvh-6rem))] w-[min(30rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border shadow-2xl"
    >
      <header className="border-border flex items-center gap-3 border-b p-3">
        <Monitor className="text-muted-foreground size-5 shrink-0" aria-hidden />
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold">Player screen</h2>
          <p className="text-muted-foreground text-xs">
            {present ? 'Open in another window' : 'Not open yet'}
          </p>
        </div>
        <button
          type="button"
          onClick={openPlayerScreen}
          className={cn(
            'flex h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium',
            present
              ? 'border-border hover:bg-muted border'
              : 'bg-primary text-primary-foreground hover:bg-primary/90',
          )}
        >
          <MonitorUp className="size-4" aria-hidden />
          {present ? 'Bring forward' : 'Open player screen'}
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close player screen controls"
          className="hover:bg-muted grid size-11 place-items-center rounded-lg"
        >
          <X className="size-5" aria-hidden />
        </button>
      </header>

      <div className="border-border flex items-stretch gap-2 border-b p-3">
        <button
          type="button"
          onClick={() => onShow(null)}
          disabled={!showing}
          className="border-border hover:bg-muted flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border text-sm font-medium disabled:opacity-50"
        >
          <MonitorOff className="size-4" aria-hidden />
          Blank the screen
        </button>
        <label className="border-border flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-medium">
          <input
            type="checkbox"
            checked={captions}
            onChange={(event) => onCaptions(event.target.checked)}
            className="size-4"
          />
          Show names
        </label>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-3">
        {onThisPage.length > 0 && !query ? (
          <OptionGroup
            title="On this page"
            options={onThisPage}
            showGroup
            showing={showing}
            onShow={onShow}
          />
        ) : null}
        <SearchInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find a map, place, NPC or scene"
          aria-label="Find a picture to show"
          className="h-11"
        />
        {GROUPS.map((group) => {
          const groupOptions = matches.filter((option) => option.group === group)
          return groupOptions.length > 0 ? (
            <OptionGroup
              key={group}
              title={group}
              options={groupOptions}
              showing={showing}
              onShow={onShow}
            />
          ) : null
        })}
        {matches.length === 0 ? (
          <p className="text-muted-foreground py-6 text-center text-sm">No pictures match.</p>
        ) : null}
      </div>

      <p className="text-muted-foreground border-border border-t px-3 py-2 text-xs">
        <EyeOff className="mr-1 inline size-3.5 align-[-2px]" aria-hidden />
        marks records the party has not met. Their names never appear on the player screen.
      </p>
    </section>
  )
}

function OptionGroup({
  title,
  options,
  showing,
  onShow,
  showGroup = false,
}: {
  title: string
  options: readonly PlayerScreenOption[]
  showGroup?: boolean
  showing: PlayerScreenImage | null
  onShow: (selection: PlayerScreenImage) => void
}) {
  return (
    <section aria-label={title} className="flex flex-col gap-2">
      <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        {title}
      </h3>
      <ul className="grid grid-cols-3 gap-2">
        {options.map((option) => {
          const active = samePlayerScreenImage(option.selection, showing)
          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => onShow(option.selection)}
                aria-pressed={active}
                aria-label={`Show ${option.name} (${option.group.toLowerCase()}) to the players`}
                className={cn(
                  'group flex w-full flex-col gap-1 rounded-lg p-1 text-left',
                  active ? 'bg-primary/10 ring-primary ring-2' : 'hover:bg-muted',
                )}
              >
                <span className="relative block aspect-[3/2] w-full overflow-hidden rounded-md bg-black">
                  <ResponsiveImage
                    src={option.src}
                    alt=""
                    sizes="144px"
                    maxWidth={384}
                    loading="lazy"
                    className={cn(
                      'size-full',
                      option.group === 'Maps' ? 'object-contain' : 'object-cover',
                    )}
                  />
                  {option.met || option.group === 'Scenes' ? null : (
                    <span className="absolute top-1 right-1 grid size-6 place-items-center rounded-full bg-black/70 text-white">
                      <EyeOff className="size-3.5" aria-label="Not met yet" />
                    </span>
                  )}
                </span>
                <span className="line-clamp-2 text-xs leading-tight font-medium">
                  {option.name}
                </span>
                {showGroup ? (
                  <span className="text-muted-foreground text-[11px] leading-none">
                    {GROUP_LABEL[option.group]}
                  </span>
                ) : null}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
