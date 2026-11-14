import {
  Brain,
  Castle,
  Check,
  Crown,
  Dices,
  HeartCrack,
  Hourglass,
  ShieldQuestion,
  X,
} from 'lucide-react'
import type { ReactNode } from 'react'

import { CONDITIONS } from '#/definitions/rules-glossary'
import { CONDITION_ICONS } from '#/lib/condition-icons'
import {
  describeDuration,
  type LairPrompt,
  type TurnNote,
  type TurnReminder,
} from '#/lib/encounter-combat'
import { cn } from '#/lib/utils'

import { useDensity } from './density'
import { ActionButton } from './icon-button'

const ABILITY_NAME = {
  str: 'Strength',
  dex: 'Dexterity',
  con: 'Constitution',
  int: 'Intelligence',
  wis: 'Wisdom',
  cha: 'Charisma',
} as const

/**
 * What the DM should do now: reminders for the creature whose turn it is, and what just happened
 * at the turn boundary (conditions that ended, saves to roll, legendary actions refilled).
 */
export function TurnCard({
  name,
  reminders,
  notes,
  nameOf,
  onRecharge,
  onDismissRecharge,
  lair = [],
  onLairAction,
}: {
  name: string
  reminders: readonly TurnReminder[]
  notes: readonly TurnNote[]
  nameOf: (id: string) => string
  onRecharge: (useKey: string) => void
  onDismissRecharge: (useKey: string) => void
  /** Lair actions on initiative 20, shown at the top of the round. */
  lair?: readonly LairPrompt[]
  onLairAction?: (combatant: string, key: string) => void
}) {
  const focus = useDensity() === 'focus'
  if (reminders.length === 0 && notes.length === 0 && lair.length === 0) return null

  return (
    <section
      aria-label={`Start of ${name}’s turn`}
      className={cn(
        'grid gap-2 rounded-2xl border-2 border-sky-500/40 bg-sky-500/5',
        focus ? 'p-4' : 'p-3',
      )}
    >
      <h2 className={cn('font-semibold', focus ? 'text-lg' : 'text-sm')}>
        {name}’s turn: keep in mind
      </h2>
      <ul className="grid gap-1.5">
        {lair.map((prompt) => (
          <Item
            key={`lair-${prompt.combatant}`}
            icon={<Castle aria-hidden className="text-amber-600" />}
            strong
          >
            <span>
              Initiative 20: <strong>{prompt.name}</strong>{' '}
              {prompt.used ? `used ${prompt.used} this round.` : 'takes a lair action.'}
            </span>
            {prompt.used ? null : (
              <span className="flex flex-wrap gap-2">
                {prompt.options.map((option) => (
                  <ActionButton
                    key={option.key}
                    disabled={option.blocked}
                    title={option.blocked ? 'Used last round' : undefined}
                    onClick={() => onLairAction?.(prompt.combatant, option.key)}
                  >
                    {option.name}
                  </ActionButton>
                ))}
              </span>
            )}
          </Item>
        ))}
        {notes.map((note, index) => (
          // oxlint-disable-next-line react/no-array-index-key -- notes are positional
          <Item key={`note-${index}`} icon={noteIcon(note)}>
            {noteText(note, nameOf)}
          </Item>
        ))}
        {reminders.map((reminder) => {
          switch (reminder.kind) {
            case 'dying':
              return (
                <Item key="dying" icon={<HeartCrack aria-hidden className="text-red-600" />} strong>
                  Death save: roll d20. 10 or higher succeeds; record it below.
                </Item>
              )
            case 'recharge':
              return (
                <Item key={reminder.useKey} icon={<Dices aria-hidden />}>
                  <span>
                    <strong>{reminder.name}</strong> is spent. {reminder.recharge}: roll d6 now.
                  </span>
                  <span className="flex gap-2">
                    <ActionButton tone="heal" onClick={() => onRecharge(reminder.useKey)}>
                      <Check aria-hidden /> Recharged
                    </ActionButton>
                    <ActionButton onClick={() => onDismissRecharge(reminder.useKey)}>
                      <X aria-hidden /> Not yet
                    </ActionButton>
                  </span>
                </Item>
              )
            case 'condition': {
              const Icon = CONDITION_ICONS[reminder.held.condition]
              return (
                <Item key={reminder.held.id} icon={<Icon aria-hidden className="text-amber-600" />}>
                  <span>
                    <strong className="capitalize">{reminder.held.condition}</strong>:{' '}
                    {CONDITIONS[reminder.held.condition]}{' '}
                    <span className="text-muted-foreground">
                      ({describeDuration(reminder.held.duration, nameOf)})
                    </span>
                  </span>
                </Item>
              )
            }
            case 'concentrating':
              return (
                <Item key="concentrating" icon={<Brain aria-hidden className="text-violet-600" />}>
                  Concentrating{reminder.on ? ` on ${reminder.on}` : ''}.
                </Item>
              )
          }
        })}
      </ul>
    </section>
  )
}

function noteIcon(note: TurnNote) {
  if (note.kind === 'legendary-refilled') return <Crown aria-hidden className="text-amber-600" />
  if (note.kind === 'save-to-end') return <ShieldQuestion aria-hidden className="text-sky-600" />
  return <Hourglass aria-hidden className="text-muted-foreground" />
}

function noteText(note: TurnNote, nameOf: (id: string) => string): ReactNode {
  switch (note.kind) {
    case 'expired':
      return (
        <span>
          {nameOf(note.combatant)} is no longer <strong>{note.condition}</strong>.
        </span>
      )
    case 'save-to-end':
      return (
        <span>
          <strong>{nameOf(note.combatant)}</strong> rolls a DC {note.dc}{' '}
          {ABILITY_NAME[note.ability]} save to end <strong>{note.condition}</strong>. Remove it on a
          success.
        </span>
      )
    case 'legendary-refilled':
      return (
        <span>
          {nameOf(note.combatant)}’s legendary actions are back to {note.uses}.
        </span>
      )
  }
}

function Item({
  icon,
  strong,
  children,
}: {
  icon: ReactNode
  strong?: boolean
  children: ReactNode
}) {
  const focus = useDensity() === 'focus'
  return (
    <li
      className={cn(
        'flex flex-wrap items-center gap-x-3 gap-y-2',
        focus ? 'text-base [&>svg]:size-6' : 'text-sm [&>svg]:size-4',
        strong && 'font-semibold',
      )}
    >
      {icon}
      <span className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-2">
        {children}
      </span>
    </li>
  )
}

/** Shown as soon as a concentrating combatant takes damage. */
export function ConcentrationPrompt({
  name,
  on,
  dc,
  onKept,
  onLost,
}: {
  name: string
  on: string
  dc: number
  onKept: () => void
  onLost: () => void
}) {
  const focus = useDensity() === 'focus'
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-wrap items-center gap-3 rounded-2xl border-2 border-violet-500/60 bg-violet-500/10',
        focus ? 'p-4 text-lg' : 'p-3',
      )}
    >
      <Brain aria-hidden className={cn('text-violet-600', focus ? 'size-7' : 'size-5')} />
      <span className="flex-1">
        <strong>{name}</strong> took damage while concentrating{on ? ` on ${on}` : ''}:{' '}
        <strong>DC {dc} Constitution save</strong>.
      </span>
      <ActionButton tone="heal" onClick={onKept}>
        <Check aria-hidden /> Kept
      </ActionButton>
      <ActionButton tone="danger" onClick={onLost}>
        <X aria-hidden /> Lost
      </ActionButton>
    </div>
  )
}
