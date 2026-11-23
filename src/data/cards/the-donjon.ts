import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Donjon',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: true,
  text: "You disappear and become entombed in a state of suspended animation in an extradimensional sphere. Everything you were wearing and carrying stays behind in the space you occupied when you disappeared. You remain imprisoned until you are found and removed from the sphere. You can't be located by any divination magic, but a wish spell can reveal the location of your prison. You draw no more cards.",
  drawback: 'Imprisoned in extradimensional sphere until rescued',
})
