import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Bob the gate troll',
  avatar: '/assets/npcs/bob-the-gate-troll.png',
  location: refs.locations.fajanet,
  species: 'Troll',
  notes: [
    [
      'A friendly troll stationed at the main gate of ',
      refs.locations.fajanet,
      '. Big, green, and smiling; recognises everyone who passes through by sight, even when he forgets their names.',
    ],
  ],
  stats: {
    size: 'Large',
    type: 'giant',
    cr: '5',
    ac: 15,
    armor: 'natural armor',
    hitDice: '10d10',
    speed: {
      walk: 30,
    },
    scores: {
      str: 18,
      dex: 13,
      con: 20,
      int: 7,
      wis: 9,
      cha: 7,
    },
    skills: {
      perception: 'proficient',
    },
    senses: {
      darkvision: 60,
    },
    abilities: [
      {
        key: 'keen-eye-for-faces',
        name: 'Keen Eye for Faces',
        timing: 'trait',
        icon: 'lucide/Eye',
        text: ['Recognises anyone who has passed his gate before, even if he forgets their name.'],
      },
      {
        key: 'regeneration',
        name: 'Regeneration',
        timing: 'trait',
        icon: 'lucide/HeartPulse',
        intent: 'healing',
        text: [
          'Regains 15 HP at the start of each of his turns unless he took ',
          refs.rules.acid,
          ' or ',
          refs.rules.fire,
          ' damage since his last turn. He dies only if he starts his turn at 0 HP and does not regenerate.',
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
            ability: 'rend',
          },
          ' attacks.',
        ],
      },
      {
        key: 'rend',
        name: 'Rend',
        timing: 'action',
        icon: 'gi/GiClaws',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          reach: 10,
          damage: [
            {
              dice: '2d6',
              type: refs.rules.slashing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'charge',
        name: 'Charge',
        timing: 'bonus action',
        icon: 'gi/GiStomp',
        text: [
          'Moves up to ',
          {
            speed: 'walk',
            times: 0.5,
          },
          ' straight toward an enemy, which costs no extra movement for difficult terrain.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_troll'],
      changes: 'The SRD troll, unchanged apart from a gatekeeper’s memory for faces.',
    },
  },
})
