import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'What Did Devan Lose to the Fiddler?',
  icon: 'gi/GiComa',
  type: 'mystery',
  notes: [[refs.pcs.devan, ' must discover what part of himself is missing or dormant.']],
  status: 'open',
  clues: [
    [
      refs.events.n2_e105,
      ' — during ',
      refs.npcs.the_fiddler,
      '’s three-round game, ',
      refs.pcs.devan,
      ' gained ',
      refs.effects.protection_against_death,
      ' but was left with ',
      refs.effects.something_missing_or_dormant,
      '.',
    ],
    [
      'Open: what part of ',
      refs.pcs.devan,
      ' was affected, is it missing or merely dormant, what caused the loss, and what consequences or recovery conditions does it have?',
    ],
  ],
  conclusion: [],
})
