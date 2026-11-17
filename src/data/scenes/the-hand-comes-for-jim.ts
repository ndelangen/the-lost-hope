import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The Hand comes for Jim',
  illustration: '/assets/scenes/the-hand-comes-for-jim.png',
  location: refs.locations.nimbus_sky_bridge_landing,
  alternateLocations: [refs.locations.nimbus_harbour_ferry_quay],
  battleMaps: [refs.locations.nimbus_sky_bridge_landing, refs.locations.nimbus_harbour_ferry_quay],
  npcs: [refs.npcs.silas_wren, refs.npcs.cloaked_snatcher, refs.npcs.crowy],
  setup: [
    [
      refs.pcs.swift_starblade,
      ' and ',
      refs.pcs.jim,
      ' walk towards the docks, with ',
      refs.npcs.crowy,
      ' along.',
    ],
  ],
  beats: [
    {
      title: 'The voice behind Swift',
      lines: [
        {
          do: [[refs.npcs.silas_wren, ' speaks from just behind ', refs.pcs.swift_starblade, '.']],
        },
        {
          speaker: refs.npcs.silas_wren,
          say: [
            [
              'Do not get involved, Starblade. We’re not here for you. If you step away now, you won’t be harmed. We’re here for Jim only. It’s time he comes home.',
            ],
          ],
        },
        {
          do: [
            [
              refs.pcs.jim,
              ' is overcome by voices from his past and stumbles. Cloaked agents of ',
              refs.organizations.the_eyeless_hand,
              ' close in around the two of them.',
            ],
          ],
        },
        {
          note: [
            [
              refs.npcs.crowy,
              ' can warn them that they are being followed, and urges them to run. Running takes them towards the docks, and into sight of the flying fortress.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          when: [['', refs.pcs.swift_starblade, ' steps away.']],
          response: [
            [
              'The cloaked men keep their word and let him go. Every one of them turns on ',
              refs.pcs.jim,
              '.',
            ],
          ],
        },
        {
          when: [['', refs.pcs.swift_starblade, ' fights.']],
          response: [
            [
              'Combat. Four men hold him off while the rest go for ',
              refs.pcs.jim,
              '. Run the encounter from this scene.',
            ],
          ],
        },
        {
          when: [['The men try to grapple ', refs.pcs.jim, '.']],
          response: [['He tears free and flees towards the docks.']],
        },
      ],
    },
    {
      title: 'The beam takes Jim',
      lines: [
        {
          do: [
            [
              'A green pulse rolls out across the three sky islands, and people stagger as their memories slip. Then a bright green beam locks onto ',
              refs.pcs.jim,
              '. Part of it bounces off and tears through the docks and the streets beyond. ',
              refs.pcs.jim,
              '’s last words, the only ones ',
              refs.pcs.swift_starblade,
              ' hears:',
            ],
          ],
        },
        {
          speaker: refs.pcs.jim,
          say: [['I’m so sorry. I hope you all make it. Don’t trust Light.']],
        },
        {
          note: [
            ['“Light” in ', refs.pcs.jim, '’s last words is ', refs.npcs.light_13th_marshal, '.'],
          ],
        },
        {
          do: [
            [
              'When the light fades, ',
              refs.pcs.jim,
              ' is gone. His belongings clatter onto the planks, along with his tongue, still bearing his guild tattoo.',
            ],
            [
              'The beam also hits ',
              refs.npcs.crowy,
              '. He drops to the planks, critically wounded and dying.',
            ],
          ],
        },
        {
          note: [
            [
              'Hidden truth: ',
              refs.npcs.the_father,
              ' fires the beam from the flying fortress. It captures ',
              refs.pcs.jim,
              ' and teleports him aboard, without his tongue. The players only see him vanish and his gear fall.',
            ],
            [
              'The destruction is not deliberate. Because ',
              refs.pcs.jim,
              ' is ethereal and carries the guild tattoo, the weapon needed far more power to take him, and the overflow bounced into the docks.',
            ],
            [
              'Casualties (rolled in prep): the memory pulse kills no one. The bounce kills 27 civilians and injures 76 more. It strikes the ferry mid-crossing, the same ferry whose ferryman refused to take ',
              refs.pcs.jim,
              ' aboard (',
              refs.events.n2_e203,
              ').',
            ],
          ],
        },
      ],
      outcomes: [
        {
          when: [['', refs.pcs.swift_starblade, ' saves ', refs.npcs.crowy, '.']],
          response: [
            [
              'Any healing does it, and so does a DC 10 ',
              refs.rules.wis,
              ' (',
              refs.rules.medicine,
              ') check to stop the bleeding. ',
              refs.npcs.crowy,
              ' comes to and will not forget who saved him. Once he can fly, he heads for ',
              refs.pcs.devan,
              ' and ',
              refs.pcs.cassian_veyl,
              '.',
            ],
          ],
        },
        {
          when: [['', refs.pcs.swift_starblade, ' leaves ', refs.npcs.crowy, ' where he fell.']],
          response: [
            [
              'A bystander scoops him up and saves him. ',
              refs.npcs.crowy,
              ' will not forget that ',
              refs.pcs.swift_starblade,
              ' walked away. Once he can fly, he heads for ',
              refs.pcs.devan,
              ' and ',
              refs.pcs.cassian_veyl,
              '.',
            ],
          ],
        },
        {
          when: [
            [
              '',
              refs.pcs.swift_starblade,
              ' makes the saving throw against the pulse and still cares about ',
              refs.pcs.jim,
              '.',
            ],
          ],
          response: [['He takes the tongue, and with it a clue to what the guild mark really is.']],
        },
      ],
    },
    {
      title: 'What is left on the docks',
      lines: [
        {
          do: [
            [
              refs.pcs.swift_starblade,
              ' can investigate the gear that fell: ',
              refs.items.shadow_sword,
              ', ',
              refs.items.dagger_of_the_zodiac_signs,
              ', ',
              refs.items.dagger_of_passive_aggression,
              ', ',
              refs.items.obsidian_green_rod,
              ', ',
              refs.items.robertos_map_pages,
              ', ',
              refs.items.pocket_holy_text_of_grimgor,
              ' and ',
              refs.items.nimbus_dungeon_stamp_card,
              '.',
            ],
            [
              'Make sure he finds the ',
              refs.items.pocket_holy_text_of_grimgor,
              ': the coded letter from ',
              refs.pcs.jim,
              ' is inside it. Hand ',
              refs.pcs.swift_starblade,
              '’s player the printed letter. Its one plain line points at page 4 of the same book: hand him that page too.',
            ],
            ['Have him find the tongue as well, still bearing the guild tattoo.'],
            [
              'Tell his player that ',
              refs.pcs.swift_starblade,
              ' is repulsed by ',
              refs.items.dagger_of_the_zodiac_signs,
              ' and ',
              refs.items.shadow_sword,
              '. He feels it is really, really dangerous for him to touch them, and he cannot explain why. The touch alone makes him roll ',
              refs.rules.con,
              ' ',
              refs.rules.saving_throw,
              's.',
            ],
          ],
        },
        {
          note: [
            [
              'The two blades are meant for ',
              refs.pcs.auren,
              ', who merges with them in ',
              refs.scenes.the_party_reunites_on_the_docks,
              '.',
            ],
          ],
        },
        {
          do: [
            [
              'Decoding it is his job while you run the group on ',
              refs.locations.skynet,
              '. Cut back to him between their scenes and ask how far he is. His own part opens with his own word. The shared part needs all four words, and one of them is the word of ',
              refs.npcs.crowy,
              ', so it will most likely wait until the party is back together.',
            ],
          ],
        },
        {
          note: [
            [
              'If he failed the save against the pulse, he does not remember ',
              refs.pcs.jim,
              '. Hand him the letter anyway: a stranger who knows him this well is the better mystery.',
            ],
          ],
        },
        { do: [['Cut to the group on ', refs.locations.skynet, '.']] },
      ],
      outcomes: [
        {
          when: [['The player gets stuck, or would rather skip the puzzle.']],
          response: [
            [
              'Help in steps, so he keeps something to do. First fill in the table for his own word with him. Then give him his own part decoded. Only then give him the whole letter decoded.',
            ],
            [
              'The whole letter at once is the fastest way out, but it leaves him waiting while you run ',
              refs.locations.skynet,
              '. If you do it, give his other moments on the docks more room: saving ',
              refs.npcs.crowy,
              ', the tongue, and what he does with the gear.',
            ],
          ],
        },
      ],
    },
  ],
  opponents: [
    { creature: refs.npcs.silas_wren, count: 1 },
    { creature: refs.npcs.cloaked_snatcher, count: 12 },
  ],
  combat: {
    tactics: [
      [
        'They want ',
        refs.pcs.jim,
        ' alive and ',
        refs.pcs.swift_starblade,
        ' out of the way. Four pin him down with saps and grabs; the rest grapple ',
        refs.pcs.jim,
        ' and try to drag him off. Saps knock out rather than kill.',
      ],
    ],
    morale: [
      [
        'They break off and melt into the crowd the moment ',
        refs.pcs.jim,
        ' is gone or the green beam strikes. They knew the beam was coming.',
      ],
    ],
    terrain: [
      [
        'A narrow street opening onto the docks: crates, mooring posts, a crowd waiting for the ferry, and open sky past the pier edge.',
      ],
    ],
    exits: [
      ['The docks for ', refs.pcs.jim, '; the side alleys and rooftops for the cloaked men.'],
    ],
  },
})
