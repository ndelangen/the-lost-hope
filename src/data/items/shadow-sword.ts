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
      'The blade stores about 68,000 souls. It gains more power under a full moon. Using it on undead can bestow a soul on them; the consequences are unknown and were described as potentially catastrophic.',
    ],
  ],
  background: [
    [
      'The party has not learned these rules yet. No one has ever been attuned to it, ',
      refs.pcs.jim,
      ' included.',
    ],
    [
      'Attunement can only be attempted in absolute darkness, and only by a creature that has and owns its own soul. Attuning embeds the wielder’s soul into the blade. If it is not dark enough, the sword tells the would-be wielder: “Not dark enough.”',
    ],
    [
      'A finesse shortsword that deals 1d6 ',
      refs.rules.necrotic,
      ' damage. Used in direct line of sight with the full moon, that weapon damage is quadrupled to 4d6, and so is the damage it turns back on an unattuned wielder.',
    ],
    [
      'Used unattuned, every hit deals the wielder the same ',
      refs.rules.necrotic,
      ' damage it deals the target, including extra damage such as Sneak Attack. A miss costs nothing, and resistance to necrotic damage protects the wielder. Striking something that is already dead is a ',
      refs.rules.critical_hit,
      ' against the wielder.',
    ],
    [
      'Only while attuned does delivering the killing blow embed the slain creature’s soul into the blade. Unattuned, it takes no souls.',
    ],
    [
      'Unless it is in its ',
      refs.items.shadow_sword_sheath,
      ', the blade registers as evil, and anything that cares about collecting souls senses it burning almost painfully bright. That is not a rule, but a wielder could use it as a tactic: simply showing the blade might overwhelm such a creature like a flashbang.',
    ],
    [
      'The sword hoards souls as collectables and does not want to release them, which is why it holds so many. It punishes the wielder for giving any up. Deliberately drawing souls out costs the wielder 1d6 ',
      refs.rules.necrotic,
      ' damage for the first soul, 2d6 for the next, and 1d6 more for each soul after that, until a ',
      refs.rules.long_rest,
      ' resets the cost. The high cost is why the blade is so full: emptying it is wildly impractical.',
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
