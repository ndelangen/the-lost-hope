import type { Content } from '#/definitions/content'
import type { BondOutcomes } from '#/definitions/event'
import type { EntityRef } from '#/definitions/kind'

type ContentNode = Content[number][number]

type CharacterRef = BondOutcomes['toward']

function joinedReferences(refs: CharacterRef[]): ContentNode[] {
  return refs.flatMap((ref, index): ContentNode[] => [
    ...(index ? [index === refs.length - 1 ? ' and ' : ', '] : []),
    ref,
  ])
}

/** The event owns the outcomes; every narrative view derives the same account. */
export function bondOutcomeProse(bonds: BondOutcomes | undefined): Content {
  if (!bonds) return []
  const retained = bonds.outcomes.filter((outcome) => outcome.state === 'retained')
  return [
    ...(retained.length
      ? [
          [
            ...joinedReferences(retained.map((outcome) => outcome.who)),
            ' kept their emotional bond with ',
            bonds.toward,
            '.',
          ],
        ]
      : []),
    ...bonds.outcomes.flatMap((outcome): Content =>
      outcome.state === 'severed' ? [[outcome.who, ' acquired ', outcome.effect, '.']] : [],
    ),
  ]
}

export type BondPerson = {
  ref: CharacterRef
  name: string
  slug: string
  avatar: string
}

export type BondConnection = BondPerson & { effect?: EntityRef<'effect'> }

/** A snapshot of recorded outcomes, never inferred from co-mentions or affiliations. */
export function bondConnections(
  bonds: BondOutcomes,
  person: (ref: CharacterRef) => BondPerson,
  effectOwner: (ref: EntityRef<'effect'>) => CharacterRef,
) {
  const retained: BondConnection[] = []
  const severed: BondConnection[] = []
  for (const outcome of bonds.outcomes) {
    const entry = person(outcome.who)
    if (outcome.state === 'retained') retained.push(entry)
    else {
      const owner = effectOwner(outcome.effect)
      if (owner.ref !== outcome.who.ref || owner.key !== outcome.who.key) {
        throw new Error(`Bond effect ${outcome.effect.key} belongs to a different character`)
      }
      severed.push({ ...entry, effect: outcome.effect })
    }
  }
  const byName = (a: BondConnection, b: BondConnection) => a.name.localeCompare(b.name)
  return { retained: retained.toSorted(byName), severed: severed.toSorted(byName) }
}
