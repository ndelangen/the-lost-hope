import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Corwin Hale',
  species: 'Human',
  notes: [
    [
      'A weathered ferry helmsman in a wind-bleached coat, who has flown the crossing between ',
      refs.locations.skynet,
      ' and ',
      refs.locations.nimbus,
      ' for twenty years.',
    ],
  ],
  motivations: [
    [
      'Reach the docks of ',
      refs.locations.nimbus,
      '. His crew was on the crossing when the beam struck, and he was off shift. He will fly anything for free to get there, and he is good at it.',
    ],
  ],
  background: [
    [
      'What he says: “You need a pilot? Twenty years on that crossing. Get me to the Nimbus docks and I’ll fly her for nothing.”',
    ],
  ],
  stats: refs.creatures.commoner,
})
