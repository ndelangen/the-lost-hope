import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Visit the exotic animal dealer',
  day: 2,
  location: refs.locations.rare_animal_dealer_s_premises,
  mark: { type: 'icon', name: 'gi/GiPlantsAndAnimals' },
  notes: [
    [
      'The party went to the ',
      refs.npcs.rare_animal_dealer,
      ' to follow up on the ',
      refs.organizations.adventurers_guild,
      ' bulletin-board quest.',
    ],
    [refs.npcs.rare_animal_dealer, ' is missing 3 animals. The party agreed to recover them.'],
    [
      'Originally filed as “rare-animal trainer”; per this session the in-fiction identity is ',
      refs.npcs.rare_animal_dealer,
      '.',
    ],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})
