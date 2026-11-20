import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Hand Breaker',
  notes: [['A heavy in a riveted iron mask, with a chain flail and a shield the size of a door.']],
  secretMemberships: [
    { organization: refs.organizations.the_eyeless_hand, status: 'active', rank: 'Member' },
  ],
  motivations: [
    [
      'Bring down the biggest one in the room and bring them in alive. The snatchers take the rest.',
    ],
  ],
  stats: {
    size: 'medium',
    type: 'humanoid',
    cr: '5',
    ac: 16,
    armor: 'studded leather, shield',
    hitDice: '15d8',
    speed: { walk: 30 },
    scores: { str: 18, dex: 15, con: 16, int: 10, wis: 12, cha: 15 },
    saves: { str: 'proficient', dex: 'proficient', con: 'proficient' },
    skills: { athletics: 'proficient', intimidation: 'proficient' },
    abilities: [
      {
        key: 'take-them-alive',
        name: 'Take Them Alive',
        timing: 'trait',
        icon: 'gi/GiFist',
        text: [
          'When it drops a creature to 0 ',
          refs.rules.hit_points,
          ', it can knock it out instead of killing it.',
        ],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Two ',
          { ability: 'chain-flail' },
          ' attacks and one ',
          { ability: 'shield-bash' },
          '.',
        ],
      },
      {
        key: 'chain-flail',
        name: 'Chain Flail',
        timing: 'action',
        icon: 'gi/GiFlangedMace',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [{ dice: '2d6', type: refs.rules.bludgeoning, addModifier: true }],
        },
      },
      {
        key: 'shield-bash',
        name: 'Shield Bash',
        timing: 'action',
        icon: 'lucide/Shield',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [{ dice: '2d4', type: refs.rules.bludgeoning, addModifier: true }],
        },
        text: ['A Large or smaller target falls ', refs.rules.prone, '.'],
      },
      {
        key: 'parry',
        name: 'Parry',
        timing: 'reaction',
        icon: 'gi/GiBroadsword',
        text: ['When a melee attack would hit it, it adds 3 to its AC against that attack.'],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_gladiator'],
      changes:
        'A Hand enforcer sent to bring down big targets: a chain flail instead of spears, a shield bash that knocks a Large target prone too, and it can knock out instead of kill.',
    },
  },
})
