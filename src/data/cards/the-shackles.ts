import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Shackles',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: false,
  text: 'Magical chains bind you, reducing your movement speed by half and preventing you from taking the Dash action. You cannot fly, teleport, or use any form of enhanced movement. Only a wish spell can remove these shackles.',
  drawback: 'Movement speed halved, no Dash/fly/teleport',
})
