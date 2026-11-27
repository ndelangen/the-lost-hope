import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  bead_of_nourishment: {
    name: 'Bead of Nourishment',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This spongy, flavorless, gelatinous bead dissolves on your tongue and provides as much nourishment as 1 day of rations.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  bead_of_refreshment_xanathar_s_guide_to_everything: {
    name: 'Bead of Refreshment',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This spongy, flavorless, gelatinous bead dissolves in liquid, transforming up to a pint of the liquid into fresh, cold drinking water. The bead has no effect on magical liquids or harmful substances such as poison.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  boots_of_false_tracks_xanathar_s_guide_to_everything: {
    name: 'Boots of False Tracks',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'Only humanoids can wear these boots. While wearing the boots, you can choose to have them leave tracks like those of another kind of humanoid of your size.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  candle_of_the_deep_xanathar_s_guide_to_everything: {
    name: 'Candle of the Deep',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'The flame of this candle is not extinguished when immersed in water. It gives off light and heat like a normal candle.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  charlatans_die_xanathar_s_guide_to_everything: {
    name: "Charlatan's Die",
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: true,
    text: [['Whenever you roll this six-sided die, you can control which number it rolls.']],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  cloak_of_billowing_xanathar_s_guide_to_everything: {
    name: 'Cloak of Billowing',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      ['While wearing this cloak, you can use a bonus action to make it billow dramatically.'],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  cloak_of_many_fashions_xanathar_s_guide_to_everything: {
    name: 'Cloak of Many Fashions',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "While wearing this cloak, you can use a bonus action to change the style, color, and apparent quality of the garment. The cloak's weight doesn't change. Regardless of its appearance, the cloak can't be anything but a cloak. Although it can duplicate the appearance of other magic cloaks, it doesn't gain their magical properties.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  clockwork_amulet_xanathar_s_guide_to_everything: {
    name: 'Clockwork Amulet',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This copper amulet contains tiny interlocking gears and is powered by magic from Mechanus, a plane of clockwork predictability. A creature that puts an ear to the amulet can hear faint ticking and whirring noises coming from within.',
      ],
      [
        "When you make an attack roll while wearing the amulet, you can forgo rolling the d20 to get a 10 on the die. Once used, this property can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  clothes_of_mending_xanathar_s_guide_to_everything: {
    name: 'Clothes of Mending',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This elegant outfit of traveler's clothes magically mends itself to counteract daily wear and tear. Pieces of the outfit that are destroyed can't be repaired in this way.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  dark_shard_amulet_xanathar_s_guide_to_everything: {
    name: 'Dark Shard Amulet',
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: 'by a warlock',
    text: [
      [
        'This amulet is fashioned from a single shard of resilient extraplanar material originating from the realm of your warlock patron. While you are wearing it, you gain the following benefits:',
      ],
      ['You can use the amulet as a spellcasting focus for your warlock spells.'],
      [
        "You can try to cast a cantrip that you don't know. The cantrip must be on the warlock spell list, and you must make a DC 10 Intelligence (Arcana) check. If the check succeeds, you cast the spell. If the check fails, so does the spell, and the action used to cast the spell is wasted. In either case, you can't use this property again until you finish a long rest.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  dread_helm_xanathar_s_guide_to_everything: {
    name: 'Dread Helm',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [['This fearsome steel helm makes your eyes glow red while you wear it.']],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  ear_horn_of_hearing_xanathar_s_guide_to_everything: {
    name: 'Ear Horn of Hearing',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'While held up to your ear, this horn suppresses the effects of the ',
        rules.deafened,
        ' condition on you, allowing you to hear normally.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  enduring_spellbook_xanathar_s_guide_to_everything: {
    name: 'Enduring Spellbook',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This spellbook, along with anything written on its pages, can't be damaged by fire or immersion in water. In addition, the spellbook doesn't deteriorate with age.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  ersatz_eye_xanathar_s_guide_to_everything: {
    name: 'Ersatz Eye',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This artificial eye replaces a real one that was lost or removed. While the ersatz eye is embedded in your eye socket, it can't be removed by anyone other than you, and you can see through the tiny orb as though it were a normal eye.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  hat_of_vermin_xanathar_s_guide_to_everything: {
    name: 'Hat of Vermin',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This hat has 3 charges. While holding the hat, you can use an action to expend 1 of its charges and speak a command word that summons your choice of a bat, a frog, or a rat. The summoned creature magically appears in the hat and tries to get away from you as quickly as possible. The creature is neither friendly nor hostile, and it isn't under your control. It behaves as an ordinary creature of its kind and disappears after 1 hour or when it drops to 0 hit points. The hat regains all expended charges daily at dawn.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  hat_of_wizardry_xanathar_s_guide_to_everything: {
    name: 'Hat of Wizardry',
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: 'by a wizard',
    text: [
      [
        'This antiquated, cone—shaped hat is adorned with gold crescent moons and stars. While you are wearing it, you gain the following benefits:',
      ],
      ['You can use the hat as a spellcasting focus for your wizard spells.'],
      [
        "You can try to cast a cantrip that you don't know. The cantrip must be on the wizard spell list, and you must make a DC 10 Intelligence (Arcana) check. If the check succeeds, you cast the spell. If the check fails, so does the spell, and the action used to cast the spell is wasted. In either case, you can't use this property again until you finish a long rest.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  hewards_handy_spice_pouch_xanathar_s_guide_to_everything: {
    name: "Heward's Handy Spice Pouch",
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This belt pouch appears empty and has 10 charges. While holding the pouch, you can use an action to expend 1 of its charges, speak the name of any nonmagical food seasoning (such as salt, pepper, saffron, or cilantro), and remove a pinch of the desired seasoning from the pouch. A pinch is enough to season a single meal. The pouch regains 1d6 + 4 expended charges daily at dawn.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  horn_of_silent_alarm_xanathar_s_guide_to_everything: {
    name: 'Horn of Silent Alarm',
    category: 'Wondrous Item',
    detail: 'Horn',
    rarity: 'common',
    text: [
      [
        "This horn has 4 charges. When you use an action to blow it, one creature of your choice can hear the horn's blare, provided the creature is within 600 feet of the horn and not ",
        rules.deafened,
        '. No other creature hears sound coming from the horn. The horn regains 1d4 expended charges daily at dawn.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  instrument_of_illusions_xanathar_s_guide_to_everything: {
    name: 'Instrument of Illusions',
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: true,
    text: [
      [
        'While you are playing this musical instrument, you can create harmless, illusory visual effects within a 5-foot-radius sphere centered on the instrument. If you are a bard, the radius increases to 15 feet. Sample visual effects include luminous musical notes, a spectral dancer, butterflies, and gently falling snow. The magical effects have neither substance nor sound, and they are obviously illusory. The effects end when you stop playing.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  instrument_of_scribing_xanathar_s_guide_to_everything: {
    name: 'Instrument of Scribing',
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: true,
    text: [
      [
        'This musical instrument has 3 charges. While you are playing it, you can use an action to expend 1 charge from the instrument and write a magical message on a nonmagical object or surface that you can see within 30 feet of you. The message can be up to six words long and is written in a language you know. If you are a bard, you can scribe an additional seven words and choose to make the message glow faintly, allowing it to be seen in nonmagical darkness. Casting dispel magic on the message erases it. Otherwise, the message fades away after 24 hours.',
      ],
      ['The instrument regains all expended charges daily at dawn.'],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  lock_of_trickery_xanathar_s_guide_to_everything: {
    name: 'Lock of Trickery',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This lock appears to be an ordinary lock (of the type described in chapter 5 of the Player's Handbook) and comes with a single key. The tumblers in this lock magically adjust to thwart burglars. Dexterity checks made to pick the lock have disadvantage.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  mystery_key_xanathar_s_guide_to_everything: {
    name: 'Mystery Key',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "A question mark is worked into the head of this key. The key has a 5 percent chance of unlocking any lock into which it's inserted. Once it unlocks something, the key disappears.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  orb_of_direction_xanathar_s_guide_to_everything: {
    name: 'Orb of Direction',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      ['Weight · 3 lb'],
      [
        'While holding this orb, you can use an action to determine which way is north. This property functions only on the Material Plane.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  orb_of_time_xanathar_s_guide_to_everything: {
    name: 'Orb of Time',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      ['Weight · 3 lb'],
      [
        'While holding this orb, you can use an action to determine whether it is morning, afternoon, evening, or nighttime outside. This property functions only on the Material Plane.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  perfume_of_bewitching_xanathar_s_guide_to_everything: {
    name: 'Perfume of Bewitching',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This tiny vial contains magic perfume, enough for one use. You can use an action to apply the perfume to yourself, and its effect lasts 1 hour. For the duration, you have advantage on all Charisma checks directed at humanoids of challenge rating 1 or lower. Those subjected to the perfume's effect are not aware that they've been influenced by magic.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  pipe_of_smoke_monsters_xanathar_s_guide_to_everything: {
    name: 'Pipe of Smoke Monsters',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'While smoking this pipe, you can use an action to exhale a puff of smoke that takes the form of a single creature, such as a dragon, a flumph, or a froghemoth. The form must be small enough to fit in a 1-foot cube and loses its shape after a few seconds, becoming an ordinary puff of smoke.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  pole_of_angling_xanathar_s_guide_to_everything: {
    name: 'Pole of Angling',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'While holding this 10-foot pole, you can speak a command word and transform it into a fishing pole with a hook, a line, and a reel. Speaking the command word again changes the fishing pole back into a normal 10-foot pole.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  pole_of_collapsing_xanathar_s_guide_to_everything: {
    name: 'Pole of Collapsing',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "While holding this 10-foot pole, you can use an action to speak a command word and cause it to collapse into a 1-foot-long rod, for ease of storage. The pole's weight doesn't change. You can use an action to speak a different command word and cause the rod to revert to a pole; however, the rod will elongate only as far as the surrounding space allows.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  pot_of_awakening_xanathar_s_guide_to_everything: {
    name: 'Pot of Awakening',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'If you plant an ordinary shrub in this 10-pound clay pot and let it grow for 30 days, the shrub magically transforms into an awakened shrub at the end of that time. When the shrub awakens, its roots break the pot, destroying it.',
      ],
      ['The awakened shrub is friendly toward you. Absent commands from you, it does nothing.'],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  rope_of_mending_xanathar_s_guide_to_everything: {
    name: 'Rope of Mending',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'You can cut this 50-foot coil of hempen rope into any number of smaller pieces, and then use an action to speak a command word and cause the pieces to knit back together. The pieces must be in contact with each other and not otherwise in use. A rope of mending is forever shortened if a section of it is lost or destroyed.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  ruby_of_the_war_mage_xanathar_s_guide_to_everything: {
    name: 'Ruby of the War Mage',
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: 'by a spellcaster',
    text: [
      [
        "Etched with eldritch runes, this 1-inch-diameter ruby allows you to use a simple or martial weapon as a spellcasting focus for your spells. For this property to work, you must attach the ruby to the weapon by pressing the ruby against it for at least 10 minutes. Thereafter, the ruby can't be removed unless you detach it as an action or the weapon is destroyed. Not even an antimagic field causes it to fall off. The ruby does fall off the weapon if your attunement to the ruby ends.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  shield_of_expression_xanathar_s_guide_to_everything: {
    name: 'Shield of Expression',
    category: 'Shield',
    rarity: 'common',
    text: [
      ['Weight · 6 lb'],
      [
        "The front of this shield is shaped in the likeness of a face. While bearing the shield, you can use a bonus action to alter the face's expression.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  staff_of_adornment_xanathar_s_guide_to_everything: {
    name: 'Staff of Adornment',
    category: 'Staff',
    rarity: 'common',
    text: [
      ['Weight · 4 lb'],
      [
        "If you place an object weighing no more than 1 pound (such as a shard of crystal, an egg, or a stone) above the tip of the staff while holding it, the object floats an inch from the staff's tip and remains there until it is removed or until the staff is no longer in your possession. The staff can have up to three such objects floating over its tip at any given time. While holding the staff, you can make one or more of the objects slowly spin or turn in place.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  staff_of_birdcalls_xanathar_s_guide_to_everything: {
    name: 'Staff of Birdcalls',
    category: 'Staff',
    rarity: 'common',
    text: [
      ['Weight · 4 lb'],
      [
        "This wooden staff is decorated with bird carvings. It has 10 charges. While holding it, you can use an action to expend 1 charge from the staff and cause it to create one of the following sounds out to a range of 60 feet: a finch's chirp, a raven's caw, a duck's quack, a chicken's cluck, a goose's honk, a loon's call, a turkey's gobble, a seagull's cry, an owl's hoot, or an eagle's shriek.",
      ],
      [
        'The staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff explodes in a harmless cloud of bird feathers and is lost forever.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  staff_of_flowers_xanathar_s_guide_to_everything: {
    name: 'Staff of Flowers',
    category: 'Staff',
    rarity: 'common',
    text: [
      ['Weight · 4 lb'],
      [
        'This wooden staff has 10 charges. While holding it, you can use an action to expend 1 charge from the staff and cause a flower to sprout from a patch of earth or soil within 5 feet of you, or from the staff itself. Unless you choose a specific kind of flower, the staff creates a mild-scented daisy. The flower is harmless and nonmagical, and it grows or withers as a normal flower would. The staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff turns into flower petals and is lost forever.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  talking_doll_xanathar_s_guide_to_everything: {
    name: 'Talking Doll',
    category: 'Wondrous Item',
    rarity: 'common',
    attunement: true,
    text: [
      [
        'While this stuffed doll is within 5 feet of you, you can spend a short rest telling it to say up to six phrases, none of which can be more than six words long, and set an observable condition under which the doll speaks each phrase. You can also replace old phrases with new ones. Whatever the condition, it must occur within 5 feet of the doll to make it speak. For example, whenever someone picks up the doll, it might say, "I want a piece of candy." The doll\'s phrases are lost when your attunement to the doll ends.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  tankard_of_sobriety_xanathar_s_guide_to_everything: {
    name: 'Tankard of Sobriety',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This tankard has a stern face sculpted into one side. You can drink ale, wine, or any other nonmagical alcoholic beverage poured into it without becoming inebriated. The tankard has no effect on magical liquids or harmful substances such as poison.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  unbreakable_arrow: {
    name: 'Unbreakable Arrow',
    category: 'Ammunition',
    rarity: 'common',
    text: [["This arrow can't be broken, except when it is within an antimagic field."]],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  veterans_cane_xanathar_s_guide_to_everything: {
    name: "Veteran's Cane",
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'When you grasp this walking cane and use a bonus action to speak the command word, it transforms into an ordinary longsword and ceases to be magical.',
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  wand_of_conducting_xanathar_s_guide_to_everything: {
    name: 'Wand of Conducting',
    category: 'Wand',
    rarity: 'common',
    text: [
      ['Weight · 1 lb'],
      [
        'This wand has 3 charges. While holding it, you can use an action to expend 1 of its charges and create orchestral music by waving it around. The music can be heard out to a range of 60 feet and ends when you stop waving the wand.',
      ],
      [
        "The wand regains all expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, a sad tuba sound plays as the wand crumbles to dust and is destroyed.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  wand_of_pyrotechnics_xanathar_s_guide_to_everything: {
    name: 'Wand of Pyrotechnics',
    category: 'Wand',
    rarity: 'common',
    text: [
      ['Weight · 1 lb'],
      [
        'This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges and create a harmless burst of multicolored light at a point you can see up to 60 feet away. The burst of light is accompanied by a crackling noise that can be heard up to 300 feet away. The light is as bright as a torch flame but lasts only a second.',
      ],
      [
        "The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand erupts in a harmless pyrotechnic display and is destroyed.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  wand_of_scowls: {
    name: 'Wand of Scowls',
    category: 'Wand',
    rarity: 'common',
    text: [
      ['Weight · 1 lb'],
      [
        'This wand has 3 charges. While holding it, you can use an action to expend 1 of its charges and target a humanoid you can see within 30 feet of you. The target must succeed on a DC 10 Charisma saving throw or be forced to scowl for 1 minute.',
      ],
      [
        "The wand regains all expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand transforms into a wand of smiles.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
  wand_of_smiles: {
    name: 'Wand of Smiles',
    category: 'Wand',
    rarity: 'common',
    text: [
      ['Weight · 1 lb'],
      [
        'This wand has 3 charges. While holding it, you can use an action to expend 1 of its charges and target a humanoid you can see within 30 feet of you. The target must succeed on a DC 10 Charisma saving throw or be forced to smile for 1 minute.',
      ],
      [
        "The wand regains all expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand transforms into a wand of scowls.",
      ],
    ],
    publication: refs.publications.xanathar_s_guide_to_everything,
  },
})
