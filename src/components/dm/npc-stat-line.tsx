import { RuleTerm } from '#/components/rule-term'
import { refs } from '#/data/generated/refs'
import type { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { creatures, resolveStatBlock } from '#/lib/dm-campaign'
import { ruleOf, ruleRef } from '#/lib/rules'
import { deriveStatBlock } from '#/lib/stat-block'

type Npc = (typeof SOURCE_REGISTRIES.npc)[keyof typeof SOURCE_REGISTRIES.npc]

/** One line with an NPC's size, type, challenge rating, armour class and hit points. */
export function NpcStatLine({ npc }: { npc: Npc }) {
  const stats = resolveStatBlock(npc.stats)
  if (!stats) return null
  const block = deriveStatBlock(stats)
  const shared = 'ref' in npc.stats ? creatures[npc.stats.key] : undefined
  return (
    <p className="text-sm">
      {shared ? `${shared.name} · ` : ''}
      <RuleTerm rule={ruleRef(stats.size)} />{' '}
      <RuleTerm rule={ruleRef(stats.type)}>
        {ruleOf(ruleRef(stats.type)).name.toLowerCase()}
      </RuleTerm>{' '}
      · <RuleTerm rule={refs.rules.challenge_rating} /> {stats.cr} ·{' '}
      <RuleTerm rule={refs.rules.armor_class} /> {stats.ac} · {block.hitPoints}{' '}
      <RuleTerm rule={refs.rules.hit_points} />
    </p>
  )
}
