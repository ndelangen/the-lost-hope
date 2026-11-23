import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Buried War Machine',
  notes: [
    [
      'A giant war machine, buried to the waist under ',
      refs.locations.the_old_battlefield,
      ' and still standing guard.',
    ],
  ],
  background: [
    [
      'It is dwarven work from the Second Great War, the war of the marshals against the elves, and was built to fight elves. It still obeys its last order: hold this ground.',
    ],
    ['It burns Arcane Dust, and it is running on the last of it.'],
  ],
  stats: {
    size: 'huge',
    type: 'construct',
    cr: '6',
    ac: 17,
    armor: 'war plating',
    hitDice: '10d12',
    speed: { walk: 0 },
    scores: { str: 20, dex: 8, con: 18, int: 6, wis: 10, cha: 3 },
    senses: { blindsight: 10, darkvision: 60 },
    damageImmunities: [refs.rules.poison],
    conditionImmunities: [
      refs.rules.charmed,
      refs.rules.frightened,
      refs.rules.paralyzed,
      refs.rules.poisoned,
    ],
    abilities: [
      {
        key: 'last-order',
        name: 'Last Order',
        timing: 'trait',
        icon: 'lucide/Target',
        text: [
          'It does nothing until a creature attacks it or takes something within its reach. It attacks elves and half-elves before anyone else.',
        ],
      },
      {
        key: 'buried',
        name: 'Buried',
        timing: 'trait',
        icon: 'lucide/Grip',
        text: [
          'It is buried to the waist and cannot move. A creature more than 15 ft. away is out of reach of its fists.',
        ],
      },
      {
        key: 'exposed-fuel-line',
        name: 'Exposed Fuel Line',
        timing: 'trait',
        icon: 'gi/GiGearHammer',
        text: [
          'A creature behind it can take an action to tear out its fuel line with a DC 15 Strength (',
          refs.rules.athletics,
          ') check or DC 15 check with tools. It then loses ',
          { ability: 'dust-vent' },
          ' and makes one ',
          { ability: 'fist' },
          ' attack with its Multiattack instead of two.',
        ],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: ['Two ', { ability: 'fist' }, ' attacks.'],
      },
      {
        key: 'fist',
        name: 'Fist',
        timing: 'action',
        icon: 'gi/GiFist',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          reach: 15,
          damage: [{ dice: '2d8', type: refs.rules.bludgeoning, addModifier: true }],
        },
      },
      {
        key: 'dust-vent',
        name: 'Dust Vent',
        timing: 'action',
        icon: 'gi/GiHeatHaze',
        intent: 'damage',
        save: {
          ability: 'con',
          dc: 'con',
          target: { area: { shape: refs.rules.cone, size: 30 } },
          onFail: { damage: [{ dice: '4d6', type: refs.rules.necrotic }] },
          onSuccess: 'half',
        },
        text: ['It vents burnt Arcane Dust from its chest.'],
        uses: 1,
        recharge: 'Recharge 5–6',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_shield-guardian'],
      changes:
        'A shield guardian grown huge and half buried: it cannot move, has fewer hit points and no regeneration, reaches 15 ft. with its fists, vents burnt Arcane Dust in a cone, and weakens when its fuel line is torn out.',
    },
  },
})
