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
    ['The players know none of this.'],
    [
      'Shadow leaks out of the ',
      refs.locations.shadow_realm,
      ' into the world at a leak, or barrier, near ',
      refs.locations.fajanet,
      '. Arcane Dust is the substance that comes of it. The same Dust can be burned as fuel or taken as a drug. Who makes it and who receives it is recorded on ',
      refs.npcs.light_13th_marshal,
      '.',
    ],
    [
      'As night falls, minds get lost unless someone writes. Thoughts and dreams that are not recorded are taken. At the leak itself the shadow can come in the night and take a mind, and even a body.',
    ],
    [
      'As a drug, Arcane Dust is as strong and as addictive as the worst there are. It makes its users lost: they lose memories, then their sense of self, then control.',
    ],
    [
      'The dwarves and the elves fought the Second Great War, machine against magic, and it ended within living memory. The elves lost. It is the same war as the war of the marshals against the elves: the marshals ordered it, and the dwarves built the machines and marched. Nothing records a first great war yet.',
    ],
    [
      'Working ideas, not settled: the fuel is part of why the machines won that war. Still open: what ',
      refs.npcs.the_12th_marshal,
      ' does with the fuel, and how the war of dwarves and elves relates to the fighting between the marshals.',
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
