import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: "Throne Figure in Jim's Vision",
  notes: [
    [
      'An unidentified being that wears the face of one of ',
      refs.pcs.jim,
      "'s murdered childhood friends. Its identity and relationship to ",
      refs.npcs.the_father,
      ' remain unknown.',
    ],
  ],
  stats: {
    size: 'Medium',
    type: 'fiend',
    cr: '13',
    ac: 16,
    hitDice: '13d8',
    speed: {
      walk: 40,
    },
    scores: {
      str: 14,
      dex: 17,
      con: 18,
      int: 13,
      wis: 16,
      cha: 20,
    },
    saves: {
      con: 'proficient',
      wis: 'proficient',
      cha: 'proficient',
    },
    skills: {
      deception: 'expert',
      insight: 'proficient',
    },
    senses: {
      darkvision: 60,
    },
    damageVulnerabilities: [refs.rules.radiant],
    damageResistances: [refs.rules.bludgeoning, refs.rules.piercing, refs.rules.slashing],
    abilities: [
      {
        key: 'stolen-face',
        name: 'Stolen Face',
        timing: 'trait',
        icon: 'gi/GiMirrorMirror',
        text: [
          'Wears the face of one of Jim’s murdered friends. Jim has disadvantage on attacks against it.',
        ],
      },
      {
        key: 'limited-magic-immunity',
        name: 'Limited Magic Immunity',
        timing: 'trait',
        icon: 'lucide/Shield',
        text: ['Unaffected by spells of 6th level or lower unless it wishes to be.'],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Two ',
          {
            ability: 'claw',
          },
          ' attacks.',
        ],
      },
      {
        key: 'claw',
        name: 'Claw',
        timing: 'action',
        icon: 'gi/GiClaws',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            {
              dice: '2d6',
              type: refs.rules.slashing,
              addModifier: true,
            },
            {
              dice: '2d8',
              type: refs.rules.psychic,
            },
          ],
        },
        text: [
          'The target is cursed: it can’t regain HP from a short rest until the curse is lifted.',
        ],
      },
      {
        key: 'vision',
        name: 'Waking Nightmare',
        timing: 'action',
        icon: 'gi/GiCrystalBall',
        intent: 'damage',
        text: [
          'One creature within 60 ft.: Wisdom saving throw, ',
          {
            dc: 'cha',
          },
          '. Failure: 6d10 psychic damage and ',
          refs.rules.frightened,
          ' until the end of its next turn. Success: half damage.',
        ],
        uses: 1,
        recharge: 'Recharge 5–6',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_rakshasa'],
      changes: 'An unknown being from Jim’s vision: rakshasa numbers with a stolen face.',
    },
  },
})
