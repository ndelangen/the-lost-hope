import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Wolfie-Tracking Ring',
  icon: 'fa/FaRing',
  currentOwner: refs.pcs.cassian_veyl,
  carriedBy: refs.pcs.cassian_veyl,
  craftedBy: null,
  notes: [
    [
      'An otherwise unnamed ring from ',
      refs.npcs.bob_the_merchant,
      ' that lets its wearer locate ',
      refs.beasts.wolfie,
      ' at any time. Its negative effect leaves the attuned wearer insatiably hungry; four normal-sized portions were initially required to feel satisfied.',
    ],
    [
      'A high priest of the ',
      refs.organizations.church_of_gruumsh,
      ' determined that the hunger is not a removable curse. The ring opened a two-way bond that placed part of Wolfie’s life in ',
      refs.pcs.cassian_veyl,
      '’s soul and is gradually transforming him into a werewolf-like hybrid. The change is already expressed through his craving for meat and heightened animal scent; claws, fangs, and increased hair were identified as further signs.',
    ],
    [
      'The exact full-moon effects, sensitivity to silver, degree of control, consequences for ',
      refs.beasts.wolfie,
      ', and results of fighting or embracing the transformation remain unknown.',
    ],
  ],
})
