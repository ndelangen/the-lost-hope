import { UsersRound } from 'lucide-react'
import { useState } from 'react'

import { Avatar } from '#/components/ui/avatar'
import type { EntityRef } from '#/definitions/kind'
import type { PartyMember } from '#/lib/dm-encounter'

/**
 * Add the whole party or part of it. Everyone not yet in the roster starts ticked; PCs already in
 * the roster are shown but cannot be added twice.
 */
export function AddParty({
  party,
  inRoster,
  onAdd,
}: {
  party: readonly PartyMember[]
  inRoster: ReadonlySet<string>
  onAdd: (pcs: EntityRef<'pc'>[]) => void
}) {
  const available = party.filter((member) => !inRoster.has(member.source.key))
  const [unticked, setUnticked] = useState<ReadonlySet<string>>(new Set())
  const picked = available.filter((member) => !unticked.has(member.source.key))

  return (
    <section
      aria-labelledby="add-party-heading"
      className="border-border bg-card grid content-start gap-2 rounded-xl border p-3"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 id="add-party-heading" className="flex items-center gap-2 font-semibold">
          <UsersRound aria-hidden className="size-4" /> Add party
        </h2>
        {available.length > 0 ? (
          <div className="text-muted-foreground flex gap-2 text-xs">
            <button
              type="button"
              className="hover:underline"
              onClick={() => setUnticked(new Set())}
            >
              All
            </button>
            <button
              type="button"
              className="hover:underline"
              onClick={() => setUnticked(new Set(available.map((member) => member.source.key)))}
            >
              None
            </button>
          </div>
        ) : null}
      </div>
      <ul className="grid gap-0.5 text-sm">
        {party.map((member) => {
          const { key } = member.source
          const already = inRoster.has(key)
          return (
            <li key={key}>
              <label className="hover:bg-muted flex min-h-8 items-center gap-2.5 rounded-md px-1.5">
                <input
                  type="checkbox"
                  className="accent-primary size-4"
                  checked={already || !unticked.has(key)}
                  disabled={already}
                  onChange={(event) => {
                    const checked = event.currentTarget.checked
                    setUnticked((current) => {
                      const next = new Set(current)
                      if (checked) next.delete(key)
                      else next.add(key)
                      return next
                    })
                  }}
                />
                {member.avatar ? (
                  <Avatar src={member.avatar} sizes="24px" maxWidth={32} className="size-6" />
                ) : null}
                <span className={already ? 'text-muted-foreground' : undefined}>{member.name}</span>
                {already ? (
                  <span className="text-muted-foreground ml-auto text-xs">In roster</span>
                ) : null}
              </label>
            </li>
          )
        })}
      </ul>
      <button
        type="button"
        disabled={picked.length === 0}
        onClick={() => {
          onAdd(picked.map((member) => member.source))
          setUnticked(new Set())
        }}
        className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-lg px-3 text-sm font-semibold disabled:opacity-40"
      >
        {available.length === 0
          ? 'Whole party is in'
          : `Add ${picked.length === available.length ? 'party' : 'selected'} (${picked.length})`}
      </button>
    </section>
  )
}
