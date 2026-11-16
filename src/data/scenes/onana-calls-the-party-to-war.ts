import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Onana calls the party to war',
  illustration: '/assets/scenes/onana-calls-the-party-to-war.png',
  location: refs.locations.nimbus,
  npcs: [refs.npcs.onana_tempest, refs.npcs.captain_garran],
  references: [
    refs.npcs.the_father,
    refs.organizations.the_eyeless_hand,
    refs.organizations.tempest_family,
    refs.organizations.beasts_and_dwarf,
    refs.locations.fairhaven,
    refs.pcs.cassian_veyl,
    refs.pcs.devan,
    refs.pcs.swift_starblade,
    refs.beasts.wolfie,
    refs.pcs.jim,
    refs.items.beasts_and_dwarf_s_airship,
    refs.items.master_of_puppets,
    refs.items.ride_the_lightning,
  ],
  setup: [
    [
      refs.npcs.captain_garran,
      ' brings the party to ',
      refs.npcs.onana_tempest,
      ' on the deck of his battle-cruiser, ',
      refs.items.master_of_puppets,
      ', as it turns towards ',
      refs.locations.nimbus,
      '. He talks fast and does not sit down.',
    ],
    [
      '“',
      refs.organizations.beasts_and_dwarf,
      ', welcome to my battle-cruiser, ',
      refs.items.master_of_puppets,
      '.” He thinks to himself: interesting how well that name applies to this situation.',
    ],
    ['“Anyway. I do not have much time. Sorry for taking your vessel. We are at war now.”'],
    [
      '“',
      refs.organizations.the_eyeless_hand,
      ' is determined to do to us what they did to ',
      refs.locations.fairhaven,
      '. They won’t succeed.”',
    ],
    [
      'He casts a small Zone of Truth around the party and asks: “Are you affiliated with ',
      refs.organizations.the_eyeless_hand,
      ', or have you recently used arcane dust?”',
    ],
    ['“Where is the rest of your party?”'],
    [
      '“We do not have time to chat now, ',
      refs.organizations.beasts_and_dwarf,
      '. Once the war is over I will tell you more. Right now I have twenty battle-cruisers, but some are somehow under the control of ',
      refs.organizations.the_eyeless_hand,
      '. I will give you back your vessel if you promise to help me with this war.”',
    ],
  ],
  notes: [
    [
      'Zone of Truth: everyone in it makes the save from his stat block. Whoever fails cannot tell a deliberate lie, but may stay silent or dodge the question. ',
      refs.npcs.onana_tempest,
      ' knows who failed.',
    ],
    [
      'The plan: the party reunites, boards one of the cruisers under the control of ',
      refs.organizations.the_eyeless_hand,
      ', and flips it back by killing the Hand’s crew.',
    ],
    [
      'According to ',
      refs.npcs.onana_tempest,
      ', ',
      refs.npcs.the_father,
      ' is aboard the flying fortress: “I hope he’s on there, because we’re about to bring it down.” Attacking the fortress may be the biggest and final mistake the ',
      refs.organizations.tempest_family,
      ' makes.',
    ],
  ],
  outcomes: [
    {
      when: [['They promise to help.']],
      response: [
        [
          'He gives ',
          refs.items.beasts_and_dwarf_s_airship,
          ' back and points out ',
          refs.items.ride_the_lightning,
          ', the nearest cruiser firing on its own side. Run “Taking back a battle-cruiser”.',
        ],
      ],
    },
    {
      when: [['A party member answers yes in the Zone of Truth.']],
      response: [
        [
          'The discussion ends there. That party member is detained, and the rest of the party is evicted onto the docks of ',
          refs.locations.nimbus,
          '.',
        ],
        [
          'The detained one may escape. The battle-cruiser is loading supplies at the same docks, so they end up there too, hopefully to meet ',
          refs.pcs.swift_starblade,
          '.',
        ],
      ],
    },
    {
      when: [['They ask about the rest of the party.']],
      response: [
        [
          'His soldiers saw a half-elf near the docks when the beam struck. The cruiser sets down at the docks to collect ',
          refs.pcs.swift_starblade,
          '.',
        ],
      ],
    },
    {
      when: [['', refs.npcs.onana_tempest, ' learns they travelled with ', refs.pcs.jim, '.']],
      response: [
        [
          refs.pcs.jim,
          '’s presence and hiding brought this war to the sky islands. ',
          refs.npcs.onana_tempest,
          ' needs every blade today, so the offer stands. Once the war is over he sends them away with ',
          refs.items.beasts_and_dwarf_s_airship,
          ': ',
          refs.pcs.jim,
          '’s final departing gift.',
        ],
      ],
    },
    {
      when: [['They fight.']],
      response: [
        ['They can, but more soldiers keep jumping in. They can see at least forty on deck.'],
      ],
    },
  ],
})
