import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  amulet_of_the_black_skull: {
    name: 'Amulet of the Black Skull',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 1 lb'],
      [
        'This amulet is carved from obsidian and shaped like a screaming humanoid skull, with ruby eyes and emeralds for teeth. It hangs from an iron chain necklace.',
      ],
      [
        "The amulet has 6 charges and regains 1d6 charges daily at dawn. While wearing the amulet, you can use an action to expend 1 of its charges to transport yourself and anything you are wearing or carrying to a location within 100 feet of you. The destination you choose doesn't need to be in your line of sight, but it must be familiar to you (in other words, a place you have seen or visited), and it must be on the same plane of existence as you. This effect isn't subject to the magic restrictions placed on the Tomb of the Nine Gods; thus, the amulet can be used to enter and exit the tomb.",
      ],
      [
        "If you aren't undead, you must make a DC 16 Constitution saving throw each time you use the amulet to teleport. On a failed saving throw, the black skull cackles as you are transformed in transit. The transformation takes effect as soon as you arrive at the destination, and is determined randomly by rolling percentile dice and consulting the Black Skull Transformation table.",
      ],
      ['Table: Black Skull Transformation'],
      ['d100 · Transformation'],
      [
        "01-20 · The symbol of Acererak is burned into your flesh, a curse that can only be removed with a remove curse spell or similar magic. Until the curse ends, your hit points can't be restored by magic.",
      ],
      [
        '21-35 · You grow larger as if affected by an enlarge/reduce spell, except the effect lasts for 1 hour.',
      ],
      [
        '36-50 · You grow smaller as if affected by an enlarge/reduce spell, except the effect lasts for 1 hour.',
      ],
      [
        '51-70 · You arrive at the destination wearing nothing but the amulet of the black skull. Everything else that you were wearing or carrying appears in a random unoccupied space within 100 feet of you.',
      ],
      [
        '71-95 · You are ',
        rules.paralyzed,
        ' for 1 minute or until this effect is ended with a lesser restoration spell or similar magic.',
      ],
      [
        '96-00 · You become ',
        rules.petrified,
        '. This effect can be ended only with a greater restoration spell or similar magic.',
      ],
    ],
    effects: [
      {
        key: 'mark-of-acererak',
        name: 'Symbol of Acererak',
        lands: { on: 'failed-save', save: 'con', dc: 16 },
        text: [
          "The symbol of Acererak is burned into your flesh, a curse that can only be removed with a remove curse spell or similar magic. Until the curse ends, your hit points can't be restored by magic.",
        ],
        lasts: { kind: 'until-removed' },
        ends: { cure: ['can only be removed with a remove curse spell or similar magic'] },
      },
      {
        key: 'enlarged',
        name: 'Enlarged',
        lands: { on: 'failed-save', save: 'con', dc: 16 },
        text: [
          'You grow larger as if affected by an enlarge/reduce spell, except the effect lasts for 1 hour.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
      {
        key: 'reduced',
        name: 'Reduced',
        lands: { on: 'failed-save', save: 'con', dc: 16 },
        text: [
          'You grow smaller as if affected by an enlarge/reduce spell, except the effect lasts for 1 hour.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
      {
        key: 'paralyzed',
        name: 'Paralyzed',
        lands: { on: 'failed-save', save: 'con', dc: 16 },
        conditions: [rules.paralyzed],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
        ends: { cure: ['this effect is ended with a lesser restoration spell or similar magic.'] },
      },
      {
        key: 'petrified',
        name: 'Petrified',
        lands: { on: 'failed-save', save: 'con', dc: 16 },
        conditions: [rules.petrified],
        lasts: { kind: 'until-removed' },
        ends: {
          cure: [
            'This effect can be ended only with a greater restoration spell or similar magic.',
          ],
        },
      },
    ],
    publication: refs.publications.tomb_of_annihilation,
  },
  arcanaloths_music_box: {
    name: "Arcanaloth's Music Box",
    category: 'Wondrous Item',
    rarity: 'unknown',
    text: [
      [
        'This music box is made of dark wood with gold filigree. Each of its five sides is sculpted with the image of a horned woman playing a different musical instrument: a dulcimer, a flute, a harp, a lyre, and a viol. While touching the box, you can use an action to make it play music featuring one of the instruments shown, which can be heard up to 60 feet away. You can also use an action to stop the music.',
      ],
    ],
    publication: refs.publications.tomb_of_annihilation,
  },
  bob: {
    name: 'Bob',
    category: 'Weapon',
    detail: 'Battleaxe',
    rarity: 'unknown',
    text: [
      ['Weight · 4 lb'],
      [
        'This +1 battleaxe floats on water and other liquids, and grants its bearer advantage on Strength (Athletics) checks made to swim.',
      ],
    ],
    publication: refs.publications.tomb_of_annihilation,
  },
  bookmark: {
    name: 'Bookmark',
    category: 'Weapon',
    detail: 'Dagger',
    rarity: 'legendary',
    attunement: true,
    text: [
      ['Weight · 1 lb'],
      [
        'This +3 dagger belongs to Artus Cimber. While you have the dagger drawn, you can use a bonus action to activate one of the following properties:',
      ],
      [
        "Cause a blue gem set into the dagger's pommel to shed bright light in a 20-foot radius and dim light for an additional 20 feet, or make the gem go dark.",
      ],
      ['Turn the dagger into a compass that, while resting on your palm, points north.'],
      [
        "Cast dimension door from the dagger. Once this property is used, it can't be used again until the next dawn.",
      ],
      [
        "Cast compulsion (save DC 15) from the dagger. The range of the spell increases to 90 feet but it targets only spiders that are beasts. Once this property is used, it can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.tomb_of_annihilation,
  },
  dancing_monkey_fruit: {
    name: 'Dancing Monkey Fruit',
    category: 'Wondrous Item',
    rarity: 'unknown',
    text: [
      [
        "This rare magical fruit produces enough juice to fill a vial. Any humanoid that eats a dancing monkey fruit or drinks its juice must succeed on a DC 14 Constitution saving throw or begin a comic dance that lasts for 1 minute. Humanoids that can't be ",
        rules.poisoned,
        ' are immune to this magical effect.',
      ],
      [
        'The dancer must use all its movement to dance without leaving its space and has disadvantage on attack rolls and Dexterity saving throws, and other creatures have advantage on attack rolls against it. Each time it takes damage, the dancer can repeat the saving throw, ending the effect on itself on a success. When the dancing effect ends, the humanoid suffers the ',
        rules.poisoned,
        ' condition for 1 hour.',
      ],
    ],
    effects: [
      {
        key: 'comic-dance',
        name: 'Comic dance',
        lands: { on: 'failed-save', save: 'con', dc: 14 },
        text: [
          'The dancer must use all its movement to dance without leaving its space and has disadvantage on attack rolls and Dexterity saving throws, and other creatures have advantage on attack rolls against it.',
          ' When the dancing effect ends, the humanoid suffers the ',
          rules.poisoned,
          ' condition for 1 hour.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
        ends: { repeatSave: ['damaged'] },
      },
    ],
    publication: refs.publications.tomb_of_annihilation,
  },
  draconic_longsword: {
    name: 'Draconic Longsword',
    category: 'Weapon',
    detail: 'Longsword',
    rarity: 'unknown',
    text: [
      ['Weight · 3 lb'],
      [
        'This longsword has a dragon-shaped hilt. While you carry it, you gain the ability to speak and understand the Draconic language.',
      ],
    ],
    publication: refs.publications.tomb_of_annihilation,
  },
  ghost_lantern: {
    name: 'Ghost Lantern',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 1 lb'],
      [
        'A restless spirit is trapped inside this lantern. While holding the lantern, you can command the spirit as a bonus action to shed bright light in a 30-foot radius and dim light for an additional 30 feet.',
      ],
      [
        'While holding the lantern, you can use an action to order the spirit to leave the lantern and duplicate the effect of the mage hand spell. The spirit returns to the lantern when the spell ends.',
      ],
      [
        'If you fall ',
        rules.unconscious,
        ' within 10 feet of the lantern, the spirit emerges from it, magically stabilizes you with a touch, and then quickly returns to the lantern.',
      ],
      ["The spirit is bound to the lantern and can't be harmed, turned, or raised from the dead."],
      [
        'Casting a dispel evil and good spell on the lantern releases the spirit to the afterlife and renders the lantern nonmagical.',
      ],
    ],
    publication: refs.publications.tomb_of_annihilation,
  },
  mask_of_the_beast: {
    name: 'Mask of the Beast',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      ['Weight · 1 lb'],
      [
        "This wooden mask is shaped in the likeness of a beast's visage and has 3 charges. While wearing the mask you can expend 1 charge and use the mask to cast the animal friendship spell as an action. The mask regains all expended charges at dawn.",
      ],
    ],
    publication: refs.publications.tomb_of_annihilation,
  },
  petrified_grung_egg: {
    name: 'Petrified Grung Egg',
    category: 'Wondrous Item',
    rarity: 'unknown',
    attunement: 'by a spellcaster',
    text: [
      [
        "While this egg is on your person, you can use an action to speak its command word and regain one expended spell slot. If the expended slot was of 4th level or higher, the new slot is 3rd level. Once you have used the egg, it can't be used again until the next dawn.",
      ],
      ['Additionally, while you are attuned to the egg, you gain resistance to poison damage.'],
      ['The egg turns to dust and is destroyed if it leaves the Tomb of the Nine Gods.'],
    ],
    publication: refs.publications.tomb_of_annihilation,
  },
  ring_of_winter: {
    name: 'Ring of Winter',
    category: 'Ring',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 1 lb'],
      [
        "Artus Cimber has kept this item in his possession for over a century. The Ring of Winter is a golden band that resizes to fit snugly on the finger of its wearer. A thin layer of frost coats the outside of the ring, which normal heat can't melt. The ring feels ice cold to the touch and initially numbs the hand that wears it, but this cold ceases to be felt by one who is attuned to this ring.",
      ],
      [
        'The Ring of Winter is sentient and tries to take control of any creature that wears it (see "Sentient Magic Items" chapter 7 of the Dungeon Master\'s Guide). If it succeeds, the ring compels its wearer to cause undue harm to everyone and everything around it, in a cold-hearted attempt to incur the wrath of enemies and bring the wearer\'s doom.',
      ],
      [
        'Sentience. The Ring of Winter is a sentient chaotic evil item with an Intelligence of 14, a Wisdom of 14, and a Charisma of 17. The ring communicates by transmitting emotion to the creature carrying or wielding it, and it has hearing and normal vision out to a range of 60 feet. The ring craves destruction, and it likes inflicting indiscriminate harm on others.',
      ],
      [
        'Nondetection. The Ring of Winter defies attempts to magically locate it. Neither the ring nor its wearer can be targeted by any divination magic or perceived through magical scrying sensors.',
      ],
      [
        "Frozen Time. As long as you wear the ring, you don't age naturally. This effect is similar to suspended animation, in that your age doesn't catch up to you once the ring is removed. The ring doesn't protect its wearer from magical or supernatural aging effects, such as the Horrifying Visage of a ghost.",
      ],
      [
        "Cold Immunity. While attuned to and wearing the ring, you have immunity to cold damage and don't suffer any ill effects from extreme cold (see chapter 5 of the Dungeon's Master Guide).",
      ],
      [
        'Magic. The Ring of Winter has 12 charges and regains all its expended charges daily at dawn. While wearing the ring, you can expend the necessary number of charges to activate one of the following properties:',
      ],
      [
        'You can expend 1 charge as an action and use the ring to lower the temperature in a 120-foot-radius sphere centered on a point you can see within 300 feet of you. The temperature in that area drops 20 degrees per minute, to a minimum of -30 degrees Fahrenheit. Frost and ice begin to form on surfaces once the temperature drops below 32 degrees. This effect is permanent unless you use the ring to end it as an action, at which point the temperature in the area returns to normal at a rate of 10 degrees per minute.',
      ],
      [
        "You can cast one of the following spells from the ring (spell save DC 17) by expending the necessary number of charges: Bigby's hand (2 charges; the hand is made of ice, is immune to cold damage, and deals bludgeoning damage instead of force damage as a clenched fist), cone of cold (2 charges), flesh to ice (3 charges; as flesh to stone except that the target turns to solid ice with the density and durability of stone), ice storm (2 charges), Otiluke's freezing sphere (3 charges), sleet storm (1 charge), spike growth (1 charge; the spikes are made of ice), or wall of ice (2 charges).",
      ],
      [
        "You can expend the necessary number of charges as an action and use the ring to create either an inanimate ice object (2 charges) or an animated ice creature (4 charges). The ice object can't have any moving parts, must be able to fit inside a 10-foot cube, and has the density and durability of metal or stone (your choice). The ice creature must be modeled after a beast with a challenge rating of 2 or less. The ice creature has the same statistics as the beast it models, with the following changes: the creature is a construct with vulnerability to fire damage, immunity to cold and poison damage, and immunity to the following conditions: ",
        rules.charmed,
        ', ',
        rules.exhaustion,
        ', ',
        rules.frightened,
        ', ',
        rules.paralyzed,
        ', ',
        rules.petrified,
        ', and ',
        rules.poisoned,
        ". The ice creature obeys only its creator's commands. The ice object or creature appears in an unoccupied space within 60 feet of you. It melts into a pool of normal water after 24 hours or when it drops to 0 hit points. In extreme heat, it loses 5 (1d10) hit points per minute as it melts. Use the guidelines in chapter 8 of the Dungeon Master's Guide to determine the hit points of an inanimate object if they become necessary.",
      ],
      [
        "Other Properties. The Ring of Winter is rumored to possess other properties that can be activated only by an evil being whose will the ring can't break. Frost giants have long believed that the ring can be used to freeze entire worlds, while a djinni in the service of a Calishite pasha once claimed that the ring could be used to summon and control white dragons, as well as the mighty ice primordial named Cryonax.",
      ],
      [
        'Destroying the Ring. The ring is nigh indestructible, resisting even the most intense magical heat. If it is placed on the finger of the powerful archfey known as the Summer Queen, the ring melts away and is destroyed forever.',
      ],
    ],
    publication: refs.publications.tomb_of_annihilation,
  },
  scorpion_armor: {
    name: 'Scorpion Armor',
    category: 'Armor',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 65 lb'],
      [
        'This suit of plate armor is fashioned from giant scorpion chitin. While wearing this armor, you gain the following benefits:',
      ],
      [
        "The armor improves your combat readiness, granting you a +5 bonus to initiative as long as you aren't ",
        rules.incapacitated,
        '.',
      ],
      ["The armor doesn't impose disadvantage on your Dexterity (Stealth) checks."],
      [
        "The armor doesn't impose disadvantage on saving throws made to resist the effects of extreme heat (see chapter 5 of the Dungeon Master's Guide).",
      ],
      [
        "Curse. This armor is cursed. Whenever you don or doff it, you must make a DC 15 Constitution saving throw, taking 100 (10d10 + 45) poison damage on a failed save, or half as much damage on a successful one. Only a wish spell can remove the armor's curse.",
      ],
    ],
    publication: refs.publications.tomb_of_annihilation,
  },
  shield_of_shouting: {
    name: 'Shield of Shouting',
    category: 'Shield',
    rarity: 'unknown',
    text: [
      ['Weight · 6 lb'],
      [
        "A detect magic spell reveals an aura of transmutation magic around this shield, which has a minor magical property: words spoken by the shield's bearer are amplified and sound ten times louder than normal.",
      ],
    ],
    publication: refs.publications.tomb_of_annihilation,
  },
  staff_of_the_forgotten_one: {
    name: 'Staff of the Forgotten One',
    category: 'Staff',
    rarity: 'artifact',
    attunement: 'by a sorcerer, warlock, or wizard',
    text: [
      ['Weight · 4 lb'],
      [
        "This crooked staff is carved from bone and topped with the skull of a forgotten archmage whom Acererak destroyed long ago. Etched into the skull's forehead is Acererak's rune, which is known on many worlds as a sign of death.",
      ],
      [
        'Beneficial Properties. While the staff is on your person, you gain the following benefits:',
      ],
      [
        'Your proficiency bonus to Intelligence (Arcana) and Intelligence (History) checks is doubled.',
      ],
      [
        "You can't be ",
        rules.blinded,
        ', ',
        rules.charmed,
        ', ',
        rules.deafened,
        ', ',
        rules.frightened,
        ', ',
        rules.petrified,
        ', or ',
        rules.stunned,
        '.',
      ],
      [
        'Undead with a challenge rating of 2 or lower will neither threaten nor attack you unless you harm them.',
      ],
      [
        'You can wield the staff as a +3 quarterstaff that deals an extra 10 (3d6) necrotic damage on a hit.',
      ],
      [
        "Invoke Curse. The Staff of the Forgotten One has 7 charges and regains 1d4 + 3 expended charges daily at dawn. While holding the staff, you can use an action to expend 1 charge and target one creature you can see within 60 feet of you. The target must succeed on a Constitution saving throw (using your spell save DC) or be cursed. While cursed in this way, the target can't regain hit points and has vulnerability to necrotic damage. A greater restoration, remove curse, or similar spell ends the curse on the target.",
      ],
      [
        "The Forgotten One. The bodiless life force of a dead archmage empowers the staff and is imprisoned within it. The rune carved into the staff's skull protects Acererak from this spirit's vengeance. Each time a creature other than Acererak expends any of the staff's charges, there is a 50 percent chance that the life force tries to possess the staff wielder. The wielder must succeed on a DC 20 Charisma saving throw or be possessed, becoming an NPC under the DM's control. If the intruding life force is targeted by magic such as a dispel evil and good spell, it becomes trapped in the staff once more. Once it takes control of another creature, the insane spirit of the dead archmage attempts to destroy the staff.",
      ],
      [
        "Destroying the Staff. A creature in possession of the staff can use an action to break it over one knee or a solid surface. The staff is destroyed and releases its remaining magic in an explosion that expands to fill a 30-foot-radius sphere centered on it. Each creature in the area must make a DC 18 Dexterity saving throw, taking 132 (24d10) force damage on a failed save, or half as much damage on a successful one. When the staff is destroyed, the life force of the Forgotten One is released to the afterlife. Where it goes is anyone's guess.",
      ],
    ],
    effects: [
      {
        key: 'possessed',
        name: 'Possessed',
        lands: { on: 'failed-save', save: 'cha', dc: 20 },
        text: ["be possessed, becoming an NPC under the DM's control."],
        lasts: { kind: 'until-removed' },
        ends: {
          cure: [
            'If the intruding life force is targeted by magic such as a dispel evil and good spell, it becomes trapped in the staff once more.',
          ],
        },
      },
    ],
    publication: refs.publications.tomb_of_annihilation,
  },
})
