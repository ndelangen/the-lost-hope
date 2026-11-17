import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Corwin Hale',
  avatar: '/assets/npcs/corwin-hale-portrait.png',
  species: 'Human',
  notes: [
    [
      'A weathered ferry helmsman in a wind-bleached coat. He has flown the crossing between ',
      refs.locations.skynet,
      ' and ',
      refs.locations.nimbus,
      ' for twenty years.',
    ],
  ],
  motivations: [
    [
      'Get away from the crossing. He watched the other ferry get hit by the beam and sink, and nothing will make him fly today.',
    ],
  ],
  background: [
    [
      'He refuses service to everyone, soldiers and civilians alike, and runs from the ferry landing.',
    ],
    [
      'What he says: “I saw her go down. I’m not flying. Not for you, not for them, not for anyone.”',
    ],
  ],
  stats: refs.creatures.commoner,
})
