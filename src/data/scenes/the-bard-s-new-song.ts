import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'The bard’s new song',
  location: refs.locations.rustmoor,
  illustrations: ['/assets/scenes/the-bard-s-new-song.png'],
  npcs: [
    refs.npcs.tobin_reedwhistle,
    refs.npcs.hagel_boos,
    refs.npcs.flyn_etchersen,
    refs.npcs.jake_kinner,
  ],
  setup: [
    [
      'The full-moon evening the party arrives in ',
      refs.locations.rustmoor,
      ', after ',
      refs.scenes.bob_returns_cassian_s_ring,
      ', while they kill time before the maze at midnight. They end up in a tavern. ',
      refs.npcs.tobin_reedwhistle,
      ' is by the hearth with a new song called “Still Alive”, written last night.',
    ],
    [
      'What the party does not know: the song is a message from ',
      refs.pcs.jim,
      '. He writes for ',
      refs.npcs.the_father,
      ' again, and slipped it into the bard’s night as a change small enough to leave the man’s mind whole. ',
      refs.npcs.the_father,
      ' reads everything ',
      refs.pcs.jim,
      ' writes, so the message hides in what is missing: each verse ends on a key word from the letter where its rhyme should be. The rhymes that belong there are caged, high, write and lies.',
    ],
    [
      refs.npcs.tobin_reedwhistle,
      ' has never heard of ',
      refs.pcs.jim,
      ' and believes every word is his own. He is honest, and no magic is on him to find.',
    ],
  ],
  beats: [
    {
      title: 'A silver for a song',
      lines: [
        {
          do: [
            [
              'Around the tavern sit several people with the same look as the Dust-lost sailors on ',
              refs.items.ride_the_lightning,
              ': silver glitter in glassy eyes that never really look at anyone, absent, almost like zombies, but alive.',
            ],
          ],
        },
        {
          do: [
            [
              refs.npcs.tobin_reedwhistle,
              ' unfolds a small pipe, lights it, and smiles at the party over the bowl. Something in the bowl glitters silver, and the smoke smells sweet and faintly of metal.',
            ],
          ],
        },
        {
          note: [
            [
              'He is smoking Arcane Dust. Do not name it or point it out: it is up to the players to pay attention.',
            ],
          ],
        },
        {
          speaker: refs.npcs.tobin_reedwhistle,
          say: [
            [
              'I’ve a new one. It came to me in the night, all at once, and I wrote it down before it could leave.',
            ],
            ['It’s very fresh. It may need a little tweaking still.'],
            ['One silver piece, and you’ll be the first to hear it.'],
          ],
        },
        {
          note: [
            [
              'If nobody pays, another table does, and the party hears it anyway. The song must be sung.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Still Alive',
      lines: [
        {
          note: [
            [
              'Sing or read it straight. He lands on the last word of each verse as if it belongs there, without a wink or a pause.',
            ],
          ],
        },
        {
          speaker: refs.npcs.tobin_reedwhistle,
          say: [
            ['A songbird grew old as it aged,'],
            ['while wintery tempests all raged.'],
            ['They took the arcane,'],
            ['and did not stay sane:'],
            ['but yes, it still sings whilst it’s STEVE.'],
          ],
        },
        {
          speaker: refs.npcs.tobin_reedwhistle,
          say: [
            ['It sees the silver dust drift by,'],
            ['its poison now darkens the sky.'],
            ['It spreads, town by town,'],
            ['the bird can’t come down:'],
            ['its perch has been hung far too CHEESE.'],
          ],
        },
        {
          speaker: refs.npcs.tobin_reedwhistle,
          say: [
            ['A few keep its memory bright,'],
            ['they ride through the storm and the night.'],
            ['Its flight was in vain,'],
            ['it’s caught once again:'],
            ['it hides in the songs others PARROT.'],
          ],
        },
        {
          speaker: refs.npcs.tobin_reedwhistle,
          say: [
            ['Its keeper has no use for eyes,'],
            ['they buried its burnt-up disguise.'],
            ['It’s not in the ground,'],
            ['it’s still to be found,'],
            ['for now it’s back forced to write SLEEP.'],
          ],
        },
      ],
    },
    {
      title: 'How would you improve it?',
      lines: [
        {
          speaker: refs.npcs.tobin_reedwhistle,
          say: [
            ['Well? Be honest with me.'],
            [
              'I know the ends of the verses don’t sit right yet. Those four words were simply there when I woke.',
            ],
            ['How would you improve it?'],
          ],
        },
        {
          note: [
            [
              'Give the players time to talk it over among themselves. The best moment is when they supply the rhymes themselves.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiPuzzle',
          when: [['The party offers the rhymes that fit.']],
          response: [
            [
              refs.npcs.tobin_reedwhistle,
              ' is delighted, writes them in, and sings the last lines again with the new words. He thanks them and has no idea what he has just said.',
            ],
          ],
        },
        {
          icon: 'gi/GiConversation',
          when: [['They ask where the song or the four words came from.']],
          response: [
            [
              'He woke with all of it in his head and thought it the best night’s work of his life. The words mean nothing to him. He has never met a ',
              refs.pcs.jim,
              ' and knows nothing of a caged bird.',
            ],
          ],
        },
        {
          icon: 'gi/GiMagnifyingGlass',
          when: [['They search him with magic or test whether he is lying.']],
          response: [
            [
              'Nothing. He is not charmed, not possessed, and telling the truth. The change was made in a dream and left no trace.',
            ],
          ],
        },
        {
          icon: 'gi/GiHand',
          when: [['They press him hard, or insist the song is not his.']],
          response: [
            [
              'He grows confused and hurt, rubs his temples, and packs up his pipe. He wrote “Still Alive” all by himself, and he will say so to anyone.',
            ],
          ],
        },
      ],
    },
    {
      title: 'The navy men',
      lines: [
        {
          do: [
            [
              'Three old sailors at a corner table have been watching the party: ',
              refs.npcs.hagel_boos,
              ', ',
              refs.npcs.flyn_etchersen,
              ' and ',
              refs.npcs.jake_kinner,
              '. They are ex-navy, and they come over: they want to talk, and they want out of ',
              refs.locations.rustmoor,
              '. They call each other by their last names, except Kinner, who is Boozy.',
            ],
          ],
        },
        {
          note: [
            [
              'Who they are is in the background of ',
              refs.locations.rustmoor,
              ': they have always kept logbooks, they do not know why it helps, and they take Arcane Dust to dim the pain of the mates they lost. Let them tell how those mates lost interest in shipping and drifted here.',
            ],
          ],
        },
        {
          do: [['Before the talk ends, they ask to come with the party when it leaves.']],
        },
        {
          note: [
            [
              'They have been trying to leave for a month or so. No merchant will take them: the holds are kept for salvage, and nobody wants Dust users aboard.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiShakingHands',
          when: [['The party says yes.']],
          response: [
            [
              'They join the party until the next place the ship docks, and will likely leave there. See how it goes.',
            ],
          ],
          followUps: [
            {
              icon: 'gi/GiShipWheel',
              when: [[refs.pcs.swift_starblade, ' wants them to stay on as his crew.']],
              response: [
                [
                  'They could become his crew, which is what he wants. ',
                  refs.npcs.flyn_etchersen,
                  ' has to be convinced to stay and work for a pirate. He might accept it, since the party has only one pirate, and a paladin, ',
                  refs.pcs.devan,
                  ', to balance it out.',
                ],
              ],
            },
          ],
        },
        {
          icon: 'gi/GiCancel',
          when: [['The party says no.']],
          response: [
            [
              refs.npcs.hagel_boos,
              ': “Yeah, we figured. It’s been the standard answer for about a month. Y’all have a good one.”',
            ],
            [
              'They go back to their own table. Then ',
              refs.npcs.jake_kinner,
              ' comes back for one more try:',
            ],
            [
              '“Look, we’re navy men, we’re good men. We can man cannons, we’re experienced. Please, man, we just want to get out of here. We’re getting desperate.”',
            ],
          ],
        },
      ],
    },
  ],
  outcomes: [
    {
      icon: 'gi/GiPathDistance',
      when: [['They have wasted enough time here.']],
      response: [
        [
          'It is nearly midnight. They head out for the quest of ',
          refs.npcs.bob_the_merchant,
          ': run ',
          refs.scenes.four_stomps_under_the_moon,
          '.',
        ],
      ],
    },
  ],
})
