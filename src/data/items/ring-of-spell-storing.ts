import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Ring of Spell Storing',
  icon: 'gi/GiRing',
  currentOwner: refs.pcs.cassian_veyl,
  carriedBy: refs.pcs.cassian_veyl,
  craftedBy: null,
  notes: [
    [
      'Stores spells totaling up to five spell levels for later casting. A spell must be cast into the ring before it can be released; it remains stored until used.',
    ],
    ['The DM warned that exceeding its capacity would trigger a roll on the chaos table.'],
    [
      {
        type: 'link',
        label: 'Standard Ring of Spell Storing rules on D&D Beyond',
        url: 'https://www.dndbeyond.com/magic-items/4730-ring-of-spell-storing',
      },
    ],
  ],
})
