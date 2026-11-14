import { refs } from '#/data/generated/refs.ts'
import { create as createCreature } from '#/definitions/creature.ts'

export default createCreature({
  name: 'Alchemist',
  stats: {
    size: 'Medium',
    type: 'humanoid',
    cr: '2',
    ac: 12,
    hitDice: '9d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 9,
      dex: 14,
      con: 12,
      int: 17,
      wis: 13,
      cha: 11,
    },
    saves: {
      int: 'proficient',
    },
    skills: {
      arcana: 'proficient',
      medicine: 'proficient',
      nature: 'expert',
    },
    damageResistances: [refs.rules.poison],
    abilities: [
      {
        key: 'potion-belt',
        name: 'Potion Belt',
        timing: 'trait',
        icon: 'gi/GiPotionBall',
        text: [
          'Carries potions of healing it can drink or give to an adjacent ally with ',
          {
            ability: 'quaff',
          },
          '.',
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
          {
            ability: 'vial',
          },
          ' throws.',
        ],
      },
      {
        key: 'vial',
        name: 'Volatile Vial',
        timing: 'action',
        icon: 'gi/GiPoisonBottle',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'int',
          range: [20, 60],
          damage: [
            {
              dice: '2d6',
              type: refs.rules.fire,
              addModifier: true,
            },
          ],
        },
        text: ['Fire, acid, or poison: the alchemist picks before it throws.'],
      },
      {
        key: 'choking-cloud',
        name: 'Choking Cloud',
        timing: 'action',
        icon: 'gi/GiSmokeBomb',
        save: {
          ability: 'con',
          dc: 'int',
          target: { area: { shape: refs.rules.sphere, size: 10 }, range: 60 },
          onFail: {
            conditions: [refs.rules.poisoned],
            also: ['It lasts until the end of its next turn.'],
          },
        },
        uses: 1,
        recharge: 'Recharge 5–6',
      },
      {
        key: 'quaff',
        name: 'Quaff',
        timing: 'bonus action',
        icon: 'lucide/HeartPulse',
        intent: 'healing',
        text: ['It or an adjacent ally drinks a potion and regains 2d4 + 2 HP.'],
        uses: 3,
        recharge: 'Long rest',
      },
    ],
    source: {
      adaptedFrom: [],
      changes:
        'Homebrew from the SRD mage’s caster numbers: an alchemist fights with thrown vials and potions rather than spells.',
    },
  },
})
