import { Play } from 'lucide-react'
import { useId, useRef, useState, type ReactNode } from 'react'

import { RuleTerm } from '#/components/rule-term'
import { SpellTerm } from '#/components/spell-term'
import { HoverPreview } from '#/components/ui/hover-preview'
import {
  abilityTextSegments,
  plainAbilityText,
  type AbilityTextSegment,
  type AbilityTextToken,
  type DerivedStatBlock,
} from '#/lib/dm-ability-text'
import { abilityKey, type UseCount } from '#/lib/encounter'
import type { AnyStatBlock } from '#/lib/stat-block'
import { allAbilities } from '#/lib/stat-block'
import { cn } from '#/lib/utils'

import { AbilitySteps } from './ability-steps'
import { useDensity } from './density'
import { ActionButton } from './icon-button'
import { StatParts } from './stat-parts'

type AbilityText = readonly AbilityTextToken[]

/** What a referenced ability's popover shows: its full text and, when limited, a Use button. */
export type ReferencedAbility = {
  text: ReactNode
  count?: UseCount
  onUse?: () => void
}

/** The resolved text as one string, for tooltips. */
export function abilityPlainText(text: AbilityText, block: DerivedStatBlock) {
  return plainAbilityText(abilityTextSegments(text, block))
}

/**
 * Ability rules text with its references answered in place: speeds and numbers as chips, other
 * abilities as chips with their key numbers and a popover, rules terms with a short reminder.
 */
export function AbilityTextView({
  text,
  block,
  describe,
}: {
  text: AbilityText
  block: DerivedStatBlock
  describe?: (key: string) => ReferencedAbility | undefined
}) {
  return (
    <>
      {abilityTextSegments(text, block).map((segment, index) => (
        // oxlint-disable-next-line react/no-array-index-key -- segments are positional
        <Segment key={index} segment={segment} describe={describe} />
      ))}
    </>
  )
}

function Segment({
  segment,
  describe,
}: {
  segment: AbilityTextSegment
  describe?: (key: string) => ReferencedAbility | undefined
}) {
  const focus = useDensity() === 'focus'
  const chip = cn(
    'bg-muted text-foreground inline-flex items-baseline gap-1 rounded-md px-1.5 font-semibold tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
    focus ? 'py-0.5 text-[1.05em]' : 'text-[0.95em]',
  )

  switch (segment.kind) {
    case 'text':
      return <>{segment.text}</>
    case 'speed':
    case 'number':
      return (
        <HoverPreview content={segment.note}>
          <button type="button" className={cn(chip, 'cursor-help')}>
            {segment.value}
          </button>
        </HoverPreview>
      )
    case 'rule':
      return <RuleTerm rule={segment.rule}>{segment.label}</RuleTerm>
    case 'spell':
      return <SpellTerm spell={segment.spell} />
    case 'ability':
      return <AbilityChip segment={segment} chip={chip} referenced={describe?.(segment.key)} />
  }
}

/** A referenced ability: hover or tap shows its full text, with Use when it is limited. */
function AbilityChip({
  segment,
  chip,
  referenced,
}: {
  segment: Extract<AbilityTextSegment, { kind: 'ability' }>
  chip: string
  referenced: ReferencedAbility | undefined
}) {
  const id = useId()
  // Hovering shows the popover through CSS; a click or tap pins it open for its Use button.
  const [pinned, setPinned] = useState(false)
  const root = useRef<HTMLSpanElement>(null)

  return (
    <span ref={root} className="group/ref relative inline-block">
      <button
        type="button"
        aria-expanded={pinned}
        aria-controls={id}
        onClick={() => setPinned((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setPinned(false)
        }}
        onBlur={(event) => {
          if (!root.current?.contains(event.relatedTarget)) setPinned(false)
        }}
        className={cn(chip, 'cursor-pointer')}
      >
        {segment.name}
        {segment.summary ? (
          <span className="text-muted-foreground font-medium">
            <StatParts parts={segment.summary} interactive={false} />
          </span>
        ) : null}
      </button>
      {/* The gap is bridged by padding so the pointer can move into the popover. */}
      <span
        id={id}
        className={cn(
          'absolute top-full left-0 z-50 w-72 pt-1',
          pinned ? 'block' : 'hidden group-hover/ref:block',
        )}
      >
        <span className="border-border bg-card text-foreground grid gap-2 rounded-xl border p-3 text-left text-sm font-normal shadow-xl">
          <strong className="text-base">{segment.name}</strong>
          {referenced ? <span className="grid leading-relaxed">{referenced.text}</span> : null}
          {referenced?.count && referenced.onUse ? (
            <span className="flex items-center gap-2">
              <span className="text-muted-foreground tabular-nums">
                {referenced.count.uses} / {referenced.count.maxUses} uses left
              </span>
              <ActionButton
                tone="primary"
                disabled={referenced.count.uses === 0}
                onClick={referenced.onUse}
                className="ml-auto"
              >
                <Play aria-hidden /> Use
              </ActionButton>
            </span>
          ) : null}
        </span>
      </span>
    </span>
  )
}

/**
 * Look up the abilities a text refers to: their full text and, for limited ones the DM can spend
 * here, their remaining uses and a Use action.
 */
export function describeReferences(
  stats: AnyStatBlock,
  block: DerivedStatBlock,
  counts: Readonly<Record<string, UseCount | undefined>>,
  use: (key: string, count: UseCount) => void,
) {
  return (key: string): ReferencedAbility | undefined => {
    const ability = allAbilities(stats).find((candidate) => candidate.key === key)
    if (!ability) return undefined
    const useKey =
      'timing' in ability ? abilityKey(String(ability.timing), ability.name) : undefined
    const count = useKey ? counts[useKey] : undefined
    return {
      text: block.steps?.[key] ? (
        <AbilitySteps steps={block.steps[key]} block={block} />
      ) : (
        <AbilityTextView text={ability.text} block={block} />
      ),
      count,
      onUse: count && useKey ? () => use(useKey, count) : undefined,
    }
  }
}
