import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Talons',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: true,
  text: "Every magic item you wear or carry disintegrates. Artifacts in your possession aren't destroyed but do vanish.",
  drawback: 'All magic items destroyed',
})
