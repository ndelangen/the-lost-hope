import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Captain Blackthorn',
  location: refs.locations.blackthorn_s_ship,
  notes: [['A pirate captain.']],
  motivations: [
    [
      'He gave ',
      refs.pcs.swift_starblade,
      ' his freedom after losing a duel to him. Whether he did it out of respect or because he saw a future danger is undecided.',
    ],
  ],
  stats: refs.creatures.pirate_captain,
})
