import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  black_crystal_tablet: {
    name: 'Black Crystal Tablet',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: 'by a creature that has proficiency in the Arcana skill',
    text: [
      [
        'Any creature that attunes to the tablet must make a DC 20 Wisdom saving throw at the end of its next long rest. On a failed save, the creature becomes afflicted with a random form of long-term madness (see "Madness" in chapter 8 of the Dungeon Master\'s Guide).',
      ],
      [
        'As an action, a creature attuned to the Black Crystal Tablet can use it to cast eyebite or gate (the portal created by this spell links to the Far Realm only). After the tablet is used to cast a spell, it cannot be used again until the next dawn.',
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  blast_scepter: {
    name: 'Blast Scepter',
    category: 'Rod',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['The Blast Scepter can be used as an arcane focus.'],
      [
        'Whoever is attuned to the Blast Scepter gains resistance to fire and lightning damage and can, as an action, use it to cast thunderwave as a 4th-level spell (save DC 16) without expending a spell slot.',
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  chest_of_preserving: {
    name: 'Chest of Preserving',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      ['Weight · 25 lb'],
      [
        "Food and other perishable items do not age or decay while inside a Chest of Preserving. The chest is 2½ feet long, 1½ feet wide, and 1 foot tall with a half-barrel lid. The chest has a lock, which can be picked with thieves' tools and a successful DC 15 Dexterity check. Smashing the lock or any other part of the chest renders it nonmagical.",
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  circlet_of_human_perfection: {
    name: 'Circlet of Human Perfection',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a humanoid',
    text: [
      [
        "The Circlet of Human Perfection transforms its attuned wearer into an attractive human of average height and weight. The circlet chooses the physical characteristics of the form, such as age, gender, skin color, hair color, and voice. Except for size, the wearer's statistics and racial traits don't change, nor do items worn or carried by the wearer. Removing the circlet ends the effect.",
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  dagger_of_blindsight: {
    name: 'Dagger of Blindsight',
    category: 'Weapon',
    detail: 'Dagger',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 1 lb'],
      [
        'This rare magic item requires attunement. A creature attuned to it gains blindsight out to a range of 30 feet. The dagger has a saw-toothed edge and a black pearl nested in its pommel.',
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  dagger_of_guitar_solos: {
    name: 'Dagger of Guitar Solos',
    category: 'Weapon',
    detail: 'Dagger',
    rarity: 'unknown',
    text: [
      ['Weight · 1 lb'],
      [
        'This drow-made dagger is decorated with silver web filigree. It magically plays a fragment of a guitar solo when struck or used to strike a foe.',
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  dodecahedron_of_doom: {
    name: 'Dodecahedron of Doom',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      [
        'This twelve-sided metal die is 12 inches across and bears the numbers 1 through 12 engraved on its pentagonal sides. The dodecahedron contains arcane clockwork mechanisms that whir and click whenever the die is cast.',
      ],
      [
        'The dodecahedron can be hurled up to 60 feet as an action. A random magical effect occurs when the die comes to rest after rolling across the ground for at least 10 feet. If an effect requires a target and no eligible target is within range, nothing happens. Spells cast by the dodecahedron require no components. Roll a d12 and consult the following table to determine the effect:',
      ],
      ['d12 · effect'],
      [
        '1–2 · The dodecahedron explodes and is destroyed. Each creature within 20 feet of the exploding die must make a DC 13 Dexterity saving throw, taking 40 (9d8) force damage on a failed save, or half as much damage on a successful one.',
      ],
      [
        '3–4 · The dodecahedron casts light on itself. The effect lasts until a creature touches the die.',
      ],
      [
        "5–6 · The dodecahedron casts ray of frost (+5 to hit), targeting a random creature within 60 feet of it that doesn't have Cover against the attack.",
      ],
      [
        '7–8 · The dodecahedron casts shocking grasp (+5 to hit) on the next creature that touches it.',
      ],
      [
        '9–10 · The dodecahedron casts darkness on itself. The effect has a duration of 10 minutes.',
      ],
      [
        '11–12 · The next creature to touch the dodecahedron gains 1d10 temporary hit points that last for 1 hour.',
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  falkirs_helm_of_pigheadedness: {
    name: "Falkir's Helm of Pigheadedness",
    category: 'Wondrous Item',
    rarity: 'unknown',
    text: [
      [
        "This steel helm is shaped like the head of a boar. Once you don the helm, it can't be removed until you die or until a remove curse spell or similar magic is cast on it. If you wear the helm and are a humanoid, you gain the following flaw until the helm is removed: \"I'm exceedingly stubborn and think I'm right all the time.\" (This flaw supersedes any conflicting flaw.)",
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  helm_of_the_scavenger: {
    name: 'Helm of the Scavenger',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: 'by a spellcaster',
    text: [
      ['This ornate chair is designed to propel and maneuver a ship through space.'],
      [
        'Passive Properties. The following properties of the helm come into play even when no creature is attuned to it:',
      ],
      [
        "When placed aboard a vessel weighing between 1 and 100 tons, the helm generates an envelope of fresh air around the ship while it is in the void of space (but not underwater). This envelope extends out from the edges of the hull in all directions for a distance equal in length to the vessel's beam, so that creatures aboard and near the ship can breathe normally in space. The temperature within the air envelope is 70 degrees Fahrenheit.",
      ],
      [
        "When placed aboard a vessel weighing between 1 and 100 tons, the helm generates an artificial gravity field while the ship is in the void of space, so that creatures can walk on the ship's decks as they normally would. Creatures and objects that fall overboard bob in a gravity plane that extends out from the main deck for a distance equal in length to the vessel's beam.",
      ],
      [
        'Active Properties. The sensation of being attuned to the helm is akin to being immersed in warm water. While attuned to the helm, you gain the following abilities while you sit in it:',
      ],
      [
        'You can use the helm to propel the vessel across or through water and other liquids at a maximum speed in miles per hour equal to your highest-level unexpended spell slot.',
      ],
      [
        'You can use the helm to propel the vessel through air or space at a maximum speed in miles per hour equal to your highest-level unexpended spell slot × 10.',
      ],
      [
        'Provided you have at least one unexpended spell slot, you can steer the vessel, albeit in a somewhat clumsy fashion, in much the same way that oars or a rudder can maneuver a seafaring ship.',
      ],
      [
        "Whenever you like, you can see what's happening on and around the vessel as though you were standing in a location of your choice aboard it.",
      ],
      ['Drawback. While attuned to the helm, you cannot expend your own spell slots.'],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  horned_ring: {
    name: 'Horned Ring',
    category: 'Ring',
    rarity: 'very rare',
    attunement: true,
    text: [
      [
        'Allows an attuned wearer to ignore Undermountain\'s magical restrictions (see "Alterations to Magic").',
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  jade_serpent_staff: {
    name: 'Jade Serpent Staff',
    category: 'Wondrous Item',
    rarity: 'unknown',
    text: [
      [
        'This staff is broken into five pieces, each worth 100 gp for the jade alone. The entire staff can be restored with mending cantrips; each casting of the spell repairs one break in the staff. If the staff is made whole, it transforms from an object into an animated jade serpent that has the statistics of a giant poisonous snake, with these changes:',
      ],
      [
        'The serpent is a construct that understands and obeys whoever was holding the staff when it transformed.',
      ],
      [
        'It has immunity to poison damage and the ',
        rules.poisoned,
        " condition. It doesn't require air, food, drink, or sleep.",
      ],
      [
        'When it drops to 0 hit points, roll a d6. On a roll of 1, the snake turns to dust and is destroyed. On any other roll, it changes back into a staff and breaks into 1d4 + 1 pieces that must be magically mended before the staff can be used again.',
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  maddgoths_helm: {
    name: "Maddgoth's Helm",
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: 'by a humanoid',
    text: [
      [
        "While you wear this helm and are inside Maddgoth's castle, on its roof, or in its courtyard, you have immunity to all damage. If the helm is taken from the castle, it turns to dust and is destroyed.",
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  mind_flayer_skull: {
    name: 'Mind Flayer Skull',
    category: 'Wondrous Item',
    rarity: 'unknown',
    text: [
      [
        'While you have the skull in your possession, you are ',
        rules.invisible,
        ' to mind flayers, as is anything you are wearing or carrying.',
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  orb_of_gonging: {
    name: 'Orb of Gonging',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      ['Weight · 5 lb'],
      [
        'This common wondrous item is a hollow, 5-inch-diameter orb that weighs 5 pounds. Its outer shell is composed of notched bronze rings, which can be turned so that the notches line up. Aligning the notches requires an action, and doing so causes the orb to gong loudly until the notches are no longer aligned. The sounds are spaced 6 seconds apart and can be heard out to a range of 600 feet.',
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  pearl_of_undead_detection: {
    name: 'Pearl of Undead Detection',
    category: 'Wondrous Item',
    rarity: 'unknown',
    text: [['This black pearl glows faintly when undead are within 120 feet of it.']],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  potion_of_comprehension_waterdeep_dungeon_of_the_mad_mage: {
    name: 'Potion of Comprehension',
    category: 'Potion',
    rarity: 'common',
    text: [
      [
        'When you drink this potion, you gain the effect of a comprehend languages spell for 1 hour. This liquid is a clear concoction with bits of salt and soot swirling in it.',
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  potion_of_watchful_rest: {
    name: 'Potion of Watchful Rest',
    category: 'Potion',
    rarity: 'common',
    text: [
      [
        "When you drink this potion, you gain the following benefits for the next 8 hours: magic can't put you to sleep, and you can remain awake during a long rest and still gain its benefits. This sweet, amber-colored brew has no effect on creatures that don't require sleep, such as elves.",
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  professor_orb: {
    name: 'Professor Orb',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['Weight · 5 lb'],
      [
        'Each professor orb takes the form of a smooth, solid, 5-pound sphere of smoky gray quartz about the size of a grapefruit. Close examination reveals two or more pinpricks of silver light deep inside the sphere.',
      ],
      [
        'A Professor Orb is sentient and has the personality of a scholar. Its alignment is determined by rolling on the alignment table in the "Sentient Magic Items" section in chapter 7 of the Dungeon Master\'s Guide. Regardless of its disposition, the orb has an Intelligence of 18, and Wisdom and Charisma scores determined by rolling 3d6 for each ability. The orb speaks, reads, and understands four languages, and can see and hear normally out to a range of 60 feet. Unlike most sentient items, the orb has no will of its own and can\'t initiate a conflict with the creature in possession of it.',
      ],
      [
        'A Professor Orb has extensive knowledge of four narrow academic subjects. When making an Intelligence check to recall lore from any of its areas of expertise, the orb has a +9 bonus to its roll (including its Intelligence modifier).',
      ],
      [
        'In addition to the knowledge it possesses, a professor orb can cast the mage hand cantrip at will. It uses the spell only to transport itself. Its spellcasting ability is Intelligence.',
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  propeller_helm: {
    name: 'Propeller Helm',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a small humanoid',
    text: [
      [
        "While worn, the helm allows its wearer to use an action to cast the levitate spell, requiring no components. The helm's propeller spins and whirs loudly until the spell ends. Each time the spell ends, there is a 50 percent chance that the helm loses its magic and becomes nonmagical.",
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  shield_of_the_uven_rune: {
    name: 'Shield of the Uven Rune',
    category: 'Shield',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 6 lb'],
      [
        'This shield is made from the scale of an ancient white dragon. It has a rune burned into its outward-facing side. A character who examines the rune and succeeds on a DC 20 Intelligence (History) check recognizes it as an uven ("enemy" in Giant) rune that confers great power.',
      ],
      ['While holding the shield, you benefit from the following properties.'],
      ["Winter's Friend. You are immune to cold damage."],
      [
        'Deadly Rebuke. Immediately after a creature hits you with a melee attack, you can use your reaction to deal 3d6 necrotic damage to that creature.',
      ],
      [
        "Bane. You can cast the bane spell from the shield (save DC 17). The spell does not require concentration and lasts for 1 minute. Once you cast the spell from the shield, you can't do so again until you finish a short or long rest.",
      ],
      [
        "Gift of Vengeance. You can transfer the shield's magic to a nonmagical weapon by tracing the uven rune on the weapon with one finger. The transfer takes 8 hours of work that requires the two items to be within 5 feet of each other. At the end, the shield is destroyed, and the rune is etched or burned into the chosen weapon. This weapon becomes a rare magic item that requires attunement. It has the properties of a +1 weapon. The bonus increases to +3 when the weapon is used against one of the following creature types, chosen by you at the time of the magic weapon's creation: aberrations, celestials, constructs, dragons, elementals, fey, fiends, giants, or undead.",
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  tearulai: {
    name: 'Tearulai',
    category: 'Weapon',
    detail: 'Longsword',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 3 lb'],
      [
        "The longsword, Tearulai, is a sentient, neutral good sword of sharpness with an emerald-colored blade and precious gemstones embedded in its hilt and pommel. The sword's magical properties are suppressed until it is removed from Valdemar's skull.",
      ],
      [
        "Evil creatures can't attune to Tearulai; any evil creature that tries to do so takes 20 psychic damage. The weapon's emerald blade can't be damaged or dulled, and the sword can't be teleported anywhere without its wielder while the two are attuned to one another.",
      ],
      [
        'Spells. The sword has 6 charges and regains 1d4 + 2 expended charges daily at dawn. A creature attuned to the sword can use an action and expend 1 or more charges to cast one of the following spells from it without material components: fly (2 charges), polymorph (3 charges), or transport via plants (4 charges).',
      ],
      [
        'Sentience. The sword has an Intelligence of 17, a Wisdom of 12, and a Charisma of 20. It has hearing and truesight out to a range of 120 feet. It communicates telepathically with its attuned wielder and can speak, read, and understand Common, Draconic, Elvish, and Sylvan. In addition, the sword can ascertain the true value of any gemstone brought within 5 feet of it.',
      ],
      [
        "Personality. Tearulai admires great beauty, music, fine art, and poetry. Vain, the weapon strives to improve its appearance. It craves gemstones and seeks out better ones with which to adorn itself. Most of all, it longs to return to the forests around Myth Drannor, where it was created. If its wielder's goals run counter to its own, Tearulai attempts to take control of its wielder and escape Undermountain, whereupon it can use its transport via plants spell to return whence it came.",
      ],
      [
        'When you attack an object with this magic sword and hit, maximize your weapon damage dice against the target.',
      ],
      [
        "When you attack a creature with this weapon and roll a 20 on the attack roll, that target takes an extra 14 slashing damage. Then roll another d20. If you roll a 20, you lop off one of the target's limbs, with the effect of such loss determined by the DM. If the creature has no limb to sever, you lop off a portion of its body instead.",
      ],
      [
        'Note: According to the SRD, it is an extra 4d6 slashing damage, although this is incorrect.',
      ],
      [
        "In addition, you can speak the sword's command to cause the blade to shed bright light in a 10-foot radius and dim light for an additional 10 feet. Speaking the command word again or sheathing the sword puts out the light.",
      ],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
  vanraks_mithral_shirt: {
    name: "Vanrak's Mithral Shirt",
    category: 'Armor',
    detail: 'Chain Shirt',
    rarity: 'uncommon',
    text: [
      ['Weight · 20 lb'],
      [
        "Mithral is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes. If the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn't.",
      ],
      ['While you wear this armor, you gain darkvision out to a range of 60 feet.'],
    ],
    publication: refs.publications.waterdeep_dungeon_of_the_mad_mage,
  },
})
