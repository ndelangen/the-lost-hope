import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "Reach Badesh, Victor's hometown",
  day: 10,
  location: refs.locations.badesh,
  mark: { type: 'icon', name: 'gi/GiHutsVillage' },
  notes: [
    [
      'The party reached a small forest town: ',
      refs.locations.badesh,
      ' — ',
      refs.pcs.victor_dranzig,
      "'s hometown.",
    ],
    ['The dinos lost interest in chasing them here.'],
    [
      'The dinos had been riding toward ',
      refs.locations.fairhaven,
      ' and gave chase when they spotted the party, but the chase stopped on its own.',
    ],
    [
      'The party spent the night in ',
      refs.locations.badesh,
      ', then got on a boat for ',
      refs.locations.fairhaven,
      '.',
    ],
    ['The dwarf and the pirate had been missing since the dragon flight.'],
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.victor_dranzig,
    ],
  ],
})
