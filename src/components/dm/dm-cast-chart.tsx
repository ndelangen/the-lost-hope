import { DmFaces } from '#/components/dm/dm-faces'
import { resolveSourceRef } from '#/lib/dm-campaign'
import type { CastMember } from '#/lib/dm-cast'
import type { StorylineSession } from '#/lib/dm-storylines'
import { cn } from '#/lib/utils'

/**
 * A character appearance chart: one row per person, one column per session, darker when they were
 * in more events, and when each was last seen, so a forgotten NPC stands out.
 */
export function DmCastChart({
  cast,
  sessions,
  latest,
}: {
  cast: readonly CastMember[]
  sessions: readonly StorylineSession[]
  latest: number
}) {
  const most = Math.max(1, ...cast.flatMap((m) => m.appearances.map((a) => a.events.length)))
  return (
    <div className="overflow-x-auto">
      <table className="text-sm">
        <thead>
          <tr className="text-muted-foreground text-xs">
            <th className="sr-only">Person</th>
            {sessions.map((session) => (
              <th
                key={session.key}
                title={session.name}
                className="font-mono text-[10px] font-normal"
              >
                {session.number}
              </th>
            ))}
            <th className="pl-3 text-left font-normal">Last seen</th>
          </tr>
        </thead>
        <tbody>
          {cast.map((member) => {
            const quiet = latest - member.last
            return (
              <tr key={`${member.person.ref}:${member.person.key}`}>
                <th className="py-0.5 pr-3 text-left font-normal">
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <DmFaces people={[member.person]} size="xs" />
                    <span className="max-w-36 truncate">
                      {resolveSourceRef(member.person)?.name ?? member.person.key}
                    </span>
                  </span>
                </th>
                {sessions.map((session) => {
                  const seen = member.appearances.find((a) => a.session === session.number)
                  const label = seen
                    ? `S${session.number}: ${seen.events
                        .map((key) => resolveSourceRef({ ref: 'event', key })?.name ?? key)
                        .join(' · ')}`
                    : `S${session.number}: not there`
                  return (
                    <td key={session.key} className="p-0.5" title={label}>
                      <span
                        className={cn('block h-4 w-3.5 rounded-sm', !seen && 'bg-muted/50')}
                        style={
                          seen
                            ? {
                                background: member.color,
                                opacity: 0.35 + (0.65 * seen.events.length) / most,
                              }
                            : undefined
                        }
                      />
                      <span className="sr-only">{label}</span>
                    </td>
                  )
                })}
                <td
                  className={cn(
                    'pl-3 text-xs whitespace-nowrap',
                    quiet >= 5 ? 'font-medium text-amber-600' : 'text-muted-foreground',
                  )}
                >
                  S{member.last}
                  {quiet === 0 ? '' : ` · ${quiet} ago`}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
