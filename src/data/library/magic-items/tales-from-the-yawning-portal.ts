import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  amulet_of_protection_from_turning: {
    name: 'Amulet of Protection from Turning',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 1 lb'],
      [
        'While you wear this amulet of silver and turquoise, you have advantage on saving throws against effects that turn undead.',
      ],
      [
        'If you fail a saving throw against such an effect, you can choose to succeed instead. You can do so three times, and expended uses recharge daily at dawn. Each time an effect that turns undead is used against you, the amulet glows with silvery blue light for a few seconds.',
      ],
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  balance_of_harmony: {
    name: 'Balance of Harmony',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      ['Weight · 1 lb'],
      [
        'This scale bears celestial symbols on one pan and fiendish symbols on the other. You can use the scale to cast detect evil and good as a ritual. Doing so requires you to place the scale on a solid surface, then sprinkle the pans with holy water or place a transparent gem worth 100 gp in each pan. The scale remains motionless if it detects nothing, tips to one side or the other for good (consecrated) or evil (desecrated), and fluctuates slightly if it detects a creature appropriate to the spell but neither good nor evil. By touching the scales after casting the ritual, you instantly learn any information the spell can normally convey, and then the effect ends.',
      ],
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  bracelet_of_rock_magic: {
    name: 'Bracelet of Rock Magic',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 1 lb'],
      [
        'While you wear this gold bracelet, it grants you immunity to being ',
        rules.petrified,
        ', and it allows you to cast flesh to stone (save DC 15) as an action. Once the spell has been cast three times, the bracelet can no longer cast it. Thereafter, you can cast stone shape as an action. After you have done this thirteen times, the bracelet loses its magic and turns from gold to lead.',
      ],
      [
        "Curse. The bracelet's affinity with earth manifests as an unusual curse. Creatures of flesh that are strongly related to earth and stone, such as stone giants and dwarves, have advantage on the saving throw against flesh to stone cast from the bracelet. If such a creature's save is successful, the bracelet breaks your attunement to it and casts the spell on you. You make your saving throw with disadvantage, and on a failed save you are ",
        rules.petrified,
        ' instantly.',
      ],
    ],
    effects: [
      {
        key: 'petrified',
        name: 'Petrified by the bracelet',
        lands: { on: 'failed-save', save: 'con', dc: 15 },
        conditions: [rules.petrified],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  eagle_whistle: {
    name: 'Eagle Whistle',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['Weight · 1 lb'],
      [
        'While you blow an eagle whistle continuously, you can fly twice as fast as your walking speed. You can blow the whistle continuously for a number of rounds equal to 5 + five times your Constitution modifier (minimum of 1 round) or until you talk, hold your breath, or start suffocating. A use of the whistle also ends if you land. If you are aloft when you stop blowing the whistle, you fall. The whistle has three uses. It regains expended uses daily at dawn.',
      ],
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  flame_tongue_shortsword_of_greed: {
    name: 'Flame Tongue Shortsword of Greed',
    category: 'Weapon',
    detail: 'Shortsword',
    rarity: 'unknown',
    attunement: true,
    text: [
      ['Weight · 2 lb'],
      [
        "You can use a bonus action to speak this magic sword's command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the sword is ablaze, it deals an extra 2d6 fire damage to any target it hits. The flames last until you use a bonus action to speak the command word again or until you drop or sheathe the sword.",
      ],
      [
        'While you are attuned to this sword you can use an action to mentally command it to detect gems and jewels. You learn the kind and number of such objects within 60 feet of the sword.',
      ],
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  hell_hound_cloak: {
    name: 'Hell Hound Cloak',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 1 lb'],
      [
        'This dark cloak is made of cured hell hound hide. As an action, you can command the cloak to transform you into a hell hound for up to 1 hour. The transformation otherwise functions as the polymorph spell, but you can use a bonus action to revert to your normal form.',
      ],
      [
        'Curse. This cloak is cursed with the essence of a hell hound, and becoming attuned to it extends the curse to you. Until the curse is broken with remove curse or similar magic, you are unwilling to part with the cloak, keeping it within reach at all times.',
      ],
      [
        "The sixth time you use the cloak, and each time thereafter, you must make a DC 15 Charisma saving throw. On a failed save, the transformation lasts until dispelled or until you drop to 0 hit points, and you can't willingly return to normal form. If you ever remain in hell hound form for 6 hours, the transformation becomes permanent and you lose your sense of self. All your statistics are then replaced by those of a hell hound. Thereafter, only remove curse or similar magic allows you to regain your identity and return to normal. If you remain in this permanent form for 6 days, only a wish spell can reverse the transformation.",
      ],
    ],
    effects: [
      {
        key: 'hell-hound-curse',
        name: 'Hell hound curse',
        lands: { on: 'use' },
        text: ['you are unwilling to part with the cloak, keeping it within reach at all times.'],
        lasts: { kind: 'until-removed' },
        ends: { cure: ['remove curse or similar magic'] },
      },
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  javelin_of_backbiting: {
    name: 'Javelin of Backbiting',
    category: 'Weapon',
    detail: 'Javelin',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 2 lb'],
      [
        'You gain a +2 bonus to attack and damage rolls made with this magic weapon. When you throw it, its normal and long ranges both increase by 30 feet, and it deals one extra die of damage on a hit. After you throw it and it hits or misses, it flies back to your hand immediately.',
      ],
      [
        'Curse. This weapon is cursed, and becoming attuned to it extends the curse to you. Until the curse is broken with remove curse or similar magic, you are unwilling to part with the weapon, keeping it within reach at all times. In addition, you have disadvantage on attack rolls made with weapons other than this one.',
      ],
      [
        'Whenever you roll a 1 on an attack roll using this weapon, the weapon bends or flies to hit you in the back. Make a new attack roll with advantage against your own AC. If the result is a hit, you take damage as if you had attacked yourself with the javelin.',
      ],
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  junky_1_dagger: {
    name: 'Junky +1 Dagger',
    category: 'Weapon',
    detail: 'Dagger',
    rarity: 'unknown',
    text: [
      ['Weight · 1 lb'],
      [
        'You have a +1 bonus to attack and damage rolls made with this dagger, which looks like junk. When it is used, its grip frays, its blade chips, and it flakes rust. If you get a natural 1 on an attack roll while wielding this weapon, it breaks and becomes nonmagical.',
      ],
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  loadstone: {
    name: 'Loadstone',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['Weight · 1 lb'],
      ['This stone is a large gem worth 150 gp.'],
      [
        "Curse. The stone is cursed, but its magical nature is hidden; detect magic doesn't detect it. An identify spell reveals the stone's true nature. If you use the Dash or Disengage action while the stone is on your person, its curse activates. Until the curse is broken with remove curse or similar magic, your speed is reduced by 5 feet, and your maximum load and maximum lift capacities are halved. You also become unwilling to part with the stone.",
      ],
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  macuahuitl: {
    name: 'Macuahuitl',
    category: 'Weapon',
    detail: 'Longsword',
    rarity: 'unknown',
    text: [
      ['Weight · 3 lb'],
      [
        'You have a +1 bonus to attack and damage rolls made with this longsword, which is made of laminated wood, and inset with jagged teeth of obsidian. It deals an extra 2d6 damage to any creature of the plant type.',
      ],
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  mirror_of_the_past: {
    name: 'Mirror of the Past',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['Weight · 1 lb'],
      [
        "The holder of this platinum hand mirror can learn something about the history of a specific object or creature by taking an action to gaze into the mirror and think of the target. Instead of the holder's reflection, the mirror presents scenes from the target's past. Information conveyed is accurate, but it is random and cryptic, and presented in no particular order. Once it is activated, the mirror gives its information for 1 minute or less, then returns to normal. It can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  night_caller: {
    name: 'Night Caller',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      ['Weight · 1 lb'],
      [
        'This whistle is carved from transparent crystal, and it resembles a tiny dragon curled up like a snail. The name Night Caller is etched on the whistle in Dwarvish runes. If a character succeeds on a DC 20 Intelligence (Arcana or History) check, the character recalls lore that says the duergar made several such whistles for various groups in an age past.',
      ],
      [
        "If you blow the whistle in darkness or under the night sky, it allows you to cast the animate dead spell. The target can be affected through up to 10 feet of soft earth or similar material, and if it is, it takes 1 minute to claw its way to the surface to serve you. Once the whistle has animated an undead creature, it can't do so again until 7 days have passed.",
      ],
      [
        'Once every 24 hours, you can blow the whistle to reassert control over one or two creatures you animated with it.',
      ],
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  potion_of_mind_control_beast: {
    name: 'Potion of Mind Control (beast)',
    category: 'Potion',
    rarity: 'rare',
    text: [
      [
        "When you drink a potion of mind control, you can cast a dominate spell (save DC 15) on a specific creature if you do so before the end of your next turn. If you don't, the potion is wasted.",
      ],
      [
        "A potion of mind control produces the effect of a dominate beast spell. If the target's initial saving throw fails, the effect lasts for 1 hour, with no concentration required on your part. The ",
        rules.charmed,
        ' creature has disadvantage on new saving throws to break the effect during this time.',
      ],
    ],
    effects: [
      {
        key: 'dominated',
        name: 'Dominated',
        lands: { on: 'failed-save', save: 'wis', dc: 15 },
        conditions: [rules.charmed],
        text: [
          'The ',
          rules.charmed,
          ' creature has disadvantage on new saving throws to break the effect during this time.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
        ends: { repeatSave: ['damaged'] },
      },
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  potion_of_mind_control_humanoid: {
    name: 'Potion of Mind Control (humanoid)',
    category: 'Potion',
    rarity: 'rare',
    text: [
      [
        "When you drink a potion of mind control, you can cast a dominate spell (save DC 15) on a specific creature if you do so before the end of your next turn. If you don't, the potion is wasted.",
      ],
      [
        "A potion of mind control produces the effect of a dominate person spell. If the target's initial saving throw fails, the effect lasts for 1 hour, with no concentration required on your part. The ",
        rules.charmed,
        ' creature has disadvantage on new saving throws to break the effect during this time.',
      ],
    ],
    effects: [
      {
        key: 'dominated',
        name: 'Dominated',
        lands: { on: 'failed-save', save: 'wis', dc: 15 },
        conditions: [rules.charmed],
        text: [
          'The ',
          rules.charmed,
          ' creature has disadvantage on new saving throws to break the effect during this time.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
        ends: { repeatSave: ['damaged'] },
      },
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  potion_of_mind_control_monster: {
    name: 'Potion of Mind Control (monster)',
    category: 'Potion',
    rarity: 'very rare',
    text: [
      [
        "When you drink a potion of mind control, you can cast a dominate spell (save DC 15) on a specific creature if you do so before the end of your next turn. If you don't, the potion is wasted.",
      ],
      [
        "A potion of mind control produces the effect of a dominate monster spell. If the target's initial saving throw fails, the effect lasts for 1 hour, with no concentration required on your part. The ",
        rules.charmed,
        ' creature has disadvantage on new saving throws to break the effect during this time.',
      ],
    ],
    effects: [
      {
        key: 'dominated',
        name: 'Dominated',
        lands: { on: 'failed-save', save: 'wis', dc: 15 },
        conditions: [rules.charmed],
        text: [
          'The ',
          rules.charmed,
          ' creature has disadvantage on new saving throws to break the effect during this time.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'hour' },
        ends: { repeatSave: ['damaged'] },
      },
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  robe_of_summer: {
    name: 'Robe of Summer',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 1 lb'],
      [
        "This elegant garment is made from fine cloth in hues of red, orange, and gold. While you wear the robe, you have resistance to cold damage. In addition, you are comfortable as if the temperature were that of a balmy day, so you suffer no ill effects from the weather's temperature extremes.",
      ],
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  shatterspike: {
    name: 'Shatterspike',
    category: 'Weapon',
    detail: 'Longsword',
    rarity: 'uncommon',
    attunement: true,
    text: [
      ['Weight · 3 lb'],
      [
        "You have a +1 bonus to attack and damage rolls made with this magic weapon. If it hits an object, the hit is automatically a critical hit, and it can deal bludgeoning or slashing damage to the object (your choice). Further, damage from nonmagical sources can't harm the weapon.",
      ],
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  spear_of_backbiting: {
    name: 'Spear of Backbiting',
    category: 'Weapon',
    detail: 'Spear',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 3 lb'],
      [
        'You gain a +2 bonus to attack and damage rolls made with this magic weapon. When you throw it, its normal and long ranges both increase by 30 feet, and it deals one extra die of damage on a hit. After you throw it and it hits or misses, it flies back to your hand immediately.',
      ],
      [
        'Curse. This weapon is cursed, and becoming attuned to it extends the curse to you. Until the curse is broken with remove curse or similar magic, you are unwilling to part with the weapon, keeping it within reach at all times. In addition, you have disadvantage on attack rolls made with weapons other than this one.',
      ],
      [
        'Whenever you roll a 1 on an attack roll using this weapon, the weapon bends or flies to hit you in the back. Make a new attack roll with advantage against your own AC. If the result is a hit, you take damage as if you had attacked yourself with the spear.',
      ],
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  stone_of_ill_luck: {
    name: 'Stone of Ill Luck',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      ['Weight · 1 lb'],
      [
        "This polished agate appears to be a stone of good luck to anyone who tries to identify it, and it confers that item's property while on your person.",
      ],
      [
        "Curse. This item is cursed. While it is on your person, you take a -2 penalty to ability checks and saving throws. Until the curse is discovered, the DM secretly applies this penalty, assuming you are adding the item's bonus. You are unwilling to part with the stone until the curse is broken with remove curse or similar magic.",
      ],
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  tloques_berserker_battleaxe: {
    name: "Tloques' Berserker Battleaxe",
    category: 'Weapon',
    detail: 'Battleaxe',
    rarity: 'rare',
    attunement: true,
    text: [
      ['Weight · 4 lb'],
      [
        'This battleaxe has a blade of bronze, and the haft is wound with snakeskin wrappings. It casts an ominous shadow in the shape of what appears to be a withered arm. Those within reach of it feel a cold chill run up and down their spine.',
      ],
      [
        'Concealed beneath the wrappings around the handle is a parchment containing the spells passwall, burning hands, and gust of wind. When the attuned wielder uses an action to say the correct words of power, which are engraved in Olman on the axe blade, one of these spells can be cast.',
      ],
      [
        'The axe has 12 charges and regains 1d6 + 4 expended charges daily at dawn. Casting a spell from it takes a number of charges equal to the level at which the spell is cast (5th for passwall, 2nd for gust of wind, and 1st or higher for burning hands; spell save DC 15). If the parchment is removed from the axe, the axe loses the capability of casting these spells forever.',
      ],
      [
        'You gain a +2 bonus to attack and damage rolls made with this magic weapon. In addition, while you are attuned to this weapon, your hit point maximum increases by 1 for each level you have attained.',
      ],
      [
        'Curse. This axe is cursed, and becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the axe, keeping it within reach at all times. You also have disadvantage on attack rolls with weapons other than this one, unless no foe is within 60 feet of you that you can see or hear.',
      ],
      [
        'Whenever a hostile creature damages you while the axe is in your possession, you must succeed on a DC 15 Wisdom saving throw or go berserk. While berserk, you must use your action each round to attack the creature nearest to you with the axe. If you can make extra attacks as part of the Attack action, you use those extra attacks, moving to attack the next nearest creature after you fell your current target. If you have multiple possible targets, you attack one at random. You are berserk until you start your turn with no creatures within 60 feet of you that you can see or hear.',
      ],
    ],
    effects: [
      {
        key: 'berserk',
        name: 'Berserk',
        lands: { on: 'failed-save', save: 'wis', dc: 15 },
        text: [
          'While berserk, you must use your action each round to attack the creature nearest to you with the axe.',
          ' If you can make extra attacks as part of the Attack action, you use those extra attacks, moving to attack the next nearest creature after you fell your current target.',
          ' If you have multiple possible targets, you attack one at random.',
        ],
        lasts: {
          kind: 'until',
          text: [
            'you start your turn with no creatures within 60 feet of you that you can see or hear',
          ],
        },
      },
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  wand_of_entangle: {
    name: 'Wand of Entangle',
    category: 'Wand',
    rarity: 'uncommon',
    attunement: 'by a spellcaster',
    text: [
      ['Weight · 1 lb'],
      [
        'This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the entangle spell (save DC 13) from it.',
      ],
      [
        "The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
      ],
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  waythe: {
    name: 'Waythe',
    category: 'Weapon',
    detail: 'Greatsword',
    rarity: 'legendary',
    attunement: true,
    text: [
      ['Weight · 6 lb'],
      [
        'Waythe is a unique greatsword most recently in the possession of a high-ranking cloud giant ambassador.',
      ],
      [
        'You gain a +1 bonus to attack and damage rolls made with this magic weapon. When you hit a creature of the giant type with it, the giant takes an extra 2d6 slashing damage, and it must succeed on a DC 15 Strength saving throw or fall ',
        rules.prone,
        '.',
      ],
      [
        "The sword also functions as a wand of enemy detection. It regains all of its expended charges at dawn and isn't at risk of crumbling if its last charge is used.",
      ],
      [
        'Sentience. Waythe is a sentient weapon of neutral good alignment, with an Intelligence of 12, a Wisdom of 2, and a Charisma of 14. It has hearing and darkvision out to a range of 120 feet.',
      ],
      [
        'The weapon can speak and understand Giant and Common, and it can communicate telepathically with its wielder.',
      ],
      [
        'Personality. This sword believes in freedom and allowing others to live as they see fit. It is protective of its friends, and wants to be friends with a like-minded wielder. (It takes only 1 minute for a good-aligned character to gain attunement with the sword.) Waythe is courageous to the point of foolhardiness, however, and vocally urges bold action. It is likely to come into conflict with an evil or a timid wielder.',
      ],
    ],
    effects: [
      {
        key: 'prone',
        name: 'Prone',
        lands: { on: 'failed-save', save: 'str', dc: 15 },
        conditions: [rules.prone],
        lasts: { kind: 'until-removed' },
      },
    ],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
  white_dragon_cape: {
    name: 'White Dragon Cape',
    category: 'Wondrous Item',
    rarity: 'unknown',
    text: [['You have resistance to cold damage while wearing this cape.']],
    publication: refs.publications.tales_from_the_yawning_portal,
  },
})
