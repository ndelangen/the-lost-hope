import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex2_01_city_of_danger,
  monsters: {
    quasit: {
      name: 'Quasit',
      tags: ['demon', 'shapechanger'],
      alignment: 'chaotic evil',
      languages: ['Abyssal', 'Common'],
      stats: {
        size: 'tiny',
        type: 'fiend',
        cr: '1',
        ac: 13,
        hitDice: '3d4',
        speed: { walk: 40 },
        scores: { str: 5, dex: 17, con: 10, int: 7, wis: 10, cha: 10 },
        skills: { stealth: 'proficient' },
        senses: { darkvision: 120 },
        damageResistances: [rules.cold, rules.fire, rules.lightning],
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.poisoned],
        nonmagicalResistances: [rules.bludgeoning, rules.piercing, rules.slashing],
        abilities: [
          {
            key: 'shapechanger',
            name: 'Shapechanger',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The quasit can use its action to polymorph into a beast form that resembles a bat (speed 10 ft. fly 40 ft.), a centipede (40 ft., climb 40 ft.), or a toad (40 ft., swim 40 ft.), or back into its true form. Its statistics are the same in each form, except for the speed changes noted. Any equipment it is wearing or carrying isn’t transformed. It reverts to its true form if it dies.',
            ],
          },
          {
            key: 'magic-resistance',
            name: 'Magic Resistance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The quasit has advantage on saving throws against spells and other magical effects.',
            ],
          },
          {
            key: 'claws-bite-in-beast-form',
            name: 'Claws (Bite in Beast Form)',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              printedBonus: 4,
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
            save: {
              ability: 'con',
              dc: 'con',
              target: { creatures: 1, range: 5, which: 'it hits' },
              onFail: {
                damage: [{ dice: '2d4', type: rules.poison }],
              },
            },
            text: ['Become ', { effect: 'quasit-poison' }, '.'],
            effects: [
              {
                key: 'quasit-poison',
                name: 'Poisoned',
                lands: { on: 'failed-save' },
                conditions: [rules.poisoned],
                lasts: { kind: 'time', amount: '1', unit: 'minute' },
                ends: { repeatSave: ['end-of-turn'] },
              },
            ],
          },
          {
            key: 'scare',
            name: 'Scare',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'One creature of the quasit’s choice within 20 feet of it must succeed on a ',
              { dc: 'wis' },
              ' Wisdom saving throw or be ',
              { effect: 'scare-fright' },
              '.',
            ],
            effects: [
              {
                key: 'scare-fright',
                name: 'Frightened',
                lands: { on: 'save', save: 'wis', dc: 'wis' },
                conditions: [rules.frightened],
                text: [
                  'The target can repeat the saving throw at the end of each of its turns, with disadvantage if the quasit is within line of sight, ending the effect on itself on a success.',
                ],
                lasts: { kind: 'time', amount: '1', unit: 'minute' },
              },
            ],
            uses: 1,
            recharge: 'Long rest',
          },
          {
            key: 'invisibility',
            name: 'Invisibility',
            timing: 'action',
            icon: 'gi/GiInvisible',
            text: [
              'The quasit magically turns ',
              rules.invisible,
              ' until it attacks or uses ',
              { ability: 'scare' },
              ', or until its concentration ends (as if concentrating on a spell). Any equipment the quasit wears or carries is ',
              rules.invisible,
              ' with it. City of Danger DM Appendix: NPC This section is provided to the Dungeon Master to help keep track of the various NPCs present in the adventure.',
            ],
            effects: [],
          },
          {
            key: 'astrid-saj-saw',
            name: 'Astrid Saj (SAW)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Human female, wealthy merchant, ambitious, hires the characters to assist during her tenday long celebration.',
            ],
          },
          {
            key: 'saul-sawl',
            name: 'Saul (SAWL)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Male halfling, footman in the house hold of Astrid Saj, inquisitive, knowledgeable and talkative, he can be used to impart information about Mulmaster, other servants or guests or alert the characters to job opportunities. A tool for DMs running multiple miniadventures for the same group, or to encourage characters to take the low paying jobs. Mini-Adventure 1 NPCs Arne & Jaque Kron (KRONE). Burly human males, members of the City Watch and brothers of Binnacy Kron.',
            ],
          },
          {
            key: 'binnacy-kron-bin-ah-see-krone',
            name: 'Binnacy Kron (BIN-ah-see KRONE)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Female human, serving as temporary seamstress for Astrid Saj, short, stout, appears used to manual labor less delicate than sewing. She attacked Larch deJun to give her brothers the opportunity to kidnap him. Larch deJun (LARCH duh-SHOON). Eighteen-year old human male, target of Kron family vengeance against his older brother, kidnap victim.',
            ],
          },
          {
            key: 'maude-kron',
            name: 'Maude Kron',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              '(MOD KRONE). Dead female human, her refusal to join the Cloaks resulted in her exile from the city and subsequent death at the hands of bandits. Her family blames the Cloaks and petitioned the god Talos for aid in gaining vengeance. Nevlon deJun (NAY-lawn duh-SHOON). Male human member of the Cloaks, works to seek out denizens of Mulmaster who practice unsanctioned magic. Older brother of Larch. Hires the characters to find his brother.',
            ],
          },
          {
            key: 'proskler-pros-kler',
            name: 'Proskler (PROS-kler)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Male human acolyte of Talos, god of storms. Sent to assist the Kron family plot.',
            ],
          },
          {
            key: 'mini-adventure-2-npcs-count-blazen-stoe-blay-zen-stow',
            name: 'Mini-Adventure 2 NPCs Count Blazen Stoe (BLAY-zen STOW)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Male human, a Blade (ruling noble) gave an ultimatum to son regarding unsuitable friend 3 days ago, now he wants the characters to retrieve the son from where he is and bring him home. Ilva (ILL-vuh) (A.K.A Helga or Ilga). Female human barmaid at the Black Blade and Bloody Boar Tavern refuge from Phlan, has been impressed with motivational speaker who encourages people to find the fire within.',
            ],
          },
          {
            key: 'ma',
            name: 'Ma',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['A short elderly female human barkeep of the Black'],
          },
        ],
      },
    },
  },
})
