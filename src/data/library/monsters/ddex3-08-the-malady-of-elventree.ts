import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex3_08_the_malady_of_elventree,
  monsters: {
    umber_hulk: {
      name: 'Umber Hulk',
      alignment: 'chaotic evil',
      languages: ['Umber Hulk'],
      stats: {
        size: 'large',
        type: 'monstrosity',
        cr: '5',
        ac: 18,
        armor: 'natural armor',
        hitDice: '11d10',
        speed: { walk: 30, burrow: 20 },
        scores: { str: 20, dex: 13, con: 16, int: 9, wis: 10, cha: 10 },
        senses: { darkvision: 120, tremorsense: 60 },
        abilities: [
          {
            key: 'confusing-gaze',
            name: 'Confusing Gaze',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'When a creature starts its turn within 30 feet of the umber hulk and is able to see the umber hulk’s eyes, the umber hulk can magically force it to make a ',
              { dc: 'cha', printed: 15 },
              ' Charisma saving throw, unless the umber hulk is ',
              rules.incapacitated,
              '. On a failed saving throw, ',
              { effect: 'gaze-confusion' },
              '. Unless surprised, a creature can avert its eyes to avoid the saving throw at the start of its turn. If the creature does so, it can’t see the umber hulk until the start of its next turn, when it can avert its eyes again. If the creature looks at the umber hulk in the meantime, it must immediately make the save.',
            ],
            effects: [
              {
                key: 'gaze-confusion',
                name: 'Gaze confusion',
                lands: { on: 'save', save: 'cha', dc: 'cha', printed: 15 },
                text: [
                  'The creature can’t take reactions until the start of its next turn and rolls a d8 to determine what it does during that turn. On a 1 to 4, the creature does nothing. On a 5 or 6, the creature takes no action but uses all its movement to move in a random direction. On a 7 or 8, the creature makes one melee attack against a random creature, or it does nothing if no creature is within reach.',
                ],
                lasts: { kind: 'turn', boundary: 'start', whose: 'target' },
              },
            ],
          },
          {
            key: 'tunneler',
            name: 'Tunneler',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The umber hulk can burrow through solid rock at half its burrowing speed and leaves a 5 foot-wide, 8-foot-high tunnel in its wake.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'The umber hulk makes three attacks: two with its claws and one with its mandibles.',
            ],
          },
          {
            key: 'claw',
            name: 'Claw',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d8', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
