import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  abracadabrus: {
    name: 'Abracadabrus',
    category: 'Wondrous Item',
    rarity: 'very rare',
    text: [
      ['Weight · 25 lb'],
      [
        'An abracadabrus is an ornate, gemstone-studded wooden chest that weighs 25 pounds while empty. Its interior compartment is a cube measuring 1½ feet on a side.',
      ],
      [
        "The chest has 20 charges. A creature can use an action to touch the closed lid of the chest and expend 1 of the chest's charges while naming one or more nonmagical objects (including raw materials, foodstuffs, and liquids) worth a total of 1 gp or less. The named objects magically appear in the chest, provided they can all fit inside it and the chest doesn't contain anything else. For example, the chest can conjure a plate of strawberries, a bowl of hot soup, a flagon of water, a stuffed animal, or a bag of twenty caltrops. Food and drink conjured by the chest are delicious, and they spoil if not consumed after 24 hours. Gems and precious metals created by the chest disappear after 1 minute.",
      ],
      [
        "The chest regains 1d20 expended charges daily at dawn. If the item's last charge is expended, roll a d20. On a 1, the chest loses its magic (becoming an ordinary chest), and its gemstones turn to dust.",
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  cauldron_of_plenty: {
    name: 'Cauldron of Plenty',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['Weight · 50 lb'],
      [
        'This cauldron is made of thick copper that has turned green with age. It is 4 feet wide, has a mouth 3½ feet in diameter, weighs 50 pounds, and can hold up to 30 gallons of liquid. Embossed on its bulging sides are images of satyrs and nymphs in repose, holding ladles. The cauldron comes with a lid and has side handles. It sits on five little clawed feet that keep it from tipping.',
      ],
      [
        'If water is poured into the cauldron and stirred for 1 minute, it transforms into a hearty, hot stew, which can provide one nourishing meal for up to four people per gallon. The stew remains hot while in the cauldron, then cools naturally after it is removed. The outside of the cauldron remains safe to touch despite the heat of the stew.',
      ],
      [
        'The cauldron can create stew three times. It then ceases to function until the next dawn, when it regains all its uses.',
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  hook_of_fishers_delight: {
    name: "Hook of Fisher's Delight",
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      [
        "This tiny silver fishhook has a little gold feather attached to it. For it to function, the feathered hook must be tied to the end of a fishing line and immersed in enough water to fill at least a 10-foot cube. At the end of each uninterrupted hour of immersion, roll a d6. On a 6, a floppy, 6-inch-long magical fish appears on the end of the hook. The color and properties of the conjured fish are determined by rolling on the Hook of Fisher's Delight table. Once the hook conjures a fish, it can't do so again until the next dawn.",
      ],
      ["Table: Hook of Fisher's Delight"],
      ['d20 · Fish Color · Result'],
      [
        "1-10 · Green with copper bands · This tasty fish provides a day's worth of nourishment to one creature that eats it. The fish loses this property and rots if it's not eaten within 24 hours of being caught.",
      ],
      [
        '11-14 · Yellow with black stripes · Once removed from the hook, this awful-tasting fish can be thrown up to 120 feet, targeting a creature the thrower can see. The target must succeed on a DC 15 Strength saving throw or be knocked ',
        rules.prone,
        '. The fish then disappears.',
      ],
      [
        '15-18 · Blue with white bands · When released from the hook, this fish squirms free, sprouts wings, follows you around, and sings a beautiful tune in Aquan. It disappears after 2d4 hours or when reduced to 0 hit points. The fish uses the quipper stat block, except that it can breathe air and has a flying speed of 30 feet.',
      ],
      [
        "19-20 · Gold with silver stripes · This tasty fish provides a day's worth of nourishment to one creature that eats it and grants 2d10 temporary hit points to that creature. The fish loses these properties and rots if it's not eaten within 24 hours of being caught.",
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  lantern_of_tracking_aberrations: {
    name: 'Lantern of Tracking (Aberrations)',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet.',
      ],
      [
        "While the lantern is within 300 feet of the Aberrations type, its flame turns bright green. The lantern doesn't pinpoint the creature's exact location, however.",
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  lantern_of_tracking_celestials: {
    name: 'Lantern of Tracking (Celestials)',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet.',
      ],
      [
        "While the lantern is within 300 feet of the Celestials type, its flame turns bright green. The lantern doesn't pinpoint the creature's exact location, however.",
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  lantern_of_tracking_constructs: {
    name: 'Lantern of Tracking (Constructs)',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet.',
      ],
      [
        "While the lantern is within 300 feet of the Constructs type, its flame turns bright green. The lantern doesn't pinpoint the creature's exact location, however.",
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  lantern_of_tracking_dragons: {
    name: 'Lantern of Tracking (Dragons)',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet.',
      ],
      [
        "While the lantern is within 300 feet of the Dragons type, its flame turns bright green. The lantern doesn't pinpoint the creature's exact location, however.",
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  lantern_of_tracking_elementals: {
    name: 'Lantern of Tracking (Elementals)',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet.',
      ],
      [
        "While the lantern is within 300 feet of the Elementals type, its flame turns bright green. The lantern doesn't pinpoint the creature's exact location, however.",
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  lantern_of_tracking_fey: {
    name: 'Lantern of Tracking (Fey)',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet.',
      ],
      [
        "While the lantern is within 300 feet of the Fey type, its flame turns bright green. The lantern doesn't pinpoint the creature's exact location, however.",
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  lantern_of_tracking_fiends: {
    name: 'Lantern of Tracking (Fiends)',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet.',
      ],
      [
        "While the lantern is within 300 feet of the Fiends type, its flame turns bright green. The lantern doesn't pinpoint the creature's exact location, however.",
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  lantern_of_tracking_giants: {
    name: 'Lantern of Tracking (Giants)',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet.',
      ],
      [
        "While the lantern is within 300 feet of the Giants type, its flame turns bright green. The lantern doesn't pinpoint the creature's exact location, however.",
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  lantern_of_tracking_monstrosities: {
    name: 'Lantern of Tracking (Monstrosities)',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet.',
      ],
      [
        "While the lantern is within 300 feet of the Monstrosities type, its flame turns bright green. The lantern doesn't pinpoint the creature's exact location, however.",
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  lantern_of_tracking_undead: {
    name: 'Lantern of Tracking (Undead)',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet.',
      ],
      [
        "While the lantern is within 300 feet of the Undead type, its flame turns bright green. The lantern doesn't pinpoint the creature's exact location, however.",
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  orc_stone: {
    name: 'Orc Stone',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a recipient only',
    text: [
      [
        'I saved the life of an orc, who gave me a stone with the symbol of the Many-Arrows tribe (a humanoid skull pierced by three arrows) carved into it. The stone is an uncommon magic item that requires attunement, and only I can attune to it.',
      ],
      [
        'As an action, I can use the stone to summon the spirit of an orc warrior, which appears within 30 feet of me. The spirit uses the orc war chief stat block in the Monster Manual and disappears after 10 minutes or when reduced to 0 hit points. The spirit understands any language I speak and obeys my commands.',
      ],
      [
        'After the stone is used three times, it turns to dust. (See Appendix B of Icewind Dale: Rime of the Frostmaiden)',
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  psi_crystal: {
    name: 'Psi Crystal',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a creature with an intelligence score of 3 or higher',
    text: [
      [
        'This crystal grants you telepathy for as long as you remain attuned to it. See the introduction of the Monster Manual for rules on how this telepathy works.',
      ],
      ['The crystal also glows with a purplish inner light while you are attuned to it.'],
      [
        "The higher your intelligence, the greater the light's intensity and the greater the range of the telepathy (see the Psi Crystal Properties table).",
      ],
      ['Table: Psi Crystal Properties'],
      ['Intelligence Score · Range of Telepathy · Light Intensity'],
      ['3-7 · 15 feet · Dim light out to a range of 5 feet'],
      ['8-11 · 30 feet · Bright light in a 5-foot radius and dim light for an additional 5 feet'],
      [
        '12-15 · 60 feet · Bright light in a 10-foot radius and dim light for an additional 10 feet',
      ],
      [
        '16 or higher · 120 feet · Bright light in a 15-foot radius and dim light for an additional 15 feet',
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  scroll_of_tarrasque_summoning: {
    name: 'Scroll of Tarrasque Summoning',
    category: 'Scroll',
    rarity: 'legendary',
    text: [
      [
        "Using an action to read the scroll causes the tarrasque (see the creature's entry in the Monster Manual) to appear in an unoccupied space you can see within 1 mile of you. The tarrasque disappears when it drops to 0 hit points and is hostile toward all creatures other than itself.",
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  scroll_of_the_comet: {
    name: 'Scroll of the Comet',
    category: 'Scroll',
    rarity: 'legendary',
    text: [
      [
        'By using an action to read the scroll, you cause a comet to fall from the sky and crash to the ground at a point you can see up to 1 mile away from you. You must be outdoors when you use the scroll, or nothing happens and the scroll is wasted.',
      ],
      [
        "The comet creates a 50-foot-deep, 500-foot-radius crater on impact. Any creature in that radius must make a DC 20 Dexterity saving throw, taking 30d10 force damage on a failed saving throw, or half as much damage on a successful one. All structures in the crater are destroyed, as are all nonmagical objects that aren't being worn or held.",
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  shield_guardian_amulet: {
    name: 'Shield Guardian Amulet',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a humanoid',
    text: [
      [
        'The amulet is a 4-inch-wide disk composed of silver-framed wood, with a rune carved into its face. A detect magic spell reveals a magical aura of enchantment around the amulet.',
      ],
      [
        'Every shield guardian has an amulet magically linked to it. A shield guardian can have only one corresponding amulet, and if that amulet is destroyed, the shield guardian is ',
        rules.incapacitated,
        ' until a replacement amulet is created.',
      ],
      [
        "A shield guardian's amulet is subject to direct attack if it isn't being worn or carried. It has AC 10, 10 hit points, and immunity to poison and psychic damage. Crafting an amulet requires 1 week and costs 1,000 gp in components.",
      ],
      [
        "A shield guardian's solitary focus is to protect the amulet's wearer. The amulet's wearer can command the guardian to attack its enemies or to guard the wielder against attack. If an attack threatens to injure the wearer, the construct can magically absorb the blow into its own body, even at a distance.",
      ],
      [
        "A humanoid that attunes to this amulet knows the distance and direction of the shield guardian, provided the amulet and the guardian are on the same plane of existence. As an action, the amulet's attuned wearer can try to reactivate the shield guardian, doing so with a successful DC 20 Intelligence (Arcana) check. Reactivation can only be attempted while the amulet and guardian are within 10 feet of each other.",
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  the_codicil_of_white: {
    name: 'The Codicil of White',
    category: 'Wondrous Item',
    rarity: 'unknown',
    text: [
      [
        'The Codicil of White is a tall, thin volume bound in white ermine fur over seasoned boards of white pine and sealed with a clasp and lock of tarnished silver. The book is cold to the touch, and the fur is worn about the edges from use. The twenty-seven pages within are of vellum painted with silver gilt on the outer edges. The whole is sewn to a leather binding with strips of sinews, making it quite durable.',
      ],
      ['A creature with the codicil in its possession has resistance to cold damage.'],
      [
        'The codicil was written by followers of Auril as a primer on her worship. The first page is a title page with the snowflake symbol of Auril on it. The remaining pages describe various priestly rituals and ceremonies in chilling detail. Nestled among these descriptions is a spell that wizards can learn (frost fingers), and a poem called "Rime of the Frostmaiden" (see appendix E). The poem is an incantation, the power of which can be used to split a glacier (see chapter 6). The poem might have other capabilities, at your discretion',
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  thermal_cube: {
    name: 'Thermal Cube',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This 3-inch cube of solid brimstone generates enough dry heat to keep the temperature within 15 feet of it at 95 degrees Fahrenheit (35 degrees Celsius).',
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
  ythryn_mythallar: {
    name: 'Ythryn Mythallar',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: 'by a spellcaster',
    text: [
      [
        'A mythallar looks like an enormous crystal ball held in an ornate cradle. The globe sheds bright light in a 300-foot radius and dim light for an additional 300 feet. The globe draws magic from the Weave that can be harnessed for various purposes. For example, Netherese mages used mythallars to keep their cities aloft and empower their magic items. The bigger the mythallar, the more magic it can hold. The largest mythallars are 150 feet in diameter.',
      ],
      [
        "The Ythryn mythallar is a relatively small device—a mere 50 feet in diameter. To attune to this mythallar, a creature must finish a short rest within 30 feet of it, meditating on the mythallar. Up to eight creatures can be attuned to it at one time; otherwise, the Ythryn mythallar follows the attunement rules in the Dungeon Master's Guide. If a ninth creature tries to attune to the mythallar, nothing happens.",
      ],
      [
        "All creatures attuned to the Ythryn mythallar can sense when the device is being used. A creature attuned to the device can use any of its properties, but only if all other creatures attuned to the device agree to allow it. The Ythryn mythallar's properties are as follows:",
      ],
      [
        "While you're on the same plane of existence as the Ythryn mythallar, you can use an action to cause it to fly in any direction you choose at a speed of 30 feet. All matter within 500 feet of the device moves with it. The Ythryn mythallar and all structures held aloft by it hover in place when not in motion.",
      ],
      [
        "As an action, you can cause one magic item you are holding within 30 feet of the Ythryn mythallar to immediately regain all its expended charges or uses. A magic item recharged in this manner can't be recharged by the Ythryn mythallar again until after the item regains expended charges or uses on its own.",
      ],
      [
        "You can use the Ythryn mythallar to cast the control weather spell without requiring any components and without the need for you to be outdoors. This casting of the spell has a 50-mile radius. For the duration of the spell's casting time, you must be within 30 feet of the Ythryn mythallar or the spell fails.",
      ],
      [
        "Touching the Mythallar. Any creature that touches the globe of the mythallar must make a DC 22 Constitution saving throw, taking 180 (20d10 + 70) radiant damage on a failed save, or half as much damage on a successful one. Undead have disadvantage on this saving throw. Any object that touches the globe, other than an artifact or the mythallar's cradle, is disintegrated instantly (no save).",
      ],
    ],
    publication: refs.publications.icewind_dale_rime_of_the_frostmaiden,
  },
})
