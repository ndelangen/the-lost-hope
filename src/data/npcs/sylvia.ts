import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Sylvia',
  avatar: '/assets/npcs/sylvia.png',
  location: refs.locations.the_flying_whale,
  species: 'Human',
  notes: [
    [
      'A red-haired pirate captain known as the Crimson Blood, commanding ',
      refs.locations.the_flying_whale,
      '. She enforces declared protection aboard her vessel and forbids ',
      refs.pcs.swift_starblade,
      ' from gambling there.',
    ],
    [
      'She comes from an established pirate family and is openly hostile toward the ',
      refs.organizations.starblade_family,
      '.',
    ],
  ],
})
