import type { EntityRef } from '#/definitions/kind'
import type { MagicItem } from '#/definitions/library'

const books = import.meta.glob<{ default: Readonly<Record<string, MagicItem>> }>([
  '/src/data/library/magic-items/*.ts',
  '!/src/data/library/magic-items/_index.ts',
])

/** Load one typed magic item. Only its publication's module loads. */
export async function loadMagicItem(
  item: EntityRef<'magicItem'>,
  publication: EntityRef<'publication'>,
): Promise<MagicItem | undefined> {
  const load = books[`/src/data/library/magic-items/${publication.key.replaceAll('_', '-')}.ts`]
  if (!load) return undefined
  const { default: items } = await load()
  return Object.hasOwn(items, item.key) ? items[item.key] : undefined
}
