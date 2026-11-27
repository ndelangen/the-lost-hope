import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  crystal_ball_of_ominous_portent: {
    name: 'Crystal Ball of Ominous Portent',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'Black-and-scarlet clouds of ominous magic swirl inside this crystal orb. While touching the orb, you can cast Hex or Scrying (save DC 17) with it.',
      ],
      [
        "In addition, when a creature you can see within 60 feet succeeds on a D20 Test, you can take a Reaction to turn the roll into a 1. Once used, this property can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.arcana_unleashed_deadfall,
  },
  eyes_of_deceit: {
    name: 'Eyes of Deceit',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        'These tinted crystal lenses shroud your eyes. While wearing them, you gain a +5 bonus to Charisma (Deception) checks.',
      ],
    ],
    publication: refs.publications.arcana_unleashed_deadfall,
  },
  masqueraders_brooch: {
    name: "Masquerader's Brooch",
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        "A Masquerader's Brooch comes in various shapes and sizes but always looks slightly tarnished.",
      ],
      ['You gain the following benefits while wearing the brooch.'],
      [
        'Illusory Fashion. As a Bonus Action while wearing or holding the brooch, you can project a magical illusion over your clothing, armor, weapons, equipment, and other belongings on your person. The illusion lasts for 1 hour and ends early if the brooch is removed. Each time you use this benefit, you determine the extent and nature of the illusion. It could be as minor as changing the color of your garments or as extensive as making a suit of armor appear as an evening gown and a sheathed weapon appear as a satin sash.',
      ],
      [
        'The changes wrought by this illusion fail to hold up to physical inspection. A creature that takes the Study action to examine your appearance discerns the illusion with a successful DC 13 Intelligence (Investigation) check.',
      ],
      [
        'Shifting Guise. As a Magic action while wearing or holding the brooch, you can cast Alter Self from it (Change Appearance option only; no Concentration required).',
      ],
    ],
    publication: refs.publications.arcana_unleashed_deadfall,
  },
  ring_of_candor: {
    name: 'Ring of Candor',
    category: 'Ring',
    rarity: 'uncommon',
    text: [
      [
        "While wearing this simple metal band, you gain a +5 bonus to Wisdom (Insight) checks. In addition, you can cast Zone of Truth (save DC 13) from the ring. You can't cast Zone of Truth in this way again until the next dawn.",
      ],
    ],
    publication: refs.publications.arcana_unleashed_deadfall,
  },
  robe_of_thayan_arcana: {
    name: 'Robe of Thayan Arcana',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: 'by a Sorcerer, Warlock, or Wizard',
    text: [
      [
        'Mysterious symbols decorate this deep-red robe. You gain the following benefits while wearing the robe.',
      ],
      ['Combat Mage. Your spell save DC and spell attack bonus each increase by 1.'],
      [
        'Empowered Magic. When you roll damage for a spell, you can treat any 1 on a damage die as a 2.',
      ],
      ['Spellcasting Focus. You can use the robe as a Spellcasting Focus for your spells.'],
    ],
    publication: refs.publications.arcana_unleashed_deadfall,
  },
  scarlet_spellbook: {
    name: 'Scarlet Spellbook',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a Wizard',
    text: [
      [
        'Irregular scraps of red cloth cover this weathered tome. While attuned to this item, you can use it as a Spellbook and an Arcane Focus.',
      ],
      [
        'Arcane Stamina. When you use your Arcane Recovery feature, you also regain Hit Points equal to 2d6 plus half your Wizard level (round down).',
      ],
      [
        'Improved Spell Recall. When you use your Memorize Spell feature, you can replace an additional level 1+ Wizard spell you have prepared for your Spellcasting feature with another level 1+ spell inscribed in this book.',
      ],
    ],
    publication: refs.publications.arcana_unleashed_deadfall,
  },
  spirit_binding_censer: {
    name: 'Spirit-Binding Censer',
    category: 'Wondrous Item',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['This brass censer is comfortingly warm to the touch.'],
      [
        'Spellcasting. The censer has 10 charges and regains 1d6 charges daily at dawn. While holding the censer, you can cast a spell on the Censer Spells table from it (save DC 18). The table indicates how many charges you must expend to cast the spell.',
      ],
      ['Table: Censer Spells'],
      ['Spell · Charge Cost'],
      ['Banishment · 4'],
      ['Bless · 1'],
      ['Circle of Power · 5'],
      ['Dispel Magic · 3'],
      ['Remove Curse · 3'],
      [
        "Protective Incense. As a Magic action while holding the censer, you can cause magical smoke to billow from the censer, filling a 30-foot Emanation originating from the censer for 1 hour or until you end it (no action required). The area of the Emanation is Lightly Obscured, and creatures of your choice (including yourself) gain the benefits of the Protection from Evil and Good spell while within the Emanation. Once used, this property can't be used again until the next dawn.",
      ],
      [
        "Spirit Imprisonment. When a creature dies within 30 feet of you while you're holding the censer, you can siphon the creature's soul into the censer, trapping it within.",
      ],
      [
        "While a creature's soul is trapped within the censer, that creature can't be restored to life. If the creature had a trait that would allow it to revive, such as a Barbed Devil's Diabolical Restoration trait or a Lich's Spirit Jar trait, that trait doesn't function while the creature's soul is trapped. The censer can contain only one soul at a time. A creature's soul remains trapped within the censer for 100 years, until you take a Magic action to release the soul, or until the censer is destroyed (see \"Destroying the Censer\" below).",
      ],
      [
        "Random Properties. The censer has the following random properties (see the Dungeon Master's Guide):",
      ],
      ['1 minor beneficial property'],
      ['1 major beneficial property'],
      [
        "Destroying the Censer. If it doesn't contain a soul, the censer is destroyed after being submerged in the River Styx for 1 year.",
      ],
    ],
    publication: refs.publications.arcana_unleashed_deadfall,
  },
  staff_of_the_spirit_aegis: {
    name: 'Staff of the Spirit Aegis',
    category: 'Staff',
    rarity: 'legendary',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      [
        'This weathered bone staff is topped with a skull and decorated with vertebrae. It can be wielded as a magic Quarterstaff that grants a +3 bonus to attack rolls and damage rolls made with it. While holding the staff, you have Resistance to Necrotic damage.',
      ],
      [
        'Aura of Haunted Power. As a Magic action while holding the staff, you can cause it to radiate supernatural power that fills a 30-foot Emanation originating from you. Creatures of your choice in this Emanation (including yourself) gain the following benefits:',
      ],
      ['Undead Deterrent. Undead have Disadvantage on attack rolls against the creatures.'],
      [
        'Unholy Protection. The creatures have Resistance to Cold, Necrotic, and Psychic damage, and they have Advantage on saving throws to avoid or end the ',
        rules.frightened,
        ' condition.',
      ],
      [
        "The Emanation lasts for 1 hour or until you end it (no action required). Once used, this property can't be used again until the next dawn.",
      ],
      [
        'Illuminating Sight. As a Bonus Action while holding the staff, you can cause the eye sockets of the skull atop the staff to emit an unearthly glow; this glow lasts until you stop it (no action required). While the staff glows, it sheds Bright Light in a 15-foot radius and Dim Light for an additional 15 feet. ',
        rules.invisible,
        " creatures and objects are visible as long as they are in the staff's Bright Light or Dim Light.",
      ],
    ],
    publication: refs.publications.arcana_unleashed_deadfall,
  },
  wand_of_enthralling: {
    name: 'Wand of Enthralling',
    category: 'Wand',
    rarity: 'uncommon',
    attunement: 'by a Spellcaster',
    text: [
      [
        'This wand has 4 charges and regains 1d4 expended charges daily at dawn. While holding it, you can expend 1 charge to cast Enthrall (save DC 15) from it.',
      ],
    ],
    publication: refs.publications.arcana_unleashed_deadfall,
  },
})
