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
  background: [
    ['The party has not learned these rules yet.'],
    [
      'Attunement can only be attempted in absolute darkness, and only by a creature that has and owns its own soul. Attuning embeds the wielder’s soul into the blade.',
    ],
    [
      'Used unattuned, the sword deals the wielder as much damage as it deals the target. Striking something that is already dead is a ',
      refs.rules.critical_hit,
      ' against the wielder.',
    ],
    ['While attuned, delivering the killing blow embeds the slain creature’s soul into the blade.'],
    [
      'Striking ',
      refs.rules.undead,
      ' can make the blade lose one of its souls into the undead body. The sword hates this and punishes the wielder.',
    ],
  ],
})
