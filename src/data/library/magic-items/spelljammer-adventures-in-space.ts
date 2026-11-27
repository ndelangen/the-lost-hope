import { refs } from '#/data/generated/library-refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

export default createMagicItems({
  fish_suit: {
    name: 'Fish Suit',
    category: 'Wondrous Item',
    rarity: 'very rare',
    text: [
      [
        'This bulky suit, which fully encases your head and body, takes 1 minute to don or doff. While worn, it enables you to breathe in an airless environment and renders you immune to the harmful effects of any gas that surrounds you. The suit also grants you a swimming speed equal to your walking speed while underwater, or a flying speed equal to your walking speed in an environment with no gravity.',
      ],
    ],
    publication: refs.publications.spelljammer_adventures_in_space,
  },
  spelljamming_helm: {
    name: 'Spelljamming Helm',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: 'by a spellcaster',
    text: [
      [
        'The function of this ornate chair is to propel and maneuver a ship on which it has been installed through space and air. It can also propel and maneuver a ship on water or underwater, provided the ship is built for such travel. The ship in question must weigh 1 ton or more.',
      ],
      [
        "The sensation of being attuned to a spelljamming helm is akin to the pins-and-needles effect one experiences after one's arm or leg falls asleep, but not as painful.",
      ],
      [
        'While attuned to a spelljamming helm and sitting in it, you gain the following abilities for as long as you maintain concentration (as if concentrating on a spell):',
      ],
      [
        "You can use the spelljamming helm to move the ship through space, air, or water up to the ship's speed. If the ship is in space and no other objects weighing 1 ton or more are within 1 mile of it, you can use the spelljamming helm to move the vessel fast enough to travel 100 million miles in 24 hours.",
      ],
      [
        'You can steer the vessel, albeit in a somewhat clumsy fashion, in much the way that a rudder or oars can be used to maneuver a seafaring ship.',
      ],
      [
        "At any time, you can see and hear what's happening on and around the vessel as though you were standing in a location of your choice aboard it.",
      ],
      [
        'Transfer Attunement. You can use an action to touch a willing spellcaster. That creature attunes to the spelljamming helm immediately, and your attunement to it ends.',
      ],
      [
        "Cost of a Spelljamming Helm. A spelljamming helm propels and steers a ship much as sails, oars, and rudders work on a seafaring vessel, and a spelljamming helm is easy to create if one has the proper spell. Create spelljamming helm has a material component cost of 5,000 gp, so that's the least one can pay to acquire a spelljamming helm.",
      ],
      [
        "Wildspace merchants, including dohwars and mercanes (both described in Boo's Astral Menagerie), typically sell a spelljamming helm for substantially more than it cost to make. How much more depends on the market, but 7,500 gp would be a reasonable demand. A desperate buyer in a seller's market might pay 10,000 gp or more.",
      ],
    ],
    publication: refs.publications.spelljammer_adventures_in_space,
  },
  talarith: {
    name: 'Talarith',
    category: 'Wondrous Item',
    rarity: 'legendary',
    attunement: 'by a reigar who created it',
    text: [
      [
        'The reigar who creates this piece of jewelry chooses its form: bracelet, brooch, diadem, or necklace. While the reigar wears the talarith, any weapon wielded by the reigar deals an extra 1d6 force damage when it hits.',
      ],
      [
        "As an action, a reigar can use its talarith to summon a golem that looks just like the reigar. The golem obeys the reigar's commands and uses the reigar's statistics, except it is a Construct that doesn't have a talarith of its own. The golem vanishes after 1 hour, or when it is reduced to 0 hit points. After summoning a golem, the reigar must finish a short or long rest before this property can be used again.",
      ],
    ],
    publication: refs.publications.spelljammer_adventures_in_space,
  },
  wildspace_orrery: {
    name: 'Wildspace Orrery',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        "Inside a Wildspace system, this portable arcane device automatically tracks the positions and movements of all suns, planets, moons, and comets within that system, projecting a display of all these bodies in the space above its current location. In that display, a white, pulsating pinprick of light marks the orrery's location.",
      ],
    ],
    publication: refs.publications.spelljammer_adventures_in_space,
  },
})
