import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'A fleet on an empty sea',
  location: refs.locations.the_marshal_s_waters,
  alternateLocations: [refs.locations.the_caves_of_steel],
  npcs: [refs.npcs.caves_of_steel_fisher],
  setup: [
    [
      'The party is in their airship over a giant ocean with no land in sight. This is their first contact with ',
      refs.locations.the_caves_of_steel,
      ' and the people of ',
      refs.npcs.the_11th_marshal,
      '.',
    ],
    [
      'Its real job is to get the players telling their characters’ stories, backgrounds included: the people pay for every story they hear.',
    ],
    [
      'This is what happens next once the party leaves the sky islands, however they leave. Usually that is aboard ',
      refs.items.little_purple,
      ' right after ',
      refs.scenes.crowy_brings_up_onana_s_letter,
      ': dusk, bearings lost, and the ship drifts out over open sea. If they leave some other way, they still end up flying over this ocean.',
    ],
    [
      'Play it as a short visit, about one session: the welcome, the feast, the stories and the catch. The party leaves with the puzzle of the laws unsolved and a reason to come back.',
    ],
    [
      'The party stays about two days, just before the full moon. The full moon falls around the time they reach ',
      refs.locations.rustmoor,
      ', so they miss the master’s visit.',
    ],
  ],
  beats: [
    {
      title: 'Strange ships below',
      lines: [
        {
          do: [
            [
              'Nothing but water, for hours. Then a fishing fleet on the surface: riveted iron hulls, working decks, no masts. Some of them sit low in the water, as if they could go under.',
            ],
            [
              'Above the fleet, the air tears open: a portal hangs in the sky. Barrels tumble out of it, one after another, and splash down among the ships. Then the portal closes.',
            ],
            [
              'The fishers cheer and haul the barrels in. Then they see the airship, wave flags and their arms, and shout up at it.',
            ],
          ],
        },
        {
          speaker: refs.npcs.caves_of_steel_fisher,
          say: [['Dust day! And visitors! Come down! Come meet us! We’re friendly!']],
        },
        {
          note: [
            [
              'The barrels are a delivery of Arcane Dust for ',
              refs.locations.the_caves_of_steel,
              '. This is the hook: after the question of ',
              refs.npcs.onana_tempest,
              ' about Arcane Dust, the players should want a closer look. It works even when the crystal of ',
              refs.items.little_purple,
              ' is fully charged.',
            ],
            [
              'The portals are a draft. Nobody comes through them and no ship drops the barrels, so there is nothing to chase. Who sends the Dust, and from where, is not settled.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiAirZigzag',
          when: [['They fly at the portal, or try to go through it.']],
          response: [
            [
              'It snaps shut before they reach it, and the sky is empty again. Below, the fishers are still waving.',
            ],
          ],
        },
        {
          icon: 'gi/GiConversation',
          when: [['They ask the fishers about the barrels.']],
          response: [
            [
              '“Dust, for the ships and the machines.” Nobody here takes it as a drug: ',
              refs.npcs.the_11th_marshal,
              ' forbids it, and they say so. Where it comes from they do not know or care: it comes, every time.',
            ],
          ],
        },
        {
          icon: 'gi/GiShipBow',
          when: [['They choose to land.']],
          response: [['Play on.']],
        },
        {
          icon: 'gi/GiFalling',
          when: [['They fly on past the fleet anyway.']],
          response: [
            [
              'The magical crystal of ',
              refs.items.little_purple,
              ' overheats, or whatever drives the ship they are on breaks down. They have to set down on the water to let it cool, right beside the fleet.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Alongside the fleet',
      lines: [
        {
          speaker: refs.npcs.caves_of_steel_fisher,
          say: [
            ['Visitors! From the outside?'],
            [
              'Come down with us, come home with us! There will be a feast. We want to hear everything.',
            ],
          ],
        },
        {
          note: [
            [
              'Their welcome is sincere. Every ship here is a ',
              refs.items.caves_of_steel_subship,
              ', and the only way into the Caves is underwater, so the airship has to stay behind.',
            ],
          ],
        },
        {
          do: [
            [
              'Among the fish in the nets is something that is not a fish: a sentient sea creature, alive, bound, and looking straight at the party.',
            ],
          ],
        },
        {
          note: [
            [
              'Besides their own food, the fleet hunts sentient creatures to feed to ',
              refs.npcs.the_11th_marshal,
              '. They cannot help it: it is an order.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiOpenGate',
          when: [['They set the catch free.']],
          response: [
            [
              'The fishers are annoyed, but they do not fight the party over it, and they still invite them down. They know it is only a setback: once the party is gone, they will catch more.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Harpoon fishing',
      lines: [
        {
          do: [
            [
              'The crew gladly shows the party how the harpoons of their ',
              refs.items.caves_of_steel_subship,
              ' work, and lets anyone who wants have a go.',
            ],
          ],
        },
        {
          note: [
            ['Each player who wants to takes a turn, in three checks. The DCs are proposals.'],
            [
              'First a Wisdom (',
              refs.rules.perception,
              ') check, DC 12, to recognise that the target is a sentient creature. On a success they may switch to something that is not.',
            ],
            [
              'Then a Strength (',
              refs.rules.athletics,
              ') check, DC 13, to hit it, and a Strength check, DC 12, to reel it in.',
            ],
            ['Everything caught goes into the hold. Sentient catch pleads for its life.'],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiMagnifyingGlass',
          when: [['Someone asks to see the other machine fired.']],
          response: [
            [
              'The crew finds the very idea of a demonstration preposterous. ',
              refs.pcs.auren,
              ' can study it all he likes, but he cannot work out how it functions.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Welcomed like royalty',
      onlyIf: [['The party goes down with the fleet.']],
      lines: [
        {
          do: [
            [
              'Inside the cave of steel, people crowd in to see the strangers. There is a feast, and everyone wants a story: who are they, where are they from, what is happening in the world?',
            ],
          ],
        },
        {
          note: [
            [
              'The people have no contact with the outside and know nothing of it. They cannot get enough of stories about anything at all, and they pay in valuables for every one. They want to buy books too, any books the party will sell.',
            ],
            ['Let the meal run, then play the stage: that is the point of the scene.'],
          ],
        },
        {
          speaker: refs.npcs.caves_of_steel_fisher,
          say: [
            [
              'Every full moon the master visits us! We catch as many different kinds as we can for it. We try to catch ’em all!',
            ],
          ],
        },
        {
          note: [['They tell this with great pride. The last line is a Pokémon nod, for fun.']],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiMagnifyingGlass',
          when: [
            ['They find, or ask about, the ', refs.locations.the_caves_of_steel_holding_area, '.'],
          ],
          response: [
            [
              'More sentient catch is held there, waiting for ',
              refs.npcs.the_11th_marshal,
              '. Freeing it gets the same answer as at the fleet: annoyance, never a fight.',
            ],
          ],
        },
        {
          icon: 'gi/GiPrisoner',
          when: [['Someone asks whether they would wish to leave.']],
          response: [
            [
              'They go silent. Not awkward, not afraid: silent, mid-breath, until the subject changes. They cannot imagine taking any action to leave.',
            ],
          ],
        },
        {
          icon: 'gi/GiConversation',
          when: [['Someone asks about the Marshal, or about the laws.']],
          response: [
            [
              'They recite the three laws of ',
              refs.npcs.the_11th_marshal,
              ' word for word, in the first person, like children reciting a lesson. They strongly advise the party never to go looking for the Marshal.',
            ],
            [
              'They call it “master”, out loud and often. Make sure ',
              refs.pcs.auren,
              '’s player hears it: his backstory calls his maker his master, and it sets up Light’s question in ',
              refs.scenes.light_walks_auren_through_fajanet,
              ' about freeing those who serve evil masters unwillingly.',
            ],
          ],
        },
        {
          icon: 'gi/GiPuzzle',
          when: [['They try to take someone with them.']],
          response: [
            [
              'The third law stops anyone who knowingly tries to leave. A clever plan may get around it: judge by what the person does and what they know.',
            ],
          ],
        },
      ],
    },
    {
      title: 'On the stage',
      onlyIf: [['The party goes down with the fleet.']],
      lines: [
        {
          do: [
            [
              'After the meal, the hall goes quiet. On a stage stands one luxurious chair, super comfortable, made of mermaid hair and leather.',
            ],
            [
              'One by one, each party member is asked to come up and sit in it, and tell their story.',
            ],
          ],
        },
        {
          speaker: refs.npcs.caves_of_steel_fisher,
          say: [
            [
              'Tell us about you! Where did you grow up? What troubled you? Where are you now in life, and what do you want to do with the rest of it?',
            ],
          ],
        },
        {
          note: [
            [
              'They have been shut in here for centuries. They never get news except from travellers, and travellers are very few, so every story is a treasure to them. They listen to every word, and they pay in valuables.',
            ],
            [
              'Ask for background stories most of all: childhood, troubles, where the character is in life, and what they want from the rest of it. Let each player have the stage to themselves, and give the quiet ones time.',
            ],
            [
              'When a player tells a real, character-defining story, that character gains a level. A short anecdote earns valuables, not the level.',
            ],
            ['What the party tells them is all the people will ever have of the outside.'],
          ],
        },
      ],
    },
    {
      title: 'We hope you’ll be back',
      lines: [
        {
          speaker: refs.npcs.caves_of_steel_fisher,
          say: [['We hope you’ll be back!']],
        },
        {
          do: [['They wave the party goodbye and disappear beneath the surface.']],
        },
      ],
    },
  ],
  outcomes: [
    {
      icon: 'gi/GiWalk',
      when: [['The party stays too long, toward the full moon.']],
      response: [
        [
          'The people usher them away and make them leave: “We want more storytellers to come, please send more storytellers! But not during full moons, then the master comes to eat!”',
        ],
      ],
    },
    {
      icon: 'gi/GiFeatheredWing',
      when: [['They leave the Caves and fly on.']],
      response: [
        [
          'With their bearings back, they reach ',
          refs.locations.rustmoor,
          ' and its unfinished guildhall. Run ',
          refs.scenes.hex_loses_patience,
          '.',
        ],
      ],
    },
  ],
})
