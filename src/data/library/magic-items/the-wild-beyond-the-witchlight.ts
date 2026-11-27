import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  black_chromatic_rose: {
    name: 'Black Chromatic Rose',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['While this rose is held, it drips acid as a harmless visual effect.'],
      [
        'While holding the rose by its stem, you gain resistance to acid damage. If you would take more than 10 acid damage from a single source (after applying the resistance), the rose disintegrates, and you take no damage instead.',
      ],
      [
        'As an action, you can blow the petals from the rose to produce a 20-foot cone of acid. Each creature in the cone must make a DC 15 Constitution saving throw, taking 3d10 acid damage on a failed save, or half as much damage on a successful one. Using this property destroys the rose.',
      ],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  blue_chromatic_rose: {
    name: 'Blue Chromatic Rose',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['While this rose is held, it crackles with lightning as a harmless visual effect.'],
      [
        'While holding the rose by its stem, you gain resistance to lightning damage. If you would take more than 10 lightning damage from a single source (after applying the resistance), the rose disintegrates, and you take no damage instead.',
      ],
      [
        'As an action, you can blow the petals from the rose to produce a 20-foot cone of lightning. Each creature in the cone must make a DC 15 Constitution saving throw, taking 3d10 lightning damage on a failed save, or half as much damage on a successful one. Using this property destroys the rose.',
      ],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  bobbing_lily_pad: {
    name: 'Bobbing Lily Pad',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      [
        "This magic vehicle is a 10-foot-diameter leaf that floats on water. It has tendrils that propel it across land and across the water's surface (but not underwater), as well as through the air. It has a walking, flying, and swimming speed of 20 feet, and it can hover. It moves according to your spoken directions while you are riding it.",
      ],
      [
        'The lily pad can transport up to 300 pounds without hindrance. It can carry up to twice this weight, but it moves at half speed if it carries more than its normal capacity.',
      ],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  dust_of_corrosion: {
    name: 'Dust of Corrosion',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        'As an action, you can throw this dust into the air, filling a 10-foot cube that extends out from you. Surfaces and objects made of nonmagical ferrous metal in the area instantly corrode and turn to dust, becoming useless and unsalvageable. Any creature in the area that is made wholly or partly out of ferrous metal must make a DC 13 Constitution saving throw, taking 4d8 necrotic damage on a failed save, or half as much damage on a successful one.',
      ],
      [
        'Found in a small packet, this dust is made from finely ground rust monster antennae. There is enough dust in each packet for one use.',
      ],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  eldritch_staff: {
    name: 'Eldritch Staff',
    category: 'Staff',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      [
        'This staff can be wielded as a magic quarterstaff that grants a +1 bonus to attack and damage rolls made with it.',
      ],
      [
        'The staff has 10 charges and regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff is destroyed in an otherwise harmless burst of eldritch energy.',
      ],
      [
        'Eldritch Attack. When you hit with a melee attack using the staff, you can expend up to 3 of its charges. For each charge you expend, the target takes an extra 1d8 lightning damage.',
      ],
      [
        "Eldritch Escape. If you take damage while holding the staff, you can use your reaction to expend 3 of the staff's charges, whereupon you turn ",
        rules.invisible,
        ' and teleport yourself, along with any equipment you are wearing or carrying, up to 60 feet to an unoccupied space that you can see. You remain ',
        rules.invisible,
        ' until the start of your next turn or until you attack, cast a spell, or deal damage.',
      ],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  green_chromatic_rose: {
    name: 'Green Chromatic Rose',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['While this rose is held, it issues green gas as a harmless visual effect.'],
      [
        'While holding the rose by its stem, you gain resistance to poison damage. If you would take more than 10 poison damage from a single source (after applying the resistance), the rose disintegrates, and you take no damage instead.',
      ],
      [
        'As an action, you can blow the petals from the rose to produce a 20-foot cone of poison. Each creature in the cone must make a DC 15 Constitution saving throw, taking 3d10 poison damage on a failed save, or half as much damage on a successful one. Using this property destroys the rose.',
      ],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  iggwilvs_cauldron: {
    name: "Iggwilv's Cauldron",
    category: 'Wondrous Item',
    rarity: 'artifact',
    attunement: 'by a spellcaster',
    text: [
      ['Weight · 80 lb'],
      [
        'Iggwilv crafted this wondrous cauldron with the help of her adoptive mother, the archfey Baba Yaga. The cauldron has two forms. Only Iggwilv or Baba Yaga can change the cauldron from one form to another (by using an action to touch it), which either can do without being attuned to the item. In its first form, the cauldron is made of solid gold and embossed on the outside with images of bare-branched trees, falling leaves, and broomsticks. In its second form, the cauldron is made of iron and embossed on the outside with images of bats, toads, cats, lizards, and snakes—eight of each animal. In either form, the cauldron is roughly 3 feet in diameter and has a 2-foot-wide mouth, a round lid with a molded handle at the top, and eight clawed feet for stability. The cauldron weighs 80 pounds when empty, and it can hold up to 100 gallons of liquid.',
      ],
      [
        "Attunement. Any Humanoid creature that attunes to the cauldron must succeed on a DC 15 Constitution saving throw or be aged to the point of decrepitude. In this state, the creature's speed is halved, the range of its vision and hearing is reduced to 30 feet, and it has disadvantage on all ability checks, attack rolls, and saving throws. The creature will reach the end of its natural life span in 3d8 days. Only a wish spell or divine intervention can reverse this aging effect on the creature.",
      ],
      [
        'Three hags can attune to the cauldron simultaneously, provided they have formed a coven. If the coven disbands, the attunement ends for all three hags.',
      ],
      [
        'Random Properties. Regardless of the form it takes, the cauldron has the following random properties:',
      ],
      [
        "1 minor beneficial property (determined by rolling on the Minor Beneficial Properties table in the Dungeon Master's Guide)",
      ],
      [
        "1 minor detrimental property (determined by rolling on the Minor Detrimental Properties table in the Dungeon Master's Guide)",
      ],
      ['Gold Cauldron. The gold cauldron has the following properties:'],
      [
        'If water is poured into the cauldron and stirred for 1 minute, it transforms into a hearty, hot stew that provides one nourishing meal for up to four people per gallon of water used. The stew remains hot while in the cauldron, then cools naturally after it is removed. The outside of the cauldron remains safe to touch despite the heat of the stew.',
      ],
      [
        "If wine is poured into the cauldron and stirred for 10 minutes, it transforms into a magical elixir that fortifies up to four people per gallon of wine used. Any creature that imbibes the elixir gains 10 temporary hit points. Any of the elixir that isn't consumed within 1 hour vanishes. Once used, this property of the cauldron can't be used again until the next dawn.",
      ],
      [
        'When the cauldron is filled with 90 gallons of water mixed with 10 gallons of wine, it can be used as the focus for a scrying spell. When this spell is cast using the cauldron as its focus, the target of the spell fails its saving throw automatically, and the spell works even if its caster and the target are on different planes of existence. When the spell ends, all the liquid in the cauldron vanishes.',
      ],
      [
        "Dipping the bristles of an ordinary broom into the water-filled cauldron transforms the broom into a broom of flying for 3 days. Once used, this property of the cauldron can't be used again until the next dawn.",
      ],
      ['Iron Cauldron. The iron cauldron has the following properties:'],
      [
        "You can use an action to scream into the empty cauldron, which magically summons a swarm of bats that flies out of the cauldron and acts immediately after you in the initiative order. The swarm obeys your commands and disappears after 1 minute if it hasn't been destroyed by then. Once used, this property of the cauldron can't be used again until the next dawn.",
      ],
      [
        'If at least 1 gallon of blood is poured into the cauldron and stirred for 1 minute, it turns into a cloud of harmless black smoke that erupts from the cauldron and dissipates quickly. At the same time, all Humanoid creatures within a certain radius of the cauldron fall ',
        rules.unconscious,
        ' for 1 hour, except those that are attuned to the cauldron or immune to being ',
        rules.charmed,
        '. The radius of the effect is 100 feet per gallon of blood used. An ',
        rules.unconscious,
        " creature awakens if it takes damage or if someone uses an action to shake or slap it. Once used, this property of the cauldron can't be used again until the next dawn.",
      ],
      [
        "Tying a dead frog or toad to the end of an ordinary branch and dipping it in the water-filled cauldron transforms the branch into a wand of polymorph with 3 charges. This wand can't recharge and crumbles to ashes when its final charge is expended. Once used, this property of the cauldron can't be used again for 8 days.",
      ],
      [
        'If you spend 1 minute touching the cauldron with a unicorn\'s horn while reciting the poem called "The Witch Queen\'s Cauldron" (see the accompanying sidebar), all creatures within 1,000 feet of the cauldron except those that are attuned to it become frozen in time. A time-frozen creature is ',
        rules.incapacitated,
        ", can't move or speak, doesn't age, and is unaware of its surroundings or the passage of time. Moreover, it can't be moved, harmed in any way, or affected by any other magic. All other conditions and effects on the creature are suppressed until it is no longer frozen in time. Destroying the cauldron, sending it to another plane of existence, or touching it with a unicorn's horn for 1 minute while reciting \"The Witch Queen's Cauldron\" ends the time-freezing effect on all creatures. The effect also ends on any creature that comes into contact with an antimagic field or is touched by a unicorn's horn.",
      ],
      [
        'Destroying the Cauldron. The cauldron is a Medium object with AC 19, 80 hit points, and immunity to damage from any source other than a flame tongue or frost brand weapon. Reducing the cauldron to 0 hit points with such a weapon shatters the cauldron into eight pieces of roughly equal size, whereupon all ongoing effects created by the cauldron end as it loses its magic.',
      ],
      [
        'The destruction of Iggwilv\'s Cauldron causes all hags in the multiverse to lose the Shared Spellcasting trait gained by being in a coven (see the "Hag Covens" sidebar in the Monster Manual).',
      ],
      [
        "Reconstructing the Cauldron. If all eight pieces of the shattered cauldron are within 5 feet of one another, a wish spell can reassemble them, restoring the cauldron and all its properties. The cauldron's reconstruction also restores the Shared Spellcasting trait of hag covens throughout the multiverse.",
      ],
      [
        "The Witch Queen's Cauldron. As explained in the description of Iggwilv's Cauldron, the poem titled \"The Witch Queen's Cauldron\" is an incantation that hints at the time-freezing property of the artifact:",
      ],
      ['Eight cats perch atop eight dead attending'],
      ['Eight lizards flee from eight rats scavenging'],
      ['Eight toads climbing meet eight dead and falling'],
      ['Eight snakes sneak under eight bats screaming'],
      ['Eight eyes open, always dreaming'],
      ['All on the cauldron that is ever seeming'],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  ornithopter_of_flying: {
    name: 'Ornithopter of Flying',
    category: 'Wondrous Item',
    rarity: 'very rare',
    text: [
      ['Weight · 25 lb'],
      [
        "You can use this contraption to fly, provided your weight (including whatever you are wearing or carrying) doesn't exceed 300 pounds. The ornithopter has a flying speed of 30 feet, and it moves according to your spoken directions while you are riding it. It can't hover. If the ornithopter loses its rider while airborne, it falls and can't fly again for 1d6 + 4 days.",
      ],
      ['The ornithopter is 8 feet long, has a 14-foot wingspan, and weighs 25 pounds.'],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  pixie_dust: {
    name: 'Pixie Dust',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        'As an action, you can sprinkle this dust on yourself or another creature you can see within 5 feet of you. The recipient gains a flying speed of 30 feet and the ability to hover for 1 minute. If the creature is airborne when this effect ends, it falls safely to the ground, taking no damage and landing on its feet.',
      ],
      ['A small packet holds enough pixie dust for one use.'],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  potion_of_advantage: {
    name: 'Potion of Advantage',
    category: 'Potion',
    rarity: 'uncommon',
    text: [
      [
        'When you drink this potion, you gain advantage on one ability check, attack roll, or saving throw of your choice that you make within the next hour.',
      ],
      ['This potion takes the form of a sparkling, golden mist that moves and pours like water.'],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  red_chromatic_rose: {
    name: 'Red Chromatic Rose',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['While this rose is held, it is wreathed in fire as a harmless visual effect.'],
      [
        'While holding the rose by its stem, you gain resistance to fire damage. If you would take more than 10 fire damage from a single source (after applying the resistance), the rose disintegrates, and you take no damage instead.',
      ],
      [
        'As an action, you can blow the petals from the rose to produce a 20-foot cone of fire. Each creature in the cone must make a DC 15 Constitution saving throw, taking 3d10 fire damage on a failed save, or half as much damage on a successful one. Using this property destroys the rose.',
      ],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  scissors_of_shadow_snipping: {
    name: 'Scissors of Shadow Snipping',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a fey or a spellcaster',
    text: [
      [
        "As an action, you make a few snips with these iron shears and cause the shadow of a Humanoid creature you can see within 5 feet of you to detach from its source. If the creature is unwilling to give up its shadow, it can make a DC 15 Charisma saving throw, retaining its shadow on a success. Whether or not the shadow is snipped, this property of the scissors can't be used again until the next dawn.",
      ],
      [
        'The detached shadow is rooted to the spot where it was snipped until you use a bonus action to cause it to behave in one of the following ways, either of which is possible only if you can see the shadow:',
      ],
      [
        "You control the shadow's movements and can make the shadow move up to 30 feet across a solid or liquid surface, in any direction you choose (including along vertical surfaces), provided it remains within your sight at all times. The shadow is harmless and unable to be harmed, and it is ",
        rules.invisible,
        " in darkness. It can't speak, and it doesn't require air, sleep, or nourishment.",
      ],
      [
        "You can relinquish control of the shadow, at which point it becomes autonomous and behaves as the DM wishes. It uses the shadow stat block in the Monster Manual, but its creature type is Fey instead of Undead. A creature whose Strength is reduced to 0 by this shadow's Strength Drain attack does not die but falls ",
        rules.unconscious,
        ' instead. The creature regains consciousness and all its Strength after finishing a short or long rest.',
      ],
      [
        'A creature whose shadow has detached from it is cursed. If a shadowless creature is subjected to any spell that ends a curse, or if its detached shadow is reduced to 0 hit points, the detached shadow disappears, and the creature regains its normal shadow instantly.',
      ],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  snicker_snack: {
    name: 'Snicker-Snack',
    category: 'Weapon',
    detail: 'Greatsword',
    rarity: 'legendary',
    attunement: 'by a non-evil creature',
    text: [
      ['Weight · 6 lb'],
      [
        "You gain a +3 bonus to attack and damage rolls made with this magic vorpal sword. In addition, the weapon ignores resistance to slashing damage. When you use this weapon to attack a creature that has at least one head and roll a 20 on the attack roll, you cut off one of the creature's heads. The creature dies if it can't survive without the lost head. A creature is immune to this effect if it is immune to slashing damage, it doesn't have or need a head, it has legendary actions, or the DM decides that the creature is too big for its head to be cut off with this weapon. Such a creature instead takes an extra 6d8 slashing damage from the hit.",
      ],
      [
        'While attuned to Snicker-Snack, you have proficiency with greatswords, and you can use your Charisma modifier instead of your Strength modifier for attack and damage rolls made with the weapon.',
      ],
      [
        'Sentience. Snicker-Snack is a sentient, chaotic good greatsword with an Intelligence of 9, a Wisdom of 14, and a Charisma of 18. It has hearing and darkvision out to a range of 120 feet. It can speak, read, and understand Common, and its voice sounds silvery and melodic. Snicker-Snack craves the destruction of evil Dragons and urges you to seek out these creatures and slay them.',
      ],
      [
        "Snicker-Snack has a fickle personality. It ends its attunement to you if you miss on attack rolls with the weapon three times in a row. Each time you finish a long rest after that happens, you can attempt to regain the sword's trust by making a contested Charisma check against Snicker-Snack. If you win the contest, your attunement to the weapon is instantly restored. Your attunement to the weapon can't be restored in any other way.",
      ],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  steel: {
    name: 'Steel',
    category: 'Weapon',
    detail: 'Longsword',
    rarity: 'very rare',
    attunement: 'by a good-aligned creature',
    text: [
      ['Weight · 3 lb'],
      ['You have a +2 bonus to attack and damage rolls made with this magic weapon.'],
      [
        "Revivify. You can use an action to cast the revivify spell from the sword. You must touch the target with the sword to cast the spell. Once this property of the weapon is used, it can't be used again until the next dawn.",
      ],
      [
        "Sentience. Steel is a sentient, lawful good longsword with an Intelligence of 8, a Wisdom of 11, and a Charisma of 15. It can see and hear out to a range of 60 feet. The sword can speak, read, and understand Common and Draconic. It frets over your well-being while you are attuned to it, and it doesn't like to back down from a fight.",
      ],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  white_chromatic_rose: {
    name: 'White Chromatic Rose',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['While this rose is held, it is covered in frost as a harmless visual effect.'],
      [
        'While holding the rose by its stem, you gain resistance to cold damage. If you would take more than 10 cold damage from a single source (after applying the resistance), the rose disintegrates, and you take no damage instead.',
      ],
      [
        'As an action, you can blow the petals from the rose to produce a 20-foot cone of cold. Each creature in the cone must make a DC 15 Constitution saving throw, taking 3d10 cold damage on a failed save, or half as much damage on a successful one. Using this property destroys the rose.',
      ],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  witchlight_vane: {
    name: 'Witchlight Vane',
    category: 'Wondrous Item',
    detail: 'Mace',
    rarity: 'legendary',
    attunement: 'by a mister light or his handpicked successor',
    text: [
      ['Weight · 3 lb'],
      [
        'This ornate rod is topped by a pair of butterfly wings and incorporates bits of red glass into its length. It weighs 3 pounds.',
      ],
      [
        'Magic Weapon. In the hands of one who is attuned to it, the vane can be wielded as a magic mace that grants a +3 bonus to attack and damage rolls made with it. In addition, the vane deals an extra 1d8 radiant damage on a hit.',
      ],
      [
        'Sense Mood. While the vane is inside the perimeter of the Witchlight Carnival, it can sense the mood of every creature in the carnival that has an Intelligence of 4 or higher. As an action, a creature attuned to the vane can use it to pinpoint the location of the happiest creature in the carnival.',
      ],
      [
        'The butterfly shape at the top of the vane spins slowly clockwise when spirits in the carnival are generally high; if the general mood in the carnival is dour, the top of the vane spins slowly counterclockwise.',
      ],
      [
        'Sentience. The vane is a sentient, chaotic good wondrous item with an Intelligence of 11, a Wisdom of 14, and a Charisma of 14. It has hearing and normal vision out to a range of 30 feet, and it communicates by transmitting emotion to the creature attuned to it. Its purpose is to make sure everyone in the Witchlight Carnival is having a good time.',
      ],
      ['Additional Properties. The vane has the following additional properties:'],
      ['The creature holding the vane has vulnerability to lightning damage.'],
      [
        "The creature attuned to the vane can't be ",
        rules.blinded,
        ', ',
        rules.deafened,
        ', ',
        rules.petrified,
        ', or ',
        rules.stunned,
        '.',
      ],
      [
        "While carrying the vane, the creature attuned to it can cast the dancing lights, polymorph, or ray of frost spell as an action, requiring no spell components and using Charisma as the spellcasting ability. After the vane's polymorph spell is cast, roll a d8; on a roll of 3 or 8, the vane can't be used to cast this spell again until the next dawn.",
      ],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  witchlight_watch: {
    name: 'Witchlight Watch',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: 'by a mister witch or his handpicked successor',
    text: [
      [
        "This ornate pocket watch is fastened to the end of a gold chain. It glows with a faint golden light when opened, and it makes a soft ticking noise that can be heard only by the creature holding it. The face of the watch shows a miniature painting of the Witchlight Carnival ringed by a tiny henge, orbited at night by a mote of light small enough to slip through the eye of a needle. This light causes the henge to cast shadows, and these shadows allow the watch's owner to track the passage of time.",
      ],
      [
        "Carnival Setup and Takedown. The creature attuned to the watch can use an action to initiate the packing up or the unpacking of the Witchlight Carnival, provided the creature and the carnival are on the same plane of existence. In the span of 1 hour, all objects that are elements of the carnival are magically whisked about until everything is packed up and ready for travel, or unpacked and assembled. The watch has no effect on creatures, which can move about freely and safely while the carnival is being set up or taken down. Once the process of packing up or unpacking the carnival begins, it can't be stopped until the task is complete. When the watch is used to pack up or unpack the carnival, this property cannot be used again until 8 hours have elapsed.",
      ],
      ['Additional Properties. The pocket watch has the following additional properties:'],
      [
        "While carrying the watch, the creature attuned to it can cast the fire bolt, invisibility, or message spell as an action, requiring no spell components and using Intelligence as the spellcasting ability. After the watch's invisibility spell is cast, roll a d8; on a roll of 3 or 8, the watch can't be used to cast this spell again until the next dawn.",
      ],
      [
        'The creature attuned to the watch gains 30 pounds. This extra weight vanishes when the attunement ends.',
      ],
      [
        'The creature attuned to the watch must eat and drink eight times the normal amount each day.',
      ],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
  woodcutters_axe: {
    name: "Woodcutter's Axe",
    category: 'Weapon',
    detail: 'Greataxe',
    rarity: 'rare',
    text: [
      ['Weight · 7 lb'],
      ['You have a +1 bonus to attack and damage rolls made with this magic weapon.'],
      [
        "When you use this axe to make an attack against a plant (an ordinary plant or a creature with the Plant type) or a wooden object that isn't being worn or carried, the attack deals an extra 2d6 slashing damage on a hit.",
      ],
    ],
    publication: refs.publications.the_wild_beyond_the_witchlight,
  },
})
