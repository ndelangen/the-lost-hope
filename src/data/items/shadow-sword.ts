import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Shadow Sword',
  icon: 'gi/GiAncientSword',
  currentOwner: refs.pcs.swift_starblade,
  carriedBy: refs.pcs.swift_starblade,
  craftedBy: null,
  notes: [
    [
      'The uncursed form of ',
      refs.items.cursed_shadow_sword,
      '. The blade remains shadowy. The identity and fate of the shadow once bound to it remain unknown.',
    ],
    [
      'The blade stores about 68,000 souls. It needs moonlight to replenish its charges and gains more power under a full moon. Using it on undead can bestow a soul on them; the consequences are unknown and were described as potentially catastrophic.',
    ],
  ],
})
