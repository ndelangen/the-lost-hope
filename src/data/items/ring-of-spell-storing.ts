import { refs as libraryRefs } from '#/data/generated/library-refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Ring of Spell Storing',
  icon: 'gi/GiRing',
  library: libraryRefs.magicItems.ring_of_spell_storing,
  currentOwner: null,
  carriedBy: null,
  craftedBy: null,
  notes: [['The DM warned that exceeding its capacity would trigger a roll on the chaos table.']],
})
