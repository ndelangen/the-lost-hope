import { useRouterState } from '@tanstack/react-router'
import {
  ChevronLeft,
  ChevronRight,
  Crosshair,
  EyeOff,
  Maximize2,
  Monitor,
  MonitorOff,
  MonitorUp,
  RectangleHorizontal,
  RotateCcw,
  RotateCw,
  ScrollText,
  Trash2,
  X,
} from 'lucide-react'
import { type ComponentProps, useEffect, useMemo, useRef, useState } from 'react'

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
import type { PlayerScreenGrid } from '#/lib/player-screen-grid'
import {
  canStepPlayerScreen,
  clearPlayerScreenHistory,
  jumpPlayerScreen,
  playerScreenGridFor,
  playerScreenImageId,
  playerScreenShowing,
  samePlayerScreenImage,
  showOnPlayerScreen,
  stepPlayerScreen,
  updatePlayerScreenGrid,
  type PlayerScreenImage,
  type PlayerScreenRotation,
  type PlayerScreenState,
} from '#/lib/player-screen-state'
import { responsiveImageFor } from '#/lib/public-media'
import { cn } from '#/lib/utils'

import { GridControls } from './grid-controls'
import { JimsLetterWordsControl } from './jims-letter-words-control'
import { PointerSurface } from './pointer-surface'
import { PointingView } from './pointing-view'
import { openPlayerScreen, usePlayerScreen, usePlayerScreenPresent } from './use-player-screen'

/** The DM's small control for choosing what the players' monitor shows, from any page. */
export function PlayerScreenDock() {
  const [open, setOpen] = useState(false)
  const [state, update] = usePlayerScreen()
  const showing = playerScreenShowing(state)
  const present = usePlayerScreenPresent()
  const current = showing ? resolvePlayerScreenImage(showing) : undefined
  const pointable = pointablePicture(state)
  const [pointing, setPointing] = useState(false)
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
    update((current) => showOnPlayerScreen(current, selection))
  const step = (direction: -1 | 1) => update((current) => stepPlayerScreen(current, direction))

  // [ and ] step through the history from anywhere, except while the DM is typing.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) return
      if (event.key === '[') update((current) => stepPlayerScreen(current, -1))
      else if (event.key === ']') update((current) => stepPlayerScreen(current, 1))
      else if (event.key === 'p' || event.key === 'P') setPointing((value) => !value)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [update])

  return (
    <div ref={panelRef} className="fixed right-4 bottom-4 z-[150] flex flex-col items-end gap-3">
      {pointing && pointable ? (
        <PointingView {...pointable} onClose={() => setPointing(false)} />
      ) : null}
      {open ? (
        <PlayerScreenPanel
          state={state}
          present={present}
          onShow={show}
          onJump={(index) => update((current) => jumpPlayerScreen(current, index))}
          onClear={() => update(clearPlayerScreenHistory)}
          onPoint={() => setPointing(true)}
          onCaptions={(value) => update((state) => ({ ...state, captions: value }))}
          onTurnOrder={(value) => update((state) => ({ ...state, turnOrder: value }))}
          onRotate={(value) => update((state) => ({ ...state, rotation: value }))}
          onGrid={(change) =>
            update((state) => {
              const selection = playerScreenShowing(state)
              return selection ? updatePlayerScreenGrid(state, selection, change) : state
            })
          }
          onClose={() => setOpen(false)}
        />
      ) : null}
      <div className="bg-card text-card-foreground border-border flex items-center gap-1 rounded-full border p-1 shadow-lg">
        <HistoryButton direction={-1} state={state} onStep={step} />
        <HistoryButton direction={1} state={state} onStep={step} />
        <button
          type="button"
          onClick={() => setPointing(true)}
          disabled={!pointable}
          aria-label="Point at the picture on the player screen"
          title={pointable ? 'Point (P)' : 'Show a picture to point at it'}
          className="hover:bg-muted grid size-9 shrink-0 place-items-center rounded-full disabled:opacity-35 disabled:hover:bg-transparent"
        >
          <Crosshair className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Player screen controls"
          className="hover:bg-muted flex h-9 items-center gap-3 rounded-full py-0.5 pr-4 pl-0.5 transition-colors"
        >
          <span className="relative grid h-8 w-12 place-items-center overflow-hidden rounded-full bg-black">
            {current ? (
              <PlayerScreenThumb
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
    </div>
  )
}

/** The picture on the player screen, with what the DM needs to point at it, if it can be pointed at. */
function pointablePicture(state: PlayerScreenState) {
  const showing = playerScreenShowing(state)
  const image = showing ? resolvePlayerScreenImage(showing) : undefined
  const size = image?.src ? responsiveImageFor(image.src) : undefined
  if (!showing || !image?.src || !size) return undefined
  return {
    picture: playerScreenImageId(showing),
    name: image.name,
    src: image.src,
    width: size.width,
    height: size.height,
    grid: playerScreenGridFor(state, showing),
  }
}

function isTyping(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  )
}

