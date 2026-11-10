import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Sylf',
  avatar: '/assets/npcs/sylf.png',
  species: 'Demon',
  languages: ['Infernal'],
  notes: [
    [
      refs.npcs.dax,
      "'s wife, in the form of a blue-shelled tortoise. Her true name is not recorded.",
    ],
    [
      refs.npcs.sarogarth,
      ' bound her because he thought she was lonely. Their shared contract was described as equal. Its status after the wager is unknown.',
    ],
  ],
})
