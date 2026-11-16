import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Old Pell',
  avatar: '/assets/npcs/old-pell-portrait.png',
  species: 'Gnome',
  notes: [
    [
      'An elderly lamp-oil seller nailing boards over his shop window, muttering at every hammer blow.',
    ],
  ],
  motivations: [
    [
      'Save his stock and his shop. He sells cheap, and he will trade what he has for help carrying crates.',
    ],
  ],
  background: [['What he mutters: “Forty years on this island. Forty years, and now a war.”']],
  stats: refs.creatures.commoner,
})
