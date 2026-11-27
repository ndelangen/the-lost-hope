import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  cap_of_vanishing: {
    name: 'Cap of Vanishing',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'This cap has 3 charges and regains all expended charges daily at dawn. While wearing the cap, you can take a Magic action and expend 1 charge to give yourself the ',
        rules.invisible,
        ' condition for 10 minutes. The effect ends early if the hat is removed, or immediately after you make an attack roll, deal damage, or cast a spell.',
      ],
    ],
    effects: [
      {
        key: 'invisible',
        name: 'Invisible',
        lands: { on: 'use' },
        conditions: [rules.invisible],
        text: [
          'The effect ends early if the hat is removed, or immediately after you make an attack roll, deal damage, or cast a spell.',
        ],
        lasts: { kind: 'time', amount: '10', unit: 'minute' },
      },
    ],
    publication: refs.publications.stranger_things_welcome_to_the_hellfire_club,
  },
  hollys_handy_haversack: {
    name: "Holly's Handy Haversack",
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['Weight · 5 lb'],
      [
        'This backpack has a central pouch and two side pouches, each of which is an extradimensional space. Each side pouch can hold up to 200 pounds of material, not exceeding a volume of 25 cubic feet. The central pouch can hold up to 500 pounds of material, not exceeding a volume of 64 cubic feet. The haversack always weighs 5 pounds, regardless of its contents.',
      ],
      [
        'Retrieving an item from the haversack requires a Utilize action or a Bonus Action (your choice). When you reach into the haversack for a specific item, the item is always magically on top.',
      ],
      [
        'If any of its pouches is overloaded, pierced, or torn, the haversack ruptures and is destroyed. If the haversack is destroyed, its contents are lost forever, although an Artifact always turns up again somewhere. If the haversack is turned inside out, its contents spill forth unharmed, and the haversack must be put right before it can be used again.',
      ],
      [
        'Each pouch of the haversack holds enough air for 10 minutes of breathing, divided by the number of breathing creatures inside.',
      ],
      [
        "Placing the haversack inside an extradimensional space created by a Bag of Holding, Portable Hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate and not behind Total Cover is sucked through it and deposited in a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.",
      ],
    ],
    publication: refs.publications.stranger_things_welcome_to_the_hellfire_club,
  },
  pipes_of_pestilence: {
    name: 'Pipes of Pestilence',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        "If you play these pipes as a Magic action, you summon one Swarm of Corrupted Rats in an unoccupied space within 60 feet of yourself. The swarm is Friendly to you and your allies for as long as you continue to play the pipes each round as a Magic action. While Friendly, the swarm is under your control, obeys your commands, and takes no action other than to defend itself if you issue it no commands. Once your control ends, the swarm vanishes, and the pipes can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.stranger_things_welcome_to_the_hellfire_club,
  },
  poison_soaked_kukri: {
    name: 'Poison Soaked Kukri',
    category: 'Weapon',
    rarity: 'uncommon',
    attunement: true,
    text: [
      [
        'You can take a Bonus Action to magically coat the blade of this Dagger with poison. The poison remains for 1 minute or until an attack using this weapon hits a creature. That creature must succeed on a DC 13 Constitution saving throw or take 2d8 Poison damage and have the ',
        rules.poisoned,
        " condition for 1 minute. This Bonus Action can't be used again this way until the next dawn.",
      ],
    ],
    effects: [
      {
        key: 'poisoned',
        name: 'Poisoned',
        lands: { on: 'failed-save', save: 'con', dc: 13 },
        conditions: [rules.poisoned],
        lasts: { kind: 'time', amount: '1', unit: 'minute' },
      },
    ],
    publication: refs.publications.stranger_things_welcome_to_the_hellfire_club,
  },
  speaking_stones: {
    name: 'Speaking Stones',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['Speaking Stones come in pairs, with each stone carved to match the other.'],
      [
        'While you touch one stone, you can take a Magic action to send a short message of 25 words or fewer to the bearer of the other stone. That creature hears the message in its mind, recognizes you as the sender if it knows you, and can answer in a like manner immediately. The stones enable creatures to understand the meaning of your message.',
      ],
      [
        "You can send the message across any distance. If no creature bears the other stone, you know that fact as soon as you use the stone, and you don't send the message.",
      ],
      [
        "Once either stone is used to send a message in this way, the stones can't be used again until the next dawn. If one of the stones in a pair is destroyed, the other one becomes nonmagical.",
      ],
    ],
    publication: refs.publications.stranger_things_welcome_to_the_hellfire_club,
  },
  spiked_shield: {
    name: 'Spiked Shield',
    category: 'Shield',
    detail: 'Shield',
    rarity: 'uncommon',
    attunement: true,
    text: [
      ['Weight · 6 lb'],
      [
        'Crude metal spikes adorn this magic Shield. It has the following properties that you can use while holding it.',
      ],
      [
        'Shield Bash. When you take the Attack action, you can make one of the attack rolls using the Shield against a target within 5 feet of yourself. Apply your Proficiency Bonus and Strength modifier to the attack roll. On a hit, the Shield deals Piercing damage equal to 2d6 plus your Strength modifier.',
      ],
      [
        "Spike Salvo. As a Magic action, you can cause spikes to erupt from the Shield in a 30-foot Cone. Each creature in the Cone makes a DC 13 Dexterity saving throw, taking 3d6 Piercing damage on a failed save or half as much damage on a successful one. Once this property is used, it can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.stranger_things_welcome_to_the_hellfire_club,
  },
})
