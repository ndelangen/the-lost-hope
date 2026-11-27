import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  arcane_battery: {
    name: 'Arcane Battery',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        'This smooth, oval stone is etched with faintly glowing, magical symbols. While holding the battery, you can take a Magic action to touch the battery to one magic item. If that magic item normally regains expended charges daily, it immediately regains 1d4 + 1 expended charges, and the battery loses its magic.',
      ],
    ],
    publication: refs.publications.netheril_s_fall,
  },
  brooch_of_the_elements: {
    name: 'Brooch of the Elements',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      ['The central jewel of this butterfly-shaped brooch swirls with multicolored iridescence.'],
      [
        'The brooch has 3 charges and regains all expended charges daily at dawn. As a Reaction when a creature you can see within 60 feet of you hits a target with an attack roll and deals damage, you can expend 1 charge and change one damage type the attack deals to one of the following damage types: Acid, Cold, Fire, Lightning, Poison, or Thunder.',
      ],
    ],
    publication: refs.publications.netheril_s_fall,
  },
  fork_of_eddy_summoning: {
    name: 'Fork of Eddy Summoning',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      [
        "This Tiny tuning fork crackles with harmless, multicolored magical energy. As a Magic action, you can tap the fork against any object to summon an Eldritch Eddy (see appendix B). The eddy appears in an unoccupied space as close to you as possible. The eddy is Friendly to you and your allies, and it obeys your commands. If you fail to command it, the eddy defends itself against attackers but takes no other actions. It takes its turn immediately after you on your Initiative count. The eddy disappears after 1 hour, when it dies, or when you dismiss it as a Bonus Action. The fork can't be used this way again until the next dawn.",
      ],
    ],
    publication: refs.publications.netheril_s_fall,
  },
  hat_of_vortexes: {
    name: 'Hat of Vortexes',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'This hat has 3 charges and regains all expended charges daily at dawn. You can take a Magic action and expend 1 charge while holding the hat to release a magical vortex from it. The vortex fills a 10-foot Cube originating from you and lasts for 1 hour. While the vortex is present, its area is Difficult Terrain.',
      ],
      [
        "You decide a vortex's visual details when you create it. For instance, the vortex might be multicolored or glittery.",
      ],
    ],
    publication: refs.publications.netheril_s_fall,
  },
  magen_handbell: {
    name: 'Magen Handbell',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      [
        "While holding this brass handbell, you can take a Magic action to ring it and summon a Terran Magen (see appendix B). The magen appears in an unoccupied space you choose within 30 feet of yourself, understands your languages, obeys your commands, and takes its turn immediately after you on your Initiative count. The magen disappears after 1 hour, when it dies, or when you dismiss it as a Bonus Action. The bell can't be used this way again for 1d6 days.",
      ],
      [
        'Berserk Magen. Whenever the magen summoned by this item starts its turn Bloodied, roll 1d6. On a 6, the magen goes berserk.',
      ],
      [
        "While berserk, the magen no longer obeys your commands, and you can't dismiss it as a Bonus Action. On each of its turns, the berserk magen attacks the nearest creature it can see. If no creature is near enough for the magen to move to and attack, the magen attacks an object. The magen remains berserk until it disappears, or until a creature holding the handbell takes an Influence action and succeeds on a DC 15 Charisma (Persuasion) check to regain control of the magen.",
      ],
    ],
    publication: refs.publications.netheril_s_fall,
  },
  mask_of_changed_appearance: {
    name: 'Mask of Changed Appearance',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        "This jeweled mask has 3 charges. As a Magic action, you can expend 1 charge and change your face's appearance. You can't make yourself look like a different person, but you can smooth or deepen your wrinkles, whiten your teeth, hide or accentuate bags under your eyes, or perform other minor cosmetic changes. While your appearance is changed, the mask has the ",
        rules.invisible,
        ' condition. Your changed appearance lasts 1 hour.',
      ],
      [
        'Regaining Charges. The mask regains 1d3 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the mask explodes in a harmless cloud of sweet-swelling powder and is destroyed.',
      ],
    ],
    publication: refs.publications.netheril_s_fall,
  },
  mythallar_bracelet: {
    name: 'Mythallar Bracelet',
    category: 'Wondrous Item',
    rarity: 'common',
    text: [
      [
        'Three small, crystal beads made from a decommissioned mythallar are strung on this leather bracelet. As a Magic action, you can pluck one bead from the bracelet to gain Advantage on Strength (Athletics) checks for 1 minute.',
      ],
      [
        "A bead disappears immediately after it's plucked. Once all three beads have been plucked, the bracelet loses its magic.",
      ],
    ],
    effects: [
      {
        key: 'athletics-advantage',
        name: 'Mythallar strength',
        lands: { on: 'use' },
        text: [
          'As a Magic action, you can pluck one bead from the bracelet to gain Advantage on Strength (Athletics) checks for 1 minute.',
        ],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
    ],
    publication: refs.publications.netheril_s_fall,
  },
  mythallar_cloak: {
    name: 'Mythallar Cloak',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        'This electric-blue cloak is studded with sewn-in crystals that are shards of a decommissioned mythallar. The cloak has 10 charges and regains 1d10 expended charges daily at dawn.',
      ],
      [
        "While wearing the cloak, you can take a Bonus Action and expend 1 charge to activate the cloak's magic. The magic lasts for 1 minute or until you end it early (no action required).",
      ],
      [
        "While the cloak's magic is active, you gain a Fly Speed of 30 feet and can hover. Additionally, once on each of your turns when you hit a creature with an attack roll and deal damage, you can cause the target to take an extra 1d4 Radiant damage. If you are aloft when the cloak's magic ends, you fall.",
      ],
    ],
    effects: [
      {
        key: 'mythallar-flight',
        name: 'Mythallar flight',
        lands: { on: 'use' },
        text: [
          "While the cloak's magic is active, you gain a Fly Speed of 30 feet and can hover.",
          ' Additionally, once on each of your turns when you hit a creature with an attack roll and deal damage, you can cause the target to take an extra 1d4 Radiant damage.',
          " If you are aloft when the cloak's magic ends, you fall.",
        ],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
    ],
    publication: refs.publications.netheril_s_fall,
  },
})
