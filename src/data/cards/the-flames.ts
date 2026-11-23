import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Flames',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: true,
  text: 'A powerful devil becomes your enemy. The devil seeks your ruin and plagues your life, savoring your suffering before attempting to slay you. This enmity lasts until either you or the devil dies.',
  drawback: 'A powerful devil becomes your enemy',
})
