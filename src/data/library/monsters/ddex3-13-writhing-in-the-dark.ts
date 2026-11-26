import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex3_13_writhing_in_the_dark,
  monsters: {
    githyanki_warrior: {
      name: 'Githyanki Warrior',
      tags: ['gith'],
      alignment: 'lawful evil',
      languages: ['Gith'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '3',
        ac: 17,
        armor: 'half plate',
        hitDice: '9d8',
        speed: { walk: 30 },
        scores: { str: 15, dex: 14, con: 12, int: 13, wis: 13, cha: 10 },
        saves: { con: 'proficient', int: 'proficient', wis: 'proficient' },
        abilities: [
          {
            key: 'innate-spellcasting-psionics',
            name: 'Innate Spellcasting (Psionics)',
            timing: 'trait',
            icon: 'gi/GiWizardStaff',
            text: [
              "The githyanki's innate spellcasting ability is Intelligence. It can innately cast the following spells, requiring no components: At will: ",
              refs.spells.mage_hand,
              ' (the hand is ',
              rules.invisible,
              '); 3/day each: ',
              refs.spells.jump,
              ', ',
              refs.spells.misty_step,
              ', ',
              refs.spells.nondetection,
              ' (self only)',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The githyanki makes two greatsword attacks.'],
          },
          {
            key: 'greatsword',
            name: 'Greatsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [
                { dice: '2d6', type: rules.slashing, addModifier: true },
                { dice: '2d6', type: rules.psychic },
              ],
            },
          },
        ],
      },
    },
    intellect_devourer: {
      name: 'Intellect Devourer',
      alignment: 'lawful evil',
      languages: ["understands Deep Speech but can't speak", 'telepathy 60 ft'],
      stats: {
        size: 'tiny',
        type: 'aberration',
        cr: '2',
        ac: 12,
        hitDice: '6d4',
        speed: { walk: 40 },
        scores: { str: 6, dex: 14, con: 13, int: 12, wis: 11, cha: 10 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        senses: { blindsight: 60 },
        abilities: [
          {
            key: 'detect-sentience',
            name: 'Detect Sentience',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The intellect devourer can sense the presence and location of any creature within 300 feet of it that has an Intelligence of 3 or higher, regardless of interposing barriers, unless the creature is protected by a mind blank spell.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'The intellect devourer makes one attack with its claws and uses ',
              { ability: 'devour-intellect' },
              '.',
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
              reach: 5,
              damage: [{ dice: '2d4', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'devour-intellect',
            name: 'Devour Intellect',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            intent: 'damage',
            save: {
              ability: 'int',
              dc: 'dex',
              target: { creatures: 1, range: 10 },
              onFail: {
                damage: [{ dice: '2d10', type: rules.psychic }],
              },
            },
            text: [
              "The intellect devourer targets one creature it can see within 10 feet of it that has a brain. Also on a failure, roll 3d6: if the total equals or exceeds the target's Intelligence score, that score is reduced to 0. The target is ",
              rules.stunned,
              ' until it regains at least one point of Intelligence.',
            ],
          },
          {
            key: 'body-thief',
            name: 'Body Thief',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The intellect devourer initiates an Intelligence contest with an ',
              rules.incapacitated,
              " humanoid within 5 feet of it. If it wins the contest, the intellect devourer magically consumes the target's brain, teleports into the target's skull, and takes control of the target's body. While inside a creature, the intellect devourer has total cover against attacks and other effects originating outside its host. The intellect devourer retains its Intelligence, Wisdom, and Charisma scores, as well as its understanding of Deep Speech, its telepathy, and its traits. It otherwise adopts the target's statistics. It knows everything the creature knew, including spells and languages.",
            ],
          },
        ],
      },
    },
  },
})
