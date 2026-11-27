import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  deck_of_several_things: {
    name: 'Deck of Several Things',
    category: 'Wondrous Item',
    rarity: 'legendary',
    text: [
      [
        'Stored in a leather pouch, this unique deck contains twenty-two colored cards made of some strong but unknown metal, each of which features a design printed as a mosaic of raised dots. Before you draw a card, you must declare how many cards you intend to draw and then draw them randomly (you can use an altered deck of playing cards to simulate the deck). Any cards drawn in excess of this number have no effect. Otherwise, as soon as you draw a card from the deck, its magic takes effect. You must draw each card no more than 1 hour after the previous draw. If you fail to draw the chosen number, the remaining number of cards fly from the deck on their own and take effect all at once.',
      ],
      [
        'Once a card is drawn, it fades from existence. Unless the card is the LLK or the LLK, the card reappears in the deck, making it possible to draw the same card twice.',
      ],
      ['1d22 · Card'],
      ['1 · LLK'],
      ['2 · LLK'],
      ['3 · LLK'],
      ['4 · LLK'],
      ['5 · LLK'],
      ['6 · LLK'],
      ['7 · LLK'],
      ['8 · LLK'],
      ['9 · LLK'],
      ['10 · LLK'],
      ['11 · LLK'],
      ['12 · LLK'],
      ['13 · LLK'],
      ['14 · LLK'],
      ['15 · LLK'],
      ['16 · LLK'],
      ['17 · LLK'],
      ['18 · LLK'],
      ['19 · LLK'],
      ['20 · LLK'],
      ['21 · LLK'],
      ['22 · LLK'],
      [
        'Balance. Your mind suffers a wrenching alteration, causing your alignment to change for the duration of the adventure. Lawful becomes chaotic, good becomes evil, and vice versa. If you are true neutral or unaligned, this card has no effect on you.',
      ],
      [
        'Comet. If you single-handedly defeat the next hostile monster or group of monsters you encounter, you have advantage on ability checks made using one skill of your choice for the duration of the adventure. Otherwise, this card has no effect.',
      ],
      [
        'Donjon. You are instantly teleported to and confined within the prison of the Monastery of the Distressed Body (area M6). Everything you were wearing and carrying stays behind in the space you occupied when you disappeared. You draw no more cards.',
      ],
      [
        "Euryale. The card's medusa-like visage curses you. You take a −1 penalty on saving throws for the duration of the adventure.",
      ],
      [
        "The Fates. Reality's fabric unravels and spins anew, allowing you to avoid or erase one event as if it never happened. You can use the card's magic as soon as you draw the card or at any other point during the adventure.",
      ],
      [
        "Flames. The Grand Master of the Monastery of the Distressed Body becomes your enemy. The bone devil seeks your ruin, savoring your suffering before attempting to slay you. If the Grand Master has already been defeated, you gain the enmity of Garret Levistusson's patron—a similarly powerful devil.",
      ],
      [
        'Fool. For the duration of the adventure, you lose proficiency with one skill or gain disadvantage on all checks made with one skill (with the skill and the penalty determined by the DM). Discard this card and draw from the deck again, counting both draws as one of your declared draws.',
      ],
      [
        'Gem. The 1,000 gp hoard of the leprechaun from the Wilderness Encounters table (see appendix A) appears at your feet. If that treasure has already been claimed, you gain an equivalent hoard.',
      ],
      [
        'Idiot. Reduce your Intelligence by 1d4 + 1 (to a minimum score of 1) for the duration of the adventure. You can draw one additional card beyond your declared draws.',
      ],
      [
        'Jester. You gain proficiency in a skill of your choice for the duration of the adventure, or you can draw two additional cards beyond your declared draws.',
      ],
      [
        'Key. A common or uncommon magic weapon with which you are proficient, or a spell scroll featuring a spell of a level you can cast, appears in your hands. The DM chooses the weapon or spell, which you possess for the duration of this adventure.',
      ],
      [
        'Knight. You gain the service of any of the NPCs in the "Hirelings" section not currently with the party, who appears in a space you choose within 30 feet of you. The NPC serves you loyally for the duration of the adventure, believing that the fates have drawn them to you. You control this character.',
      ],
      [
        'Moon. You are granted the ability to cast any spell of 5th level or lower, and can use that ability 1d3 times for the duration of the adventure.',
      ],
      [
        "Rogue. An NPC of the DM's choice becomes secretly hostile toward you. The identity of your new enemy isn't known until the NPC or someone else reveals it. Any enchantment spell cast on the NPC at 6th level or higher can end the NPC's hostility toward you.",
      ],
      [
        "Ruin. All forms of wealth that you carry or own, other than magic items, are lost to you. This wealth can be recovered either in the treasury of the Monastery of the Distressed Body (area M10) or Kwalish's lab in Daoine Gloine (area O7), whichever comes later in the adventure.",
      ],
      [
        "Skull. You summon an avatar of death—a mechanical skeleton (use bone naga statistics) clad in a tattered black robe. It appears in a space of the DM's choice within 10 feet of you and attacks you, warning all others that you must win the battle alone. The avatar fights until you die or it drops to 0 hit points, whereupon it disappears. If anyone tries to help you, the helper summons its own avatar of death. A creature slain by an avatar of death can't be restored to life.",
      ],
      [
        "Star. Increase one of your ability scores by 1 for the duration of the adventure. The score can exceed 20 but can't exceed 24.",
      ],
      [
        'Sun. You gain proficiency in the skill of your choice for the duration of the adventure. In addition, a common or uncommon wondrous item appears in your hands. The DM chooses the item, which you possess for the duration of this adventure.',
      ],
      [
        "Talons. Every magic item you wear or carry is lost to you. These items can be recovered either in the treasury of the Monastery of the Distressed Body (area M10) or Kwalish's lab in Daoine Gloine (area O7), whichever comes later in the adventure.",
      ],
      [
        "Throne. You gain proficiency in the Persuasion skill and you double your proficiency bonus on checks made with that skill for the duration of the adventure. In addition, the Monastery of the Distressed Body's brains in jars regard you thereafter as the monastery's rightful master. You must defeat or otherwise clear out the Grand Master and its servants before you can claim the monastery as yours.",
      ],
      [
        'Vizier. At any one time you choose within the duration of the adventure, you can ask a question in meditation and mentally receive a truthful answer to that question. Besides information, the answer helps you solve a puzzling problem or other dilemma. In other words, the knowledge comes with wisdom on how to apply it.',
      ],
      [
        "The Void. This black card spells disaster. Your soul is drawn from your body and held within machinery in either the control room of the Monastery of the Distressed Body (area M8) or Kwalish's lab in Daoine Gloine (area O7), whichever comes later in the adventure. While your soul is trapped in this way, your body is ",
        rules.incapacitated,
        '. Divination, contact other plane, or a similar spell of 4th level or higher reveals the location of the machinery that holds your soul. You draw no more cards.',
      ],
      [
        "Using the Deck of Several Things. The special nature of this deck (carried by Mary Greymalkin if she is used as an NPC) means that many of its effects operate only within and with respect to this specific adventure. This typically covers any time the characters spend between setting out for the Barrier Peaks and the resolution of whatever events transpire in Kwalish's lab (area O7).",
      ],
      [
        "For cards that effectively remove a character from play for a period of time (LLK and LLK), you can allow a player to take on the role of one of the party's NPC hirelings, or introduce a temporary character as an NPC met during the party's journey. Alternatively, you can decide that only some aspect of the character's will disappears and is imprisoned, leaving the character to operate in a robotic state until freed.",
      ],
    ],
    effects: [
      {
        key: 'euryale',
        name: "Euryale's Curse",
        lands: { on: 'use' },
        text: ['You take a −1 penalty on saving throws for the duration of the adventure.'],
        lasts: { kind: 'until', text: ['the duration of the adventure'] },
      },
      {
        key: 'idiot',
        name: 'Idiot',
        lands: { on: 'use' },
        text: [
          'Reduce your Intelligence by 1d4 + 1 (to a minimum score of 1) for the duration of the adventure.',
        ],
        lasts: { kind: 'until', text: ['the duration of the adventure'] },
      },
      {
        key: 'the-void',
        name: 'Soul Trapped',
        lands: { on: 'use' },
        conditions: [rules.incapacitated],
        text: [
          "Your soul is drawn from your body and held within machinery in either the control room of the Monastery of the Distressed Body (area M8) or Kwalish's lab in Daoine Gloine (area O7), whichever comes later in the adventure.",
        ],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.lost_laboratory_of_kwalish,
  },
  galders_bubble_pipe: {
    name: "Galder's Bubble Pipe",
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'This finely carved pipe blows odorless bubbles instead of smoke when used. The pipe has 3 charges, and it regains all spent charges daily at dawn. While you hold the pipe, you can expend charges to gain access to the following properties:',
      ],
      ['You can cast fog cloud as an action (1 charge).'],
      ['You can cast misty step as a bonus action (2 charges).'],
      [
        'You can summon a steam mephit as an action (3 charges). The mephit is friendly to you, obeys your verbal commands, and acts on its own turn in the initiative order. It disappears in a harmless puff of steam after 1 minute or if it ends its turn more than 60 feet from the pipe.',
      ],
    ],
    publication: refs.publications.lost_laboratory_of_kwalish,
  },
  hewards_hireling_armor: {
    name: "Heward's Hireling Armor",
    category: 'Armor',
    detail: 'Leather Armor',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 10 lb'],
      [
        "A number of Kwalish's experiments were attempts to research the works of the legendary mage Heward, who first crafted what he named hireling armor. While wearing this armor, you gain a +1 bonus to AC. In addition, the armor's animated straps can assist with the drawing and sheathing of weapons, such that you can draw or stow two one-handed weapons when you would normally be able to draw or stow only one.",
      ],
      [
        "This armor also has six pockets, each of which is an extradimensional space. Each pocket can hold up to 20 pounds of material, not exceeding a volume of 2 cubic feet. The armor always weighs 10 pounds, regardless of its pockets' contents. Placing an object into one of the armor's pockets follows the normal rules for interacting with objects. Retrieving an item from a pocket of the armor requires you to use an action. When you reach into a pocket for a specific item, the item is always magically on top.",
      ],
      [
        "Placing the armor inside an extradimensional space created by a bag of holding, a Heward's handy haversack, or a similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it and deposited in a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.",
      ],
    ],
    publication: refs.publications.lost_laboratory_of_kwalish,
  },
  ioun_stone_historical_knowledge: {
    name: 'Ioun Stone, Historical Knowledge',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.',
      ],
      [
        'When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.',
      ],
      [
        'A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.',
      ],
      [
        'You gain proficiency in the History skill, or a +1 bonus to checks with that skill if already proficient, while this polished, steely sphere orbits your head.',
      ],
    ],
    publication: refs.publications.lost_laboratory_of_kwalish,
  },
  ioun_stone_language_knowledge: {
    name: 'Ioun Stone, Language Knowledge',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.',
      ],
      [
        'When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.',
      ],
      [
        'A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.',
      ],
      [
        'You are fluent in one additional language while this pulsating bit of red jeweled crystal orbits your head. The DM chooses the language bestowed by the stone.',
      ],
    ],
    publication: refs.publications.lost_laboratory_of_kwalish,
  },
  ioun_stone_natural_knowledge: {
    name: 'Ioun Stone, Natural Knowledge',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.',
      ],
      [
        'When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.',
      ],
      [
        'A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.',
      ],
      [
        'You gain proficiency in the Nature skill, or a +1 bonus to checks with that skill if already proficient, while this burnished, brassy stone orbits your head.',
      ],
    ],
    publication: refs.publications.lost_laboratory_of_kwalish,
  },
  ioun_stone_religious_knowledge: {
    name: 'Ioun Stone, Religious Knowledge',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.',
      ],
      [
        'When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.',
      ],
      [
        'A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.',
      ],
      [
        'You gain proficiency in the Religion skill, or a +1 bonus to checks with that skill if already proficient, while this tiny golden gem orbits your head.',
      ],
    ],
    publication: refs.publications.lost_laboratory_of_kwalish,
  },
  ioun_stone_self_preservation: {
    name: 'Ioun Stone, Self-Preservation',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.',
      ],
      [
        'When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.',
      ],
      [
        'A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.',
      ],
      [
        'You gain a +1 bonus to Intelligence saving throws while this silvery gem orbits your head.',
      ],
    ],
    publication: refs.publications.lost_laboratory_of_kwalish,
  },
  ioun_stone_supreme_intellect: {
    name: 'Ioun Stone, Supreme Intellect',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.',
      ],
      [
        'When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.',
      ],
      [
        'A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.',
      ],
      ['You gain a +1 bonus to Intelligence checks while this faceted sphere orbits your head.'],
    ],
    publication: refs.publications.lost_laboratory_of_kwalish,
  },
  leather_golem_armor: {
    name: 'Leather Golem Armor',
    category: 'Armor',
    detail: 'Leather Armor',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 10 lb'],
      [
        'Strange rituals have repurposed the body of a flesh golem into this partially sentient suit of leather armor. While wearing this armor, you gain a +1 bonus to AC and to saving throws against spells and other magical effects. In addition, you gain the following properties:',
      ],
      ['Immutable Form. You are immune to any spell or effect that would alter your form.'],
      [
        'Lightning Absorption. You gain resistance to lightning damage. Whenever you take lightning damage, you gain 5 temporary hit points.',
      ],
      [
        'Curse. This armor is cursed, and becoming attuned to it extends the curse to you. Until the curse is broken with a remove curse spell or similar magic, you are unwilling to part with the armor. In addition, while you wear the cursed armor, you gain the following properties:',
      ],
      [
        'Aversion of Fire. If you take fire damage, you have disadvantage on attack rolls and ability checks until the end of your next turn.',
      ],
      [
        'Berserk. Whenever a critical hit is made against you, roll a d6. On a 6, the armor causes you to go berserk. On each of your turns while berserk, you attack the nearest creature you can see. If no creature is near enough to move to and attack, you attack an object, with preference for an object smaller than yourself. Once the armor causes you to go berserk, it cannot be removed. You continue to attack until you are ',
        rules.incapacitated,
        ' or until another creature is able to calm you with appropriate magic (such as a calm emotions spell) or a successful DC 15 Charisma (Persuasion) check.',
      ],
    ],
    effects: [
      {
        key: 'aversion-of-fire',
        name: 'Aversion of Fire',
        lands: { on: 'use' },
        text: [
          'If you take fire damage, you have disadvantage on attack rolls and ability checks until the end of your next turn.',
        ],
        lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
      },
      {
        key: 'berserk',
        name: 'Berserk',
        lands: { on: 'use' },
        text: [
          'On each of your turns while berserk, you attack the nearest creature you can see. If no creature is near enough to move to and attack, you attack an object, with preference for an object smaller than yourself.',
        ],
        lasts: {
          kind: 'until',
          text: [
            'you are ',
            rules.incapacitated,
            ' or until another creature is able to calm you with appropriate magic (such as a calm emotions spell) or a successful DC 15 Charisma (Persuasion) check',
          ],
        },
      },
    ],
    publication: refs.publications.lost_laboratory_of_kwalish,
  },
  powered_armor: {
    name: 'Powered Armor',
    category: 'Armor',
    detail: 'Plate Armor',
    rarity: 'legendary',
    attunement: true,
    text: [
      ['Weight · 65 lb'],
      [
        "Powered armor resembles a suit of unusual plate armor, with finely articulated joints connected by an oily, black, leather-like material. The armor has been worked to create the appearance of a heavily muscled warrior, and its great helm is unusual in that it has no openings—only a broad glass plate in the front with a second piece of glass above it. Strange plates, tubing, and large metal bosses adorn the armor in seemingly random fashion. On the back of the armor's left gauntlet is a rectangular metal box, from which projects a short rod tipped with a cone-shaped red crystal.",
      ],
      ['While wearing this armor, you gain the following benefits:'],
      ['You have a +1 bonus to AC.'],
      ['Your Strength score is 18 (this has no effect if your Strength is already 18 or higher).'],
      ['You have advantage on death saving throws.'],
      [
        'The armor has further capabilities that can be powered either by energy cells or by your own life energy. You can use a bonus action to draw power from an energy cell or sacrifice hit points to gain one of the following benefits:',
      ],
      ['Emit a force field to gain 2d6 + 5 temporary hit points (1 charge or 5 hit points).'],
      [
        'Activate boosters to gain a flying speed of 15 feet for 1 minute (1 charge or 5 hit points).',
      ],
      [
        'Fire arm-mounted laser: Ranged Weapon Attack: +8 to hit, range 120 feet, one target. Hit: 2d6 radiant damage (1 charge or 5 hit points).',
      ],
      [
        'Translate any writing you can see in any nonmagical language, to a total of one thousand words over 1 minute (1 charge or 5 hit points).',
      ],
      [
        'Fill the armor with air, allowing you to breathe normally in any environment for up to 1 hour (1 charge or 5 hit points).',
      ],
      ['Gain darkvision to a range of 60 feet for up to 1 hour (1 charge or 5 hit points).'],
      [
        'The armor can accept only one energy cell at a time. It is found with one energy cell attached, containing 2d10 charges.',
      ],
      [
        "Powered Armor Options. Depending on where and how it appears in the adventure, you might wish to modify the features of Kwalish's legendary powered armor.",
      ],
      [
        "Automatic Defenses. Unless Kwalish deactivates the suit's automatic defenses, no one can approach the armor without setting those defenses off. Treat the armor as a shield guardian that has stored a magic missile spell cast using a 4th-level spell slot. When the armor is reduced to 0 hit points, its defenses are rendered inert and it can be safely approached.",
      ],
      [
        'Battle of Wills. When donned by a new user, the armor deems itself superior and attempts to take possession of that user. The user must succeed on a DC 13 Charisma saving throw or be possessed by the armor. While possessed, the user is ',
        rules.incapacitated,
        " and loses control of its body but retains its awareness. The armor uses the possessed user's statistics (as adjusted by the armor), but doesn't gain access to the user's knowledge, features, or proficiencies.",
      ],
      [
        "Freeing a creature trapped inside the armor first requires defeating the armor's automatic defenses (as above). The trapped creature can also attempt a DC 20 Charisma saving throw each day at dawn. On a successful save, the armor no longer controls the creature and can be safely donned by that creature at any time.",
      ],
      [
        "Stasis. Whenever a creature wearing the armor drops to 0 hit points, the armor places that creature into a state of stasis. While in this state, the creature is stable and does not make death saving throws, but the armor takes control of the creature (as above). Additionally, the armor attempts to assume the identity of the user, assuring their allies that nothing is amiss. Freeing the user first requires defeating the armor's automatic defenses (as above). A creature in stasis does not make Charisma saving throws to break the armor's control.",
      ],
      [
        "Alternative Power. Powered armor originally required energy cells to fuel it, but was adapted by Kwalish to be fueled by the life energy of the creature wearing it. You might decide that the armor can also draw power from additional sources, or that energy cells can be recharged with the aid of a tinker, inventor, or artificer. It might also be possible for allies to connect to the armor through the use of magic that generates a conduit something like an astral silver cord. While so connected, a willing ally can give up hit points as a reaction to fuel the armor's abilities.",
      ],
    ],
    effects: [
      {
        key: 'boosters',
        name: 'Boosters',
        lands: { on: 'use' },
        text: ['Activate boosters to gain a flying speed of 15 feet for 1 minute'],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
      {
        key: 'air',
        name: 'Air Supply',
        lands: { on: 'use' },
        text: [
          'Fill the armor with air, allowing you to breathe normally in any environment for up to 1 hour',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
      {
        key: 'darkvision',
        name: 'Darkvision',
        lands: { on: 'use' },
        text: ['Gain darkvision to a range of 60 feet for up to 1 hour'],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
      },
      {
        key: 'possessed',
        name: 'Possessed by the Armor',
        lands: { on: 'failed-save', save: 'cha', dc: 13 },
        conditions: [rules.incapacitated],
        text: [
          'While possessed, the user is ',
          rules.incapacitated,
          ' and loses control of its body but retains its awareness.',
          ' The trapped creature can also attempt a DC 20 Charisma saving throw each day at dawn. On a successful save, the armor no longer controls the creature and can be safely donned by that creature at any time.',
        ],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.lost_laboratory_of_kwalish,
  },
})
