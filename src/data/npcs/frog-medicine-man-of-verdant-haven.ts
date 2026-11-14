import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Frog Medicine Man of Verdant Haven',
  location: refs.locations.verdant_haven,
  species: 'Frogfolk',
  notes: [['A pipe-smoking medicine man.']],
  stats: {
    size: 'Medium',
    type: 'humanoid',
    cr: '2',
    ac: 13,
    armor: 'hide armor',
    hitDice: '6d8',
    speed: {
      walk: 25,
      swim: 30,
    },
    scores: {
      str: 10,
      dex: 12,
      con: 13,
      int: 12,
      wis: 16,
      cha: 11,
    },
    skills: {
      medicine: 'expert',
      nature: 'proficient',
      perception: 'proficient',
    },
    senses: {
      darkvision: 60,
    },
    abilities: [
      {
        key: 'amphibious',
        name: 'Amphibious',
        timing: 'trait',
        icon: 'gi/GiFrogFoot',
        text: ['Breathes air and water.'],
      },
      {
        key: 'standing-leap',
        name: 'Standing Leap',
        timing: 'trait',
        icon: 'gi/GiFrogFoot',
        text: ['Jumps up to 20 ft. long or 10 ft. high, with or without a running start.'],
      },
      {
        key: 'staff',
        name: 'Staff',
        timing: 'action',
        icon: 'gi/GiWizardStaff',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          damage: [
            {
              dice: '1d6',
              type: 'bludgeoning',
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'pipe-smoke',
        name: 'Pipe Smoke',
        timing: 'action',
        icon: 'gi/GiSmokeBomb',
        text: [
          'A 10-ft.-radius cloud within 60 ft. lasts until the start of his next turn. Each creature in it: Constitution saving throw, ',
          {
            dc: 'wis',
          },
          '. Failure: ',
          {
            condition: 'poisoned',
          },
          ' and its speed is halved.',
        ],
        uses: 1,
        recharge: 'Recharge 5–6',
      },
      {
        key: 'poultice',
        name: 'Poultice',
        timing: 'action',
        icon: 'lucide/HeartPulse',
        intent: 'healing',
        text: ['One creature he touches regains 2d8 + 3 HP.'],
        uses: 3,
        recharge: 'Long rest',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_druid'],
      changes:
        'A frogfolk healer: druid numbers with a leap, a swim speed, healing poultices and pipe smoke in place of spells.',
    },
  },
})
