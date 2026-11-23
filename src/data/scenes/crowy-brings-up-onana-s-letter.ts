import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Crowy brings up Onana’s letter',
  location: refs.locations.little_purple_decks,
  alternateLocations: [refs.locations.ride_the_lightning_main_deck],
  npcs: [refs.npcs.crowy],
  setup: [
    [
      'Either way, whether the party handed ',
      refs.items.ride_the_lightning,
      ' over or ran off with her in ',
      refs.scenes.garran_comes_for_the_cruiser,
      ': once they have left the fleet behind, ',
      refs.npcs.crowy,
      ' returns and vomits up a letter from ',
      refs.npcs.onana_tempest,
      ' to ',
      refs.npcs.light_13th_marshal,
      '.',
    ],
    [
      'If they stole the cruiser, the party expects fury. The letter does not read that way. Why is in the motivations of ',
      refs.npcs.onana_tempest,
      ' and the background of the ',
      refs.organizations.tempest_family,
      '.',
    ],
  ],
  beats: [
    {
      title: 'Crowy returns',
      lines: [
        {
          do: [
            [
              refs.npcs.crowy,
              ' returns to the party, lands among them, heaves, and vomits up a single folded sheet.',
            ],
          ],
        },
        {
          note: [
            [
              'This is how ',
              refs.npcs.crowy,
              ' produces paperwork, and he can speak with ',
              refs.npcs.light_13th_marshal,
              ' directly. Let the players pick the letter up and react first.',
            ],
          ],
        },
      ],
    },
    {
      title: 'A letter from Tempest',
      lines: [
        {
          say: [
            ['To the 13th Marshal Light, from Onana Tempest.'],
            ['Dear ally,'],
            [
              'I regret to inform you our nation has suffered a defeat against ',
              refs.organizations.the_eyeless_hand,
              '. And that during this attack one of your guild’s members has been lost.',
            ],
            [
              'I have observed the party as requested, and they have shown courage, strength and a strong mind. Attached you will see their answers to the question you wished me to ask. It is my humble opinion they might be ready to endure your test.',
            ],
            ['Whilst we rebuild, perhaps we could renegotiate having a guildhall here, again.'],
          ],
        },
        {
          note: [
            [
              'Read it evenly, without comment. On the road where they handed the cruiser over, it ends here.',
            ],
          ],
        },
      ],
    },
    {
      title: 'My ship returned to me',
      onlyIf: [['The party ran off with ', refs.items.ride_the_lightning, '.']],
      lines: [
        {
          say: [
            [
              'Would you be so kind to tell them I expect my ship returned to me, and that once so, they are welcome again.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiShipWheel',
          when: [['They decide to bring ', refs.items.ride_the_lightning, ' back.']],
          response: [[refs.npcs.onana_tempest, ' keeps his word: they are welcome again.']],
        },
        {
          icon: 'gi/GiFlyingFlag',
          when: [['They decide to keep her.']],
          response: [
            [
              'Nobody punishes them and nobody argues. The welcome stays closed, and the fleet of the ',
              refs.organizations.tempest_family,
              ' still remembers.',
            ],
          ],
        },
      ],
    },
  ],
  outcomes: [
    {
      icon: 'gi/GiSunset',
      when: [['They fly on, off the sky islands.']],
      response: [
        [
          'Run ',
          refs.scenes.a_fleet_on_an_empty_sea,
          ' on the flight. ',
          refs.scenes.hex_loses_patience,
          ' in ',
          refs.locations.rustmoor,
          ' comes after it.',
        ],
      ],
    },
    {
      icon: 'gi/GiConversation',
      when: [
        [
          'They ask ',
          refs.npcs.light_13th_marshal,
          ' about the letter, what he thinks, or what he wants them to do.',
        ],
      ],
      response: [
        [
          'He answers only what is asked, as in ',
          refs.scenes.questions_for_light,
          '. On ',
          refs.npcs.onana_tempest,
          ': “He is a friend. I have few.” On what they should do about the ship: “He wrote that to you, not to me.”',
        ],
      ],
    },
  ],
})