/** Steps the player screen back or forward through what it has shown. */
function HistoryButton({
  direction,
  state,
  onStep,
}: {
  direction: -1 | 1
  state: PlayerScreenState
  onStep: (direction: -1 | 1) => void
}) {
  const Icon = direction === -1 ? ChevronLeft : ChevronRight
  const label = direction === -1 ? 'Back' : 'Forward'
  return (
    <button
      type="button"
      onClick={() => onStep(direction)}
      disabled={!canStepPlayerScreen(state, direction)}
      aria-label={`${label}: show the ${direction === -1 ? 'previous' : 'next'} picture`}
      title={`${label} (${direction === -1 ? '[' : ']'})`}
      className="hover:bg-muted grid size-9 shrink-0 place-items-center rounded-full disabled:opacity-35 disabled:hover:bg-transparent"
    >
      <Icon className="size-5" aria-hidden />
    </button>
  )
}

const ROTATIONS: ReadonlyArray<{
  value: PlayerScreenRotation
  label: string
  Icon: typeof RotateCcw
}> = [
  { value: -90, label: 'Left', Icon: RotateCcw },
  { value: 0, label: 'Upright', Icon: RectangleHorizontal },
  { value: 90, label: 'Right', Icon: RotateCw },
]

const GROUP_LABEL: Record<PlayerScreenGroup, string> = {
  Handouts: 'Handout',
  Scenes: 'Scene',
  Maps: 'Map',
  Places: 'Place',
  Characters: 'Portrait',
  Creatures: 'Creature',
}

const GROUPS: readonly PlayerScreenGroup[] = [
  'Handouts',
  'Scenes',
  'Maps',
  'Places',
  'Characters',
  'Creatures',
]

/** A small preview of a picture; handouts the screen draws itself show as a sheet of paper. */
function PlayerScreenThumb({
  src,
  className,
  ...props
}: Omit<ComponentProps<typeof ResponsiveImage>, 'src'> & { src: string | undefined }) {
  if (src) return <ResponsiveImage src={src} className={className} {...props} />
  return (
    <span className={cn('grid place-items-center bg-amber-100 text-amber-900', className)}>
      <ScrollText className="size-1/2 max-h-8 max-w-8" aria-hidden />
    </span>
  )
}

