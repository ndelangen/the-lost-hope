import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Penelope shows the party her original recipes',
  day: 13,
  location: refs.locations.penelope_s_underground_workshop,
  mark: { type: 'avatar', url: '/assets/pcs/placeholder.svg' },
  notes: [
    [
      refs.npcs.penelope,
      ' owned ',
      refs.locations.penelope_s_alchemy_shop,
      '. Its storefront was dirty, severely dilapidated, and nearly collapsing. When the party entered, ',
      refs.npcs.penelope,
      ' was helping elderly customers without charging them for their potions.',
    ],
    [
      refs.npcs.penelope,
      ' explained that she was refining a laughing potion whose unintended effect made the drinker’s head explode. ',
      refs.npcs.penelope,
      ' said she was the only person who knew how to make it.',
    ],
    [
      'Beneath the ruined storefront, in ',
      refs.locations.penelope_s_underground_workshop,
      ', ',
      refs.npcs.penelope,
      ' maintained ',
      refs.locations.penelope_s_underground_workshop,
      ' as a clean, high-quality workspace. When the party opened a closet, an enormous pile of completed and in-progress recipes spilled out.',
    ],
    [
      refs.locations.penelope_s_underground_workshop,
      ' and its draft recipes convinced the party that ',
      refs.npcs.penelope,
      ' was developing the formulae herself. They concluded that ',
      refs.npcs.mortimer_mafioso,
      ' had stolen from ',
      refs.npcs.penelope,
      ' rather than the reverse.',
    ],
  ],
})
