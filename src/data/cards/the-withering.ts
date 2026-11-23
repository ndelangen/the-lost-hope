import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Withering',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'mixed',
  classic: false,
  text: 'You age 1d10 + 10 years instantly. If this would cause you to die of old age, you instead become a wizened version of yourself with -1 to Strength, Dexterity, and Constitution, but +1 to Intelligence and Wisdom.',
  benefit: '+1 to Intelligence and Wisdom (if aged)',
  drawback: 'Age 1d10+10 years, lose Str/Dex/Con if death avoided',
})
