import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim loses his amulet and Sarogarth loses Sylf',
  notes: [
    [
      "The table settled the stakes separately from the cards' effects. ",
      refs.pcs.jim,
      ' lost the ',
      refs.items.jaded_amulet,
      '. ',
      refs.npcs.sarogarth,
      ' lost ',
      refs.npcs.sylf,
      ' in the final wager. The author confirmed which companion was lost; her destination and exact contractual fate are unknown.',
    ],
    [
      'Upset by the loss, ',
      refs.npcs.sarogarth,
      ' thanked ',
      refs.pcs.devan,
      ' for trying to protect him and left the party for a day or two. The DM stressed that making him play and choosing his extra draws had been a group decision. No loss of ',
      refs.pcs.swift_starblade,
      "'s fame or ",
      refs.pcs.cassian_veyl,
      "'s humanity was announced in the settlement.",
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiBrokenShield' },
})
