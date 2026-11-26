import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_05_the_seer,
  monsters: {
    winter_wolf: {
      name: 'Winter Wolf',
      alignment: 'neutral evil',
      languages: ['Common', 'Giant', 'Winter Wolf'],
      stats: {
        size: 'large',
        type: 'monstrosity',
        cr: '3',
        ac: 13,
        armor: 'natural armor',
        hitDice: '10d10',
        speed: { walk: 50 },
        scores: { str: 18, dex: 13, con: 14, int: 7, wis: 12, cha: 8 },
        skills: { perception: 'expert', stealth: 'proficient' },
        damageImmunities: [rules.cold],
        abilities: [
          {
            key: 'keen-hearing-and-smell',
            name: 'Keen Hearing and Smell',
            timing: 'trait',
            icon: 'gi/GiHumanEar',
            text: [
              'The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.',
            ],
          },
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              "The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally isn't ",
              rules.incapacitated,
              '. ersonal use only.',
            ],
          },
        ],
      },
    },
    zombie: {
      name: 'Zombie',
      alignment: 'neutral evil',
      languages: ['understands Common', "but can't speak"],
      stats: {
        size: 'medium',
        type: 'undead',
        cr: '1/4',
        ac: 8,
        hitDice: '3d8',
        speed: { walk: 20 },
        scores: { str: 13, dex: 6, con: 16, int: 3, wis: 6, cha: 5 },
        senses: { darkvision: 60 },
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.poisoned],
        abilities: [
          {
            key: 'undead-fortitude',
            name: 'Undead Fortitude',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead.',
            ],
          },
          {
            key: 'slam',
            name: 'Slam',
            timing: 'action',
            icon: 'gi/GiFist',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'Petr Fitzparck (orde #87649) ersonal use only. Appendix: NPC Summary This section is provided to the Dungeon Master to help keep track of the various NPCs present in the adventure.',
            ],
          },
          {
            key: 'bogaravs-bo-gahr-ahvs',
            name: 'Bogaravs (BO-gahr-ahvs)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['Friendly Vistani family of musicians. Elias and Donani are Bogaravs.'],
          },
          {
            key: 'moslavarics-mo-slav-ah-reeks',
            name: 'Moslavarics (mo-SLAV-ah-reeks)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['Dour Vistani family of crafters. Lela, Advan, and Tayrizha are Moslavarics.'],
          },
          {
            key: 'elias-uh-lie-uss',
            name: 'Elias (uh-LIE-uss)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
          },
          {
            key: 'captain-of-the-bogaravs',
            name: 'Captain of the Bogaravs',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
          },
          {
            key: 'donani-doe-nah-nee',
            name: 'Donani (doe-NAH-nee)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['A young man of the Bogaravs, engaged to Lela.'],
          },
          {
            key: 'lela-lee-luh',
            name: 'Lela (LEE-luh)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'A young woman of the Moslavarics, engaged to Donani. Unbeknownst to her family, she has become a vampire spawn.',
            ],
          },
          {
            key: 'advan-odd-vonn',
            name: 'Advan (ODD-vonn)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Son of the captain of the Moslavarics, Advan protects his father by pretending to be captain.',
            ],
          },
          {
            key: 'tayrizha-tay-reezh-uh',
            name: 'Tayrizha (tay-REEZH-uh)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
          },
          {
            key: 'raunie-of-the-moslavarics',
            name: 'Raunie of the Moslavarics',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
          },
          {
            key: 'hanzi-hahn-zee',
            name: 'Hanzi (HAHN-zee)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['A mortu, or Vistani outcast, who has fallen in love with Lela.'],
          },
        ],
      },
    },
  },
})
