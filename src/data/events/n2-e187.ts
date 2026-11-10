import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Cassian and Swift rig roulette and gain VIP access',
  notes: [
    [
      'With Guidance from ',
      refs.pcs.cassian_veyl,
      ', ',
      refs.pcs.swift_starblade,
      ' used an invisible Mage Hand at the roulette table. ',
      refs.pcs.cassian_veyl,
      ' placed 180 gold on 36, then used Minor Illusion to create a distracting crash as the ball landed on 14. ',
      refs.pcs.swift_starblade,
      ' moved the wager to the winning number, succeeding with a total of 37.',
    ],
    [
      'The casino paid 3,000 gold. ',
      refs.pcs.cassian_veyl,
      ' and ',
      refs.pcs.swift_starblade,
      ' agreed on a two-to-one split, leaving 1,000 gold for the latter. ',
      refs.pcs.jim,
      ' and ',
      refs.pcs.devan,
      ' watched without joining the scam.',
    ],
    [
      'Staff invited the winners to the VIP room and issued the ',
      refs.items.nimbus_casino_vip_card,
      '. ',
      refs.pcs.cassian_veyl,
      ' lent it to ',
      refs.pcs.jim,
      ', who found ',
      refs.npcs.the_fiddler,
      ' inside and brought the group in.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiLockpicks' },
})
