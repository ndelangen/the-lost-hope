import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  bottle_of_boundless_coffee: {
    name: 'Bottle of Boundless Coffee',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This metal bottle carries delicious, warm coffee. The bottle comes with a stopper, which is attached to the bottle by a little chain. Even when open, the bottle won't accept any liquid other than the coffee it produces. The coffee inside is always comfortably warm, and none of the heat can be felt through the bottle.",
      ],
      [
        'Each time you drink the coffee, roll a d20. On a 1, the bottle refuses to dispense coffee for the next hour. If you pour coffee from the bottle, rather than drinking from it, the coffee vanishes the moment it leaves the bottle.',
      ],
    ],
    publication: refs.publications.strixhaven_a_curriculum_of_chaos,
  },
  cuddly_strixhaven_mascot: {
    name: 'Cuddly Strixhaven Mascot',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'Representing one of the mascots of Strixhaven, this soft, Tiny, magic toy is perfect for cuddling. If you press it to your arm, shoulder, or leg as an action, the toy stays attached there for 1 hour or until you use an action to remove it.',
      ],
      [
        'The toy can also be used to fight off fear. When you make a saving throw to avoid or end the ',
        rules.frightened,
        " condition on yourself, you can give yourself advantage on the roll if the toy is on your person. You must decide to do so before rolling the d20. If the save succeeds, you can't use the toy in this way until you finish a long rest.",
      ],
    ],
    publication: refs.publications.strixhaven_a_curriculum_of_chaos,
  },
  lorehold_primer: {
    name: 'Lorehold Primer',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a spellcaster',
    text: [
      [
        "The Lorehold Primer is a magic textbook created at Strixhaven's Lorehold College. The primer has 3 charges, and it regains 1d3 expended charges daily at dawn. If you make an Intelligence (History) or Intelligence (Religion) check while holding the primer, you can expend 1 charge to give yourself 1d4 bonus to the check, immediately after you roll the d20.",
      ],
      [
        'In addition, if you study the primer at the end of a long rest, you can choose one 1st-level spell from the cleric or wizard spell list. Before you finish your next long rest, you can cast the chosen spell once without a spell slot if you are holding the primer. Your spellcasting ability for this spell is your choice of Intelligence, Wisdom, or Charisma.',
      ],
    ],
    publication: refs.publications.strixhaven_a_curriculum_of_chaos,
  },
  masque_charm: {
    name: 'Masque Charm',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "A masque charm is a small silver pin. While wearing this charm, you can use an action to cast the disguise self spell (DC 13 to discern the disguise). Once the spell is cast, it can't be cast from the charm again until the next sunset. When casting the spell, you can have the spell last for its normal 1 hour duration or for 6 hours. If you choose the 6-hour duration, the charm becomes nonmagical when the spell ends. In either case, the spell ends if the charm is removed from you.",
      ],
    ],
    publication: refs.publications.strixhaven_a_curriculum_of_chaos,
  },
  murgaxors_orb: {
    name: "Murgaxor's Orb",
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        "Roiling green mist fills this glass orb, which the exiled Strixhaven mage Murgaxor once used in foul magical experiments. Murgaxor's spirit has infused the orb, which he uses to spread a terrible curse among Strixhaven's students.",
      ],
      [
        "Sentience. Murgaxor's orb is a sentient, chaotic evil magic item with the following properties:",
      ],
      [
        'The orb has an Intelligence of 20, a Wisdom of 16, and a Charisma of 16, as well as hearing and darkvision out to a range of 30 feet.',
      ],
      [
        'The orb can speak, read, and understand Common, and it can communicate telepathically with any creature touching it.',
      ],
      [
        "At any time during your turn, the orb can cast the suggestion spell (save DC 17), targeting you or one other creature that touched the orb within the last 24 hours. This isn't a power of the orb that you control.",
      ],
      [
        "Curse. Any Humanoid you touch while holding the orb must succeed on a DC 10 Wisdom saving throw or become cursed. Each creature cursed by the orb bears an echo of Murgaxor's hateful thoughts, and that creature suffers from headaches that are persistent but not debilitating until the curse ends. On your turn, the orb can use an action to produce one of the following effects, targeting one or more creatures it has cursed:",
      ],
      [
        'Unconsciousness. The cursed creature falls ',
        rules.unconscious,
        ' for 1 hour. The creature is roused if it takes damage or someone uses an action to shake or slap it awake.',
      ],
      [
        "Visions of Terror. The cursed creature sees terrifying visions, causing it to view all creatures that aren't also cursed as dangerous monsters for 10 minutes. The cursed creature must use its action each round to make one attack against the nearest non-cursed creature. If the cursed creature has multiple possible targets, it attacks one at random. This effect ends if the cursed creature is ",
        rules.incapacitated,
        '.',
      ],
      [
        "After either of these effects ends, the affected creature is no longer cursed. The curse can also be removed from a creature with a remove curse spell or similar magic. All cases of the curse end if Murgaxor's orb is destroyed.",
      ],
      [
        "Magical Signature. As a side effect of the orb's curse, the spell detect magic reveals an aura of enchantment surrounding creatures bearing the curse. This aura is distinctive, but in a way detect magic offers no further details about.",
      ],
      [
        "Destroying the Orb. Murgaxor's orb has AC 18; 20 hit points; immunity to necrotic, poison, and psychic damage; and resistance to all other types of damage. If reduced to 0 hit points, the orb shatters.",
      ],
    ],
    effects: [
      {
        key: 'murgaxor-curse',
        name: 'Murgaxor’s curse',
        lands: { on: 'failed-save', save: 'wis', dc: 10 },
        text: [
          "Each creature cursed by the orb bears an echo of Murgaxor's hateful thoughts, and that creature suffers from headaches that are persistent but not debilitating until the curse ends.",
        ],
        lasts: { kind: 'until-removed' },
        ends: {
          cure: [
            'The curse can also be removed from a creature with a remove curse spell or similar magic.',
            " All cases of the curse end if Murgaxor's orb is destroyed.",
          ],
        },
      },
      {
        key: 'unconscious',
        name: 'Unconscious',
        lands: { on: 'use' },
        conditions: [rules.unconscious],
        text: [
          'The creature is roused if it takes damage or someone uses an action to shake or slap it awake.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
      {
        key: 'visions-of-terror',
        name: 'Visions of Terror',
        lands: { on: 'use' },
        text: [
          "The cursed creature sees terrifying visions, causing it to view all creatures that aren't also cursed as dangerous monsters for 10 minutes.",
          ' The cursed creature must use its action each round to make one attack against the nearest non-cursed creature.',
          ' If the cursed creature has multiple possible targets, it attacks one at random.',
          ' This effect ends if the cursed creature is ',
          rules.incapacitated,
          '.',
        ],
        lasts: { kind: 'time', amount: '10', unit: 'minute' },
      },
    ],
    publication: refs.publications.strixhaven_a_curriculum_of_chaos,
  },
  prismari_primer: {
    name: 'Prismari Primer',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a spellcaster',
    text: [
      [
        "The Prismari Primer is a magic textbook created at Strixhaven's Prismari College. The primer has 3 charges, and it regains 1d3 expended charges daily at dawn. If you make a Dexterity (Acrobatics) or a Charisma (Performance) check while holding the primer, you can expend 1 charge to give yourself a 1d4 bonus to the check, immediately after you roll the d20.",
      ],
      [
        'In addition, if you study the primer at the end of a long rest, you can choose one 1st-level spell from the bard or sorcerer spell list. Before you finish your next long rest, you can cast the chosen spell once without a spell slot if you are holding the primer. Your spellcasting ability for this spell is your choice of Intelligence, Wisdom, or Charisma.',
      ],
    ],
    publication: refs.publications.strixhaven_a_curriculum_of_chaos,
  },
  quandrix_primer: {
    name: 'Quandrix Primer',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a spellcaster',
    text: [
      [
        "The Quandrix Primer is a magic textbook created at Strixhaven's Quandrix College. The primer has 3 charges, and it regains 1d3 expended charges daily at dawn. If you make an Intelligence (Arcana) or an Intelligence (Nature) check while holding the primer, you can expend 1 charge to give yourself a 1d4 bonus to the check, immediately after you roll the d20.",
      ],
      [
        'In addition, if you study the primer at the end of a long rest, you can choose one 1st-level spell from the druid or wizard spell list. Before you finish your next long rest, you can cast the chosen spell once without a spell slot if you are holding the primer. Your spellcasting ability for this spell is your choice of Intelligence, Wisdom, or Charisma.',
      ],
    ],
    publication: refs.publications.strixhaven_a_curriculum_of_chaos,
  },
  silverquill_primer: {
    name: 'Silverquill Primer',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a spellcaster',
    text: [
      [
        "The Silverquill Primer is a magic textbook created at Strixhaven's Silverquill College. The primer has 3 charges, and it regains 1d3 expended charges daily at dawn. If you make a Charisma (Intimidation) or a Charisma (Persuasion) check while holding the primer, you can expend 1 charge to give yourself a 1d4 bonus to the check, immediately after you roll the d20.",
      ],
      [
        'In addition, if you study the primer at the end of a long rest, you can choose one 1st-level spell from the bard or cleric spell list. Before you finish your next long rest, you can cast the chosen spell once without a spell slot if you are holding the primer. Your spellcasting ability for this spell is your choice of Intelligence, Wisdom, or Charisma.',
      ],
    ],
    publication: refs.publications.strixhaven_a_curriculum_of_chaos,
  },
  strixhaven_pennant: {
    name: 'Strixhaven Pennant',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This magic pennant bears the symbol of Strixhaven or one of its colleges: Lorehold, Prismari, Quandrix, Silverquill, or Witherbloom. While you wave the pennant, the symbol on it glitters, and the pennant sheds bright light in a 10-foot-radius and dim light for an additional 10 feet.',
      ],
    ],
    publication: refs.publications.strixhaven_a_curriculum_of_chaos,
  },
  witherbloom_primer: {
    name: 'Witherbloom Primer',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a spellcaster',
    text: [
      [
        "The Witherbloom Primer is a magic textbook created at Strixhaven's Witherbloom College. The primer has 3 charges, and it regains 1d3 expended charges daily at dawn. If you make an Intelligence (Nature) or Wisdom (Survival) check while holding the primer, you can expend 1 charge to give yourself a 1d4 bonus to the check, immediately after you roll the d20.",
      ],
      [
        'In addition, if you study the primer at the end of a long rest, you can choose one 1st-level spell from the druid or wizard spell list. Before you finish your next long rest, you can cast the chosen spell once without a spell slot if you are holding the primer. Your spellcasting ability for this spell is your choice of Intelligence, Wisdom, or Charisma.',
      ],
    ],
    publication: refs.publications.strixhaven_a_curriculum_of_chaos,
  },
})
