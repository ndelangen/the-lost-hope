import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'The Fairhaven Invasion',
  icon: 'gi/GiSiegeTower',
  type: 'mystery',
  notes: [['Who attacked ', refs.locations.fairhaven, ', and why?']],
  status: 'open',
  clues: [
    [
      refs.events.n2_e066,
      ' — wizards bearing the symbol of ',
      refs.organizations.the_eyeless_hand,
      ' summoned giant monsters during the Festival of the Heroes. The symbol implicates the organization but does not yet prove who commanded the attack.',
    ],
    [
      'One uncertain recollection is that seven beholders appeared. One wizard received particular attention from the DM while standing atop an unidentified abomination.',
    ],
    [
      refs.events.n2_e069,
      ' — the party and ',
      refs.npcs.borris,
      ' escaped with 168 civilian survivors aboard the third ship.',
    ],
    [
      refs.events.n2_e070,
      ' — the survivors chose to sail across the ',
      refs.locations.sea_of_unknown,
      ' toward ',
      refs.locations.verdant_haven,
      '.',
    ],
    [
      refs.events.n2_e076,
      ' — during an interrogation of uncertain reliability, ',
      refs.npcs.roberto,
      ' claimed that ',
      refs.organizations.the_eyeless_hand,
      ' had been taking control of ',
      refs.locations.fairhaven,
      ', that ',
      refs.npcs.mortimer_mafioso,
      ' was involved, and that a splinter cell destroyed the city without necessarily receiving approval from ',
      refs.npcs.the_father,
      '.',
    ],
  ],
  conclusion: [],
})
