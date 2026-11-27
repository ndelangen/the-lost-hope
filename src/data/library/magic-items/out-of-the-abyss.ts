import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  dawnbringer: {
    name: 'Dawnbringer',
    category: 'Weapon',
    detail: 'Longsword',
    rarity: 'legendary',
    attunement: 'by a creature of non-evil alignment',
    text: [
      ['Weight · 3 lb'],
      [
        'Lost for ages in the Underdark, Dawnbringer appears to be a gilded longsword hilt. While grasping the hilt, you can use a bonus action to make a blade of pure radiance spring from the hilt, or cause the blade to disappear. While the blade exists, this magic longsword has the finesse property. If you are proficient with shortswords or longswords, you are proficient with Dawnbringer.',
      ],
      [
        'You gain a +2 bonus to attack and damage rolls made with this weapon, which deals radiant damage instead of slashing damage. When you hit an undead with it, that target takes an extra 1d8 radiant damage.',
      ],
      [
        "The sword's luminous blade emits bright light in a 15-foot radius and dim light for an additional 15 feet. The light is sunlight. While the blade persists, you can use an action to expand or reduce its radius of bright and dim light by 5 feet each, to a maximum of 30 feet each or a minimum of 10 feet each.",
      ],
      [
        "While holding the weapon, you can use an action to touch a creature with the blade and cast lesser restoration on that creature. Once used, this ability can't be used again until the next dawn.",
      ],
      [
        'Sentience. Dawnbringer is a sentient neutral good weapon with an Intelligence of 12, a Wisdom of 15, and a Charisma of 14. It has hearing and darkvision out to a range of 120 feet.',
      ],
      [
        'The sword can speak, read, and understand Common, and it can communicate with its wielder telepathically. Its voice is kind and feminine. It knows every language you know while attuned to it.',
      ],
      [
        'Personality. Forged by ancient sun worshippers, Dawnbringer is meant to bring light into darkness and to fight creatures of darkness. It is kind and compassionate to those in need, but fierce and destructive to its enemies.',
      ],
      [
        'Long years lost in darkness have made Dawnbringer frightened of both the dark and abandonment. It prefers that its blade always be present and shedding light in areas of darkness, and it strongly resists being parted from its wielder for any length of time.',
      ],
    ],
    publication: refs.publications.out_of_the_abyss,
  },
  gravenhollow_compass_ring: {
    name: 'Gravenhollow Compass Ring',
    category: 'Wondrous Item',
    rarity: 'unknown',
    text: [
      [
        "This gold ring is fitted with a star ruby worth 1,000 gp. A detect magic spell reveals that the gem radiates a faint aura of divination magic. The gem's star-shaped core is a magical compass that guides the ring's wearer along the safest, shortest route to Gravenhollow.",
      ],
    ],
    publication: refs.publications.out_of_the_abyss,
  },
  piwafwi_cloak_of_elvenkind: {
    name: 'Piwafwi (Cloak of Elvenkind)',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'This dark spider silk cloak is made by drow. It is a cloak of elvenkind. It loses its magic if exposed to sunlight for 1 hour without interruption.',
      ],
      [
        "While you wear this cloak with its hood up, Wisdom (Perception) checks made to see you have disadvantage. and you have advantage on Dexterity (Stealth) checks made to hide, as the cloak's color shifts to camouflage you. Pulling the hood up or down requires an action.",
      ],
    ],
    publication: refs.publications.out_of_the_abyss,
  },
  piwafwi_of_fire_resistance: {
    name: 'Piwafwi of Fire Resistance',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'This dark spider silk cloak is made by drow. It is a cloak of elvenkind. It also grants resistance to fire damage while you wear it. It loses its magic if exposed to sunlight for 1 hour without interruption.',
      ],
      [
        "While you wear this cloak with its hood up, Wisdom (Perception) checks made to see you have disadvantage. and you have advantage on Dexterity (Stealth) checks made to hide, as the cloak's color shifts to camouflage you. Pulling the hood up or down requires an action.",
      ],
    ],
    publication: refs.publications.out_of_the_abyss,
  },
  spell_gem_amber: {
    name: 'Spell Gem (Amber)',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: 'optional',
    text: [
      [
        "An amber spell gem can contain one spell from any class's spell list. You become aware of the spell when you learn the gem's properties. While holding the gem, you can cast the spell from it as an action if you know the spell or if the spell is on your class's spell list. Doing so doesn't require any components, and doesn't require attunement. The spell then disappears from the gem.",
      ],
      [
        "If the spell is of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC equals 10 + the spell's level. On a failed check, the spell disappears from the gem with no other effect.",
      ],
      [
        'An amber spell gem can store up to 4th level spells. Spells cast from the spell gem have a save DC of 15 and an attack bonus of +9.',
      ],
      [
        "You can imbue the gem with a spell if you're attuned to it and it's empty. To do so, you cast the spell while holding the gem. The spell is stored in the gem instead of having any effect. Casting the spell must require either 1 action or 1 minute or longer, and the spell's level must be no higher than the gem's maximum. If the spell belongs to the school of abjuration and requires material components that are consumed, you must provide them, but they can be worth half as much as normal.",
      ],
      ["Once imbued with a spell, the gem can't be imbued again until the next dawn."],
      ['Deep gnomes created these magic gemstones and keep the creation process a secret.'],
    ],
    publication: refs.publications.out_of_the_abyss,
  },
  spell_gem_bloodstone: {
    name: 'Spell Gem (Bloodstone)',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'optional',
    text: [
      [
        "A bloodstone spell gem can contain one spell from any class's spell list. You become aware of the spell when you learn the gem's properties. While holding the gem, you can cast the spell from it as an action if you know the spell or if the spell is on your class's spell list. Doing so doesn't require any components, and doesn't require attunement. The spell then disappears from the gem.",
      ],
      [
        "If the spell is of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC equals 10 + the spell's level. On a failed check, the spell disappears from the gem with no other effect.",
      ],
      [
        'A bloodstone spell gem can store up to 3rd level spells. Spells cast from the spell gem have a save DC of 15 and an attack bonus of +7.',
      ],
      [
        "You can imbue the gem with a spell if you're attuned to it and it's empty. To do so, you cast the spell while holding the gem. The spell is stored in the gem instead of having any effect. Casting the spell must require either 1 action or 1 minute or longer, and the spell's level must be no higher than the gem's maximum. If the spell belongs to the school of abjuration and requires material components that are consumed, you must provide them, but they can be worth half as much as normal.",
      ],
      ["Once imbued with a spell, the gem can't be imbued again until the next dawn."],
      ['Deep gnomes created these magic gemstones and keep the creation process a secret.'],
    ],
    publication: refs.publications.out_of_the_abyss,
  },
  spell_gem_diamond: {
    name: 'Spell Gem (Diamond)',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: 'optional',
    text: [
      [
        "A diamond spell gem can contain one spell from any class's spell list. You become aware of the spell when you learn the gem's properties. While holding the gem, you can cast the spell from it as an action if you know the spell or if the spell is on your class's spell list. Doing so doesn't require any components, and doesn't require attunement. The spell then disappears from the gem.",
      ],
      [
        "If the spell is of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC equals 10 + the spell's level. On a failed check, the spell disappears from the gem with no other effect.",
      ],
      [
        'A diamond spell gem can store up to 9th level spells. Spells cast from the spell gem have a save DC of 19 and an attack bonus of +11.',
      ],
      [
        "You can imbue the gem with a spell if you're attuned to it and it's empty. To do so, you cast the spell while holding the gem. The spell is stored in the gem instead of having any effect. Casting the spell must require either 1 action or 1 minute or longer, and the spell's level must be no higher than the gem's maximum. If the spell belongs to the school of abjuration and requires material components that are consumed, you must provide them, but they can be worth half as much as normal.",
      ],
      ["Once imbued with a spell, the gem can't be imbued again until the next dawn."],
      ['Deep gnomes created these magic gemstones and keep the creation process a secret.'],
    ],
    publication: refs.publications.out_of_the_abyss,
  },
  spell_gem_jade: {
    name: 'Spell Gem (Jade)',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: 'optional',
    text: [
      [
        "A jade spell gem can contain one spell from any class's spell list. You become aware of the spell when you learn the gem's properties. While holding the gem, you can cast the spell from it as an action if you know the spell or if the spell is on your class's spell list. Doing so doesn't require any components, and doesn't require attunement. The spell then disappears from the gem.",
      ],
      [
        "If the spell is of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC equals 10 + the spell's level. On a failed check, the spell disappears from the gem with no other effect.",
      ],
      [
        'A jade spell gem can store up to 5th level spells. Spells cast from the spell gem have a save DC of 17 and an attack bonus of +9.',
      ],
      [
        "You can imbue the gem with a spell if you're attuned to it and it's empty. To do so, you cast the spell while holding the gem. The spell is stored in the gem instead of having any effect. Casting the spell must require either 1 action or 1 minute or longer, and the spell's level must be no higher than the gem's maximum. If the spell belongs to the school of abjuration and requires material components that are consumed, you must provide them, but they can be worth half as much as normal.",
      ],
      ["Once imbued with a spell, the gem can't be imbued again until the next dawn."],
      ['Deep gnomes created these magic gemstones and keep the creation process a secret.'],
    ],
    publication: refs.publications.out_of_the_abyss,
  },
  spell_gem_lapis_lazuli: {
    name: 'Spell Gem (Lapis lazuli)',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'optional',
    text: [
      [
        "A lapis lazuli spell gem can contain one spell from any class's spell list. You become aware of the spell when you learn the gem's properties. While holding the gem, you can cast the spell from it as an action if you know the spell or if the spell is on your class's spell list. Doing so doesn't require any components, and doesn't require attunement. The spell then disappears from the gem.",
      ],
      [
        "If the spell is of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC equals 10 + the spell's level. On a failed check, the spell disappears from the gem with no other effect.",
      ],
      [
        'A lapis lazuli spell gem can store up to 1st level spells. Spells cast from the spell gem have a save DC of 13 and an attack bonus of +5.',
      ],
      [
        "You can imbue the gem with a spell if you're attuned to it and it's empty. To do so, you cast the spell while holding the gem. The spell is stored in the gem instead of having any effect. Casting the spell must require either 1 action or 1 minute or longer, and the spell's level must be no higher than the gem's maximum. If the spell belongs to the school of abjuration and requires material components that are consumed, you must provide them, but they can be worth half as much as normal.",
      ],
      ["Once imbued with a spell, the gem can't be imbued again until the next dawn."],
      ['Deep gnomes created these magic gemstones and keep the creation process a secret.'],
    ],
    publication: refs.publications.out_of_the_abyss,
  },
  spell_gem_obsidian: {
    name: 'Spell Gem (Obsidian)',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'optional',
    text: [
      [
        "An obsidian spell gem can contain one cantrip from any class's spell list. You become aware of the spell when you learn the gem's properties. While holding the gem, you can cast the spell from it as an action if you know the spell or if the spell is on your class's spell list. Doing so doesn't require any components, and doesn't require attunement. The spell then disappears from the gem.",
      ],
      [
        "If the spell is of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC equals 10 + the spell's level. On a failed check, the spell disappears from the gem with no other effect.",
      ],
      [
        'An obsidian spell gem can only store cantrips. Cantrips cast from the spell gem have a save DC of 13 and an attack bonus of +5.',
      ],
      [
        "You can imbue the gem with a spell if you're attuned to it and it's empty. To do so, you cast the spell while holding the gem. The spell is stored in the gem instead of having any effect. Casting the spell must require either 1 action or 1 minute or longer, and the spell's level must be no higher than the gem's maximum. If the spell belongs to the school of abjuration and requires material components that are consumed, you must provide them, but they can be worth half as much as normal.",
      ],
      ["Once imbued with a spell, the gem can't be imbued again until the next dawn."],
      ['Deep gnomes created these magic gemstones and keep the creation process a secret.'],
    ],
    publication: refs.publications.out_of_the_abyss,
  },
  spell_gem_quartz: {
    name: 'Spell Gem (Quartz)',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'optional',
    text: [
      [
        "A quartz spell gem can contain one spell from any class's spell list. You become aware of the spell when you learn the gem's properties. While holding the gem, you can cast the spell from it as an action if you know the spell or if the spell is on your class's spell list. Doing so doesn't require any components, and doesn't require attunement. The spell then disappears from the gem.",
      ],
      [
        "If the spell is of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC equals 10 + the spell's level. On a failed check, the spell disappears from the gem with no other effect.",
      ],
      [
        'A quartz spell gem can store up to 2nd level spells. Spells cast from the spell gem have a save DC of 13 and an attack bonus of +5.',
      ],
      [
        "You can imbue the gem with a spell if you're attuned to it and it's empty. To do so, you cast the spell while holding the gem. The spell is stored in the gem instead of having any effect. Casting the spell must require either 1 action or 1 minute or longer, and the spell's level must be no higher than the gem's maximum. If the spell belongs to the school of abjuration and requires material components that are consumed, you must provide them, but they can be worth half as much as normal.",
      ],
      ["Once imbued with a spell, the gem can't be imbued again until the next dawn."],
      ['Deep gnomes created these magic gemstones and keep the creation process a secret.'],
    ],
    publication: refs.publications.out_of_the_abyss,
  },
  spell_gem_ruby: {
    name: 'Spell Gem (Ruby)',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: 'optional',
    text: [
      [
        "A ruby spell gem can contain one spell from any class's spell list. You become aware of the spell when you learn the gem's properties. While holding the gem, you can cast the spell from it as an action if you know the spell or if the spell is on your class's spell list. Doing so doesn't require any components, and doesn't require attunement. The spell then disappears from the gem.",
      ],
      [
        "If the spell is of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC equals 10 + the spell's level. On a failed check, the spell disappears from the gem with no other effect.",
      ],
      [
        'A ruby spell gem can store up to 8th level spells. Spells cast from the spell gem have a save DC of 18 and an attack bonus of +10.',
      ],
      [
        "You can imbue the gem with a spell if you're attuned to it and it's empty. To do so, you cast the spell while holding the gem. The spell is stored in the gem instead of having any effect. Casting the spell must require either 1 action or 1 minute or longer, and the spell's level must be no higher than the gem's maximum. If the spell belongs to the school of abjuration and requires material components that are consumed, you must provide them, but they can be worth half as much as normal.",
      ],
      ["Once imbued with a spell, the gem can't be imbued again until the next dawn."],
      ['Deep gnomes created these magic gemstones and keep the creation process a secret.'],
    ],
    publication: refs.publications.out_of_the_abyss,
  },
  spell_gem_star_ruby: {
    name: 'Spell Gem (Star ruby)',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: 'optional',
    text: [
      [
        "A star ruby spell gem can contain one spell from any class's spell list. You become aware of the spell when you learn the gem's properties. While holding the gem, you can cast the spell from it as an action if you know the spell or if the spell is on your class's spell list. Doing so doesn't require any components, and doesn't require attunement. The spell then disappears from the gem.",
      ],
      [
        "If the spell is of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC equals 10 + the spell's level. On a failed check, the spell disappears from the gem with no other effect.",
      ],
      [
        'A star ruby spell gem can store up to 7th level spells. Spells cast from the spell gem have a save DC of 18 and an attack bonus of +10.',
      ],
      [
        "You can imbue the gem with a spell if you're attuned to it and it's empty. To do so, you cast the spell while holding the gem. The spell is stored in the gem instead of having any effect. Casting the spell must require either 1 action or 1 minute or longer, and the spell's level must be no higher than the gem's maximum. If the spell belongs to the school of abjuration and requires material components that are consumed, you must provide them, but they can be worth half as much as normal.",
      ],
      ["Once imbued with a spell, the gem can't be imbued again until the next dawn."],
      ['Deep gnomes created these magic gemstones and keep the creation process a secret.'],
    ],
    publication: refs.publications.out_of_the_abyss,
  },
  spell_gem_topaz: {
    name: 'Spell Gem (Topaz)',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: 'optional',
    text: [
      [
        "A topaz spell gem can contain one spell from any class's spell list. You become aware of the spell when you learn the gem's properties. While holding the gem, you can cast the spell from it as an action if you know the spell or if the spell is on your class's spell list. Doing so doesn't require any components, and doesn't require attunement. The spell then disappears from the gem.",
      ],
      [
        "If the spell is of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC equals 10 + the spell's level. On a failed check, the spell disappears from the gem with no other effect.",
      ],
      [
        'A topaz spell gem can store up to 6th level spells. Spells cast from the spell gem have a save DC of 17 and an attack bonus of +10.',
      ],
      [
        "You can imbue the gem with a spell if you're attuned to it and it's empty. To do so, you cast the spell while holding the gem. The spell is stored in the gem instead of having any effect. Casting the spell must require either 1 action or 1 minute or longer, and the spell's level must be no higher than the gem's maximum. If the spell belongs to the school of abjuration and requires material components that are consumed, you must provide them, but they can be worth half as much as normal.",
      ],
      ["Once imbued with a spell, the gem can't be imbued again until the next dawn."],
      ['Deep gnomes created these magic gemstones and keep the creation process a secret.'],
    ],
    publication: refs.publications.out_of_the_abyss,
  },
  stonespeaker_crystal: {
    name: 'Stonespeaker Crystal',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'Created by the stone giant librarians of Gravenhollow, this nineteen-inch-long shard of quartz grants you advantage on Intelligence (Investigation) checks while it is on your person.',
      ],
      [
        'The crystal has 10 charges. While holding it, you can use an action to expend some of its charges to cast one of the following spells from it: speak with animals (2 charges), speak with dead (4 charges), or speak with plants (3 charges).',
      ],
      [
        'When you cast a divination spell, you can use the crystal in place of one material component that would normally be consumed by the spell, at a cost of 1 charge per level of the spell. The crystal is not consumed when used in this way.',
      ],
      [
        "The crystal regains 1d6 + 4 expended charges daily at dawn. If you expend the crystal's last charge, roll a d20. On a 1, the crystal vanishes, lost forever.",
      ],
    ],
    publication: refs.publications.out_of_the_abyss,
  },
  wand_of_viscid_globs: {
    name: 'Wand of Viscid Globs',
    category: 'Wand',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 1 lb'],
      [
        "Crafted by the drow, this slim black wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cause a small glob of viscous material to launch from the tip at one creature within 60 feet of you. Make a ranged attack roll against the target, with a bonus equal to your spellcasting modifier (or your Intelligence modifier, if you don't have a spellcasting modifier) plus your proficiency bonus. On a hit, the glob expands and dries on the target, which is ",
        rules.restrained,
        ' for 1 hour. After that time, the viscous material cracks and falls away.',
      ],
      [
        'Applying a pint or more of alcohol to the ',
        rules.restrained,
        ' creature dissolves the glob instantly, as does the application of oil of etherealness or universal solvent. The glob also dissolves instantly if exposed to sunlight. No other nonmagical process can remove the viscous material until it deteriorates on its own.',
      ],
      [
        'The wand regains 1d6 + 1 expended charges daily at midnight. If you expend the wands last charge, roll a d20. On a 1, the wand melts into harmless slime and is destroyed.',
      ],
      [
        'A wand of viscid globs is destroyed if exposed to sunlight for 1 hour without interruption.',
      ],
    ],
    effects: [
      {
        key: 'viscid-glob',
        name: 'Viscid glob',
        lands: { on: 'hit' },
        conditions: [rules.restrained],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
        ends: {
          cure: [
            'Applying a pint or more of alcohol to the ',
            rules.restrained,
            ' creature dissolves the glob instantly, as does the application of oil of etherealness or universal solvent.',
            ' The glob also dissolves instantly if exposed to sunlight.',
          ],
        },
      },
    ],
    publication: refs.publications.out_of_the_abyss,
  },
})
