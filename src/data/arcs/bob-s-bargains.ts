import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'Bob’s bargains',
  icon: 'gi/GiShop',
  direction: [['What is ', refs.npcs.bob_the_merchant, ', and what do his bargains really cost?']],
  quests: [
    refs.quests.what_is_up_with_bob_the_merchant,
    refs.quests.bag_of_holding_s_hidden_effect,
  ],
  plots: [
    {
      name: 'Special daggers',
      status: 'closed',
      npcs: [refs.npcs.bob_the_merchant],
      events: [refs.events.n2_e103],
    },
    {
      name: 'Bargains on the Flying Whale',
      status: 'closed',
      npcs: [refs.npcs.bob_the_merchant],
      events: [refs.events.n2_e094, refs.events.n2_e095],
    },
    {
      name: 'The Bag of Holding',
      status: 'closed',
      npcs: [refs.npcs.bob_the_merchant],
      events: [refs.events.n2_e115, refs.events.n2_e107],
    },
    {
      name: 'An amulet in a pie',
      status: 'closed',
      npcs: [refs.npcs.bob_the_merchant],
      events: [refs.events.n2_e108],
    },
    {
      name: 'The spirit cannon',
      status: 'closed',
      npcs: [refs.npcs.stefanio],
      events: [refs.events.n2_e200],
    },
    {
      name: 'Bob collects',
      hook: [
        [
          '',
          refs.pcs.jim,
          ' is bound by contract to ',
          refs.npcs.bob_the_merchant,
          '. When does Bob call it in?',
        ],
      ],
      npcs: [refs.npcs.bob_the_merchant],
    },
  ],
})
