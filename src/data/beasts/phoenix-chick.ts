import { refs } from '#/data/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: "Phoenix Chick (Jim's phoenix)",
  avatar: '/assets/npcs/phoenix-chick.png',
  location: refs.locations.fajanet,
  species: 'Phoenix',
  notes: [
    [
      'A young phoenix bonded to ',
      refs.pcs.jim,
      '. The mechanical form of its "bond" with Jim (familiar, companion, sentient ally, or charm) was left vague.',
      " D&D Beyond monster listing: https://www.dndbeyond.com/monsters?filter-search=phoenix (Mordenkainen's Tome of Foes, p. 199 — an Elder Elemental, CR 16 at full power; the bonded chick is a juvenile variant whose in-fiction power is the DM's to decide).",
    ],
  ],
})
