import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Light walks Auren through Fajanet',
  location: refs.locations.fajanet,
  alternateLocations: [
    refs.locations.rare_animal_dealer_s_premises,
    refs.locations.fajanet_guildhall,
  ],
  npcs: [refs.npcs.light_13th_marshal],
  setup: [
    [
      refs.npcs.light_13th_marshal,
      ' asks ',
      refs.pcs.auren,
      ' to come to ',
      refs.locations.fajanet,
      ' in person, by teleport if needed, and meets him in the city instead of his paper-filled office.',
    ],
    [
      'Run it on the same evening as ',
      refs.scenes.fix_s_last_delivery,
      ', cutting back and forth: one beat here after each round of drinks there, so neither table waits.',
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
      ' does not know what he is, and he is willing to let the shadow take him to find out.',
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
          ],
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
      title: 'Such a beautiful sunset',
      lines: [
        {
          note: [
            [
              refs.npcs.light_13th_marshal,
              ' never hints at danger. He stays super casual and friendly to the end.',
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
                [
                  'Writing is remembering: what the shadow strips from him ends up in the records of ',
                  refs.npcs.light_13th_marshal,
                  ', who reads him that way. At dawn he pulls ',
                  refs.pcs.auren,
                  ' back out by the fountain, missing one memory. ',
                  refs.pcs.auren,
                  '’s player chooses which. Now ',
                  refs.npcs.light_13th_marshal,
                  ' knows him, and ',
                  refs.pcs.auren,
                  ' knows that he knows.',
                ],
              ],
            },
          ],
        },
      ],
    },
  ],
})