function PlayerScreenPanel({
  state,
  present,
  onShow,
  onJump,
  onClear,
  onPoint,
  onCaptions,
  onTurnOrder,
  onRotate,
  onGrid,
  onClose,
}: {
  state: PlayerScreenState
  present: boolean
  onShow: (selection: PlayerScreenImage | null) => void
  onJump: (index: number) => void
  onClear: () => void
  onPoint: () => void
  onCaptions: (value: boolean) => void
  onTurnOrder: (value: boolean) => void
  onRotate: (value: PlayerScreenRotation) => void
  onGrid: (change: (grid: PlayerScreenGrid) => PlayerScreenGrid) => void
  onClose: () => void
}) {
  const showing = playerScreenShowing(state)
  const { captions } = state
  const [query, setQuery] = useState('')
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const options = useMemo(() => playerScreenOptions(), [])
  const onThisPage = useMemo(
    () => playerScreenOptionsForPage(options, pathname),
    [options, pathname],
  )
  const matches = useMemo(() => filterPlayerScreenOptions(options, query), [options, query])
  const src = showing ? resolvePlayerScreenImage(showing)?.src : undefined
  const size = src ? responsiveImageFor(src) : undefined
  const pointable = pointablePicture(state)

  return (
    <section
      aria-label="Player screen"
      className="bg-card text-card-foreground border-border flex max-h-[min(48rem,calc(100dvh-6rem))] w-[min(26rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border shadow-2xl"
    >
      <header className="border-border flex items-center gap-3 border-b p-2">
        <Monitor className="text-muted-foreground size-5 shrink-0" aria-hidden />
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold">Player screen</h2>
          <p className="text-muted-foreground text-xs">
            {present ? 'Open in another window' : 'Not open yet'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void openPlayerScreen()}
          className={cn(
            'flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium',
            present
              ? 'border-border hover:bg-muted border'
              : 'bg-primary text-primary-foreground hover:bg-primary/90',
          )}
        >
          <MonitorUp className="size-4" aria-hidden />
          {present ? 'Bring forward' : 'Open on players’ screen'}
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close player screen controls"
          className="hover:bg-muted grid size-9 place-items-center rounded-lg"
        >
          <X className="size-5" aria-hidden />
        </button>
      </header>

      <div className="border-border flex items-stretch gap-2 border-b p-2">
        <button
          type="button"
          onClick={() => onShow(null)}
          disabled={!showing}
          className="border-border hover:bg-muted flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border text-sm font-medium disabled:opacity-50"
        >
          <MonitorOff className="size-4" aria-hidden />
          Blank the screen
        </button>
        <label className="border-border flex h-9 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-medium">
          <input
            type="checkbox"
            checked={captions}
            onChange={(event) => onCaptions(event.target.checked)}
            className="size-4"
          />
          Show names
        </label>
        <label className="border-border flex h-9 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-medium">
          <input
            type="checkbox"
            checked={state.turnOrder}
            onChange={(event) => onTurnOrder(event.target.checked)}
            className="size-4"
          />
          Turn order
        </label>
      </div>

      <fieldset className="border-border flex items-center gap-2 border-b p-2">
        <legend className="sr-only">Turn the picture</legend>
        <span className="text-muted-foreground w-12 shrink-0 text-xs font-semibold uppercase">
          Turn
        </span>
        {ROTATIONS.map(({ value, label, Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => onRotate(value)}
            aria-pressed={state.rotation === value}
            className={cn(
              'flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border text-sm font-medium',
              state.rotation === value
                ? 'border-primary bg-primary/10 text-foreground'
                : 'border-border hover:bg-muted',
            )}
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </button>
        ))}
      </fieldset>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-2">
        {showing?.image === 'handout' && showing.ref.key === 'jims_letter' ? (
          <JimsLetterWordsControl />
        ) : null}
        {pointable ? <PointSection pointable={pointable} onPoint={onPoint} /> : null}
        <ShownHistory state={state} onJump={onJump} onClear={onClear} />
        {showing && src && size ? (
          <GridControls
            key={playerScreenImageId(showing)}
            grid={playerScreenGridFor(state, showing)}
            src={src}
            width={size.width}
            height={size.height}
            onChange={onGrid}
          />
        ) : null}
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
          className="h-9"
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

/** A copy of the picture on the player screen to ping or laser-point at, and a way to make it big. */
function PointSection({
  pointable,
  onPoint,
}: {
  pointable: NonNullable<ReturnType<typeof pointablePicture>>
  onPoint: () => void
}) {
  return (
    <section aria-label="Point" className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground w-12 shrink-0 text-xs font-semibold uppercase">
          Point
        </span>
        <p className="text-muted-foreground min-w-0 flex-1 text-xs leading-tight">
          Click to ping. Hold and drag for a laser.
        </p>
        <button
          type="button"
          onClick={onPoint}
          className="border-border hover:bg-muted flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-medium"
        >
          <Maximize2 className="size-4" aria-hidden />
          Big view (P)
        </button>
      </div>
      <div className="grid place-items-center rounded-lg bg-black p-1">
        <PointerSurface
          {...pointable}
          markSize="2.25rem"
          className="max-w-full"
          style={{ height: '12rem' }}
        />
      </div>
    </section>
  )
}

/** What the player screen has shown, newest first, so the DM can show any of it again or clear it. */
function ShownHistory({
  state,
  onJump,
  onClear,
}: {
  state: PlayerScreenState
  onJump: (index: number) => void
  onClear: () => void
}) {
  const entries = state.history.map((selection, index) => ({ selection, index })).toReversed()
  return (
    <section aria-label="Shown so far" className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Shown so far
        </h3>
        <button
          type="button"
          onClick={onClear}
          disabled={state.history.length < 2}
          className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <Trash2 className="size-3.5" aria-hidden />
          Clear history
        </button>
      </div>
      {state.history.length < 2 && !state.history[0] ? (
        <p className="text-muted-foreground py-1 text-xs">Nothing shown yet.</p>
      ) : (
        <ol className="flex max-h-44 flex-col overflow-y-auto">
          {entries.map(({ selection, index }) => {
            const resolved = selection ? resolvePlayerScreenImage(selection) : undefined
            const active = index === state.index
            const name = resolved?.name ?? 'Blank screen'
            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => onJump(index)}
                  aria-current={active ? 'true' : undefined}
                  aria-label={active ? `${name}, showing now` : `Show ${name} again`}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md p-1 text-left',
                    active ? 'bg-primary/10' : 'hover:bg-muted',
                    index > state.index && 'opacity-60',
                  )}
                >
                  <span className="grid h-8 w-12 shrink-0 place-items-center overflow-hidden rounded bg-black">
                    {resolved ? (
                      <PlayerScreenThumb
                        src={resolved.src}
                        alt=""
                        sizes="48px"
                        maxWidth={128}
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    ) : (
                      <MonitorOff className="size-3.5 text-white/60" aria-hidden />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs font-medium">{name}</span>
                  {active ? (
                    <span className="text-primary shrink-0 text-[11px] font-semibold">Showing</span>
                  ) : resolved ? (
                    <span className="text-muted-foreground shrink-0 text-[11px]">
                      {GROUP_LABEL[resolved.group]}
                    </span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ol>
      )}
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
      <ul className="grid grid-cols-4 gap-2">
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
                  <PlayerScreenThumb
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
