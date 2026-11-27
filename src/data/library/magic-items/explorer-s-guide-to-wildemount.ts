import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  amulet_of_the_drunkard: {
    name: 'Amulet of the Drunkard',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        "This amulet smells of old, ale-stained wood. While wearing it, you can regain 4d4 + 4 hit points when you drink a pint of beer, ale, mead, or wine. Once the amulet has restored hit points, it can't do so again until the next dawn.",
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  arcane_cannon: {
    name: 'Arcane Cannon',
    category: 'Wondrous Item',
    rarity: 'very rare',
    text: [
      [
        "This Large cannon is imbued with magic. It requires no ammunition and doesn't need to be loaded. It takes one action to aim the cannon and one action to fire it. After the cannon has fired, it must recharge for 5 minutes before it can be fired again.",
      ],
      ['The creature firing the cannon chooses the effect from the following options:'],
      [
        'Acid Jet. The cannon discharges acid in a line 300 feet long and 5 feet wide. Each creature in that line must make a DC 15 Dexterity saving throw, taking 22 (4d10) acid damage on a failed save, or half as much damage on a successful one. In addition, a creature that fails its saving throw takes 11 (2d10) acid damage at the start of each of its turns; a creature can end this damage by using its action to wash off the acid with a pint or more of water.',
      ],
      [
        "Fire Jet. The cannon discharges fire in a line 300 feet long and 5 feet wide. Each creature in the area must make a DC 15 Dexterity saving throw, taking 33 (6d10) fire damage on a failed save, or half as much damage on a successful one. The fire ignites any flammable objects in the area that aren't being worn or carried.",
      ],
      [
        "Frost Shot. The cannon shoots a ball of frost to a point you can see within 1,200 feet of the cannon. The ball then expands to form a 30-foot-radius sphere centered on that point. Each creature in that area must make a DC 15 Constitution saving throw. On a failed save, a creature takes 22 (4d10) cold damage, and its speed is reduced by 10 feet for 1 minute. On a successful save, the creature takes half as much damage, and its speed isn't reduced. A creature whose speed is reduced by this effect can repeat the save at the end of each of its turns, ending the effect on itself on a success.",
      ],
      [
        'Lightning Shot. The cannon shoots a ball of lightning to a point you can see within 1,200 feet of the cannon. The lightning then expands to form a 20-foot-radius sphere centered on that point. Each creature in that area must make a DC 15 Dexterity saving throw, taking 33 (6d10) lightning damage on a failed save, or half as much damage on a successful one. Creatures wearing metal armor have disadvantage on the save.',
      ],
      [
        'Poison Spray. The cannon expels poison gas in a 60-foot cone. Each creature in that area must make a DC 15 Constitution saving throw. On a failed save, the creature takes 22 (4d10) poison damage and is ',
        rules.poisoned,
        " for 1 minute. On a successful save, the creature takes half as much damage and isn't ",
        rules.poisoned,
        '. A creature ',
        rules.poisoned,
        ' in this way can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  battering_shield: {
    name: 'Battering Shield',
    category: 'Shield',
    detail: 'Shield',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 6 lb'],
      [
        "While holding this iron tower shield, you gain a +1 bonus to AC. This bonus is in addition to the shield's normal bonus to AC.",
      ],
      [
        'Additionally, the shield has 3 charges, and it regains 1d3 expended charges daily at dawn. If you are holding the shield and push a creature within your reach at least 5 feet away, you can expend 1 charge to push that creature an additional 10 feet, knock it ',
        rules.prone,
        ', or both.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  blade_of_broken_mirrors_dormant: {
    name: 'Blade of Broken Mirrors (Dormant)',
    category: 'Weapon',
    detail: 'Dagger',
    rarity: 'artifact',
    attunement: 'by a humanoid',
    text: [
      ['Weight · 1 lb'],
      [
        'A weapon of Tharizdun, this dagger is a piece of jagged stone whose blade is scribed with a maze-like pattern with no beginning or end.',
      ],
      [
        'Sentience. The Blade of Broken Mirrors is a sentient chaotic evil weapon with an Intelligence of 21, a Wisdom of 24, and a Charisma of 24. It has hearing and darkvision out to a range of 120 feet.',
      ],
      [
        'The weapon communicates telepathically with its wielder and can speak, read, and understand Abyssal and Common.',
      ],
      [
        "Personality. An insane glabrezu named Ragazuu lives within the Blade of Broken Mirrors. The weapon yearns to cause chaos. It learns its wielder's principles, then uses those ideals to encourage reckless action. The dagger whispers ideas of revolution.",
      ],
      ['Dormant. The dagger grants the following benefits in its dormant state:'],
      ['You can speak, read, and write Abyssal.'],
      [
        'You gain a +1 bonus to attack and damage rolls made with this magic weapon. Immediately after you make a ranged attack with this weapon, it returns to your hand.',
      ],
      [
        "Whenever you kill a humanoid with an attack using the Blade of Broken Mirrors, the blade remembers the creature's appearance. While holding the dagger, you can use an action to change your form to match any humanoid the blade remembers. Your statistics, other than your size, don't change. Any equipment you are wearing or carrying isn't transformed. You can revert to your true appearance as an action. You revert to your true appearance automatically when you die. When the Blade of Broken Mirrors attunes to a new wielder, the appearances of humanoids it has killed are wiped from its memory.",
      ],
      [
        'Betrayer Artifact Properties. The Arms of the Betrayers advance in power in the same manner as the Vestiges of Divergence. In its dormant state, each of these artifacts has one minor beneficial property and one minor detrimental property. When the artifact attains an awakened state, it gains an additional minor beneficial property and an additional minor detrimental property. When the item reaches its exalted state, it gains a major beneficial property. See "Artifact Properties" in chapter 7 of the Dungeon Master\'s Guide for more information.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  bloodaxe: {
    name: 'Bloodaxe',
    category: 'Weapon',
    detail: 'Greataxe',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 7 lb'],
      [
        "You gain a +2 bonus to attack and damage rolls made with this magic axe. The axe deals an extra 1d6 necrotic damage to creatures that aren't constructs or undead. If you reduce such a creature to 0 hit points with an attack using this axe, you gain 10 temporary hit points.",
      ],
      [
        'This axe is forged from a dark, rust-colored metal and once belonged to the goliath barbarian Grog Strongjaw of Vox Machina.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  breathing_bubble: {
    name: 'Breathing Bubble',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This translucent, bubble-like sphere has a slightly tacky outer surface, and you gain the item's benefits only while wearing it over your head like a helmet.",
      ],
      [
        'The bubble contains 1 hour of breathable air. The bubble regains all its expended air daily at dawn.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  brooch_of_living_essence: {
    name: 'Brooch of Living Essence',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'While wearing this nondescript brooch, spells and anything else that would detect or reveal your creature type treat you as humanoid, and those that would reveal your alignment treat it as neutral.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  butchers_bib: {
    name: "Butcher's Bib",
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'This black leather apron is perpetually covered by blood, even after being washed off. You gain the following benefits while wearing the apron:',
      ],
      [
        "Once per turn when you roll damage for a melee attack with a weapon, you can reroll the weapon's damage dice. If you do so, you must use the second total.",
      ],
      [
        'Your weapon attacks that deal slashing damage score a critical hit on a roll of 19 or 20 on the d20.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  coin_of_delving: {
    name: 'Coin of Delving',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This scintillating copper coin sheds dim light in a 5-foot radius. If dropped a distance greater than 5 feet, the coin issues a melodious ringing sound when it hits a surface. Any creature that can hear the chime can determine the distance the coin dropped based on the tone.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  danoths_visor_dormant: {
    name: "Danoth's Visor (Dormant)",
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'These mithral-frame goggles with clear diamond lenses were used by the evoker Danoth Oro to spot ',
        rules.invisible,
        ' enemies and scout areas from afar.',
      ],
      [
        'Dormant. While wearing the goggles in their dormant state, you can see normally in darkness, both magical and nonmagical, to a distance of 60 feet. Additionally, you have advantage on Intelligence (Investigation) and Wisdom (Perception) checks that rely on sight.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  dispelling_stone: {
    name: 'Dispelling Stone',
    category: 'Wondrous Item',
    rarity: 'very rare',
    text: [
      [
        'This smooth, rainbow-colored, egg-shaped stone can be thrown up to 30 feet and explodes in a 10-foot-radius sphere of magical energy on impact, destroying the stone. Any active spell of 5th level or lower in the sphere ends.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  duskcrusher: {
    name: 'Duskcrusher',
    category: 'Weapon',
    detail: 'Warhammer',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 2 lb'],
      [
        "This item takes the form of a leather-wrapped metal rod emblazoned with the symbol of Pelor, the Dawn Father. While grasping the rod, you can use a bonus action to cause a warhammer head of crackling radiance to spring into existence. The warhammer's radiant head emits bright light in a 15-foot radius and dim light for an additional 15 feet. The light is sunlight. You can use an action to make the radiant head disappear.",
      ],
      [
        'While the radiant head is active, you gain a +2 bonus to attack and damage rolls made with this magic weapon, and attacks with the weapon deal radiant damage instead of bludgeoning damage. An undead creature hit by the weapon takes an extra 1d8 radiant damage.',
      ],
      [
        "While you are holding Duskcrusher and its radiant head is active, you can use an action to cast the sunbeam spell (save DC 15) from the weapon, and this action can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  dust_of_deliciousness: {
    name: 'Dust of Deliciousness',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        "This reddish brown dust can be sprinkled over any edible substance to greatly improve the flavor. The dust also dulls the eater's senses: anyone eating food treated with this dust has disadvantage on Wisdom ability checks and Wisdom saving throws for 1 hour. There is enough dust to flavor six servings.",
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  goggles_of_object_reading: {
    name: 'Goggles of Object Reading',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'These leather-framed goggles feature purple crystal lenses. While wearing the goggles, you have advantage on Intelligence (Arcana) checks made to reveal information about a creature or object you can see.',
      ],
      [
        "In addition, you can cast the identify spell using the googles. Once you do so, you can't do so again until the next dawn.",
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  grimoire_infinitus_dormant: {
    name: 'Grimoire Infinitus (Dormant)',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: 'by a wizard',
    text: [
      ['Weight · 3 lb'],
      [
        'Several of these spellbooks with gilded pages and silver-plated covers were created during the Age of Arcanum, but only one has been found since the Calamity ended. The book has an infinite number of pages, is three inches thick, eight inches wide, twelve inches long, and weighs three pounds.',
      ],
      [
        "Dormant. Most of the book is blank, but the following spells are recorded in the first pages of the tome: alarm, antimagic field, Bigby's hand, blight, charm person, confusion, control weather, create undead, detect thoughts, enlarge/reduce, fear, foresight, gaseous form, glyph of warding, legend lore, Leomund's tiny hut, mass suggestion, mislead, misty step, Mordenkainen's faithful hound, prismatic spray, ray of enfeeblement, silent image, teleport, and thunderwave.",
      ],
      [
        'You can use the grimoire as your spellbook, and you can scribe new spells into it as normal. When you prepare wizard spells using the grimoire, the number of wizard spells you can prepare increases by 1.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  grovelthrash_dormant: {
    name: 'Grovelthrash (Dormant)',
    category: 'Weapon',
    detail: 'Warhammer',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 2 lb'],
      [
        'Crafted from a single piece of obsidian, this warhammer of Torog hums with magical energy and is carved with the images of faces screaming in pain.',
      ],
      [
        'Sentience. Grovelthrash is a sentient neutral evil weapon with an Intelligence of 18, a Wisdom of 15, and a Charisma of 19. It has hearing and darkvision out to a range of 120 feet.',
      ],
      [
        'The weapon communicates telepathically with its wielder and can speak, read, and understand Abyssal, Common, and Infernal.',
      ],
      [
        'Personality. A covetous ultroloth named Ciria lives within Grovelthrash. The weapon values material possessions and doling out pain. It compliments its wielder whenever they claim treasure and takes pleasure in harming others.',
      ],
      ['Dormant. The warhammer grants the following benefits in its dormant state:'],
      ['You can speak, read, and write Abyssal and Infernal.'],
      [
        'You gain a +1 bonus to attack and damage rolls made with this magic weapon. When you hit with an attack using this warhammer, you can deal an extra 2d6 bludgeoning damage to the target. If you do, you take 1d6 psychic damage. The warhammer deals double damage to objects and structures.',
      ],
      [
        'While holding this weapon, you have advantage on Wisdom (Insight) checks made to discern a lie spoken in a language you understand.',
      ],
      [
        'Betrayer Artifact Properties. The Arms of the Betrayers advance in power in the same manner as the Vestiges of Divergence. In its dormant state, each of these artifacts has one minor beneficial property and one minor detrimental property. When the artifact attains an awakened state, it gains an additional minor beneficial property and an additional minor detrimental property. When the item reaches its exalted state, it gains a major beneficial property. See "Artifact Properties" in chapter 7 of the Dungeon Master\'s Guide for more information.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  hide_of_the_feral_guardian_dormant: {
    name: 'Hide of the Feral Guardian (Dormant)',
    category: 'Armor',
    detail: 'Studded Leather Armor',
    rarity: 'legendary',
    attunement: true,
    text: [
      ['Weight · 13 lb'],
      [
        'It is believed that this polished and beautifully detailed leather armor was a gift from Melora, bestowed on a long-forgotten archdruid and champion of the natural world before the terrors of the Calamity.',
      ],
      ['Dormant. While wearing the armor in its dormant state, you gain the following benefits:'],
      ['The armor grants you a +1 bonus to AC.'],
      [
        'While you are transformed by an effect that replaces any of your game statistics with those of another creature, you have a +1 bonus to melee attack and damage rolls, and you retain the benefits of this armor.',
      ],
      [
        "As an action, you can use the armor to cast polymorph on yourself, transforming into a giant owl while retaining your Intelligence, Wisdom, and Charisma scores. This property can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  hunters_coat: {
    name: "Hunter's Coat",
    category: 'Armor',
    detail: 'Leather Armor',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 10 lb'],
      ['You have a +1 bonus to AC while wearing this armor.'],
      [
        "The coat has 3 charges. When you hit a creature with an attack and that creature doesn't have all its hit points, you can expend 1 charge to deal an extra 1d10 necrotic damage to the target. The coat regains 1d3 expended charges daily at dawn.",
      ],
      [
        'The breastplate and shoulder protectors of this armor are made of leather that has been stiffened by being boiled in oil. The rest of the armor is made of softer and more flexible materials.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  infiltrators_key_dormant: {
    name: "Infiltrator's Key (Dormant)",
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'This mithral skeleton key was forged using the blood of twelve master thieves executed for trying to steal magic items during the Age of Arcanum.',
      ],
      ["Dormant. The Infiltrator's Key grants the following benefits in its dormant state:"],
      [
        "The key can be used as thieves' tools for the purpose of opening locks. When using the key, you are considered proficient in thieves' tools and you have advantage on ability checks made to open locks.",
      ],
      [
        'While holding the key, your steps are muffled, giving you advantage on Dexterity (Stealth) checks made to move silently.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  lash_of_shadows_dormant: {
    name: 'Lash of Shadows (Dormant)',
    category: 'Weapon',
    detail: 'Whip',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 3 lb'],
      [
        'This snakeskin whip is touched by the power of Zehir and ends in five animated serpent heads.',
      ],
      [
        'Sentience. The Lash of Shadows is a sentient chaotic evil weapon with an Intelligence of 18, a Wisdom of 16, and a Charisma of 20. It has hearing and darkvision out to a range of 120 feet.',
      ],
      [
        'The weapon communicates telepathically with its wielder and can speak, read, and understand Abyssal, Common, and Draconic.',
      ],
      [
        'Personality. A mad marilith named Sizlifeth lives within the Lash of Shadows. The weapon has a short temper and experiences only extreme emotions. It is most happy when dealing harm.',
      ],
      ['Dormant. The whip grants the following benefits in its dormant state:'],
      ['You can speak, read, and write Abyssal and Draconic.'],
      ['You gain a +1 bonus to attack and damage rolls made with this magic weapon.'],
      [
        "You can attempt to poison any creature that is hit by the whip. The creature must succeed on a DC 13 Constitution saving throw or suffer the effect of one of the following poisons of your choice; once a poison other than Serpent Venom has been used, that poison can't be used again until the next dawn:",
      ],
      [
        'Dead Eyes. A creature that fails the saving throw against this poison is ',
        rules.poisoned,
        ' for 1 hour. While ',
        rules.poisoned,
        ' in this way, the creature is ',
        rules.blinded,
        '.',
      ],
      [
        'Serpent Venom. A creature that fails the saving throw against this poison takes 3d6 poison damage, or half as much damage on a successful save.',
      ],
      [
        'Betrayer Artifact Properties. The Arms of the Betrayers advance in power in the same manner as the Vestiges of Divergence. In its dormant state, each of these artifacts has one minor beneficial property and one minor detrimental property. When the artifact attains an awakened state, it gains an additional minor beneficial property and an additional minor detrimental property. When the item reaches its exalted state, it gains a major beneficial property. See "Artifact Properties" in chapter 7 of the Dungeon Master\'s Guide for more information.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  luxon_beacon: {
    name: 'Luxon Beacon',
    category: 'Wondrous Item',
    rarity: 'legendary',
    text: [
      [
        'This dodecahedron of faintly glowing crystal is heavier than it appears. A set of handles are affixed to its sides, and it pulsates and thrums when touched.',
      ],
      [
        "Fragment of Possibility. A creature that touches the beacon and concentrates for 1 minute receives a Fragment of Possibility, which looks like a Tiny, grayish bead of energy that follows the creature around, staying within 1 foot of it at all times. The fragment lasts for 8 hours or until used. Once the beacon grants a Fragment of Possibility, it can't grant another until the next dawn. A creature with a Fragment of Possibility from a Luxon Beacon can't gain another Fragment of Possibility from any source.",
      ],
      [
        'When a creature with a Fragment of Possibility makes an attack roll, an ability check, or a saving throw, it can expend its fragment to roll an additional d20 and choose which of the d20s to use. Alternatively, when an attack roll is made against the creature, it can expend its fragment to roll a d20 and choose which of the d20s to use, the one it rolled or the one the attacker rolled.',
      ],
      [
        'If the original d20 roll has advantage or disadvantage, the creature rolls its d20 after advantage or disadvantage has been applied to the original roll.',
      ],
      [
        'Soul Snare. If a follower of the Luxon who has undergone a ritual of consecution dies within 100 miles of a Luxon Beacon, their soul is ensnared by it. This soul will be reincarnated within the body of a random humanoid baby developing within 100 miles of the beacon.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  mace_of_the_black_crown_dormant: {
    name: 'Mace of the Black Crown (Dormant)',
    category: 'Weapon',
    detail: 'Mace',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      [
        'This mace has a haft of black iron and a ruby head with a fiendish countenance. Carrying the boon of Asmodeus, it is fit for the most powerful servants of the Nine Hells.',
      ],
      [
        'Sentience. The Mace of the Black Crown is a sentient lawful evil weapon with an Intelligence of 20, a Wisdom of 12, and a Charisma of 18. It has hearing and darkvision out to a range of 120 feet.',
      ],
      [
        'The weapon communicates telepathically with its wielder and can speak, read, and understand Common and Infernal.',
      ],
      [
        "Personality. A greedy erinyes named Xartaza lives within the Mace of the Black Crown. Xartaza wants to recruit more souls for Asmodeus, so the weapon pushes its wielder toward lawful evil actions by manipulating the wielder's dreams. A former Blood War general, Xartaza hates demons and relishes crafting sound battle plans in any conflict.",
      ],
      ['Dormant. The mace grants the following benefits in its dormant state:'],
      ['You can speak, read, and write Infernal.'],
      ['You gain a +1 bonus to attack and damage rolls made with this magic weapon.'],
      [
        'While holding the mace, you can use a bonus action to speak its Infernal command word, causing flames to erupt from the head. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the mace is ablaze, it deals an extra 1d6 fire damage to any target it hits. The flames last until you use a bonus action to speak the command word again or until you are no longer holding the mace.',
      ],
      [
        "While holding the mace, you can use an action to summon an imp. Any devil you summon with this mace is friendly to you and your companions for the duration. The imp obeys any verbal commands that you issue to it and returns to the Nine Hells 10 minutes after you summoned it. This property can't be used again until the next dawn.",
      ],
      [
        'Betrayer Artifact Properties. The Arms of the Betrayers advance in power in the same manner as the Vestiges of Divergence. In its dormant state, each of these artifacts has one minor beneficial property and one minor detrimental property. When the artifact attains an awakened state, it gains an additional minor beneficial property and an additional minor detrimental property. When the item reaches its exalted state, it gains a major beneficial property. See "Artifact Properties" in chapter 7 of the Dungeon Master\'s Guide for more information.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  needle_of_mending: {
    name: 'Needle of Mending',
    category: 'Weapon',
    detail: 'Dagger',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 1 lb'],
      [
        'This weapon is a magic dagger disguised as a sewing needle. When you hold it and use a bonus action to speak its command word, it transforms into a dagger or back into a needle.',
      ],
      [
        'You gain a +1 bonus to attack and damage rolls made with the dagger. While holding it, you can use an action to cast the mending cantrip from it.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  nightfall_pearl: {
    name: 'Nightfall Pearl',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        "Used to summon night, this 6-inch-diameter, jet-black orb is cold to the touch. You can spend 10 minutes to activate it, causing the area within 10 miles of it at the moment of activation to become night even if it is daytime. This night lasts for 24 hours, until you cancel it as an action, or until your attunement to the pearl ends. Once used, the pearl can't be used again for 24 hours.",
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  orb_of_the_veil: {
    name: 'Orb of the Veil',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 3 lb'],
      [
        'This onyx sphere bears deep, spiraling grooves and dangles from an iron chain. While the orb is on your person, you gain the following benefits:',
      ],
      ['Your Wisdom score increases by 2, as does your maximum for that score.'],
      [
        'You gain darkvision out to a range of 60 feet. If you already have darkvision, the orb increases its range by 60 feet.',
      ],
      ['You have advantage on Wisdom checks to find hidden doors and paths.'],
      [
        'Curse. The orb is cursed, and becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the orb, keeping it on your person at all times. All nonmagical flames within 30 feet of you automatically extinguish, and fire damage dealt by you is halved.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  potion_of_maximum_power: {
    name: 'Potion of Maximum Power',
    category: 'Potion',
    rarity: 'rare',
    text: [
      [
        'The first time you cast a damage-dealing spell of 4th level or lower within 1 minute after drinking the potion, instead of rolling dice to determine the damage dealt, you can instead use the highest number possible for each die.',
      ],
      ['This glowing purple liquid smells of sugar and plum, but it has a muddy taste.'],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  potion_of_possibility: {
    name: 'Potion of Possibility',
    category: 'Potion',
    rarity: 'very rare',
    text: [
      [
        'When you drink this clear potion, you gain two Fragments of Possibility, each of which looks like a Tiny, grayish bead of energy that follows you around, staying within 1 foot of you at all times. Each fragment lasts for 8 hours or until used.',
      ],
      [
        'When you make an attack roll, an ability check, or a saving throw, you can expend your fragment to roll an additional d20 and choose which of the d20s to use. Alternatively, when an attack roll is made against you, you can expend your fragment to roll a d20 and choose which of the d20s to use, the one you rolled or the one the attacker rolled.',
      ],
      [
        'If the original d20 roll has advantage or disadvantage, you roll your d20 after advantage or disadvantage has been applied to the original roll.',
      ],
      [
        "While you have one or more Fragments of Possibility from this potion, you can't gain another Fragment of Possibility from any source.",
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  reincarnation_dust: {
    name: 'Reincarnation Dust',
    category: 'Wondrous Item',
    rarity: 'very rare',
    text: [
      [
        'When this small pouch of purple dust is sprinkled on a dead humanoid or a piece of a dead humanoid, the dust is absorbed by the remains. If willing, the dead creature returns to life with a new body as if the reincarnate spell had been cast on the remains.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  ring_of_obscuring: {
    name: 'Ring of Obscuring',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'This band of iron resembles a skull and is cold to the touch. It has 3 charges and regains 1d3 expended charges daily at dawn. As an action while wearing the ring, you can expend 1 of its charges to cast the fog cloud spell from it, with the following changes: the cloud is centered on you when it first appears, and the spell lasts for 1 minute (no concentration required).',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  ring_of_temporal_salvation: {
    name: 'Ring of Temporal Salvation',
    category: 'Ring',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'If you die while wearing this gray crystal ring, you vanish and reappear in an unoccupied space within 5 feet of the space you left (or the nearest unoccupied space). You have a number of hit points equal to 3d6 + your Constitution modifier. If your hit point maximum is lower than the number of hit points you regain, your hit point maximum rises to a similar amount. If you have any levels of ',
        rules.exhaustion,
        ', reduce your level of ',
        rules.exhaustion,
        ' by 1. Once the ring is used, it turns to dust and is destroyed.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  rod_of_retribution: {
    name: 'Rod of Retribution',
    category: 'Rod',
    rarity: 'uncommon',
    attunement: true,
    text: [
      ['Weight · 2 lb'],
      [
        'This adamantine rod is tipped with a glowing crystalline eye. The rod has 3 charges and regains all its expended charges daily at dawn.',
      ],
      [
        "When a creature you can see within 60 feet of you damages you while you are holding this rod, you can use your reaction to expend 1 of the rod's charges to force the creature to make a DC 13 Dexterity saving throw. The creature takes 2d10 lightning damage on a failed save, or half as much damage on a successful one.",
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  ruins_wake_dormant: {
    name: "Ruin's Wake (Dormant)",
    category: 'Weapon',
    detail: 'Spear',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 3 lb'],
      [
        'This spear is made from the ivory bone of an ancient gold dragon and carved with an Orc hymn to Gruumsh.',
      ],
      [
        "Sentience. Ruin's Wake is a sentient chaotic evil weapon with an Intelligence of 20, a Wisdom of 16, and a Charisma of 22. It has hearing and darkvision out to a range of 120 feet.",
      ],
      [
        'The weapon communicates telepathically with its wielder and can speak, read, and understand Abyssal, Common, and Orc.',
      ],
      [
        "Personality. A slaughter-loving balor named Yarrowish lives within Ruin's Wake. The weapon desires only to draw blood and pushes its wielder to solve problems with violence.",
      ],
      ['Dormant. The spear grants the following benefits in its dormant state:'],
      ['You can speak, read, and write Abyssal and Orc.'],
      [
        'You gain a +1 bonus to attack and damage rolls made with this magic weapon, and it deals an extra 1d8 piercing damage to any target it hits. Immediately after you make a ranged attack with this weapon, it flies back to your hand.',
      ],
      [
        "As a reaction when you are hit by a melee attack, you can make a melee attack with Ruin's Wake with advantage against the attacker. You can't use this property again until you finish a short or long rest.",
      ],
      [
        'Betrayer Artifact Properties. The Arms of the Betrayers advance in power in the same manner as the Vestiges of Divergence. In its dormant state, each of these artifacts has one minor beneficial property and one minor detrimental property. When the artifact attains an awakened state, it gains an additional minor beneficial property and an additional minor detrimental property. When the item reaches its exalted state, it gains a major beneficial property. See "Artifact Properties" in chapter 7 of the Dungeon Master\'s Guide for more information.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  silken_spite_dormant: {
    name: 'Silken Spite (Dormant)',
    category: 'Weapon',
    detail: 'Rapier',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 2 lb'],
      [
        'The blade of this rapier is made of spider silk. Its onyx pommel is tipped with a ruby cut in the shape of a spider, and the blade carries the blessing of Lolth.',
      ],
      [
        'Sentience. Silken Spite is a sentient chaotic evil weapon with an Intelligence of 13, a Wisdom of 15, and a Charisma of 15. It has hearing and darkvision out to a range of 120 feet.',
      ],
      [
        'The weapon communicates telepathically with its wielder and can speak, read, and understand Abyssal, Common, Elvish, and Undercommon.',
      ],
      [
        'Personality. A murderous yochlol named Sinnafex lives within Silken Spite. The weapon speaks in whispers, pushing its wielder to trust no one and to kill those who cause the slightest personal offense.',
      ],
      ['Dormant. The rapier grants the following benefits in its dormant state:'],
      ['You can speak, read, and write Abyssal, Elvish, and Undercommon.'],
      [
        'You have darkvision out to a range of 60 feet. If you already have darkvision, being attuned to the rapier increases the range of your darkvision by 60 feet.',
      ],
      ['You gain a +1 bonus to attack and damage rolls made with this magic weapon.'],
      [
        "You can use an action to cause poison to coat the rapier's blade. The poison remains for 1 minute or until an attack using this weapon hits a creature. That creature must succeed on a DC 13 Constitution saving throw or become ",
        rules.poisoned,
        ' for 1 hour. If the saving throw fails by 5 or more, the creature is also ',
        rules.unconscious,
        ' while ',
        rules.poisoned,
        ' in this way. The creature wakes up if it takes damage or if another creature uses its action to shake the creature awake.',
      ],
      [
        "While carrying the rapier, you can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free. You have a climbing speed equal to your walking speed. Additionally, you can't be caught in webs of any sort and can move through webs as if they were difficult terrain.",
      ],
      [
        'Betrayer Artifact Properties. The Arms of the Betrayers advance in power in the same manner as the Vestiges of Divergence. In its dormant state, each of these artifacts has one minor beneficial property and one minor detrimental property. When the artifact attains an awakened state, it gains an additional minor beneficial property and an additional minor detrimental property. When the item reaches its exalted state, it gains a major beneficial property. See "Artifact Properties" in chapter 7 of the Dungeon Master\'s Guide for more information.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  spell_bottle: {
    name: 'Spell Bottle',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'This glass bottle can store one spell of up to 5th level at a time. When found, roll a d6 and subtract 1; the total determines the level of spell in the bottle (the DM chooses the spell, and 0 means the bottle is empty). A swirling blue vapor fills the bottle while it contains a spell.',
      ],
      [
        'When the bottle is empty, any creature can cast a spell of 1st through 5th level into it by touching it while casting. The spell has no effect other than to be stored in the bottle.',
      ],
      [
        'While holding the bottle, you can cast the spell stored in it. The spell uses the slot level, spell save DC, spell attack bonus, and spellcasting ability of the original caster, but is otherwise treated as if you cast the spell. The bottle becomes empty once the spell is cast.',
      ],
      [
        "If you're holding the empty bottle when you see a creature casting a spell within 60 feet of you, you can open the bottle as a reaction in an attempt to interrupt the spell. If the creature is casting a spell of 3rd level or lower, the spell has no effect, and it is stored in the bottle. If it is casting a spell of 4th level or higher, make an Intelligence check. The DC equals 10 + the spell's level. On a success, the spell has no effect, and it is stored in the bottle.",
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  staff_of_dunamancy: {
    name: 'Staff of Dunamancy',
    category: 'Staff',
    rarity: 'very rare',
    attunement: 'by a wizard',
    text: [
      ['Weight · 4 lb'],
      [
        'This staff of polished gray wood bears numerous runes carved along its length. The staff has 10 charges and regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff turns into dust and is destroyed.',
      ],
      [
        "While holding the staff, you can use an action to expend 2 or more of its charges to cast one of the following spells from it, using your spell save DC and spell attack bonus: fortune's favor (2 charges), pulse wave (3 charges), or gravity sinkhole (4 charges).",
      ],
      [
        "New Possibility. If you are holding the staff and fail a saving throw against a spell that targets only you, you can turn your failed save into a successful one. This property can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  staff_of_the_ivory_claw: {
    name: 'Staff of the Ivory Claw',
    category: 'Staff',
    rarity: 'rare',
    attunement: 'by a spellcaster',
    text: [
      ['Weight · 4 lb'],
      [
        'This gray-and-cerulean staff is topped with a small dragon claw carved from ivory. While holding the staff, you gain a +1 bonus to spell attack rolls. Whenever you score a critical hit with a spell attack, the target takes an extra 3d6 radiant damage.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  stormgirdle_dormant: {
    name: 'Stormgirdle (Dormant)',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        "A Stormgirdle is a wide belt made of thick leather branded with the symbol of Kord. The girdle's clasps are made from dragon ivory.",
      ],
      [
        "Dormant. While wearing the Stormgirdle in its dormant state, you have resistance to lightning damage and thunder damage, and your Strength score becomes 21 if it isn't already 21 or higher. In addition, you can use an action to become a Storm Avatar for 1 minute, gaining the following benefits for the duration:",
      ],
      ['You have immunity to lightning damage and thunder damage.'],
      [
        'When you hit with a weapon attack that normally deals bludgeoning damage, it deals thunder damage instead. When you hit with a weapon attack that normally deals piercing or slashing damage, it deals lightning damage instead.',
      ],
      [
        'As a bonus action, you can choose one creature you can see within 30 feet of you to be struck by lightning. The target must make a DC 15 Dexterity saving throw, taking 3d6 lightning damage on a failed save, or half as much damage on a successful one.',
      ],
      [
        "Once you use the girdle's Storm Avatar property, that property can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  the_bloody_end_dormant: {
    name: 'The Bloody End (Dormant)',
    category: 'Weapon',
    detail: 'Morningstar',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      [
        'Carrying the power of Bane, this adamantine morningstar sports foot-long spikes and has a jagged blade on its pommel.',
      ],
      [
        'Sentience. The Bloody End is a sentient lawful evil weapon with an Intelligence of 22, a Wisdom of 18, and a Charisma of 24. It has hearing and darkvision out to a range of 120 feet.',
      ],
      [
        'The weapon communicates telepathically with its wielder and can speak, read, and understand Common and Infernal.',
      ],
      [
        "Personality. A tyrannical pit fiend named Izeelzee lives within The Bloody End. The weapon boisterously pushes its wielder to subjugate others and to never back down from a challenge. If the wielder doesn't demand fealty from others, the weapon is happy to demand it on their behalf.",
      ],
      ['Dormant. The morningstar grants the following benefits in its dormant state:'],
      ['You can speak, read, and write Infernal.'],
      ['You gain a +1 bonus to attack and damage rolls made with this magic weapon.'],
      [
        "While holding the morningstar, you can use an action to cast one of the following spells from it (save DC 13): charm person, dominate person, or fear. Once a spell has been cast using the morningstar, that spell can't be cast from it again until the next dawn.",
      ],
      ['While holding the morningstar, you have advantage on Charisma (Intimidation) checks.'],
      [
        'Betrayer Artifact Properties. The Arms of the Betrayers advance in power in the same manner as the Vestiges of Divergence. In its dormant state, each of these artifacts has one minor beneficial property and one minor detrimental property. When the artifact attains an awakened state, it gains an additional minor beneficial property and an additional minor detrimental property. When the item reaches its exalted state, it gains a major beneficial property. See "Artifact Properties" in chapter 7 of the Dungeon Master\'s Guide for more information.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  verminshroud_dormant: {
    name: 'Verminshroud (Dormant)',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'This patchy cloak was pieced together from the pelts of rats found feasting on the dead in Blightshore and is dotted with the bloated corpses of magically preserved insects along its seams.',
      ],
      [
        'Dormant. While wearing the Verminshroud in its dormant state, you gain the following benefits:',
      ],
      [
        'You have advantage on Wisdom (Perception) checks that rely on smell, you are immune to disease, and you have darkvision out to a range of 60 feet. If you already have darkvision, wearing the cloak increases the range of your darkvision by 60 feet.',
      ],
      [
        "As an action, you can use the Verminshroud to cast polymorph on yourself, transforming into a giant rat or rat while retaining your Intelligence, Wisdom, and Charisma scores, as well as the properties of the cloak. This property can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  vox_seeker: {
    name: 'Vox Seeker',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This clockwork device resembles a metal crab the size of a dinner plate. Every action used to wind up the device allows it to operate for 1 minute, to a maximum of 10 minutes. While operational, the item uses the accompanying Vox Seeker stat block. This automaton is under the DM's control. A vox seeker reduced to 0 hit points is destroyed.",
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  will_of_the_talon_dormant: {
    name: 'Will of the Talon (Dormant)',
    category: 'Weapon',
    detail: 'War Pick',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 2 lb'],
      [
        'Black, blue, green, red, and white gems carved in the form of dragon heads cover this ostentatious gold war pick, marking it as a weapon channeling the power of Tiamat.',
      ],
      [
        'Sentience. Will of the Talon is a sentient lawful evil weapon with an Intelligence of 14, a Wisdom of 15, and a Charisma of 19. It has hearing and darkvision out to a range of 120 feet.',
      ],
      [
        'The weapon communicates telepathically with its wielder and can speak, read, and understand Common, Draconic, and Infernal.',
      ],
      [
        'Personality. A short-tempered bone devil named Ashtyrlon lives within Will of the Talon. The weapon is greedy and values strong leadership. It demands that its wielder take decisive action to keep order in high-pressure situations—and to always take a fair share of treasure in return.',
      ],
      ['Dormant. The war pick grants the following benefits in its dormant state:'],
      ['You can speak, read, and write Draconic and Infernal.'],
      ['You gain a +1 bonus to attack and damage rolls made with this magic weapon.'],
      [
        'As a bonus action while holding the war pick, you can cause the following effect: each creature of your choice that is within 30 feet of you and is aware of you must succeed on a DC 13 Wisdom saving throw or become ',
        rules.frightened,
        " of you for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to your Frightful Presence for the next 24 hours. This property can't be used again until the next dawn.",
      ],
      [
        'While holding the war pick, you can use your action to exhale destructive energy. Pick a damage type from the Will of the Talon Breath Weapons table. Each creature in the area of the exhalation must make a DC 13 saving throw, the type of which is specified in the table. A creature takes 3d6 damage on a failed save, or half as much damage on a successful one.',
      ],
      [
        "When you use the war pick to unleash a breath weapon of a specific damage type, you can't choose that same damage type again until the next dawn.",
      ],
      ['Table: Will of the Talon Breath Weapons'],
      ['Damage Type · Area · Saving Throw'],
      ['Acid · 5 ft. wide, 30 ft. long line · Dexterity'],
      ['Cold · 15 ft. cone · Constitution'],
      ['Fire · 15 ft. cone · Dexterity'],
      ['Lightning · 5 ft. wide, 30 ft. long line · Dexterity'],
      ['Poison · 15 ft. cone · Constitution'],
      [
        'Betrayer Artifact Properties. The Arms of the Betrayers advance in power in the same manner as the Vestiges of Divergence. In its dormant state, each of these artifacts has one minor beneficial property and one minor detrimental property. When the artifact attains an awakened state, it gains an additional minor beneficial property and an additional minor detrimental property. When the item reaches its exalted state, it gains a major beneficial property. See "Artifact Properties" in chapter 7 of the Dungeon Master\'s Guide for more information.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
  wreath_of_the_prism_dormant: {
    name: 'Wreath of the Prism (Dormant)',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'This loop of golden thorns is inset with dozens of gems representing the five colors of Tiamat.',
      ],
      [
        'Dormant. While wearing the wreath in its dormant state, you have darkvision out to a range of 60 feet. If you already have darkvision, wearing the wreath increases the range of your darkvision by 60 feet.',
      ],
      [
        "When you hit a beast, dragon, or monstrosity of challenge rating 5 or lower with an attack, or when you grapple it, you can use the wreath to cast dominate monster on the creature (save DC 13). On a successful save, the target is immune to the power of the wreath for 24 hours. On a failure, a shimmering, golden image of the wreath appears as a collar around the target's neck or as a crown on its head (your choice) until it is no longer ",
        rules.charmed,
        ' by the spell. If you use the wreath to charm a second creature, the first spell immediately ends. When the spell ends, the target knows it was ',
        rules.charmed,
        ' by you.',
      ],
    ],
    publication: refs.publications.explorer_s_guide_to_wildemount,
  },
})
