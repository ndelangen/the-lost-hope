import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Light reads Onana’s letter',
  location: refs.locations.fajanet_guildhall,
  npcs: [refs.npcs.light_13th_marshal],
  setup: [
    [
      'Only if the party ran off with ',
      refs.items.ride_the_lightning,
      ' in ',
      refs.scenes.garran_comes_for_the_cruiser,
      '. The next time they stand before ',
      refs.npcs.light_13th_marshal,
      ', he has a letter from ',
      refs.npcs.onana_tempest,
      ' on his desk.',
    ],
    [
      'The party expects fury. The letter does not read that way. Why is in the motivations of ',
      refs.npcs.onana_tempest,
      ' and the background of the ',
      refs.organizations.tempest_family,
      '.',
    ],
  ],
  beats: [
    {
      title: 'A letter from Tempest',
      lines: [
        {
          do: [
            [
              refs.npcs.light_13th_marshal,
              ' puts down his pen, picks a single sheet off the pile, and looks at the party over it.',
            ],
          ],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['This came for me. It is about you. I will read it once.']],
        },
        {
          note: [['Read it evenly, in his voice, without comment. Let the players react first.']],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [
            ['“To Light, with my regards.'],
            [
              'You will have heard that your adventurers left with one of my ships. I am told I should be furious. I find that I am not.',
            ],
            [
              'I asked them to take a cruiser back from an enemy that had just broken my fleet in a single raid. They did. Then they looked my captain in the eye, weighed his order, and decided for themselves.',
            ],
            ['Their will is their own. You and I both know how rare that has become.'],
            ['I do want my ship back. She is one of the few I have left, and she was not a gift.'],
            [
              'So tell them this from me, word for word: bring her home, and you are welcome at my table again. No debt, and no grudge.',
            ],
            ['They have promise, old friend. Do not waste them on errands.'],
            ['Onana Tempest.”'],
          ],
        },
        {
          do: [
            [
              refs.npcs.light_13th_marshal,
              ' lays the letter down and picks up his pen again. He gives no advice and no order.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiShipWheel',
          when: [['They decide to bring ', refs.items.ride_the_lightning, ' back.']],
          response: [
            [
              refs.npcs.onana_tempest,
              ' keeps his word: they are welcome again, with no debt and no grudge.',
            ],
          ],
        },
        {
          icon: 'gi/GiFlyingFlag',
          when: [['They decide to keep her.']],
          response: [
            [
              refs.npcs.light_13th_marshal,
              ' does not punish them and does not argue. The welcome stays closed, and the fleet of the ',
              refs.organizations.tempest_family,
              ' still remembers.',
            ],
          ],
        },
        {
          icon: 'gi/GiConversation',
          when: [
            [
              'They ask ',
              refs.npcs.light_13th_marshal,
              ' what he thinks, or what he wants them to do.',
            ],
          ],
          response: [
            [
              'He answers only what is asked, as in ',
              refs.scenes.questions_for_light,
              '. On ',
              refs.npcs.onana_tempest,
              ': “He is a friend. I have few.” On what they should do: “He wrote to you, not to me.”',
            ],
          ],
        },
      ],
    },
  ],
})
