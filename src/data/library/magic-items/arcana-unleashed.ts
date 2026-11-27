import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  arcane_chatelaine: {
    name: 'Arcane Chatelaine',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      [
        'This ornate clasp has six spectral keys attached to it. As a Magic action, you can touch one of the keys to a closed door, window, gate, container, or hatch to cast the Arcane Lock spell on it. Once a key is used, it disappears. When all six keys have disappeared, the chatelaine disappears.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  arcanists_bestiary: {
    name: "Arcanist's Bestiary",
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'Hundreds of pages of illustrations, tables, and diagrams about a wide variety of monsters fill this magical tome.',
      ],
      [
        "Charm Monster. While holding the book, you can cast the Charm Monster spell (spell save DC 15) from it. The target has Disadvantage on the saving throw against this spell if it isn't a Humanoid. You can't cast this spell again in this way until the next dawn.",
      ],
      [
        'Extensive Knowledge. When you become attuned to the book, you gain proficiency in one of the following skills of your choice: Arcana, History, Nature, or Religion. Whenever you finish a Long Rest, you can change your choice. If your Attunement to the book ends, you lose this proficiency.',
      ],
      [
        'Monster Primer. While carrying the book, whenever you take a Study action to make an Intelligence (Arcana) check to recall information about an Aberration, Construct, Elemental, Fey, or Monstrosity you can see, on a successful check, you learn whether that creature has any Immunities, Resistances, or Vulnerabilities. If the creature has any, you know what they are.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  bellows_of_strangulation: {
    name: 'Bellows of Strangulation',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      [
        'This bellows has 6 charges. While you are holding it, you can take a Magic action and use one of three command words to cause one of the following effects:',
      ],
      [
        'First Command Word. You expend 1 charge to cause the bellows to suck the energy from one creature you can see within 60 feet. The creature must succeed on a DC 15 Constitution saving throw or have the ',
        rules.incapacitated,
        ' condition for 1 minute. The creature repeats the save at the end of each of its turns, ending the effect on itself on a success.',
      ],
      [
        'Second Command Word. You expend 3 charges to cause the bellows to suck the energy from creatures in a 30-foot Cone. Each creature in that area must succeed on a DC 15 Constitution saving throw or have the ',
        rules.incapacitated,
        ' condition for 1 minute. An affected creature repeats the save at the end of each of its turns, ending the effect on itself on a success.',
      ],
      [
        'Third Command Word. You expend 5 charges to cast the Cloudkill spell (spell DC 17) from the bellows.',
      ],
      [
        'Regaining Charges. The bellows regains 1d6 + 1 charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the bellows explodes in a harmless burst of wind and is lost forever.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  blemished_idol_of_good_fortunes: {
    name: 'Blemished Idol of Good Fortunes',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'Blemished. The idol is made of tarnished bronze, with minor dings and dents scattered over its surface.',
      ],
      [
        "You can cast the Augury spell from the idol. The idol speaks the omen aloud in response. Once the idol has been used to cast this spell, it can't be used to cast this spell again until the next dawn.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  blood_amulet: {
    name: 'Blood Amulet',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'This delicate amulet looks like a diminutive beating heart impaled with spikes. It has 3 charges and regains 1d3 charges daily at dawn.',
      ],
      [
        'Whenever you deal damage to a creature, you can expend 1 charge to deal an extra 2d10 Necrotic damage to the target and force it to make a DC 15 Constitution saving throw. On a failed save, the target gains 1 ',
        rules.exhaustion,
        ' level.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  boon_companions_bands: {
    name: "Boon Companions' Bands",
    category: 'Ring',
    rarity: 'uncommon',
    text: [
      [
        "Boon Companions' Bands come in pairs and bear matching engravings. While wearing one of the bands, when you cast a spell or use a feature that forces other creatures in its area of effect to make a saving throw, you can protect the creature wearing the matching band if the creature is in the effect's area. That creature automatically succeeds on its saving throw against the effect, and it takes no damage if it would normally take half damage on a successful save.",
      ],
      [
        "Once this property is used by either band, the bands can't be used again until the next dawn. If one of the bands in a pair is destroyed, the other one crumbles to dust.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  budding_blossom_rod: {
    name: 'Budding Blossom Rod',
    category: 'Rod',
    rarity: 'uncommon',
    attunement: 'by a Spellcaster',
    text: [
      [
        "Budding. Multicolored leaves decorate the rod's stems, and a few buds cluster near each end.",
      ],
      [
        "While you hold the rod, you can cast Druidcraft or Plant Growth (Overgrowth only) from it. Once the rod has been used to cast Plant Growth, it can't be used to cast this spell again until the next dawn.",
      ],
      [
        'While you hold the rod, as a Magic action, you can rejuvenate nonmagical plants in a 5-foot Cube you can see within 15 feet of yourself. The rejuvenated plants remain verdant for 1d4 days, after which they grow or wither as normal plants would.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  conjurers_canopy: {
    name: "Conjurer's Canopy",
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'You can take a Magic action and use a command word to plunge this magical walking stick into the ground, where it stands straight up and projects a canopy of transparent force in a 20-foot Cube originating from the stick. The canopy lasts for 1 hour or until you end the effect early as a Magic action.',
      ],
      [
        "The canopy protects creatures and objects within that area from ordinary weather phenomena such as rain or snow. The atmosphere within the canopy's area is comfortable and dry, regardless of the weather. Creatures, objects, and magical effects can still pass through the canopy as usual.",
      ],
      ["When the canopy disappears, the stick can't be used again for 1d12 hours."],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  diamond_staff: {
    name: 'Diamond Staff',
    category: 'Staff',
    rarity: 'legendary',
    attunement: 'by a Sorcerer, Warlock, or Wizard',
    text: [
      ['Weight · 4 lb'],
      [
        'This 6-foot-long scepter is carved from a single enormous crystal, with a perfect transparent globe at its head. This staff has 20 charges and can be wielded as a magic Quarterstaff that grants a +3 bonus to attack rolls and damage rolls made with it.',
      ],
      ['Adept. While holding the staff, you have Advantage on Intelligence (Arcana) checks.'],
      [
        'Dazzling Light. While holding the staff, you can expend 1 charge and use a command word to cause light to shine from the staff. The staff emits Bright Light in a 40-foot radius and Dim Light for an additional 40 feet. The staff stops glowing after 1 minute or when you use a command word to deactivate it.',
      ],
      [
        'Spells. While holding the staff, you can cast one of the spells on the following table from it, using your spell save DC. The table indicates how many charges you must expend to cast the spell.',
      ],
      ['Spell · Charge Cost'],
      ['Detect Magic · 0'],
      ['Light · 0'],
      ['Identify · 1'],
      ['Maze · 8'],
      ['Knock · 2'],
      ['Tongues (self only) · 0'],
      ['Legend Lore · 5'],
      ['True Seeing · 3'],
      [
        'Stunning Hit. When you hit with a melee attack using the staff, you can expend 2 charges, and the target must succeed on a DC 17 Constitution saving throw or have the ',
        rules.stunned,
        ' condition until the end of your next turn.',
      ],
      [
        'Regaining Charges. The staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the staff is destroyed.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  dictation_quill: {
    name: 'Dictation Quill',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "When you take a Magic action to set this magic quill next to Paper or Parchment and a bottle of Ink and use a command word, the quill writes your next spoken or signed words, in the language you're using, at a rate of 25 words per minute. The quill writes for 1 hour; until it has no Paper, Parchment, or Ink; or until you use another command word to stop it (no action required).",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  dissuader: {
    name: 'Dissuader',
    category: 'Staff',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      [
        "This staff can be wielded as a magic Quarterstaff that grants a +1 bonus to attack rolls and damage rolls made with it. It also has the following additional properties. Once one of these properties is used, that property can't be used again until the next dawn.",
      ],
      ['Calm Emotions. You can cast the Calm Emotions spell (save DC 15) from the staff.'],
      [
        'Dissuading Aura. As a Magic action while holding the staff, you can create a 30-foot Emanation of mental unrest originating from you that lasts for 1 minute. Whenever the Emanation enters the space of a creature you can see and whenever a creature you can see enters the Emanation or ends its turn there, you can force that creature to make a DC 15 Wisdom saving throw. On a failed save, the creature has the ',
        rules.frightened,
        ' condition until the start of its next turn.',
      ],
      [
        'Repel. When a creature enters a space within 5 feet of you, you can take a Reaction to create a shock wave of force. Each creature of your choice in a 30-foot Emanation originating from you must succeed on a DC 15 Strength saving throw or be pushed up to 30 feet straight away from you.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  dream_weaver: {
    name: 'Dream Weaver',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'This magic tapestry can be hung on a wall or another suitable vertical surface. The tapestry magically unravels and reweaves itself to illustrate the content and emotions of your most recent dreams.',
      ],
      [
        'You gain the following benefits while the tapestry is hung and you are within 30 feet of it.',
      ],
      [
        'Dream Wisdom. During a Long Rest, you can spend an hour studying the tapestry. At the end of the Long Rest, roll 1d20 and record the number rolled. Once before you finish a Long Rest, you can replace any D20 Test you make with this result. You must choose to do so before you roll the D20 Test.',
      ],
      [
        "Message Recorder. If you are targeted by the Dream spell, the tapestry records the appearance and name of the spell's caster in its design.",
      ],
      [
        'Mind Wall. While you have the ',
        rules.unconscious,
        ' condition, you have Advantage on Intelligence, Wisdom, and Charisma saving throws.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  elocutionists_lexicon: {
    name: "Elocutionist's Lexicon",
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "While holding this magic dictionary, you can take a Magic action and try to recall a specific word. The book automatically opens to the page containing the exact word you're searching for.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  ensorcelled_missive: {
    name: 'Ensorcelled Missive',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This item functions as a sheet of Parchment. After writing on it, you can take a Magic action to fold or roll the sheet and seal it while speaking or signing a word or short phrase. If a creature unseals the sheet without using the same word or phrase, the writing on the sheet appears as if it were written in an unknown and unintelligible script.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  evergreen_fertilizer: {
    name: 'Evergreen Fertilizer',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'Once sprinkled on the soil around a nonmagical plant, this pungent powder keeps the plant healthy for the next 365 days.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  grave_reaper: {
    name: 'Grave Reaper',
    category: 'Weapon',
    detail: 'Sickle',
    rarity: 'legendary',
    attunement: true,
    text: [
      ['Weight · 2 lb'],
      [
        'You gain a +2 bonus to attack rolls and damage rolls made with this magic weapon. When you hit a creature with it, the target takes an extra 2d8 Necrotic damage.',
      ],
      [
        "Soul Lantern. While holding this weapon, you can cast the Spirit Lantern spell. When you cast the spell using the weapon, the conjured lantern can hold up to five soul fragments, and the spell's save DC is 17.",
      ],
      [
        "Once the weapon has been used to cast the spell, it can't be used to cast it again until the next dawn.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  homeward_compass: {
    name: 'Homeward Compass',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "While holding this small brass compass, you can take a Magic action to orient the compass to your current location. Thereafter, the compass's needle always points toward that location. The compass can be oriented to only one location at a time. As a Magic action, you can end the compass's current orientation. When it isn't oriented to a particular location, or if the compass is on a different plane of existence than the location to which it is oriented, the compass's needle spins aimlessly.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  lucky_foot: {
    name: 'Lucky Foot',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "When you roll a 1 on a saving throw or ability check, you can use this preserved rabbit foot's magic to reroll the die. You must use the new roll, and the foot disintegrates.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  mage_breaker: {
    name: 'Mage Breaker',
    category: 'Weapon',
    detail: 'Dagger',
    rarity: 'rare',
    text: [
      ['Weight · 1 lb'],
      ['You gain a +1 bonus to attack rolls and damage rolls made with this magic weapon.'],
      [
        'When you hit a Concentrating creature with an attack roll using this weapon and deal damage, the creature has Disadvantage on the saving throw it makes to maintain Concentration.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  mages_manacle: {
    name: "Mage's Manacle",
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      [
        'As a Magic action while wearing this bracelet, you can target a Large or smaller creature within 5 feet of yourself that has the ',
        rules.grappled,
        ' or ',
        rules.incapacitated,
        ' condition. The target must succeed on a DC 15 Dexterity saving throw or become magically bound to you by a spectral chain and manacle that spring from the bracelet.',
      ],
      [
        'While bound in this way, the creature has the ',
        rules.restrained,
        ' condition. When you move, the creature moves with you.',
      ],
      [
        "A creature remains bound for 8 hours or until you release it (no action required). If the manacle takes damage from a Disintegrate spell, it is destroyed; nothing else can break or harm it. Once the manacle has bound a creature, it can't be used again this way until the next dawn.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  magewrights_gloves: {
    name: "Magewright's Gloves",
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "While you wear these gloves, you work as efficiently as two characters when determining how much time it takes to craft nonmagical items using any of the following tools: Alchemist's Supplies, Brewer's Supplies, Calligrapher's Supplies, Cartographer's Tools, Glassblower's Tools, or Jeweler's Tools.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  martialists_quarterstaff: {
    name: "Martialist's Quarterstaff",
    category: 'Staff',
    detail: 'Quarterstaff',
    rarity: 'uncommon',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      [
        'This magic Quarterstaff has 4 charges and regains 1d4 expended charges daily at dawn. It has the following additional properties.',
      ],
      ['Searing Smite. You can expend 2 charges to cast the Searing Smite spell (DC 13).'],
      [
        'Throw. When you take the Attack action, you can expend 1 charge to imbue the staff with magical velocity. Until the end of your next turn, the staff gains the Thrown property, with a normal range of 20 feet and a long range of 60 feet, and immediately after you make a ranged attack with the weapon, it flies back to your hand.',
      ],
      [
        'Trip. When you make a melee attack with this weapon, you can expend 1 charge to give yourself Advantage on the attack roll. If the attack hits, the target makes a DC 13 Strength saving throw. On a failed save, the target has the ',
        rules.prone,
        ' condition.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  namers_needle: {
    name: "Namer's Needle",
    category: 'Weapon',
    detail: 'Dagger',
    rarity: 'rare',
    text: [
      ['Weight · 1 lb'],
      ['You gain a +1 bonus to attack rolls and damage rolls made with this magic weapon.'],
      [
        "Identify Target. When you hit a creature with an attack roll using this weapon, you can compel the target to reveal its identity. The target makes a DC 15 Wisdom saving throw. On a failed save, the target says or signs its name clearly and emphatically. On a successful save, the target is immune to this effect for the next 24 hours. If the creature can't speak or sign a language, it automatically succeeds on the save.",
      ],
      [
        "Named Target. When you hit a creature with an attack roll using this weapon, you can say or sign the target's name clearly and emphatically to turn the hit into a Critical Hit. Once this property is used, it can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  necklace_of_the_beastly_familiar_giant_octopus: {
    name: 'Necklace of the Beastly Familiar (Giant Octopus)',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a Spellcaster',
    text: [
      [
        'This bejeweled necklace is set with azurite and comes with a matching charm that can be worn by your familiar.',
      ],
      [
        "Familiar. While wearing this necklace, you can cast the Find Familiar spell from it. Once the necklace has been used to cast this spell, it can't be used to cast it again until the next dawn.",
      ],
      [
        'Beast Transformation. While your familiar is within 60 feet of you, you can take a Magic action to activate the necklace. Your familiar shape-shifts into a Giant Octopus for 10 minutes.',
      ],
      [
        "While your familiar is transformed, its stat block is replaced by the stat block of the Beast form, but it retains its alignment, personality, creature type, Hit Points, and Hit Point Dice. Equipment the familiar is wearing or carrying doesn't change size or shape to match the Beast form, and any equipment that the Beast form can't wear or carry falls to the ground.",
      ],
      [
        'Your familiar gains a number of Temporary Hit Points equal to the Hit Points of the Beast form. These Temporary Hit Points vanish if any remain when the transformation ends. The transformation ends early on your familiar if it has no Temporary Hit Points left.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  necklace_of_the_beastly_familiar_giant_scorpion: {
    name: 'Necklace of the Beastly Familiar (Giant Scorpion)',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a Spellcaster',
    text: [
      [
        'This bejeweled necklace is set with chrysoprase and comes with a matching charm that can be worn by your familiar.',
      ],
      [
        "Familiar. While wearing this necklace, you can cast the Find Familiar spell from it. Once the necklace has been used to cast this spell, it can't be used to cast it again until the next dawn.",
      ],
      [
        'Beast Transformation. While your familiar is within 60 feet of you, you can take a Magic action to activate the necklace. Your familiar shape-shifts into a Giant Scorpion for 10 minutes.',
      ],
      [
        "While your familiar is transformed, its stat block is replaced by the stat block of the Beast form, but it retains its alignment, personality, creature type, Hit Points, and Hit Point Dice. Equipment the familiar is wearing or carrying doesn't change size or shape to match the Beast form, and any equipment that the Beast form can't wear or carry falls to the ground.",
      ],
      [
        'Your familiar gains a number of Temporary Hit Points equal to the Hit Points of the Beast form. These Temporary Hit Points vanish if any remain when the transformation ends. The transformation ends early on your familiar if it has no Temporary Hit Points left.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  necklace_of_the_beastly_familiar_hippopotamus: {
    name: 'Necklace of the Beastly Familiar (Hippopotamus)',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a Spellcaster',
    text: [
      [
        'This bejeweled necklace is set with zircon and comes with a matching charm that can be worn by your familiar.',
      ],
      [
        "Familiar. While wearing this necklace, you can cast the Find Familiar spell from it. Once the necklace has been used to cast this spell, it can't be used to cast it again until the next dawn.",
      ],
      [
        'Beast Transformation. While your familiar is within 60 feet of you, you can take a Magic action to activate the necklace. Your familiar shape-shifts into a Hippopotamus for 10 minutes.',
      ],
      [
        "While your familiar is transformed, its stat block is replaced by the stat block of the Beast form, but it retains its alignment, personality, creature type, Hit Points, and Hit Point Dice. Equipment the familiar is wearing or carrying doesn't change size or shape to match the Beast form, and any equipment that the Beast form can't wear or carry falls to the ground.",
      ],
      [
        'Your familiar gains a number of Temporary Hit Points equal to the Hit Points of the Beast form. These Temporary Hit Points vanish if any remain when the transformation ends. The transformation ends early on your familiar if it has no Temporary Hit Points left.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  necklace_of_the_beastly_familiar_mammoth: {
    name: 'Necklace of the Beastly Familiar (Mammoth)',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: 'by a Spellcaster',
    text: [
      [
        'This bejeweled necklace is set with topaz and comes with a matching charm that can be worn by your familiar.',
      ],
      [
        "Familiar. While wearing this necklace, you can cast the Find Familiar spell from it. Once the necklace has been used to cast this spell, it can't be used to cast it again until the next dawn.",
      ],
      [
        'Beast Transformation. While your familiar is within 60 feet of you, you can take a Magic action to activate the necklace. Your familiar shape-shifts into a Mammoth for 10 minutes.',
      ],
      [
        "While your familiar is transformed, its stat block is replaced by the stat block of the Beast form, but it retains its alignment, personality, creature type, Hit Points, and Hit Point Dice. Equipment the familiar is wearing or carrying doesn't change size or shape to match the Beast form, and any equipment that the Beast form can't wear or carry falls to the ground.",
      ],
      [
        'Your familiar gains a number of Temporary Hit Points equal to the Hit Points of the Beast form. These Temporary Hit Points vanish if any remain when the transformation ends. The transformation ends early on your familiar if it has no Temporary Hit Points left.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  necklace_of_the_beastly_familiar_tyrannosaurus_rex: {
    name: 'Necklace of the Beastly Familiar (Tyrannosaurus Rex)',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: 'by a Spellcaster',
    text: [
      [
        'This bejeweled necklace is set with fire opal and comes with a matching charm that can be worn by your familiar.',
      ],
      [
        "Familiar. While wearing this necklace, you can cast the Find Familiar spell from it. Once the necklace has been used to cast this spell, it can't be used to cast it again until the next dawn.",
      ],
      [
        'Beast Transformation. While your familiar is within 60 feet of you, you can take a Magic action to activate the necklace. Your familiar shape-shifts into a Tyrannosaurus Rex for 10 minutes.',
      ],
      [
        "While your familiar is transformed, its stat block is replaced by the stat block of the Beast form, but it retains its alignment, personality, creature type, Hit Points, and Hit Point Dice. Equipment the familiar is wearing or carrying doesn't change size or shape to match the Beast form, and any equipment that the Beast form can't wear or carry falls to the ground.",
      ],
      [
        'Your familiar gains a number of Temporary Hit Points equal to the Hit Points of the Beast form. These Temporary Hit Points vanish if any remain when the transformation ends. The transformation ends early on your familiar if it has no Temporary Hit Points left.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  ominous_staff_of_skulls: {
    name: 'Ominous Staff of Skulls',
    category: 'Staff',
    detail: 'Quarterstaff',
    rarity: 'uncommon',
    attunement: 'by a Spellcaster',
    text: [
      ['Weight · 4 lb'],
      ['Ominous. A skull adorns the top of the staff.'],
      [
        "While you hold the staff, you can cast Chill Touch from it, using your spell attack bonus. Additionally, you have Advantage on Charisma (Intimidation) checks made while holding the staff, and the staff's eye sockets glow a disquieting green, shedding Dim Light in a 5-foot radius.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  orb_of_divination_detection: {
    name: 'Orb of Divination Detection',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      ['This glass orb is a useful defense against meddlesome mages and magic-wielding spies.'],
      [
        "Detect Divination. When you are targeted by a spell from the Divination school, the orb glows bright green for the spell's duration.",
      ],
      ['Spellcasting Focus. This orb can be used as an Arcane Focus.'],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  orb_of_sorcery: {
    name: 'Orb of Sorcery',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a Sorcerer',
    text: [
      ['Ribbons of varicolored light swirl inside this magical glass orb.'],
      [
        "Sorcerous Reservoir. While holding this orb, you can take a Magic action to regain up to 2 expended Sorcery Points. Once this property is used, it can't be used again until the next dawn.",
      ],
      ['Spellcasting Focus. You can use the orb as a Spellcasting Focus for your Sorcerer spells.'],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  potion_of_dragons_breath: {
    name: "Potion of Dragon's Breath",
    category: 'Potion',
    rarity: 'uncommon',
    text: [
      [
        "When you drink this potion, you gain the effect of the Dragon's Breath spell for 1 minute (save DC 13, no Concentration required). The damage type associated with that spell is determined by the color of the potion when the potion was created, as shown in the table below.",
      ],
      [
        'Light catches off the glittery liquid inside this potion, which is made from the pulverized scale of a chromatic dragon.',
      ],
      ['Color · Damage Type'],
      ['Black · Acid'],
      ['Blue · Lightning'],
      ['Green · Poison'],
      ['Red · Fire'],
      ['White · Cold'],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  potion_of_tirelessness: {
    name: 'Potion of Tirelessness',
    category: 'Potion',
    rarity: 'uncommon',
    text: [
      [
        "After you drink this potion, you don't need to sleep, and magic can't put you to sleep. This effect lasts 24 hours. For the duration, you can finish a Long Rest in 4 hours if you spend those hours in a state of quiet focus, during which you retain consciousness.",
      ],
      [
        'This pale red potion is as thick as molasses, yet it slides out of the bottle as readily as oil.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  prismatic_rune: {
    name: 'Prismatic Rune',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a Spellcaster',
    text: [
      [
        'A magical rune is etched on this small stone made of multicolored quartz. When you finish a Long Rest, choose one of the following damage types: Acid, Cold, Fire, Lightning, or Thunder. The rune is imbued with the chosen damage type until you finish another Long Rest.',
      ],
      [
        "Charges. The rune has 6 charges and regains 1d6 expended charges daily at dawn. When you cast a spell that deals damage, you can expend 1 charge to change the spell's damage type to the damage type chosen for the rune.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  queen_ehlissas_marvelous_nightingale: {
    name: "Queen Ehlissa's Marvelous Nightingale",
    category: 'Wondrous Item',
    rarity: 'artifact',
    attunement: true,
    text: [
      [
        "Queen Ehlissa's Marvelous Nightingale is named for its first owner, a queen from the eastern Flanaess in the world of Greyhawk. Its origin is unknown, but one legend holds that it was made to console the queen when a beloved pet songbird met its unfortunate end.",
      ],
      [
        "This mechanical songbird has crystal eyes, golden feathers, and a small windup key on its back. As a Magic action, you can cause the bird to spring to life for 10 minutes, during which time it sings a beautiful melody audible within 300 feet, or you can revert the bird to its mechanical form. When the nightingale becomes mechanical again, it can't come to life again for 1 hour.",
      ],
      [
        'Aura of Truth. While the nightingale sings, the effect of a Zone of Truth spell (save DC 18) fills a 15-foot Emanation originating from the nightingale. While attuned to the nightingale, you know which creatures succeed on or fail the saving throw against this effect.',
      ],
      [
        "Counterspell. While the nightingale sings, you can take a Reaction to cast Counterspell (save DC 18) in response to that spell's trigger. Once this property is used, it can't be used again until the next dawn.",
      ],
      [
        'Random Properties. The Artifact has the following random properties (see the "Artifacts" section in the Dungeon Master\'s Guide):',
      ],
      ['2 minor beneficial properties'],
      ['1 major beneficial property'],
      ['1 minor detrimental property'],
      [
        'Destroying the Nightingale. The nightingale is destroyed if it is released into a whirlwind in Limbo.',
      ],
      [
        'Ensemble Casting. The nightingale has 6 charges and regains 1d6 + 1 expended charges daily at dawn. As a Bonus Action while the nightingale is singing and within 60 feet of you, you can expend charges to cast one of the spells on the table below from the nightingale (save DC 18). The table shows the number of charges you must expend to cast the spell.',
      ],
      ['Spell · Charge Cost'],
      ['Calm Emotions · 1'],
      ['Compulsion · 3'],
      ['Delayed Blast Fireball · 6'],
      ['Detect Evil and Good · 0'],
      ['Greater Restoration · 4'],
      ['Prismatic Spray · 6'],
      ['Slow · 2'],
      ['Speak with Animals · 0'],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  ring_of_dedicated_focus: {
    name: 'Ring of Dedicated Focus',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "The magical spike on the side of this ring allows you to sharpen your focus at a moment's notice. When you fail a Constitution saving throw to maintain Concentration, you can roll up to two of your unexpended Hit Dice and add the total rolled to your save, potentially turning the failure into a success. The rolled Hit Dice are then expended.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  scholars_anchoring_bangle: {
    name: "Scholar's Anchoring Bangle",
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'This heavy magical bracelet inures your mind against potential distractions. While wearing this bracelet, you gain the following benefits.',
      ],
      [
        'Deep Knowledge. When you take the Study action and make an Intelligence check using a skill in which you have proficiency, you can treat a d20 roll of 9 or lower as a 10.',
      ],
      [
        "Single-Minded Focus. When you fail a Constitution saving throw to maintain Concentration, you can take a Reaction to succeed instead. Once you use this property, it can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  secret_keepers_circlet: {
    name: "Secret Keeper's Circlet",
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'This circlet allows the wearer to wipe from their memory any knowledge of a specific deed or time in their life, making it useful for those who fear mages plumbing their minds with magic.',
      ],
      [
        'While wearing this circlet, you can take a Magic action to specify a trigger such as "after I leave this temple" or "when I cast the Animate Dead spell." For the next 24 hours, if that trigger occurs, the circlet erases your memories of everything from the time you chose the trigger until the trigger occurred. No magic short of a Wish spell can restore your memory of this time. Once you use this property, you can\'t use it again until the next dawn.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  spell_component_ring: {
    name: 'Spell Component Ring',
    category: 'Ring',
    rarity: 'common',
    text: [
      [
        "This steel ring has a discreet chamber lined with a mystical inscription. As a Magic action, choose one spell you have prepared that requires a Material component; the required Material component must neither have a cost specified nor be consumed by the spell. You store that spell's Material component in the ring's chamber.",
      ],
      [
        "Whenever you cast the chosen spell, you don't need to have a hand free to access its Material component, provided you are wearing the ring. The ring can hold the Material component for one spell at a time.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  spell_duelists_trophy: {
    name: "Spell Duelist's Trophy",
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a Spellcaster',
    text: [
      [
        'This withered hand or talon is attached to a leather cord that can be worn like a necklace or bracelet. You gain the following benefits while wearing the trophy.',
      ],
      [
        "Dispelling Touch. When you hit a creature with a melee spell attack, you can activate the trophy to cast the Dispel Magic spell as part of that attack, targeting the hit creature. Once this property has been used, it can't be used again until the next dawn.",
      ],
      [
        'Helping Hand. When you cast a spell using a spell slot, you can cast it without any Somatic components.',
      ],
      ['Mage Hand. You can cast the Mage Hand cantrip from the trophy.'],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  spell_slingers_puppet: {
    name: "Spell-Slinger's Puppet",
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "As a Bonus Action while holding this ventriloquist's doll, you can pull the cord on the doll's back to cause the doll to levitate to an unoccupied space you can see within 30 feet of yourself and hover there. While the doll hovers, you can take a Bonus Action to cause the doll to move up to 30 feet to another unoccupied space you can see within 30 feet of yourself. The doll hovers for 1 minute or until you end the effect as a Bonus Action.",
      ],
      [
        "While the doll is within 30 feet of you, you can speak using the doll's mouth rather than your own. This allows you to, for instance, cast a spell with a Verbal component even if you can't speak.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  staff_of_the_lost: {
    name: 'Staff of the Lost',
    category: 'Staff',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      [
        'This staff can be wielded as a magic Quarterstaff that grants a +1 bonus to attack rolls and damage rolls made with it.',
      ],
      [
        'The staff has 3 charges. While holding the staff, you can expend 1 charge to cast either Maze (save DC 18) or Teleport from it. When the staff has no more charges remaining, it loses its magic and becomes a nonmagical Quarterstaff.',
      ],
      [
        'Curse. This staff is cursed. Becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the staff, keeping it on your person at all times.',
      ],
      [
        'While attuned to this staff, you never know which way is north, and you have Disadvantage on Wisdom (Survival) checks made to navigate. Additionally, whenever you expend a charge from the staff, roll 1d20. On a 1, 1d4 minotaurs of Baphomet materialize, each appearing in an unoccupied space within 30 feet of you. The minotaurs begin combat with you immediately.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  sweeping_broom: {
    name: 'Sweeping Broom',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "As a Magic action, you can use this unassuming broom's command word, choosing a point you can see on the ground within 60 feet of yourself. The broom animates and sweeps dust and detritus from the ground in a 20-foot square centered on the chosen point. It sweeps that area until you take another Magic action to deactivate it.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  thespians_playbill: {
    name: "Thespian's Playbill",
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'While holding this magical theater program, whenever you take the Study action and make an Intelligence check, you gain a bonus to the check equal to your Charisma modifier (minimum of +1).',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  thiefs_thimble: {
    name: "Thief's Thimble",
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'This magic thimble aids thieves in foiling traps. While wearing this thimble, if you trigger a trap and take damage, the thimble takes the damage instead.',
      ],
      [
        'The thimble has 30 Hit Points. If the thimble is reduced to 0 Hit Points, it breaks, and you take any remaining damage.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  three_keyholes_dagger: {
    name: 'Three Keyholes Dagger',
    category: 'Weapon',
    detail: 'Dagger',
    rarity: 'uncommon',
    attunement: true,
    text: [
      ['Weight · 1 lb'],
      ["Three. Three ornamental keyholes adorn the weapon's hilt."],
      [
        "You have a +1 bonus to attack rolls and damage rolls made with this magic weapon. When you take the Attack action, you can transform this weapon into a Handaxe or Mace. It remains transformed in this way until the start of your next turn, at which point it reverts back to its Dagger form. Regardless of the weapon's form, you can use your choice of your Strength or Dexterity modifier for the attack and damage rolls; you must use the same modifier for both rolls.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  travelers_pearl: {
    name: "Traveler's Pearl",
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        "By using a command word while holding this pearl, you can cast the Teleport spell from it. Once this property is used, it can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  universal_pantograph: {
    name: 'Universal Pantograph',
    category: 'Wondrous Item',
    rarity: 'artifact',
    text: [
      [
        'This cubical box measures 2 feet on each side. It appears to be made of oak and bound in silver, and its surface is engraved with motifs of marionettes and laughing children.',
      ],
      [
        'When a nonmagical item is placed in the box and the lid is closed, a perfect duplicate of the item appears next to the box.',
      ],
      [
        "Clone. As a Magic action, you can cause the pantograph to grow large enough for a Medium creature to crouch within. You can revert the pantograph to its normal size as a Magic action, harmlessly shunting anything that can't fit inside to the nearest unoccupied space.",
      ],
      [
        "When a creature is inside the pantograph, you can close the pantograph's lid and sprinkle the pantograph with diamond dust worth at least 100 GP. If you do, the diamond dust is consumed, and you cast the Clone spell, targeting the creature inside the pantograph. After the spell's casting time is finished, the creature is harmlessly shunted from the pantograph, and the pantograph's lid then can't be opened for 120 days, during which time the duplicate from the spell grows within. Once the clone is finished forming, it is harmlessly shunted from the pantograph, and the pantograph returns to its original size. A clone created by the pantograph doesn't need to be contained within a vessel and endures indefinitely while inert.",
      ],
      [
        "Destroying the Pantograph. If the pantograph doesn't contain a clone, it is destroyed after being submerged in a bog in the Feywild for 999 years.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  wand_of_freshness: {
    name: 'Wand of Freshness',
    category: 'Wand',
    rarity: 'uncommon',
    text: [
      [
        'This wand has 4 charges and regains 1d4 + 1 expended charges daily at dawn. While holding it, you can expend 1 charge to cast the Purify Food and Drink spell from it.',
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  wand_of_slumber: {
    name: 'Wand of Slumber',
    category: 'Wand',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'This wand has 7 charges. While holding it, you can cast one of the spells on the following table from it. The table indicates how many charges you must expend to cast the spell.',
      ],
      [
        "Regaining Charges. The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll 1d20. On a 1, the wand crumbles into sand and is destroyed.",
      ],
      ['Spell · Charge Cost'],
      ['Catnap · 3'],
      ['Sleep (save DC 15) · 1'],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  wand_of_teeth: {
    name: 'Wand of Teeth',
    category: 'Wand',
    rarity: 'rare',
    text: [
      [
        'This wand has 10 charges. While holding it, you can take a Magic action to expend up to 3 charges to spray a wave of sharp, spectral teeth in the direction you point it. Each creature in a 30-foot Cone makes a DC 15 Dexterity saving throw. Roll a number of d8s equal to the number of charges expended. On a failed save, a creature takes Piercing damage equal to the total rolled and has the ',
        rules.poisoned,
        ' condition until the start of your next turn; on a successful save, a creature takes half as much damage only.',
      ],
      [
        "Regaining Charges. The wand regains 1d10 expended charges daily at dawn. If you expend the wand's last charge, roll 1d20. On a 1, the wand explodes into harmless splinters and is destroyed.",
      ],
    ],
    publication: refs.publications.arcana_unleashed,
  },
  workshop_wrecker: {
    name: 'Workshop Wrecker',
    category: 'Wondrous Item',
    rarity: 'very rare',
    text: [
      [
        "When this 3-inch-diameter metal ball is activated as a Magic action, it moves at a rapid speed, bouncing off walls and defying any attempts to capture it. The ball remains active for 1 minute or until you deactivate it by using a command word while within 30 feet of it (no action required). Once the ball is used, it can't be used again until the next dawn.",
      ],
      [
        'When you activate the ball and at the beginning of each of your turns while the ball is active, each creature in the area makes a Dexterity saving throw, taking Bludgeoning damage on a failed save. The save DC and amount of damage dealt depend on the approximate size of the area in which the ball is active, as shown on the following table.',
      ],
      [
        "A nonmagical object that isn't being worn or carried also takes the damage if it is in the area. In confined areas larger than a 100-foot Cube, the amount of damage caused by the ball is negligible. If the ball is activated in an unconfined area, it flies off in a random direction at a rate of 300 feet per round.",
      ],
      ['Area · Save DC · Bludgeoning Damage'],
      ['15-foot Cube · 18 · 6d6 + 5'],
      ['30-foot Cube · 17 · 4d6 + 4'],
      ['50-foot Cube · 15 · 2d6 + 2'],
      ['100-foot Cube · 14 · 1d6 + 1'],
    ],
    publication: refs.publications.arcana_unleashed,
  },
})
