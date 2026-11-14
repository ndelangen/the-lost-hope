import { Avatar } from '#/components/ui/avatar'
import type { EntityRef } from '#/definitions/kind'
import { DEFAULT_AVATAR } from '#/definitions/media'
import { resolveSourceRef } from '#/lib/dm-campaign'
import { cn } from '#/lib/utils'

/** An overlapping row of portraits for the characters in a DM view, including unmet NPCs. */
export function DmFaces({
  people,
  size = 'sm',
}: {
  people: readonly EntityRef[]
  size?: 'xs' | 'sm' | 'md'
}) {
  return (
    <div className="flex shrink-0 -space-x-2">
      {people.map((person) => {
        const record = resolveSourceRef(person)
        return (
          <Avatar
            key={`${person.ref}:${person.key}`}
            src={record?.avatar ?? DEFAULT_AVATAR}
            alt={record?.name ?? ''}
            sizes={size === 'xs' ? '16px' : size === 'sm' ? '28px' : '40px'}
            maxWidth={64}
            className={cn(
              'ring-background ring-2',
              size === 'xs' ? 'size-4 ring-1' : size === 'sm' ? 'size-7' : 'size-10',
            )}
          />
        )
      })}
    </div>
  )
}
