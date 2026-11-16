import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: "Phoenix Chick (Jim's phoenix)",
  avatar: '/assets/beasts/phoenix-chick-portrait.png',
  location: refs.locations.fajanet,
  species: 'Phoenix',
  notes: [
    [
      'A young phoenix bonded to ',
      refs.pcs.jim,
      '. The mechanical form of the bond (familiar, companion, sentient ally, or charm) was left vague.',
      " D&D Beyond monster listing: https://www.dndbeyond.com/monsters?filter-search=phoenix (Mordenkainen's Tome of Foes, p. 199 — an Elder Elemental, CR 16 at full power; the bonded chick is a juvenile variant whose in-fiction power is the DM's to decide).",
    ],
  ],
  stats: {
    size: 'small',
    type: 'elemental',
    cr: '2',
    ac: 13,
    hitDice: '6d6',
    speed: {
      walk: 10,
      fly: 60,
    },
    scores: {
      str: 6,
      dex: 16,
      con: 12,
      int: 7,
      wis: 14,
      cha: 12,
    },
    senses: {
      darkvision: 60,
    },
    damageImmunities: [refs.rules.fire, refs.rules.poison],
    conditionImmunities: [refs.rules.poisoned],
    abilities: [
      {
        key: 'fire-form',
        name: 'Fire Form',
        timing: 'trait',
        icon: 'gi/GiFlame',
        text: [
          'A creature that touches it or hits it with a melee attack while within 5 ft. takes 1d6 ',
          refs.rules.fire,
          ' damage.',
        ],
      },
      {
        key: 'rebirth',
        name: 'Rebirth',
        timing: 'trait',
        icon: 'gi/GiFireRing',
        text: ['When it dies it bursts into ash and is reborn from it at dawn.'],
      },
      {
        key: 'beak',
        name: 'Flaming Beak',
        timing: 'action',
        icon: 'gi/GiFlame',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            {
              dice: '1d6',
              type: refs.rules.piercing,
              addModifier: true,
            },
            {
              dice: '1d6',
              type: refs.rules.fire,
            },
          ],
        },
      },
      {
        key: 'ember-burst',
        name: 'Ember Burst',
        timing: 'action',
        icon: 'gi/GiFireRing',
        intent: 'damage',
        save: {
          ability: 'dex',
          dc: 'con',
          target: { area: { shape: refs.rules.emanation, size: 10 } },
          onFail: { damage: [{ dice: '3d6', type: refs.rules.fire }] },
          onSuccess: 'half',
        },
        uses: 1,
        recharge: 'Recharge 5–6',
      },
      {
        key: 'warming-glow',
        name: 'Warming Glow',
        timing: 'action',
        icon: 'lucide/HeartPulse',
        intent: 'healing',
        text: ['Jim or one creature it touches regains 2d6 HP.'],
        uses: 1,
        recharge: 'Long rest',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_fire-elemental'],
      changes:
        'A juvenile phoenix: fire elemental traits at CR 2, with a rebirth and a healing glow for its bond with Jim.',
    },
  },
})
