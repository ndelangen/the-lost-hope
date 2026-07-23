import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Sylvia',
  location: refs.locations.sylvias_flying_bazaar,
  species: 'Human',
  notes: [
    [
      'A red-haired pirate captain known as the Crimson Blood, commanding ',
      refs.locations.sylvias_flying_bazaar,
      '. She enforces declared protection aboard her vessel and forbids ',
      refs.pcs.swift_starblade,
      ' from gambling there.',
    ],
    [
      'She comes from an established pirate family and is openly hostile toward the Starblade family.',
    ],
  ],
})
