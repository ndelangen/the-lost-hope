import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Swift Starblade’s Younger Sister',
  avatar: '/assets/npcs/swift-starblade-s-younger-sister-portrait.png',
  notes: [
    [
      'The unnamed younger sister of ',
      refs.pcs.swift_starblade,
      '. Her name and exact whereabouts remain unknown.',
    ],
  ],
  stats: refs.creatures.commoner,
})
