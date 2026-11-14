import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Rare-Animal Dealer',
  avatar: '/assets/npcs/rare-animal-dealer.png',
  location: refs.locations.fajanet,
  species: 'unknown',
  notes: [
    ['An exotic animal dealer in ', refs.locations.fajanet, '.'],
    [
      'Filed under "Rare-Animal Trainer" from the bulletin-board posting, but referred to in play as the exotic animal dealer.',
    ],
    [
      "The dealer's own name, species, and whereabouts are unestablished, as is the reward for the recovered animals.",
    ],
  ],
  stats: {
    size: 'Medium',
    type: 'humanoid',
    cr: '1',
    ac: 13,
    armor: 'leather armor',
    hitDice: '6d8',
    speed: {
      walk: 30,
    },
    scores: {
      str: 11,
      dex: 14,
      con: 12,
      int: 11,
      wis: 15,
      cha: 13,
    },
    skills: {
      animalHandling: 'expert',
      nature: 'proficient',
      perception: 'proficient',
      survival: 'proficient',
    },
    abilities: [
      {
        key: 'beast-whisperer',
        name: 'Beast Whisperer',
        timing: 'trait',
        icon: 'gi/GiPaw',
        text: [
          'Advantage on Animal Handling checks; beasts it has handled don’t attack it unless it attacks first.',
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
            ability: 'whip',
          },
          ' or ',
          {
            ability: 'shortbow',
          },
          ' attacks.',
        ],
      },
      {
        key: 'whip',
        name: 'Whip',
        timing: 'action',
        icon: 'gi/GiWhiplash',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          reach: 10,
          damage: [
            {
              dice: '1d4',
              type: refs.rules.slashing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'shortbow',
        name: 'Shortbow',
        timing: 'action',
        icon: 'gi/GiCrossbow',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'dex',
          range: [80, 320],
          damage: [
            {
              dice: '1d6',
              type: refs.rules.piercing,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'snare',
        name: 'Snare Net',
        timing: 'action',
        icon: 'gi/GiSpiderWeb',
        save: {
          ability: 'dex',
          dc: 'dex',
          target: { creatures: 1, range: 15, which: 'that is Large or smaller' },
          onFail: {
            conditions: [refs.rules.restrained],
            also: [
              'To break free it must beat ',
              { dc: 'dex' },
              ' with a Strength or Dexterity check.',
            ],
          },
        },
        uses: 1,
        recharge: 'Short or long rest',
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_scout'],
      changes: 'A beast trader: scout numbers with a whip and a net.',
    },
  },
})
