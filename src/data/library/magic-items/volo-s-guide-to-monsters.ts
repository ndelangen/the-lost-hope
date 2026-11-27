import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  mind_lash: {
    name: 'Mind Lash',
    category: 'Weapon',
    rarity: 'rare',
    attunement: 'by a mind flayer',
    text: [
      ['Weight · 3 lb'],
      [
        "In the hands of any creature other than a mind flayer, a mind lash functions as a normal whip. In the hands of an illithid, this magic weapon strips away a creature's will to survive as it also strips away flesh, dealing an extra 2d4 psychic damage to any target it hits. Any creature that takes psychic damage from the mind lash must also succeed on a DC 15 Wisdom saving throw or have disadvantage on Intelligence, Wisdom, and Charisma saving throws for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
      ],
    ],
    publication: refs.publications.volo_s_guide_to_monsters,
  },
  shield_of_far_sight: {
    name: 'Shield of Far Sight',
    category: 'Shield',
    rarity: 'rare',
    text: [
      ['Weight · 6 lb'],
      [
        "A mind flayer skilled at crafting magic items creates a shield of far sight by harvesting an eye from an intelligent humanoid and magically implanting it on the outer surface of a nonmagical shield. The shield becomes a magic item once the eyes is implanted, whereupon the mind flayer can give the shield to a thrall or hang it on a wall in its lair. As long as the shield is on the same plane of existence as its creator, the mind flayer can see through the shield's eye, which has darkvision out to a range of 60 feet. While peering through this magical eye, the mind flayer can use its Mind Blast action as though it were standing behind the shield.",
      ],
      [
        'If a shield of far sight is destroyed, the mind flayer that created it is ',
        rules.blinded,
        ' for 2d12 hours.',
      ],
    ],
    publication: refs.publications.volo_s_guide_to_monsters,
  },
})
