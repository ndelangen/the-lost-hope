import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Who will you choose to be?',
  location: refs.locations.fajanet_guildhall,
  npcs: [refs.npcs.light_13th_marshal],
  setup: [
    [
      'A later talk between ',
      refs.npcs.light_13th_marshal,
      ' and ',
      refs.pcs.auren,
      ' alone, after ',
      refs.scenes.light_walks_auren_through_fajanet,
      ' and after the party has been to ',
      refs.locations.the_caves_of_steel,
      '. As on the walk, he only asks. By now he knows what ',
      refs.pcs.auren,
      ' once was.',
    ],
    [
      'The questions are there to let the player say what he wants for ',
      refs.pcs.auren,
      '. Give every one of them room, and build on the answers. What the offer at the end is has not been worked out yet.',
    ],
  ],
  beats: [
    {
      title: 'A body of metal and magic',
      lines: [
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['You have a body made of metal and magic. How do you like it?']],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['Do you not miss having a human body?']],
        },
      ],
    },
    {
      title: 'Does the world agree?',
      lines: [
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
        { speaker: refs.npcs.light_13th_marshal, say: [['Will it?']] },
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
            ['He means the thralls of ', refs.npcs.the_11th_marshal, ' the party has just seen.'],
          ],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['An adventurer? A free agent, fighting for whatever cause the day brings?']],
        },
      ],
    },
    {
      title: 'What is in your future?',
      lines: [
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [
            [
              'What is in your future, Auren? As there likely is so much of it, with a body like yours.',
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
          ],
        },
      ],
    },
  ],
})
