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
      'The sword hoards souls as collectables and does not want to release them, which is why it holds so many. It punishes the wielder for giving any up. Deliberately drawing souls out costs the wielder ',
      refs.rules.hit_points,
      ', and the cost grows each time it is done in a row, so emptying it is wildly impractical.',
    ],
    [
      'Striking ',
      refs.rules.undead,
      ' is a ',
      refs.rules.critical_hit,
      ' against the wielder. The sword resists giving up a soul: on a 50/50 chance it releases one into the undead body.',
    ],
  ],
})
