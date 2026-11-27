import { useRouterState } from '@tanstack/react-router'
import { EyeOff, type LucideIcon } from 'lucide-react'
import { type ReactNode, useMemo, useState } from 'react'

import { SearchInput } from '#/components/ui/search-input'
import {
  filterPlayerScreenOptions,
  playerScreenOptions,
  playerScreenOptionsForPage,
  type PlayerScreenGroup,
  type PlayerScreenOption,
} from '#/lib/player-screen'
import type { PlayerScreenImage } from '#/lib/player-screen-state'
import { cn } from '#/lib/utils'

import { GROUPS, GROUP_LABEL, PlayerScreenThumb } from './parts'

/** Where a picture already is, so the picker can say so on its tile. */
export type PickerMark = 'live' | 'deck' | 'queued'

const MARK_LABEL: Record<PickerMark, string> = {
  live: 'Live',
  deck: 'On deck',
  queued: 'Lined up',
}

/** A second thing to do with a picture, as a small button on its tile. */
export type PickerCornerAction = {
  Icon: LucideIcon
  label: (name: string, mark: PickerMark | undefined) => string
  pressed?: (mark: PickerMark | undefined) => boolean
  onPick: (selection: PlayerScreenImage) => void
}

/** One button over the pictures of the page the DM is on. */
export type PickerPageAction = {
  Icon: LucideIcon
  label: string
  disabled: boolean
  run: () => void
}

type Filter = 'page' | 'all' | PlayerScreenGroup

/**
 * Finds a picture to put on the player screen: the ones for the page the DM is on first, then
 * every picture by kind, narrowed by a search.
 */
export function PicturePicker({
  mark,
  onPick,
  pickLabel,
  onDoublePick,
  corner,
  hint,
  pageAction,
}: {
  mark: (selection: PlayerScreenImage) => PickerMark | undefined
  /** A click on a picture. */
  onPick: (selection: PlayerScreenImage) => void
  /** Says what a click does, for screen readers: "Show Bob to the players". */
  pickLabel: (option: PlayerScreenOption) => string
  onDoublePick?: (selection: PlayerScreenImage) => void
  corner?: PickerCornerAction
  /** One line on what clicking does in this panel. */
  hint?: ReactNode
  /** An action on all of this page's pictures, such as lining them up. */
  pageAction?: (options: readonly PlayerScreenOption[]) => PickerPageAction
}) {
  const [query, setQuery] = useState('')
  const [chosen, setChosen] = useState<Filter | undefined>(undefined)
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const options = useMemo(() => playerScreenOptions(), [])
  const onThisPage = useMemo(
    () => playerScreenOptionsForPage(options, pathname),
    [options, pathname],
  )
  const matches = useMemo(() => filterPlayerScreenOptions(options, query), [options, query])
  const groups = GROUPS.filter((group) => options.some((option) => option.group === group))

  // The page's own pictures come first, when it has any; a search looks through everything.
  const fallback: Filter = onThisPage.length > 0 ? 'page' : 'all'
  const picked = chosen === 'page' && onThisPage.length === 0 ? fallback : (chosen ?? fallback)
  const filter: Filter = query && picked === 'page' ? 'all' : picked

  const sections: Array<{ title: string; options: readonly PlayerScreenOption[] }> =
    filter === 'page'
      ? [{ title: 'On this page', options: onThisPage }]
      : (filter === 'all' ? groups : [filter]).map((group) => ({
          title: group,
          options: matches.filter((option) => option.group === group),
        }))
  const shown = sections.filter((section) => section.options.length > 0)

  const pageButton = filter === 'page' && pageAction ? pageAction(onThisPage) : undefined

  const chips: Array<{ id: Filter; label: string; count?: number }> = [
    ...(onThisPage.length > 0
      ? [{ id: 'page' as const, label: 'This page', count: onThisPage.length }]
      : []),
    { id: 'all', label: 'All' },
    ...groups.map((group) => ({ id: group, label: group })),
  ]

  return (
    <div className="@container flex min-h-0 flex-1 flex-col">
      <div className="border-border flex flex-col gap-2 border-b p-2 @3xl:flex-row @3xl:items-center">
        <SearchInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find a map, place, NPC or scene"
          aria-label="Find a picture to show"
          className="h-9"
          containerClassName="@3xl:w-72 @3xl:shrink-0"
        />
        <fieldset className="flex min-w-0 flex-wrap gap-1">
          <legend className="sr-only">Kind of picture</legend>
          {chips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setChosen(chip.id)}
              aria-pressed={filter === chip.id}
              className={cn(
                'h-7 rounded-full border px-2.5 text-xs font-medium',
                filter === chip.id
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {chip.label}
              {chip.count ? <span className="text-muted-foreground"> · {chip.count}</span> : null}
            </button>
          ))}
        </fieldset>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-2">
        {pageButton ? (
          <button
            type="button"
            onClick={pageButton.run}
            disabled={pageButton.disabled}
            className="border-border hover:bg-muted flex h-9 shrink-0 items-center gap-1.5 self-start rounded-lg border px-2.5 text-sm font-medium disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <pageButton.Icon className="size-4" aria-hidden />
            {pageButton.label}
          </button>
        ) : null}
        {shown.map((section) => (
          <section key={section.title} aria-label={section.title} className="flex flex-col gap-2">
            {shown.length > 1 || filter === 'page' ? (
              <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                {section.title}
              </h3>
            ) : null}
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(5.75rem,1fr))] gap-2">
              {section.options.map((option) => (
                <PictureTile
                  key={option.id}
                  option={option}
                  mark={mark(option.selection)}
                  showGroup={filter === 'page'}
                  label={pickLabel(option)}
                  onPick={onPick}
                  onDoublePick={onDoublePick}
                  corner={corner}
                />
              ))}
            </ul>
          </section>
        ))}
        {shown.length === 0 ? (
          <p className="text-muted-foreground py-6 text-center text-sm">No pictures match.</p>
        ) : null}
      </div>

      <p className="text-muted-foreground border-border border-t px-3 py-1.5 text-xs">
        {hint ? <>{hint} </> : null}
        <EyeOff className="mr-1 inline size-3.5 align-[-2px]" aria-hidden />
        marks records the party has not met. Their names never appear on the player screen.
      </p>
    </div>
  )
}

