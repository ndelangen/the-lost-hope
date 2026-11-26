import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.phandelver_and_below_the_shattered_obelisk,
  monsters: {
    goblin_boss_variant: {
      name: 'Goblin Boss (Variant)',
      tags: ['goblinoid'],
      alignment: 'neutral evil',
      languages: ['Common', 'Goblin'],
      habitats: ['Cragmaw Castle', 'Archer Post', 'Neverwinter Wood'],
      appearance: [['A small goblin sentry with mismatched armor and a shortbow.']],
      tableNotes: [
        [
          'Rules source: Phandelver and Below: The Shattered Obelisk. The Spider’s Web, C3, p. 60. Base Goblin Boss rules from Monster Manual (2014), p. 166.',
        ],
        ['Also indexed as: Goblin Boss Archer'],
        [
          'Equipment: Chain shirt, shield, scimitar, and shortbow. The shortbow requires two hands. AC is 15 while the shield is doffed.',
        ],
        [
          'Encounter: Two goblin bosses guard each Archer Post at Cragmaw Castle. They shoot through arrow slits and switch to melee when intruders enter the room.',
        ],
      ],
      stats: {
        size: 'small',
        type: 'humanoid',
        cr: '1',
        ac: 17,
        hitDice: '6d6',
        speed: { walk: 30 },
        scores: { str: 10, dex: 14, con: 10, int: 10, wis: 8, cha: 10 },
        skills: { stealth: 'expert' },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Make two ', { ability: 'scimitar' }, ' attacks. The second has Disadvantage.'],
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
              reach: 5,
              damage: [{ dice: '1d6', type: rules.slashing, addModifier: true }],
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
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'nimble-escape',
            name: 'Nimble Escape',
            timing: 'bonus action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The goblin can take the Disengage or Hide action as a bonus action on each of its turns.',
            ],
          },
          {
            key: 'redirect-attack',
            name: 'Redirect Attack',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'When a creature the boss can see targets it with an attack, the boss can choose another goblin within 5 ft. They trade places, and the chosen goblin becomes the target.',
            ],
          },
        ],
      },
    },
  },
})
