import { Link } from '@tanstack/react-router'
import { EyeOff } from 'lucide-react'

import { Avatar } from '#/components/ui/avatar'
import { DEFAULT_AVATAR } from '#/definitions/media'
import type { CreatureGlance, GlanceGroup } from '#/lib/creature-glance'

const GROUP_LABEL: Record<GlanceGroup, string> = {
  turn: 'On its turn',
  reaction: 'Reaction',
  limited: 'Limited',
  trait: 'Trait',
}

/**
 * A DM's hover card for a character or creature: how dangerous it is and what it does, in the
 * time it takes to read a line or two.
 */
export function DmCreatureGlance({
  name,
  avatar,
  glance,
  met,
  wants,
  npcSlug,
}: {
  name: string
  avatar: string | undefined
  glance: CreatureGlance
  /** Whether the party has met it. */
  met: boolean
  /** The first sentence of what it wants, for NPCs. */
  wants?: string
  /** An NPC's DM page to open. */
  npcSlug?: string
}) {
  const more = [
    glance.overflow.rows > 0 ? `+${glance.overflow.rows} more` : '',
    glance.overflow.legendary > 0 ? `${glance.overflow.legendary} legendary actions` : '',
    glance.overflow.lair > 0 ? `${glance.overflow.lair} lair actions` : '',
  ].filter(Boolean)

  return (
    <span className="grid gap-2 text-sm">
      <span className="flex items-start gap-2">
        <Avatar
          src={avatar ?? DEFAULT_AVATAR}
          sizes="32px"
          maxWidth={64}
          className="mt-0.5 size-8 shrink-0"
        />
        <span className="grid min-w-0">
          <span className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-base font-semibold">{name}</span>
            {glance.cr && (
              <span className="text-muted-foreground font-semibold tabular-nums">
                CR {glance.cr} · {glance.xp} XP
              </span>
            )}
          </span>
          <span className="text-muted-foreground flex flex-wrap items-center gap-x-1.5 text-xs">
            {glance.kind}
            {glance.shared ? <span>· uses {glance.shared} block</span> : null}
            {met ? null : (
              <span className="inline-flex items-center gap-1">
                · <EyeOff aria-hidden className="size-3" /> not met by players
              </span>
            )}
          </span>
        </span>
      </span>

      <span className="bg-muted/60 flex flex-wrap gap-x-3 rounded-md px-2 py-1 text-xs font-medium tabular-nums">
        <span>AC {glance.ac}</span>
        <span>HP {glance.hp}</span>
        <span>{glance.speed}</span>
        <span>Init {glance.initiative}</span>
      </span>

      {glance.rows.length > 0 ? (
        <span className="grid gap-1">
          {glance.rows.map((row) => (
            <span key={`${row.group}:${row.name}`} className="text-xs leading-snug">
              <span className="font-semibold">{row.name}</span>
              {row.group === 'turn' ? null : (
                <span className="text-muted-foreground"> ({GROUP_LABEL[row.group]})</span>
              )}
              {row.summary ? <span className="text-muted-foreground">: {row.summary}</span> : null}
            </span>
          ))}
          {more.length > 0 ? (
            <span className="text-muted-foreground text-xs">
              {more.join(' · ')}
              {npcSlug ? ' on the DM page' : ''}
            </span>
          ) : null}
        </span>
      ) : null}

      {glance.defences.length > 0 ? (
        <span className="text-xs">
          <span className="font-semibold">Defences: </span>
          {glance.defences.join('; ')}
        </span>
      ) : null}

      {wants ? (
        <span className="text-xs">
          <span className="font-semibold">Wants: </span>
          {wants}
        </span>
      ) : null}

      {npcSlug ? (
        <Link
          to="/dm/npcs/$slug"
          params={{ slug: npcSlug }}
          className="text-primary w-fit text-xs font-semibold underline-offset-4 hover:underline"
        >
          Open DM page →
        </Link>
      ) : null}
    </span>
  )
}
