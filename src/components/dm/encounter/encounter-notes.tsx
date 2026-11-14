import { ChevronDown, NotebookPen } from 'lucide-react'
import { useState } from 'react'

import { ContentRenderer } from '#/components/content-renderer'
import type { SceneCombatNotes } from '#/definitions/scene'
import { cn } from '#/lib/utils'

const FIELDS = [
  ['tactics', 'Tactics'],
  ['morale', 'Morale'],
  ['terrain', 'Terrain'],
  ['reinforcements', 'Reinforcements'],
  ['exits', 'Ways out'],
] as const satisfies readonly (readonly [keyof SceneCombatNotes, string])[]

/** The scene's fight prep, pinned at the top of combat focus and collapsible. */
export function EncounterNotes({
  sceneName,
  notes,
}: {
  sceneName: string
  notes: SceneCombatNotes | undefined
}) {
  const [open, setOpen] = useState(true)
  const present = FIELDS.filter(([field]) => notes?.[field]?.length)
  if (!notes || present.length === 0) return null

  return (
    <details
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className="border-border bg-card rounded-2xl border-2 px-4 py-2 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary className="flex h-10 cursor-pointer list-none items-center gap-2 font-semibold">
        <NotebookPen aria-hidden className="text-muted-foreground size-5" />
        Prep notes
        <span className="text-muted-foreground font-normal">· {sceneName}</span>
        <ChevronDown
          aria-hidden
          className={cn(
            'text-muted-foreground ml-auto size-5 transition-transform',
            open && 'rotate-180',
          )}
        />
      </summary>
      <dl className="grid gap-x-6 gap-y-2 pb-2 sm:grid-cols-2 xl:grid-cols-3">
        {present.map(([field, label]) => (
          <div key={field} className="grid gap-0.5">
            <dt className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
              {label}
            </dt>
            <dd>
              <ContentRenderer content={notes[field]!} className="text-base" />
            </dd>
          </div>
        ))}
      </dl>
    </details>
  )
}
