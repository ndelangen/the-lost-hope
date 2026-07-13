import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Verdant Haven Rangers',
  location: refs.locations.verdant_haven,
  species: 'Wood elves',
  notes: [
    [
      'A nature-aligned community of rangers with a comfortable, well-established settlement; the party described them colloquially as rednecks.',
    ],
  ],
})
