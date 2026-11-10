import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Mimic Cloak',
  icon: 'gi/GiCape',
  currentOwner: refs.pcs.swift_starblade,
  carriedBy: refs.pcs.swift_starblade,
  craftedBy: null,
  notes: [
    [
      'A tame, living mimic worn as a cloak. A bonus action changes its colour and style. It grants +2 Armor Class.',
    ],
    [
      'While attuned, removing it requires a DC 18 Strength check. It tries to reattach unless restrained. After each long rest, its wearer must feed it or gain one level of exhaustion. The exact feeding cost is unclear in the recording.',
    ],
  ],
})
