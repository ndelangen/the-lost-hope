import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_04_the_marionette,
  monsters: {
    skeleton: {
      name: 'Skeleton',
      alignment: 'neutral evil',
      languages: ["understands all languages it knew in life but can't speak"],
      stats: {
        size: 'medium',
        type: 'undead',
        cr: '1/4',
        ac: 13,
        hitDice: '2d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 14, con: 15, int: 6, wis: 8, cha: 5 },
        senses: { darkvision: 60 },
        damageImmunities: [rules.poison],
        damageVulnerabilities: [rules.bludgeoning],
        conditionImmunities: [rules.exhaustion, rules.poisoned],
        abilities: [
          {
            key: 'shortsword',
            name: 'Shortsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
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
        ],
      },
    },
    zombie: {
      name: 'Zombie',
      alignment: 'neutral evil',
      languages: ["understands the languages it knew in life but can't speak"],
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
            text: ['Ersonal use only.'],
          },
          {
            key: 'dm-appendix',
            name: 'DM Appendix',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'NPC This section is provided to the Dungeon Master to help keep track of the various NPCs present in the adventure.',
            ],
          },
          {
            key: 'isabella-falinescu-ee-sah-bel-luh-fall-in-esskoo',
            name: 'Isabella Falinescu (ee-sah-BEL-luh FALL-in-ESSkoo)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['Female human daughter of Glovia and Lucian who exists now as a ghost.'],
          },
          {
            key: 'glovia-falinescu-glow-vee-uh-fall-in-esskoo',
            name: 'Glovia Falinescu (GLOW-vee-uh FALL-in-ESSkoo)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'A heartbroken mother and healer who lost her child to disease. Highly educated in anatomy and seeks to be reunited through whatever means possible.',
            ],
          },
          {
            key: 'first-of-esmae-amarantha-s-four-obsessions',
            name: 'First of Esmae Amarantha’s Four Obsessions',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
          },
          {
            key: 'ivan-randovich-eye-vun-ran-doe-vich',
            name: 'Ivan Randovich (EYE-vun RAN-doe-vich)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The Burgomaster of the village of Orașnou. Through heavy taxation and the high prices of goods he alone provides, he has grown fat, vain and rich on the backs of those he has subjugated.',
            ],
          },
          {
            key: 'sybil-rasia-si-buhl-rah-see-uh',
            name: 'Sybil Rasia (Si-buhl RAH-see-uh)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['Female Gur fortune teller.'],
          },
          {
            key: 'marku-grelon-mar-koo-gree-lawn',
            name: 'Marku Grelon (MAR-koo GREE-lawn)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['Male human.'],
          },
          {
            key: 'owner-of-the-seven-tables-inn-and-tavern',
            name: 'Owner of the Seven Tables Inn and Tavern',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
          },
          {
            key: 'crina-grelon-kree-nah-gree-lawn',
            name: 'Crina Grelon (KREE-nah GREE-lawn)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['Female human.'],
          },
          {
            key: 'owner-of-the-seven-tables-inn-and-tavern-2',
            name: 'Owner of the Seven Tables Inn and Tavern',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
          },
          {
            key: 'vasile-vah-seel',
            name: 'Vasile (vah-SEEL)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Male human nephew of Marku and Crina Grelon. Petr Fitzparck (orde #87649) ersonal use only.',
            ],
          },
          {
            key: 'dm-appendix-2',
            name: 'DM Appendix',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Tips for Pacing & Extending the This adventure is intended to be a 4-hour adventure, but there are several opportunities to expand for extended play beyond that constraint. If the 4-hour time limit is critical, use these tips to avoid an extended session.  Remove the difficulty checks in the “In Search of Vasile” event and simply advise the adventurers of the opportunity to scare off the harpies.',
            ],
          },
        ],
      },
    },
  },
})
