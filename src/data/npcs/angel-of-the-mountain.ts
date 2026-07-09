import { refs } from '#/data/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Angel of the Mountain',
  avatar: '/assets/npcs/angel-of-the-mountain.png',
  location: refs.locations.mountain_top,
  role: 'Mountain-top dweller; spouse to the Dragon of the Mountain',
  species: 'Angel',
  summary: [
    'An angel dwelling atop the ',
    refs.locations.mountain_top,
    ', married to the ',
    refs.npcs.dragon_of_the_mountain,
    '.',
  ],
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'former',
      rank: 'Member',
    },
  ],
  notes: ["The angel's name, celestial rank, and age are unknown."],
})
