import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  arcane_propulsion_arm: {
    name: 'Arcane Propulsion Arm',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: 'by a creature missing a hand or an arm',
    text: [
      [
        "This prosthetic appendage was developed by artificers of House Cannith. To attune to this item, you must attach it to your arm at the wrist, elbow, or shoulder, at which point the prosthetic magically forms a copy of the appendage it's replacing.",
      ],
      ['While attached, the prosthetic provides these benefits:'],
      ['The prosthetic is a fully capable part of your body.'],
      [
        "You can take an action to remove the prosthetic, and it removes itself if your attunement to it ends. It can't be removed against your will.",
      ],
      [
        "The prosthetic is a magic melee weapon with which you're proficient. It deals 1d8 force damage on a hit and has the thrown property, with a normal range of 20 feet and a long range of 60 feet. When thrown, the prosthetic detaches and flies at the target of the attack, then immediately returns to you and reattaches.",
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  belashyrras_beholder_crown: {
    name: "Belashyrra's Beholder Crown",
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        "This symbiotic crown is carved from dark purple and mauve stone, with ten points like stalks set with gemstones resembling the eyestalks of a beholder. To attune to this item, you must wear it on your head for the entire attunement period, during which the crown's hidden tendrils burrow into your scalp to bond with your skull.",
      ],
      [
        'While wearing the crown, you can see normally in darkness, both magical and nonmagical, to a distance of 120 feet.',
      ],
      [
        'Spells. The crown has 10 charges. While wearing it, you can use an action to expend some of its charges to cast one of the following spells from it (spell save DC 16): charm person (1 charge), disintegrate (6 charges), fear (3 charges), finger of death (7 charges), flesh to stone (6 charges), hold person (2 charges), ray of enfeeblement (2 charges), sleep (1 charge), slow (3 charges), telekinesis (5 charges).',
      ],
      ['The crown regains 1d6 + 3 expended charges daily at dawn.'],
      [
        "Symbiotic Nature. The crown can't be removed from you while you're attuned to it, and you can't voluntarily end your attunement to it. If you're targeted by a spell that ends a curse, your attunement to the crown ends, and it detaches from you.",
      ],
      [
        'The daelkyr Belashyrra made these crowns. While on the same plane of existence as the crown, Belashyrra can see through its eyestalks.',
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  cleansing_stone: {
    name: 'Cleansing Stone',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'A cleansing stone is a sphere 1 foot in diameter, engraved with mystic sigils. When touching the stone, you can use an action to activate it and remove dirt and grime from your garments and your person.',
      ],
      [
        'Such stones are often embedded in pedestals in public squares in Aundair or in high-end Ghallanda inns.',
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  common_glamerweave: {
    name: 'Common Glamerweave',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'Glamerweave is clothing imbued with harmless illusory magic. While wearing the common version of these clothes, you can use a bonus action to create a moving illusory pattern within the cloth.',
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  docent: {
    name: 'Docent',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a warforged',
    text: [
      [
        'A docent is a small metal sphere, about 2 inches across, studded with dragonshards. To attune to a docent, you must embed the item somewhere on your body, such as your chest or your eye socket.',
      ],
      [
        'Sentience. A docent is a sentient item of any alignment with an Intelligence of 16, a Wisdom of 14, and a Charisma of 14. It perceives the world through your senses. It communicates telepathically with you and can speak, read, and understand any language it knows (see "Random Properties" below).',
      ],
      [
        'Life Support. Whenever you end your turn with 0 hit points, the docent can make a Wisdom (Medicine) check with a +6 bonus. If this check succeeds, the docent stabilizes you.',
      ],
      ['Random Properties. A docent has the following properties:'],
      [
        'Languages. The docent knows Common, Giant, and 1d4 additional languages chosen by the DM. If a docent knows fewer than six languages, it can learn a new language after it hears or reads the language through your senses.',
      ],
      [
        'Skills. The docent has a +7 bonus to one of the following skills (roll a d4): (1) Arcana, (2) History, (3) Investigation, or (4) Nature.',
      ],
      [
        'Spells. The docent knows one of the following spells and can cast it at will, requiring no components (roll a d6): (1–2) detect evil and good or (3–6) detect magic. The docent decides when to cast the spell.',
      ],
      [
        "Personality. A docent is designed to advise and assist the warforged it's attached to. One of the simple functions of a docent is to serve as a translator. The docent's properties are under its control, and if you have a bad relationship with your docent, it might refuse to assist you.",
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  dyrrns_tentacle_whip: {
    name: "Dyrrn's Tentacle Whip",
    category: 'Weapon',
    detail: 'Whip',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 3 lb'],
      [
        'This long, whip-like strand of tough muscle bears a sharp stinger at one end. To attune to this symbiotic weapon, you wrap the whip around your wrist for the entire attunement period, during which time the whip painfully embeds its tendrils into your arm.',
      ],
      [
        'You gain a +2 bonus to attack and damage rolls made with this magic whip, but attack rolls made against aberrations with this weapon have disadvantage. A creature hit by this weapon takes an extra 1d6 psychic damage. When you roll a 20 on the d20 for an attack roll with this weapon, the target is ',
        rules.stunned,
        ' until the end of its next turn.',
      ],
      [
        'As a bonus action, you can sheathe the whip by causing it to retract into your arm, or draw the whip out of your arm again.',
      ],
      [
        "Symbiotic Nature. The whip can't be removed from you while you're attuned to it, and you can't voluntarily end your attunement to it. If you're targeted by a spell that ends a curse, your attunement to the whip ends, and it detaches from you.",
      ],
    ],
    effects: [
      {
        key: 'stunned',
        name: 'Stunned',
        lands: { on: 'hit' },
        conditions: [rules.stunned],
        text: [
          'When you roll a 20 on the d20 for an attack roll with this weapon, the target is ',
          rules.stunned,
          ' until the end of its next turn.',
        ],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  earworm: {
    name: 'Earworm',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'To attune to this symbiont, you must hold it against the skin behind your ear for the entire attunement period, whereupon it burrows into your head and bonds to your skull. While the earworm is inside you, you can speak, read, and write Deep Speech.',
      ],
      [
        'Spells. The earworm has 4 charges. You can cast the following spells from it, expending the necessary number of charges (spell save DC 15): detect thoughts (2 charges) or dissonant whispers (1 charge). Each time you use the earworm to cast the detect thoughts spell, it sends the information gleaned to the nearest daelkyr, or to the next nearest earworm until it reaches a daelkyr.',
      ],
      ['The earworm regains 1d4 expended charges daily at dawn.'],
      [
        "Symbiotic Nature. The earworm can't be removed from you while you're attuned to it, and you can't voluntarily end your attunement to it. If you're targeted by a spell that ends a curse, your attunement to the earworm ends, and it exits your body.",
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  everbright_lantern: {
    name: 'Everbright Lantern',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This bullseye lantern contains an Eberron dragonshard that sheds light comparable to that produced by a continual flame spell. An everbright lantern sheds light in a 120-foot cone; the closest 60 feet is bright light, and the farthest 60 feet is dim light.',
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  feather_token: {
    name: 'Feather Token',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This small metal disk is inscribed with the image of a feather. When you fall at least 20 feet while the token is on your person, you descend 60 feet per round and take no damage from falling. The token's magic is expended after you land, whereupon the disk becomes nonmagical.",
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  finders_goggles: {
    name: "Finder's Goggles",
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a creature with the Mark of Finding',
    text: [
      [
        'The lenses of these garish goggles are carved from Siberys dragonshards. While wearing these lenses, you gain the following benefits:',
      ],
      [
        'When you make a Wisdom (Insight) check, you can roll a d4 and add the number rolled to the check.',
      ],
      [
        "As an action, you can use the goggles to examine an object to identify the aura of the last creature that touched it. Make a Wisdom (Insight) check against a DC of 13 + the number of days since the last contact occurred. On a success, you learn the creature's type and can immediately use the goggles to cast locate creature to find that creature. This property can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  keycharm: {
    name: 'Keycharm',
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: 'by a creature with the Mark of Warding',
    text: [
      [
        "This small stylized key plays a vital role in the work of House Kundarak. If you cast the alarm, arcane lock, or glyph of warding spell, you can tie the effect to the keycharm so that whoever holds it receives the notification from the alarm spell, bypasses the lock of the arcane lock spell, or avoids triggering the glyph placed by the glyph of warding spell. In addition, the holder (who needn't be attuned to the item) can take an action to end any one spell tied to it, provided the holder knows the command word you set for ending the tied spells. The keycharm can have up to three tied spells at one time.",
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  kyrzins_ooze: {
    name: "Kyrzin's Ooze",
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      [
        "This opalescent, symbiotic goo comes sealed in a jar and slowly shifts and moves, as if endlessly exploring the jar's interior. To attune to this item, you must first drink the contents of the jar, unlocking the following properties.",
      ],
      [
        "Resistant. While attuned to Kyrzin's ooze, you have resistance to poison and acid damage, and you're immune to the ",
        rules.poisoned,
        ' condition.',
      ],
      [
        "Amorphous. As an action, you can speak a command word and cause your body to assume the amorphous qualities of an ooze. For the next minute, you (along with any equipment you're wearing or carrying) can move through a space as narrow as 1 inch wide without squeezing. Once you use this property, it can't be used again until the next dawn.",
      ],
      [
        "Acid Breath. As an action, you can exhale acid in a 30-foot line that is 5 feet wide. Each creature in that line must make a DC 15 Dexterity saving throw, taking 36 (8d8) acid damage on a failed save, or half as much damage on a successful one. Once you use this property, it can't be used again until the next dawn.",
      ],
      [
        "Symbiotic Nature. The ooze can't be removed from you while you're attuned to it, and you can't voluntarily end your attunement to it. If you're targeted by a spell that ends a curse, your attunement to the ooze ends, as it seeps out of you.",
      ],
      [
        'If you die while the ooze is inside you, it bursts out and engulfs you, turning your corpse into a black pudding allied with the daelkyr.',
      ],
    ],
    effects: [
      {
        key: 'amorphous',
        name: 'Amorphous',
        lands: { on: 'use' },
        text: [
          "you (along with any equipment you're wearing or carrying) can move through a space as narrow as 1 inch wide without squeezing.",
        ],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  living_gloves: {
    name: 'Living Gloves',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'These symbiotic gloves—made of thin chitin and sinew—pulse with a life of their own. To attune to them, you must wear them for the entire attunement period, during which the gloves bond with your skin.',
      ],
      [
        'While attuned to these gloves, you gain one of the following proficiencies (your choice when you attune to the gloves):',
      ],
      ['Sleight of Hand'],
      ["Thieves' tools"],
      ["One kind of artisan's tools of your choice"],
      ['One kind of musical instrument of your choice'],
      [
        'When you make an ability check using the chosen proficiency, you add double your proficiency bonus to the check, instead of your normal proficiency bonus.',
      ],
      [
        "Symbiotic Nature. The gloves can't be removed from you while you're attuned to them, and you can't voluntarily end your attunement to them. If you're targeted by a spell that ends a curse, your attunement to the gloves ends, and they can be removed.",
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  scribes_pen: {
    name: "Scribe's Pen",
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: 'by a creature with the Mark of Scribing',
    text: [
      [
        'You can use this pen to write on any surface. You decide whether the writing is visible or ',
        rules.invisible,
        ', but the writing is always visible to a person with the Mark of Scribing.',
      ],
      [
        'Any creature with the Mark of Scribing can use an action to touch the ',
        rules.invisible,
        ' writing, making it visible to all.',
      ],
      [
        "If you use the pen to write on a creature that isn't a construct, the writing fades after 7 days.",
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  shiftweave: {
    name: 'Shiftweave',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "When a suit of shiftweave is created, up to five different outfits can be embedded into the cloth. While wearing the clothing, you can speak its command word as a bonus action to transform your outfit into your choice of one of the other designs contained within it. Regardless of its appearance, the outfit can't be anything but clothing. Although it can duplicate the look of other magical clothing, it doesn't gain their magical properties.",
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  speaking_stone: {
    name: 'Speaking Stone',
    category: 'Wondrous Item',
    rarity: 'very rare',
    text: [
      [
        "The key to long-distance, virtually instantaneous communication across Khorvaire is House Sivis's network of message stations. Each station contains at least one speaking stone, which is carved from a Siberys dragonshard and inscribed with arcane symbols that uniquely identify it. If you're a gnome with the Mark of Scribing, you can touch the stone and use an action to cast the sending spell from it. The target is any other speaking stone whose location or unique sequence of symbols you know. A creature within 5 feet of the stone hears the message as if they were the target.",
      ],
      [
        'In a Sivis message station, a gnome is always on duty by the speaking stone, listening for messages that might come in and transcribing them for delivery to their intended recipients.',
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  spellshard: {
    name: 'Spellshard',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This polished Eberron dragonshard fits in the hand and stores information similar to a book. The shard can hold the equivalent of one book that's no more than 320 pages long. A shard can be created blank or already filled with information. When the shard is created, the creator can set a passphrase that must be spoken to access the information stored within.",
      ],
      [
        'While holding the shard, you can use an action to open your mind to the shard, seeing its content in your mind. On subsequent rounds, reading the text or scribing new text on blank "pages" in the shard requires concentration (as if concentrating on a spell) and takes the same amount of time it takes you to read and write normally. Thinking of a particular phrase or topic draws you to the first section in the shard that addresses it.',
      ],
      [
        'A wizard can use a spellshard as a spellbook, with the usual cost in gold and time to "scribe" a spell into the shard.',
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  uncommon_glamerweave: {
    name: 'Uncommon Glamerweave',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        'Glamerweave is clothing imbued with harmless illusory magic. While wearing these clothes, you can use a bonus action to create a moving illusory pattern within the cloth. Alternatively, you can have the pattern rise from the cloth. For example, a glamerweave gown might be wreathed in harmless, illusory flames, while a glamerweave hat might have illusory butterflies fluttering around it.',
      ],
      [
        "When you make a Charisma (Performance) or Charisma (Persuasion) check while wearing the glamerweave, you can roll a d4 and add the number rolled to the check. Once you use this property, it can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  ventilating_lungs: {
    name: 'Ventilating Lungs',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        "These metallic nodules were created in response to the poisonous gases used on the battlefields of the Last War. When you attune to these lungs, they replace the lungs in your chest, which disappear. The lungs allow you to breathe normally, even in an antimagic field, and their breathing function can't be suppressed by magic.",
      ],
      [
        'Outside an antimagic field or any other effect that suppresses magic, these lungs allow you to breathe normally in any environment (including a vacuum), and you have advantage on saving throws against harmful gases such as those created by a cloudkill spell, a stinking cloud spell, inhaled poisons, and gaseous breath weapons.',
      ],
      [
        "As an action, you can use these lungs to exhale a gust of wind, as if you had cast the gust of wind spell (spell save DC 15) with no components. This property of the lungs can't be used again until the next dawn.",
      ],
      ['If your attunement to the lungs ends, your original lungs reappear.'],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  wand_sheath: {
    name: 'Wand Sheath',
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: 'by a warforged',
    text: [
      ['A wand sheath clamps onto your arm and imparts the following benefits:'],
      ["The wand sheath can't be removed from you while you're attuned to it."],
      [
        'You can insert a wand into the sheath as an action. The sheath can hold only one wand at a time.',
      ],
      [
        'You can retract or extend a wand from the sheath as a bonus action. While the wand is extended, you can use it as if you were holding it, but your hand remains free.',
      ],
      [
        'If a sheathed wand requires attunement, you must attune to the wand before you can use it. However, the wand sheath and the attached wand count as a single magic item with regard to the number of magic items you can attune to. If you remove the wand from the sheath, your attunement to the wand ends.',
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
  wheel_of_wind_and_water: {
    name: 'Wheel of Wind and Water',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        'When mounted at the helm of an elemental galleon or airship, this wheel allows a creature that possesses the Mark of Storm to telepathically control the elemental bound inside the vessel.',
      ],
      [
        'If a wheel of wind and water is mounted on a mundane sailing ship, a creature with the Mark of Storm who is using the wheel can create an area of ideal conditions around the vessel, increasing its speed by 5 miles per hour.',
      ],
    ],
    publication: refs.publications.eberron_rising_from_the_last_war,
  },
})
