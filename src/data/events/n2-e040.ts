import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "Reach Badesh, Victor's hometown",
  day: 10,
  location: refs.locations.badesh,
  mark: { type: 'icon', name: 'gi/GiPineTree' },
  notes: [
    [
      'The party reached a small forest town: ',
      refs.locations.badesh,
      ' — ',
      refs.pcs.victor_the_badesh_lumberjack,
      "'s hometown.",
    ],
    ['The dinos lost interest in chasing them here.'],
    [
      'Open: it is unclear whether the dinos were even hostile — they rode toward Fairhaven and gave chase when spotted, but the chase stopped on its own. Whether they were predators, scouts, or just curious is open. Why were the dinos headed to Fairhaven? Not stated.',
    ],
    ['The party spent the night in Badesh, then got on a boat for ', refs.locations.fairhaven, '.'],
    [
      'The session ends here. Where the dwarf and the pirate are is open — they were last seen missing after the dragon flight.',
    ],
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.victor_the_badesh_lumberjack,
    ],
  ],
})
