import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  ashen_band_of_courage: {
    name: 'Ashen Band of Courage',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: 'by a Character with Ashen Verdict Renown 3+',
    text: [
      [
        "This metal band is adorned with five gleaming crystals suggesting a beast's claw. The forge mark of Ormus the Penitent—a stylized O—is imprinted inside the band.",
      ],
      [
        'While wearing this ring, you have Advantage on saving throws to avoid or end the ',
        rules.charmed,
        ' and ',
        rules.frightened,
        ' conditions.',
      ],
    ],
    publication: refs.publications.world_of_warcraft_icecrown_citadel,
  },
  ashen_band_of_destruction: {
    name: 'Ashen Band of Destruction',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: 'by a Character with Ashen Verdict Renown 3+',
    text: [
      [
        'This thick metal band is adorned with a skull design, with two luminous blue gems serving as eyes. The forge mark of Ormus the Penitent—a stylized O—is imprinted inside the band.',
      ],
      [
        'While wearing this ring, you gain a +1 bonus to spell attack rolls, and your spell saving throw DC increases by 1.',
      ],
    ],
    publication: refs.publications.world_of_warcraft_icecrown_citadel,
  },
  ashen_band_of_might: {
    name: 'Ashen Band of Might',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: 'by a Character with Ashen Verdict Renown 3+',
    text: [
      [
        'This metal band is adorned with a stylized helm design, with purple gems forming the nose guard and crest. The forge mark of Ormus the Penitent—a stylized O—is imprinted inside the band.',
      ],
      ['While wearing this ring, you gain a +1 bonus to damage rolls for melee weapon attacks.'],
    ],
    publication: refs.publications.world_of_warcraft_icecrown_citadel,
  },
  ashen_band_of_vengeance: {
    name: 'Ashen Band of Vengeance',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: 'by a Character with Ashen Verdict Renown 3+',
    text: [
      [
        'This metal band is adorned with a stylized helm design, with deep-blue gems forming the nose guard and crest. The forge mark of Ormus the Penitent—a stylized O—is imprinted inside the band.',
      ],
      [
        'While wearing this ring, you ignore Half Cover when making a ranged weapon attack roll, and you gain a +2 bonus to damage rolls made with ranged weapons.',
      ],
    ],
    publication: refs.publications.world_of_warcraft_icecrown_citadel,
  },
  ashen_band_of_wisdom: {
    name: 'Ashen Band of Wisdom',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: 'by a Character with Ashen Verdict Renown 3+',
    text: [
      [
        'This metal band is adorned with an oval design suggestive of an eye, with a luminous turquoise stone at the center. The forge mark of Ormus the Penitent—a stylized O—is imprinted inside the band.',
      ],
      [
        'While wearing this ring, you can treat any 1 you roll on a die to restore Hit Points to yourself or another creature as a 2.',
      ],
    ],
    publication: refs.publications.world_of_warcraft_icecrown_citadel,
  },
  bauble_of_true_blood: {
    name: 'Bauble of True Blood',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      [
        'The red pendant on this necklace has 9 charges and regains 1d6 expended charges daily at dawn. You can also expend Hit Point Dice when you finish a Short or Long Rest to replenish its charges, with each Hit Die you expend contributing 1 charge.',
      ],
      [
        'You can expend any number of charges to cast Cure Wounds from the bauble, with the number of charges determining the level of the spell (maximum of 9 charges for a level 9 spell).',
      ],
    ],
    publication: refs.publications.world_of_warcraft_icecrown_citadel,
  },
  bloodvenom_blade: {
    name: 'Bloodvenom Blade',
    category: 'Weapon',
    detail: 'Longsword',
    rarity: 'legendary',
    attunement: true,
    text: [
      ['Weight · 3 lb'],
      [
        'You gain a +3 bonus to attack rolls and damage rolls made with this magic weapon. In addition, it deals an extra 2d6 Poison damage to any creature it hits, and the creature has the ',
        rules.poisoned,
        ' condition until the start of your next turn.',
      ],
    ],
    effects: [
      {
        key: 'poisoned',
        name: 'Poisoned',
        lands: { on: 'hit' },
        conditions: [rules.poisoned],
        lasts: { kind: 'turn', boundary: 'start', whose: 'source' },
      },
    ],
    publication: refs.publications.world_of_warcraft_icecrown_citadel,
  },
  fragment_of_frozen_bone: {
    name: 'Fragment of Frozen Bone',
    category: 'Wondrous Item',
    rarity: 'very rare',
    text: [
      [
        'As a Magic action, you can use a command word to cause this tiny piece of bone from Lord Marrowgar\'s remains to transform into a miniature replica of Lord Marrowgar called Boneshard. Boneshard serves as an undead companion creature using the rules in D&D: World of Warcraft. It remains transformed until you use the command word to dismiss it, it takes any damage, or you summon another companion creature. Occasionally it shouts, "BONE STORM!" as it circles you on the ground.',
      ],
    ],
    publication: refs.publications.world_of_warcraft_icecrown_citadel,
  },
  invincibles_reins: {
    name: "Invincible's Reins",
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'These reins are a heavy metal chain attached to a bridle set with glowing blue crystals. The reins have 3 charges and regain 1d3 expended charges daily at dawn. You can expend 1 charge to cast Find Steed (level 5 version).',
      ],
      [
        'When you cast Find Steed from the reins, the summoned steed is Invincible, the mount of Arthas—an Undead horse with mummified flesh, glowing blue eyes, and batlike wings. The steed has the Undead type, deals Necrotic damage with its Otherworldly Slam attack, and has this Bonus Action:',
      ],
      [
        'Ghostly Stride (Undead Only; Recharges After a Long Rest). The steed and its rider can move through other creatures and objects this turn as if they were Difficult Terrain. Both steed and rider take 5 (1d10) Force damage if they end their turn inside an object.',
      ],
      [
        "Invincible is Neutral Evil and unshakably loyal to Arthas, the Lich King. Use the guidelines for conflict with sentient magic items in the Dungeon Master's Guide to determine what happens if Invincible's rider acts contrary to the mount's alignment or in opposition to the Lich King. Invincible can refuse the reins' summons in situations of conflict.",
      ],
    ],
    publication: refs.publications.world_of_warcraft_icecrown_citadel,
  },
  lights_vengeance: {
    name: "Light's Vengeance",
    category: 'Weapon',
    detail: 'Maul',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 10 lb'],
      [
        "Light's Vengeance is the weapon Arthas Menethil wielded during his life as a paladin in service to the Order of the Silver Hand—before his corruption and transformation into the Lich King. An enormous and heavy hammer, its silver head etched with runes of power and its haft wrapped in blue leather, it carries the blessing of the Light. Arthas discarded the weapon when he took up Frostmourne.",
      ],
      [
        'Magic Weapon. You gain a +3 bonus to attack rolls and damage rolls made with this weapon, and it deals an extra 2d10 Radiant damage to Undead.',
      ],
      [
        'Repel Undead. While holding the weapon, you can take the Magic action to cause brilliant light to burst around you in a 30-foot Emanation. Each Undead in the Emanation makes a DC 20 Wisdom saving throw. On a failed save, a target takes 4d8 Radiant damage and has the ',
        rules.frightened,
        ' and ',
        rules.incapacitated,
        ' conditions for 1 minute. While ',
        rules.frightened,
        ', a target must use its movement on each of its turns to move as far from you as it can. This effect ends early on a target if it takes any damage.',
      ],
      [
        "Random Properties. Though Light's Vengeance was blessed by the Light and wielded by the Light's champion, the weapon carries the stain of the Lich King's corruption. The weapon has the following random properties:",
      ],
      ['2 minor beneficial properties'],
      ['1 major beneficial property'],
      ['2 minor detrimental properties'],
      ["Destroying the Weapon. Striking Light's Vengeance with Frostmourne destroys the maul."],
    ],
    effects: [
      {
        key: 'repelled',
        name: 'Repelled',
        lands: { on: 'failed-save', save: 'wis', dc: 20 },
        conditions: [rules.frightened, rules.incapacitated],
        text: [
          'While ',
          rules.frightened,
          ', a target must use its movement on each of its turns to move as far from you as it can. This effect ends early on a target if it takes any damage.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
    ],
    publication: refs.publications.world_of_warcraft_icecrown_citadel,
  },
  ring_of_maddening_whispers: {
    name: 'Ring of Maddening Whispers',
    category: 'Ring',
    rarity: 'legendary',
    attunement: 'by a Spellcaster',
    text: [
      [
        "This ring resembles a fleshy purple tentacle banded with dark metal and suffused with a reddish glow. While wearing it, you can cast Dominate Monster (level 9 version) from it (spell save DC 19). Once you do, you can't use the ring to do so again until the next dawn.",
      ],
      [
        'Whenever a creature makes a successful saving throw against the spell cast from the ring, you take 5d10 Psychic damage and have the ',
        rules.incapacitated,
        ' condition until the end of your next turn, as a chorus of babbling whispers assails your mind.',
      ],
    ],
    effects: [
      {
        key: 'maddening-whispers',
        name: 'Maddening whispers',
        lands: { on: 'use' },
        conditions: [rules.incapacitated],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
    ],
    publication: refs.publications.world_of_warcraft_icecrown_citadel,
  },
  shadowmourne: {
    name: 'Shadowmourne',
    category: 'Weapon',
    detail: 'Greataxe',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 7 lb'],
      [
        "Highlord Darion Mograine transformed Shadow's Edge into Shadowmourne after the weapon had been infused with unholy power, blood magic, and undying frost, along with shadowfrost shards from the Frozen Throne.",
      ],
      ['Magic Weapon. You gain a +3 bonus to attack rolls and damage rolls made with this weapon.'],
      [
        'Soul Fragments. When you hit a creature with a melee attack roll using Shadowmourne, the creature takes an extra 1d12 Necrotic damage, and you gain Temporary Hit Points equal to the Necrotic damage taken.',
      ],
      [
        'Drain Soul. Whenever you use Shadowmourne to reduce a creature to 0 Hit Points, the axe slays the creature and devours its soul unless it is a Construct. A creature whose soul has been devoured by Shadowmourne can be restored to life only by a Wish spell.',
      ],
      [
        "When Shadowmourne devours a soul, you gain Temporary Hit Points equal to the slain creature's Hit Point maximum.",
      ],
      [
        'Chaos Bane. If you have at least 12 Temporary Hit Points, you can take a Bonus Action to sacrifice all your Temporary Hit Points. Each creature of your choice in a 15-foot Emanation originating from you makes a Constitution saving throw (DC 21), taking damage equal to the Temporary Hit Points you sacrificed on a failed save or half as much damage on a successful one. Until the end of your next turn, you have Advantage on attack rolls and saving throws.',
      ],
      [
        "Random Properties. The weapon has the same random properties it had in its final stage as Shadow's Edge:",
      ],
      ['2 minor beneficial properties'],
      ['2 major beneficial properties'],
      ['2 minor detrimental properties'],
      ['2 major detrimental properties'],
      [
        'Destroying the Weapon. The axe can be destroyed by immersing it in a pool of the fresh blood of an Old God. Destroying it frees the souls it devoured.',
      ],
    ],
    effects: [
      {
        key: 'chaos-bane',
        name: 'Chaos Bane',
        lands: { on: 'use' },
        text: [
          'Until the end of your next turn, you have Advantage on attack rolls and saving throws.',
        ],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
    ],
    publication: refs.publications.world_of_warcraft_icecrown_citadel,
  },
  shadows_edge: {
    name: "Shadow's Edge",
    category: 'Weapon',
    detail: 'Greataxe',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 7 lb'],
      [
        "Highlord Darion Mograine of the Knights of the Ebon Blade forged Shadow's Edge in his runeforge, combining the holy power of Light's Vengeance with primordial saronite—the blood of the Old God Yogg-Saron in mineral form—and the toxic venom from two of the Lich King's minions. The result is a mighty axe with the potential, ultimately, to destroy the Lich King.",
      ],
      ['Magic Weapon. You gain a +3 bonus to attack rolls and damage rolls made with this weapon.'],
      [
        "Drain Soul. Whenever you use Shadow's Edge to reduce a creature to 0 Hit Points, the axe slays the creature and devours its soul unless it is a Construct. A creature whose soul has been devoured by Shadow's Edge can be restored to life only by a Wish spell.",
      ],
      [
        "When Shadow's Edge devours a soul, you gain Temporary Hit Points equal to half the slain creature's Hit Point maximum (round down).",
      ],
      ['Random Properties. The weapon has the following random properties:'],
      ['1 minor beneficial property'],
      ['1 minor detrimental property'],
      [
        "Unholy Infusion. Once Shadow's Edge has been infused with Professor Putricide's mutated slime, it gains the following additional random properties:",
      ],
      ['1 minor beneficial property'],
      ['1 major detrimental property'],
      [
        "In addition, when you hit a creature with Shadow's Edge, you can cast Blight (save DC 19) from it on the target as a Bonus Action. Once you use the weapon to cast the spell in this way, you can't do so again until the next dawn.",
      ],
      [
        "Blood Infusion. Once Shadow's Edge has been infused with blood from Lana'thel's Blood Mirror, it gains the following additional random properties:",
      ],
      ['1 major beneficial property'],
      ['1 minor detrimental property'],
      [
        "In addition, when you hit a creature with Shadow's Edge, you can cast Evard's Black Tentacles (save DC 19) from the weapon with an area that includes the target as a Bonus Action. Once you use the weapon to cast the spell in this way, you can't do so again until the next dawn.",
      ],
      [
        "Frost Infusion. Once Shadow's Edge has been infused with frost from Sindragosa's breath, it gains the following additional random properties:",
      ],
      ['1 major beneficial property'],
      ['1 major detrimental property'],
      [
        "In addition, when you hit a creature with Shadow's Edge, you can cast Cone of Cold (save DC 19) from it with an area that includes the target as a Bonus Action. Once you use the weapon to cast the spell in this way, you can't do so again until the next dawn.",
      ],
      [
        "Destroying the Weapon. The axe can be destroyed by melting it down in Highlord Mograine's runeforge, where it was created. Destroying it frees the souls it devoured.",
      ],
    ],
    publication: refs.publications.world_of_warcraft_icecrown_citadel,
  },
  sundial_of_eternal_dusk: {
    name: 'Sundial of Eternal Dusk',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'Despite its name, a Sundial of Eternal Dusk resembles a lantern more than a sundial. A rough shard of green saronite metal hangs suspended above an iron cylinder, flanked by wings sculpted from brass. Glowing green gas billows between the saronite shard and the cylinder, and a smaller green shard bobs between two forked prongs on the bottom of the implement. A curved handle above the larger shard allows the item to be held easily in one hand. While you hold the sundial, you know what time it is.',
      ],
      ['Spellcasting Focus. You can use the sundial as a Spellcasting Focus for your spells.'],
      [
        "Cloak of Shadows. The sundial emits shadow that fills your space with Dim Light, making the space Lightly Obscured and giving you Resistance to Radiant damage. The shadow doesn't obscure your vision.",
      ],
      [
        'Spells. The sundial has 20 charges and regains 1d6 + 3 expended charges daily at dawn. While holding the sundial, you can cast one of the spells on the following table from it (save DC 19). The table indicates how many charges you must expend to cast the spell.',
      ],
      ['Spell · Charge Cost'],
      ['Darkness · 2'],
      ['Dimension Door (the destination must be in Dim Light or Darkness) · 4'],
      ["Evard's Black Tentacles · 4"],
      ['Fear · 3'],
      ['Hunger of Hadar · 3'],
      ['Phantasmal Killer · 4'],
      ['Summon Undead · 3'],
      ['Toll the Dead · 0'],
      ['True Seeing · 6'],
    ],
    publication: refs.publications.world_of_warcraft_icecrown_citadel,
  },
  thrice_fanged_signet: {
    name: 'Thrice Fanged Signet',
    category: 'Ring',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        "This silver ring is adorned with a pyramid shape topped with a glowing blue crystal. The three fangs that give it its name protrude from the underside of the pyramid to pierce the wearer's finger.",
      ],
      [
        "When you cast a spell while wearing this ring, you can let the ring draw your blood to empower the spell. If you do, your current and maximum Hit Points are reduced by 3d6, and the spell's effects are determined as if you had used a spell slot 1 level higher than the slot you used (maximum level 9).",
      ],
    ],
    publication: refs.publications.world_of_warcraft_icecrown_citadel,
  },
  tiny_abomination_in_a_jar: {
    name: 'Tiny Abomination in a Jar',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'When you roll an 11 on the d20 for an attack roll while this monstrous item is on your person, you gain a Mote of Anger—a Tiny, invulnerable mote of glowing red light that orbits your head at a distance of 1d3 feet. A Mote of Anger lasts until you finish a Long Rest. Each Mote of Anger gives you a +2 bonus to damage rolls.',
      ],
      [
        'If you ever have four Motes of Anger at once, they erupt and fill you with rage, allowing you to make an immediate weapon attack with Advantage on the attack roll. The Motes of Anger grant their damage bonuses to this attack if they hit, and they dissipate after the attack whether it hits or misses.',
      ],
      [
        'The tiny abomination floating in this jar appears lifeless, but if you have one or more Motes of Anger, it stirs, growing increasingly animated the more Motes of Anger you have.',
      ],
    ],
    publication: refs.publications.world_of_warcraft_icecrown_citadel,
  },
})
