import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The green beam over the sky islands',
  illustration: '/assets/scenes/the-green-beam-over-the-sky-islands.png',
  location: refs.locations.three_sky_kingdoms,
  npcs: [refs.npcs.abraham, refs.npcs.crowy],
  setup: [
    [
      refs.pcs.swift_starblade,
      ' is on the docks of ',
      refs.locations.nimbus,
      ', close to ',
      refs.pcs.jim,
      '. ',
      refs.pcs.cassian_veyl,
      ' and ',
      refs.pcs.devan,
      ' are in the stables on ',
      refs.locations.skynet,
      '. Run this scene for the whole party together, even while it is split.',
    ],
  ],
  beats: [
    {
      title: 'The first beam',
      lines: [
        {
          do: [
            [
              'A bright green beam strikes the docks of ',
              refs.locations.nimbus,
              ', and part of it explodes outwards across the harbour. Describe it to ',
              refs.pcs.swift_starblade,
              '’s player: he is there to see it first hand.',
            ],
            [{ type: 'image', url: '/assets/scenes/the-green-beam-over-the-sky-islands.png' }],
          ],
        },
        {
          do: [
            [
              'On ',
              refs.locations.skynet,
              ', the sound and the shock bring ',
              refs.pcs.devan,
              ' and ',
              refs.pcs.cassian_veyl,
              ' out of the stables to see what it was.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The second beam',
      lines: [
        {
          do: [
            [
              'Now all of them see it. ',
              refs.pcs.swift_starblade,
              ' sees it up close: a second beam locks onto ',
              refs.pcs.jim,
              '. His last words, the only ones ',
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
              'His body just disappears, and all his gear drops to the ground, along with his tongue, still bearing his guild tattoo.',
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
              ' made the saving throw in ',
              refs.scenes.the_green_pulse_over_the_sky_islands,
              ' and still cares about ',
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
              'The ',
              refs.items.pocket_holy_text_of_grimgor,
              ' falls to the ground too, with a handwritten letter visible in it, flipping slightly towards ',
              refs.pcs.swift_starblade,
              '.',
            ],
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
              'If he noses around the gear, tell him that for some reason he picks up the ',
              refs.items.pocket_holy_text_of_grimgor,
              ' and the written pages. Then hand his player the printed sheets: the coded letter from ',
              refs.pcs.jim,
              ', and page 4 of the book, which the one plain line of the letter points at.',
            ],
            ['Have him find the tongue as well, still bearing the guild tattoo.'],
            [
              'Tell his player that ',
              refs.pcs.swift_starblade,
              ' is repulsed by ',
              refs.items.dagger_of_the_zodiac_signs,
              ' and ',
              refs.items.shadow_sword,
              '. He feels it is really, really dangerous for him to touch them, and he cannot explain why.',
            ],
          ],
        },
        { say: [['Every instinct says touching it kills you.']] },
        {
          note: [
            [
              'He cannot touch ',
              refs.items.dagger_of_the_zodiac_signs,
              ' at all: it would kill him instantly, with no save. His subconscious knows it and stops his hand before he can try.',
            ],
            [
              'The letter calls it the Book of Gruumsh. That is this book: it is the holy text of the ',
              refs.organizations.church_of_gruumsh,
              '.',
            ],
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
        { do: [['Switch to ', refs.pcs.devan, ' and ', refs.pcs.cassian_veyl, '.']] },
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
    {
      title: 'Crowy arrives',
      lines: [
        {
          do: [
            [
              refs.npcs.crowy,
              ' was with ',
              refs.pcs.swift_starblade,
              ' and ',
              refs.pcs.jim,
              ' on ',
              refs.locations.nimbus,
              ', and the beam critically wounded him. Once he is revived there, he flies across to ',
              refs.pcs.devan,
              ' and ',
              refs.pcs.cassian_veyl,
              '. Bring him in a little after the beam, still singed. He remembers who saved him.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Chaos on the islands',
      lines: [
        {
          do: [
            [
              'The populations of all three sky islands are in chaos. The normally calm streets are packed, and the usual links between the islands are clogged.',
            ],
            [
              'On ',
              refs.locations.skynet,
              ', there are few civilians left on the streets. ',
              refs.npcs.old_pell,
              ' boards up his shop, and ',
              refs.npcs.maren_of_fairhaven,
              ' pushes towards the ferries with her child. ',
              refs.npcs.sergeant_bruna_kell,
              ' shouts for recruits from a crate while ',
              refs.npcs.tempest_soldier,
              's drill and load supplies for the rollout.',
            ],
          ],
        },
        {
          note: [
            [
              refs.beasts.wolfie,
              ' and ',
              refs.npcs.abraham,
              ' are at the stables. What happens to them is up to the party: ask before they leave.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          when: [
            ['They head for ', refs.locations.tempest, ' to find ', refs.npcs.onana_tempest, '.'],
          ],
          response: [
            [
              'That way is a sky bridge too, and it is clogged just the same. Run ',
              refs.scenes.the_clogged_ferry_landing,
              '.',
            ],
          ],
        },
        {
          when: [['They stay where they are.']],
          response: [
            [
              refs.npcs.captain_garran,
              ' and his soldiers come to collect them, as they did before (',
              refs.events.n2_e168,
              '). Run ',
              refs.scenes.boarded_by_the_battle_cruiser,
              ' from his questions on.',
            ],
          ],
        },
        {
          when: [['They help ', refs.npcs.maren_of_fairhaven, ' or ', refs.npcs.old_pell, '.']],
          response: [
            ['A friendly face in the chaos, and someone who points them through the back streets.'],
          ],
        },
        {
          when: [['They talk to ', refs.npcs.sergeant_bruna_kell, '.']],
          response: [
            ['She tries to sign them up. Signing gets them a pass through the clogged links.'],
          ],
        },
        {
          when: [
            ['They want to see where the beam hit, or to find ', refs.pcs.swift_starblade, '.'],
          ],
          response: [
            ['The only way across is the ferry. Run ', refs.scenes.the_clogged_ferry_landing, '.'],
          ],
        },
        {
          when: [['They head to the shipyard for their airship.']],
          response: [['Run ', refs.scenes.the_ents_hold_the_shipyard, '.']],
        },
      ],
    },
  ],
})
