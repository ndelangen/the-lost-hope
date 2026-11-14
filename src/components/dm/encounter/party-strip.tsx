import { Eye, Heart, Shield, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'

import { Avatar } from '#/components/ui/avatar'
import { HoverPreview } from '#/components/ui/hover-preview'
import { cn } from '#/lib/utils'

import type { RosterRow } from './encounter-roster'

/**
 * The party at a glance in combat focus: AC to compare against attack rolls, passive Perception
 * for stealthy enemies, HP, and spell save DC. Gaps show where the PC record still needs a number.
 */
export function PartyStrip({
  party,
  active,
  onInspect,
}: {
  party: readonly RosterRow[]
  active: string | undefined
  onInspect: (id: string) => void
}) {
  if (party.length === 0) return null
  const missing = party.some(
    (pc) => pc.party?.ac === undefined || pc.party?.passivePerception === undefined,
  )

  return (
    <section
      aria-label="Party"
      className="border-border bg-card grid gap-2 rounded-2xl border-2 px-3 py-2.5"
    >
      <ul className="flex gap-2 overflow-x-auto pb-0.5">
        {party.map((pc) => (
          <li key={pc.id} className="shrink-0">
            <button
              type="button"
              onClick={() => onInspect(pc.id)}
              className={cn(
                'border-border hover:bg-muted flex h-12 items-center gap-2.5 rounded-xl border px-2.5 text-left',
                pc.id === active && 'border-amber-500 bg-amber-500/10',
                pc.out && 'opacity-55',
              )}
            >
              {pc.avatar ? (
                <Avatar src={pc.avatar} sizes="32px" maxWidth={64} className="size-8" />
              ) : null}
              <span className="text-base font-semibold">{pc.name}</span>
              <Fact icon={<Shield aria-hidden />} label="Armor class" value={pc.live.ac} />
              <Fact
                icon={<Eye aria-hidden />}
                label="Passive Perception"
                value={pc.party?.passivePerception}
              />
              <Fact
                icon={<Heart aria-hidden />}
                label="Hit points"
                value={
                  pc.live.hp === undefined && pc.live.maxHp === undefined
                    ? undefined
                    : `${pc.live.hp ?? '—'}/${pc.live.maxHp ?? '—'}`
                }
              />
              {pc.party?.spellSaveDc !== undefined ? (
                <Fact
                  icon={<Sparkles aria-hidden />}
                  label="Spell save DC"
                  value={`DC ${pc.party.spellSaveDc}`}
                />
              ) : null}
            </button>
          </li>
        ))}
      </ul>
      {missing ? (
        <p className="text-muted-foreground text-xs">
          — means the PC record doesn’t have that number yet: ask the player and add it to the PC’s{' '}
          <code>combat</code> block.
        </p>
      ) : null}
    </section>
  )
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: number | string | undefined
}) {
  return (
    <HoverPreview content={label}>
      <span
        className={cn(
          'flex items-center gap-1 text-base font-bold tabular-nums [&_svg]:size-4',
          value === undefined && 'text-muted-foreground font-normal',
        )}
      >
        <span className="text-muted-foreground">{icon}</span>
        <span className="sr-only">{label}:</span>
        {value ?? '—'}
      </span>
    </HoverPreview>
  )
}
