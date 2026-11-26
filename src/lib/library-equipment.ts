import type { EntityRef } from '#/definitions/kind'
import type { Equipment } from '#/definitions/library'

const books = import.meta.glob<{ default: Readonly<Record<string, Equipment>> }>([
  '/src/data/library/equipment/*.ts',
  '!/src/data/library/equipment/_index.ts',
])

/** Load one typed piece of equipment. Only its publication's module loads. */
export async function loadEquipment(
  item: EntityRef<'equipment'>,
  publication: EntityRef<'publication'>,
): Promise<Equipment | undefined> {
  const load = books[`/src/data/library/equipment/${publication.key.replaceAll('_', '-')}.ts`]
  if (!load) return undefined
  const { default: items } = await load()
  return Object.hasOwn(items, item.key) ? items[item.key] : undefined
}

/** Every piece of equipment by key, for tools that browse it all (such as a shop's stock). */
export async function loadAllEquipment(): Promise<ReadonlyMap<string, Equipment>> {
  const modules = await Promise.all(Object.values(books).map((load) => load()))
  return new Map(modules.flatMap(({ default: items }) => Object.entries(items)))
}
