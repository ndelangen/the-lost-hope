import { refs } from '#/data/generated/library-refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

export default createMagicItems({
  command_amulet: {
    name: 'Command Amulet',
    category: 'Wondrous Item',
    rarity: 'unknown',
    text: [
      ['Weight · 1 lb'],
      [
        "Each Shield Guardian is magically bound to an amulet. While the guardian and its amulet are on the same plane of existence, the amulet's wearer can telepathically call the guardian to travel to it, and the guardian knows the distance and direction to the amulet. If the guardian is within 60 feet of the amulet's wearer, half of any damage the wearer takes (round up) is transferred to the guardian.",
      ],
      [
        "A shield guardian's command amulet might be passed down through a magic-using society or family for generations.",
      ],
    ],
    publication: refs.publications.monster_manual_2024,
  },
})
