import { HeartCrack, HeartPulse, Skull } from 'lucide-react'
import type { ReactNode } from 'react'

import { ActionButton } from '#/components/dm/encounter/icon-button'
import { RuleTerm } from '#/components/rule-term'
import { refs } from '#/data/generated/refs'
import type { DeathSaves } from '#/lib/encounter-combat'
import { cn } from '#/lib/utils'

/** What the d20 showed on a death saving throw. */
export type DeathRoll = 'success' | 'failure' | 'one' | 'twenty'

/**
 * What a player sees at 0 HP: death saving throws named by what the die shows, then stable or
 * dead. Nothing shows while the character is up.
 */
export function DyingBanner({
  dying,
  stable,
  dead,
  onRoll,
  onUndoDeath,
}: {
  dying?: DeathSaves
  stable?: boolean
  dead?: boolean
  onRoll: (roll: DeathRoll) => void
  onUndoDeath: () => void
}) {
  if (dead)
    return (
      <Banner tone="border-border bg-muted/60" icon={<Skull aria-hidden />} title="You died">
        <div>
          <ActionButton onClick={onUndoDeath}>That was a mistake</ActionButton>
        </div>
      </Banner>
    )
  if (stable)
    return (
      <Banner
        tone="border-emerald-500/50 bg-emerald-500/10"
        icon={<HeartPulse aria-hidden />}
        title={
          <>
            You’re <RuleTerm rule={refs.rules.stable} />
          </>
        }
      >
        <p className="text-sm">
          You’re <RuleTerm rule={refs.rules.unconscious} /> at 0 HP, with no more rolls to make. Any
          healing wakes you.
        </p>
      </Banner>
    )
  if (!dying) return null
  return (
    <Banner
      tone="border-red-500/50 bg-red-500/10"
      icon={<HeartCrack aria-hidden />}
      title="You’re dying"
    >
      <p className="text-sm">
        At the start of each of your turns, roll a d20: a{' '}
        <RuleTerm rule={refs.rules.death_saving_throw} />. What did it show?
      </p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
        <Tally
          label="Successes"
          count={dying.successes}
          filled="border-emerald-600 bg-emerald-600"
        />
        <Tally label="Failures" count={dying.failures} filled="border-red-600 bg-red-600" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <ActionButton tone="heal" onClick={() => onRoll('success')}>
          10 or higher
        </ActionButton>
        <ActionButton tone="danger" onClick={() => onRoll('failure')}>
          9 or lower
        </ActionButton>
        <ActionButton tone="heal" onClick={() => onRoll('twenty')}>
          A 20: up with 1 HP
        </ActionButton>
        <ActionButton tone="danger" onClick={() => onRoll('one')}>
          A 1: two failures
        </ActionButton>
      </div>
      <p className="text-muted-foreground text-xs">
        Three successes and you’re stable; three failures and you die. Damage counts as a failure.
        Any healing gets you back up.
      </p>
    </Banner>
  )
}

function Tally({ label, count, filled }: { label: string; count: number; filled: string }) {
  return (
    <span
      className="flex items-center gap-1.5 text-sm font-medium"
      aria-label={`${count} ${label}`}
    >
      {label}
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          aria-hidden
          className={cn('size-5 rounded-full border-2', index < count ? filled : 'border-border')}
        />
      ))}
    </span>
  )
}

function Banner({
  tone,
  icon,
  title,
  children,
}: {
  tone: string
  icon: ReactNode
  title: ReactNode
  children: ReactNode
}) {
  return (
    <output className={cn('grid gap-3 rounded-2xl border-2 p-4', tone)}>
      <p className="flex items-center gap-2 text-lg font-bold [&_svg]:size-6">
        {icon} {title}
      </p>
      {children}
    </output>
  )
}
