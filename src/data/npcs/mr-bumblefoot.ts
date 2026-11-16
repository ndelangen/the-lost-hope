import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Mr. Bumblefoot',
  avatar: '/assets/npcs/mr-bumblefoot-portrait.png',
  location: refs.locations.giggles_and_gadgets,
  notes: [
    [
      'A maker of mechanisms, including flying brooms, who runs ',
      refs.locations.giggles_and_gadgets,
      '.',
    ],
  ],
  stats: {
    size: 'small',
    type: 'humanoid',
    cr: '1/2',
    ac: 13,
    hitDice: '4d6',
    speed: {
      walk: 25,
    },
    scores: {
      str: 8,
      dex: 14,
      con: 12,
      int: 17,
      wis: 11,
      cha: 13,
    },
    skills: {
      arcana: 'proficient',
      history: 'expert',
      sleight_of_hand: 'proficient',
    },
    abilities: [
      {
        key: 'workshop-tricks',
        name: 'Workshop Tricks',
        timing: 'trait',
        icon: 'gi/GiGearHammer',
        text: [
          'Always has a gadget at hand; ',
          refs.rules.advantage,
          ' on checks to repair, disarm, or improve a mechanism.',
        ],
      },
      {
        key: 'spring-launcher',
        name: 'Spring Launcher',
        timing: 'action',
        icon: 'gi/GiSlingshot',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'dex',
          range: [30, 90],
          damage: [
            {
              dice: '1d8',
              type: refs.rules.bludgeoning,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'flying-broom',
        name: 'Flying Broom',
        timing: 'bonus action',
        icon: 'gi/GiWingfoot',
        text: [
          'Mounts one of his brooms and flies up to ',
          {
            speed: 'walk',
            times: 2,
          },
          ' this turn without provoking an ',
          refs.rules.opportunity_attack,
          '.',
        ],
        uses: 1,
        recharge: 'Short or long rest',
      },
      {
        key: 'gearburst',
        name: 'Gearburst',
        timing: 'action',
        icon: 'gi/GiGearHammer',
        intent: 'damage',
        save: {
          ability: 'dex',
          dc: 'int',
          target: { area: { shape: refs.rules.cone, size: 15 } },
          onFail: { damage: [{ dice: '2d8', type: refs.rules.piercing }] },
          onSuccess: 'half',
        },
        uses: 1,
        recharge: 'Recharge 5–6',
      },
    ],
    source: {
      adaptedFrom: [],
      changes: 'Homebrew tinkerer: weak in a fight, but escapes on a broom and sprays gears.',
    },
  },
})
