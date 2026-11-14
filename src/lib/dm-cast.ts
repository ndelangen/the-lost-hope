import type { EntityRef } from '#/definitions/kind'
import { collectReferences } from '#/lib/campaign-read-model'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { PALETTE, type StorylineSession } from '#/lib/dm-storylines'

export type CastMember = {
  person: EntityRef
  color: string
  /** The sessions this person turns up in, with the events they are part of. */
  appearances: { session: number; events: string[] }[]
  events: number
  first: number
  last: number
}

/**
 * Who turns up when, like a writer's character appearance chart: every PC and NPC that an event
 * of a session references, with the sessions they appear in. Derived from the events alone.
 */
export function buildCast(sessions: readonly StorylineSession[]): CastMember[] {
  const events = SOURCE_REGISTRIES.event as Record<string, object>
  const seen = new Map<string, Map<number, string[]>>()
  for (const session of sessions) {
    for (const event of session.events) {
      const people = new Set(
        collectReferences(events[event.key])
          .filter((ref) => ref.ref === 'pc' || ref.ref === 'npc')
          .map((ref) => `${ref.ref}:${ref.key}`),
      )
      for (const person of people) {
        const bySession = seen.get(person) ?? new Map<number, string[]>()
        bySession.set(session.number, [...(bySession.get(session.number) ?? []), event.key])
        seen.set(person, bySession)
      }
    }
  }
  return [...seen.entries()]
    .map(([person, bySession]) => {
      const [ref, key] = person.split(':') as ['pc' | 'npc', string]
      const appearances = [...bySession.entries()]
        .toSorted(([a], [b]) => a - b)
        .map(([session, keys]) => ({ session, events: keys }))
      return {
        person: { ref, key } as EntityRef,
        color: '',
        appearances,
        events: appearances.reduce((sum, a) => sum + a.events.length, 0),
        first: appearances[0]!.session,
        last: appearances.at(-1)!.session,
      }
    })
    .toSorted((a, b) => b.events - a.events || a.first - b.first)
    .map((member, index) => ({ ...member, color: PALETTE[index % PALETTE.length]! }))
}
