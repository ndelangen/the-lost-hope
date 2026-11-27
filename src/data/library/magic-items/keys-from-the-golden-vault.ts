import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  constantoris_portrait: {
    name: "Constantori's Portrait",
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 15 lb'],
      [
        "This painting by famed artist Dkesii Kwan depicts Constantori, a beautiful courtier, who was paid a staggering sum to be Dkesii's model. Whether Constantori's actual appearance matches the painting remains a subject of debate. The portrait is one of several paintings commissioned by the late Daiyani Grysthorn, a crime lord who frequently gave magical paintings as gifts to her most esteemed associates.",
      ],
      [
        "Sentience. Constantori's Portrait is a sentient, lawful evil item with an Intelligence score of 14, a Wisdom score of 12, and a Charisma score of 8. It can hear within a range of 120 feet and has darkvision within a range of 60 feet, but it can't see anything behind itself.",
      ],
      [
        "The painting can converse in Common, Draconic, and Elvish as if it were a living person, though Constantori's mouth doesn't move. Whenever conversation occurs within the portrait's auditory range, the painting eagerly gathers secrets, the names of secret tellers, significant events, or any political conversations.",
      ],
      [
        "Personality. Constantori's Portrait is demanding, condescending, and vain. It doesn't like being covered or placed out of sight, and it loudly condemns anyone who tries to remove it from its gold-leaf frame.",
      ],
      [
        "Wealth of Information. The painting's primary purpose is to observe and recall conversations. Over the past few decades, Constantori's Portrait has quietly observed countless conversations and now possesses an unquantifiable amount of lore—everything from criminal conspiracies to secret passwords. The DM decides what the painting knows and what it doesn't.",
      ],
      [
        "While attuned to the painting, you can take an action to telepathically contact it over any distance, provided you and the painting are on the same plane of existence. The painting can't telepathically contact you, however. Maintaining telepathic contact with the painting requires your concentration (as if concentrating on a spell).",
      ],
      [
        "Guardian Portrait. While you are attuned to the painting, you can command it to guard its location against one or more creatures you identify as the painting's enemies. The painting performs this function until you command it to stop or until your attunement to the painting ends.",
      ],
      [
        'The painting has 3 charges. When a creature the painting identifies as its enemy starts its turn in a space the painting can see, the painting expends 1 of its charges to cast magic missile (3 missiles), targeting that creature. The painting regains all expended charges daily at dawn.',
      ],
      [
        'The painting is a Small object with AC 12, 20 hit points, and immunity to poison damage. In its gold-leaf frame, the painting weighs 15 pounds. If the painting has at least 1 hit point and is targeted by a mending spell, it regains 2d6 hit points.',
      ],
    ],
    publication: refs.publications.keys_from_the_golden_vault,
  },
  shard_of_xeluan: {
    name: 'Shard of Xeluan',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      ['This 1-foot-long shard of obsidian has veins of silver and gold beneath its cold surface.'],
      [
        'Empowered Magic. While holding the shard, you can use it as a spellcasting focus, and it gives you a +1 bonus to your spell attack rolls.',
      ],
      [
        "Enhanced Strength. Your Strength score increases by 4 while the shard is on your person. The shard can't raise your Strength score above 22.",
      ],
      [
        "Curse. Attuning to this item extends its curse to you. You remain cursed until you are targeted by a remove curse spell or similar magic, or until the shard is reattached to Xeluan's ",
        rules.petrified,
        ' heart.',
      ],
      [
        "The shard's curse causes misfortune to befall you. When you roll a 1 on an attack roll, an ability check, or a saving throw, roll on the Shard Misfortunes table to determine the misfortune. For as long as this misfortune lasts, no other shard misfortunes befall you.",
      ],
      ['d6 · Misfortune'],
      [
        '1 · You accidentally cut yourself with the shard and are ',
        rules.poisoned,
        ' until the next dawn.',
      ],
      [
        '2 · You experience a vision of an ancient calamity—a beautiful city threatened by crumbling mountains and erupting volcanoes—and are ',
        rules.stunned,
        ' until the end of your next turn.',
      ],
      [
        '3 · For a few seconds, the ground shakes under you. You and each creature within 10 feet of you must succeed on a DC 16 Dexterity saving throw or be knocked ',
        rules.prone,
        '.',
      ],
      [
        '4 · The shard releases three glowing darts of magical force that target one random creature within 30 feet of you. If no such target exists, you become the target. Each dart hits automatically and deals 3 (1d4 + 1) force damage to the target.',
      ],
      [
        '5 · Until the next dawn, Beasts with an Intelligence score of 3 or lower are hostile to you.',
      ],
      [
        '6 · Nothing seems to go your way. Until the next dawn, you have disadvantage on ability checks.',
      ],
    ],
    publication: refs.publications.keys_from_the_golden_vault,
  },
  shard_solitaire_black_sapphire: {
    name: 'Shard Solitaire (Black Sapphire)',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'This gemstone contains an unstable extradimensional rift. Its facets are ribboned with iridescent veins that seem to move of their own accord. Five types of shard solitaire are known to exist, each one a different type of gemstone, as shown in the Shard Solitaire Types table.',
      ],
      [
        "Rift Step. As a bonus action, while wearing or holding the shard solitaire, you can teleport yourself, along with anything you're wearing or carrying, to an unoccupied space you can see within 30 feet of yourself.",
      ],
      [
        "When you use this property, you can tap into the unstable power of the stone's extradimensional rift to increase the teleport distance by up to 30 feet, but if you teleport more than 30 feet using Rift Step, you must succeed on a DC 16 Constitution saving throw or take 3d10 force damage immediately after you teleport.",
      ],
      [
        "Spellcasting. The stone has 6 charges and regains 1d6 expended charges daily at dawn. As an action, you can cast one of the stone's spells by expending the requisite number of charges, requiring no material components (save DC 16). The black sapphire shard solitaire can be used to cast the following spells: banishment (3 charges; the target is banished to the stone's extradimensional space for the spell's duration), mirror image (1 charge), blight (3 charges), finger of death (6 charges).",
      ],
    ],
    publication: refs.publications.keys_from_the_golden_vault,
  },
  shard_solitaire_diamond: {
    name: 'Shard Solitaire (Diamond)',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'This gemstone contains an unstable extradimensional rift. Its facets are ribboned with iridescent veins that seem to move of their own accord. Five types of shard solitaire are known to exist, each one a different type of gemstone, as shown in the Shard Solitaire Types table.',
      ],
      [
        "Rift Step. As a bonus action, while wearing or holding the shard solitaire, you can teleport yourself, along with anything you're wearing or carrying, to an unoccupied space you can see within 30 feet of yourself.",
      ],
      [
        "When you use this property, you can tap into the unstable power of the stone's extradimensional rift to increase the teleport distance by up to 30 feet, but if you teleport more than 30 feet using Rift Step, you must succeed on a DC 16 Constitution saving throw or take 3d10 force damage immediately after you teleport.",
      ],
      [
        "Spellcasting. The stone has 6 charges and regains 1d6 expended charges daily at dawn. As an action, you can cast one of the stone's spells by expending the requisite number of charges, requiring no material components (save DC 16). The diamond shard solitaire can be used to cast the following spells: banishment (3 charges; the target is banished to the stone's extradimensional space for the spell's duration), mirror image (1 charge), ice storm (3 charges), simulacrum (6 charges; the duplicate created by the spell has the same number of hit points as the creature it imitates).",
      ],
    ],
    publication: refs.publications.keys_from_the_golden_vault,
  },
  shard_solitaire_jacinth: {
    name: 'Shard Solitaire (Jacinth)',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'This gemstone contains an unstable extradimensional rift. Its facets are ribboned with iridescent veins that seem to move of their own accord. Five types of shard solitaire are known to exist, each one a different type of gemstone, as shown in the Shard Solitaire Types table.',
      ],
      [
        "Rift Step. As a bonus action, while wearing or holding the shard solitaire, you can teleport yourself, along with anything you're wearing or carrying, to an unoccupied space you can see within 30 feet of yourself.",
      ],
      [
        "When you use this property, you can tap into the unstable power of the stone's extradimensional rift to increase the teleport distance by up to 30 feet, but if you teleport more than 30 feet using Rift Step, you must succeed on a DC 16 Constitution saving throw or take 3d10 force damage immediately after you teleport.",
      ],
      [
        "Spellcasting. The stone has 6 charges and regains 1d6 expended charges daily at dawn. As an action, you can cast one of the stone's spells by expending the requisite number of charges, requiring no material components (save DC 16). The jacinth shard solitaire can be used to cast the following spells: banishment (3 charges; the target is banished to the stone's extradimensional space for the spell's duration), mirror image (1 charge), fireball (2 charges), fire storm (6 charges).",
      ],
    ],
    publication: refs.publications.keys_from_the_golden_vault,
  },
  shard_solitaire_rainbow_pearl: {
    name: 'Shard Solitaire (Rainbow Pearl)',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'This gemstone contains an unstable extradimensional rift. Its facets are ribboned with iridescent veins that seem to move of their own accord. Five types of shard solitaire are known to exist, each one a different type of gemstone, as shown in the Shard Solitaire Types table.',
      ],
      [
        "Rift Step. As a bonus action, while wearing or holding the shard solitaire, you can teleport yourself, along with anything you're wearing or carrying, to an unoccupied space you can see within 30 feet of yourself.",
      ],
      [
        "When you use this property, you can tap into the unstable power of the stone's extradimensional rift to increase the teleport distance by up to 30 feet, but if you teleport more than 30 feet using Rift Step, you must succeed on a DC 16 Constitution saving throw or take 3d10 force damage immediately after you teleport.",
      ],
      [
        "Spellcasting. The stone has 6 charges and regains 1d6 expended charges daily at dawn. As an action, you can cast one of the stone's spells by expending the requisite number of charges, requiring no material components (save DC 16). The rainbow pearl shard solitaire can be used to cast the following spells: banishment (3 charges; the target is banished to the stone's extradimensional space for the spell's duration), mirror image (1 charge), prismatic spray (6 charges), water breathing (2 charges).",
      ],
    ],
    publication: refs.publications.keys_from_the_golden_vault,
  },
  shard_solitaire_ruby: {
    name: 'Shard Solitaire (Ruby)',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'This gemstone contains an unstable extradimensional rift. Its facets are ribboned with iridescent veins that seem to move of their own accord. Five types of shard solitaire are known to exist, each one a different type of gemstone, as shown in the Shard Solitaire Types table.',
      ],
      [
        "Rift Step. As a bonus action, while wearing or holding the shard solitaire, you can teleport yourself, along with anything you're wearing or carrying, to an unoccupied space you can see within 30 feet of yourself.",
      ],
      [
        "When you use this property, you can tap into the unstable power of the stone's extradimensional rift to increase the teleport distance by up to 30 feet, but if you teleport more than 30 feet using Rift Step, you must succeed on a DC 16 Constitution saving throw or take 3d10 force damage immediately after you teleport.",
      ],
      [
        "Spellcasting. The stone has 6 charges and regains 1d6 expended charges daily at dawn. As an action, you can cast one of the stone's spells by expending the requisite number of charges, requiring no material components (save DC 16). The ruby shard solitaire can be used to cast the following spells: banishment (3 charges; the target is banished to the stone's extradimensional space for the spell's duration), mirror image (1 charge), fly (2 charges), teleport (6 charges).",
      ],
    ],
    publication: refs.publications.keys_from_the_golden_vault,
  },
})
