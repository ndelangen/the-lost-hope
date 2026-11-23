import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'Balance',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Balance',
  tone: 'bad',
  classic: true,
  text: 'Your mind suffers a wrenching alteration, causing your alignment to change. Law becomes chaos, chaos becomes law, good becomes evil, evil becomes good. If you are true neutral or unaligned, this card has no effect on you.',
  drawback: 'Alignment reverses (law/chaos, good/evil)',
})
