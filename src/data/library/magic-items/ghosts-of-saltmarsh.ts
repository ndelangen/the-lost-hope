import { refs } from '#/data/generated/library-refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

export default createMagicItems({
  charm_of_plant_command: {
    name: 'Charm of Plant Command',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'This fist-sized charm is made from a bundle of dried plant stems wrapped in silver thread. Hung on a leather thong, it is typically worn around the neck or attached to a belt.',
      ],
      [
        'This charm has 3 charges. While you bear the charm, you can expend 1 charge as an action to cast the speak with plants spell. For the duration of the spell, you also have advantage on Charisma checks made to influence the behavior, demeanor, and attitude of plants. The charm regains all expended charges at dawn each day.',
      ],
    ],
    publication: refs.publications.ghosts_of_saltmarsh,
  },
  cursed_luckstone: {
    name: 'Cursed Luckstone',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "This flat, gray-and-black river stone is inscribed with an unknown arcane symbol and feels cool to the touch. While carrying the stone, you can gain advantage on one ability check of your choice. The stone can't be used this way again until the next dawn.",
      ],
      [
        "Curse. This item is cursed. Attuning to it curses you until you are targeted by a remove curse spell or similar magic. As long as you remain cursed, you cannot discard the stone, which immediately teleports back into your pocket or pack. After you use the stone's magic, your next two ability checks are made with disadvantage.",
      ],
    ],
    publication: refs.publications.ghosts_of_saltmarsh,
  },
  helm_of_underwater_action: {
    name: 'Helm of Underwater Action',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'While wearing this brass helmet, you can breathe underwater, you gain darkvision with a range of 60 feet, and you gain a swimming speed of 30 feet.',
      ],
    ],
    publication: refs.publications.ghosts_of_saltmarsh,
  },
  pipe_of_remembrance: {
    name: 'Pipe of Remembrance',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This long, delicate wooden pipe features a bowl made from smooth river stone. When the pipe is lit, smoke exhaled from it does not dissipate, instead lingering around the bearer. After 10 minutes, the smoke forms moving shapes that reenact the bearer's most impressive and heroic achievements for 5 minutes. When this realistic performance is complete, the smoke dissipates. The pipe can't be used this way again until the next dawn.",
      ],
    ],
    publication: refs.publications.ghosts_of_saltmarsh,
  },
  pressure_capsule: {
    name: 'Pressure Capsule',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This small capsule is made of beeswax blended with sand and a variety of enchanted water plants. A creature who consumes a pressure capsule ignores the effects of swimming at depths greater than 100 feet (see "Unusual Environments" in chapter 5 of the Dungeon Master\'s Guide).',
      ],
    ],
    publication: refs.publications.ghosts_of_saltmarsh,
  },
  sekolahian_worshiping_statuette: {
    name: 'Sekolahian Worshiping Statuette',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "Skillfully carved from sandstone, this 1-foot-tall statuette depicts a shark twisting through the water with its mouth open. If any Tiny sea-dwelling animal is within 1 inch of the statuette's mouth, the shark flashes to life and deals 1 piercing damage to it. The shark can deal damage in this way no more than once per hour.",
      ],
    ],
    publication: refs.publications.ghosts_of_saltmarsh,
  },
})
