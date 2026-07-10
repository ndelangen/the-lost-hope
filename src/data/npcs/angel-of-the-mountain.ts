import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Angel of the Mountain',
  avatar: '/assets/npcs/angel-of-the-mountain.png',
  location: refs.locations.mountain_top,
  species: 'Angel',
  notes: [
    [
      'An angel dwelling atop the ',
      refs.locations.mountain_top,
      ', married to the ',
      refs.npcs.dragon_of_the_mountain,
      ". The angel's name, celestial rank, and age are unknown.",
    ],
  ],
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'former',
      rank: 'Member',
    },
  ],
})
