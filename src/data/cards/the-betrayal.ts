import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Betrayal',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: false,
  text: 'One of your allies turns against you. The DM chooses which ally becomes hostile. This ally will actively work against you and may even try to kill you. The enmity lasts until either you or the ally dies, or until a wish spell is used to restore their friendship.',
  drawback: 'An ally becomes a hostile enemy',
})
