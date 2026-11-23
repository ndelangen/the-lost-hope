import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Knight',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Key',
  tone: 'good',
  classic: true,
  text: 'You gain the service of a 4th-level fighter who appears in a space you choose within 30 feet of you. The fighter is of the same race as you and serves you loyally until death, believing the fates have drawn him or her to you. You control this character.',
  benefit: '4th-level fighter follower',
})
