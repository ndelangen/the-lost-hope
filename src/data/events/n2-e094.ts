import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party reunites with Bob the Merchant',
  day: 17,
  location: refs.locations.sylvias_flying_bazaar,
  mark: { type: 'icon', name: 'gi/GiCardRandom' },
  notes: [
    [
      'At a stall built around a dead giant rat and a mimic chest, the party found ',
      refs.npcs.bob_the_merchant,
      ', the skeletal trader they had previously dealt with through ',
      refs.organizations.beasts_and_dwarf,
      ' in ',
      refs.locations.fairhaven,
      '.',
    ],
    [
      'They tested ',
      refs.items.dagger_of_passive_aggression,
      ' for the first time and confirmed that a creature stabbed by it becomes conspicuously passive-aggressive.',
    ],
    [
      refs.pcs.devan,
      ' paid 30 GP for ',
      refs.npcs.bob_the_merchant,
      ' to combine his old mace with ',
      refs.items.steve_mace_of_returning,
      ' and transform Steve into a stronger returning weapon.',
    ],
  ],
})
