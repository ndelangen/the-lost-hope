import { refs } from '#/data/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Displacer Beast',
  avatar: '/assets/npcs/displacer-beast.png',
  location: refs.locations.fajanet,
  species: 'Displacer Beast (Monstrosity)',
  summary: [
    'A displacer beast — one of the three animals missing from the ',
    refs.npcs.rare_animal_dealer,
    '. D&D Beyond monster listing: https://www.dndbeyond.com/monsters?filter-search=displacer-beast (Monster Manual, p. 81; a Feywild-origin monstrosity that displaces light to appear offset from its true position). D&D Beyond monster pages use unstable numeric IDs, so this filter URL is the closest thing to a stable permalink.',
  ],
})
