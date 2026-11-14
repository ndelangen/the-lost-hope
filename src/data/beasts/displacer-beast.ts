import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Displacer Beast',
  avatar: '/assets/npcs/displacer-beast.png',
  location: refs.locations.fajanet,
  species: 'Displacer Beast (Monstrosity)',
  notes: [
    [
      'A displacer beast — one of the three animals missing from the ',
      refs.npcs.rare_animal_dealer,
      '. A monstrosity from the ',
      refs.locations.feywild,
      ' that displaces light to appear offset from its true position (Monster Manual, p. 81).',
    ],
    [
      {
        type: 'link',
        label: 'Displacer beast on D&D Beyond',
        url: 'https://www.dndbeyond.com/monsters?filter-search=displacer-beast',
      },
    ],
  ],
})
