import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party takes Celeste from a shore-side fight',
  day: 12,
  location: refs.locations.the_boat_to_fairhaven,
  mark: { type: 'icon', name: 'gi/GiLifeBuoy' },
  notes: [
    [
      'As the boat from ',
      refs.locations.badesh,
      ' approached the shore near ',
      refs.locations.fairhaven,
      ', the party saw a fight taking place nearby.',
    ],
    [
      refs.pcs.devan,
      " decided to intervene, and the party joined the fight. None of the party's opponents survived the encounter.",
    ],
    [
      'The party found ',
      refs.npcs.celeste,
      ' surrounded by her dead parents, who had become zombies. They decided to take her with them to a safer place. She displayed an unexplained connection to death or the undead, leading the party to suspect that she might be manifesting necromancy involuntarily.',
    ],
    [refs.npcs.celeste_s_mother, ' was one of the zombified parents.'],
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.victor_dranzig,
      ' (travelling with ',
      refs.npcs.abraham,
      ').',
    ],
  ],
})
