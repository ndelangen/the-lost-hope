import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Blackbeard',
  location: refs.locations.sea_of_unknown,
  notes: [
    [
      'A pirate hostile to ',
      refs.pcs.swift_starblade,
      '. ',
      refs.npcs.alberto,
      ' specifically named Blackbeard when warning Swift that returning to the sea would require an army.',
    ],
  ],
})
