import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Magister Orrin Valdrek',
  notes: [['A master of rune magic and early wizardry who built weapons for the dwarves.']],
  stats: refs.creatures.mage,
  background: [
    [
      'His name was invented by the DM; the backstory of ',
      refs.pcs.auren,
      ' leaves him unnamed. Whether he is still alive is open.',
    ],
  ],
})
