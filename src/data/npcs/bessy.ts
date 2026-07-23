import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Bessy',
  location: refs.locations.sylvias_flying_bazaar,
  species: 'Minotaur',
  notes: [
    [
      'A minotaur blacksmith and craftsperson capable of making custom weapons, armour, and permanent protective sheaths for dangerous weapons.',
    ],
    ['She now operates from the crafting area aboard ', refs.locations.sylvias_flying_bazaar, '.'],
  ],
})
