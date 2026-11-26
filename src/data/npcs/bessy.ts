import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Bessy',
  avatar: '/assets/npcs/bessy-portrait.png',
  location: refs.locations.bessy_s_nimbus_stall,
  species: 'Minotaur',
  notes: [
    [
      'A minotaur blacksmith and craftsperson capable of making custom weapons, armour, and permanent protective sheaths for dangerous weapons.',
    ],
    ['She travels to learn her craft and sets up shop wherever she goes.'],
  ],
  stats: {
    size: 'large',
    type: 'monstrosity',
    cr: '3',
    ac: 15,
    armor: 'smith’s leathers, natural armor',
    hitDice: '9d10',
    speed: { walk: 40 },
    scores: { str: 18, dex: 11, con: 16, int: 11, wis: 14, cha: 10 },
    saves: { con: 'proficient' },
    skills: { athletics: 'proficient', perception: 'proficient' },
    senses: { darkvision: 60 },
    abilities: [
      {
        key: 'labyrinthine-recall',
        name: 'Labyrinthine Recall',
        timing: 'trait',
        icon: 'lucide/Footprints',
        text: ['Perfectly recalls any path she has travelled.'],
      },
      {
        key: 'smiths-eye',
        name: 'Smith’s Eye',
        timing: 'trait',
        icon: 'lucide/Eye',
        text: [
          'Knows at a glance whether a weapon or armour is magical, cursed, or flawed, and the AC any armour gives.',
        ],
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: ['One ', { ability: 'forge-hammer' }, ' and one ', { ability: 'gore' }, '.'],
      },
      {
        key: 'forge-hammer',
        name: 'Forge Hammer',
        timing: 'action',
        icon: 'gi/GiWarhammer',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [{ dice: '2d6', type: refs.rules.bludgeoning, addModifier: true }],
        },
      },
      {
        key: 'gore',
        name: 'Gore',
        timing: 'action',
        icon: 'gi/GiBullHorns',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [{ dice: '1d8', type: refs.rules.piercing, addModifier: true }],
        },
      },
      {
        key: 'trampling-charge',
        name: 'Trampling Charge',
        timing: 'bonus action',
        icon: 'gi/GiBull',
        text: ['After moving at least 10 ft. straight toward a creature, she shoves it.'],
        effects: [
          {
            key: 'prone',
            name: 'Prone',
            lands: { on: 'failed-save' },
            conditions: [refs.rules.prone],
            lasts: { kind: 'until-removed' },
          },
        ],
        save: {
          ability: 'str',
          dc: 'str',
          target: { creatures: 1, range: 5, which: 'she charged' },
          onFail: {
            also: ['It is pushed 10 ft. away before it falls', ': ', { effect: 'prone' }, '.'],
          },
        },
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_minotaur-of-baphomet'],
      changes:
        'A smith, not a cultist: the greataxe becomes a forge hammer and the charge a shove. Keeps CR 3 so she can defend her forge.',
    },
  },
})
