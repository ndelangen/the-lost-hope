import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createMagicItems({
  concertina: {
    name: 'Concertina',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['A concertina is a less charming kind of accordion.'],
      [
        'In addition to knocking out a killer polka, a creature playing the concertina can use an action to cause an area of mist or water up to 30 feet in diameter and 6 inches deep to freeze solid.',
      ],
      ["Once used, this feature of the concertina can't be used again until the next dawn."],
      [
        'Any creatures touching the floor must succeed on a DC 20 Dexterity saving throw or be ',
        rules.restrained,
        ' by the ice. As an action, a ',
        rules.restrained,
        ' creature can attempt to free itself or another creature within its reach from the ice, doing so with a successful DC 20 Strength (Athletics) check. A character freed from the ice is no longer ',
        rules.restrained,
        ' by it. The ice melts in an hour.',
      ],
    ],
    effects: [
      {
        key: 'frozen-in-ice',
        name: 'Restrained by ice',
        lands: { on: 'failed-save', save: 'dex', dc: 20 },
        conditions: [rules.restrained],
        lasts: { kind: 'until', text: ['The ice melts in an hour'] },
        ends: { escape: { dc: 20 } },
      },
    ],
    publication: refs.publications.the_lost_dungeon_of_rickedness_big_rick_energy,
  },
})
