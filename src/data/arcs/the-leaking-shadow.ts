import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The leaking shadow',
  icon: 'gi/GiBottledShadow',
  direction: [
    [
      'Why is the world this way? Shadow from the ',
      refs.locations.shadow_realm,
      ' is leaking into it, and everyone with power lives off the leak.',
    ],
  ],
  notes: [
    ['Working ideas from brainstorming. Not settled, and the players know none of it.'],
    [
      'Shadow leaks out of the ',
      refs.locations.shadow_realm,
      ' into the world. Collected shadow can be converted into two things: a fuel for dwarven machines, and the drug Arcane Dust.',
    ],
    [
      'Long ago the dwarves and the elves fought a great war of machine against magic. The elves lost, and the shadow fuel is part of why the machines won.',
    ],
    [
      'Arcane Dust is as strong and as addictive as the worst drugs there are. It makes its users lost: they lose memories, then their sense of self, then control.',
    ],
    [
      'Still open: what ',
      refs.npcs.the_12th_marshal,
      ' does with the fuel, and whether anything the players have not seen yet changes this picture.',
    ],
  ],
  plots: [
    {
      name: 'The war of machine and magic',
      hook: [
        [
          'Let the party find the old war in pieces: a ruin, a veteran, a grudge. ',
          refs.pcs.swift_starblade,
          ' is a half-elf, so ask his player what his people did in it.',
        ],
      ],
    },
    {
      name: 'What Arcane Dust takes',
      hook: [
        [
          'The party has been offered Arcane Dust once and did not buy. Show them a user who has lost too much.',
        ],
      ],
      npcs: [refs.npcs.skynet_gang_leader],
      events: [refs.events.n2_e183],
    },
    {
      name: 'The dragon’s share',
      hook: [
        [
          'Worshippers of ',
          refs.npcs.the_12th_marshal,
          ' live far too long. Where do those years come from?',
        ],
      ],
      npcs: [refs.npcs.the_12th_marshal],
      events: [refs.events.n2_e079],
    },
  ],
})
