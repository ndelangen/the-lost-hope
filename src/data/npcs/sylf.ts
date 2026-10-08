import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Sylf',
  species: 'Demon',
  languages: ['Infernal'],
  notes: [
    [
      refs.npcs.dax,
      "'s wife, in the form of a blue-shelled tortoise. Her true name is not recorded.",
    ],
    [
      refs.npcs.sarogarth,
      ' bound her because he thought she was lonely. Their present contract is described as shared equally.',
    ],
  ],
})
