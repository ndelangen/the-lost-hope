import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The green beam over the sky islands',
  illustrations: ['/assets/scenes/the-green-beam-over-the-sky-islands.png'],
  location: refs.locations.three_sky_kingdoms,
  npcs: [refs.npcs.crowy],
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
          say: [['I’m so sorry Swifty, you have to listen! Take the ship and…']],
        },
        {
          do: [
            [
              'The beam cuts him off. His body just disappears, and all his gear drops to the ground, along with his tongue, still bearing his guild tattoo.',
            ],
            [
              'The beam also hits ',
              refs.npcs.crowy,
              '. He drops to the planks in front of ',
              refs.pcs.swift_starblade,
              ': not dead, but dying.',
            ],
          ],
        },
        {
          do: [
            [
              'Tell ',
              refs.pcs.swift_starblade,
              '’s player plainly: the bird is bleeding out, he can still be saved, and it would not take much. Then ask what he does. Saving ',
              refs.npcs.crowy,
              ' or letting him die is his choice. Do not steer it.',
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
              'Any healing does it, and so does a DC 5 ',
              refs.rules.wis,
              ' (',
              refs.rules.medicine,
              ') check to stop the bleeding: he is a small bird, and it takes little. A failed check can be tried again the next round. ',
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
              refs.npcs.crowy,
              ' dies on the planks. Nobody else steps in: this is ',
              refs.pcs.swift_starblade,
              '’s choice, and it stands.',
            ],
            [
              'He does not arrive on ',
              refs.locations.skynet,
              ', and the later scenes go on without him. The shared part of the letter from ',
              refs.pcs.jim,
              ' is then missing his word.',
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
        {
          do: [
            [
              'Cut here, with ',
              refs.pcs.swift_starblade,
              ' bent over the letter. Go on with ',
              refs.pcs.devan,
              ' and ',
              refs.pcs.cassian_veyl,
              ' in ',
              refs.scenes.chaos_on_the_sky_islands,
              '.',
            ],
          ],
        },
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
              '. If you do it, give his other moments on the docks more room: what he does about ',
              refs.npcs.crowy,
              ', the tongue, and what he does with the gear.',
            ],
          ],
        },
      ],
    },
  ],
})
