import { monsterBooks } from '#/data/generated/monster-books'

import type { OwnedCreature } from './owned-creature'

const modules = import.meta.glob<{ default: OwnedCreature }>('/src/data/library/owned/*/*.ts')

/** Where a creature's owner function lives: beside its book, named for the monster. */
export function ownedCreaturePath(publication: string, monster: string) {
  const book = monsterBooks[publication]
  return book ? `/src/data/library/owned/${book}/${monster.replaceAll('_', '-')}.ts` : undefined
}

/** Every owner function there is, by its path, for checks that each creature has its own. */
export const ownedCreaturePaths = Object.keys(modules)

/** Load the function a creature's statistics follow its owner by, if it has one. */
export async function loadOwnedCreature(
  publication: string,
  monster: string,
): Promise<OwnedCreature | undefined> {
  const path = ownedCreaturePath(publication, monster)
  const load = path ? modules[path] : undefined
  return load ? (await load()).default : undefined
}
