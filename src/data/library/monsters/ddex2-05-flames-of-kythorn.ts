import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex2_05_flames_of_kythorn,
  monsters: {
    commoner: {
      name: 'Commoner',
      reprintedIn: [
        refs.publications.basic_rules_2018,
        refs.publications.ddep2_mulmaster_undone_v2,
        refs.publications.hoard_of_the_dragon_queen_online_supplement,
        refs.publications.rise_of_tiamat_online_supplement,
      ],
      tags: ['any race'],
      alignment: 'any alignment',
      languages: ['any one language (usually Common)'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '0',
        ac: 10,
        hitDice: '1d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
        abilities: [
          {
            key: 'club',
            name: 'Club',
            timing: 'action',
            icon: 'gi/GiSpikedBat',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'Flames of Kythorn Flames of Kythorn Map: The Wave and Wink Flames of Kythorn DM Appendix: NPC This section is provided to the Dungeon Master to help keep track of the various NPCs present in the adventure.',
            ],
          },
          {
            key: 'zor-faltyn-gos-zore-fall-teen-goss',
            name: 'Zor Faltyn Gos (ZORE fall-TEEN GOSS)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Insufferable male human noble. Loves talking about himself, but if afforded the respect appropriate to his station, he is otherwise cordial.',
            ],
          },
          {
            key: 'marim-tem-may-rim-tem',
            name: 'Marim Tem (MAY-rim TEM)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Male half-elf trouper. Rumored to know every song ever written. Unfortunately, his reputation has gotten the better of him. He is pompous and arrogant and ',
              rules.prone,
              " to throwing a tantrum if he doesn't get his way.",
            ],
            effects: [],
          },
          {
            key: 'zora-tiega-gos-zore-uh-tee-egg-uh-goss',
            name: 'Zora Tiega Gos (ZORE-uh TEE-egg-uh GOSS)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Female human noble, wife to Zor Faltyn Gos. Surprisingly down to earth and friendly. She adores art, knowledge, and living life to its fullest-a quality that her husband finds embarrassing.',
            ],
          },
          {
            key: 'kata-brizik-kat-uh-briz-ick',
            name: 'Kata Brizik (KAT-uh briz-ICK)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['Female human.'],
          },
          {
            key: 'wife-of-urdun-brizik',
            name: 'Wife of Urdun Brizik',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              "Although a talented dancer, she is relegated to managing the day-to-day of the Wave and Wink. Jealous of her husband's flirtations.",
            ],
          },
          {
            key: 'urdun-brizik-er-dun-briz-ick',
            name: 'Urdun Brizik (ER-dun briz-ICK)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['Male half-elf.'],
          },
          {
            key: 'over-of-the-wave-and-wink',
            name: 'Over of the Wave and Wink',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Handsome and flirtatious. Paranoid of being taken advantage or worse yet, robbed.',
            ],
          },
          {
            key: 'azak-throm-az-ack-throw-m',
            name: 'Azak Throm (AZ-ack THROW-m)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Male human. Thayan through and through, Azak is calculating and cunning. He has an immense ego which is tempered by incredible patience. His head is shaved, but he wears none of the tattoos commonly associated with red wizards.',
            ],
          },
          {
            key: 'andrik-gos-and-rick-goss',
            name: 'Andrik Gos (AND-rick GOSS)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The nephew of Zor and Zora Gos. The typical tortured artist, Andrik’s mind is fragile and the boy is easily susceptible to outside influence, as demonstrated in the events that transpire during the course of this adventure.',
            ],
          },
          {
            key: 'melori-ostur-meh-lore-ee-oh-stir',
            name: 'Melori Ostur (MEH-lore-ee OH-stir)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['Human male sergeant among the city watch.'],
          },
          {
            key: 'jurina-plem-yur-ee-na-plem',
            name: 'Jurina Plem (YUR-ee-na PLEM)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Human female curator at the Ironheart Gallery—a gallery owned by Zor Gos and used to display and sell art. Passionate about art.',
            ],
          },
          {
            key: 'doril-cire-dore-eel-sire',
            name: 'Doril Cire (DORE-eel SIRE)',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['Human male glassblower.'],
          },
          {
            key: 'member-of-the-cult-of-the-eternal-flame',
            name: 'Member of the Cult of the Eternal Flame',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Used his skill in blowing glass to create the magmin that run through Mulmaster, setting the city ablaze.',
            ],
          },
        ],
      },
    },
    guard: {
      name: 'Guard',
      tags: ['any race'],
      alignment: 'any alignment',
      languages: ['any one language (usually Common)'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/8',
        ac: 16,
        armor: 'chain shirt, shield',
        hitDice: '2d8',
        speed: { walk: 30 },
        scores: { str: 13, dex: 12, con: 12, int: 10, wis: 11, cha: 10 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'spear',
            name: 'Spear',
            timing: 'action',
            icon: 'gi/GiThrownDaggers',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              thrown: [20, 60],
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
