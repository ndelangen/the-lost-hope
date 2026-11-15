import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Maren of Fairhaven',
  species: 'Human',
  notes: [
    [
      'A woman with a bundle on her back and a child by the hand, pushing towards the ferries to get off the sky islands.',
    ],
  ],
  motivations: [
    [
      'Get her child off the islands before the fighting starts. She has run from a city once already.',
    ],
  ],
  background: [
    [
      'She survived the fall of ',
      refs.locations.fairhaven,
      ' and moved to the islands to start over.',
    ],
    [
      'What she mutters: “I’m getting out of here. They’re going to destroy this place, like they did to Fairhaven.”',
    ],
    [
      'If the party helps her through the crowd, she may remember their faces from ',
      refs.locations.fairhaven,
      '.',
    ],
  ],
  stats: refs.creatures.commoner,
})
