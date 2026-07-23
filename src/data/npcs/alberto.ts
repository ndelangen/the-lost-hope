import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Alberto',
  location: refs.locations.sylvias_flying_bazaar,
  species: 'Human',
  notes: [
    [
      'A former pirate captain who sold his ship and crew rather than remain responsible for what he expects to happen at sea during the coming decade.',
    ],
    [
      'He now works as a bartender and information broker aboard ',
      refs.locations.sylvias_flying_bazaar,
      ', keeping ten percent of his sales arrangement with ',
      refs.npcs.sylvia,
      '.',
    ],
  ],
})
