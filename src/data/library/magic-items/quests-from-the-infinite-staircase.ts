import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  daouds_wondrous_lanthorn: {
    name: "Daoud's Wondrous Lanthorn",
    category: 'Wondrous Item',
    rarity: 'artifact',
    attunement: true,
    text: [
      [
        'This artifact destroys wealth to provide light and protection. Wrought from the finest yellow gold, the lantern has four faces, and an unwavering amber flame burns within it. The faces of the lantern are fitted with faceted gemstone lenses.',
      ],
      [
        'The lantern is a symbol of the teachings of Daoud, who was once a priest of Istus, a god of fate. When Daoud was stripped of his possessions, he developed a radical new philosophy in his quest to understand fate. He urged followers of his ideology to eschew wealth and seek out all fortunes, good and ill, to unravel the cloth of destiny.',
      ],
      ['Random Properties. The lantern has the following random properties:'],
      ['2 minor beneficial properties'],
      ['1 major beneficial property'],
      ['1 minor detrimental property'],
      [
        "Precious Fuel. The lantern burns only one source of fuel: powdered gemstones placed in the lantern's base. The lantern can hold a maximum of 10,000 gp worth of powdered gems, and it contains 9,000 gp of fuel when found. Thereafter it attempts to burn 100 gp of fuel after each year passes, keeping the lantern burning for another year. If no fuel is available, the lantern's flame goes out. You can add more fuel to the lantern as part of a short or long rest. Once added, fuel can't be removed from the lantern's base.",
      ],
      [
        "The lantern's flame can't be extinguished by any means other than running out of fuel. If the lantern's flame goes out, the creature attuned to it immediately dies. One exception to this rule exists (see the \"Destroying the Lantern\" section).",
      ],
      [
        "Revealing Light. The lantern sheds Vision and Light in a 60-foot radius and Vision and Light for an additional 60 feet. Invisible creatures and objects are visible while in the lantern's Vision and Light.",
      ],
      [
        'While attuned to the lantern, you can use a bonus action to dim the lantern, reducing the light to Vision and Light in a 5-foot radius, or brighten the lantern back to its normal Vision and Light radius.',
      ],
      [
        "Lenses. When found, the lantern's faces display the following gem lenses: diamond, emerald, ruby, and sapphire. As part of a short or long rest, you can magically change any of these gem lenses to a different type of gem shown in the Lenses table. The gem lenses can't be removed from the lantern.",
      ],
      [
        "As an action while holding the lantern, you can burn some of the lantern's fuel to cast a spell (save DC 20) through one or more of its current gem lenses, as noted in the Lenses table. The spell's target or point of origin must be in the lantern's area of Vision and Light. If there isn't enough fuel left to cast the spell, the last of the remaining fuel is expended, and the flame goes out.",
      ],
      ['Table: Lenses'],
      ['Lens Color · Spell · Fuel Cost'],
      ['Amethyst · Reverse Gravity · 3,000 gp'],
      ['Diamond · Disintegrate · 2,000 gp'],
      ['Emerald · Haste · 500 gp'],
      ['Jacinth · Flame Strike · 1,000 gp'],
      ['Ruby · Hold Monster · 1,000 gp'],
      ['Sapphire · Fear · 500 gp'],
      ['Topaz · Slow · 500 gp'],
      ['Any four colors · Prismatic Wall · 5,000 gp'],
      [
        "Destroying the Lantern. To destroy the lantern, the creature attuned to it must forsake all material possessions except for the lantern and common clothes. Then the creature must willingly snuff the lantern's flame with the intention to destroy the artifact. When its flame is snuffed in this way, the lantern's gold corrodes, the lenses and remaining gemstone fuel turn to worthless sand, and the creature attuned to it is spared.",
      ],
    ],
    publication: refs.publications.quests_from_the_infinite_staircase,
  },
  heretic: {
    name: 'Heretic',
    category: 'Weapon',
    detail: 'Longsword',
    rarity: 'legendary',
    attunement: 'by a non-good creature',
    text: [
      ['Weight · 3 lb'],
      [
        'The blasphemous weapon Heretic was created by a cult to steal power from good-aligned gods. The blade hungers to strike down servants of the Upper Planes and weaken the forces of good.',
      ],
      [
        'You gain a +3 bonus to attack and damage rolls made with this magic weapon. Heretic has 6 charges for the following properties; the sword regains 1d4 + 1 charges daily at dawn:',
      ],
      [
        'Destroy Devotion. Once per turn when you hit a creature with this weapon, you can expend 1 of its charges to attempt to render the target powerless. The target must succeed on a DC 17 Constitution saving throw or have the ',
        rules.paralyzed,
        ' condition until the start of your next turn. Celestials have disadvantage on the save.',
      ],
      [
        'Faith Hunter. While holding the sword, you can use an action to expend 1 or more of its charges to cast one of the following spells from it: Detect Evil and Good (1 charge), Fly (2 charges), or True Seeing (3 charges).',
      ],
      [
        'Sentience. Heretic is a sentient, chaotic evil weapon with an Intelligence of 17, a Wisdom of 17, and a Charisma of 15. It has hearing and darkvision out to a range of 120 feet.',
      ],
      [
        "The weapon can speak, read, and understand Common and Giant, and it can communicate with its wielder telepathically. Its voice is soft and deep but rises in a wild furor when it's aware Celestials or worshipers of good-aligned deities are present. While you are attuned to it, Heretic also understands every language you know.",
      ],
      [
        'Personality. Heretic craves the destruction of good-aligned gods and their supporters. The blade is condescending and snobby, especially in the company of priests and other pious folk, at whom it often directs sneering comments. When Heretic identifies its quarry, it erupts in a frenzied need for violence.',
      ],
    ],
    effects: [
      {
        key: 'destroy-devotion',
        name: 'Destroy Devotion',
        lands: { on: 'failed-save', save: 'con', dc: 17 },
        conditions: [rules.paralyzed],
        lasts: { kind: 'turn', boundary: 'start', whose: 'source' },
      },
    ],
    publication: refs.publications.quests_from_the_infinite_staircase,
  },
  staff_of_ruling: {
    name: 'Staff of Ruling',
    category: 'Staff',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      [
        "An ornate carving of a serpent adorned with a coursing river spirals down the length of this red-and-gold staff. While you're holding it, you can use an action to produce one of the following effects. Once the staff has produced an effect, it can't produce that effect again until the next dawn.",
      ],
      [
        'Orb of Lightning. You create a Small orb of lightning in an unoccupied space you can see within 60 feet of yourself. You concentrate on this orb as if concentrating on a spell. As a bonus action, you can move the orb up to 20 feet in any direction.',
      ],
      [
        "When your concentration ends, or when a creature enters the orb's space or starts its turn there, the orb detonates in a 20-foot-radius sphere. Each creature in that area must make a DC 15 Dexterity saving throw, taking lightning damage equal to the total accumulated damage on a failed save, or half as much damage on a successful one; the orb's base damage is 6d6, and if at the end of your turn the orb hasn't detonated, its damage increases by 2d6, to a maximum of 10d6.",
      ],
      [
        'Staff to Snake. You throw the staff to an unoccupied space within 10 feet of you, and the staff becomes a giant poisonous snake. The snake is under your control and shares your initiative count, but it takes its turn immediately after yours.',
      ],
      [
        "On your turn, you can mentally command the snake if it is within 60 feet of you and you don't have the ",
        rules.incapacitated,
        ' condition. You decide what action the snake takes and where it moves during its turn, or you can issue it a general command, such as to attack your enemies or guard a location.',
      ],
      [
        'If you use a bonus action to speak the command word again, or if the snake is reduced to 0 hit points, the snake reverts to staff form in its current space.',
      ],
      [
        'Thunderclap. You point the staff skyward, producing a fearsome thunderclap. Each creature of your choice in a 30-foot-radius sphere centered on you must succeed on a DC 15 Constitution saving throw or have the ',
        rules.deafened,
        ' and ',
        rules.frightened,
        ' conditions until the end of your next turn.',
      ],
    ],
    effects: [
      {
        key: 'thunderclap',
        name: 'Thunderclap',
        lands: { on: 'failed-save', save: 'con', dc: 15 },
        conditions: [rules.deafened, rules.frightened],
        lasts: { kind: 'turn', boundary: 'end', whose: 'source' },
      },
    ],
    publication: refs.publications.quests_from_the_infinite_staircase,
  },
})
