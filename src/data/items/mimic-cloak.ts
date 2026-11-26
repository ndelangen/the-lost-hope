import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Mimic Cloak',
  icon: 'gi/GiCape',
  category: 'Wondrous Item',
  currentOwner: refs.pcs.swift_starblade,
  carriedBy: refs.pcs.swift_starblade,
  craftedBy: null,
  notes: [
    [
      'A tame, living mimic worn as a cloak. A ',
      refs.rules.bonus_action,
      ' changes its colour and style. It grants +2 ',
      refs.rules.armor_class,
      '.',
    ],
    [
      'While attuned, removing it requires a DC 18 Strength check. It tries to reattach unless ',
      refs.rules.restrained,
      '. After each ',
      refs.rules.long_rest,
      ', its wearer must feed it raw meat or gain one level of exhaustion.',
    ],
  ],
})
