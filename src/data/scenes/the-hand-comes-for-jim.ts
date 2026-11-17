import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The Hand comes for Jim',
  illustration: '/assets/scenes/the-hand-comes-for-jim.png',
  location: refs.locations.nimbus_sky_bridge_landing,
  alternateLocations: [refs.locations.nimbus_harbour_ferry_quay],
  battleMaps: [refs.locations.nimbus_sky_bridge_landing, refs.locations.nimbus_harbour_ferry_quay],
  npcs: [refs.npcs.silas_wren, refs.npcs.cloaked_snatcher, refs.npcs.crowy],
  references: [
    refs.pcs.jim,
    refs.pcs.swift_starblade,
    refs.organizations.the_eyeless_hand,
    refs.npcs.the_father,
    refs.npcs.light_13th_marshal,
    refs.pcs.devan,
    refs.pcs.cassian_veyl,
  ],
  setup: [
    [
      refs.pcs.swift_starblade,
      ' and ',
      refs.pcs.jim,
      ' walk towards the docks, with ',
      refs.npcs.crowy,
      ' along. ',
      refs.npcs.silas_wren,
      ' speaks from just behind ',
      refs.pcs.swift_starblade,
      ':',
    ],
    [
      '“Do not get involved, Starblade. We’re not here for you. If you step away now, you won’t be harmed. We’re here for Jim only. It’s time he comes home.”',
    ],
    [
      refs.pcs.jim,
      ' is overcome by voices from his past and stumbles. Thirteen men in cloaks close in around the two of them.',
    ],
  ],
  notes: [
    [
      refs.npcs.crowy,
      ' can warn them that they are being followed, and urges them to run. Running takes them towards the docks, and into sight of the flying fortress.',
    ],
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
    {
      when: [['', refs.pcs.jim, ' comes within sight of the flying fortress.']],
      response: [
        [
          'A green pulse rolls out across the three sky islands, and people stagger as their memories slip. Then a bright green beam locks onto ',
          refs.pcs.jim,
          '. Part of it bounces off and tears through the docks and the streets beyond. ',
          refs.pcs.jim,
          '’s last words, the only ones ',
          refs.pcs.swift_starblade,
          ' hears:',
        ],
        ['“I’m so sorry. I hope you all make it. Don’t trust Light.”'],
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
      followUps: [
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
      when: [['', refs.pcs.swift_starblade, ' gathers what is left on the docks.']],
      response: [
        [
          'Whatever he remembers, the gear is worth taking: ',
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
        ['Cut to the group on Skynet.'],
      ],
    },
  ],
  combat: {
    tactics: [
      [
        'They want ',
        refs.pcs.jim,
        ' alive and ',
        refs.pcs.swift_starblade,
        ' out of the way. Four pin him down with saps and grabs; nine grapple ',
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
