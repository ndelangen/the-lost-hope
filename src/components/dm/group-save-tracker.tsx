import {
  Check,
  Copy,
  Dices,
  Link2,
  MonitorCheck,
  MonitorUp,
  RotateCcw,
  Unlink2,
} from 'lucide-react'
import { useState } from 'react'

import { usePlayerScreen } from '#/components/player-screen/use-player-screen'
import { Avatar } from '#/components/ui/avatar'
import { DEFAULT_AVATAR } from '#/definitions/media'
import {
  clearGroupSave,
  groupSaveRows,
  groupSaveSummary,
  rollGroupSaveFor,
  rollGroupSaveRest,
  setGroupSaveOnScreen,
  setGroupSaveReason,
  setGroupSaveRoll,
  type GroupSave,
  type GroupSaveRow,
} from '#/lib/group-save'
import {
  playerScreenShowing,
  samePlayerScreenImage,
  showOnPlayerScreen,
  type PlayerScreenImage,
} from '#/lib/player-screen-state'
import { signed } from '#/lib/stat-block'
import { cn } from '#/lib/utils'

import { useGroupSave } from './use-group-save'

const BUTTON =
  'border-border hover:bg-muted flex h-12 shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-semibold disabled:pointer-events-none disabled:opacity-40'

/** Portrait, name, reason, roll, roll-for-me, total, how it came out. */
const ROW_GRID =
  'grid grid-cols-[2.5rem_minmax(0,1fr)_3rem_4.5rem_3rem_2.5rem_8.5rem] items-center gap-2'

/**
 * The DM's sheet for a save many characters make at once: a roll per character, the bonus for a
 * good reason, and who made it. The same list can be drawn over the scene's picture on the
 * player screen.
 */
export function GroupSaveTracker({
  storageKey,
  save,
  picture,
}: {
  storageKey: string
  save: GroupSave
  /** The scene's picture, which the list is drawn over on the player screen. */
  picture: PlayerScreenImage | undefined
}) {
  const [state, update] = useGroupSave(storageKey, save)
  const [screen, updateScreen] = usePlayerScreen()
  const [copied, setCopied] = useState(false)
  const rows = groupSaveRows(save, state)
  const live = state.onScreen && samePlayerScreenImage(picture, playerScreenShowing(screen))
  const rolled = rows.filter((row) => row.outcome !== 'pending').length
  const restToRoll = rows.some((row) => row.bonus !== undefined && row.roll === undefined)

  const toggleScreen = () => {
    if (!picture) return
    update((current) => setGroupSaveOnScreen(current, !live))
    if (!live) updateScreen((current) => showOnPlayerScreen(current, picture))
  }
  const copy = () => {
    void navigator.clipboard
      .writeText(groupSaveSummary(save, rows))
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {})
  }

  return (
    <section
      aria-label={save.title}
      className="border-border bg-background grid gap-3 rounded-xl border p-3"
    >
      <header className="grid gap-1">
        <h4 className="text-base font-semibold">{save.title}</h4>
        <p className="text-muted-foreground text-sm">
          DC {save.dc} {save.abilityName} saving throw
          {save.reasonBonus
            ? `. ${signed(save.reasonBonus)} when a player gives a good reason for that character.`
            : '.'}{' '}
          {rolled} of {rows.length} rolled.
        </p>
      </header>

      <div
        aria-hidden
        className={cn(ROW_GRID, 'text-muted-foreground px-2 text-[11px] font-semibold uppercase')}
      >
        <span className="col-span-2">Who</span>
        <span className="text-center">{save.reasonBonus ? 'Reason' : ''}</span>
        <span className="text-center">Roll</span>
        <span />
        <span className="text-right">Total</span>
        <span />
      </div>
      <ul className="grid gap-1">
        {rows.map((row) => (
          <li key={row.id}>
            <TrackerRow
              row={row}
              save={save}
              onRoll={(roll) => update((current) => setGroupSaveRoll(current, row.id, roll))}
              onReason={(reason) =>
                update((current) => setGroupSaveReason(current, row.id, reason))
              }
              onAutoRoll={() => update((current) => rollGroupSaveFor(current, row.id))}
            />
          </li>
        ))}
      </ul>

      <footer className="flex flex-wrap gap-2">
        {picture ? (
          <button
            type="button"
            onClick={toggleScreen}
            aria-pressed={live}
            className={cn(
              BUTTON,
              live && 'border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700',
            )}
          >
            {live ? (
              <MonitorCheck className="size-5" aria-hidden />
            ) : (
              <MonitorUp className="size-5" aria-hidden />
            )}
            {live ? 'List is on the player screen' : 'Show list to players'}
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => update((current) => rollGroupSaveRest(current, save))}
          disabled={!restToRoll}
          className={BUTTON}
        >
          <Dices className="size-5" aria-hidden /> Roll the rest of mine
        </button>
        <button type="button" onClick={copy} disabled={rolled === 0} className={BUTTON}>
          {copied ? (
            <Check className="size-5" aria-hidden />
          ) : (
            <Copy className="size-5" aria-hidden />
          )}
          {copied ? 'Copied' : 'Copy results'}
        </button>
        <button
          type="button"
          onClick={() => update(clearGroupSave)}
          disabled={!rows.some((row) => row.roll !== undefined || row.reason)}
          className={cn(BUTTON, 'text-muted-foreground border-transparent')}
        >
          <RotateCcw className="size-4" aria-hidden /> Clear rolls
        </button>
      </footer>
    </section>
  )
}

