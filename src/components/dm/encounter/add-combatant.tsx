import { Plus, UserPlus } from 'lucide-react'
import { useId, useState } from 'react'

import { Input } from '#/components/ui/input'
import type { EncounterCandidate } from '#/lib/dm-encounter'

/**
 * Add NPCs, beasts, and PCs from the campaign, or a named player placeholder. Adding a creature
 * again adds another copy with its own values.
 */
export function AddCombatant({
  candidates,
  onAdd,
  onAddPlaceholder,
}: {
  candidates: readonly EncounterCandidate[]
  onAdd: (candidate: EncounterCandidate) => void
  onAddPlaceholder: (label: string) => void
}) {
  const [query, setQuery] = useState('')
  const inputId = useId()
  const needle = query.trim().toLocaleLowerCase()
  const matches = needle
    ? candidates.filter((candidate) => candidate.name.toLocaleLowerCase().includes(needle))
    : candidates.filter((candidate) => candidate.kind !== 'PC')

  return (
    <section
      aria-labelledby={`${inputId}-heading`}
      className="border-border bg-card grid content-start gap-2 rounded-xl border p-3"
    >
      <h2 id={`${inputId}-heading`} className="font-semibold">
        Add to encounter
      </h2>
      <label htmlFor={inputId} className="sr-only">
        Search NPCs, beasts, and PCs
      </label>
      <Input
        id={inputId}
        type="search"
        placeholder="Search NPCs, beasts, PCs…"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key !== 'Enter') return
          event.preventDefault()
          if (matches[0]) onAdd(matches[0])
        }}
      />
      {needle ? null : <p className="text-muted-foreground text-xs">NPCs and beasts</p>}
      <ul className="grid max-h-56 gap-0.5 overflow-y-auto text-sm">
        {matches.slice(0, 40).map((candidate) => (
          <li key={`${candidate.source.ref}:${candidate.source.key}`}>
            <button
              type="button"
              onClick={() => onAdd(candidate)}
              className="hover:bg-muted flex w-full items-center gap-2 rounded px-2 py-1 text-left"
            >
              <Plus aria-hidden className="text-muted-foreground size-3.5 shrink-0" />
              <span className="grow">{candidate.name}</span>
              <span className="text-muted-foreground text-xs">
                {candidate.kind}
                {candidate.cr ? ` · CR ${candidate.cr}` : ''}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {query.trim() ? (
        <button
          type="button"
          onClick={() => {
            onAddPlaceholder(query)
            setQuery('')
          }}
          className="border-border hover:bg-muted flex items-center gap-2 rounded-md border px-2 py-1 text-sm"
        >
          <UserPlus aria-hidden className="size-4" /> Add “{query.trim()}” as a player
        </button>
      ) : null}
    </section>
  )
}
