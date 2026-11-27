import { refs } from '#/data/generated/library-refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

export default createMagicItems({
  iggwilvs_horn: {
    name: "Iggwilv's Horn",
    category: 'Wondrous Item',
    detail: 'Horn',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'You can use an action to blow this horn to cast one of the following spells from it: Arms of Hadar, Fog Cloud, Gust of Wind, or Web. If the spell requires a saving throw, the spell save DC is 13.',
      ],
      [
        "Once the horn has been used to cast a spell, it can't be used to cast that spell again until the next dawn.",
      ],
    ],
    publication: refs.publications.descent_into_the_lost_caverns_of_tsojcanth,
  },
  potion_of_polychromy: {
    name: 'Potion of Polychromy',
    category: 'Potion',
    rarity: 'uncommon',
    text: [
      [
        'When you drink this potion, you and everything you are wearing or carrying take on a rainbow-hued appearance for 1 hour. During that time, you can use a bonus action to turn any color or combination of colors you choose. If you mimic the colors of your surroundings, your hues continually shift to match your surroundings, and you have advantage on Dexterity (Stealth) checks until you change your colors again or the potion wears off.',
      ],
      [
        'The potion is separated into seven brightly colored bands of immiscible liquids and has a syrupy taste.',
      ],
    ],
    effects: [
      {
        key: 'polychromy',
        name: 'Polychromy',
        lands: { on: 'use' },
        text: [
          'you and everything you are wearing or carrying take on a rainbow-hued appearance for 1 hour. During that time, you can use a bonus action to turn any color or combination of colors you choose. If you mimic the colors of your surroundings, your hues continually shift to match your surroundings, and you have advantage on Dexterity (Stealth) checks until you change your colors again or the potion wears off.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.descent_into_the_lost_caverns_of_tsojcanth,
  },
  tashas_creeping_keelboat: {
    name: "Tasha's Creeping Keelboat",
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      [
        "This magic vehicle is a boat 10 feet wide and 30 feet long. It has four legs that propel it across land and water. It has a walking and swimming speed of 20 feet, but it can't travel underwater. The boat moves according to your spoken directions while you are riding it, and creatures of your choice gain a +1 bonus to their Armor Class while on the boat.",
      ],
      [
        'The boat can transport up to 1,000 pounds without hindrance. It can carry up to twice this weight, but it moves at half speed if it carries more than its normal capacity.',
      ],
    ],
    publication: refs.publications.descent_into_the_lost_caverns_of_tsojcanth,
  },
})