function PictureTile({
  option,
  mark,
  showGroup,
  label,
  onPick,
  onDoublePick,
  corner,
}: {
  option: PlayerScreenOption
  mark: PickerMark | undefined
  showGroup: boolean
  label: string
  onPick: (selection: PlayerScreenImage) => void
  onDoublePick?: (selection: PlayerScreenImage) => void
  corner?: PickerCornerAction
}) {
  const cornerPressed = corner?.pressed?.(mark) ?? false
  return (
    <li className="group relative">
      <button
        type="button"
        onClick={() => onPick(option.selection)}
        onDoubleClick={onDoublePick ? () => onDoublePick(option.selection) : undefined}
        aria-pressed={mark === 'live'}
        aria-label={label}
        className={cn(
          'flex w-full flex-col gap-1 rounded-lg p-1 text-left',
          mark === 'live'
            ? 'bg-emerald-500/10 ring-2 ring-emerald-500'
            : mark
              ? 'bg-amber-400/10 ring-2 ring-amber-400'
              : 'hover:bg-muted',
        )}
      >
        <span className="relative block aspect-[3/2] w-full overflow-hidden rounded-md bg-black">
          <PlayerScreenThumb
            src={option.src}
            group={option.group}
            alt=""
            sizes="144px"
            maxWidth={384}
            loading="lazy"
            className={cn('size-full', option.group === 'Maps' ? 'object-contain' : 'object-cover')}
          />
          {option.met || option.group === 'Scenes' ? null : (
            <span className="absolute top-1 right-1 grid size-6 place-items-center rounded-full bg-black/70 text-white">
              <EyeOff className="size-3.5" aria-label="Not met yet" />
            </span>
          )}
          {mark ? (
            <span
              className={cn(
                'absolute bottom-1 left-1 rounded px-1 py-px text-[10px] font-bold tracking-wide uppercase',
                mark === 'live' ? 'bg-emerald-600 text-white' : 'bg-amber-400 text-black',
              )}
            >
              {MARK_LABEL[mark]}
            </span>
          ) : null}
        </span>
        <span className="line-clamp-2 text-xs leading-tight font-medium">{option.name}</span>
        {showGroup ? (
          <span className="text-muted-foreground text-[11px] leading-none">
            {GROUP_LABEL[option.group]}
          </span>
        ) : null}
      </button>
      {corner && mark !== 'live' ? (
        <button
          type="button"
          onClick={() => corner.onPick(option.selection)}
          aria-pressed={corner.pressed ? cornerPressed : undefined}
          aria-label={corner.label(option.name, mark)}
          title={corner.label(option.name, mark)}
          className={cn(
            'absolute top-2 left-2 grid size-7 place-items-center rounded-full ring-1 ring-white/30 transition-opacity',
            cornerPressed
              ? 'bg-amber-400 text-black'
              : 'bg-black/75 text-white opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 hover:bg-black',
          )}
        >
          <corner.Icon className="size-4" aria-hidden />
        </button>
      ) : null}
    </li>
  )
}
