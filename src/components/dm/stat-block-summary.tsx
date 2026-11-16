import { RuleTerm } from '#/components/rule-term'
import { refs } from '#/data/generated/refs'
import type { OwnOrSharedStatBlock } from '#/definitions/stat-block'
import { creatures, resolveStatBlock } from '#/lib/dm-campaign'
import { ruleOf, ruleRef } from '#/lib/rules'
import { deriveStatBlock } from '#/lib/stat-block'

/** One line naming a creature's shared block, size, type, challenge, armor and hit points. */
export function StatBlockSummary({ stats }: { stats: OwnOrSharedStatBlock }) {
  const resolved = resolveStatBlock(stats)
  if (!resolved) return null
  const block = deriveStatBlock(resolved)
  const shared = 'ref' in stats ? creatures[stats.key] : undefined

  return (
    <p className="text-sm">
      {shared ? `${shared.name} · ` : ''}
      <RuleTerm rule={ruleRef(resolved.size)} />{' '}
      <RuleTerm rule={ruleRef(resolved.type)}>
        {ruleOf(ruleRef(resolved.type)).name.toLowerCase()}
      </RuleTerm>{' '}
      · <RuleTerm rule={refs.rules.challenge_rating} /> {resolved.cr} ·{' '}
      <RuleTerm rule={refs.rules.armor_class} /> {resolved.ac} · {block.hitPoints}{' '}
      <RuleTerm rule={refs.rules.hit_points} />
    </p>
  )
}
