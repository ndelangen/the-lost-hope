import { Avatar } from '#/components/ui/avatar'
import type { EntityRef } from '#/definitions/kind'
import { DEFAULT_AVATAR } from '#/definitions/media'
import { resolveSourceRef } from '#/lib/dm-campaign'
import { cn } from '#/lib/utils'

/**
 * An overlapping row of portraits for the characters in a DM view, including unmet NPCs. With
 * `max`, a crowd shows its first faces and a count of the rest, so the row leaves room for its
 * neighbours.
 */
export function DmFaces({
  people,
  size = 'sm',
  max,
}: {
  people: readonly EntityRef[]
  size?: 'xs' | 'sm' | 'md'
  max?: number
}) {
  const shown = max !== undefined && people.length > max ? people.slice(0, max - 1) : people
  const hidden = people.slice(shown.length).map((person) => resolveSourceRef(person)?.name ?? '')
  const sizeClass = size === 'xs' ? 'size-4 ring-1' : size === 'sm' ? 'size-7' : 'size-10'
  return (
    <div className="flex shrink-0 -space-x-2">
      {shown.map((person) => {
        const record = resolveSourceRef(person)
        return (
          <Avatar
            key={`${person.ref}:${person.key}`}
            src={record?.avatar ?? DEFAULT_AVATAR}
            alt={record?.name ?? ''}
            sizes={size === 'xs' ? '16px' : size === 'sm' ? '28px' : '40px'}
            maxWidth={64}
            className={cn('ring-background ring-2', sizeClass)}
          />
        )
      })}
      {hidden.length > 0 ? (
        <span
          title={hidden.join(', ')}
          className={cn(
            'bg-muted text-muted-foreground ring-background relative grid place-items-center rounded-full text-xs font-medium tabular-nums ring-2',
            sizeClass,
          )}
        >
          +{hidden.length}
        </span>
      ) : null}
    </div>
  )
}
