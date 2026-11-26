import { Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Eraser,
  Ellipsis,
  House,
  NotebookPen,
  PanelLeftClose,
  PanelLeftOpen,
  RotateCcw,
  Undo2,
  UserPlus,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '#/lib/utils'

import { ActionButton, IconButton } from './icon-button'

const MENU_ITEM =
  'hover:bg-muted flex min-h-12 w-full items-center gap-3 rounded-lg px-3 text-left text-base font-medium disabled:opacity-40 [&_svg]:text-muted-foreground [&_svg]:size-5 [&_svg]:shrink-0'

/**
 * The encounter's one bar, in one row: whose turn it is, the tools (adding to the fight, the prep
 * notes, the DM screen and the rarer housekeeping), and the step to the next turn at the far right.
 * On a narrow screen the status takes its own row above the tools and the step.
 */
export function EncounterToolbar({
  name,
  sceneSlug,
  round,
  activeName,
  running,
  canStepBack,
  onStep,
  onAdd,
  notesOpen,
  onToggleNotes,
  screenOpen,
  onToggleScreen,
  onReset,
  onClear,
  beats,
}: {
  name: string
  /** The scene the fight was loaded from, to go back to. */
  sceneSlug: string | undefined
  round: number
  activeName: string | undefined
  running: boolean
  canStepBack: boolean
  onStep: (step: 1 | -1) => void
  onAdd: () => void
  /** Absent when the fight has no prep notes. */
  notesOpen: boolean | undefined
  onToggleNotes: () => void
  screenOpen: boolean
  onToggleScreen: () => void
  onReset: () => void
  onClear: () => void
  /** The page's beats beside the fight, where it has them; the bar then shows and hides them. */
  beats?: { shown: boolean; onToggle: () => void }
}) {
  return (
    <div className="border-border bg-card grid grid-cols-[minmax(0,1fr)] items-center gap-3 rounded-2xl border-2 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
      <TurnStatus name={name} round={round} activeName={activeName} running={running} />
      {/* Below sm the tools and the step share a row, and the step wraps under the tools on a phone. */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:contents">
        <fieldset aria-label="Fight tools" className="flex min-w-0 items-center border-0 p-0">
          {beats ? (
            <IconButton
              size="lg"
              label={beats.shown ? 'Hide beats' : 'Show beats'}
              tip={beats.shown ? 'Hide beats · B' : 'Show beats · B'}
              aria-pressed={beats.shown}
              onClick={beats.onToggle}
              className={JOINED.start}
            >
              {beats.shown ? <PanelLeftClose aria-hidden /> : <PanelLeftOpen aria-hidden />}
            </IconButton>
          ) : null}
          <IconButton
            size="lg"
            label="Add to the fight"
            tip="Add to the fight · A"
            onClick={onAdd}
            className={beats ? JOINED.middle : JOINED.start}
          >
            <UserPlus aria-hidden />
          </IconButton>
          {notesOpen === undefined ? null : (
            <IconButton
              size="lg"
              label="Prep notes"
              tip="Prep notes · N"
              aria-pressed={notesOpen}
              onClick={onToggleNotes}
              className={cn(JOINED.middle, notesOpen && OPEN)}
            >
              <NotebookPen aria-hidden />
            </IconButton>
          )}
          <IconButton
            size="lg"
            label="DM screen"
            tip="DM screen · ?"
            aria-pressed={screenOpen}
            onClick={onToggleScreen}
            className={cn(JOINED.middle, screenOpen && OPEN)}
          >
            <BookOpen aria-hidden />
          </IconButton>
          <MoreMenu sceneSlug={sceneSlug} running={running} onReset={onReset} onClear={onClear} />
        </fieldset>
        <div className="ml-auto flex items-center">
          <IconButton
            size="lg"
            label="Previous turn"
            disabled={!canStepBack}
            onClick={() => onStep(-1)}
            className="rounded-r-none"
          >
            <Undo2 aria-hidden />
          </IconButton>
          <ActionButton
            size="lg"
            tone="primary"
            disabled={!running}
            onClick={() => onStep(1)}
            className="min-w-44 rounded-l-none"
          >
            Next turn <ArrowRight aria-hidden />
          </ActionButton>
        </div>
      </div>
    </div>
  )
}

/** Buttons that share their borders in one group: only the outer corners stay rounded. */
const JOINED = {
  start: 'rounded-r-none',
  middle: '-ml-0.5 rounded-none',
  end: '-ml-0.5 rounded-l-none',
} as const

/** A panel the button opens is showing. */
const OPEN = 'z-10 border-primary bg-primary/15 text-primary hover:bg-primary/20'

/** The fight's state at a glance: the round and scene, and whose turn it is. */
function TurnStatus({
  name,
  round,
  activeName,
  running,
}: {
  name: string
  round: number
  activeName: string | undefined
  running: boolean
}) {
  return (
    <div className="min-w-0">
      <p className="text-muted-foreground truncate text-sm font-semibold tracking-wide uppercase">
        {running ? `Round ${round} · ${name}` : name}
      </p>
      <p className="truncate text-2xl font-bold" aria-live="polite">
        {running ? (activeName ?? 'Nobody’s turn') : 'No fight yet'}
      </p>
    </div>
  )
}

function MoreMenu({
  sceneSlug,
  running,
  onReset,
  onClear,
}: {
  sceneSlug: string | undefined
  running: boolean
  onReset: () => void
  onClear: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])
  const choose = (action: () => void) => () => {
    setOpen(false)
    action()
  }

  return (
    <div ref={ref} className="relative">
      <IconButton
        size="lg"
        label="More"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen(!open)}
        className={cn(JOINED.end, open && OPEN)}
      >
        <Ellipsis aria-hidden />
      </IconButton>
      {open ? (
        <div
          role="menu"
          className="border-border bg-background absolute top-full right-0 z-50 mt-2 grid w-64 gap-1 rounded-xl border-2 p-1.5 shadow-xl"
        >
          <button
            type="button"
            role="menuitem"
            disabled={!running}
            className={MENU_ITEM}
            onClick={choose(onReset)}
          >
            <RotateCcw aria-hidden /> Reset HP and uses
          </button>
          <button
            type="button"
            role="menuitem"
            disabled={!running}
            className={MENU_ITEM}
            onClick={choose(onClear)}
          >
            <Eraser aria-hidden /> Clear the fight
          </button>
          {sceneSlug ? (
            <Link
              role="menuitem"
              to="/dm/scenes/$slug"
              params={{ slug: sceneSlug }}
              className={MENU_ITEM}
            >
              <ArrowLeft aria-hidden /> Back to the scene
            </Link>
          ) : null}
          <Link role="menuitem" to="/dm" className={MENU_ITEM}>
            <House aria-hidden /> DM dashboard
          </Link>
        </div>
      ) : null}
    </div>
  )
}
