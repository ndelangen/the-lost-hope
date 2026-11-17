import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Onana calls the party to war',
  illustration: '/assets/scenes/onana-calls-the-party-to-war.png',
  location: refs.locations.master_of_puppets_commanders_office,
  battleMaps: [
    refs.locations.master_of_puppets_main_deck,
    refs.locations.master_of_puppets_gun_deck,
  ],
  npcs: [refs.npcs.onana_tempest, refs.npcs.captain_garran],
  setup: [
    [
      refs.npcs.captain_garran,
      ' brings the party to ',
      refs.npcs.onana_tempest,
      ' in his office aboard his battle-cruiser, ',
      refs.items.master_of_puppets,
      ', as it turns towards ',
      refs.locations.nimbus,
      '. He talks fast and does not sit down.',
    ],
  ],
  beats: [
    {
      title: 'Before you start',
      lines: [
        { do: [['Give every player a card with their character’s name on it.']] },
        {
          note: [
            [
              'If the party outran the cruiser, it is docked next to their vessel at ',
              refs.locations.nimbus,
              ' and ',
              refs.pcs.swift_starblade,
              ' is with them. He stands in the Zone of Truth too, and he is the one who was on the docks when the beam struck.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Welcome aboard',
      lines: [
        {
          speaker: refs.npcs.onana_tempest,
          say: [
            [
              refs.organizations.beasts_and_dwarf,
              ', welcome to my battle-cruiser, ',
              refs.items.master_of_puppets,
              '.',
            ],
          ],
        },
        {
          note: [
            ['He thinks to himself: interesting how well that name applies to this situation.'],
          ],
        },
        { do: [['A jukebox in the corner is playing.']] },
      ],
    },
    {
      title: 'The jukebox',
      onlyIf: [['Someone looks at the jukebox.']],
      lines: [
        {
          speaker: refs.npcs.onana_tempest,
          say: [['Yeah, we have little use for a bard here.']],
        },
        {
          note: [
            [
              'The bard line is a quiet hint at ',
              refs.pcs.jim,
              ', the party’s bard, who is gone. Do not explain it; let it land.',
            ],
          ],
        },
        {
          do: [
            [
              refs.pcs.auren,
              ' has never seen a machine like the jukebox. Let him study it while the others talk: an ',
              refs.rules.arcana,
              ' or tinker’s check shows how the arm, the discs and the turntable work together. ',
              refs.npcs.onana_tempest,
              ' is too busy to mind.',
            ],
          ],
        },
      ],
    },
    {
      title: 'We are at war',
      lines: [
        {
          speaker: refs.npcs.onana_tempest,
          say: [
            ['Anyway. I do not have much time. Sorry for taking your vessel. We are at war now.'],
            [
              refs.organizations.the_eyeless_hand,
              ' is determined to do to us what they did to ',
              refs.locations.fairhaven,
              '. They won’t succeed.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The questioning',
      lines: [
        {
          do: [
            [
              'He casts a small Zone of Truth around the party and then Detect Thoughts, both in plain sight.',
            ],
            [
              'Zone of Truth: everyone in it makes the save from his stat block. Whoever fails cannot tell a deliberate lie, but may stay silent or dodge the question. ',
              refs.npcs.onana_tempest,
              ' knows who failed.',
            ],
          ],
        },
        {
          note: [
            [
              'A character can recognise Detect Thoughts as he casts it with a DC 17 ',
              refs.rules.arcana,
              ' check. ',
              refs.pcs.auren,
              ' is the likeliest to make it.',
            ],
            [
              'The questions are mild, so nobody has much reason to lie. ',
              refs.pcs.cassian_veyl,
              ' is the likeliest to resist the spell. If he does, tell his player he could lie if he wanted to, and leave what he does with that to him.',
            ],
          ],
        },
        {
          do: [
            [
              'He puts the same two questions to each party member in the room, one at a time, and reads that one’s thoughts as they answer.',
            ],
          ],
        },
        {
          speaker: refs.npcs.onana_tempest,
          say: [['Are you associated with ', refs.organizations.the_eyeless_hand, ' in any way?']],
        },
        {
          speaker: refs.npcs.onana_tempest,
          say: [['Are you, or have you been, under the influence of arcane dust recently?']],
        },
        {
          note: [
            [
              'The arcane dust question is a major hint. Ask it word for word, of every party member: “under the influence” is not the same as “used”.',
            ],
          ],
        },
        {
          say: [
            [
              refs.npcs.onana_tempest,
              ' asks you this question and probes your mind for your true thoughts about it. Write down what your character is truly thinking right now.',
            ],
          ],
        },
        {
          do: [
            [
              'The thoughts go on the cards. Tell all the players at once. One sentence for each question, about thirty seconds.',
            ],
            [
              'They answer aloud in turn while the others write, so the table hears the spoken answers and only you see the thoughts.',
            ],
            [
              'Read the cards silently, then play the reaction of ',
              refs.npcs.onana_tempest,
              ' to each character out loud: he reacts to the thought, not to the spoken answer.',
            ],
          ],
        },
        {
          note: [
            [
              'Detect Thoughts: reading surface thoughts needs no save. He only probes deeper when someone resisted the Zone of Truth and their answer sounds off. That is the ',
              refs.rules.wis,
              ' save in his stat block, and the target feels it either way.',
            ],
          ],
        },
        {
          do: [
            [
              'Keep the cards. The recording will not hold the thoughts, so they are the only record for the session notes.',
            ],
          ],
        },
      ],
      outcomes: [
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
      ],
    },
    {
      title: 'The rest of the party',
      onlyIf: [
        [
          refs.pcs.swift_starblade,
          ' is not with them. When he is, nobody needs collecting afterwards.',
        ],
      ],
      lines: [
        {
          speaker: refs.npcs.onana_tempest,
          say: [['Where is the rest of your party?']],
        },
      ],
      outcomes: [
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
      ],
    },
    {
      title: 'The offer',
      lines: [
        {
          speaker: refs.npcs.onana_tempest,
          say: [
            [
              'We do not have time to chat now, ',
              refs.organizations.beasts_and_dwarf,
              '. Once the war is over I will tell you more. Right now I have twenty battle-cruisers, but some are somehow under the control of ',
              refs.organizations.the_eyeless_hand,
              '. I will give you back your vessel if you promise to help me with this war.',
            ],
          ],
        },
        {
          note: [
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
        },
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
              ', the nearest cruiser firing on its own side. Run ',
              refs.scenes.boarding_ride_the_lightning,
              '.',
            ],
            [
              'He also has ',
              refs.npcs.captain_garran,
              ' give each of them three Potions of Healing and one ',
              refs.items.long_rest_in_a_bottle,
              ', from his own reserve. A Potion of Healing restores 2d4 + 2 ',
              refs.rules.hit_points,
              ' and takes a ',
              refs.rules.bonus_action,
              ' to drink.',
            ],
            [
              'Nobody has rested today. When they drink the ',
              refs.items.long_rest_in_a_bottle,
              ' is up to them: before they board, or in the middle of the fight. The day does not move: press “Long rest”, not “New day”.',
            ],
          ],
          followUps: [
            {
              when: [
                ['They ask what is in the ', refs.items.long_rest_in_a_bottle, ', now or later.'],
              ],
              response: [
                [
                  refs.npcs.onana_tempest,
                  ' tells them the truth about it, shown below. He does not bring it up himself. Whether they still drink is their call: let the silence sit.',
                ],
              ],
            },
          ],
        },
      ],
    },
  ],
  outcomes: [
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
