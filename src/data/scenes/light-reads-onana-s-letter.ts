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
            ['“To the 13th Marshal Light, from Onana Tempest.'],
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
            [
              'Would you be so kind to tell them I expect my ship returned to me, and that once so, they are welcome again.”',
            ],
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
          response: [[refs.npcs.onana_tempest, ' keeps his word: they are welcome again.']],
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
