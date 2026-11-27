import { refs } from '#/data/generated/library-refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

export default createMagicItems({
  planar_key: {
    name: 'Planar Key',
    category: 'Wondrous Item',
    rarity: 'rare',
    text: [
      ['This key is etched with sigils.'],
      [
        "A planar key begins existence with 1d4 + 1 charges and cannot regain charges. When the key's last charge is expended, the key's sigils and magic fade away, but the key remains.",
      ],
      [
        "While touching the key, you can use your action to expend 1 charge and have the key cast plane shift limited to the key's predefined destination only. Each planar key links to a single destination defined when the key is made.",
      ],
    ],
    publication: refs.publications.adventures_in_the_forgotten_realms_the_hidden_page,
  },
})
