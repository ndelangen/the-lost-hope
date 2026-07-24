import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Sylvia offers the party passage toward the Feywild',
  day: 17,
  location: refs.locations.the_crater_bridge,
  mark: { type: 'icon', name: 'gi/GiCargoShip' },
  notes: [
    [
      refs.npcs.sylvia,
      ' lowered ',
      refs.locations.sylvias_flying_bazaar,
      ' beside the crater and gave the party one hour to board before departure.',
    ],
    [
      'She said the vessel would visit all three ',
      refs.locations.sky_islands,
      ' over roughly one month, after which reaching ',
      refs.locations.feywild,
      ' would take about another two weeks.',
    ],
    [
      refs.npcs.sylvia,
      ' recognized ',
      refs.pcs.swift_starblade,
      ' and said he possessed her father’s ship. She allowed him aboard but charged him more than the others and forbade him from gambling.',
    ],
  ],
})
