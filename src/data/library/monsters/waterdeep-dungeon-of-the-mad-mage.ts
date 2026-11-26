import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  monsters: {
    gelatinous_cube_giant_ooze_variant: {
      name: 'Gelatinous Cube (Giant Ooze variant)',
      alignment: 'unaligned',
      languages: [],
      habitats: ['Arcane Chambers', 'Ooze Temple', 'Undermountain'],
      appearance: [
        [
          'A near-transparent cube 30 feet on a side, with a glass-coated duergar skull suspended in the middle.',
        ],
      ],
      tableNotes: [['Rules source: Waterdeep: Dungeon of the Mad Mage, p. 34.']],
      stats: {
        size: 'gargantuan',
        type: 'ooze',
        cr: '2',
        ac: 6,
        hitDice: '8d10',
        speed: { walk: 15 },
        scores: { str: 14, dex: 3, con: 20, int: 1, wis: 6, cha: 1 },
        senses: { blindsight: 60 },
        conditionImmunities: [
          rules.blinded,
          rules.charmed,
          rules.deafened,
          rules.exhaustion,
          rules.frightened,
          rules.prone,
        ],
        abilities: [
          {
            key: 'ooze-cube',
            name: 'Ooze Cube',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The cube fills its space. A creature entering it is subjected to ',
              { ability: 'engulf' },
              ' with Disadvantage. Creatures inside are visible but have total cover. A creature within 5 ft. can use an action to pull an object or creature free with a DC 12 Strength check and takes ',
              { roll: '3d6' },
              ' acid damage when attempting it. The enlarged cube holds up to nine Large or 36 Medium or smaller creatures.',
            ],
          },
          {
            key: 'transparent',
            name: 'Transparent',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'A stationary cube that has not attacked needs a DC 15 Wisdom (Perception) check to spot. Anyone entering its space unaware is Surprised.',
            ],
          },
          {
            key: 'enlarged',
            name: 'Enlarged',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'Advantage on Strength checks and saves. Removing the glass-coated duergar skull shrinks it from 30 ft. to 10 ft. per side. Excess occupants are expelled into empty spaces. The normal cube holds one Large or four Medium or smaller creatures.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['While enlarged, make up to four ', { ability: 'pseudopod' }, ' attacks.'],
          },
          {
            key: 'pseudopod',
            name: 'Pseudopod',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '3d6', type: rules.acid }],
            },
          },
          {
            key: 'engulf',
            name: 'Engulf',
            timing: 'action',
            icon: 'gi/GiSlime',
            text: [
              'Move up to speed through spaces of Large or smaller creatures. Each makes a ',
              { dc: 'str', save: 'dex' },
              ' Dexterity save. On success, it can move 5 ft. back or to either side, or choose to fail. Failure deals ',
              { roll: '3d6' },
              ' acid and engulfs the creature. It cannot breathe, is ',
              rules.restrained,
              ', moves with the cube and takes ',
              { roll: '6d6' },
              " acid at the start of each of the cube's turns. The creature can spend an action to make a DC 12 Strength check, escaping to a space of its choice within 5 ft. on success.",
            ],
          },
        ],
      },
    },
  },
})
