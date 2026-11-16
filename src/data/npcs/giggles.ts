import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Giggles',
  avatar: '/assets/npcs/giggles-portrait.png',
  species: 'Goblin',
  notes: [['A mysterious goblin whose identity and role remain unresolved.']],
  stats: {
    size: 'small',
    type: 'fey',
    cr: '1',
    ac: 17,
    armor: 'chain shirt, shield',
    hitDice: '6d6',
    speed: {
      walk: 30,
    },
    scores: {
      str: 10,
      dex: 15,
      con: 10,
      int: 10,
      wis: 8,
      cha: 10,
    },
    skills: {
      stealth: 'proficient',
    },
    senses: {
      darkvision: 60,
    },
    abilities: [
      {
        key: 'nimble-escape',
        name: 'Nimble Escape',
        timing: 'trait',
        icon: 'gi/GiSmokeBomb',
        text: [
          'Takes the ',
          refs.rules.disengage,
          ' or ',
          refs.rules.hide,
          ' action as a ',
          refs.rules.bonus_action,
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
            ability: 'scimitar',
          },
          ' attacks.',
        ],
      },
      {
        key: 'scimitar',
        name: 'Scimitar',
        timing: 'action',
        icon: 'gi/GiBroadsword',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            {
              dice: '1d6',
              type: refs.rules.slashing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'redirect-attack',
        name: 'Redirect Attack',
        timing: 'reaction',
        icon: 'gi/GiTeleport',
        text: [
          'When a creature Giggles can see targets him with an attack, he swaps places with an ally within 5 ft.; the ally becomes the target.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_goblin-boss'],
      changes:
        'The SRD goblin boss with a cackle: the bow is dropped, everything else is unchanged.',
    },
  },
})
