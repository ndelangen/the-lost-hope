/**
 * Prints the stat blocks the Ride the Lightning fight sim reads, derived from the campaign data,
 * as JSON keyed by record slug. `bun run sims:rtl` runs it; see scripts/sims/ride_the_lightning.py.
 */
import { refs } from '#/data/generated/refs'
import type { EntityRef } from '#/definitions/kind'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { resolveStatBlock } from '#/lib/dm-campaign'
import {
  type AnyStatBlock,
  abilitySummary,
  allAbilities,
  deriveAttack,
  deriveSaveDamage,
  deriveStatBlock,
  plainStatParts,
} from '#/lib/stat-block'

const COMBATANTS: (EntityRef<'npc'> | EntityRef<'pc'>)[] = [
  refs.npcs.korrag_stonevow,
  refs.npcs.durgan_ashfang,
  refs.npcs.hand_breaker,
  refs.npcs.hand_spellbinder,
  refs.npcs.ilsa_corrow,
  refs.npcs.silas_wren,
  refs.npcs.dust_lost_sailor,
  refs.npcs.cloaked_snatcher,
  refs.npcs.tempest_soldier,
  refs.pcs.devan,
  refs.pcs.auren,
  refs.pcs.cassian_veyl,
  refs.pcs.swift_starblade,
]

function recordOf(ref: EntityRef<'npc'> | EntityRef<'pc'>): { name: string; stats: AnyStatBlock } {
  if (ref.ref === 'npc') {
    const npc = SOURCE_REGISTRIES.npc[ref.key as keyof typeof SOURCE_REGISTRIES.npc]
    const stats = resolveStatBlock(npc?.stats)
    if (npc && stats) return { name: npc.name, stats }
  } else {
    const pc = SOURCE_REGISTRIES.pc[ref.key as keyof typeof SOURCE_REGISTRIES.pc]
    if (pc?.stats && pc.level) return { name: pc.name, stats: { ...pc.stats, level: pc.level } }
  }
  throw new Error(`No stat block for ${ref.ref}:${ref.key}`)
}

const out: Record<string, unknown> = {}
for (const ref of COMBATANTS) {
  const { name, stats } = recordOf(ref)
  const block = deriveStatBlock(stats)
  out[ref.key.replaceAll('_', '-')] = {
    name,
    ac: stats.ac,
    maxHp: block.maxHp,
    saves: block.saves,
    init: block.initiative,
    saveDc: block.saveDc,
    abilities: allAbilities(stats).map((ability) => {
      const summary = abilitySummary(ability, stats)
      return {
        key: ability.key,
        name: ability.name,
        attack: ability.attack
          ? { kind: ability.attack.kind, ...deriveAttack(ability.attack, stats) }
          : undefined,
        save: ability.save
          ? {
              ability: ability.save.ability,
              dc: block.saveDc[ability.save.dc],
              damage: deriveSaveDamage(ability.save, stats),
            }
          : undefined,
        summary: summary ? plainStatParts(summary) : undefined,
      }
    }),
  }
}
console.log(JSON.stringify(out, null, 1))
