import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Hex loses patience',
  location: refs.locations.rustmoor_guildhall,
  illustrations: ['/assets/scenes/hex-loses-patience.png'],
  npcs: [refs.npcs.hex, refs.npcs.light_13th_marshal],
  setup: [
    [
      refs.npcs.hex,
      ' is waiting in the guildhall the party goes to on the advice of ',
      refs.npcs.onana_tempest,
      ' in ',
      refs.scenes.onana_sends_the_party_on,
      '. They have been members for a while and still have not asked ',
      refs.npcs.light_13th_marshal,
      ' a single hard question.',
    ],
    [
      'The guildhall is not fully operational yet. Its booth has no connection to ',
      refs.locations.fajanet,
      ': that is perhaps a few days away. ',
      refs.locations.the_flying_whale,
      ', the ship of ',
      refs.npcs.sylvia,
      ', is in ',
      refs.locations.rustmoor,
      ' too.',
    ],
    [
      'It is the evening of the full moon. The party has just arrived in ',
      refs.locations.rustmoor,
      ' and met ',
      refs.npcs.bob_the_merchant,
      ' in ',
      refs.scenes.bob_returns_cassian_s_ring,
      '. The moon matters for ',
      refs.items.shadow_sword,
      ' and ',
      refs.items.swifts_silver_container,
      ' of ',
      refs.pcs.swift_starblade,
      ': ',
      refs.scenes.swift_s_silver_container_opens,
      '.',
    ],
    [
      'What the party does not know is in the motivations of ',
      refs.npcs.hex,
      ' and the background of the ',
      refs.organizations.adventurers_guild,
      '. ',
      refs.npcs.hex,
      ' was let in only recently, remembers standing where the party stands now, and may not explain anything.',
    ],
    [
      'After this, the party has time to kill until midnight: some shopping, and a tavern. Lead them to the tavern and run ',
      refs.scenes.the_bard_s_new_song,
      '. At midnight they head out for the quest of ',
      refs.npcs.bob_the_merchant,
      ': ',
      refs.scenes.four_stomps_under_the_moon,
      '.',
    ],
  ],
  beats: [
    {
      title: 'Why are you not asking?',
      lines: [
        {
          do: [
            [
              refs.npcs.hex,
              ' listens to the party talk about their latest job, and finally cannot keep quiet.',
            ],
          ],
        },
        {
          speaker: refs.npcs.hex,
          say: [
            [
              'Do you really think that by going on simple adventures you are truly fulfilling the agenda of ',
              refs.npcs.light_13th_marshal,
              '?',
            ],
            ['Do you think the adventurers’ guild is all there is?'],
            [
              'You must have heard by now that ',
              refs.npcs.light_13th_marshal,
              ' is not allowed to have land, and can’t travel.',
            ],
            ['WHEN ARE YOU GOING TO START ASKING QUESTIONS?!'],
          ],
        },
        {
          note: [
            [
              'That is all the help they get. The last line hands them their first question; let them pick it up themselves.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiConversation',
          when: [['They ask ', refs.npcs.hex, ' what is really going on.']],
          response: [
            [
              refs.npcs.hex,
              ' shakes their head: it is not theirs to tell, and they would not be believed anyway. “Ask him. He is waiting for you to.”',
            ],
          ],
        },
        {
          icon: 'gi/GiPathDistance',
          when: [['They decide to go and ask.']],
          response: [
            [
              'From this guildhall the way to ask is the booth, and it is not connected yet: perhaps in a few days.',
            ],
            [
              'Let the party find creative ways to speed this up. The crawl among the rubble is ',
              refs.scenes.down_through_the_rubble,
              '. Once the booth works, play “At the booth”.',
            ],
          ],
        },
        {
          icon: 'gi/GiShrug',
          when: [['They laugh it off, or take offence.']],
          response: [
            [
              refs.npcs.hex,
              ' shrugs and lets it go. The questions stay with the party, and ',
              refs.npcs.light_13th_marshal,
              ' keeps waiting.',
            ],
          ],
        },
      ],
    },
    {
      title: 'At the booth',
      onlyIf: [['They decide to go and ask, and the booth is connected.']],
      lines: [
        {
          do: [
            [
              'The party steps up to the booth of the guildhall. On the other side ',
              refs.npcs.light_13th_marshal,
              ' sits behind stacks of paper, writing.',
            ],
          ],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [
            ['You have come to ask me something. Good.'],
            ['But you have brought someone I have not met.'],
            [refs.pcs.auren, ', step in. Alone, please.'],
            ['The rest of you, keep your questions until he and I are done.'],
          ],
        },
        {
          note: [
            [
              'These lines are a draft. To the party this looks like the induction every recruit gets: a tattoo and a favor.',
            ],
            [
              'The booth carries one person. ',
              refs.pcs.auren,
              ' arrives in the office of ',
              refs.npcs.light_13th_marshal,
              ' in ',
              refs.locations.fajanet,
              ', in person and cut off from the party for the night. Nobody can follow him.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiPathDistance',
          when: [[refs.pcs.auren, ' steps in.']],
          response: [
            [
              'Run ',
              refs.scenes.light_walks_auren_through_fajanet,
              '. The others stay behind in the guildhall: that evening, run ',
              refs.scenes.fix_s_last_delivery,
              ' for them and cut between the two.',
            ],
            [
              'The next morning the booth opens again. Once ',
              refs.pcs.auren,
              ' has passed, run ',
              refs.scenes.questions_for_light,
              '.',
            ],
          ],
        },
      ],
    },
  ],
})
