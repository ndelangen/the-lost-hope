import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  hag_eye_monster_manual_2014: {
    name: 'Hag Eye',
    category: 'Wondrous Item',
    rarity: 'unknown',
    text: [
      [
        'A hag coven can craft a magic item called a hag eye, which is made from a real eye coated in varnish and often fitted to a pendant or other wearable item. The hag eye is usually entrusted to a minion for safekeeping and transport. A hag in the coven can take an action to see what the hag eye sees if the hag eye is on the same plane of existence. A hag eye has AC 10, 1 hit point, and darkvision with a radius of 60 feet. If it is destroyed, each coven member takes 3d10 psychic damage and is ',
        rules.blinded,
        ' for 24 hours.',
      ],
      [
        "A hag coven can have only one hag eye at a time, and creating a new one requires all three members of the coven to perform a ritual. The ritual takes 1 hour, and the hags can't perform it while ",
        rules.blinded,
        '. During the ritual, if the hags take any action other than performing the ritual, they must start over.',
      ],
    ],
    publication: refs.publications.monster_manual_2014,
  },
  heartstone: {
    name: 'Heartstone',
    category: 'Wondrous Item',
    rarity: 'very rare',
    text: [
      [
        'This lustrous black gem allows a night hag to become ethereal while it is in her possession. The touch of a heartstone also cures any disease. Crafting a heartstone takes 30 days.',
      ],
    ],
    publication: refs.publications.monster_manual_2014,
  },
  masters_amulet: {
    name: "Master's Amulet",
    category: 'Wondrous Item',
    rarity: 'unknown',
    text: [
      [
        'Every shield guardian has an amulet magically linked to it. A shield guardian can have only one corresponding amulet, and if that amulet is destroyed, the shield guardian is ',
        rules.incapacitated,
        " until a replacement amulet is created. A shield guardian's amulet is subject to direct attack if it isn't being worn or carried. It has AC 10, 10 hit points, and immunity to poison and psychic damage. Crafting an amulet requires 1 week and costs 1,000 gp in components.",
      ],
      [
        "A shield guardian's solitary focus is to protect the amulet's wearer. The amulet's wearer can command the guardian to attack its enemies or to guard the wielder against attack. If an attack threatens to injure the wearer, the construct can magically absorb the blow into its own body, even at a distance.",
      ],
      [
        'A spellcaster can store a single spell within a shield guardian, which can then cast the spell on command or under specific conditions. Many a wizard has been rendered helpless by enemies, only to surprise those foes when its shield guardian unleashes potent magical power.',
      ],
    ],
    publication: refs.publications.monster_manual_2014,
  },
  soul_bag: {
    name: 'Soul Bag',
    category: 'Wondrous Item',
    rarity: 'very rare',
    text: [
      [
        "When an evil humanoid dies as a result of a night hag's Nightmare Haunting, the hag catches the soul in this black sack made of stitched flesh. A soul bag can hold only one evil soul at a time, and only the night hag who crafted the bag can catch a soul with it. Crafting a soul bag takes 7 days and a humanoid sacrifice (whose flesh is used to make the bag).",
      ],
    ],
    publication: refs.publications.monster_manual_2014,
  },
})
