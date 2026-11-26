import { spellBooks } from '#/data/generated/spell-names'
import type { EntityRef } from '#/definitions/kind'
import type { Spell } from '#/definitions/library'

const spellModules = import.meta.glob<{ default: Readonly<Record<string, Spell>> }>(
  '/src/data/library/spells/*.ts',
)

/**
 * Load one spell's full text. Only the spell's own book loads, not every spell the library holds,
 * so pages that name spells don't carry the spell list.
 */
export async function loadSpell(ref: EntityRef<'spell'>): Promise<Spell | undefined> {
  const book = spellBooks[ref.key]
  const load = book ? spellModules[`/src/data/library/spells/${book}.ts`] : undefined
  if (!load) return undefined
  const { default: spells } = await load()
  return Object.hasOwn(spells, ref.key) ? spells[ref.key] : undefined
}
