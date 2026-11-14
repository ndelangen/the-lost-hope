import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Sarogarth',
  avatar: '/assets/npcs/sarogarth.png',
  notes: [
    [
      'An ancient wizard with slick grey hair, a grey beard, a star below his left eye, and a wooden staff. He is roughly two thousand years old.',
    ],
    [
      'Portrayed as the cowardly wizard in the holy texts of the ',
      refs.organizations.church_of_gruumsh,
      '. He disputes their account of him splitting a continent, saying experimental chaos magic blew part of a mountain into the sea.',
    ],
    [
      'His magic supports a pocket dimension with a pond for ',
      refs.npcs.dax,
      ' and ',
      refs.npcs.sylf,
      '.',
    ],
    [
      'He says a Deck of Many Things game transformed his first wife into a creature that killed his family. He stopped gambling afterward. He is afraid of heights.',
    ],
  ],
  stats: {
    size: 'Medium',
    type: 'humanoid',
    cr: '12',
    ac: 17,
    armor: 'mage armor',
    hitDice: '22d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 10,
      dex: 14,
      con: 14,
      int: 20,
      wis: 15,
      cha: 16,
    },
    saves: {
      int: 'proficient',
      wis: 'proficient',
    },
    skills: {
      arcana: 'expert',
      history: 'expert',
    },
    damageResistances: [refs.rules.psychic],
    abilities: [
      {
        key: 'magic-resistance',
        name: 'Magic Resistance',
        timing: 'trait',
        icon: 'lucide/Shield',
        text: ['Advantage on saves against spells and other magical effects.'],
      },
      {
        key: 'chaos-surge',
        name: 'Chaos Surge',
        timing: 'trait',
        icon: 'gi/GiCosmicEgg',
        text: [
          'When he rolls a 1 on a damage die, roll a d20: on a 1, something unexpected happens and the DM decides what.',
        ],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Three ',
          {
            ability: 'arcane-burst',
          },
          ' attacks.',
        ],
      },
      {
        key: 'arcane-burst',
        name: 'Arcane Burst',
        timing: 'action',
        icon: 'gi/GiMagicSwirl',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'int',
          range: [150, 150],
          damage: [
            {
              dice: '4d10',
              type: refs.rules.force,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'chaos-bolt',
        name: 'Wild Blast',
        timing: 'action',
        icon: 'gi/GiCosmicEgg',
        intent: 'damage',
        text: [
          'A 20-ft.-radius sphere within 150 ft. Each creature in it: Dexterity ',
          refs.rules.saving_throw,
          ', ',
          {
            dc: 'int',
          },
          '. Failure: 8d6 damage of a random type. Success: ',
          refs.rules.half_damage,
          '.',
        ],
        uses: 2,
        recharge: 'Long rest',
      },
      {
        key: 'teleport',
        name: 'Teleport',
        timing: 'bonus action',
        icon: 'gi/GiTeleport',
        text: ['Teleports up to 60 ft. to a space he can see.'],
        uses: 3,
        recharge: 'Long rest',
      },
      {
        key: 'shield',
        name: 'Shield',
        timing: 'reaction',
        icon: 'lucide/Shield',
        text: [
          'When hit by an attack, he gains +5 AC until the start of his next turn, possibly turning the hit into a miss.',
        ],
        uses: 3,
        recharge: 'Long rest',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_archmage'],
      changes: 'A two-thousand-year-old chaos wizard: archmage numbers with wild magic.',
    },
  },
})
