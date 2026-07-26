import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Swift Starblade’s Younger Sister',
  notes: [
    [
      'The unnamed younger sister of ',
      refs.pcs.swift_starblade,
      '. Her name and exact whereabouts remain unknown.',
    ],
  ],
})
