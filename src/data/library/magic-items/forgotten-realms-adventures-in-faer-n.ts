import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  calimemnon_crystal: {
    name: 'Calimemnon Crystal',
    category: 'Wondrous Item',
    rarity: 'artifact',
    attunement: true,
    text: [
      [
        'This immaculately cut sixty-sided diamond fits in one hand, yet it contains an entire genie empire. The Calimemnon Crystal was made by high elf magic to imprison the notorious genie lords Calim and Memnon, who once ruled and warred over what is now Calimshan.',
      ],
      [
        'When viewed by a creature with Truesight, the normally beautiful diamond is a grotesque sight: trapped within the gemstone are more than a hundred genies, including the physical forms of Calim and Memnon. The genies scream and strain in agonized fury, pressing their belligerent faces against the walls of their crystal line prison.',
      ],
      ['Properties of the Crystal. While attuned to the crystal, you gain the following benefits:'],
      ['Arcane Focus. You can use the Calimemnon Crystal as an Arcane Focus.'],
      ['Flight. You have a Fly Speed of 30 feet and can hover.'],
      [
        'Spells. You can cast these spells with the crystal (spell save DC 18): Create or Destroy Water, Enlarge/Reduce, Invisibility (targeting yourself only), and Major Image.',
      ],
      [
        "Aura of Cold. The temperature drops precipitously in a 20-foot Emanation originating from the crystal. Whenever the Emanation enters a creature's space and whenever a creature enters the Emanation or ends its turn there, the creature takes (2d6) Cold damage. A creature takes this damage only once per turn. While attuned to the crystal, you are unaffected by the aura, and you can take a Magic action to disable or enable the aura.",
      ],
      [
        'Healing/Damage Rays. While holding the crystal, you can take a Magic action to fire six rays of volatile energy from the crystal at one or more creatures within 60 feet. You can aim the rays at one target or at several. For each ray, choose one of the following effects:',
      ],
      [
        'Damage Ray. The target makes a DC 18 Dexterity saving throw, taking (6d6 + 6) Radiant damage on a failed save or half as much damage on a successful one.',
      ],
      ['Healing Ray. The target regains 2d6 + 2 Hit Points.'],
      ["This property can't be used again until the next dawn."],
      [
        "Random Properties. The Artifact has the following random properties (see chapter 7 of the Dungeon Master's Guide):",
      ],
      ['1 minor beneficial property'],
      ['1 major beneficial property'],
      ['1 minor detrimental property'],
      ['1 major detrimental property'],
      [
        'Destroying the Crystal. The Calimemnon Crystal is destroyed if the creature attuned to it casts the Wish spell and wishes the crystal destroyed. Nothing else can harm it. When the crystal is destroyed, all the genies in the crystal are released.',
      ],
    ],
    publication: refs.publications.forgotten_realms_adventures_in_faer_n,
  },
  crown_of_horns: {
    name: 'Crown of Horns',
    category: 'Wondrous Item',
    rarity: 'artifact',
    attunement: true,
    text: [
      [
        "The Crown of Horns contains the essence and intelligence of Myrkul, one of the Dead Three. This ghastly crown is a pale silver circlet with four curved bones set around its rim. On the crown's brow is set a black diamond whose depths swirl with weird, malignant energy.",
      ],
      [
        'Myrkul created the Crown of Horns at the height of his power. When Myrkul was slain by Mystra, he imbued the crown with his dying essence. Myrkul has since returned to become one of the Dead Three, and the Crown of Horns continues to further his gruesome will by seeking out mortal agents and gradually transforming them into powerful Undead scions. Should a wearer prove unworthy of this honor, the crown teleports away to find a new mortal to corrupt for its master.',
      ],
      [
        'Cursed. The crown is cursed. Attuning to the crown extends the curse to you. Only a Wish spell or the will of Myrkul can remove this curse. As long as you remain cursed, the following properties apply to you:',
      ],
      [
        "Bound. You are unwilling to part with the crown, wearing it at all times, and you can't voluntarily end your Attunement to the crown.",
      ],
      ['Cruel. Your alignment becomes Neutral Evil.'],
      [
        "Doomed. You slowly transform into a monstrous servant of Myrkul over the course of 365 days. During that time, the transformation is purely cosmetic; these cosmetic changes slowly fade if you end Attunement to the crown before completing the transformation. When the transformation is complete, you become a Lich under the DM's control. Each time you use this Artifact's Cone of Undeath or Myrkul's Hand benefit, there is a 10 percent cumulative chance that you instantly complete this transformation.",
      ],
      [
        'Cone of Undeath. You can take a Magic action to unleash a wave of unholy light in a 60-foot Cone. Each creature in the Cone makes a DC 18 Constitution saving throw, taking (4d8) Necrotic damage on a failed save or half as much damage on a successful one. A Humanoid killed by Cone of Undeath rises at the start of your next turn as a Specter that follows your verbal orders.',
      ],
      ['Damage Immunity. You have Immunity to Necrotic damage.'],
      [
        'Fear Aura. While wearing the crown, you emit an aura of terrifying energy in a 60-foot Emanation. A creature that enters this area for the first time on a turn or starts its turn there must succeed on a DC 16 Wisdom saving throw or have the ',
        rules.frightened,
        ' condition. A ',
        rules.frightened,
        ' target must use its movement on its turns to get as far away as possible from you, moving by the safest route.',
      ],
      [
        'If you damage a ',
        rules.frightened,
        ' target or if a ',
        rules.frightened,
        ' target ends its turn more than 120 feet away from you, the target can repeat the Wisdom save, ending the condition on itself on a success. A creature that succeeds on the save against this effect is immune to it for 1 minute, after which it can be affected again.',
      ],
      [
        'The aura is inactive while you have the ',
        rules.incapacitated,
        ' condition. You can activate or deactivate the aura as a Bonus Action.',
      ],
      [
        "Myrkul's Hand. While wearing the crown, you can cast the Power Word Kill spell (save DC 18) from it. A Humanoid killed by this spell rises at the start of your next turn as a Wraith that follows your verbal orders. Once you use the crown to cast this spell, you can't cast it again from the crown until the next dawn.",
      ],
      [
        "Teleportation. While wearing the crown, you can cast the Teleport spell. The crown can also cast this spell of its own free will. Once the spell has been cast using the crown, it can't be cast again until 7 days have passed.",
      ],
      [
        "Random Properties. The Artifact has the following random properties (see chapter 7 of the Dungeon Master's Guide):",
      ],
      ['1 minor beneficial property'],
      ['1 minor detrimental property'],
      ['1 major detrimental property'],
      [
        'Sentience. The Crown of Horns is a sentient Neutral Evil Artifact with an Intelligence of 10, a Wisdom of 16, and a Charisma of 19. It has hearing and Darkvision out to 120 feet.',
      ],
      ['The crown communicates telepathically with its wearer and knows Common.'],
      [
        "Personality. The crown contains the essence of Myrkul and exists to spread that god's will, which is to slay the living, raise the dead, and sow fear across the Material Plane. The crown urges its wearer to spread dread and destruction wherever possible.",
      ],
      [
        "Destroying the Crown. The crown is destroyed if it is worn by Myrkul's successor, Kelemvor, while he sits on the throne of Myrkul's former realm, the Bone Castle.",
      ],
    ],
    effects: [
      {
        key: 'fear-aura',
        name: 'Frightened by the Crown',
        lands: { on: 'failed-save', save: 'wis', dc: 16 },
        conditions: [rules.frightened],
        text: [
          'A ',
          rules.frightened,
          ' target must use its movement on its turns to get as far away as possible from you, moving by the safest route.',
          ' If you damage a ',
          rules.frightened,
          ' target or if a ',
          rules.frightened,
          ' target ends its turn more than 120 feet away from you, the target can repeat the Wisdom save, ending the condition on itself on a success.',
        ],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.forgotten_realms_adventures_in_faer_n,
  },
  harper_pin: {
    name: 'Harper Pin',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'When you attune to this pin, choose a Harper persona (see the Forgotten Realms: Heroes of Faerûn for examples), including an alignment and a creature type. While wearing this pin, you register as that persona when targeted by magic to determine your creature type, alignment, or location.',
      ],
      ['The type of pin determines its rarity and effects.'],
      [
        'Silver Harper Pin. When you attune to this pin, you can devise a general line of thought of 25 words or fewer. While you wear this pin, a creature that reads your thoughts detects your preprogrammed line of thought instead. A creature that takes the Study action while reading your thoughts makes a DC 13 Intelligence (Investigation) check. On a successful check, it becomes aware that the detected thoughts are preprogrammed.',
      ],
      [
        'Golden Harper Pin. While wearing this pin, you can cast the Nondetection spell on yourself. The duration of this spell is permanent until you disable the effect (no action required), you remove the pin, or you are no longer attuned to the pin.',
      ],
    ],
    publication: refs.publications.forgotten_realms_adventures_in_faer_n,
  },
  mechanical_wonder_domestic: {
    name: 'Mechanical Wonder (Domestic)',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        'A Mechanical Wonder is a semi-autonomous object imbued with magical power. Mechanical Wonders vary greatly in size and form depending on their function.',
      ],
      [
        'A Mechanical Wonder is a dormant object until activated. To activate a Mechanical Wonder, you must wind the wonder with a handheld key unique to that wonder. It takes 1 minute to wind a Mechanical Wonder. While you wind it, you must take the Utilize action each turn.',
      ],
      [
        "Once wound, a Mechanical Wonder remains activated for the duration specified in the wonder's description.",
      ],
      [
        "This bipedal wonder is designed to assist with household duties. It vaguely resembles whatever species its creator used as inspiration. An activated domestic wonder uses the Domestic Wonder stat block. The wonder is an ally to you and your allies. In combat, the wonder shares your Initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the Dodge action and uses its movement to avoid danger. The domestic wonder is destroyed if it drops to 0 Hit Points.",
      ],
    ],
    publication: refs.publications.forgotten_realms_adventures_in_faer_n,
  },
  mechanical_wonder_flying: {
    name: 'Mechanical Wonder (Flying)',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'A Mechanical Wonder is a semi-autonomous object imbued with magical power. Mechanical Wonders vary greatly in size and form depending on their function.',
      ],
      [
        'A Mechanical Wonder is a dormant object until activated. To activate a Mechanical Wonder, you must wind the wonder with a handheld key unique to that wonder. It takes 1 minute to wind a Mechanical Wonder. While you wind it, you must take the Utilize action each turn.',
      ],
      [
        "Once wound, a Mechanical Wonder remains activated for the duration specified in the wonder's description.",
      ],
      [
        "An activated flying wonder uses the Flying Wonder stat block. The wonder is an ally to you and your allies. In combat, the wonder shares your Initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the Dodge action and uses its movement to avoid danger. The flying wonder is destroyed if it drops to 0 Hit Points.",
      ],
    ],
    publication: refs.publications.forgotten_realms_adventures_in_faer_n,
  },
  mechanical_wonder_gyrocopter: {
    name: 'Mechanical Wonder (Gyrocopter)',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['Weight · 500 lb'],
      [
        'A Mechanical Wonder is a semi-autonomous object imbued with magical power. Mechanical Wonders vary greatly in size and form depending on their function.',
      ],
      [
        'A Mechanical Wonder is a dormant object until activated. To activate a Mechanical Wonder, you must wind the wonder with a handheld key unique to that wonder. It takes 1 minute to wind a Mechanical Wonder. While you wind it, you must take the Utilize action each turn.',
      ],
      [
        'This wagon-sized vehicle is made of brassy metal and has a spiral-shaped propeller atop it. Its midsection is open on two sides. Once wound, the gyrocopter wonder remains active for 8 hours. While active, the gyrocopter can be used as a vehicle; it requires one pilot.',
      ],
      [
        'The gyrocopter wonder is a Huge object that weighs 500 pounds and has the following statistics: AC 14, HP 50, Speed 5 ft., and Fly Speed 20 ft. The gyrocopter can bear up to 2,000 pounds of cargo; if it bears any more than this, it deactivates.',
      ],
      [
        'Eight spectral cords are mounted to the inside of the cargo bay. A creature riding in the gyrocopter wonder can take a Utilize action to attach itself to or detach itself from one of these cords. A creature attached to a cord can leap from the gyrocopter wonder and glide, moving up to 5 feet horizontally for every 1 foot it descends in the air. If a creature attached to a cord is ever more than 500 feet away from the gyrocopter, the cord immediately disappears and returns to the wonder.',
      ],
    ],
    publication: refs.publications.forgotten_realms_adventures_in_faer_n,
  },
  mechanical_wonder_mobility: {
    name: 'Mechanical Wonder (Mobility)',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'A Mechanical Wonder is a semi-autonomous object imbued with magical power. Mechanical Wonders vary greatly in size and form depending on their function.',
      ],
      [
        'A Mechanical Wonder is a dormant object until activated. To activate a Mechanical Wonder, you must wind the wonder with a handheld key unique to that wonder. It takes 1 minute to wind a Mechanical Wonder. While you wind it, you must take the Utilize action each turn.',
      ],
      [
        "While inactive, the mobility wonder resembles a metal turtle shell with straps. It is designed to be worn on your back or flank, depending on your anatomy. Once wound, the mobility wonder transforms into a personal transport device and remains active for 24 hours. While active, the mobility wonder increases your Speed to 30 feet. Other creatures can't remove your mobility wonder from you unless you allow it.",
      ],
    ],
    publication: refs.publications.forgotten_realms_adventures_in_faer_n,
  },
  orb_of_damara: {
    name: 'Orb of Damara',
    category: 'Wondrous Item',
    rarity: 'artifact',
    attunement: true,
    text: [
      [
        'A wizard named Damara created this orb while devising a way to become a dragon. Aided by a mysterious magician (actually an aspect of Tiamat in disguise), Damara eventually created an Artifact that would enable him to achieve his dream. Yet the potential power of his creation terrified Damara so much that he dared not use the orb. Instead, the wizard entombed himself with the Artifact to seal it away.',
      ],
      [
        "The Orb of Damara is about 6 inches in diameter and is made of a glassy, iridescent material that's like obsidian but incredibly hard. If held to one's own lips with the intention of consuming it, the orb shrinks to the size of a grape.",
      ],
      ['Properties of the Orb. While attuned to the orb, you gain the following benefits:'],
      [
        "Dragon's Breath. You can take a Magic action to exhale a 15-foot Cone. When you do, choose Acid, Cold, Fire, Lightning, or Poison. Each creature in the Cone makes a DC 18 Dexterity saving throw, taking 6d6 damage of the chosen type on a failed save or half as much damage on a successful one.",
      ],
      [
        "Fear Aura. You exude a terrifying aura in a 20-foot Emanation while you don't have the ",
        rules.incapacitated,
        ' condition. You can take a Magic action to disable or enable this aura. Any enemy that starts its turn in the aura must succeed on a DC 18 Wisdom saving throw or have the ',
        rules.frightened,
        " condition until the start of its next turn. A creature that succeeds on this save is immune to the aura's effects for 24 hours.",
      ],
      ['Flight. You have a Fly Speed of 60 feet and can hover.'],
      [
        "Random Properties. The Artifact has the following random properties (see chapter 7 of the Dungeon Master's Guide):",
      ],
      ['2 minor beneficial properties'],
      ['2 minor detrimental properties'],
      [
        'Spellcasting. The orb has 6 charges and regains 1d4 + 2 expended charges daily at dawn. While attuned to the orb, you can cast one of the spells on the following table from it (+10 spell attack modifier, spell save DC 18). The table indicates how many charges you must expend to cast the spell.',
      ],
      ['Spell · Charge Cost'],
      ['Disguise Self · 0'],
      ['Fire Shield · 2'],
      ['Hold Person · 1'],
      ['See Invisibility · 1'],
      ['Summon Dragon (level 9 version) · 4'],
      [
        "Dragon Transformation. If you swallow the orb, you transform into an adult chromatic dragon under the DM's control. The type of chromatic dragon depends on your alignment and personality and is left to the DM to decide. The transformation is permanent, but if the dragon is slain, its body reverts to its original form and the orb reappears outside its body.",
      ],
      [
        'Destroying the Orb. If an Ancient Gold Dragon willingly swallows the orb, the orb and the dragon are both destroyed.',
      ],
    ],
    effects: [
      {
        key: 'fear-aura',
        name: 'Frightened by the Orb',
        lands: { on: 'failed-save', save: 'wis', dc: 18 },
        conditions: [rules.frightened],
        lasts: { kind: 'turn', boundary: 'start', whose: 'target' },
      },
    ],
    publication: refs.publications.forgotten_realms_adventures_in_faer_n,
  },
  tome_of_the_dragon: {
    name: 'Tome of the Dragon',
    category: 'Wondrous Item',
    rarity: 'legendary',
    text: [
      [
        "This heavy tome is bound in dragonhide and reinforced with thick bands of cold iron. The original copies were made by wyrmspeakers of the Cult of the Dragon and bear that cult's symbol on their cover. The Tome of the Dragon contains the secret ritual to transform a dragon or a dead dragon's body into a dracolich.",
      ],
      [
        "To decipher and use the Tome of the Dragon, you must be either a spellcaster with at least two level 5 spell slots or a Dragon. A single assistant (or more, at the DM's discretion) can help you conduct the ritual, so long as that assistant also meets the requirements to use the tome.",
      ],
      [
        "To create a dracolich using a Tome of the Dragon, you must have continuous access to the body of an adult or ancient dragon (either living or dead), as well as 80,000 GP worth of supplies (which includes a gem that will serve as the anchor for the dracolich's spirit). While you have the necessary materials, you must conduct a ritual that lasts 180 days divided by the number of creatures conducting the ritual. During the ritual, you and any assistants must work without interruption, resting no more than 8 hours per day. If you are a Dragon, the cost of supplies and the ritual's duration are halved.",
      ],
      [
        "When the ritual is complete, the tome explodes with violet light, dealing (12d6) Necrotic damage to you and each assistant. If this damage reduces a creature to 0 Hit Points, the creature is killed and immediately reanimates as a Zombie under the DM's control.",
      ],
      [
        "At the end of the ritual, the target transforms into a Dracolich. If the ritual's target was a living dragon, that dragon dies instantly, and its spirit is transferred to the gem supplied for the ritual. If the target was a dead dragon's body, the body reanimates, and the gem is inhabited by an evil dragon spirit from the Outer Planes. The dracolich is under no obligation toward its creators and acts according to its nature.",
      ],
    ],
    publication: refs.publications.forgotten_realms_adventures_in_faer_n,
  },
  windskiff: {
    name: 'Windskiff',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      [
        "This small piece of jewelry has 3 charges and regains all expended charges daily at dawn. While you are holding it, you can take a Magic action to expend 1 charge, which causes the jewelry to transform into a sail-powered personal vehicle. The vehicle is roughly the size and shape of a household door with a 10-foot-tall sail extending from one side. After 1 hour or until you use the item's command word (no action required), the transformation ends and the Windskiff reverts to its jewelry form.",
      ],
      [
        "In vehicle form, a Windskiff is a Medium object with the following statistics: AC 12, HP 30, and Speed 40 ft. The Windskiff hovers a few inches above whatever surface it's on and can glide; it moves 5 feet horizontally for every 1 foot it descends in the air. A Windskiff and its riders take no damage from falling.",
      ],
    ],
    publication: refs.publications.forgotten_realms_adventures_in_faer_n,
  },
})
