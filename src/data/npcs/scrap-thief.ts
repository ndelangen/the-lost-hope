import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Scrap Thief',
  location: refs.locations.rustmoor,
  notes: [
    [
      'One of a few Dust users who creep onto the building site of the ',
      refs.locations.rustmoor_guildhall,
      ' at night and carry off copper pipe and rivets.',
    ],
  ],
  motivations: [['They sell what they steal to buy more Arcane Dust.']],
  stats: refs.creatures.tough,
})
