import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Void',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: true,
  text: "This black card spells disaster. Your soul is drawn from your body and contained in an object in a place of the DM's choice. One or more powerful beings guard the place. While your soul is trapped in this way, your body is incapacitated. A wish spell can't restore your soul, but the spell reveals the location of the object that holds it. You draw no more cards.",
  drawback: 'Soul trapped in object, body incapacitated',
})
