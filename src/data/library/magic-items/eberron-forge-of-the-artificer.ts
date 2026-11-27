import { refs } from '#/data/generated/library-refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

export default createMagicItems({
  boots_of_the_winding_path: {
    name: 'Boots of the Winding Path',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'While wearing these boots, you can take a Bonus Action to teleport up to 15 feet to an unoccupied space you can see. You must have occupied that space at some point during the current turn.',
      ],
    ],
    publication: refs.publications.eberron_forge_of_the_artificer,
  },
  helm_of_awareness: {
    name: 'Helm of Awareness',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [['While wearing this helmet, you have Advantage on Initiative rolls.']],
    publication: refs.publications.eberron_forge_of_the_artificer,
  },
  manifold_tool: {
    name: 'Manifold Tool',
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: true,
    text: [
      [
        "This tool takes the form of a wrench, a screwdriver, or another basic tool. As a Magic action, you can touch the item and transform it into a type of Artisan's Tools of your choice. Whatever form the tool takes, you have proficiency with it when you use it.",
      ],
    ],
    publication: refs.publications.eberron_forge_of_the_artificer,
  },
  mind_sharpener: {
    name: 'Mind Sharpener',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "The item has 4 charges. When you fail a Constitution saving throw to maintain Concentration, you can take a Reaction and expend 1 of the item's charges to succeed instead. The item regains 1d4 expended charges daily at dawn.",
      ],
    ],
    publication: refs.publications.eberron_forge_of_the_artificer,
  },
  repulsion_shield: {
    name: 'Repulsion Shield',
    category: 'Shield',
    detail: 'Shield',
    rarity: 'uncommon',
    text: [
      ['Weight · 6 lb'],
      ['You gain a +1 bonus to Armor Class while wielding this shield.'],
      [
        "The shield has 4 charges. While holding it, when a Large or smaller creature within 5 feet of you hits you with a melee attack roll, you can take a Reaction to expend 1 of the shield's charges and push the attacker up to 15 feet straight away. The shield regains 1d4 expended charges daily at dawn.",
      ],
    ],
    publication: refs.publications.eberron_forge_of_the_artificer,
  },
  spell_refueling_ring: {
    name: 'Spell-Refueling Ring',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: 'by a spellcaster',
    text: [
      [
        "While wearing this ring, you can recover one expended spell slot as a Bonus Action. The recovered slot can be of level 3 or lower. Once used, the ring can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.eberron_forge_of_the_artificer,
  },
})
