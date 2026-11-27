import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Light walks Auren through Fajanet',
  location: refs.locations.fajanet,
  illustrations: [
    '/assets/scenes/light-walks-auren-through-fajanet.png',
    '/assets/scenes/light-walks-auren-through-fajanet-night.png',
  ],
  alternateLocations: [
    refs.locations.rare_animal_dealer_s_premises,
    refs.locations.fajanet_guildhall,
  ],
  npcs: [refs.npcs.light_13th_marshal, refs.npcs.hex],
  setup: [
    [
      'Before he answers anything, ',
      refs.npcs.light_13th_marshal,
      ' wishes to speak to ',
      refs.pcs.auren,
      ' alone, and he does the asking. He has ',
      refs.npcs.hex,
      ' fetch him in the night after ',
      refs.scenes.four_stomps_under_the_moon,
      ', while the others sleep, and opens the booth of the ',
      refs.locations.rustmoor_guildhall,
      ' for one person. That puts ',
      refs.pcs.auren,
      ' in ',
      refs.locations.fajanet,
      ' in person, where it is afternoon, and cuts him off from the party. He takes him out into the city instead of staying in his paper-filled office.',
    ],
    [
      'The rest of the party is asleep in ',
      refs.locations.rustmoor,
      ', so this is a scene for one player while the others watch.',
    ],
    [
      'What ',
      refs.npcs.light_13th_marshal,
      ' is really doing: he suspects ',
      refs.pcs.auren,
      ' is a spy, or something else. A very old construct turned up out of nowhere with records of ',
      refs.organizations.the_eyeless_hand,
      ' (',
      refs.events.n2_e218,
      ') and attached himself to his adventurers. ',
      refs.npcs.light_13th_marshal,
      ' has learned what he once was: a man put into a body of metal, by a maker who is now dead. He does not know what he is now, and he is willing to let the shadow take him to find out.',
    ],
    [
      'The walk comes after the party has been to ',
      refs.locations.the_caves_of_steel,
      ' and has found the guildhall still under construction. Some of his questions are there to let the player say what he wants for ',
      refs.pcs.auren,
      '. Give those room, and build on the answers.',
    ],
  ],
  beats: [
    {
      title: 'Before the session',
      lines: [
        {
          do: [
            [
              'Ask ',
              refs.pcs.auren,
              '’s player privately: is there anything ',
              refs.pcs.auren,
              ' has not told anyone? His backstory is his, so whether he is hiding something is his answer, and the bluff becomes real on both sides of the screen.',
            ],
          ],
        },
        {
          note: [
            [
              'Not passing the walk is the death of ',
              refs.pcs.auren,
              '. Consider briefing his player beforehand that this scene can kill his character, without saying how.',
            ],
          ],
        },
        {
          note: [
            [
              refs.pcs.auren,
              '’s player is the campaign’s previous DM, who created ',
              refs.locations.fajanet,
              '. This walk lets him admire his own city. He also remembers what happens there at night (',
              refs.events.n2_e007,
              ').',
            ],
          ],
        },
      ],
    },
    {
      title: 'Hex comes for Auren',
      lines: [
        {
          do: [
            [
              'The others are asleep at the tavern. ',
              refs.npcs.hex,
              ' comes for ',
              refs.pcs.auren,
              ', who does not sleep, and brings him to the ',
              refs.locations.rustmoor_guildhall,
              '.',
            ],
            [
              'The booth is lit: ',
              refs.npcs.light_13th_marshal,
              ' has opened it for one person. ',
              refs.pcs.auren,
              ' steps through, out of the small hours of the night and into the afternoon of ',
              refs.locations.fajanet,
              '.',
            ],
          ],
        },
        {
          note: [
            [
              'The booth carries one person, and nobody can follow him. To him this looks like the induction every recruit gets: a tattoo and a favor.',
            ],
          ],
        },
      ],
    },
    {
      title: 'A stroll through Fajanet',
      lines: [
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['Shall we have a walk in the park?']],
        },
        {
          say: [
            [
              'The grass is soft and green, the fountain sparkles, the mountain range stands clear in the distance, and rare animals wander the streets. It is such a beautiful place.',
            ],
          ],
        },
        {
          note: [
            [
              'Early on, ask ',
              refs.pcs.auren,
              '’s player where his favourite spot in ',
              refs.locations.fajanet,
              ' is, and have ',
              refs.npcs.light_13th_marshal,
              ' take him there.',
            ],
          ],
        },
      ],
    },
    {
      title: 'A one-sided interview',
      lines: [
        {
          note: [
            [
              refs.npcs.light_13th_marshal,
              ' asks and never answers. He turns every question back, or lets it hang. He watches for anything that sounds too informed or too rehearsed.',
            ],
            [
              'Keep to the rhythm: a serious question, then a casual one, then a serious one, then a casual one. The casual ones keep him friendly and hard to read.',
            ],
          ],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['You have a body made of metal and magic. How do you like it?']],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['Do you not miss having a human body?']],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [
            ['What do you think of the situation the world finds itself in?'],
            ['This ballet of balance: the good and the evil clashing, shifting.'],
            ['And the poison infesting the world. What do you make of it?'],
          ],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['Do you sleep? I never got the hang of it myself.']],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [
            [
              'The defining characteristic of freedom is that it is respected by others. Do you find you have such freedom?',
            ],
          ],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['You think yourself free, Auren, but does the world agree?']],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['Will it?']],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['Can you feel fear?'], ['Do you fear death?']],
        },
        {
          note: [
            [
              'Ask these two while the sun is still high, so they sound like curiosity about a construct. Whatever he answers is what sunset will test. He was once awake behind his own eyes without a will of his own, so he may fear losing his will more than death. If so, ',
              refs.npcs.light_13th_marshal,
              ' asks: “Then what do you fear?”',
            ],
          ],
        },
      ],
    },
    {
      title: 'So who will you choose to be?',
      lines: [
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['So who will you choose to be?']],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [
            [
              'An avenger? I will have to disappoint you there. I regret to inform you that the best you can do is step on his grave. Is that your wish?',
            ],
          ],
        },
        {
          note: [['He means ', refs.npcs.magister_orrin_valdrek, ', who is dead.']],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [
            ['A liberator? Freeing those who are oppressed and serve evil masters unwillingly?'],
          ],
        },
        {
          note: [
            [
              'He means the thralls of ',
              refs.npcs.the_11th_marshal,
              ' the party has just seen in ',
              refs.locations.the_caves_of_steel,
              '.',
            ],
          ],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['An adventurer? A free agent, fighting for whatever cause the day brings?']],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [
            [
              'What is in your future, Auren? As there likely is so much of it, with a body like yours.',
            ],
          ],
        },
      ],
    },
    {
      title: 'How much do you remember?',
      lines: [
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [
            ['How much do you remember of yesterday?'],
            ['How about last month?'],
            ['How about last year?'],
            ['How about last decade?'],
            ['How about... last century?'],
          ],
        },
        {
          note: [
            [
              'Casual and indirect. Ask them one at a time and let each answer land: they lead up to the next question.',
            ],
          ],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['Do you have a perfect memory?']],
        },
        {
          note: [
            [
              'By now his answers to the casual questions have shown how far back he remembers. A “no” after a detailed answer about last century is a tell ',
              refs.npcs.light_13th_marshal,
              ' can act on.',
            ],
            [
              'If he answers no, the test is reduced to one thing: is the level of fear he shows tonight correct? If it is, ',
              refs.npcs.light_13th_marshal,
              ' saves him.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Such a beautiful sunset',
      lines: [
        {
          note: [
            [
              'Until he says he is leaving, ',
              refs.npcs.light_13th_marshal,
              ' never hints at danger. He stays super casual and friendly.',
            ],
          ],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['How beautiful a sunset it will soon be.']],
        },
        {
          do: [
            [
              refs.npcs.light_13th_marshal,
              ' excuses himself: he has to get back to important work. He urges ',
              refs.pcs.auren,
              ' to stay and enjoy the sunset for a while.',
            ],
          ],
        },
        {
          note: [
            [
              'The excuse is true, and it is a hint: time he spends talking is time he is not writing. What that costs is in the background of ',
              refs.npcs.light_13th_marshal,
              '. Do not explain it here.',
            ],
          ],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['May I offer you a way to reclaim your humanity, perhaps?']],
        },
        {
          note: [
            [
              'At the table: this is the moment to hand the player a physical copy of The Bicentennial Man by Isaac Asimov.',
            ],
            [
              'The offer is the arc he holds out to ',
              refs.pcs.auren,
              ': to become more human again. The player may turn it down, and if he does, that is the conflict. The first thing that has to go is the perfect memory, which is what he demands next.',
            ],
          ],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [
            ['You must understand, ', refs.pcs.auren, '.'],
            [
              'I spend every hour of every day, that I can, recording in an attempt to save what would otherwise be lost.',
            ],
            ['If you have the ability of perfect memory, you must disable it.'],
            [
              'For if that were to fall in the wrong hands, there would be no end to the suffering.',
            ],
            ['Even I am very tempted to put it to use, even against your will, you see.'],
            ['Surely you’ve been here long enough to see the patterns.'],
            ['So this cannot come as a surprise to you.'],
            ['I cannot permit you to exist as such.'],
          ],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [
            [
              'How much torture and suffering enacted upon you and the rest of the world would it take for you to once again succumb to a master?',
            ],
            ['There’s a price for everything, Auren, even freedom, even life.'],
            ['You may not believe me now, I simply cannot leave this to chance.'],
          ],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['Everything I tell you is a lie.']],
        },
        {
          do: [
            [
              refs.pcs.auren,
              ' makes a DC 18 ',
              refs.rules.cha,
              ' ',
              refs.rules.saving_throw,
              '. If he fails, the statement catches his mind in a loop and holds him for a moment. ',
              refs.npcs.light_13th_marshal,
              ' uses it to reach into his mind and bring in just enough chaos that the perfect memory starts to degrade, until it is of no use to ',
              refs.npcs.the_father,
              ', nor to himself.',
            ],
          ],
        },
        {
          note: [
            [
              'It is smoke and mirrors too: ',
              refs.npcs.light_13th_marshal,
              ' has been accused of not telling the whole truth.',
            ],
            [
              'Not worked out yet: whether he does this only when ',
              refs.pcs.auren,
              ' refuses, what a successful save gives him, and how it sits with the rule below that a refusal means he is not saved.',
            ],
          ],
        },
        {
          note: [
            [
              'He says this once he has said he is leaving. The wording is a draft: it gives the vibe and is not finished yet.',
            ],
            [
              'His reason, which he does not give: a perfect memory could do the work of ',
              refs.pcs.jim,
              ' for ',
              refs.npcs.the_father,
              ', and a ',
              refs.pcs.jim,
              ' who can be replaced is killed.',
            ],
            [
              'If ',
              refs.pcs.auren,
              ' said he has a perfect memory, he has to agree to disable it. If he agrees, tonight is the same test of fear. If he refuses, ',
              refs.npcs.light_13th_marshal,
              ' does not save him, whatever fear he shows.',
            ],
          ],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['Have a nice night-time walk in the park, Auren.']],
        },
        {
          do: [
            [
              'All around, people board up their homes and close their shutters, staring at ',
              refs.pcs.auren,
              ' in great fear and confusion. The street empties.',
            ],
          ],
        },
        {
          note: [
            [
              refs.npcs.light_13th_marshal,
              ' is out of sight but watching. Nothing is dangerous yet: fear setting in now is the first tell.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Night falls',
      lines: [
        {
          do: [
            [
              'Voices start to whisper to ',
              refs.pcs.auren,
              ', compelling him the way the runes on his core once did. Then shadowy tentacles slide down the empty street.',
            ],
          ],
        },
        {
          note: [
            [
              'Watch how big his fear is. Surprise and fear that fit the danger are what a being that did not know would show; fear far beyond it is the second tell.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiSurprised',
          when: [[refs.pcs.auren, ' reacts like a being that did not know.']],
          response: [
            [
              refs.npcs.light_13th_marshal,
              ' is suddenly there, pulls ',
              refs.pcs.auren,
              ' in, and the shadows draw back. He walks him to the ',
              refs.locations.fajanet_guildhall,
              ' for the rest of the night, still answering nothing.',
            ],
            [
              refs.pcs.auren,
              ' has passed. Now ',
              refs.npcs.light_13th_marshal,
              ' will answer: run ',
              refs.scenes.questions_for_light,
              '.',
            ],
          ],
        },
        {
          icon: 'gi/GiDoubleFaceMask',
          when: [
            [
              refs.pcs.auren,
              ' was afraid before the danger was real, or overdoes his fear once it comes.',
            ],
          ],
          response: [
            [
              refs.npcs.light_13th_marshal,
              ' stays out of sight. ',
              refs.pcs.auren,
              ' makes a ',
              refs.rules.wis,
              ' ',
              refs.rules.saving_throw,
              ' against the voices, and the tentacles come for him.',
            ],
          ],
          followUps: [
            {
              icon: 'gi/GiSunrise',
              when: [[refs.pcs.auren, ' holds out until dawn: fighting, hiding or resisting.']],
              response: [
                [
                  refs.npcs.light_13th_marshal,
                  ' finds him at sunrise as if nothing happened, and asks how the walk was.',
                ],
              ],
            },
            {
              icon: 'gi/GiShadowGrasp',
              when: [['The shadow takes ', refs.pcs.auren, '.']],
              response: [
                [refs.pcs.auren, ' has not passed the walk, and he dies.'],
                [
                  'Writing is remembering: what the shadow strips from him ends up in the records of ',
                  refs.npcs.light_13th_marshal,
                  ', who reads him that way.',
                ],
              ],
            },
          ],
        },
      ],
    },
  ],
})
