import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: "The Fiddler's Knight",
  notes: [
    [
      'An unnamed woman summoned by the Knight card of the ',
      refs.items.deck_of_many_more_things,
      '. A fourth-level fighter of the same species as ',
      refs.npcs.the_fiddler,
      ', sworn to serve him loyally until death. Her species and personal name are not recorded.',
    ],
  ],
  stats: {
    size: 'Medium',
    type: 'humanoid',
    cr: '2',
    ac: 18,
    armor: 'chain mail, shield',
    hitDice: '6d10',
    speed: { walk: 30 },
    scores: { str: 16, dex: 12, con: 14, int: 10, wis: 12, cha: 13 },
    saves: { str: 'proficient', con: 'proficient' },
    skills: { athletics: 'proficient', perception: 'proficient' },
    abilities: [
      {
        key: 'sworn',
        name: 'Sworn to the Fiddler',
        timing: 'trait',
        icon: 'lucide/Link',
        text: [
          'Can’t be ',
          refs.rules.charmed,
          ' or ',
          refs.rules.frightened,
          ' into acting against the Fiddler.',
        ],
      },
      {
        key: 'action-surge',
        name: 'Action Surge',
        timing: 'trait',
        icon: 'gi/GiPowerLightning',
        text: ['On her turn, takes one additional action.'],
        uses: 1,
        recharge: 'Short or long rest',
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: ['Two ', { ability: 'longsword' }, ' attacks.'],
      },
      {
        key: 'longsword',
        name: 'Longsword',
        timing: 'action',
        icon: 'gi/GiBroadsword',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [{ dice: '1d8', type: refs.rules.slashing, addModifier: true }],
        },
      },
      {
        key: 'second-wind',
        name: 'Second Wind',
        timing: 'bonus action',
        icon: 'lucide/HeartPulse',
        intent: 'healing',
        text: ['Regains 1d10 + 4 HP.'],
        uses: 1,
        recharge: 'Short or long rest',
      },
      {
        key: 'protection',
        name: 'Protection',
        timing: 'reaction',
        icon: 'lucide/Shield',
        text: [
          'When a creature she can see attacks an ally within 5 ft. of her, she imposes disadvantage on that attack roll.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_warrior-veteran', 'srd-2024_knight'],
      changes:
        'Rebuilt as the fourth-level fighter her notes describe: chain mail and shield, a longsword, Second Wind and Action Surge, and fewer hit points than the CR 3 veteran.',
    },
  },
})