function TrackerRow({
  row,
  save,
  onRoll,
  onReason,
  onAutoRoll,
}: {
  row: GroupSaveRow
  save: GroupSave
  onRoll: (roll: number | undefined) => void
  onReason: (reason: boolean) => void
  onAutoRoll: () => void
}) {
  const mine = row.bonus !== undefined
  return (
    <div
      className={cn(
        ROW_GRID,
        'rounded-lg px-2 py-1',
        row.outcome === 'passed' && 'bg-emerald-500/10',
        row.outcome === 'failed' && 'bg-red-500/10',
      )}
    >
      <Avatar
        src={row.avatar ?? DEFAULT_AVATAR}
        alt=""
        sizes="40px"
        maxWidth={64}
        className="size-10"
      />
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-semibold">{row.name}</span>
        <span className="text-muted-foreground truncate text-xs">
          {row.bonus === undefined ? 'Player’s total' : `The die, save ${signed(row.bonus)}`}
        </span>
      </span>
      {save.reasonBonus ? (
        <label
          title={`A player gave a good reason for ${row.name}: ${signed(save.reasonBonus)}`}
          className="hover:bg-muted flex size-12 cursor-pointer items-center justify-center rounded-lg"
        >
          <input
            type="checkbox"
            checked={row.reason}
            aria-label={`Good reason given for ${row.name}, ${signed(save.reasonBonus)}`}
            onChange={(event) => onReason(event.target.checked)}
            className="size-6 accent-emerald-600"
          />
        </label>
      ) : (
        <span />
      )}
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={mine ? 20 : 99}
        value={row.roll ?? ''}
        placeholder={mine ? 'd20' : 'total'}
        aria-label={mine ? `Die rolled for ${row.name}` : `Total ${row.name} rolled`}
        onFocus={(event) => event.target.select()}
        onChange={(event) =>
          onRoll(event.target.value === '' ? undefined : Number(event.target.value))
        }
        className="border-border bg-background h-12 w-full rounded-lg border px-1 text-center text-lg font-semibold tabular-nums outline-none focus-visible:ring-2"
      />
      {mine ? (
        <button
          type="button"
          onClick={onAutoRoll}
          aria-label={`Roll for ${row.name}`}
          title={`Roll for ${row.name}`}
          className="border-border hover:bg-muted flex size-12 items-center justify-center rounded-lg border"
        >
          <Dices className="size-5" aria-hidden />
        </button>
      ) : (
        <span />
      )}
      <span className="text-right text-lg font-bold tabular-nums">{row.total ?? '–'}</span>
      {row.outcome === 'pending' ? (
        <span />
      ) : (
        <span
          className={cn(
            'flex items-center gap-1.5 text-sm leading-tight font-semibold',
            row.outcome === 'passed'
              ? 'text-emerald-700 dark:text-emerald-300'
              : 'text-red-700 dark:text-red-300',
          )}
        >
          {row.outcome === 'passed' ? (
            <Link2 className="size-4 shrink-0" aria-hidden />
          ) : (
            <Unlink2 className="size-4 shrink-0" aria-hidden />
          )}
          {row.outcome === 'passed' ? save.passed : save.failed}
        </span>
      )}
    </div>
  )
}
