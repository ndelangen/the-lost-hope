import { Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Eraser,
  Ellipsis,
  House,
  NotebookPen,
  RotateCcw,
  UserPlus,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '#/lib/utils'

import { ActionButton } from './icon-button'

const MENU_ITEM =
  'hover:bg-muted flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-base font-medium disabled:opacity-40 [&_svg]:text-muted-foreground [&_svg]:size-5 [&_svg]:shrink-0'

/**
 * The encounter's one bar: whose turn it is and the way to the next, adding to the fight, the prep
 * notes and the DM screen, and the rarer housekeeping in a small menu.
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
}) {
  return (
    <div className="border-border bg-card flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border-2 px-4 py-3">
      <div className="min-w-0">
        <p className="text-muted-foreground truncate text-sm">{name}</p>
        <p className="text-xl font-bold tabular-nums" aria-live="polite">
          {running ? (
            <>
              Round {round}
              {activeName ? (
                <span className="text-muted-foreground font-normal"> · {activeName}</span>
              ) : null}
            </>
          ) : (
            'No fight yet'
          )}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <ActionButton size="lg" disabled={!canStepBack} onClick={() => onStep(-1)}>
          <ArrowLeft aria-hidden /> Previous
        </ActionButton>
        <ActionButton
          size="lg"
          tone="primary"
          disabled={!running}
          onClick={() => onStep(1)}
          className="px-8"
        >
          Next turn <ArrowRight aria-hidden />
        </ActionButton>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <ActionButton onClick={onAdd} title="Add to the fight (A)">
          <UserPlus aria-hidden /> Add to fight
        </ActionButton>
        {notesOpen === undefined ? null : (
          <ActionButton
            aria-expanded={notesOpen}
            onClick={onToggleNotes}
            title="Prep notes (N)"
            className={cn(notesOpen && 'bg-muted')}
          >
            <NotebookPen aria-hidden /> Notes
          </ActionButton>
        )}
        <ActionButton
          aria-expanded={screenOpen}
          onClick={onToggleScreen}
          title="Beginner DM screen (?)"
          className={cn(screenOpen && 'bg-muted')}
        >
          <BookOpen aria-hidden /> DM screen
        </ActionButton>
        <MoreMenu sceneSlug={sceneSlug} running={running} onReset={onReset} onClear={onClear} />
      </div>
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
      <ActionButton aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen(!open)}>
        <Ellipsis aria-hidden /> More
      </ActionButton>
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
