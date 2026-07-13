import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Mortimer’s shop explodes and the party is arrested',
  day: 13,
  location: refs.locations.mortimer_s_shop,
  mark: { type: 'icon', name: 'gi/GiHandcuffs' },
  notes: [
    [
      'The party returned to ',
      refs.locations.mortimer_s_shop,
      ' to confront ',
      refs.npcs.mortimer_mafioso,
      ', but ',
      refs.npcs.mortimer_mafioso,
      ' was absent. Several party members broke into the shop, triggered a magical alarm, and managed to silence or disarm it.',
    ],
    [
      'They found a largely inactive underground workshop. A ',
      refs.beasts.chimera,
      ' waited there, along with a ticking sound that the DM made clear was a time bomb requiring an immediate escape.',
    ],
    [
      'The party had given the bottle of explosive goblin excrement to ',
      refs.npcs.penelope,
      '. The players inferred that ',
      refs.npcs.penelope,
      ' or someone else had arranged for it to reach ',
      refs.npcs.mortimer_mafioso,
      '’s shop, but this was never disclosed or confirmed.',
    ],
    [
      'A fight began with the ',
      refs.beasts.chimera,
      ', but ',
      refs.pcs.jim,
      ' cast Sleep on the lone creature. Nobody woke it, allowing the party to sneak out and avoid the rest of the fight.',
    ],
    [
      'Once the party was outside, the shop exploded into the sky. The party was arrested in the aftermath.',
    ],
  ],
})
