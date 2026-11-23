import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Rogue',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: true,
  text: "A nonplayer character of the DM's choice becomes hostile toward you. The identity of your new enemy isn't known until the NPC or someone else reveals it. Nothing less than a wish spell or divine intervention can end the NPC's hostility toward you.",
  drawback: 'An NPC becomes a permanent enemy',
})
