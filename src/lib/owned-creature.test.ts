import { describe, expect, it } from 'vitest'

import { PrintedStatBlock } from '#/definitions/stat-block'

import { printingsByMonster } from './library-monsters'
import { loadOwnedCreature, ownedCreaturePath, ownedCreaturePaths } from './load-owned-creature'
import { typicalOwner } from './owned-creature'
import { deriveStatBlock, withOptions } from './stat-block'

const scaled = [...printingsByMonster].flatMap(([monster, printings]) =>
  [...printings]
    .filter(([, printing]) => printing.stats?.scaling)
    .map(([publication, printing]) => ({ monster, publication, stats: printing.stats! })),
)

async function at(publication: string, monster: string, level: number, picked: string[] = []) {
  const { stats } = scaled.find(
    (one) => one.monster === monster && one.publication === publication,
  )!
  const creature = (await loadOwnedCreature(publication, monster))!
  return withOptions(creature.stats(stats, typicalOwner(stats.scaling!, level), picked), picked)
}

describe('creatures that follow their owner', () => {
  it('each have their own function, and every function belongs to one', () => {
    const paths = scaled.map(({ publication, monster }) => ownedCreaturePath(publication, monster))
    expect(paths.toSorted()).toEqual(ownedCreaturePaths.toSorted())
  })

  it('make a whole stat block at every level and in every form', async () => {
    for (const { monster, publication, stats } of scaled) {
      const creature = (await loadOwnedCreature(publication, monster))!
      const forms = stats.options?.filter((option) => option.form).map(({ key }) => [key]) ?? []
      for (let level = stats.scaling!.min; level <= stats.scaling!.max; level++)
        for (const picked of forms.length ? forms : [[]]) {
          const label = `${publication}/${monster} at ${level} ${picked.join()}`
          const worked = creature.stats(stats, typicalOwner(stats.scaling!, level), picked)
          expect.soft(PrintedStatBlock.safeParse(worked).error?.message, label).toBeUndefined()
          expect.soft(deriveStatBlock(withOptions(worked, picked)).maxHp, label).toBeGreaterThan(0)
        }
    }
  })

  it('takes the numbers of the form picked', async () => {
    const fiend = (form: string) => at('player_s_handbook_2024', 'fiendish_spirit', 6, [form])
    expect(deriveStatBlock(await fiend('yugoloth')).maxHp).toBe(60)
    expect(deriveStatBlock(await fiend('devil')).maxHp).toBe(40)
    const familiar = (form: string[]) => at('arcana_unleashed', 'battle_familiar', 4, form)
    expect((await familiar(['brute'])).ac).toBe(17)
    expect((await familiar([])).ac).toBe(15)
  })

  it('shows a summon’s hit points without hit dice, and a companion’s with them', async () => {
    expect(
      deriveStatBlock(await at('player_s_handbook_2024', 'fiendish_spirit', 7)).hitPoints,
    ).toBe('65')
    const defender = await at('tasha_s_cauldron_of_everything', 'steel_defender', 9)
    expect(defender.hitDice).toBe('9d8')
  })
})
