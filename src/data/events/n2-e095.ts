import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "Bob's bargains change Wolfie and bind Jim to a contract",
  day: 17,
  location: refs.locations.the_flying_whale,
  mark: { type: 'icon', name: 'gi/GiTrade' },
  notes: [
    [
      refs.pcs.cassian_veyl,
      ' made a random magical draw from ',
      refs.npcs.bob_the_merchant,
      ' and received the ',
      refs.items.one_use_obedience_whip,
      '. He used it on ',
      refs.beasts.wolfie,
      ', giving the pup ',
      refs.effects.whip_taught_understanding,
      '.',
    ],
    [
      refs.pcs.jim,
      ' commissioned permanent magic that would let selected people see him under another appearance and fail to recognize him. The price was 250 GP, of which he paid 30 GP immediately.',
    ],
    [refs.pcs.jim, ' signed ', refs.effects.bob_s_divine_contract, ' for the balance.'],
    [
      refs.npcs.bob_the_merchant,
      ' also gave ',
      refs.pcs.cassian_veyl,
      ' the ',
      refs.items.wolfie_tracking_ring,
      '.',
    ],
  ],
  foretold: [
    {
      what: [
        [
          refs.npcs.bob_the_merchant,
          ' delivers the disguise magic ',
          refs.pcs.jim,
          ' commissioned.',
        ],
      ],
      when: { type: 'after', span: { months: 4 } },
      outcome: { type: 'cameTrue', event: refs.events.n2_e115 },
    },
  ],
  illustrations: ['/assets/scenes/bob-s-bargains-change-wolfie-and-bind-jim-to-a-contract.png'],
})
