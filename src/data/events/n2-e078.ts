import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The cursed sword’s shadow nearly kills Jim',
  day: 15,
  location: refs.locations.snowy_mountains,
  mark: { type: 'icon', name: 'gi/GiShadowGrasp' },
  notes: [
    [
      'From the mountain, the party saw that the former site of ',
      refs.locations.fairhaven,
      ' had become a huge, oil-filled, smoking crater. The trail of destruction suggested that the invading monster had continued into the sea.',
    ],
    [
      'Wolves attacked halfway up the mountain. ',
      refs.pcs.swift_starblade,
      ' launched aerial attacks from ',
      refs.items.demon_possessed_flying_broom,
      ' while the unarmored and completely naked ',
      refs.pcs.devan,
      ' blocked the path, took heavy blows, and nearly died.',
    ],
    [
      refs.pcs.jim,
      ' panicked when attacked and drew ',
      refs.items.cursed_shadow_sword,
      '. A shadow flew from it, strangled a wolf to death in one strike, then struck ',
      refs.pcs.jim,
      ' and left him near death. ',
      refs.pcs.cassian_veyl,
      ' revived him.',
    ],
    [
      refs.pcs.swift_starblade,
      ' saved ',
      refs.pcs.devan,
      ' from a fall. ',
      refs.pcs.devan,
      ' likely would have survived, but recovering from the fall would have caused a major delay.',
    ],
  ],
})
