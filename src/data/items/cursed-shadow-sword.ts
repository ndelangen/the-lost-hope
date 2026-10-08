import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Cursed Shadow Sword',
  icon: 'gi/GiSwordWound',
  currentOwner: refs.pcs.jim,
  carriedBy: refs.pcs.jim,
  craftedBy: null,
  notes: [
    [
      'The blade stores about 68,000 souls. It needs moonlight to replenish its charges and gains more power under a full moon. Using it on undead can bestow a soul on them; the consequences are unknown and were described as potentially catastrophic.',
    ],
    [
      'The curse is too powerful to remove, even after treatment by the ',
      refs.npcs.gruumsh_high_priest,
      ' during ',
      refs.events.n2_e132,
      '. The sword no longer kills its wielder. The identity and fate of the shadow bound to the blade remain unknown.',
    ],
  ],
})
