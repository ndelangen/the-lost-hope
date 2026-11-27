import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Jake “Boozy” Kinner',
  location: refs.locations.rustmoor,
  species: 'Human',
  notes: [
    [
      'An old ex-navy gunner in ',
      refs.locations.rustmoor,
      ', half deaf from the cannons. He reads his logbook aloud to himself. Everyone calls him Boozy.',
    ],
  ],
  motivations: [['To see the open sea once more before he dies.']],
  background: [
    [
      'One of the three ex-navy men, with ',
      refs.npcs.hagel_boos,
      ' and ',
      refs.npcs.flyn_etchersen,
      '. He reads his log aloud to remember his brother’s face. Sharp-tongued, and suspicious of the party at first.',
    ],
  ],
  stats: refs.creatures.commoner,
})
