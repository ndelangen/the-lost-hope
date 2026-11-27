import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  flying_citadel_helm: {
    name: 'Flying Citadel Helm',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: 'by a spellcaster',
    text: [
      [
        'The function of this ornate chair is to propel and maneuver a flying citadel on which it has been installed. The chair has AC 15, 18 hit points, and immunity to poison and psychic damage. It is destroyed if reduced to 0 hit points.',
      ],
      [
        "The sensation of being attuned to a flying citadel helm is akin to the pins-and-needles effect one experiences after one's arm or leg falls asleep, but not as intense.",
      ],
      [
        'While attuned to a flying citadel helm and sitting in it, you gain the following abilities for as long as you maintain concentration (as if concentrating on a spell):',
      ],
      [
        'You can use the flying citadel helm to move the citadel through the air, up to 80 feet per round, or up to 8 miles per hour.',
      ],
      [
        'You can steer the citadel, albeit in a somewhat clumsy fashion, in much the way that a rudder or oars can be used to maneuver a seafaring ship.',
      ],
      [
        'At any time, you can see and hear from the highest point outside the citadel as though you were at that location.',
      ],
      [
        'If no creature attuned to the helm is maintaining concentration, the citadel remains motionless in its space.',
      ],
      [
        'Transfer Attunement. You can use an action or a bonus action to touch a willing spellcaster, whereupon that creature attunes to the flying citadel helm immediately, and your attunement to the flying citadel helm ends.',
      ],
      [
        'Crash. Should the flying citadel helm be destroyed, the citadel it is installed on loses power and begins to crumble. If the crumbling citadel is in the air, it descends at a rate of 30 feet per round, or 300 feet per minute. Any creature on the citadel or on the ground within 120 feet of the citadel when it lands must make a DC 20 Dexterity saving throw, taking 39 (6d12) bludgeoning damage on a failed save, or half as much damage on a successful one.',
      ],
    ],
    publication: refs.publications.dragonlance_shadow_of_the_dragon_queen,
  },
  kagonesti_forest_shroud: {
    name: 'Kagonesti Forest Shroud',
    category: 'Wondrous Item',
    rarity: 'rare',
    attunement: true,
    text: [
      [
        "This cloak appears to be made of autumnal leaves woven together. While you wear this cloak, you have advantage on Dexterity (Stealth) checks, and you can use a bonus action to magically teleport, along with any equipment you are wearing or carrying, to an unoccupied space you can see within 30 feet of yourself. You then have advantage on the next attack roll you make before the end of the turn. Once this bonus action is used, it can't be used again until the next dawn.",
      ],
    ],
    publication: refs.publications.dragonlance_shadow_of_the_dragon_queen,
  },
  mirror_of_reflected_pasts: {
    name: 'Mirror of Reflected Pasts',
    category: 'Wondrous Item',
    rarity: 'very rare',
    attunement: true,
    text: [
      ['Weight · 25 lb'],
      [
        'This mirror of elven design allows those who stare into it to reflect on positive memories. The 3-foot-tall mirror weighs 25 pounds, and it has AC 11, 10 hit points, and vulnerability to bludgeoning damage. It shatters and is destroyed if reduced to 0 hit points.',
      ],
      [
        "While holding the mirror upright, you can use an action to speak its command word and activate it. While activated, the mirror hovers in the air, and it can be destroyed but not moved. It remains activated until you use an action to speak the command word again or your attunement to the mirror ends, at which point the mirror harmlessly floats to the ground. Once the mirror has been deactivated, it can't be activated again until the next dawn.",
      ],
      [
        'If a non-Construct creature other than you sees its reflection in the activated mirror while within 30 feet of it, that creature must succeed on a DC 15 Wisdom saving throw or become ',
        rules.paralyzed,
        ' until the mirror is deactivated or until that creature can no longer see the mirror. A creature ',
        rules.paralyzed,
        " by the mirror can repeat the saving throw at the end of each of its turns, ending the effect on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to this mirror's effect for the next 24 hours.",
      ],
      [
        'While ',
        rules.paralyzed,
        " by the mirror, the creature sees events from their past reflected in the mirror's glass. These memories aren't real, but rather idealized versions of those occurrences. Nearby observers can glimpse flashes of these memories if looking indirectly at the mirror.",
      ],
    ],
    effects: [
      {
        key: 'reflected-past',
        name: 'Lost in reflection',
        lands: { on: 'failed-save', save: 'wis', dc: 15 },
        conditions: [rules.paralyzed],
        text: [
          'While ',
          rules.paralyzed,
          " by the mirror, the creature sees events from their past reflected in the mirror's glass. These memories aren't real, but rather idealized versions of those occurrences.",
        ],
        lasts: {
          kind: 'until',
          text: ['the mirror is deactivated or until that creature can no longer see the mirror'],
        },
        ends: { repeatSave: ['end-of-turn'] },
      },
    ],
    publication: refs.publications.dragonlance_shadow_of_the_dragon_queen,
  },
})
