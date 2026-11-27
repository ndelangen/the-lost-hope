import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  azorius_guild_signet: {
    name: 'Azorius Guild Signet',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "This ring, adorned with the symbol of Azorius, allows you to cast ensnaring strike. A guild signet is sometimes awarded to a guild member whose renown score in that guild is 5 or higher, as a reward for performing special services for the guild. Aside from its magical properties, the ring is also an indicator of Azorius's recognition and favor.",
      ],
      [
        'A signet has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing it, you can expend 1 charge to cast the associated spell (save DC 13).',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  azorius_keyrune: {
    name: 'Azorius Keyrune',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a member of the Azorius guild',
    text: [
      [
        "This keyrune is carved from white marble and lapis lazuli to resemble a noble bird of prey. It can become a giant eagle for up to 1 hour. While the transformed eagle is within 1 mile of you, you can communicate with it telepathically. As an action, you can see through the eagle's eyes and hear what it hears until the start of your next turn, and you gain the benefit of its keen sight. During this time, you are deaf and blind with regard to your own senses.",
      ],
      [
        "When you use an action to speak the item's command word and place the keyrune on the ground in an unoccupied space within 5 feet of you, the keyrune transforms into a giant eagle. If there isn't enough space for the eagle, the keyrune doesn't transform.",
      ],
      [
        'The creature is friendly to you, your companions, and other members of your guild (unless those guild members are hostile to you). It understands your languages and obeys your spoken commands. If you issue no commands, the eagle takes the Dodge action and moves to avoid danger.',
      ],
      [
        "At the end of the duration, the creature reverts to its keyrune form. It reverts early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature reverts to its keyrune form, it can't transform again until 36 hours have passed.",
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  boros_guild_signet: {
    name: 'Boros Guild Signet',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "This ring, adorned with the symbol of Boros, allows you to cast heroism. A guild signet is sometimes awarded to a guild member whose renown score in that guild is 5 or higher, as a reward for performing special services for the guild. Aside from its magical properties, the ring is also an indicator of Boros' recognition and favor.",
      ],
      [
        'A signet has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing it, you can expend 1 charge to cast the associated spell (save DC 13).',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  boros_keyrune: {
    name: 'Boros Keyrune',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a member of the Boros guild',
    text: [
      [
        'Carved from red sandstone with white granite elements to resemble a member of the Boros Legion, this keyrune can become a veteran (human) for up to 8 hours. In addition to fighting on your behalf, this veteran cheerfully offers tactical advice, which is usually sound. Anyone who talks with the transformed keyrune or examines it closely can easily recognize that it is an artificial human.',
      ],
      [
        "When you use an action to speak the item's command word and place the keyrune on the ground in an unoccupied space within 5 feet of you, the keyrune transforms into a veteran (human). If there isn't enough space for the veteran, the keyrune doesn't transform.",
      ],
      [
        'The creature is friendly to you, your companions, and other members of your guild (unless those guild members are hostile to you). It understands your languages and obeys your spoken commands. If you issue no commands, the creature takes the Dodge action and moves to avoid danger.',
      ],
      [
        "At the end of the duration, the creature reverts to its keyrune form. It reverts early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature reverts to its keyrune form, it can't transform again until 36 hours have passed.",
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  dimir_guild_signet: {
    name: 'Dimir Guild Signet',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "This ring, adorned with the symbol of Dimir, allows you to cast disguise self. A guild signet is sometimes awarded to a guild member whose renown score in that guild is 5 or higher, as a reward for performing special services for the guild. Aside from its magical properties, the ring is also an indicator of Dimir's recognition and favor.",
      ],
      [
        'A signet has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing it, you can expend 1 charge to cast the associated spell (save DC 13).',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  dimir_keyrune: {
    name: 'Dimir Keyrune',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: 'by a member of the Dimir guild',
    text: [
      [
        "This keyrune, carved from black stone accented with steel, resembles a stylized horror. On command, it transforms into an intellect devourer that resembles the Dimir guild symbol, with six bladelike legs. The creature exists for up to 24 hours. During that time, it pursues only a single mission you give it—usually an assignment to take over someone's body, either to impersonate that person for a brief time or to extract secrets from their mind. When the mission is complete, the creature returns to you, reports its success, and reverts to its keyrune form.",
      ],
      [
        "When you use an action to speak the item's command word and place the keyrune on the ground in an unoccupied space within 5 feet of you, the keyrune transforms into a intellect devourer. If there isn't enough space for the creature, the keyrune doesn't transform.",
      ],
      [
        'The creature is friendly to you, your companions, and other members of your guild (unless those guild members are hostile to you). It understands your languages and obeys your spoken commands. If you issue no commands, the creature takes the Dodge action and moves to avoid danger.',
      ],
      [
        "At the end of the duration, the creature reverts to its keyrune form. It reverts early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature reverts to its keyrune form, it can't transform again until 36 hours have passed.",
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  golgari_guild_signet: {
    name: 'Golgari Guild Signet',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "This ring, adorned with the symbol of Golgari, allows you to cast entangle. A guild signet is sometimes awarded to a guild member whose renown score in that guild is 5 or higher, as a reward for performing special services for the guild. Aside from its magical properties, the ring is also an indicator of Golgari's recognition and favor.",
      ],
      [
        'A signet has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing it, you can expend 1 charge to cast the associated spell (save DC 13).',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  golgari_keyrune: {
    name: 'Golgari Keyrune',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: 'by a member of the Golgari guild',
    text: [
      [
        'Made from deep green jade with black veins, this keyrune has an insectile shape. It can transform into a giant scorpion for up to 6 hours. The scorpion has an Intelligence of 4 and can communicate with you telepathically while it is within 60 feet of you, though its messages are largely limited to describing the passage of potential prey.',
      ],
      [
        "When you use an action to speak the item's command word and place the keyrune on the ground in an unoccupied space within 5 feet of you, the keyrune transforms into a giant scorpion. If there isn't enough space for the creature, the keyrune doesn't transform.",
      ],
      [
        'The creature is friendly to you, your companions, and other members of your guild (unless those guild members are hostile to you). It understands your languages and obeys your spoken commands. If you issue no commands, the creature takes the Dodge action and moves to avoid danger.',
      ],
      [
        "At the end of the duration, the creature reverts to its keyrune form. It reverts early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature reverts to its keyrune form, it can't transform again until 36 hours have passed.",
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  gruul_guild_signet: {
    name: 'Gruul Guild Signet',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "This ring, adorned with the symbol of Gruul, allows you to cast compelled duel. A guild signet is sometimes awarded to a guild member whose renown score in that guild is 5 or higher, as a reward for performing special services for the guild. Aside from its magical properties, the ring is also an indicator of Gruul's recognition and favor.",
      ],
      [
        'A signet has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing it, you can expend 1 charge to cast the associated spell (save DC 13).',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  gruul_keyrune: {
    name: 'Gruul Keyrune',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a member of the Gruul guild',
    text: [
      [
        'This crude keyrune is cobbled together from bits of rubble, broken glass, bone, and animal hair. One end resembles a horned beast. On command, the keyrune transforms into a ceratok, a horned creature much like a rhinoceros (and with the same statistics). It remains in its ceratok form for 1 hour.',
      ],
      [
        "When you use an action to speak the item's command word and place the keyrune on the ground in an unoccupied space within 5 feet of you, the keyrune transforms into a ceratok. If there isn't enough space for the creature, the keyrune doesn't transform.",
      ],
      [
        'The creature is friendly to you, your companions, and other members of your guild (unless those guild members are hostile to you). It understands your languages and obeys your spoken commands. If you issue no commands, the creature takes the Dodge action and moves to avoid danger.',
      ],
      [
        "At the end of the duration, the creature reverts to its keyrune form. It reverts early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature reverts to its keyrune form, it can't transform again until 36 hours have passed.",
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  illusionists_bracers: {
    name: "Illusionist's Bracers",
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: 'by a spellcaster',
    text: [
      [
        "A powerful illusionist of House Dimir originally developed these bracers, which enabled her to create multiple minor illusions at once. The bracers' power, though, extends far beyond illusions.",
      ],
      [
        'While wearing the bracers, whenever you cast a cantrip, you can use a bonus action on the same turn to cast that cantrip a second time.',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  izzet_guild_signet: {
    name: 'Izzet Guild Signet',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "This ring, adorned with the symbol of Izzet, allows you to cast chaos bolt. A guild signet is sometimes awarded to a guild member whose renown score in that guild is 5 or higher, as a reward for performing special services for the guild. Aside from its magical properties, the ring is also an indicator of Izzet's recognition and favor.",
      ],
      [
        'A signet has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing it, you can expend 1 charge to cast the associated spell (save DC 13).',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  izzet_keyrune: {
    name: 'Izzet Keyrune',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a member of the Izzet guild',
    text: [
      [
        'Formed of carved and polished red and blue stone, the keyrune includes bits of cable and wire. One end resembles a humanlike head, suggesting the jagged elemental form of the galvanice weird that it can become for a duration of 3 hours. In this form, it will serve you as a bodyguard, lift and carry things for you, act as a test subject for your experiments, or aid you in any other way that its capabilities allow.',
      ],
      [
        "When you use an action to speak the item's command word and place the keyrune on the ground in an unoccupied space within 5 feet of you, the keyrune transforms into a galvanice weird. If there isn't enough space for the creature, the keyrune doesn't transform.",
      ],
      [
        'The creature is friendly to you, your companions, and other members of your guild (unless those guild members are hostile to you). It understands your languages and obeys your spoken commands. If you issue no commands, the creature takes the Dodge action and moves to avoid danger.',
      ],
      [
        "At the end of the duration, the creature reverts to its keyrune form. It reverts early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature reverts to its keyrune form, it can't transform again until 36 hours have passed.",
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  mizzium_apparatus: {
    name: 'Mizzium Apparatus',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a sorcerer, warlock, or wizard',
    text: [
      ['Weight · 8 lb'],
      [
        'Innovation is a dangerous pursuit, at least the way the mages of the Izzet League engage in it. As protection against the risk of an experiment going awry, they have developed a device to help channel and control their magic. This apparatus is a collection of leather straps, flexible tubing, glass cylinders, and plates, bracers, and fittings made from a magic-infused metal alloy called mizzium, all assembled into a harness. The item weighs 8 pounds.',
      ],
      [
        "While you are wearing the mizzium apparatus, you can use it as an arcane focus. In addition, you can attempt to cast a spell that you do not know or have prepared. The spell you choose must be on your class's spell list and of a level for which you have a spell slot, and you must provide the spell's components.",
      ],
      [
        'You expend a spell slot to cast the spell as normal, but before resolving it you must make an Intelligence (Arcana) check. The DC is 10 + twice the level of the spell slot you expend to cast the spell.',
      ],
      [
        'On a successful check, you cast the spell as normal, using your spell save DC and spellcasting ability modifier. On a failed check, you cast a different spell from the one you intended. Randomly determine the spell you cast by rolling on the table for the level of the spell slot you expended. If the slot is 6th level or higher, roll on the table for 5th-level spells.',
      ],
      [
        "If you try to cast a cantrip you don't know, the DC for the Intelligence (Arcana) check is 10, and on a failed check, there is no effect.",
      ],
      ['Table: 1st-Level Spells'],
      ['d6 · spell'],
      ['1 · burning hands'],
      ['2 · chaos bolt'],
      ['3 · color spray'],
      ['4 · faerie fire'],
      ['5 · fog cloud'],
      ['6 · thunderwave'],
      ['Table: 2nd-Level Spells'],
      ['d6 · spell'],
      ['1 · blur'],
      ['2 · gust of wind'],
      ['3 · heat metal'],
      ["4 · Melf's acid arrow"],
      ['5 · scorching ray'],
      ['6 · shatter'],
      ['Table: 3rd-Level Spells'],
      ['d6 · spell'],
      ['1 · fear'],
      ['2 · feign death'],
      ['3 · fireball'],
      ['4 · gaseous form'],
      ['5 · sleet storm'],
      ['6 · stinking cloud'],
      ['Table: 4th-Level Spells'],
      ['d4 · spell'],
      ['1 · confusion'],
      ['2 · conjure minor elementals'],
      ["3 · Evard's black tentacles"],
      ['4 · ice storm'],
      ['Table: 5th-Level Spells'],
      ['d4 · spell'],
      ['1 · animate objects'],
      ['2 · cloudkill'],
      ['3 · cone of cold'],
      ['4 · flame strike'],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  mizzium_mortar: {
    name: 'Mizzium Mortar',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      [
        "This short tube, about 2 feet long and 6 inches in diameter, is made from mizzium, a magically enhanced metal alloy forged by the Izzet League. The end that's pointed toward a target is open, and a glowing ball of molten metal can be seen at the other end as long as the mortar has at least 1 charge remaining.",
      ],
      [
        'The mortar has 4 charges for the following properties. It regains 1d4 expended charges daily at dawn.',
      ],
      [
        'Molten Spray. You can expend 1 charge as an action to loose a 30-foot cone of molten mizzium. Each creature in the area must make a DC 15 Dexterity saving throw, taking 5d4 fire damage on a failed save, or half as much damage on a successful one.',
      ],
      [
        'Mizzium Bombard. You can expend 3 charges as an action to launch a hail of molten projectiles in a 20-foot-radius, 40-foot-high cylinder centered on a point you can see within 60 feet of you. Each creature in the area must make a DC 15 Dexterity saving throw. A creature takes 5d8 fire damage on a failed save, or half as much damage on a successful one.',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  moodmark_paint: {
    name: 'Moodmark Paint',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'This thick, black paint is stored in a small jar, containing enough paint to apply moodmarks to one creature. The paint is dabbed on the face in spots or markings that often resemble the eyes of insects or spiders. Applying the paint in this way takes 1 minute.',
      ],
      [
        'For the next 8 hours, the marks change to reflect your mental state. A creature that can see you and makes a successful DC 10 Wisdom (Insight) check can discern whether you are happy, sad, angry, disgusted, surprised, or afraid, as well as the main source of that emotion. For example, you might communicate fear caused by a monster you just saw around the corner, grief at the loss of a friend, or happiness derived from pride in your performance in combat. A dark elf has advantage on this check.',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  orzhov_guild_signet: {
    name: 'Orzhov Guild Signet',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "This ring, adorned with the symbol of Orzhov, allows you to cast command. A guild signet is sometimes awarded to a guild member whose renown score in that guild is 5 or higher, as a reward for performing special services for the guild. Aside from its magical properties, the ring is also an indicator of Orzhov's recognition and favor.",
      ],
      [
        'A signet has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing it, you can expend 1 charge to cast the associated spell (save DC 13).',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  orzhov_keyrune: {
    name: 'Orzhov Keyrune',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a member of the Orzhov guild',
    text: [
      [
        "This keyrune is carved from white marble with veins of black. The end is shaped like a thrull's head, with a gold faceplate affixed. On command, the keyrune transforms into a winged thrull for up to 2 hours. If you don't come from an Orzhov oligarch family, it serves you grudgingly, clownishly aping your movements and mannerisms while carrying out your orders.",
      ],
      [
        "When you use an action to speak the item's command word and place the keyrune on the ground in an unoccupied space within 5 feet of you, the keyrune transforms into a winged thrull. If there isn't enough space for the creature, the keyrune doesn't transform.",
      ],
      [
        'The creature is friendly to you, your companions, and other members of your guild (unless those guild members are hostile to you). It understands your languages and obeys your spoken commands. If you issue no commands, the creature takes the Dodge action and moves to avoid danger.',
      ],
      [
        "At the end of the duration, the creature reverts to its keyrune form. It reverts early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature reverts to its keyrune form, it can't transform again until 36 hours have passed.",
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  pariahs_shield: {
    name: "Pariah's Shield",
    category: 'Shield',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 6 lb'],
      [
        'Soldiers of the Boros Legion consider it an honor to bear this shield, even knowing that it might be the last honor they receive. The front of the shield is sculpted to depict a grieving human face.',
      ],
      [
        "You gain a +1 bonus to AC for every two allies within 5 feet of you (up to a maximum of +3) while you wield this shield. This bonus is in addition to the shield's normal bonus to AC.",
      ],
      [
        'When a creature you can see within 5 feet of you takes damage, you can use your reaction to take that damage, instead of the creature taking it. When you do so, the damage type changes to force.',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  peregrine_mask: {
    name: 'Peregrine Mask',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      [
        'While wearing this winged helm, you have a flying speed of 60 feet. In addition, you have advantage on initiative rolls.',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  pyroconverger: {
    name: 'Pyroconverger',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'A Pyroconverger is an Izzet-made flamethrower. It carries a risk of malfunction each time you use it.',
      ],
      [
        'As an action, you can cause the Pyroconverger to project fire in a 10-foot cone. Each creature in that area must make a DC 13 Dexterity saving throw, taking 4d6 fire damage on a failed save, or half as much damage on a successful one.',
      ],
      [
        "Each time you use the Pyroconverger, roll a d10 and add the number of times you have used it since your last long rest. If the total is 11 or higher, the Pyroconverger malfunctions: you take 4d6 fire damage, and you can't use the Pyroconverger again until you finish a long rest.",
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  rakdos_guild_signet: {
    name: 'Rakdos Guild Signet',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "This ring, adorned with the symbol of Rakdos, allows you to cast hellish rebuke. A guild signet is sometimes awarded to a guild member whose renown score in that guild is 5 or higher, as a reward for performing special services for the guild. Aside from its magical properties, the ring is also an indicator of Rakdos' recognition and favor.",
      ],
      [
        'A signet has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing it, you can expend 1 charge to cast the associated spell (save DC 13).',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  rakdos_keyrune: {
    name: 'Rakdos Keyrune',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a member of the Rakdos guild',
    text: [
      [
        'This dark granite keyrune is marbled with scarlet veins and carved with the leering visage of a mischievous demon. When activated, it transforms into a cackler for up to 1 hour.',
      ],
      [
        "When you use an action to speak the item's command word and place the keyrune on the ground in an unoccupied space within 5 feet of you, the keyrune transforms into a cackler. If there isn't enough space for the creature, the keyrune doesn't transform.",
      ],
      [
        'The creature is friendly to you, your companions, and other members of your guild (unless those guild members are hostile to you). It understands your languages and obeys your spoken commands. If you issue no commands, the creature takes the Dodge action and moves to avoid danger.',
      ],
      [
        "At the end of the duration, the creature reverts to its keyrune form. It reverts early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature reverts to its keyrune form, it can't transform again until 36 hours have passed.",
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  rakdos_riteknife: {
    name: 'Rakdos Riteknife',
    category: 'Weapon',
    detail: 'Dagger',
    rarity: 'legendary',
    attunement: true,
    text: [
      ['Weight · 1 lb'],
      [
        "You gain a +1 bonus to attack and damage rolls made with this magic weapon. Its blade is cruelly serrated, and its hilt resembles a demonic head and wings. Whenever you slay a creature with an attack using the dagger, the creature's soul is imprisoned inside the dagger, and that creature can be restored to life only by a wish spell. The dagger can hold a maximum of five souls.",
      ],
      [
        'For each soul imprisoned in the dagger, your attacks with it deal an extra 1d4 necrotic damage on a hit. While the dagger is within 5 feet of you, your dreams are haunted by whispers from the trapped souls.',
      ],
      ['The dagger has the following additional properties.'],
      [
        'Siphon Vitality. As a bonus action, you can release any number of stored souls from the dagger to regain 1d10 hit points per soul released.',
      ],
      [
        "Annihilation. If the dagger holds five souls, you can use this property: As a reaction immediately after you hit a creature with the dagger and deal damage to that target, you can release all five souls. If the target now has fewer than 75 hit points, it must succeed on a DC 15 Constitution saving throw or die. If the target dies, you can't use this property again until you finish a long rest.",
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  selesnya_guild_signet: {
    name: 'Selesnya Guild Signet',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "This ring, adorned with the symbol of Selesnya, allows you to cast charm person. A guild signet is sometimes awarded to a guild member whose renown score in that guild is 5 or higher, as a reward for performing special services for the guild. Aside from its magical properties, the ring is also an indicator of Selesnya's recognition and favor.",
      ],
      [
        'A signet has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing it, you can expend 1 charge to cast the associated spell (save DC 13).',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  selesnya_keyrune: {
    name: 'Selesnya Keyrune',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a member of the Selesnya guild',
    text: [
      [
        "Carved from white and green marble in the shape of a wolf's head, this keyrune transforms into a dire wolf. The wolf persists for 8 hours. Its Intelligence is 6, and it understands Elvish and Sylvan but can't speak those languages. While it is within 1 mile of you, you can communicate with each other telepathically.",
      ],
      [
        "When you use an action to speak the item's command word and place the keyrune on the ground in an unoccupied space within 5 feet of you, the keyrune transforms into a dire wolf. If there isn't enough space for the creature, the keyrune doesn't transform.",
      ],
      [
        'The creature is friendly to you, your companions, and other members of your guild (unless those guild members are hostile to you). It understands your languages and obeys your spoken commands. If you issue no commands, the creature takes the Dodge action and moves to avoid danger.',
      ],
      [
        "At the end of the duration, the creature reverts to its keyrune form. It reverts early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature reverts to its keyrune form, it can't transform again until 36 hours have passed.",
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  simic_guild_signet: {
    name: 'Simic Guild Signet',
    category: 'Ring',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "This ring, adorned with the symbol of Simic, allows you to cast expeditious retreat. A guild signet is sometimes awarded to a guild member whose renown score in that guild is 5 or higher, as a reward for performing special services for the guild. Aside from its magical properties, the ring is also an indicator of Simic's recognition and favor.",
      ],
      [
        'A signet has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing it, you can expend 1 charge to cast the associated spell (save DC 13).',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  simic_keyrune: {
    name: 'Simic Keyrune',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: 'by a member of the Simic guild',
    text: [
      [
        'This keyrune is assembled from coral, mother-of-pearl, and chrome and adorned with the spirals and curves characteristic of Simic ornamentation. The head resembles the shell of a sea creature. On command, the keyrune turns into a category 1 krasis that has the Grabber and Stabilizing Legs adaptations. The transformation lasts for up to 5 hours.',
      ],
      [
        "When you use an action to speak the item's command word and place the keyrune on the ground in an unoccupied space within 5 feet of you, the keyrune transforms into a category 1 krasis that has the Grabber and Stabilizing Legs adaptations. If there isn't enough space for the creature, the keyrune doesn't transform.",
      ],
      [
        'The creature is friendly to you, your companions, and other members of your guild (unless those guild members are hostile to you). It understands your languages and obeys your spoken commands. If you issue no commands, the creature takes the Dodge action and moves to avoid danger.',
      ],
      [
        "At the end of the duration, the creature reverts to its keyrune form. It reverts early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature reverts to its keyrune form, it can't transform again until 36 hours have passed.",
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  skyblinder_staff: {
    name: 'Skyblinder Staff',
    category: 'Staff',
    rarity: 'uncommon',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      [
        'You gain a +1 bonus to attack and damage rolls made with this magic quarterstaff. While holding it, you gain a +1 bonus to spell attack rolls.',
      ],
      [
        'If a flying creature you can see within 30 feet of you makes an attack roll against you, you can use your reaction to hold the staff aloft and cause it to flare with light. The attacker has disadvantage on the attack roll, and it must succeed on a DC 15 Constitution saving throw or be ',
        rules.blinded,
        ' until the start of its next turn.',
      ],
    ],
    effects: [
      {
        key: 'blinded',
        name: 'Blinded',
        lands: { on: 'failed-save', save: 'con', dc: 15 },
        conditions: [rules.blinded],
        lasts: { kind: 'turn', boundary: 'start', whose: 'target' },
      },
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  spies_murmur: {
    name: "Spies' Murmur",
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "This headpiece, crafted from dark metal, is worn curved around the ear. If you know a creature wearing another Spies' Murmur and that creature is within 1 mile of you, you can communicate telepathically with each other. As a bonus action, you can allow that creature to hear everything you hear for 1 hour. You can end this effect as a bonus action, and it ends if you're ",
        rules.incapacitated,
        '.',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  sunforger: {
    name: 'Sunforger',
    category: 'Weapon',
    detail: 'Warhammer',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 2 lb'],
      ['You gain a +2 bonus to attack and damage rolls made with this magic weapon.'],
      [
        "As an action, you can hurl the weapon up to 120 feet to a point you can see. When it reaches that point, the weapon vanishes in an explosion, and each creature in a 20-foot-radius sphere centered on that point must make a DC 15 Dexterity saving throw, taking 6d6 fire damage on a failed save, or half as much damage on a successful one. Afterward, you can use an action to cause the weapon to reappear in your empty hand. You can't cause it to explode again until you finish a short or long rest.",
      ],
      [
        "If you don't call the weapon back to your hand, it reappears at the point where it exploded when you are no longer attuned to it or when 24 hours have passed.",
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  sword_of_the_paruns: {
    name: 'Sword of the Paruns',
    category: 'Weapon',
    detail: 'Longsword',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 3 lb'],
      [
        "You gain a +1 bonus to attack and damage rolls made with this magic weapon. Additionally, once on each of your turns, you can use one of the following properties if you're holding the sword:",
      ],
      [
        'Immediately after you use the Attack action to attack with the sword, you can enable one creature within 60 feet of you to use its reaction to make one weapon attack.',
      ],
      [
        'Immediately after you take the Dash action, you can enable one creature within 60 feet of you to use its reaction to move up to its speed.',
      ],
      [
        'Immediately after you take the Dodge action, you can enable one creature within 60 feet of you to use its reaction to gain the benefits of the Dodge action.',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
  voyager_staff: {
    name: 'Voyager Staff',
    category: 'Staff',
    rarity: 'very rare',
    attunement: 'by a spellcaster',
    text: [
      ['Weight · 4 lb'],
      [
        'You gain a +1 bonus to attack and damage rolls made with this magic quarterstaff. While you hold it, you gain a +1 bonus to spell attack rolls.',
      ],
      [
        "This staff has 10 charges. While holding it, you can use an action to expend 1 or more of the staff's charges to cast one of the following spells from it, using your spell save DC: banishment (4 charges), blink (3 charges), misty step (2 charges), passwall (5 charges), or teleport (7 charges).",
      ],
      [
        'The staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff vanishes forever.',
      ],
    ],
    publication: refs.publications.guildmasters_guide_to_ravnica,
  },
})
