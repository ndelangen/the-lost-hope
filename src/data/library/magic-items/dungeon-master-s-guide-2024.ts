import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  alchemy_jug_dungeon_master_s_guide_2024: {
    name: 'Alchemy Jug',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      ['Weight · 12 lb'],
      [
        'This ceramic jug appears to be able to hold a gallon of liquid and weighs 12 pounds whether full or empty. The jug sloshes when it is shaken, even if the jug is empty.',
      ],
      [
        'You can take a Magic action and name one liquid from the Alchemy Jug Liquids table to cause the jug to produce the chosen liquid. Afterward, you can uncork the jug as a Utilize action and pour that liquid out, up to 2 gallons per minute. The maximum amount of liquid the jug can produce depends on the liquid you named.',
      ],
      [
        "Once the jug starts producing a liquid, it can't produce a different one, or more of one that has reached its maximum, until the next dawn.",
      ],
      ['Table: Alchemy Jug Liquids'],
      ['Liquid · Max. Amount'],
      ['Acid · 8 ounces'],
      ['Basic Poison · 4 ounces'],
      ['Beer · 4 gallons'],
      ['Honey · 1 gallon'],
      ['Mayonnaise · 2 gallons'],
      ['Oil · 1 quart'],
      ['Vinegar · 2 gallons'],
      ['Water, fresh · 8 gallons'],
      ['Water, salt · 12 gallons'],
      ['Wine · 1 gallon'],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  axe_of_the_dwarvish_lords_dungeon_master_s_guide_2024: {
    name: 'Axe of the Dwarvish Lords',
    category: 'Weapon',
    detail: 'Battleaxe',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      [
        'A young dwarf prince set out to forge a weapon that would be regarded as a symbol of unity among his people. Venturing deep under the mountains, deeper than any dwarf had ever delved, the prince came to the blazing heart of a great volcano. With the aid of Moradin, a god of creation, he first crafted four mighty tools: the Starmetal Pick, the Earthheart Forge, the Anvil of Songs, and the Shaping Hammer. With these tools, he forged the Axe of the Dwarvish Lords.',
      ],
      [
        'Armed with the Artifact, the prince brought peace to the dwarf clans, ending grudges and answering slights. The clans became allies, and they threw back their enemies and enjoyed an era of prosperity. This young dwarf is remembered as the First King. When he became old, he passed the weapon, which had become his badge of office, to his heir. The rightful inheritors passed the axe on for many generations.',
      ],
      [
        'Later, in an era marked by treachery and wickedness, the axe was lost in a bloody civil war fomented by greed for its power and the status it bestowed. Centuries later, the dwarves still search for the axe, and many adventurers have made careers of chasing after rumors and plundering old vaults to find it.',
      ],
      [
        'Magic Weapon. The Axe of the Dwarvish Lords is a magic weapon that grants a +3 bonus to attack rolls and damage rolls made with it.',
      ],
      [
        'When you attack a creature with the axe and roll a 20 on the d20 for the attack roll, the axe deals an extra 20 Slashing damage.',
      ],
      [
        'The axe has Thrown with a normal range of 20 feet and a long range of 60 feet. When you hit with a ranged attack using this weapon, it deals an extra 1d8 Force damage, or an extra 2d8 Force damage if the target is a creature of the Giant type. Immediately after hitting or missing, the weapon flies back to your hand.',
      ],
      ['Blessings of Moradin. While attuned to the axe, you gain the following benefits:'],
      [
        'Darkvision. You gain Darkvision with a range of 60 feet. If you already have Darkvision, its range increases by 60 feet.',
      ],
      ['Fortitude of Stone. Your Constitution increases by 2, to a maximum of 20.'],
      [
        "Gifts of the Creator. You have proficiency with Brewer's Supplies, Mason's Tools, and Smith's Tools.",
      ],
      ['One with the Forge. You have Immunity to Poison damage and Resistance to Fire damage.'],
      [
        'Sunder. When you hit an object with the axe, the object takes the maximum amount of damage possible.',
      ],
      [
        "Conjure Earth Elemental. While holding the axe, you can take a Magic action to summon an Earth Elemental. It appears in an unoccupied space you choose within 30 feet of yourself, understands your languages, obeys your commands, and takes its turn immediately after you on your Initiative count. The elemental disappears after 24 hours, when it dies, or when you dismiss it as a Bonus Action. You can't use this property again until the next dawn.",
      ],
      ['Random Properties. The axe has the following random properties:'],
      ['2 minor beneficial properties'],
      ['1 major beneficial property'],
      ['2 minor detrimental properties'],
      [
        "Travel the Depths. You can take a Magic action to touch the axe to a fixed piece of dwarven stonework and cast Teleport from the axe. If your intended destination is underground, there is no chance of a mishap or arriving somewhere unexpected. You can't use this property again until 3 days have passed.",
      ],
      [
        'Destroying the Axe. The only way to destroy the axe is to melt it down in the Earthheart Forge, where it was created. It must remain in the burning forge for 50 years before it finally succumbs to the fire and is consumed.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  baba_yagas_dancing_broom: {
    name: "Baba Yaga's Dancing Broom",
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'The archfey Baba Yaga crafted many of these magic brooms. No two appear exactly alike. While holding the broom, you can take a Magic action to transform it into an Animated Broom under your control. The broom then moves into an unoccupied space as close to you as possible. The broom acts immediately after you on your Initiative count and remains animate until you take a Bonus Action and use a command word to render it inanimate.',
      ],
      [
        "On your turn, you can mentally command the animated broom if it is within 30 feet of you and you don't have the ",
        rules.incapacitated,
        ' condition (no action required). You decide what action the broom takes and where it moves during its next turn, or you can issue it a general command, such as to attack your enemies or guard a location.',
      ],
      [
        'If the broom is reduced to 0 Hit Points, it shatters and is destroyed. If the broom reverts to its inanimate form before losing all its Hit Points it regains all of them.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  bead_of_refreshment_dungeon_master_s_guide_2024: {
    name: 'Bead of Refreshment',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This flavorless, gelatinous bead dissolves in liquid, transforming up to a pint of the liquid into fresh, cold drinking water. The bead has no effect on magical liquids or harmful substances such as poison.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  blackrazor_dungeon_master_s_guide_2024: {
    name: 'Blackrazor',
    category: 'Weapon',
    detail: 'Greatsword',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 6 lb'],
      [
        'Hidden in the dungeon of White Plume Mountain, Blackrazor shines like a piece of night sky filled with stars. Its black scabbard is decorated with pieces of cut obsidian.',
      ],
      [
        'You gain a +3 bonus to attack rolls and damage rolls made with this magic weapon. If you hit an Undead with this weapon, you take 1d10 Necrotic damage, and the target regains 1d10 Hit Points. If this Necrotic damage reduces you to 0 Hit Points, Blackrazor devours your soul (see "Devour Soul" below).',
      ],
      [
        'While you hold this weapon, you have Immunity to the ',
        rules.charmed,
        ' and ',
        rules.frightened,
        ' conditions, and you have Blindsight with a range of 30 feet.',
      ],
      [
        'Devour Soul. Whenever you use Blackrazor to reduce a creature to 0 Hit Points, the sword slays the creature and devours its soul unless it is a Construct or an Undead. A creature whose soul has been devoured by Blackrazor can be restored to life only by a Wish spell.',
      ],
      [
        "When Blackrazor devours a soul that isn't yours, you gain Temporary Hit Points equal to the slain creature's Hit Point maximum.",
      ],
      [
        "Haste. Blackrazor can cast Haste on you, after which it can't cast this spell again until the next dawn. Blackrazor decides when to cast the spell, which takes effect at the start of your turn. The spell lasts for 1 minute (no Concentration required) or until Blackrazor decides to end it, which it can do at the end of any of your turns.",
      ],
      [
        'Sentience. Blackrazor is a sentient Chaotic Neutral weapon with an Intelligence of 17, a Wisdom of 10, and a Charisma of 19. It has hearing and Darkvision out to 120 feet.',
      ],
      [
        'The weapon speaks Common and can communicate with its wielder telepathically. Its voice is deep and echoing. While you are attuned to it, Blackrazor also understands every language you know.',
      ],
      [
        'Personality. Blackrazor speaks with an imperious tone, as though accustomed to being obeyed.',
      ],
      [
        "The sword's purpose is to consume souls. It doesn't care whose souls it eats, including the wielder's. The sword believes that all matter and energy sprang from a void of negative energy and will one day return to it. Blackrazor is meant to hurry that process along.",
      ],
      [
        'Despite its nihilism, Blackrazor feels a strange kinship to Wave and Whelm, two other weapons locked away under White Plume Mountain. It wants the three weapons to be reunited and wielded together in combat, even though it violently disagrees with Whelm and finds Wave tedious.',
      ],
      [
        "Blackrazor's hunger for souls must be regularly fed. If the sword goes 3 days or more without consuming a soul, a conflict between it and its wielder occurs at the next sunset.",
      ],
      [
        "Destroying Blackrazor. Blackrazor can be destroyed by crushing it in the great gears of Mechanus. Primus, the creator of the modrons, also knows a series of musical tones that Blackrazor can't stand to hear, causing the sword to shatter.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  book_of_exalted_deeds_dungeon_master_s_guide_2024: {
    name: 'Book of Exalted Deeds',
    category: 'Wondrous Item',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 5 lb'],
      [
        "The definitive treatise on all that is good in the multiverse, the Book of Exalted Deeds figures prominently in many religions. Rather than being a scripture devoted to a particular faith, the book's authors filled the pages with their own visions of true virtue, providing guidance for defeating evil.",
      ],
      [
        'The Book of Exalted Deeds rarely lingers in one place. As soon as the book is read, it vanishes to some other corner of the multiverse where its moral guidance can bring hope to an endangered world. Although attempts have been made to copy the work, efforts to do so fail to capture its magical nature or translate the benefits it offers to those pure of heart and firm of purpose.',
      ],
      [
        "A heavy clasp, wrought to look like angel wings, keeps the book's contents secure. Only a creature that is attuned to the book can release the clasp that holds it shut. Once the book is opened, the attuned creature must spend 80 hours reading and studying the book to digest its contents and gain its benefits.",
      ],
      [
        "Other creatures that peruse the book's open pages can read the text but glean no deeper meaning and reap no benefits. A Fiend, an Undead, or a servant of a god from the Lower Planes that tries to read from the book takes 24d6 Radiant damage. This damage ignores Resistance and Immunity, and it can't be reduced or avoided by any means. A creature reduced to 0 Hit Points by this damage disappears in a flash and is destroyed, leaving its possessions behind. The book then vanishes, and the creature's Attunement to it ends.",
      ],
      [
        'Benefits granted by the Book of Exalted Deeds last only as long as you strive to do good. If you fail to perform at least one act of kindness or generosity within the span of 10 days, or if you willingly perform an evil act, you lose all the benefits granted by the book.',
      ],
      [
        'Celestial Calm. While attuned to the book, you have Immunity to the ',
        rules.charmed,
        ' and ',
        rules.frightened,
        ' conditions and Resistance to Psychic damage. These benefits become permanent after you spend the requisite amount of time reading and studying the book.',
      ],
      [
        "Divine Wisdom. After you spend the requisite amount of time reading and studying the book, your Wisdom increases by 2, to a maximum of 24. You can't gain this benefit from the book more than once.",
      ],
      [
        'Enlightened Magic. After you spend the requisite amount of time reading and studying the book, any spell slot you expend to cast a spell counts as a spell slot of one level higher.',
      ],
      [
        "Halo. After you spend the requisite amount of time reading and studying the book, you gain a protective halo. This halo sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. You can dismiss or manifest the halo as a Bonus Action. While present, the halo gives you Advantage on Charisma (Persuasion) checks. In addition, Fiends and Undead within the halo's Bright Light make attack rolls against you with Disadvantage.",
      ],
      ['Random Properties. The Book of Exalted Deeds has the following random properties:'],
      ['2 minor beneficial properties'],
      ['2 major beneficial properties'],
      [
        "Destroying the Book. The Book of Exalted Deeds can't be destroyed. However, drowning the book in the River Styx removes all writing and imagery from its pages and renders the book powerless for 1d100 years.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  book_of_vile_darkness_dungeon_master_s_guide_2024: {
    name: 'Book of Vile Darkness',
    category: 'Wondrous Item',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 5 lb'],
      [
        'The contents of this foul manuscript are the meat and drink of the wicked. It contains knowledge so horrid that to even glimpse the scrawled pages invites doom.',
      ],
      [
        'Most believe the lich-god Vecna authored the Book of Vile Darkness. He recorded in its pages every horrid idea, every corrupt thought, and every example of foul magic he came across or devised.',
      ],
      [
        "Other practitioners of evil have added their own input to the book's catalog of vile knowledge. Their additions are clear, for the writers of later works stitched whatever they were writing into the tome or, in some cases, made notations and additions to existing text. There are places where pages are missing, torn, or covered so completely with ink, blood, and scratches that the original text can't be divined.",
      ],
      [
        "Nature can't abide the book's presence. Ordinary plants wither in its presence, common animals are unwilling to approach it, and the book gradually destroys whatever it touches. Even stone cracks and turns to powder if the book rests on it long enough.",
      ],
      [
        "Whenever a creature that isn't a Fiend or an Undead attunes to the Book of Vile Darkness, that creature makes a DC 17 Charisma saving throw. On a failed save, the creature is magically transformed into a Larva under the DM's control. Only a Wish spell can reverse this vile transformation.",
      ],
      [
        'A creature attuned to the book must spend 80 hours reading and studying it to digest its contents and use its Adjusted Ability Scores, Tireless Form, Spells, Vile Lore, and Vile Speech properties.',
      ],
      [
        "The Book of Vile Darkness remains with you only as long as you strive to work evil in the world. If you fail to perform at least one evil act within the span of 10 days, or if you willingly perform a good act, the book disappears, your Attunement to it ends immediately, and you lose all benefits granted by it. If you die while attuned to the book, an entity of great evil claims your soul. You can't be restored to life by any means while your soul remains imprisoned.",
      ],
      [
        "Adjusted Ability Scores. One ability score of your choice increases by 2, to a maximum of 24. Another ability score of your choice decreases by 2, to a minimum of 3. The book can't adjust your ability scores again.",
      ],
      [
        'Tireless Form. While the book is on your person, you have Immunity to the ',
        rules.exhaustion,
        ' condition.',
      ],
      ['Random Properties. The Book of Vile Darkness has the following random properties:'],
      ['3 minor beneficial properties'],
      ['1 major beneficial property'],
      ['3 minor detrimental properties'],
      ['2 major detrimental properties'],
      [
        'Spells. While holding the book and holding it, you can cast the following spells (save DC 18) from it:',
      ],
      ['Animate Dead'],
      ['Circle of Death'],
      ['Dominate Monster'],
      ['Finger of Death'],
      [
        "Once you use the book to cast a spell, you can't cast that spell again from it until the next dawn.",
      ],
      [
        'Vile Lore. You can reference the Book of Vile Darkness whenever you make an Intelligence check to recall information about some aspect of evil, such as lore about demons. When you do so, you have Advantage on that check.',
      ],
      [
        "At the DM's discretion, the book might reveal secrets no mortal should know, such as the true names of powerful Fiends, foul rites that allow one to transform into a death knight or lich, or long-lost spells crafted by beings so evil their names ought never to be spoken aloud.",
      ],
      [
        'Vile Speech. While the book is on your person, you can take a Magic action to recite words from its pages in a foul, dead language. Each time you do so, you take 1d12 Psychic damage, and each creature within 15 feet of you takes 3d6 Psychic damage unless the creature is a Fiend or an Undead.',
      ],
      [
        'Destroying the Book. The Book of Vile Darkness allows pages to be torn from it, but any evil lore contained on those pages finds its way back into the book eventually, usually when a new author adds pages to the tome.',
      ],
      [
        'If a solar tears the book in two, the book is destroyed for 1d100 years, after which it re-forms in some far corner of the multiverse.',
      ],
      [
        'A creature attuned to the book for 100 years can unearth a phrase hidden in the original text that, when translated to Celestial and spoken aloud, destroys both the speaker and the book in a flash of radiance. However, as long as evil exists in the multiverse, the book re-forms 1d10 × 100 years later.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  boots_of_false_tracks_dungeon_master_s_guide_2024: {
    name: 'Boots of False Tracks',
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: true,
    text: [
      [
        'While wearing these boots, you can have them leave tracks like those of any kind of Humanoid of your size.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  candle_of_the_deep_dungeon_master_s_guide_2024: {
    name: 'Candle of the Deep',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "The flame of this candle isn't extinguished when immersed in water. It gives off light and heat like a normal candle.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  cap_of_water_breathing_dungeon_master_s_guide_2024: {
    name: 'Cap of Water Breathing',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        'While wearing this cap underwater, you can take a Magic action to create a bubble of air around your head. This bubble allows you to breathe normally underwater. This bubble stays with you until the cap is removed or you are no longer underwater.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  cauldron_of_rebirth_dungeon_master_s_guide_2024: {
    name: 'Cauldron of Rebirth',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: 'by a druid or warlock',
    text: [
      ['This Tiny pot bears relief scenes of heroes on its cast-iron sides.'],
      [
        'You can use the cauldron as a Spellcasting Focus for your spells, and it functions as a suitable component for the Scrying spell.',
      ],
      [
        'Brew Potion. When you finish a Long Rest, you can use the cauldron to create a Potion of Healing (greater), which takes 1 minute. The potion lasts for 24 hours, then loses its magic if not consumed.',
      ],
      [
        "Raise Dead. As a Magic action, you can cause the cauldron to grow large enough for a Medium creature to crouch within. You can revert the cauldron to its normal size as a Magic action, harmlessly shunting anything that can't fit inside to the nearest unoccupied space.",
      ],
      [
        "If you place the corpse of a Humanoid into the cauldron and cover the corpse with 200 pounds of salt (which costs 10 GP) for at least 8 hours, the salt is consumed and the creature returns to life as if by Raise Dead at the next dawn. Once used, this property can't be used again for 7 days.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  charlatans_die_dungeon_master_s_guide_2024: {
    name: "Charlatan's Die",
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: true,
    text: [['Whenever you roll this six-sided die, you can control which number it rolls.']],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  cloak_of_billowing_dungeon_master_s_guide_2024: {
    name: 'Cloak of Billowing',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'While wearing this cloak, you can take a Bonus Action to make it billow dramatically for 1 minute.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  cloak_of_many_fashions_dungeon_master_s_guide_2024: {
    name: 'Cloak of Many Fashions',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "While wearing this cloak, you can take a Bonus Action to change the style, color, and apparent quality of the garment. The cloak's weight doesn't change. Regardless of its appearance, the cloak can't be anything but a cloak. Although it can duplicate the appearance of other magic cloaks, it doesn't gain their magical properties.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  clockwork_amulet_dungeon_master_s_guide_2024: {
    name: 'Clockwork Amulet',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This copper amulet contains tiny interlocking gears and is powered by magic from Mechanus, a plane of clockwork predictability. Faint ticking and whirring noises emanate from within.',
      ],
      [
        "When you make an attack roll while wearing the amulet, you can forgo rolling the d20 to get a 10 on the die. Once used, this property can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  clothes_of_mending_dungeon_master_s_guide_2024: {
    name: 'Clothes of Mending',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This elegant outfit magically mends itself to counteract daily wear and tear. Pieces of the outfit that are destroyed can't be repaired in this way.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  cube_of_summoning: {
    name: 'Cube of Summoning',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      [
        "This Tiny cube looks like a jack-in-the-box. When you wind its crank as a Magic action, a merry tune emits from the box, the lid pops open, a creature appears in the nearest unoccupied space, and the lid closes. The lid can't otherwise be opened.",
      ],
      [
        "Roll on the Cube of Summoning table to determine which spell the cube casts to summon the creature. The spell is cast at level 5 (save DC 17, +9 attack bonus) and doesn't require Concentration, but you otherwise function as the spell's caster.",
      ],
      ["Once the cube summons a creature, the cube can't do so again until the next dawn."],
      ['Table: Cube of Summoning'],
      ['1d6 · Spell'],
      ['1 · Summon Aberration'],
      ['2 · Summon Beast'],
      ['3 · Summon Construct'],
      ['4 · Summon Dragon'],
      ['5 · Summon Elemental'],
      ['6 · Summon Fey'],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  dark_shard_amulet_dungeon_master_s_guide_2024: {
    name: 'Dark Shard Amulet',
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: 'by a warlock',
    text: [
      ['Weight · 1 lb'],
      [
        'This amulet is fashioned from a shard of resilient material originating from an otherworldly realm. While you are wearing it, you gain the following benefits.',
      ],
      [
        'Spellcasting Focus. You can use the amulet as a Spellcasting Focus for your Warlock spells.',
      ],
      [
        "Unknown Spell. As a Magic action, you can try to cast a cantrip that you don't know. The cantrip must be on the Warlock spell list and have a casting time of an action, and you make a DC 10 Intelligence (Arcana) check. On a successful check, you cast the spell. On a failed check, the spell fails, and the action used to cast it is wasted. In either case, you can't use this property again until you finish a Long Rest.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  demonomicon_of_iggwilv_dungeon_master_s_guide_2024: {
    name: 'Demonomicon of Iggwilv',
    category: 'Wondrous Item',
    rarity: 'artifact',
    attunement: true,
    text: [
      [
        "This treatise, composed by Iggwilv the archmage, documents the Abyss's layers and inhabitants and is widely regarded as the most thorough and blasphemous tome of demonology in the multiverse. The tome recounts both the oldest and most current profanities of the Abyss and demons. Demons have attempted to censor the text, and while sections have been ripped from the book's spine, the general chapters remain, ever revealing demonic secrets. Caged behind lines of script roils a secret piece of the Abyss itself, which keeps the book up-to-date, no matter how many pages are removed, and it longs to be more than mere reference material.",
      ],
      [
        'Abyssal Lore. You can reference the Demonomicon whenever you make an Intelligence check to discern information about demons or a Wisdom (Survival) check related to the Abyss. When you do so, you gain Advantage on the check.',
      ],
      [
        "Containment. The first ten pages of the Demonomicon are blank. As a Magic action while holding the book, you can target a Fiend that you can see that is trapped within the area of a Magic Circle spell. The Fiend must succeed on a DC 20 Charisma saving throw with Disadvantage or become trapped within one of the Demonomicon's blank pages, which fills with writing detailing the trapped creature's widely known name and depravities. Once used, this action can't be used again until the next dawn.",
      ],
      [
        "When you finish a Long Rest, if you and the Demonomicon are on the same plane of existence, one trapped creature within the book can attempt to possess you. You make a DC 20 Charisma saving throw. On a failed save, you are possessed by the creature, which controls you like a puppet. As a Magic action, the possessing creature can release you and appear in the closest unoccupied space to you. On a successful save, the Fiend can't try to possess you again for 7 days (but another Fiend trapped in the book can certainly try).",
      ],
      [
        'When the tome is discovered, it has 1d4 Fiends occupying its pages—typically an assortment of demons.',
      ],
      [
        'Ensnarement. While carrying the book, whenever you cast Magic Circle naming only Fiends or cast Planar Binding targeting a Fiend, the spell is cast at level 9, regardless of what level spell slot you used, if any. Additionally, the Fiend has Disadvantage on its saving throw against the spell.',
      ],
      [
        'Fiendish Scourging. While carrying the book, when you make a damage roll for a spell you cast against a Fiend, you use the maximum possible result instead of rolling.',
      ],
      ['Random Properties. The Artifact has the following random properties:'],
      ['2 minor beneficial properties'],
      ['1 minor detrimental property'],
      ['1 major detrimental property'],
      [
        'Spells. The book has 8 charges and regains 1d8 expended charges daily at dawn. While holding the book, you can take a Magic action to cast one of the spells (save DC 20) on the following table. The table indicates how many charges you must expend to cast the spell.',
      ],
      ['Spell · Charge Cost'],
      ['Magic Circle · 1'],
      ['Magic Jar · 3'],
      ['Planar Ally · 3'],
      ['Planar Binding · 2'],
      ['Plane Shift (to the Abyss only) · 3'],
      ['Summon Fiend · 3'],
      ["Tasha's Hideous Laughter · 0"],
      [
        "Destroying the Demonomicon. To destroy the book, six different demon lords must each tear out a sixth of the book's pages. If this occurs, the pages reappear after 24 hours. Before all those hours pass, anyone who opens the book's remaining binding is transported to a nascent layer of the Abyss that lies hidden within the book. At the heart of this deadly, semi-sentient domain lies a long-lost Artifact, Fraz-Urb'luu's Staff. If the staff is dragged from the pocket plane, the tome is reduced to a mundane and out-of-date copy of the Tome of Zyx, the work that served as the foundation of the Demonomicon of Iggwilv. The Tome of Zyx can be destroyed like any ordinary book. Once the staff emerges, the demon lord Fraz-Urb'luu knows instantly.",
      ],
    ],
    effects: [
      {
        key: 'possessed',
        name: 'Possessed',
        lands: { on: 'failed-save', save: 'cha', dc: 20 },
        text: [
          'you are possessed by the creature, which controls you like a puppet. ',
          'As a Magic action, the possessing creature can release you and appear in the closest unoccupied space to you.',
        ],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  dread_helm_dungeon_master_s_guide_2024: {
    name: 'Dread Helm',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "While you're wearing this fearsome steel helm, your eyes glow red and the rest of your face is hidden in shadow.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  driftglobe_dungeon_master_s_guide_2024: {
    name: 'Driftglobe',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      ['Weight · 1 lb'],
      [
        "This small sphere of thick glass weighs 1 pound. If you are within 60 feet of it, you can command it to emanate light equivalent to that of the Light or Daylight spell (your choice). Once used, the Daylight effect can't be used again until the next dawn.",
      ],
      [
        'You can issue another command as a Magic action to make the illuminated globe rise into the air and float no more than 5 feet off the ground. The globe hovers in this way until you or another creature grasps it. If you move more than 60 feet from the hovering globe, it follows you until it is within 60 feet of you. It takes the shortest route to do so. If prevented from moving, the globe sinks gently to the ground and becomes inactive, and its light winks out.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  ear_horn_of_hearing_dungeon_master_s_guide_2024: {
    name: 'Ear Horn of Hearing',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'While held up to your ear, this horn suppresses the effects of the ',
        rules.deafened,
        ' condition on you.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  enduring_spellbook_dungeon_master_s_guide_2024: {
    name: 'Enduring Spellbook',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This spellbook, along with anything written on its pages, can't be damaged by fire or water. In addition, the spellbook doesn't deteriorate with age.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  enspelled_staff_cantrip: {
    name: 'Enspelled Staff (Cantrip)',
    category: 'Staff',
    rarity: 'uncommon',
    attunement: 'by a Spellcaster',
    text: [
      ['Weight · 4 lb'],
      [
        "Bound into this staff is a cantrip. The cantrip is determined when the staff is created and can be of any school of magic. The staff has 6 charges and regains 1d6 expended charges daily at dawn. While holding the staff, you can expend 1 charge to cast its spell. If you expend the staff's last charge, roll 1d20. On a 1, the staff loses its properties and becomes a nonmagical Quarterstaff.",
      ],
      ["The spell's saving throw DC is 13, and its attack bonus is +5."],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  enspelled_staff_level_1: {
    name: 'Enspelled Staff (Level 1)',
    category: 'Staff',
    rarity: 'uncommon',
    attunement: 'by a Spellcaster',
    text: [
      ['Weight · 4 lb'],
      [
        "Bound into this staff is a level 1 spell. The spell is determined when the staff is created and can be of any school of magic. The staff has 6 charges and regains 1d6 expended charges daily at dawn. While holding the staff, you can expend 1 charge to cast its spell. If you expend the staff's last charge, roll 1d20. On a 1, the staff loses its properties and becomes a nonmagical Quarterstaff.",
      ],
      ["The spell's saving throw DC is 13, and its attack bonus is +5."],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  enspelled_staff_level_2: {
    name: 'Enspelled Staff (Level 2)',
    category: 'Staff',
    rarity: 'rare',
    attunement: 'by a Spellcaster',
    text: [
      ['Weight · 4 lb'],
      [
        "Bound into this staff is a level 2 spell. The spell is determined when the staff is created and can be of any school of magic. The staff has 6 charges and regains 1d6 expended charges daily at dawn. While holding the staff, you can expend 1 charge to cast its spell. If you expend the staff's last charge, roll 1d20. On a 1, the staff loses its properties and becomes a nonmagical Quarterstaff.",
      ],
      ["The spell's saving throw DC is 13, and its attack bonus is +5."],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  enspelled_staff_level_3: {
    name: 'Enspelled Staff (Level 3)',
    category: 'Staff',
    rarity: 'rare',
    attunement: 'by a Spellcaster',
    text: [
      ['Weight · 4 lb'],
      [
        "Bound into this staff is a level 3 spell. The spell is determined when the staff is created and can be of any school of magic. The staff has 6 charges and regains 1d6 expended charges daily at dawn. While holding the staff, you can expend 1 charge to cast its spell. If you expend the staff's last charge, roll 1d20. On a 1, the staff loses its properties and becomes a nonmagical Quarterstaff.",
      ],
      ["The spell's saving throw DC is 15, and its attack bonus is +7."],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  enspelled_staff_level_4: {
    name: 'Enspelled Staff (Level 4)',
    category: 'Staff',
    rarity: 'very rare',
    attunement: 'by a Spellcaster',
    text: [
      ['Weight · 4 lb'],
      [
        "Bound into this staff is a level 4 spell. The spell is determined when the staff is created and can be of any school of magic. The staff has 6 charges and regains 1d6 expended charges daily at dawn. While holding the staff, you can expend 1 charge to cast its spell. If you expend the staff's last charge, roll 1d20. On a 1, the staff loses its properties and becomes a nonmagical Quarterstaff.",
      ],
      ["The spell's saving throw DC is 15, and its attack bonus is +7."],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  enspelled_staff_level_5: {
    name: 'Enspelled Staff (Level 5)',
    category: 'Staff',
    rarity: 'very rare',
    attunement: 'by a Spellcaster',
    text: [
      ['Weight · 4 lb'],
      [
        "Bound into this staff is a level 5 spell. The spell is determined when the staff is created and can be of any school of magic. The staff has 6 charges and regains 1d6 expended charges daily at dawn. While holding the staff, you can expend 1 charge to cast its spell. If you expend the staff's last charge, roll 1d20. On a 1, the staff loses its properties and becomes a nonmagical Quarterstaff.",
      ],
      ["The spell's saving throw DC is 17, and its attack bonus is +9."],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  enspelled_staff_level_6: {
    name: 'Enspelled Staff (Level 6)',
    category: 'Staff',
    rarity: 'legendary',
    attunement: 'by a Spellcaster',
    text: [
      ['Weight · 4 lb'],
      [
        "Bound into this staff is a level 6 spell. The spell is determined when the staff is created and can be of any school of magic. The staff has 6 charges and regains 1d6 expended charges daily at dawn. While holding the staff, you can expend 1 charge to cast its spell. If you expend the staff's last charge, roll 1d20. On a 1, the staff loses its properties and becomes a nonmagical Quarterstaff.",
      ],
      ["The spell's saving throw DC is 17, and its attack bonus is +9."],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  enspelled_staff_level_7: {
    name: 'Enspelled Staff (Level 7)',
    category: 'Staff',
    rarity: 'legendary',
    attunement: 'by a Spellcaster',
    text: [
      ['Weight · 4 lb'],
      [
        "Bound into this staff is a level 7 spell. The spell is determined when the staff is created and can be of any school of magic. The staff has 6 charges and regains 1d6 expended charges daily at dawn. While holding the staff, you can expend 1 charge to cast its spell. If you expend the staff's last charge, roll 1d20. On a 1, the staff loses its properties and becomes a nonmagical Quarterstaff.",
      ],
      ["The spell's saving throw DC is 18, and its attack bonus is +10."],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  enspelled_staff_level_8: {
    name: 'Enspelled Staff (Level 8)',
    category: 'Staff',
    rarity: 'legendary',
    attunement: 'by a Spellcaster',
    text: [
      ['Weight · 4 lb'],
      [
        "Bound into this staff is a level 8 spell. The spell is determined when the staff is created and can be of any school of magic. The staff has 6 charges and regains 1d6 expended charges daily at dawn. While holding the staff, you can expend 1 charge to cast its spell. If you expend the staff's last charge, roll 1d20. On a 1, the staff loses its properties and becomes a nonmagical Quarterstaff.",
      ],
      ["The spell's saving throw DC is 18, and its attack bonus is +10."],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  ersatz_eye_dungeon_master_s_guide_2024: {
    name: 'Ersatz Eye',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This magical eye replaces a real one that was lost or removed. While the Ersatz Eye is embedded in your eye socket, you can see through the tiny orb as though it were your natural eye. You can insert or remove the Ersatz Eye as a Magic action, and it can't be removed against your will while you are alive.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  eye_of_vecna_dungeon_master_s_guide_2024: {
    name: 'Eye of Vecna',
    category: 'Wondrous Item',
    rarity: 'artifact',
    attunement: true,
    text: [
      [
        'Vecna was a mighty wizard who, through magic and conquest, forged a terrible empire. For all his power, however, Vecna feared death and took steps to prevent his demise by becoming a lich.',
      ],
      [
        "A treacherous lieutenant named Kas brought Vecna's rule to an end in a terrible battle. Of Vecna, all that remained were one hand and one eye, grisly Artifacts that still seek to work Vecna's will in the world.",
      ],
      [
        'The Eye of Vecna and the Hand of Vecna are separate Artifacts that might be found together or separately. The eye looks like a bloodshot organ torn free from the socket. The hand is a shriveled left extremity.',
      ],
      [
        'Random Properties of the Eye and Hand. The Eye of Vecna has the following random properties:',
      ],
      ['1 minor beneficial property'],
      ['1 major beneficial property'],
      ['1 minor detrimental property'],
      [
        'Attuning to the Eye. To attune to the eye, you must press it into your empty socket. The eye grafts itself to your head and remains there until you die. If the eye is ever removed, you die.',
      ],
      [
        'Properties of the Eye. While you are attuned to the eye, your alignment is Neutral Evil, and you gain the following benefits:',
      ],
      ['Truesight. You have Truesight out to 240 feet.'],
      [
        "Spellcasting. The eye has 8 charges and regains 1d4 + 4 expended charges daily at dawn. You can cast a spell on the Eye of Vecna Spells table from the eye (save DC 18). The table indicates how many charges you must expend to cast the spell. Each time you cast a spell from the eye, there is a 5 percent chance that Vecna tears your soul from your body, devours it, and then takes control of the body like a puppet. If that happens, you become an NPC under the DM's control.",
      ],
      ['Table: Eye of Vecna Spells'],
      ['Spell · Charge Cost'],
      ['Clairvoyance · 2'],
      ['Crown of Madness · 1'],
      ['Disintegrate · 4'],
      ['Dominate Monster · 5'],
      ['Eyebite · 4'],
      [
        "X-ray Vision. You can take a Magic action to gain X-ray vision with a range of 30 feet for 1 minute. To you, solid objects within that radius appear transparent and don't prevent light from passing through themselves. The vision can penetrate 1 foot of stone, 1 inch of common metal, or up to 3 feet of wood or dirt. Thicker substances block the vision, as does a thin sheet of lead.",
      ],
      [
        "Destroying the Eye and Hand. If the Eye of Vecna and the Hand of Vecna are both attached to the same creature and that creature is slain by the Sword of Kas, both the eye and the hand burst into flame, turn to ash, and are destroyed. Any other attempt to destroy the eye or hand seems to work, but the Artifact reappears in one of Vecna's many hidden vaults, where it waits to be rediscovered.",
      ],
    ],
    effects: [
      {
        key: 'x-ray-vision',
        name: 'X-ray vision',
        lands: { on: 'use' },
        text: [
          'gain X-ray vision with a range of 30 feet for 1 minute. ',
          "To you, solid objects within that radius appear transparent and don't prevent light from passing through themselves. ",
          'The vision can penetrate 1 foot of stone, 1 inch of common metal, or up to 3 feet of wood or dirt. ',
          'Thicker substances block the vision, as does a thin sheet of lead.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  hag_eye_dungeon_master_s_guide_2024: {
    name: 'Hag Eye',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        'A Hag Eye has 3 charges. While wearing or holding this item, you can expend 1 charge to cast Darkvision (targeting yourself only) or See Invisibility. The Hag Eye regains all expended charges daily at dawn.',
      ],
      [
        "Coven Sensor. The Hag Eye is usually entrusted to a hag's minion for safekeeping and transport. As a Magic action, a hag who belongs to the coven that created the Hag Eye can see what the Hag Eye sees if the hag and the Hag Eye are on the same plane of existence. This effect lasts as long as the hag maintains Concentration. Multiple hags in the coven can see through the Hag Eye simultaneously.",
      ],
      [
        "Creating a Hag Eye. Only a hag coven can craft this item, which is made from a real eye coated in varnish and often fitted to a pendant or another wearable item. A hag coven can have only one Hag Eye at a time, and creating a new one requires all three members of the coven to perform a special rite. This rite takes 1 hour, and the hags can't perform it if one or more of them has the ",
        rules.incapacitated,
        ' condition. If the hags take any other actions during this rite, the rite fails and ends.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  hand_of_vecna_dungeon_master_s_guide_2024: {
    name: 'Hand of Vecna',
    category: 'Wondrous Item',
    rarity: 'artifact',
    attunement: true,
    text: [
      [
        'Vecna was a mighty wizard who, through magic and conquest, forged a terrible empire. For all his power, however, Vecna feared death and took steps to prevent his demise by becoming a lich.',
      ],
      [
        "A treacherous lieutenant named Kas brought Vecna's rule to an end in a terrible battle. Of Vecna, all that remained were one hand and one eye, grisly Artifacts that still seek to work Vecna's will in the world.",
      ],
      [
        'The Eye of Vecna and the Hand of Vecna are separate Artifacts that might be found together or separately. The eye looks like a bloodshot organ torn free from the socket. The hand is a shriveled left extremity.',
      ],
      [
        'Random Properties of the Eye and Hand. The Hand of Vecna has the following random properties:',
      ],
      ['1 minor beneficial property'],
      ['1 major beneficial property'],
      ['1 minor detrimental property'],
      [
        'Attuning to the Hand. To attune to the hand, you must press it against the stump where your left hand was. The hand grafts itself to your arm and becomes a functioning appendage. If the hand is ever removed, you die.',
      ],
      [
        'Properties of the Hand. When you are attuned to the hand, your alignment is Neutral Evil, and you gain the following benefits:',
      ],
      ['Great Strength. Your Strength becomes 20 unless it is already 20 or higher.'],
      [
        'Icy Touch. Any melee spell attack you make with the hand and any melee attack made with a weapon held by it deals an extra 2d8 Cold damage on a hit.',
      ],
      [
        'Spellcasting. The hand has 8 charges and regains 1d4 + 4 expended charges daily at dawn. You can cast a spell on the Hand of Vecna Spells table from the hand (save DC 18). The table indicates how many charges you must expend to cast the spell. Each time you cast a spell from it, the hand casts Suggestion on you (save DC 18; no Concentration required), demanding that you commit an evil act. The hand might have a specific act in mind or leave it up to you.',
      ],
      ['Table: Hand of Vecna Spells'],
      ['Spell · Charge Cost'],
      ['Finger of Death · 5'],
      ['Sleep · 1'],
      ['Slow · 2'],
      ['Teleport · 3'],
      [
        "Destroying the Eye and Hand. If the Eye of Vecna and the Hand of Vecna are both attached to the same creature and that creature is slain by the Sword of Kas, both the eye and the hand burst into flame, turn to ash, and are destroyed. Any other attempt to destroy the eye or hand seems to work, but the Artifact reappears in one of Vecna's many hidden vaults, where it waits to be rediscovered.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  hat_of_vermin_dungeon_master_s_guide_2024: {
    name: 'Hat of Vermin',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This hat has 3 charges. While holding the hat, you can take a Magic action to expend 1 charge and summon your choice of a Bat, a Frog, or a Rat. The summoned creature magically appears in the hat and tries to get away from you as quickly as possible. The creature is Indifferent toward you and other creatures, and it isn't under your control. It behaves as an ordinary creature of its kind and disappears after 1 hour or when it drops to 0 Hit Points. The hat regains all expended charges daily at dawn.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  hat_of_wizardry_dungeon_master_s_guide_2024: {
    name: 'Hat of Wizardry',
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: 'by a wizard',
    text: [
      [
        'This cone-shaped hat is adorned with moons and stars. While you are wearing it, you gain the following benefits.',
      ],
      ['Spellcasting Focus. You can use the hat as a Spellcasting Focus for your Wizard spells.'],
      [
        "Unknown Spell. As a Magic action, you can try to cast a cantrip that you don't know. The cantrip must be on the Wizard spell list and have a casting time of an action, and you make a DC 10 Intelligence (Arcana) check. On a successful check, you cast the spell. On a failed check, the spell fails, and the action used to cast the spell is wasted. In either case, you can't use this property again until you finish a Long Rest.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  hewards_handy_spice_pouch_dungeon_master_s_guide_2024: {
    name: "Heward's Handy Spice Pouch",
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This belt pouch appears empty and has 10 charges. While holding the pouch, you can take a Magic action to expend 1 charge, name any nonmagical food seasoning (such as salt, pepper, saffron, or cilantro), and remove a pinch of the desired seasoning from the pouch. A pinch is enough to season a single meal. The pouch regains 1d6 + 4 expended charges daily at dawn.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  horn_of_silent_alarm_dungeon_master_s_guide_2024: {
    name: 'Horn of Silent Alarm',
    category: 'Wondrous Item',
    detail: 'Horn',
    rarity: 'common',
    text: [
      [
        "This horn has 4 charges and regains 1d4 expended charges daily at dawn. As a Magic action, you can blow the horn while expending 1 charge. One creature of your choice hears the horn's blare, provided that creature is within 600 feet of the horn. No other creature hears the horn.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  instrument_of_illusions_dungeon_master_s_guide_2024: {
    name: 'Instrument of Illusions',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'While you are playing this musical instrument, you can take a Magic action to create harmless, illusory visual effects within a 5-foot Emanation originating from the instrument. If you are a Bard, the size of the Emanation increases to 15 feet. Sample visual effects include luminous musical notes, a spectral dancer, butterflies, and gently falling snow. The magical effects have neither substance nor sound, and they are obviously illusory. The effects end when you stop playing.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  instrument_of_scribing_dungeon_master_s_guide_2024: {
    name: 'Instrument of Scribing',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This musical instrument has 3 charges and regains all expended charges daily at dawn. While you are playing it, you can take a Magic action to expend 1 charge and write a magical message on a nonmagical object or surface that you can see within 30 feet of yourself. The message can be up to six words long and is written in a language you know. If you are a Bard, you can scribe an additional seven words and make the message glow faintly, allowing it to be seen in nonmagical Darkness. Casting the Dispel Magic spell on the message erases it. Otherwise, the message fades away after 24 hours.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  instrument_of_the_bards_anstruth_harp_dungeon_master_s_guide_2024: {
    name: 'Instrument of the Bards, Anstruth Harp',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: 'by a bard',
    text: [
      [
        'An Instrument of the Bards is superior to an ordinary instrument in every way. Seven types of these instruments exist, each named after a bard college. A creature that attempts to play the instrument without being attuned to it must succeed on a DC 15 Wisdom saving throw or take 2d4 Psychic damage.',
      ],
      [
        "You can play Anstruth Harp to cast one of the following spells: Fly, Invisibility, Levitate, Protection from Evil and Good, Cure Wounds (level 5), Ice Storm, and Wall of Thorns. Once the Anstruth Harp has been used to cast a spell, it can't be used to cast that spell again until the next dawn. The spells use your spellcasting ability and spell save DC.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  instrument_of_the_bards_canaith_mandolin_dungeon_master_s_guide_2024: {
    name: 'Instrument of the Bards, Canaith Mandolin',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a bard',
    text: [
      [
        'An Instrument of the Bards is superior to an ordinary instrument in every way. Seven types of these instruments exist, each named after a bard college. A creature that attempts to play the instrument without being attuned to it must succeed on a DC 15 Wisdom saving throw or take 2d4 Psychic damage.',
      ],
      [
        "You can play the Canaith Mandolin to cast one of the following spells: Fly, Invisibility, Levitate, Protection from Evil and Good, Cure Wounds (level 3), Dispel Magic, and Protection from Energy (Lightning damage only). Once the Canaith Mandolin has been used to cast a spell, it can't be used to cast that spell again until the next dawn. The spells use your spellcasting ability and spell save DC.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  instrument_of_the_bards_cli_lyre_dungeon_master_s_guide_2024: {
    name: 'Instrument of the Bards, Cli Lyre',
    category: 'Wondrous Item',
    detail: 'Lyre',
    rarity: 'rare',
    attunement: 'by a bard',
    text: [
      [
        'An Instrument of the Bards is superior to an ordinary instrument in every way. Seven types of these instruments exist, each named after a bard college. A creature that attempts to play the instrument without being attuned to it must succeed on a DC 15 Wisdom saving throw or take 2d4 Psychic damage.',
      ],
      [
        "You can play the Cli Lyre to cast one of the following spells: Fly, Invisibility, Levitate, Protection from Evil and Good, Stone Shape, Wall of Fire, and Wind Wall. Once the Cli Lyre has been used to cast a spell, it can't be used to cast that spell again until the next dawn. The spells use your spellcasting ability and spell save DC.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  instrument_of_the_bards_doss_lute_dungeon_master_s_guide_2024: {
    name: 'Instrument of the Bards, Doss Lute',
    category: 'Wondrous Item',
    detail: 'Lute',
    rarity: 'uncommon',
    attunement: 'by a bard',
    text: [
      [
        'An Instrument of the Bards is superior to an ordinary instrument in every way. Seven types of these instruments exist, each named after a bard college. A creature that attempts to play the instrument without being attuned to it must succeed on a DC 15 Wisdom saving throw or take 2d4 Psychic damage.',
      ],
      [
        "You can play the Doss Lute to cast one of the following spells: Fly, Invisibility, Levitate, Protection from Evil and Good, Animal Friendship, Protection from Energy (Fire damage only), and Protection from Poison. Once the Doss Lute has been used to cast a spell, it can't be used to cast that spell again until the next dawn. The spells use your spellcasting ability and spell save DC.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  instrument_of_the_bards_fochlucan_bandore_dungeon_master_s_guide_2024: {
    name: 'Instrument of the Bards, Fochlucan Bandore',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a bard',
    text: [
      [
        'An Instrument of the Bards is superior to an ordinary instrument in every way. Seven types of these instruments exist, each named after a bard college. A creature that attempts to play the instrument without being attuned to it must succeed on a DC 15 Wisdom saving throw or take 2d4 Psychic damage.',
      ],
      [
        "You can play the Fochlucan Bandore to cast one of the following spells: Fly, Invisibility, Levitate, Protection from Evil and Good, Entangle, Faerie Fire, Shillelagh, and Speak with Animals. Once the Fochlucan Bandore has been used to cast a spell, it can't be used to cast that spell again until the next dawn. The spells use your spellcasting ability and spell save DC.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  instrument_of_the_bards_mac_fuirmidh_cittern_dungeon_master_s_guide_2024: {
    name: 'Instrument of the Bards, Mac-Fuirmidh Cittern',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a bard',
    text: [
      [
        'An Instrument of the Bards is superior to an ordinary instrument in every way. Seven types of these instruments exist, each named after a bard college. A creature that attempts to play the instrument without being attuned to it must succeed on a DC 15 Wisdom saving throw or take 2d4 Psychic damage.',
      ],
      [
        "You can play the Mac-Fuirmidh Cittern to cast one of the following spells: Fly, Invisibility, Levitate, Protection from Evil and Good, Barkskin, Cure Wounds, and Fog Cloud. Once the Mac-Fuirmidh Cittern has been used to cast a spell, it can't be used to cast that spell again until the next dawn. The spells use your spellcasting ability and spell save DC.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  instrument_of_the_bards_ollamh_harp_dungeon_master_s_guide_2024: {
    name: 'Instrument of the Bards, Ollamh Harp',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: 'by a bard',
    text: [
      [
        'An Instrument of the Bards is superior to an ordinary instrument in every way. Seven types of these instruments exist, each named after a bard college. A creature that attempts to play the instrument without being attuned to it must succeed on a DC 15 Wisdom saving throw or take 2d4 Psychic damage.',
      ],
      [
        "You can play the Ollamh Harp to cast one of the following spells: Fly, Invisibility, Levitate, Protection from Evil and Good, Confusion, Control Weather, and Fire Storm. Once the Ollamh Harp has been used to cast a spell, it can't be used to cast that spell again until the next dawn. The spells use your spellcasting ability and spell save DC.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  keoghtoms_ointment: {
    name: "Keoghtom's Ointment",
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        'This glass jar, 3 inches in diameter, contains 1d4 + 1 doses of a thick mixture that smells faintly of aloe. The jar and its contents weigh 1/2 pound.',
      ],
      [
        'As a Utilize action, you can swallow one dose of the ointment or apply it to a creature within 5 feet of yourself. The creature that receives it regains 2d8 + 2 Hit Points and ceases to have the ',
        rules.poisoned,
        ' condition.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  lock_of_trickery_dungeon_master_s_guide_2024: {
    name: 'Lock of Trickery',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This lock appears to be an ordinary Lock (of the type described in chapter 6 of the Player's Handbook) and comes with a single key. The tumblers in this lock magically adjust to thwart burglars. Dexterity checks made to pick the lock have Disadvantage.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  lute_of_thunderous_thumping: {
    name: 'Lute of Thunderous Thumping',
    category: 'Weapon',
    detail: 'Club',
    rarity: 'very rare',
    text: [
      ['Weight · 2 lb'],
      [
        'This reinforced lute can be wielded as a magic Club that deals an extra 2d8 Thunder damage on a hit.',
      ],
      [
        "Sing and Swing. If you're a Bard, you can use your Charisma modifier instead of your Strength modifier when making a melee attack roll with the lute, provided you sing or hum while making the attack.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  mystery_key_dungeon_master_s_guide_2024: {
    name: 'Mystery Key',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "A question mark is worked into the head of this key. The key has a 5 percent chance of unlocking any lock into which it's inserted. Once it unlocks something, the key disappears.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  natures_mantle_dungeon_master_s_guide_2024: {
    name: "Nature's Mantle",
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a druid or ranger',
    text: [
      [
        'This cloak shifts color and texture to blend with the terrain surrounding you. While wearing the cloak, you can use it as a Spellcasting Focus for your Druid and Ranger spells.',
      ],
      [
        'While you are in an area that is Lightly Obscured, you can Hide as a Bonus Action even if you are being directly observed.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  orb_of_direction_dungeon_master_s_guide_2024: {
    name: 'Orb of Direction',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      ['Weight · 3 lb'],
      ['This orb can be used as an Arcane Focus.'],
      [
        'While holding this orb, you can take a Magic action to determine which way is magnetic north. Nothing happens if the orb is used in a location that has no magnetic north.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  orb_of_time_dungeon_master_s_guide_2024: {
    name: 'Orb of Time',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      ['Weight · 3 lb'],
      ['This orb can be used as an Arcane Focus.'],
      [
        'While holding the orb, you can take a Magic action to determine whether it is morning, afternoon, evening, or nighttime. This property functions only on the Material Plane.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  perfume_of_bewitching_dungeon_master_s_guide_2024: {
    name: 'Perfume of Bewitching',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This tiny vial contains magic perfume, enough for one use. You can take a Magic action to apply the perfume to yourself, and its effect lasts 1 hour. For the duration, you have Advantage on all Charisma (Deception and Persuasion) checks made to influence a creature within 5 feet of yourself.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  pipe_of_smoke_monsters_dungeon_master_s_guide_2024: {
    name: 'Pipe of Smoke Monsters',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'While smoking this pipe, you can take a Magic action to exhale a puff of smoke that takes the form of a creature, such as a dragon, a flumph, or a slaad. The form must be small enough to fit in a 1-foot cube and loses its shape after a few seconds, becoming an ordinary puff of smoke.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  plus_1_rod_of_the_pact_keeper_dungeon_master_s_guide_2024: {
    name: '+1 Rod of the Pact Keeper',
    category: 'Rod',
    rarity: 'uncommon',
    attunement: 'by a warlock',
    text: [
      ['Weight · 2 lb'],
      [
        'While holding this rod, you gain a +1 bonus to spell attack rolls and to the saving throw DCs of your Warlock spells.',
      ],
      [
        "In addition, you can regain one spell slot as a Magic action while holding the rod. You can't use this property again until you finish a Long Rest.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  plus_1_wraps_of_unarmed_power: {
    name: '+1 Wraps of Unarmed Power',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        'While wearing these wraps, you have a +1 bonus to attack rolls and damage rolls made with your Unarmed Strikes. Those strikes deal your choice of Force damage or their normal damage type.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  plus_2_rod_of_the_pact_keeper_dungeon_master_s_guide_2024: {
    name: '+2 Rod of the Pact Keeper',
    category: 'Rod',
    rarity: 'rare',
    attunement: 'by a warlock',
    text: [
      ['Weight · 2 lb'],
      [
        'While holding this rod, you gain a +2 bonus to spell attack rolls and to the saving throw DCs of your Warlock spells.',
      ],
      [
        "In addition, you can regain one spell slot as a Magic action while holding the rod. You can't use this property again until you finish a Long Rest.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  plus_2_wraps_of_unarmed_power: {
    name: '+2 Wraps of Unarmed Power',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      [
        'While wearing these wraps, you have a +2 bonus to attack rolls and damage rolls made with your Unarmed Strikes. Those strikes deal your choice of Force damage or their normal damage type.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  plus_3_rod_of_the_pact_keeper_dungeon_master_s_guide_2024: {
    name: '+3 Rod of the Pact Keeper',
    category: 'Rod',
    rarity: 'very rare',
    attunement: 'by a warlock',
    text: [
      ['Weight · 2 lb'],
      [
        'While holding this rod, you gain a +3 bonus to spell attack rolls and to the saving throw DCs of your Warlock spells.',
      ],
      [
        "In addition, you can regain one spell slot as a Magic action while holding the rod. You can't use this property again until you finish a Long Rest.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  plus_3_wraps_of_unarmed_power: {
    name: '+3 Wraps of Unarmed Power',
    category: 'Wondrous Item',
    rarity: 'very rare',
    text: [
      [
        'While wearing these wraps, you have a +3 bonus to attack rolls and damage rolls made with your Unarmed Strikes. Those strikes deal your choice of Force damage or their normal damage type.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  pole_of_angling_dungeon_master_s_guide_2024: {
    name: 'Pole of Angling',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This item functions as a Pole. While holding it, you can take a Magic action to cause it to transform into a fishing pole with a hook, a line, and a reel, or have the fishing pole revert to a Pole.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  pole_of_collapsing_dungeon_master_s_guide_2024: {
    name: 'Pole of Collapsing',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This item functions as a Pole. While holding it, you can take a Magic action to collapse it into a 1-foot-long rod for ease of storage (the pole's weight doesn't change) or cause the 1-foot-long rod to revert to a Pole. The rod elongates only as far as the surrounding space allows.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  pot_of_awakening_dungeon_master_s_guide_2024: {
    name: 'Pot of Awakening',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'If you plant an ordinary shrub in this 10-pound clay pot and let it grow for 30 days, the shrub magically transforms into an Awakened Shrub at the end of that time. When the shrub awakens, its roots break the pot, destroying it.',
      ],
      [
        'The awakened shrub is Friendly toward you and obeys your commands. Absent commands from you, it does nothing.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  potion_of_comprehension_dungeon_master_s_guide_2024: {
    name: 'Potion of Comprehension',
    category: 'Potion',
    rarity: 'common',
    text: [
      ['Weight · 0.5 lb'],
      [
        'When you drink this potion, you gain the effect of the Comprehend Languages spell for 1 hour.',
      ],
      ["This potion's liquid is a clear concoction with bits of salt and soot swirling in it."],
    ],
    effects: [
      {
        key: 'comprehension',
        name: 'Comprehend Languages',
        lands: { on: 'use' },
        text: ['you gain the effect of the Comprehend Languages spell for 1 hour.'],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  potion_of_fire_breath_dungeon_master_s_guide_2024: {
    name: 'Potion of Fire Breath',
    category: 'Potion',
    rarity: 'uncommon',
    text: [
      ['Weight · 0.5 lb'],
      [
        'After drinking this potion, you can take a Bonus Action to exhale fire at a target within 30 feet of yourself. The target makes a DC 13 Dexterity saving throw, taking 4d6 Fire damage on a failed save or half as much damage on a successful one. The effect ends after you exhale the fire three times or when 1 hour has passed.',
      ],
      [
        "This potion's orange liquid flickers, and smoke fills the top of the container and wafts out whenever it is opened.",
      ],
    ],
    effects: [
      {
        key: 'fire-breath',
        name: 'Fire Breath',
        lands: { on: 'use' },
        text: [
          'After drinking this potion, you can take a Bonus Action to exhale fire at a target within 30 feet of yourself. The target makes a DC 13 Dexterity saving throw, taking 4d6 Fire damage on a failed save or half as much damage on a successful one. The effect ends after you exhale the fire three times or when 1 hour has passed.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  potion_of_greater_invisibility: {
    name: 'Potion of Greater Invisibility',
    category: 'Potion',
    rarity: 'very rare',
    text: [
      ['Weight · 0.5 lb'],
      [
        "This potion's container looks empty but feels as though it holds liquid. When you drink the potion, you have the ",
        rules.invisible,
        ' condition for 1 hour.',
      ],
    ],
    effects: [
      {
        key: 'invisible',
        name: 'Invisible',
        lands: { on: 'use' },
        conditions: [rules.invisible],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  potion_of_pugilism: {
    name: 'Potion of Pugilism',
    category: 'Potion',
    rarity: 'uncommon',
    text: [
      ['Weight · 0.5 lb'],
      [
        'After you drink this potion, each Unarmed Strike you make deals an extra 1d6 Force damage on a hit. This effect lasts 10 minutes.',
      ],
      ['This potion is a thick green fluid that tastes like spinach.'],
    ],
    effects: [
      {
        key: 'pugilism',
        name: 'Pugilism',
        lands: { on: 'use' },
        text: [
          'After you drink this potion, each Unarmed Strike you make deals an extra 1d6 Force damage on a hit.',
        ],
        lasts: { kind: 'time', amount: '10', unit: 'minute' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  prosthetic_limb_dungeon_master_s_guide_2024: {
    name: 'Prosthetic Limb',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This magic item replaces a lost limb—a hand, an arm, a foot, a leg, or a similar body part. While the prosthetic is attached, it functions identically to the part it replaces. You can detach or reattach it as a Magic action, and it can't be removed against your will while you are alive.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  rival_coin: {
    name: 'Rival Coin',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This gold coin has a creature embossed on each side. The two depicted creatures must be famous rivals or enemies of each other. For example, a Rival Coin might show Iggwilv on one side and Mordenkainen on the other, or Venger on one side and Tiamat on the other. One of these figures is on the "heads" side of the coin, the other on the "tails" side.',
      ],
      [
        'The coin has 1 charge and regains its expended charge daily at dawn. You can take a Magic action to toss the coin, expending its charge. Roll any die to determine whether the coin comes up heads (on an even number) or tails (on an odd number). The roll also determines the effect:',
      ],
      [
        'Heads. Target one creature you can see within 60 feet of yourself. The target makes a DC 13 Wisdom saving throw. On a failed save, the target takes 2d4 Psychic damage and has Disadvantage on the next attack roll it makes before the end of its next turn. On a successful save, the target takes half as much damage only.',
      ],
      ['Tails. You take 1d4 Psychic damage.'],
    ],
    effects: [
      {
        key: 'heads-disadvantage',
        name: 'Rival’s disadvantage',
        lands: { on: 'failed-save', save: 'wis', dc: 13 },
        text: [
          'has Disadvantage on the next attack roll it makes before the end of its next turn.',
        ],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  rope_of_mending_dungeon_master_s_guide_2024: {
    name: 'Rope of Mending',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This 50-foot coil of rope can repair itself when cut into any number of smaller pieces. As a Magic action, you can cause all pieces of the rope that are in contact with each other and not otherwise in use to knit back together. A Rope of Mending is forever shortened if a section of it is lost or destroyed.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  ruby_of_the_war_mage_dungeon_master_s_guide_2024: {
    name: 'Ruby of the War Mage',
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: 'by a spellcaster',
    text: [
      [
        "Etched with eldritch runes, this 1-inch-diameter ruby allows you to use a Simple or Martial weapon as a Spellcasting Focus for your spells. For this property to work, you must attach the ruby to the weapon by pressing the ruby against it for at least 10 minutes. Thereafter, the ruby can't be removed unless you detach it as a Magic action, the weapon is destroyed, or your Attunement to the ruby ends.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  saddle_of_the_cavalier_dungeon_master_s_guide_2024: {
    name: 'Saddle of the Cavalier',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        "While in this saddle on a mount, you can't be dismounted against your will if you're conscious, and attack rolls against the mount have disadvantage.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_protection_aberrations: {
    name: 'Scroll of Protection (Aberrations)',
    category: 'Scroll',
    rarity: 'rare',
    text: [
      [
        "Using a Magic action to read the scroll creates a 5-foot Emanation originating from you. For 5 minutes, Aberrations can't enter or affect anything in the area. However, if you move in such a way that an Aberration would be inside the area, the effect ends.",
      ],
      [
        'As a Magic action, a creature within 5 feet of the Emanation can attempt to overcome it, which forces the creature to make a DC 15 Charisma saving throw. On a successful save, the creature ceases to be affected by the Emanation.',
      ],
    ],
    effects: [
      {
        key: 'protection',
        name: 'Protection from Aberrations',
        lands: { on: 'use' },
        text: [
          "For 5 minutes, Aberrations can't enter or affect anything in the area. However, if you move in such a way that an Aberration would be inside the area, the effect ends.",
        ],
        lasts: { kind: 'time', amount: '5', unit: 'minute' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_protection_beasts: {
    name: 'Scroll of Protection (Beasts)',
    category: 'Scroll',
    rarity: 'rare',
    text: [
      [
        "Using a Magic action to read the scroll creates a 5-foot Emanation originating from you. For 5 minutes, Beasts can't enter or affect anything in the area. However, if you move in such a way that an Beast would be inside the area, the effect ends.",
      ],
      [
        'As a Magic action, a creature within 5 feet of the Emanation can attempt to overcome it, which forces the creature to make a DC 15 Charisma saving throw. On a successful save, the creature ceases to be affected by the Emanation.',
      ],
    ],
    effects: [
      {
        key: 'protection',
        name: 'Protection from Beasts',
        lands: { on: 'use' },
        text: [
          "For 5 minutes, Beasts can't enter or affect anything in the area. However, if you move in such a way that an Beast would be inside the area, the effect ends.",
        ],
        lasts: { kind: 'time', amount: '5', unit: 'minute' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_protection_celestials: {
    name: 'Scroll of Protection (Celestials)',
    category: 'Scroll',
    rarity: 'rare',
    text: [
      [
        "Using a Magic action to read the scroll creates a 5-foot Emanation originating from you. For 5 minutes, Celestials can't enter or affect anything in the area. However, if you move in such a way that an Celestial would be inside the area, the effect ends.",
      ],
      [
        'As a Magic action, a creature within 5 feet of the Emanation can attempt to overcome it, which forces the creature to make a DC 15 Charisma saving throw. On a successful save, the creature ceases to be affected by the Emanation.',
      ],
    ],
    effects: [
      {
        key: 'protection',
        name: 'Protection from Celestials',
        lands: { on: 'use' },
        text: [
          "For 5 minutes, Celestials can't enter or affect anything in the area. However, if you move in such a way that an Celestial would be inside the area, the effect ends.",
        ],
        lasts: { kind: 'time', amount: '5', unit: 'minute' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_protection_constructs: {
    name: 'Scroll of Protection (Constructs)',
    category: 'Scroll',
    rarity: 'rare',
    text: [
      [
        "Using a Magic action to read the scroll creates a 5-foot Emanation originating from you. For 5 minutes, Constructs can't enter or affect anything in the area. However, if you move in such a way that an Construct would be inside the area, the effect ends.",
      ],
      [
        'As a Magic action, a creature within 5 feet of the Emanation can attempt to overcome it, which forces the creature to make a DC 15 Charisma saving throw. On a successful save, the creature ceases to be affected by the Emanation.',
      ],
    ],
    effects: [
      {
        key: 'protection',
        name: 'Protection from Constructs',
        lands: { on: 'use' },
        text: [
          "For 5 minutes, Constructs can't enter or affect anything in the area. However, if you move in such a way that an Construct would be inside the area, the effect ends.",
        ],
        lasts: { kind: 'time', amount: '5', unit: 'minute' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_protection_dragons: {
    name: 'Scroll of Protection (Dragons)',
    category: 'Scroll',
    rarity: 'rare',
    text: [
      [
        "Using a Magic action to read the scroll creates a 5-foot Emanation originating from you. For 5 minutes, Dragons can't enter or affect anything in the area. However, if you move in such a way that an Dragon would be inside the area, the effect ends.",
      ],
      [
        'As a Magic action, a creature within 5 feet of the Emanation can attempt to overcome it, which forces the creature to make a DC 15 Charisma saving throw. On a successful save, the creature ceases to be affected by the Emanation.',
      ],
    ],
    effects: [
      {
        key: 'protection',
        name: 'Protection from Dragons',
        lands: { on: 'use' },
        text: [
          "For 5 minutes, Dragons can't enter or affect anything in the area. However, if you move in such a way that an Dragon would be inside the area, the effect ends.",
        ],
        lasts: { kind: 'time', amount: '5', unit: 'minute' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_protection_elementals: {
    name: 'Scroll of Protection (Elementals)',
    category: 'Scroll',
    rarity: 'rare',
    text: [
      [
        "Using a Magic action to read the scroll creates a 5-foot Emanation originating from you. For 5 minutes, Elementals can't enter or affect anything in the area. However, if you move in such a way that an Elemental would be inside the area, the effect ends.",
      ],
      [
        'As a Magic action, a creature within 5 feet of the Emanation can attempt to overcome it, which forces the creature to make a DC 15 Charisma saving throw. On a successful save, the creature ceases to be affected by the Emanation.',
      ],
    ],
    effects: [
      {
        key: 'protection',
        name: 'Protection from Elementals',
        lands: { on: 'use' },
        text: [
          "For 5 minutes, Elementals can't enter or affect anything in the area. However, if you move in such a way that an Elemental would be inside the area, the effect ends.",
        ],
        lasts: { kind: 'time', amount: '5', unit: 'minute' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_protection_fey: {
    name: 'Scroll of Protection (Fey)',
    category: 'Scroll',
    rarity: 'rare',
    text: [
      [
        "Using a Magic action to read the scroll creates a 5-foot Emanation originating from you. For 5 minutes, Fey can't enter or affect anything in the area. However, if you move in such a way that an Fey would be inside the area, the effect ends.",
      ],
      [
        'As a Magic action, a creature within 5 feet of the Emanation can attempt to overcome it, which forces the creature to make a DC 15 Charisma saving throw. On a successful save, the creature ceases to be affected by the Emanation.',
      ],
    ],
    effects: [
      {
        key: 'protection',
        name: 'Protection from Fey',
        lands: { on: 'use' },
        text: [
          "For 5 minutes, Fey can't enter or affect anything in the area. However, if you move in such a way that an Fey would be inside the area, the effect ends.",
        ],
        lasts: { kind: 'time', amount: '5', unit: 'minute' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_protection_fiends: {
    name: 'Scroll of Protection (Fiends)',
    category: 'Scroll',
    rarity: 'rare',
    text: [
      [
        "Using a Magic action to read the scroll creates a 5-foot Emanation originating from you. For 5 minutes, Fiends can't enter or affect anything in the area. However, if you move in such a way that an Fiend would be inside the area, the effect ends.",
      ],
      [
        'As a Magic action, a creature within 5 feet of the Emanation can attempt to overcome it, which forces the creature to make a DC 15 Charisma saving throw. On a successful save, the creature ceases to be affected by the Emanation.',
      ],
    ],
    effects: [
      {
        key: 'protection',
        name: 'Protection from Fiends',
        lands: { on: 'use' },
        text: [
          "For 5 minutes, Fiends can't enter or affect anything in the area. However, if you move in such a way that an Fiend would be inside the area, the effect ends.",
        ],
        lasts: { kind: 'time', amount: '5', unit: 'minute' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_protection_giants: {
    name: 'Scroll of Protection (Giants)',
    category: 'Scroll',
    rarity: 'rare',
    text: [
      [
        "Using a Magic action to read the scroll creates a 5-foot Emanation originating from you. For 5 minutes, Giants can't enter or affect anything in the area. However, if you move in such a way that an Giant would be inside the area, the effect ends.",
      ],
      [
        'As a Magic action, a creature within 5 feet of the Emanation can attempt to overcome it, which forces the creature to make a DC 15 Charisma saving throw. On a successful save, the creature ceases to be affected by the Emanation.',
      ],
    ],
    effects: [
      {
        key: 'protection',
        name: 'Protection from Giants',
        lands: { on: 'use' },
        text: [
          "For 5 minutes, Giants can't enter or affect anything in the area. However, if you move in such a way that an Giant would be inside the area, the effect ends.",
        ],
        lasts: { kind: 'time', amount: '5', unit: 'minute' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_protection_humanoids: {
    name: 'Scroll of Protection (Humanoids)',
    category: 'Scroll',
    rarity: 'rare',
    text: [
      [
        "Using a Magic action to read the scroll creates a 5-foot Emanation originating from you. For 5 minutes, Humanoids can't enter or affect anything in the area. However, if you move in such a way that an Humanoid would be inside the area, the effect ends.",
      ],
      [
        'As a Magic action, a creature within 5 feet of the Emanation can attempt to overcome it, which forces the creature to make a DC 15 Charisma saving throw. On a successful save, the creature ceases to be affected by the Emanation.',
      ],
    ],
    effects: [
      {
        key: 'protection',
        name: 'Protection from Humanoids',
        lands: { on: 'use' },
        text: [
          "For 5 minutes, Humanoids can't enter or affect anything in the area. However, if you move in such a way that an Humanoid would be inside the area, the effect ends.",
        ],
        lasts: { kind: 'time', amount: '5', unit: 'minute' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_protection_monstrosities: {
    name: 'Scroll of Protection (Monstrosities)',
    category: 'Scroll',
    rarity: 'rare',
    text: [
      [
        "Using a Magic action to read the scroll creates a 5-foot Emanation originating from you. For 5 minutes, Monstrosities can't enter or affect anything in the area. However, if you move in such a way that an Monstrosity would be inside the area, the effect ends.",
      ],
      [
        'As a Magic action, a creature within 5 feet of the Emanation can attempt to overcome it, which forces the creature to make a DC 15 Charisma saving throw. On a successful save, the creature ceases to be affected by the Emanation.',
      ],
    ],
    effects: [
      {
        key: 'protection',
        name: 'Protection from Monstrosities',
        lands: { on: 'use' },
        text: [
          "For 5 minutes, Monstrosities can't enter or affect anything in the area. However, if you move in such a way that an Monstrosity would be inside the area, the effect ends.",
        ],
        lasts: { kind: 'time', amount: '5', unit: 'minute' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_protection_oozes: {
    name: 'Scroll of Protection (Oozes)',
    category: 'Scroll',
    rarity: 'rare',
    text: [
      [
        "Using a Magic action to read the scroll creates a 5-foot Emanation originating from you. For 5 minutes, Oozes can't enter or affect anything in the area. However, if you move in such a way that an Ooze would be inside the area, the effect ends.",
      ],
      [
        'As a Magic action, a creature within 5 feet of the Emanation can attempt to overcome it, which forces the creature to make a DC 15 Charisma saving throw. On a successful save, the creature ceases to be affected by the Emanation.',
      ],
    ],
    effects: [
      {
        key: 'protection',
        name: 'Protection from Oozes',
        lands: { on: 'use' },
        text: [
          "For 5 minutes, Oozes can't enter or affect anything in the area. However, if you move in such a way that an Ooze would be inside the area, the effect ends.",
        ],
        lasts: { kind: 'time', amount: '5', unit: 'minute' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_protection_plants: {
    name: 'Scroll of Protection (Plants)',
    category: 'Scroll',
    rarity: 'rare',
    text: [
      [
        "Using a Magic action to read the scroll creates a 5-foot Emanation originating from you. For 5 minutes, Plants can't enter or affect anything in the area. However, if you move in such a way that an Plant would be inside the area, the effect ends.",
      ],
      [
        'As a Magic action, a creature within 5 feet of the Emanation can attempt to overcome it, which forces the creature to make a DC 15 Charisma saving throw. On a successful save, the creature ceases to be affected by the Emanation.',
      ],
    ],
    effects: [
      {
        key: 'protection',
        name: 'Protection from Plants',
        lands: { on: 'use' },
        text: [
          "For 5 minutes, Plants can't enter or affect anything in the area. However, if you move in such a way that an Plant would be inside the area, the effect ends.",
        ],
        lasts: { kind: 'time', amount: '5', unit: 'minute' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_protection_undead: {
    name: 'Scroll of Protection (Undead)',
    category: 'Scroll',
    rarity: 'rare',
    text: [
      [
        "Using a Magic action to read the scroll creates a 5-foot Emanation originating from you. For 5 minutes, Undead can't enter or affect anything in the area. However, if you move in such a way that an Undead would be inside the area, the effect ends.",
      ],
      [
        'As a Magic action, a creature within 5 feet of the Emanation can attempt to overcome it, which forces the creature to make a DC 15 Charisma saving throw. On a successful save, the creature ceases to be affected by the Emanation.',
      ],
    ],
    effects: [
      {
        key: 'protection',
        name: 'Protection from Undead',
        lands: { on: 'use' },
        text: [
          "For 5 minutes, Undead can't enter or affect anything in the area. However, if you move in such a way that an Undead would be inside the area, the effect ends.",
        ],
        lasts: { kind: 'time', amount: '5', unit: 'minute' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_titan_summoning_animal_lord: {
    name: 'Scroll of Titan Summoning (Animal Lord)',
    category: 'Scroll',
    rarity: 'legendary',
    text: [
      [
        'When you take a Magic action to read this scroll, an Animal Lord appears in an unoccupied space on the ground or in water that you can see within 1 mile of yourself.',
      ],
      [
        "The Animal Lord is Hostile toward all other creatures and disappears when it drops to 0 Hit Points. If the Animal Lord is summoned into a space that isn't large enough to contain it, the summoning fails, and the scroll is wasted.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_titan_summoning_blob_of_annihilation: {
    name: 'Scroll of Titan Summoning (Blob of Annihilation)',
    category: 'Scroll',
    rarity: 'legendary',
    text: [
      [
        'When you take a Magic action to read this scroll, a Blob of Annihilation appears in an unoccupied space on the ground or in water that you can see within 1 mile of yourself.',
      ],
      [
        "The Blob of Annihilation is Hostile toward all other creatures and disappears when it drops to 0 Hit Points. If the Blob of Annihilation is summoned into a space that isn't large enough to contain it, the summoning fails, and the scroll is wasted.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_titan_summoning_colossus: {
    name: 'Scroll of Titan Summoning (Colossus)',
    category: 'Scroll',
    rarity: 'legendary',
    text: [
      [
        'When you take a Magic action to read this scroll, a Colossus appears in an unoccupied space on the ground or in water that you can see within 1 mile of yourself.',
      ],
      [
        "The Colossus is Hostile toward all other creatures and disappears when it drops to 0 Hit Points. If the Colossus is summoned into a space that isn't large enough to contain it, the summoning fails, and the scroll is wasted.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_titan_summoning_elemental_cataclysm: {
    name: 'Scroll of Titan Summoning (Elemental Cataclysm)',
    category: 'Scroll',
    rarity: 'legendary',
    text: [
      [
        'When you take a Magic action to read this scroll, an Elemental Cataclysm appears in an unoccupied space on the ground or in water that you can see within 1 mile of yourself.',
      ],
      [
        "The Elemental Cataclysm is Hostile toward all other creatures and disappears when it drops to 0 Hit Points. If the Elemental Cataclysm is summoned into a space that isn't large enough to contain it, the summoning fails, and the scroll is wasted.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_titan_summoning_empyrean: {
    name: 'Scroll of Titan Summoning (Empyrean)',
    category: 'Scroll',
    rarity: 'legendary',
    text: [
      [
        'When you take a Magic action to read this scroll, an Empyrean appears in an unoccupied space on the ground or in water that you can see within 1 mile of yourself.',
      ],
      [
        "The Empyrean is Hostile toward all other creatures and disappears when it drops to 0 Hit Points. If the Empyrean is summoned into a space that isn't large enough to contain it, the summoning fails, and the scroll is wasted.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_titan_summoning_kraken: {
    name: 'Scroll of Titan Summoning (Kraken)',
    category: 'Scroll',
    rarity: 'legendary',
    text: [
      [
        'When you take a Magic action to read this scroll, a Kraken appears in an unoccupied space in water that you can see within 1 mile of yourself. A kraken requires a body of water large enough to contain it, or the summoning fails and the scroll is wasted',
      ],
      [
        "The Kraken is Hostile toward all other creatures and disappears when it drops to 0 Hit Points. If the Kraken is summoned into a space that isn't large enough to contain it, the summoning fails, and the scroll is wasted.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  scroll_of_titan_summoning_tarrasque: {
    name: 'Scroll of Titan Summoning (Tarrasque)',
    category: 'Scroll',
    rarity: 'legendary',
    text: [
      [
        'When you take a Magic action to read this scroll, a Tarrasque appears in an unoccupied space on the ground or in water that you can see within 1 mile of yourself.',
      ],
      [
        "The Tarrasque is Hostile toward all other creatures and disappears when it drops to 0 Hit Points. If the Tarrasque is summoned into a space that isn't large enough to contain it, the summoning fails, and the scroll is wasted.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  shield_of_expression_dungeon_master_s_guide_2024: {
    name: 'Shield of Expression',
    category: 'Shield',
    detail: 'Shield',
    rarity: 'common',
    text: [
      ['Weight · 6 lb'],
      [
        "The front of this Shield is shaped in the likeness of a face. While bearing the Shield, you can take a Bonus Action to alter the face's expression.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  spirit_board: {
    name: 'Spirit Board',
    category: 'Wondrous Item',
    rarity: 'very rare',
    text: [
      [
        'This ornate wooden board has the letters of the Common alphabet printed on one side, alongside the words "Yes" and "No" and symbols representing "Weal" and "Woe." The board comes with a heart-shaped, wooden planchette. This planchette must be resting on the lettered side of the board for the board\'s magic to function.',
      ],
      [
        "This board has 3 charges and regains 1 expended charge daily at dawn. While touching the planchette, you can take 1 minute to cast one of the spells on the table below. The table indicates how many charges you must expend to cast the spell. As you cast the spell, you call on the spirits of the dead to help guide the planchette across the board's surface, answering your questions by pointing to the letters or words on the board.",
      ],
      ['Spell · Charge Cost'],
      ['Augury · 1'],
      ['Commune · 3'],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  staff_of_adornment_dungeon_master_s_guide_2024: {
    name: 'Staff of Adornment',
    category: 'Staff',
    rarity: 'common',
    text: [
      ['Weight · 4 lb'],
      [
        "If you place a Tiny object weighing no more than 1 pound (such as a shard of crystal, an egg, or a stone) above the tip of this staff while holding it, the object floats an inch from the staff's tip and remains there until it is removed or until the staff is no longer in your possession. The staff can have up to three such objects floating over its tip at any given time. While holding the staff, you can make one or more of the objects slowly spin or turn in place.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  staff_of_birdcalls_dungeon_master_s_guide_2024: {
    name: 'Staff of Birdcalls',
    category: 'Staff',
    rarity: 'common',
    text: [
      ['Weight · 4 lb'],
      [
        "This wooden staff is decorated with bird carvings. It has 10 charges. While holding it, you can take a Magic action to expend 1 charge from the staff and cause it to create one of the following sounds, which can be heard out to 120 feet: a finch's chirp, a raven's caw, a duck's quack, a chicken's cluck, a goose's honk, a loon's call, a turkey's gobble, a seagull's cry, an owl's hoot, or an eagle's shriek.",
      ],
      [
        'Regaining Charges. The staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the staff explodes in a harmless cloud of bird feathers and is lost forever.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  staff_of_flowers_dungeon_master_s_guide_2024: {
    name: 'Staff of Flowers',
    category: 'Staff',
    rarity: 'common',
    text: [
      ['Weight · 4 lb'],
      [
        'This wooden staff has 10 charges. While holding it, you can take a Magic action to expend 1 charge from the staff and cause a flower to sprout from a patch of earth or soil within 5 feet of yourself, or from the staff itself. Unless you choose a specific kind of flower, the staff creates a mild-scented daisy. The flower is harmless and nonmagical, and it grows or withers as a normal flower would.',
      ],
      [
        'Regaining Charges. The staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the staff turns into flower petals and is lost forever.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  staff_of_the_adder_dungeon_master_s_guide_2024: {
    name: 'Staff of the Adder',
    category: 'Staff',
    rarity: 'uncommon',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      [
        'As a Bonus Action, you can turn the head of this staff into that of an animate, venomous snake for 1 minute or revert the staff to its inanimate form.',
      ],
      [
        'When you take the Attack action, you can make one of the attack rolls using the animated snake head, which has a reach of 5 feet. Apply your Proficiency Bonus and Wisdom modifier to the attack roll. On a hit, the target takes 1d6 Piercing damage and 3d6 Poison damage.',
      ],
      [
        "The snake head can be attacked while it is animate. It has AC 15, HP 20, and Immunity to Poison and Psychic damage. If the head drops to 0 Hit Points, the staff is destroyed. As long as it's not destroyed, the staff regains all lost Hit Points when it reverts to its inanimate form.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  sword_of_answering: {
    name: 'Sword of Answering',
    category: 'Weapon',
    detail: 'Longsword',
    rarity: 'legendary',
    attunement: true,
    text: [
      ['Weight · 3 lb'],
      [
        'You gain a +3 bonus to attack rolls and damage rolls made with this sword. In addition, while you hold the sword, you can take a Reaction to make one melee attack with it against any creature in your reach that deals damage to you. You have Advantage on the attack roll, and any damage dealt with this special attack ignores any Immunity or Resistance the target has to that damage.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  sword_of_kas_dungeon_master_s_guide_2024: {
    name: 'Sword of Kas',
    category: 'Weapon',
    detail: 'Longsword',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 3 lb'],
      [
        "Kas was a powerful warrior who served Vecna and whose loyalty was rewarded with this sword. As Kas's power grew, so did his hubris. The sword urged Kas to destroy Vecna and usurp his throne. Legend says Vecna's destruction came at Kas's hand, but Vecna also wrought his rebellious lieutenant's doom, leaving only Kas's sword behind.",
      ],
      [
        "Bloodthirst. The sword thirsts for blood. If the sword doesn't taste blood on its blade within 1 minute of being drawn from its scabbard, its wielder makes a DC 15 Charisma saving throw. On a successful save, the wielder takes 3d6 Psychic damage. On a failed save, the wielder is dominated by the sword, as if by the Dominate Monster spell, and the sword demands blood. The spell effect ends when the sword's demand is met.",
      ],
      [
        'Magic Weapon. You gain a +3 bonus to attack rolls and damage rolls made with the sword, which scores a Critical Hit on a roll of 19 or 20 on the d20 and deals an extra 2d10 Slashing damage to Undead.',
      ],
      ['Random Properties. The sword has the following random properties:'],
      ['1 minor beneficial property'],
      ['1 major beneficial property'],
      ['1 minor detrimental property'],
      ['1 major detrimental property'],
      [
        'Spells. While the sword is on your person, you can cast the following spells (save DC 18) from it:',
      ],
      ['Call Lightning'],
      ['Divine Word'],
      ['Finger of Death'],
      [
        "Once you use the sword to cast a spell, you can't cast that spell again from it until the next dawn.",
      ],
      ['Spirit of Kas. While the sword is on your person, you gain the following benefits:'],
      ['Battle Hunger. You add 1d10 to your Initiative rolls.'],
      [
        'Blade of Defense. When you take an action to attack with the sword, you can transfer some or all of its attack bonus to your Armor Class instead. The adjusted bonuses remain in effect until the start of your next turn.',
      ],
      ['Necrotic Resistance. You have Resistance to Necrotic damage.'],
      [
        'Sentience. The Sword of Kas is a sentient Chaotic Evil weapon with an Intelligence of 15, a Wisdom of 13, and a Charisma of 16. It has hearing and Darkvision out to 120 feet.',
      ],
      ['The weapon communicates telepathically with its wielder and speaks Common.'],
      [
        "Personality. The sword's purpose is to bring ruin to Vecna. Killing Vecna's worshipers, destroying the lich's works, and foiling his machinations all help to fulfill this goal.",
      ],
      ['The Sword of Kas also seeks to destroy anyone corrupted by the Eye and Hand of Vecna.'],
      [
        "Destroying the Sword. A creature attuned to both the Eye of Vecna and the Hand of Vecna can use the Wish property of those combined Artifacts to unmake the Sword of Kas, provided the sword is within 30 feet of the spell's caster. Upon casting Wish, the creature makes a DC 18 Charisma saving throw. On a failed save, nothing happens, and the Wish spell is wasted. On a successful save, the Sword of Kas is destroyed.",
      ],
    ],
    effects: [
      {
        key: 'bloodthirst',
        name: 'Dominated by the sword',
        lands: { on: 'failed-save', save: 'cha', dc: 15 },
        text: [
          'the wielder is dominated by the sword, as if by the Dominate Monster spell, and the sword demands blood.',
        ],
        lasts: { kind: 'until', text: ["the sword's demand is met"] },
      },
      {
        key: 'blade-of-defense',
        name: 'Blade of Defense',
        lands: { on: 'use' },
        text: [
          'When you take an action to attack with the sword, you can transfer some or all of its attack bonus to your Armor Class instead.',
        ],
        lasts: { kind: 'turn', boundary: 'start', whose: 'source' },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  talking_doll_dungeon_master_s_guide_2024: {
    name: 'Talking Doll',
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: true,
    text: [
      [
        'While this doll is within 5 feet of you, you can spend a Short Rest telling it to say up to six phrases, none of which can be more than six words long, and set a condition under which the doll speaks each phrase. You can also replace old phrases with new ones. Whatever the condition, it must occur within 5 feet of the doll to make it speak. For example, whenever someone picks up the doll, it might say, "I want a piece of candy." The doll\'s phrases are lost when your Attunement to the doll ends.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  tankard_of_sobriety_dungeon_master_s_guide_2024: {
    name: 'Tankard of Sobriety',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This tankard has a stern face sculpted into one side. You can drink ale, wine, or any other nonmagical alcoholic beverage poured into it without becoming inebriated. The tankard has no effect on magical liquids or harmful substances such as poison.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  tentacle_rod_dungeon_master_s_guide_2024: {
    name: 'Tentacle Rod',
    category: 'Rod',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 2 lb'],
      [
        'This rod ends in three rubbery tentacles. While holding the rod, you can take a Magic action to direct the tentacles to stretch outward, each one attacking a creature you can see within 15 feet of yourself. For each tentacle, make a melee attack roll with a +9 bonus. A tentacle deals 1d6 Psychic damage on a hit. If you hit the same target with all three tentacles, the target must succeed on a DC 15 Dexterity saving throw or have the ',
        rules.restrained,
        ' condition until you have the ',
        rules.incapacitated,
        ' condition, until you take a Bonus Action to release the target, or until the target is no longer within 15 feet of you. While ',
        rules.restrained,
        ' in this way, the target takes 3d6 Psychic damage at the start of each of its turns. At the end of each of its turns, the target repeats the save, ending the effect on itself on a success.',
      ],
    ],
    effects: [
      {
        key: 'restrained',
        name: 'Restrained by tentacles',
        lands: { on: 'failed-save', save: 'dex', dc: 15 },
        conditions: [rules.restrained],
        text: [
          'While ',
          rules.restrained,
          ' in this way, the target takes 3d6 Psychic damage at the start of each of its turns.',
        ],
        lasts: {
          kind: 'until',
          text: [
            'you have the ',
            rules.incapacitated,
            ' condition, until you take a Bonus Action to release the target, or until the target is no longer within 15 feet of you',
          ],
        },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  tome_of_the_stilled_tongue_dungeon_master_s_guide_2024: {
    name: 'Tome of the Stilled Tongue',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: 'by a wizard',
    text: [
      ['Weight · 5 lb'],
      [
        "This book has a desiccated tongue pinned to its front cover. Five of these tomes exist, and it's unknown which one is the original. The tongue on the first Tome of the Stilled Tongue belonged to a treacherous former servant of the lich Vecna. The tongues pinned to the covers of the four copies came from other spellcasters who crossed Vecna. The first few pages of each tome are filled with indecipherable scrawls. The remaining pages are blank.",
      ],
      [
        "While attuned to this item, you can use it as a Spellbook and an Arcane Focus. In addition, while holding the tome, you can take a Bonus Action to cast a spell you have written in this tome, without expending a spell slot or using any Verbal or Somatic components. Once used, this property of the tome can't be used again until the next dawn.",
      ],
      [
        "Only you can remove the tongue from the book's cover. If you do so, all spells written in the book are permanently erased.",
      ],
      [
        'Vecna watches anyone using this tome and can write cryptic messages in it. These messages typically fade away after they are read.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  veterans_cane_dungeon_master_s_guide_2024: {
    name: "Veteran's Cane",
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'As a Bonus Action, you can transform this walking cane into an ordinary Longsword or change the Longsword back into a walking cane. In either case, you must be holding the item.',
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  wand_of_conducting_dungeon_master_s_guide_2024: {
    name: 'Wand of Conducting',
    category: 'Wand',
    rarity: 'common',
    text: [
      ['Weight · 1 lb'],
      [
        'This wand has 3 charges. While holding it, you can take a Magic action to expend 1 charge and create orchestral music by waving it around. The music can be heard out to 120 feet and ends when you stop waving the wand.',
      ],
      [
        "Regaining Charges. The wand regains all expended charges daily at dawn. If you expend the wand's last charge, roll 1d20. On a 1, a sad tuba sound plays as the wand crumbles into dust and is destroyed.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  wand_of_orcus_dungeon_master_s_guide_2024: {
    name: 'Wand of Orcus',
    category: 'Wand',
    detail: 'Mace',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      [
        "Crafted and wielded by Orcus, this ghastly wand slips from the demon lord's grasp from time to time. When it does, it magically appears wherever the demon lord senses an opportunity to achieve some fell goal.",
      ],
      [
        'The wand is topped with a skull that once belonged to a human hero slain by Orcus. The wand can magically change in size to better conform to the grip of its user. All Holy Water within 10 feet of the wand is destroyed.',
      ],
      [
        'Any creature besides Orcus that tries to attune to the wand makes a DC 17 Constitution saving throw. On a successful save, the creature takes 10d6 Necrotic damage. On a failed save, the creature dies and, if it is a Humanoid, turns into a Zombie.',
      ],
      [
        'Magic Weapon. You can wield the wand as a magic Mace that grants a +3 bonus to attack rolls and damage rolls made with it. The wand deals an extra 2d12 Necrotic damage on a hit.',
      ],
      ['Random Properties. The Wand of Orcus has the following random properties:'],
      ['2 minor beneficial properties'],
      ['1 major beneficial property'],
      ['2 minor detrimental properties'],
      ['1 major detrimental property'],
      [
        'The detrimental properties of the Wand of Orcus are suppressed while the wand is attuned to Orcus.',
      ],
      ['Protection. You gain a +3 bonus to Armor Class while holding the wand.'],
      [
        'Spells. The wand has 7 charges and regains 1d4 + 3 expended charges daily at dawn. While holding the wand, you can cast one of the spells on the following table from it (save DC 18). The table indicates how many charges you must expend to cast the spell.',
      ],
      ['Spell · Charge Cost'],
      ['Animate Dead · 1'],
      ['Blight · 2'],
      ['Circle of Death · 3'],
      ['Finger of Death · 3'],
      ['Power Word Kill · 4'],
      ['Speak with Dead · 1'],
      [
        "While attuned to the wand, Orcus or a follower blessed by him can cast each of the wand's spells using 2 fewer charges (minimum of 0).",
      ],
      [
        "Call Undead. While holding the wand, you can take a Magic action to conjure 15 Skeletons and 15 Zombies. These Undead magically rise up from the ground or otherwise form in unoccupied spaces within 300 feet of you and obey your commands until they are destroyed or until the next dawn, when they collapse into inanimate piles of bones and rotting corpses. Once you use this property, you can't use it again until the next dawn.",
      ],
      [
        "While holding the wand, Orcus can summon any kind of Undead, not just skeletons and zombies. These Undead don't perish at dawn the following day, remaining until Orcus dismisses them.",
      ],
      [
        'Sentience. The Wand of Orcus is a sentient Chaotic Evil item with an Intelligence of 16, a Wisdom of 12, and a Charisma of 16. It has hearing and Darkvision out to 120 feet.',
      ],
      ['The wand communicates telepathically with its wielder and speaks Abyssal and Common.'],
      [
        "Personality. The wand's purpose is to help satisfy Orcus's desire to slay everything in the multiverse. The wand is cruel, nihilistic, and bereft of humor.",
      ],
      [
        "To further Orcus's goals, the wand feigns devotion to its current user and makes grandiose promises that it has no intention of fulfilling, such as vowing to help its user overthrow Orcus.",
      ],
      [
        "Destroying the Wand. Destroying the Wand of Orcus requires that it be taken to the Positive Energy Plane by the ancient hero whose skull surmounts it. For this to happen, the long-lost hero must first be restored to life—no easy task, given the fact that Orcus has imprisoned the hero's soul and keeps it hidden and well guarded.",
      ],
      [
        "Bathing the wand in positive energy (such as that which permeates the Positive Plane) causes it to crack and explode, but unless the above conditions are met, the wand instantly re-forms on Orcus's layer of the Abyss.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  wand_of_pyrotechnics_dungeon_master_s_guide_2024: {
    name: 'Wand of Pyrotechnics',
    category: 'Wand',
    rarity: 'common',
    text: [
      ['Weight · 1 lb'],
      [
        'This wand has 7 charges. While holding it, you can take a Magic action to expend 1 charge and create a harmless burst of multicolored light at a point you can see up to 120 feet away. The burst of light is accompanied by a crackling noise that can be heard up to 300 feet away. The light is as bright as a torch flame but lasts only a second.',
      ],
      [
        "Regaining Charges. The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll 1d20. On a 1, the wand erupts in a harmless pyrotechnic display and is destroyed.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  wave_dungeon_master_s_guide_2024: {
    name: 'Wave',
    category: 'Weapon',
    detail: 'Trident',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      [
        'Held in the dungeon of White Plume Mountain, Wave is engraved with images of waves, shells, and sea creatures.',
      ],
      [
        'You gain a +3 bonus to attack rolls and damage rolls made with this magic weapon. When you roll a 20 on the d20 for an attack roll with this weapon, the target takes an extra 21 Necrotic damage.',
      ],
      ['While holding Wave, you gain the following benefits:'],
      ['Combat Ready. You have Advantage on Initiative rolls.'],
      [
        'Underwater Adaptation. A bubble of air forms around your head while you are underwater, allowing you to breathe normally in that environment.',
      ],
      [
        'Aquatic Command. Wave has 3 charges and regains 1d3 expended charges daily at dawn. While you carry it, you can expend 1 charge to cast Dominate Beast (save DC 20) from it on a Beast that has a Swim Speed.',
      ],
      [
        "Globe of Invulnerability. While holding Wave, you can cast the level 9 version of Globe of Invulnerability from it. Once used, this property can't be used again until the next dawn.",
      ],
      [
        'Sentience. Wave is a sentient weapon of Neutral alignment, with an Intelligence of 14, a Wisdom of 10, and a Charisma of 18. It has hearing and Darkvision out to 120 feet.',
      ],
      ['The weapon communicates telepathically with its wielder and speaks Aquan.'],
      [
        "Personality. Wave zealously encourages mortals to worship sea gods and has a habit of humming sea chanteys. Conflict arises if the wielder fails to further the weapon's objectives in the world.",
      ],
      [
        "Destroying Wave. Wave can be destroyed only on the island of Thunderforge, where it was forged. The weapon must be melted down by a storm giant or someone imbued with a storm giant's strength. Destroying Wave angers a god of the sea, who sends powerful agents to attack the island and punish the destroyers.",
      ],
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
  whelm_dungeon_master_s_guide_2024: {
    name: 'Whelm',
    category: 'Weapon',
    detail: 'Warhammer',
    rarity: 'artifact',
    attunement: 'by a dwarf or a creature attuned to a belt of dwarvenkind',
    text: [
      ['Weight · 5 lb'],
      [
        'Whelm is a powerful weapon forged by dwarves and lost in the dungeon of White Plume Mountain.',
      ],
      ['You gain a +3 bonus to attack rolls and damage rolls made with this magic weapon.'],
      [
        'Hurl. Whelm has Thrown with a normal range of 60 feet and a long range of 180 feet. When you hit with a ranged attack roll using Whelm, the target takes an extra 1d8 Force damage, or an extra 4d8 Force damage if the target is a Construct, an Elemental, or a Giant. Immediately after hitting or missing, the weapon flies back to your hand.',
      ],
      [
        'Shock Wave. You can take a Magic action to strike the ground with Whelm and send a shock wave out from the point of impact. Each creature of your choice on the ground within 60 feet of that point must succeed on a DC 20 Constitution saving throw or have the ',
        rules.stunned,
        " condition for 1 minute. A creature repeats the save at the end of each of its turns, ending the effect on itself on a success. Once used, this property can't be used again until the next dawn.",
      ],
      [
        "Supernatural Awareness. While you are holding the weapon, it alerts you to the location of any secret or concealed doors within 30 feet of you. In addition, you can cast Detect Evil and Good or Locate Object from the weapon. Once you cast either spell, you can't cast it from the weapon again until the next dawn.",
      ],
      [
        'Sentience. Whelm is a sentient, Lawful Neutral weapon with an Intelligence of 15, a Wisdom of 12, and a Charisma of 15. It has hearing and Darkvision out to 120 feet.',
      ],
      [
        'The weapon communicates telepathically with its wielder and speaks Dwarvish, Giant, and Goblin.',
      ],
      [
        "Personality. Whelm has ties to the dwarf clan that created it, called the Dankil or the Mightyhammer clan. It longs to be returned to that clan. Whelm's purpose is to protect dwarves. Conflict arises if the wielder doesn't share this goal.",
      ],
      [
        'Destroying Whelm. Whelm can be dissolved in the acidic bile of a recently slain ancient black dragon. It can also be melted down in the forges of the Mightyhammer dwarf clan, but only by the rightful leader of that clan.',
      ],
    ],
    effects: [
      {
        key: 'shock-wave-stunned',
        name: 'Stunned',
        lands: { on: 'failed-save', save: 'con', dc: 20 },
        conditions: [rules.stunned],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.dungeon_master_s_guide_2024,
  },
})
