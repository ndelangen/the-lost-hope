import effectRecords from '#/data/effects/_index'
import type { Content } from '#/definitions/content'
import type { BondOutcomes } from '#/definitions/event'

type ContentNode = Content[number][number]

type CharacterRef = BondOutcomes['toward']

const sameRef = (a: CharacterRef, b: CharacterRef) => a.ref === b.ref && a.key === b.key

function joinedReferences(refs: readonly CharacterRef[]): ContentNode[] {
  return refs.flatMap((ref, index): ContentNode[] => [
    ...(index ? [index === refs.length - 1 ? ' and ' : ', '] : []),
    ref,
  ])
}

/** Who lost the bond: the bearers of the severing effect, its one canonical owner. */
export function severedBearers(bonds: BondOutcomes): readonly CharacterRef[] {
  const effect = effectRecords[bonds.severed.key as keyof typeof effectRecords]
  if (!effect) throw new Error(`Unknown bond effect ${bonds.severed.key}`)
  const kept = bonds.retained.find((who) => effect.on.some((bearer) => sameRef(bearer, who)))
  if (kept) throw new Error(`${kept.key} both kept and lost the bond`)
  if (effect.on.some((bearer) => sameRef(bearer, bonds.toward)))
    throw new Error('A bond outcome needs two different characters')
  return effect.on
}

/** The event owns who kept the bond and the effect owns who lost it; every view derives the same account. */
export function bondOutcomeProse(bonds: BondOutcomes | undefined): Content {
  if (!bonds) return []
  return [
    ...(bonds.retained.length
      ? [
          [
            ...joinedReferences(bonds.retained),
            ' kept their emotional bond with ',
            bonds.toward,
            '.',
          ],
        ]
      : []),
    [...joinedReferences(severedBearers(bonds)), ' acquired ', bonds.severed, '.'],
  ]
}

export type BondPerson = {
  ref: CharacterRef
  name: string
  slug: string
  avatar: string
}

/** A snapshot of recorded outcomes, never inferred from co-mentions or affiliations. */
export function bondConnections(bonds: BondOutcomes, person: (ref: CharacterRef) => BondPerson) {
  const byName = (a: BondPerson, b: BondPerson) => a.name.localeCompare(b.name)
  return {
    retained: bonds.retained.map(person).toSorted(byName),
    severed: severedBearers(bonds).map(person).toSorted(byName),
    effect: bonds.severed,
  }
}
