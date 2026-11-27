import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Flyn Etchersen',
  location: refs.locations.rustmoor,
  species: 'Half-Elf',
  notes: [
    [
      'An ex-navy sailor in ',
      refs.locations.rustmoor,
      ' and the talker of his group. Ink-stained fingers, and a logbook full of sketches as well as entries. The others call him Etchersen.',
    ],
  ],
  motivations: [['To leave ', refs.locations.rustmoor, ' before he ends up like the rest.']],
  background: [
    [
      'One of the three ex-navy men, with ',
      refs.npcs.hagel_boos,
      ' and ',
      refs.npcs.jake_kinner,
      '. He smokes Arcane Dust openly, and his eyes are starting to go glassy. Of the three, he is the one the party can lose.',
    ],
    [
      'He had family on ',
      refs.locations.the_patient_heron,
      ', the ship ',
      refs.pcs.swift_starblade,
      ' worked on as a boy. That backstory belongs to ',
      refs.pcs.swift_starblade,
      '’s player and is hidden from the others: check with that player before it comes out at the table.',
    ],
    [
      'He hates pirates, but he is willing to put that aside to get out of ',
      refs.locations.rustmoor,
      '. Staying on to work for one, as part of a crew for ',
      refs.pcs.swift_starblade,
      ', would take convincing.',
    ],
  ],
  stats: refs.creatures.commoner,
})
