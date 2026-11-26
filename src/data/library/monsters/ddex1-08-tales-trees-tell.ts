import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex1_08_tales_trees_tell,
  monsters: {
    pixie: {
      name: 'Pixie',
      alignment: 'neutral good',
      languages: ['Sylvan'],
      stats: {
        size: 'tiny',
        type: 'fey',
        cr: '1/4',
        ac: 15,
        hitDice: '1d4',
        speed: { walk: 10, fly: 30 },
        scores: { str: 2, dex: 20, con: 8, int: 10, wis: 14, cha: 15 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        abilities: [
          {
            key: 'magic-resistance',
            name: 'Magic Resistance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The pixie has advantage on saving throws against spells and other magical effects.',
            ],
          },
          {
            key: 'innate-spellcasting',
            name: 'Innate Spellcasting',
            timing: 'trait',
            icon: 'gi/GiWizardStaff',
            text: [
              'The pixie’s innate spellcasting ability is Charisma (spell save ',
              { dc: 'cha' },
              '). It can innately cast the following spells, requiring only its pixie dust as a component: At will: ',
              refs.spells.druidcraft,
              '; 1/day each: ',
              refs.spells.confusion,
              ', ',
              refs.spells.dancing_lights,
              ', ',
              refs.spells.detect_evil_and_good,
              ', ',
              refs.spells.detect_thoughts,
              ', ',
              refs.spells.dispel_magic,
              ', ',
              refs.spells.entangle,
              ', ',
              refs.spells.fly,
              ', ',
              refs.spells.phantasmal_force,
              ', ',
              refs.spells.polymorph,
              ', ',
              refs.spells.sleep,
            ],
          },
          {
            key: 'superior-invisibility',
            name: 'Superior Invisibility',
            timing: 'action',
            icon: 'gi/GiInvisible',
            text: [
              'The pixie magically turns ',
              rules.invisible,
              ' until its concentration ends (as if concentrating on a spell). Any equipment the pixie wears or carries is ',
              rules.invisible,
              ' with it.',
            ],
          },
        ],
      },
    },
  },
})
