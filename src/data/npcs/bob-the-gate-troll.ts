import { refs } from '#/data/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Bob the gate troll',
  avatar: '/assets/npcs/bob.png',
  location: refs.locations.fajanet,
  species: 'Troll',
  notes: [
    [
      'A friendly troll stationed at the main gate of ',
      refs.locations.fajanet,
      '. Big, green, and smiling; recognises everyone who passes through by sight, even when he forgets their names.',
    ],
  ],
})
