import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Misha',
  avatar: '/assets/npcs/angel-of-the-mountain.png',
  location: refs.locations.mountain_top,
  species: 'Angel',
  notes: [
    [
      'An angel dwelling atop the ',
      refs.locations.mountain_top,
      ', married to the ',
      refs.npcs.dragon_of_the_mountain,
      '. His celestial rank and age are unknown.',
    ],
  ],
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'former',
      rank: 'Member',
    },
  ],
  stats: {
    size: 'Medium',
    type: 'celestial',
    cr: '10',
    ac: 17,
    hitDice: '18d8',
    speed: {
      walk: 30,
      fly: 90,
    },
    scores: {
      str: 18,
      dex: 18,
      con: 18,
      int: 17,
      wis: 20,
      cha: 20,
    },
    saves: {
      wis: 'proficient',
      cha: 'proficient',
    },
    skills: {
      insight: 'proficient',
      perception: 'proficient',
    },
    senses: {
      darkvision: 120,
    },
    damageResistances: [refs.rules.radiant],
    conditionImmunities: [refs.rules.charmed, refs.rules.frightened],
    abilities: [
      {
        key: 'exalted-restoration',
        name: 'Exalted Restoration',
        timing: 'trait',
        icon: 'gi/GiAngelWings',
        text: [
          'If he dies outside the Lower Planes, his body disappears and he returns to life within 1d6 days.',
        ],
      },
      {
        key: 'magic-resistance',
        name: 'Magic Resistance',
        timing: 'trait',
        icon: 'lucide/Shield',
        text: ['Advantage on saves against spells and other magical effects.'],
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
            ability: 'holy-mace',
          },
          ' attacks.',
        ],
      },
      {
        key: 'holy-mace',
        name: 'Holy Mace',
        timing: 'action',
        icon: 'gi/GiFlangedMace',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d6',
              type: refs.rules.bludgeoning,
              addModifier: true,
            },
            {
              dice: '4d8',
              type: refs.rules.radiant,
            },
          ],
        },
      },
      {
        key: 'healing-touch',
        name: 'Healing Touch',
        timing: 'action',
        icon: 'gi/GiHealing',
        intent: 'healing',
        text: ['One creature he touches regains 4d8 + 2 HP and is cured of curses and poison.'],
        uses: 3,
        recharge: 'Long rest',
      },
      {
        key: 'change-shape',
        name: 'Change Shape',
        timing: 'action',
        icon: 'gi/GiMirrorMirror',
        text: ['Becomes a humanoid or beast of his size, keeping his game statistics.'],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_deva'],
      changes: 'The SRD deva, as a former adventurer married to a dragon.',
    },
  },
})
