import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.the_orrery_of_the_wanderer,
  monsters: {
    onyx: {
      name: 'Onyx',
      page: 185,
      alignment: 'relative to the shrunken party, unaligned',
      habitats: ['grassland', 'forest', 'urban', 'desert'],
      appearance: [['A brown domestic cat with bright blue eyes.']],
      tableNotes: [
        [
          'Encounter: At the end of each character’s turn, roll on the printed Cat Chase Complications table. A hit against AC 12 makes contact without lasting damage. An attack or effect that would deal at least 10 damage gives Onyx disadvantage on attack rolls through the end of her next turn. Spell-imposed conditions end automatically at the end of her next turn. To end the chase, all living characters must hide. A passive Perception of 15 spots the mouse hole within view of the fireplace. A character looking for a ground-level hiding place can attempt a DC 15 Wisdom (Perception) check with advantage from anywhere in the room.',
        ],
      ],
      stats: {
        size: 'huge',
        type: 'beast',
        cr: '0',
        ac: 12,
        hitDice: '1d4',
        speed: { walk: 400, climb: 200 },
        scores: { str: 3, dex: 15, con: 10, int: 3, wis: 12, cha: 7 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        abilities: [
          {
            key: 'keen-smell',
            name: 'Keen Smell',
            timing: 'trait',
            icon: 'gi/GiNoseSide',
            text: [
              'Onyx has advantage on Wisdom (Perception) checks that rely on smell. She also has advantage on all ability checks and saving throws during the encounter. Any incoming damage is reduced to 0.',
            ],
          },
          {
            key: 'claws',
            name: 'Claws',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 20,
              printedBonus: 7,
              damage: [{ dice: '2d10', type: rules.slashing }],
            },
            text: ['Onyx attacks a random eligible character on her turn.'],
          },
        ],
      },
    },
  },
})
