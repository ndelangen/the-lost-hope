import { ownedCreatures } from '#/data/library/owned/_index'

import type { OwnedCreature } from './owned-creature'

/** The function a creature's statistics follow its owner by, if it has one. */
export function ownedCreatureOf(publication: string, monster: string): OwnedCreature | undefined {
  return ownedCreatures[`${publication}/${monster}`]
}

/** Every creature that has an owner function, as `publication/monster`. */
export const ownedCreatureKeys = Object.keys(ownedCreatures)
