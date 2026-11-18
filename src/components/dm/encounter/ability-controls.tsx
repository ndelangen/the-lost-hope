import { Play, RotateCcw, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'

import type { Ability } from '#/definitions/stat-block'
import { ABILITY_ICONS } from '#/lib/ability-icons'
import type { DerivedStatBlock } from '#/lib/dm-ability-text'
import type { UseCount } from '#/lib/encounter'
import { plainStatParts } from '#/lib/stat-block'
import { cn } from '#/lib/utils'

import { AbilitySteps } from './ability-steps'
import { AbilityTextView, abilityPlainText, type ReferencedAbility } from './ability-text'
import { useDensity } from './density'
import { EditableNumber } from './hp-control'
import { ActionButton, IconButton } from './icon-button'
import { StatParts } from './stat-parts'

const INTENT_CLASS = {
  damage: 'text-red-600 dark:text-red-400 border-red-500/40 bg-red-500/5 hover:bg-red-500/15',
  healing:
    'text-emerald-700 dark:text-emerald-400 border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/15',
  support: 'text-sky-700 dark:text-sky-400 border-sky-500/40 bg-sky-500/5 hover:bg-sky-500/15',
} as const

/** One ability as an icon that opens its rules. Spent abilities dim and get a diagonal slash. */
export function AbilityButton({
  ability,
  context,
  count,
  showCount = true,
  expanded,
  onToggle,
  block,
}: {
  ability: Ability
  context: string
  count?: UseCount
  showCount?: boolean
  expanded: boolean
  onToggle: () => void
  /** The creature's derived stat block, which resolves references in the text. */
  block: DerivedStatBlock
}) {
  const density = useDensity()
  const Icon = ABILITY_ICONS[ability.icon] ?? Sparkles
  const spent = count?.uses === 0
  return (
    <IconButton
      label={ability.name}
      aria-expanded={expanded}
      onClick={onToggle}
      tip={
        <>
          <strong>
            {ability.name} · {context}
          </strong>
          {block.abilities[ability.key]?.summary ? (
            <span className="tabular-nums">
              {plainStatParts(block.abilities[ability.key]!.summary!)}
            </span>
          ) : null}
          <span>{abilityPlainText(ability.text, block)}</span>
          {ability.recharge ? <span>{ability.recharge}</span> : null}
          {count ? <span>Uses left: {count.uses}</span> : null}
        </>
      }
      className={cn(
        INTENT_CLASS[ability.intent],
        expanded && 'ring-ring/60 ring-4',
        spent &&
          'opacity-40 after:absolute after:inset-1.5 after:bg-[linear-gradient(to_top_right,transparent_calc(50%-1.5px),currentColor,transparent_calc(50%+1.5px))]',
      )}
    >
      <Icon aria-hidden />
      {count && showCount ? (
        <span
          aria-hidden
          className={cn(
            'bg-foreground text-background ring-card absolute rounded-full text-center font-bold ring-2',
            density === 'focus'
              ? '-top-2 -right-2 min-w-6 px-1.5 text-xs leading-6'
              : '-top-1.5 -right-1.5 min-w-[18px] px-1 text-[11px] leading-[18px]',
          )}
        >
          {count.uses}
        </span>
      ) : null}
    </IconButton>
  )
}

/** A limited ability's uses left in a fight, and the controls that spend, recharge, or correct them. */
export type AbilityUses = {
  count: UseCount
  onUse: () => void
  onRecharge: () => void
  onSetUses: (value: number) => void
  onSetMaxUses: (value: number) => void
}

/** The rules text of an ability, with use and manual-recharge controls when a fight tracks its uses. */
export function AbilityDetail({
  title,
  ability,
  note,
  uses,
  block,
  describe,
  className,
}: {
  title: ReactNode
  ability: Ability
  note?: string
  uses?: AbilityUses
  block: DerivedStatBlock
  /** Full text and Use for abilities this text refers to. */
  describe?: (key: string) => ReferencedAbility | undefined
  className?: string
}) {
  const focus = useDensity() === 'focus'
  const summary = block.abilities[ability.key]?.summary
  const steps = block.steps?.[ability.key]
  return (
    <div
      className={cn(
        'border-border bg-muted/40 grid rounded-xl border',
        focus ? 'gap-3 p-4' : 'gap-2 p-3',
        className,
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className={cn('font-semibold', focus && 'text-lg')}>{title}</h3>
        {summary ? (
          <p className="text-muted-foreground text-sm">
            <StatParts parts={summary} />
          </p>
        ) : null}
      </div>
      <div className={cn(focus ? 'text-base' : 'text-sm')}>
        {steps ? (
          <AbilitySteps steps={steps} block={block} describe={describe} />
        ) : (
          <p className="leading-relaxed">
            <AbilityTextView text={ability.text} block={block} describe={describe} />
          </p>
        )}
      </div>
      {/* The steps already say when it comes back. */}
      {note || (ability.recharge && !steps) ? (
        <p className="text-muted-foreground text-sm">
          {[note, steps ? undefined : ability.recharge].filter(Boolean).join(' · ')}
        </p>
      ) : null}
      {uses ? (
        <div className="flex flex-wrap items-center gap-3">
          <div
            className={cn(
              'border-border bg-card flex items-center gap-1 px-2',
              focus ? 'h-12 rounded-xl border-2' : 'h-9 rounded-lg border text-sm',
            )}
          >
            <EditableNumber
              label={`Uses left of ${ability.name}`}
              value={uses.count.uses}
              min={0}
              onCommit={uses.onSetUses}
              className={cn(
                'font-bold tabular-nums',
                focus ? 'h-9 w-10 text-xl' : 'h-7 w-8 text-base',
              )}
            />
            <span className="text-muted-foreground">/</span>
            <EditableNumber
              label={`Maximum uses of ${ability.name}`}
              value={uses.count.maxUses}
              min={0}
              onCommit={uses.onSetMaxUses}
              className={cn(
                'text-muted-foreground tabular-nums',
                focus ? 'h-9 w-9 text-base' : 'h-7 w-7 text-sm',
              )}
            />
            <span className="text-muted-foreground text-sm">uses left</span>
          </div>
          <ActionButton tone="primary" disabled={uses.count.uses === 0} onClick={uses.onUse}>
            <Play aria-hidden /> Use
          </ActionButton>
          <ActionButton disabled={uses.count.uses >= uses.count.maxUses} onClick={uses.onRecharge}>
            <RotateCcw aria-hidden /> Recharge
          </ActionButton>
        </div>
      ) : null}
    </div>
  )
}
