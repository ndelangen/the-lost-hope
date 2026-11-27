import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  ashbringer: {
    name: 'Ashbringer',
    category: 'Weapon',
    detail: 'Greatsword',
    rarity: 'artifact',
    attunement: 'by a Paladin',
    text: [
      ['Weight · 6 lb'],
      [
        "Infused with the Holy Light and forged by King Magni Bronzebeard on the Great Anvil of Ironforge, Ashbringer was once the pride and joy of the knightly Mograine family. But when the traitorous Renault Mograine used the sword to kill his father, it became corrupted. The sword was claimed by the Scourge until Renault's brother, Darion Mograine, betrayed the Lich King and delivered the weapon to Tirion Fordring—an act of heroism that cleansed Ashbringer of its corruption and restored the sword to its rightful form.",
      ],
      [
        'Magic Weapon. You gain a +3 bonus to attack rolls and damage rolls made with this magic weapon. It deals an extra 1d10 Fire damage on a hit, or an extra 3d10 Fire damage if the target is Undead.',
      ],
      [
        "Changing States. When first encountered, Ashbringer is in either its True State or its Corrupted State. At the DM's discretion, Ashbringer changes into its Corrupted State if its wielder uses it to commit an act of legendary wickedness; it changes into its True State if its wielder uses it to commit an act of legendary heroism. Ashbringer's current state grants you one of the following benefits:",
      ],
      [
        'Steal Life (Corrupted State Only). Whenever you use Ashbringer to reduce a creature to 0 Hit Points, you gain 20 Temporary Hit Points.',
      ],
      [
        'Wake of Ashes (True State Only). Whenever you use Ashbringer to reduce a creature to 0 Hit Points, you can make its corpse explode into a cloud of smoldering ash. Each creature of your choice in a 10-foot Emanation originating from the target must succeed on a DC 18 Constitution saving throw or have the ',
        rules.blinded,
        ' condition until the end of its next turn.',
      ],
      [
        'Sentience. Ashbringer is a sentient weapon with an Intelligence of 14, a Wisdom of 17, and a Charisma of 17. It is Lawful Good in its True State or Lawful Evil in its Corrupted State. It has hearing and Darkvision with a range of 120 feet.',
      ],
      ['The weapon communicates telepathically with its wielder and speaks Common and Dwarven.'],
      [
        "Personality. Ashbringer's voice sounds like faint, intermittent whispers. In its True State, Ashbringer seeks to serve the forces of the Light and reduce the unholy to ash. In its Corrupted State, Ashbringer wants to undermine faith in the Light and destroy the righteous. Conflict arises if the wielder doesn't share the goals of Ashbringer's current state.",
      ],
      ['Random Properties. Ashbringer has the following random properties:'],
      ['1 minor beneficial property'],
      ['1 major beneficial property'],
      ['1 minor detrimental property'],
      [
        'Destroying Ashbringer. Ashbringer can be destroyed only by its creator, Magni Bronzebeard. The weapon will shatter when he strikes it against the Great Anvil of Ironforge.',
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  avianas_feather: {
    name: "Aviana's Feather",
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: true,
    text: [
      [
        'While attuned to this golden feather, you can take a Magic action to sprout a pair of glowing, golden wings from your back. The wings give you a Fly Speed of 80 feet, and any creature that makes an Opportunity Attack against you when you fly out of its reach has Disadvantage on the attack roll. If you fall while you have the wings, you descend at a rate of 60 feet per round until you land.',
      ],
      [
        'The wings last until you end the effect early as a Magic action or until your Attunement ends. If you are aloft when the wings disappear, you fall.',
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  crown_of_the_ogre_king: {
    name: 'Crown of the Ogre King',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      [
        'While wearing this crown, you can take a Magic action to release a powerful belch that can be heard up to 300 feet away. Each creature in a 20-foot Cone originating from you makes a DC 17 Strength saving throw. On a failed save, a creature is pushed up to 20 feet away from you and has the ',
        rules.prone,
        ' condition.',
      ],
      [
        'Cursed. This item is cursed. Attuning to it curses you until you are targeted by a Remove Curse spell or similar magic. Removing the crown fails to end the curse on you. While cursed, you are far hungrier than normal. You lose all your table manners, and your daily food requirement triples.',
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  defias_leather: {
    name: 'Defias Leather',
    category: 'Armor',
    detail: 'Leather Armor',
    rarity: 'rare',
    text: [
      ['Weight · 10 lb'],
      [
        "Elite members of the Defias Brotherhood wear this armor to honor the faction's stonemason founders. While wearing the armor, you gain the following benefits.",
      ],
      [
        "Mason's Camouflage. You have Advantage on Dexterity (Stealth) checks made to hide behind stone objects and structures.",
      ],
      [
        "Meld into Stone. You can cast Meld into Stone from the armor. Once the armor has been used to cast this spell, it can't be used to cast it again until the next dawn.",
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  doomhammer: {
    name: 'Doomhammer',
    category: 'Weapon',
    detail: 'Warhammer',
    rarity: 'artifact',
    attunement: 'by a Barbarian',
    text: [
      ['Weight · 5 lb'],
      [
        "Long ago on the world of Draenor, an orc named Gelnar set out to fashion a weapon that would empower his people against their ogre foes. He forged a fearsome hammer in the heat of an elemental pool of lava. Dubbed Doomhammer, this weapon was passed down through generations of Blackrock orcs. An ancient prophecy foretold that possession of the hammer would someday leave the Blackrock lineage; this prophecy came true when Thrall, an orc shaman, proved himself the weapon's worthy wielder.",
      ],
      [
        'Magic Weapon. You gain a +3 bonus to attack rolls and damage rolls made with this magic weapon. It deals an extra 1d8 Lightning damage on a hit.',
      ],
      ["Gelnar's Gifts. While holding Doomhammer, you gain the following benefits:"],
      [
        'Doom Winds. Your fury carries the unbridled momentum of a windstorm. While your Rage is active, your Speed is doubled, and you can take an extra Attack action (one attack only) on each of your turns.',
      ],
      [
        'Lava Stride. You take no damage from molten lava and can walk across it as if it were solid ground.',
      ],
      [
        'Lightning Rod. When a creature you can see within 60 feet of you would take Lightning damage, you can take a Reaction to reduce the damage to 0.',
      ],
      [
        "Storm's Passage. You can cast Wind Walk from this weapon. Once the weapon has been used to cast this spell, it can't be used to cast it again until the next dawn.",
      ],
      ['Random Properties. Doomhammer has the following random properties:'],
      ['2 minor beneficial properties'],
      ['1 major beneficial property'],
      ['1 minor detrimental property'],
      [
        'Destroying Doomhammer. To destroy Doomhammer, a descendant of Gelnar must hurl the weapon into the eye of a storm in Outland, the remnants of the destroyed world of Draenor.',
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  experimental_goblin_jetpack: {
    name: 'Experimental Goblin Jetpack',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        "While wearing this pack, you can take a Magic action to fire up its jets. The jets remain active for 1 hour or until you end the effect early as a Magic action. The jets give you a Fly Speed of 60 feet. If you are aloft when the jets become inactive, you fall. When the jets stop, you can't use them again for 1d12 hours.",
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  figurine_of_wondrous_power_jeweled_panther: {
    name: 'Figurine of Wondrous Power (Jeweled Panther)',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      [
        "A Figurine of Wondrous Power is a statuette small enough to fit in a pocket. If you take a Magic action to throw the figurine to a point on the ground within 60 feet of yourself, the figurine becomes a living creature specified in the figurine's description below. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.",
      ],
      [
        'The creature is Friendly to you and your allies. It understands your languages, obeys your commands, and takes its turn immediately after you on your Initiative count. If you issue no commands, the creature defends itself but takes no other actions.',
      ],
      [
        "The creature exists for a duration specific to each figurine. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if its creature form drops to 0 Hit Points or if you take a Magic action while touching the creature to make it revert to figurine form. When the creature becomes a figurine again, its property can't be used again until a certain amount of time has passed, as specified below.",
      ],
      [
        "Jeweled Panther (Rare). This statuette is of a panther made from jade, onyx, ruby, sapphire, or sunstone. It can become a Large Panther with a Fly Speed of 30 feet for up to 12 hours and can be ridden as a mount. Once it has been used, it can't be used again until 2 days have passed.",
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  flask_of_the_titans: {
    name: 'Flask of the Titans',
    category: 'Potion',
    rarity: 'very rare',
    text: [
      [
        'When you drink this potion, your Hit Point maximum and current Hit Points increase by 30 for 1 hour.',
      ],
      ['The golden liquid in this flask tastes like honey and gleams with the light of dawn.'],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  frostmourne: {
    name: 'Frostmourne',
    category: 'Weapon',
    detail: 'Greatsword',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 6 lb'],
      [
        'Runes of domination adorn this icy mourneblade. The Jailer—one of the rulers of the Shadowlands—originally sought to use Frostmourne to subjugate Azeroth, and that cruel intention forever lingers in the form of a prophecy: "Whosoever takes up this blade shall wield power eternal. Just as the blade rends flesh, so must power scar the spirit." Arthas Menethil was the first to discover the prophecy\'s true meaning when he lost his soul by wielding the sword, ultimately becoming the Lich King.',
      ],
      [
        "Magic Weapon. You gain a +3 bonus to attack rolls and damage rolls made with this magic weapon. It deals an extra 2d12 Cold damage on a hit. Whenever you use Frostmourne to reduce a creature to 0 Hit Points, the creature dies, and its soul is trapped in the sword. The target can't be raised from the dead until Frostmourne is destroyed.",
      ],
      [
        "Pawn of the Lich King. While you're attuned to Frostmourne, the Lich King can see through your eyes, hear through your ears, and communicate with you telepathically over any distance, even across planes.",
      ],
      [
        'Prophecy of Frostmourne. When you attune to Frostmourne, your creature type becomes Undead, and your alignment becomes Neutral Evil. These changes remain even if your Attunement ends.',
      ],
      [
        'Twisted Aura. If you are a Paladin, you also gain the following benefits while attuned to Frostmourne:',
      ],
      [
        'Marshal Undead. Undead creatures of your choice (excluding you) in your Aura of Protection have Advantage on attack rolls and saving throws.',
      ],
      ['Numb to Cold. Allies in your Aura of Protection have Immunity to Cold damage.'],
      ['Random Properties. Frostmourne has the following random properties:'],
      ['1 major beneficial property'],
      ['1 minor detrimental property'],
      ['1 major detrimental property'],
      [
        "Destroying Frostmourne. Frostmourne shatters if its wielder is slain by the legendary sword Ashbringer. Only the Runecarver, who forged the weapon at the Jailer's command, can reforge Frostmourne from the resulting fragments.",
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  goblin_jumper_cables: {
    name: 'Goblin Jumper Cables',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        "As a Magic action, you can attach these cables to a dead creature and attempt to return the creature to life. Make a DC 15 Intelligence (Arcana) check using Tinker's Tools. On a successful check, the creature revives with 1 Hit Point as long as the creature has been dead no longer than 1 minute and didn't die of old age. On a failed check, you take 2d6 Lightning damage.",
      ],
      ["Once used, a set of Goblin Jumper Cables can't be used again until the next dawn."],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  hearthstone: {
    name: 'Hearthstone',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'A Hearthstone teleports you to a predetermined location—usually an inn. Activating the stone takes 1 minute and a Magic action. You appear in an unoccupied space within 30 feet of the destination you previously set.',
      ],
      [
        "While you are at an inn (or other locations at the DM's discretion), you can take a Magic action to set that location as the destination for your Hearthstone's teleportation. That location becomes your destination until you change it.",
      ],
      [
        "One Hearthstone doesn't count against the number of magic items you can have Attunement to.",
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  helm_of_domination: {
    name: 'Helm of Domination',
    category: 'Wondrous Item',
    rarity: 'artifact',
    attunement: true,
    text: [
      [
        'This ornate helm is infused with the power of domination—a form of runic magic intended to utterly suppress the will of another being. The helm (along with its companion Artifact, Frostmourne) allowed its wearers—three successive Lich Kings—to rule the Scourge.',
      ],
      [
        "Attuning to the Helm. When you attune to the helm, make a DC 18 Charisma saving throw. On a successful save, you take 10d6 Psychic damage. On a failed save, your soul merges with the Lich King, who then takes control of your body like a puppet, and you become an NPC under the DM's control.",
      ],
      [
        "While attuned to the helm, you are unwilling to part with the helm, wearing it at all times, and you can't voluntarily end your Attunement to the helm.",
      ],
      [
        'Properties of the Helm. While attuned to the helm, your alignment is Neutral Evil, and you gain the following benefits:',
      ],
      [
        'Command the Scourge. As a Magic action, you can send a psychic command to each Undead that is part of the Scourge. Make an ability check using your spellcasting ability (DC 20). On a successful check, you can issue a general command to the Undead Scourge, such as "attack any creature you come across" or "guard my stronghold," or you can issue a command to a specific member of the Scourge, such as "deliver a plague to Stormwind." Whether or not you succeed, this property of the helm can\'t be used again until the next dawn.',
      ],
      ['Truesight. You have Truesight with a range of 120 feet.'],
      [
        'Spellcasting. The helm has 8 charges and regains 1d4 + 4 expended charges daily at dawn. While wearing the helm, you can cast one of the spells on the following table from it (save DC 18). The table indicates how many charges you must expend to cast the spell.',
      ],
      ['Spell · Charge Cost'],
      ['Animate Dead · 1'],
      ['Clairvoyance · 2'],
      ['Dream · 4'],
      ['Speak with Dead · 1'],
      ['Telepathy · 5'],
      ['Word of Recall · 5'],
      ['Random Properties. The Helm of Domination has the following random properties:'],
      ['1 major beneficial property'],
      ['1 minor detrimental property'],
      ['1 major detrimental property'],
      [
        'Destroying the Helm of Domination. The helm is shattered if struck by a blade forged in the Shadowlands. Only the Runecarver, who originally forged the helm, can reforge it from the fragments.',
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  judgment_armor: {
    name: 'Judgment Armor',
    category: 'Armor',
    detail: 'Plate Armor',
    rarity: 'legendary',
    text: [
      ['Weight · 65 lb'],
      [
        'While wearing this armor, you are under the effects of the Detect Evil and Good and Protection from Evil and Good spells (no Concentration required). If you are a Paladin, the effects of Protection from Evil and Good extend to creatures of your choice in your Aura of Protection.',
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  life_staff_of_the_web_lair: {
    name: 'Life-Staff of the Web Lair',
    category: 'Staff',
    rarity: 'legendary',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      ['This staff has 8 charges.'],
      [
        "Arachnid's Grace. While attuned to the staff, you can move up, down, and across vertical surfaces and along ceilings without using your hands. You also gain a Climb Speed equal to your Speed. You ignore movement restrictions caused by webs, and you know the location of any other creature in contact with the same web.",
      ],
      ['Web. While holding the staff, you can expend 1 charge to cast Web (save DC 18) from it.'],
      [
        'Vampiric Silk. While holding the staff, you can take a Bonus Action and expend 1 charge to have a creature in the area of your Web spell make a DC 18 Constitution saving throw. (The creature makes the save with Disadvantage if it has the ',
        rules.restrained,
        ' condition from the webbing.) The creature takes 4d10 Necrotic damage on a failed save or half as much damage on a successful one. Either way, you regain Hit Points equal to half the damage dealt.',
      ],
      [
        'Regaining Charges. The staff regains 1d6 + 2 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the staff dissolves into a swarm of harmless spiders and is destroyed.',
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  noggenfogger_elixir: {
    name: 'Noggenfogger Elixir',
    category: 'Potion',
    rarity: 'rare',
    text: [
      [
        "Noggenfogger Elixir is an unpredictable potion invented by Marin Noggenfogger, the trade prince of the Steamwheedle Cartel. It is highly coveted by adventurers (particularly goblins), despite or perhaps because of its unpredictable effects. When you drink this potion, roll 1d6: On a 1-2, you take on a skeletal appearance for 1d4 hours, during which time you don't need to breathe. (Not breathing doesn't give you ",
        rules.exhaustion,
        ' levels.) On a 3-4, you gain the Reduce effect of the Enlarge/Reduce spell for 1d4 hours (no Concentration required). On a 5-6, your rate of descent while falling slows to 60 feet per round for 10 minutes. During that time, you take no damage from falling.',
      ],
      [
        "Drinking multiple Noggenfogger Elixirs doesn't require you to roll on the Potion Miscibility table in the Dungeon Master's Guide.",
      ],
      ['This green potion is oily in the mouth.'],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  philosophers_stone: {
    name: "Philosopher's Stone",
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: 'by its creator',
    text: [
      [
        "A Philosopher's Stone is a powerful reagent used in alchemy, and it can be effectively used only by the alchemist who created it. While you carry it, you gain the following benefits.",
      ],
      [
        "Spellcasting Focus. You can use your Philosopher's Stone as a Spellcasting Focus for your spells.",
      ],
      [
        "Transmute Resources. If you spend 1 hour (which can be concurrent with a Short Rest) with your Philosopher's Stone and crafting resources of a single kind (fish, gems, herbs, ores or stones, leather or hide, or cloth), you can magically transmute the resources into resources of a different kind but the same value. Thus, you can convert 100 GP worth of herbs into 100 GP worth of ore or vice versa, or change 500 GP of mithril (a common ore) into 500 GP of truesilver (a rare ore).",
      ],
      [
        'Mixology. When you roll a die to determine the effect of a potion you drink (including the result of mixing potions), you can roll the die twice and choose either result. If a potion you drink has a duration, that duration is doubled.',
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  potion_of_mana: {
    name: 'Potion of Mana',
    category: 'Potion',
    rarity: 'common',
    text: [
      ['You regain one expended level 1 spell slot when you drink this potion.'],
      ["The potion's blue liquid glows with an inner light."],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  potion_of_mana_greater: {
    name: 'Potion of Mana (Greater)',
    category: 'Potion',
    rarity: 'uncommon',
    text: [
      [
        'You regain one expended level 1-3 spell slot when you drink this potion. You choose the spell slot you regain.',
      ],
      ["The potion's blue liquid glows with an inner light."],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  potion_of_mana_superior: {
    name: 'Potion of Mana (Superior)',
    category: 'Potion',
    rarity: 'rare',
    text: [
      [
        'You regain one expended level 1-5 spell slot when you drink this potion. You choose the spell slot you regain.',
      ],
      ["The potion's blue liquid glows with an inner light."],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  potion_of_rejuvenation: {
    name: 'Potion of Rejuvenation',
    category: 'Potion',
    rarity: 'uncommon',
    text: [
      [
        'You regain 3d4 + 3 Hit Points and one expended level 1 spell slot when you drink this potion.',
      ],
      ["The potion's magenta liquid glows faintly from within."],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  potion_of_rejuvenation_greater: {
    name: 'Potion of Rejuvenation (Greater)',
    category: 'Potion',
    rarity: 'rare',
    text: [
      [
        'You regain 6d4 + 6 Hit Points and one expended level 1-3 spell slot when you drink this potion. You choose the spell slot you regain.',
      ],
      ["The potion's magenta liquid glows faintly from within."],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  potion_of_rejuvenation_superior: {
    name: 'Potion of Rejuvenation (Superior)',
    category: 'Potion',
    rarity: 'very rare',
    text: [
      [
        'You regain 9d4 + 9 Hit Points and one expended level 1-5 spell slot when you drink this potion. You choose the spell slot you regain.',
      ],
      ["The potion's magenta liquid glows faintly from within."],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  rod_of_the_sleepwalker: {
    name: 'Rod of the Sleepwalker',
    category: 'Rod',
    rarity: 'very rare',
    text: [
      [
        'This rod puts creatures into a suggestible, sleepwalking state. You can cast Dominate Monster (save DC 17) from this rod, with the following modifications:',
      ],
      ["Duration. The spell's duration is Concentration, up to 8 hours."],
      [
        "Immunity. Creatures that don't sleep, such as elves, or that have Immunity to the ",
        rules.exhaustion,
        ' condition automatically succeed on the save.',
      ],
      [
        "Memory. An affected creature remembers nothing from the spell's duration once the spell ends.",
      ],
      [
        "Once the rod has been used to cast the spell in this way, it can't be used to do so again until the next dawn.",
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  shadowfang: {
    name: 'Shadowfang',
    category: 'Weapon',
    detail: 'Longsword',
    rarity: 'rare',
    text: [
      ['Weight · 3 lb'],
      ['You gain a +1 bonus to attack rolls and damage rolls made with this magic weapon.'],
      [
        "Mark of the Worgen. In most circumstances, the weapon appears unremarkable. But under the night sky, ragged fur and sharp fangs sprout around the sword's cross guard. While transformed in this way, Shadowfang deals an extra 2d6 Necrotic damage on a hit. The weapon returns to normal at dawn or if it is brought indoors.",
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  shalamayne: {
    name: 'Shalamayne',
    category: 'Weapon',
    detail: 'Greatsword',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 6 lb'],
      [
        "When dragon magic split King Varian Wrynn into two versions of himself, one of his selves wielded the night elven blade Shalla'tor, while the other wielded the night elven blade Ellemayne. Varian eventually merged his twin selves back into one whole. In doing so, he inadvertently fused the blades into a new weapon called Shalamayne.",
      ],
      [
        "The Jailer, one of the rulers of the Shadowlands, once stole and reforged Shalamayne into a mourneblade called Kingsmourne. But Varian's son, Anduin Wrynn, later restored Shalamayne to its rightful form. Anduin is the sword's last known wielder.",
      ],
      [
        'Magic Weapon. You gain a +3 bonus to attack rolls and damage rolls made with this magic weapon. It deals an extra 2d12 Force damage on a hit.',
      ],
      [
        'Dual Mastery. If you have the Weapon Mastery feature and choose Greatsword as one of your mastered weapons, you can use both the Graze and Sap mastery properties at once while wielding Shalamayne.',
      ],
      [
        "Splitting and Reuniting the Sword. While holding Shalamayne, you can take a Magic action to end your Attunement to the weapon and split it into two magic swords: Shalla'tor and Ellemayne. Each is a +3 Longsword with the Finesse and Light properties. A creature who holds both swords can take a Magic action to rejoin them into Shalamayne, attuning to the weapon instantly.",
      ],
      ['Random Properties. Shalamayne has the following random properties:'],
      ['2 minor beneficial properties'],
      ['1 major beneficial property'],
      [
        "Destroying Shalamayne. One can destroy Shalamayne by splitting it into Shalla'tor and Ellemayne, then burying one or both swords at the roots of a World Tree in the Emerald Dream. After one year, the buried swords dissolve into the soil.",
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  staff_of_light_and_shadow: {
    name: 'Staff of Light and Shadow',
    category: 'Staff',
    rarity: 'legendary',
    attunement: 'by a Cleric',
    text: [
      ['Weight · 4 lb'],
      [
        'This staff has two forms: a shadowy state known as Anathema and a holy state known as Benediction. While attuned to the staff, you can switch the staff from one state to the other at dawn.',
      ],
      ['Anathema. As Anathema, the staff grants the following benefits:'],
      ['Necrotic Resistance. While attuned to the staff, you have Resistance to Necrotic damage.'],
      [
        "Shadow Mana. While you're holding the staff, when you cast a level 1-5 spell from the Necromancy school that would expend a spell slot, you can roll 1d6. If the number on the die exceeds the spell's level, the spell slot isn't expended.",
      ],
      ['Benediction. As Benediction, the staff grants the following benefits:'],
      ['Radiant Resistance. While attuned to the staff, you have Resistance to Radiant Damage.'],
      [
        "Light-Blessed Healing. While you're holding the staff, when you cast a spell that would restore Hit Points to a creature, you can treat the spell as if it had been cast using a spell slot of 1 level higher.",
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  sulfuras_hand_of_ragnaros: {
    name: 'Sulfuras, Hand of Ragnaros',
    category: 'Weapon',
    detail: 'Maul',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 10 lb'],
      [
        'The elementium Maul Sulfuras is the weapon of Ragnaros, the Elemental Lord of Fire. In the beginning, the four elemental lords warred against one another for dominance over the nascent Azeroth. While the other elemental lords fought with mastery of their own elements, Ragnaros used Sulfuras to turn their elements against them, boiling seas, choking the skies with smoke and embers, and turning mountains into erupting volcanoes.',
      ],
      [
        'Magic Weapon. You gain a +3 bonus to attack rolls and damage rolls made with this magic weapon. A creature hit by this weapon takes an extra 1d10 Fire damage and starts burning, taking 1d10 Fire damage at the start of each of its turns instead of the normal burning damage.',
      ],
      [
        "Ignite the Elements. While holding this weapon, you can take a Magic action to produce one of the following effects. Once an effect has been used, that effect can't be used again until the next dawn:",
      ],
      [
        'Boiling Point. You cause any container or body of water within 1 mile of you to boil for 1 minute. A creature that enters the boiling water or starts its turn there takes 2d10 Fire damage.',
      ],
      ['Embersmoke. You cast Incendiary Cloud (save DC 18) from the weapon.'],
      [
        'Eruption. You make lava erupt in a 10-foot-radius, 60-foot-high Cylinder centered on a point on the ground you can see within 120 feet. Each creature in that area makes a DC 18 Dexterity saving throw, taking 9d10 Fire damage plus 9d10 Bludgeoning damage on a failed save or half as much damage on a successful one.',
      ],
      ['Random Properties. Sulfuras has the following random properties:'],
      ['1 minor beneficial property'],
      ['1 major beneficial property'],
      ['1 minor detrimental property'],
      ['1 major detrimental property'],
      [
        "Destroying Sulfuras. In an underwater tunnel network deep beneath Vashj'ir lies an abandoned, heavily trapped temple to Neptulon, the Elemental Lord of Water. Placing Sulfuras on the temple's central altar quenches its fire permanently, rendering it nonmagical and destructible.",
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  trolls_blood_elixir: {
    name: "Troll's Blood Elixir",
    category: 'Potion',
    rarity: 'uncommon',
    text: [
      [
        'When you drink this potion, you regain 2 Hit Points. At the start of each of your turns for the next 1 minute, you regain that number of Hit Points again if you have at least 1 Hit Point. This thick green elixir is made from herbs.',
      ],
      ['No trolls were harmed in the making of this elixir.'],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  trolls_blood_elixir_greater: {
    name: "Troll's Blood Elixir (Greater)",
    category: 'Potion',
    rarity: 'rare',
    text: [
      [
        'When you drink this potion, you regain 4 Hit Points. At the start of each of your turns for the next 1 minute, you regain that number of Hit Points again if you have at least 1 Hit Point. This thick green elixir is made from herbs.',
      ],
      ['No trolls were harmed in the making of this elixir.'],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  trolls_blood_elixir_superior: {
    name: "Troll's Blood Elixir (Superior)",
    category: 'Potion',
    rarity: 'very rare',
    text: [
      [
        'When you drink this potion, you regain 6 Hit Points. At the start of each of your turns for the next 1 minute, you regain that number of Hit Points again if you have at least 1 Hit Point. This thick green elixir is made from herbs.',
      ],
      ['No trolls were harmed in the making of this elixir.'],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  trolls_blood_elixir_supreme: {
    name: "Troll's Blood Elixir (Supreme)",
    category: 'Potion',
    rarity: 'legendary',
    text: [
      [
        'When you drink this potion, you regain 8 Hit Points. At the start of each of your turns for the next 1 minute, you regain that number of Hit Points again if you have at least 1 Hit Point. This thick green elixir is made from herbs.',
      ],
      ['No trolls were harmed in the making of this elixir.'],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  twin_blades_of_azzinoth: {
    name: 'Twin Blades of Azzinoth',
    category: 'Weapon',
    detail: 'Scimitar',
    rarity: 'artifact',
    attunement: true,
    text: [
      ['Weight · 3 lb'],
      [
        'This pair of demonic warglaives once belonged to Azzinoth, an ancient doomguard commander of the Burning Legion. Illidan Stormrage slew Azzinoth millennia ago during the War of the Ancients and reforged the blades for himself, allowing him to use fel magic against the demons of the Legion.',
      ],
      [
        'Magic Weapons. You gain a +3 bonus to attack rolls and damage rolls made with these magic weapons. Each deals an extra 2d8 Psychic damage if the target is a Fiend; this Psychic damage ignores Resistance and Immunity.',
      ],
      [
        'Fel Synchronization. If you hit the same creature with both weapons on a turn, that creature makes a DC 18 Wisdom saving throw immediately after the second weapon hits. On a failed save, the creature is racked by fel magic and has the ',
        rules.stunned,
        ' condition until the end of its next turn.',
      ],
      [
        "Flames of Azzinoth. As a Magic action, you can throw one of the weapons to an unoccupied space on the ground you can see within 30 feet of you. The blade transforms into a fiery green fiend as if you had cast the Summon Fiend spell (choose the Devil option). The spell lasts for 1 minute, and when the summoned fiend disappears, the weapon reappears in your hand. You can't turn that weapon into a Fiend again until 7 days have passed.",
      ],
      ['Random Properties. The Twin Blades of Azzinoth have the following random properties:'],
      ['1 minor beneficial property'],
      ['1 major beneficial property'],
      ['1 minor detrimental property'],
      [
        'Destroying the Blades. Reciting an ancient poem called "Gift of the Light" over the blades causes them to dissolve into glittering dust. This poem has largely been lost to time, but a few rare naaru remember it.',
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
  vithrak_gaze_of_the_deadman: {
    name: 'Vithrak, Gaze of the Deadman',
    category: 'Ring',
    rarity: 'very rare',
    text: [
      [
        'This ring has 3 charges and regains 1d3 expended charges daily at dawn. While wearing the ring, you can take a Magic action and expend 1 charge to learn the Resistances, Vulnerabilities, and Immunities (if any) of a creature you can see within 120 feet of yourself. When you use this effect, your eyes briefly become glassy, gray husks.',
      ],
    ],
    publication: refs.publications.d_d_world_of_warcraft,
  },
})
