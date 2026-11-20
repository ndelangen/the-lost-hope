import { NotebookPen, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import { FightLineUp } from '#/components/dm/fight-line-up'
import type { SceneCombatNotes } from '#/definitions/scene'
import type { SceneFight } from '#/lib/dm-encounter'

import { IconButton } from './icon-button'

const FIELDS = [
  ['tactics', 'Tactics'],
  ['morale', 'Morale'],
  ['terrain', 'Terrain'],
  ['reinforcements', 'Reinforcements'],
  ['exits', 'Ways out'],
] as const satisfies readonly (readonly [keyof SceneCombatNotes, string])[]

/** The scene's fight prep fields that have something written in them. */
export function notedFields(notes: SceneCombatNotes | undefined) {
  return FIELDS.filter(([field]) => notes?.[field]?.length)
}

/**
 * The scene's fight prep in a drawer beside the fight: tactics, morale, terrain and ways out, and
 * how to play each prepared group that has joined.
 */
export function EncounterNotes({
  open,
  onClose,
  sceneName,
  notes,
  fights,
}: {
  open: boolean
  onClose: () => void
  sceneName: string
  notes: SceneCombatNotes | undefined
  /** The prepared groups in the fight now. */
  fights: readonly SceneFight[]
}) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (open) headingRef.current?.focus()
  }, [open])
  if (!open) return null
  const present = notedFields(notes)

  return (
    <aside
      aria-labelledby="encounter-notes-heading"
      className="border-border bg-background fixed inset-y-0 right-0 z-40 flex w-[min(30rem,100vw)] flex-col border-l-2 shadow-2xl"
    >
      <header className="border-border flex items-center justify-between gap-3 border-b px-5 py-3">
        <h2
          id="encounter-notes-heading"
          ref={headingRef}
          tabIndex={-1}
          className="grid outline-none"
        >
          <span className="flex items-center gap-2 text-xl font-bold">
            <NotebookPen aria-hidden className="size-6" /> Prep notes
          </span>
          <span className="text-muted-foreground text-sm font-normal">{sceneName}</span>
        </h2>
        <IconButton label="Close the notes (Esc)" onClick={onClose}>
          <X aria-hidden />
        </IconButton>
      </header>
      <div className="grid content-start gap-5 overflow-y-auto px-5 py-4">
        {present.length > 0 ? (
          <dl className="grid gap-3">
            {present.map(([field, label]) => (
              <div key={field} className="grid gap-0.5">
                <dt className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                  {label}
                </dt>
                <dd>
                  <ContentRenderer content={notes![field]!} className="text-base" />
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        {fights.map((fight) => (
          <section key={fight.key} className="grid gap-2">
            <h3 className="font-semibold">{fight.key}</h3>
            <FightLineUp lineUp={fight} />
          </section>
        ))}
      </div>
    </aside>
  )
}
