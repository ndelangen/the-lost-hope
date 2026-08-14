import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party reunites with Bob the Merchant',
  day: 17,
  location: refs.locations.sylvias_flying_bazaar,
  mark: { type: 'icon', name: 'gi/GiCardRandom' },
  notes: [
    [
      'At a stall built around a dead giant rat and the ',
      refs.beasts.mimic_chest,
      ', the party found ',
      refs.npcs.bob_the_merchant,
      ' again.',
    ],
    [
      refs.pcs.jim,
      ' used the ',
      refs.items.dagger_of_passive_aggression,
      ' for the first time after carrying it for a long time. He repeatedly stabbed ',
      refs.pcs.devan,
      ' and ',
      refs.pcs.cassian_veyl,
      ' without actually hurting them. With each use, ',
      refs.items.dagger_of_passive_aggression,
      ' made a passive-aggressive remark.',
    ],
    [
      refs.pcs.devan,
      ' paid 30 GP for ',
      refs.npcs.bob_the_merchant,
      ' to combine his old mace with ',
      refs.items.steve_the_interrogation_rock,
      ', transforming them into ',
      refs.items.steve_mace_of_returning,
      '.',
    ],
  ],
})
