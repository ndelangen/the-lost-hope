import { Link2, Unlink2 } from 'lucide-react'

import { useGroupSave } from '#/components/dm/use-group-save'
import { Avatar } from '#/components/ui/avatar'
import { DEFAULT_AVATAR } from '#/definitions/media'
import { groupSaveRows, type GroupSave, type GroupSaveRow } from '#/lib/group-save'
import { cn } from '#/lib/utils'

/**
 * A group save on the player screen, over the scene's picture: every character with their roll
 * and how it came out, filling in live as the DM enters the rolls.
 */
export function GroupSaveOnScreen({ storageKey, save }: { storageKey: string; save: GroupSave }) {
  const [state] = useGroupSave(storageKey, save)
  if (!state.onScreen) return null
  const rows = groupSaveRows(save, state)
  const columns = rows.length > 5

  return (
    <div className="animate-in fade-in absolute inset-0 flex items-center justify-center bg-black/45 p-[4vmin] duration-700">
      <div
        className={cn(
          'flex max-h-full w-full flex-col gap-[3vmin]',
          columns ? 'max-w-[168vmin]' : 'max-w-[90vmin]',
        )}
      >
        <h1 className="text-center text-[6vmin] leading-tight font-bold tracking-tight [text-shadow:0_0.4vmin_2.4vmin_rgb(0_0_0/0.9)]">
          {save.title}
        </h1>
        <ul
          // Two columns read top to bottom, so the list keeps its order.
          className={cn(
            'grid gap-[1.6vmin]',
            columns ? 'grid-flow-col grid-cols-2' : 'grid-cols-1',
          )}
          style={
            columns
              ? { gridTemplateRows: `repeat(${Math.ceil(rows.length / 2)}, auto)` }
              : undefined
          }
        >
          {rows.map((row) => (
            <li key={row.id}>
              <ScreenRow row={row} save={save} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ScreenRow({ row, save }: { row: GroupSaveRow; save: GroupSave }) {
  const failed = row.outcome === 'failed'
  return (
    <div
      className={cn(
        'flex items-center gap-[2vmin] rounded-[2.4vmin] bg-black/65 px-[2vmin] py-[1.4vmin] ring-1 backdrop-blur-md transition-colors duration-700',
        row.outcome === 'passed' && 'ring-emerald-300/60',
        failed && 'ring-red-400/50',
        row.outcome === 'pending' && 'ring-white/15',
      )}
    >
      <Avatar
        src={row.avatar ?? DEFAULT_AVATAR}
        alt=""
        sizes="12vmin"
        maxWidth={256}
        loading="eager"
        className={cn(
          'size-[9vmin] ring-2 ring-white/25 transition duration-700',
          failed && 'opacity-60 grayscale',
        )}
      />
      <span
        className={cn(
          'min-w-0 flex-1 truncate text-[3.2vmin] font-semibold transition-colors duration-700',
          failed && 'text-white/60',
        )}
      >
        {row.met ? row.name : ''}
      </span>
      {row.total === undefined ? (
        <span className="text-[2.6vmin] text-white/45">Not rolled yet</span>
      ) : (
        <span
          key={row.total}
          className="animate-in fade-in zoom-in-75 flex shrink-0 items-center gap-[2vmin] duration-500"
        >
          <span className="w-[7vmin] text-right text-[5.4vmin] leading-none font-bold tabular-nums">
            {row.total}
          </span>
          <span
            className={cn(
              'flex w-[26vmin] items-center gap-[1vmin] text-[2.5vmin] leading-tight font-semibold whitespace-nowrap',
              failed ? 'text-red-300' : 'text-emerald-300',
            )}
          >
            {failed ? (
              <Unlink2 className="size-[3.2vmin] shrink-0" aria-hidden />
            ) : (
              <Link2 className="size-[3.2vmin] shrink-0" aria-hidden />
            )}
            {failed ? save.failed : save.passed}
          </span>
        </span>
      )}
    </div>
  )
}
