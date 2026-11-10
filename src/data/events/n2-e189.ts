import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The first draws bring flight, hunger, whispers, and a cloak',
  notes: [
    [
      'The first draw gave ',
      refs.npcs.sarogarth,
      ' a flying speed equal to his walking speed for one year. ',
      refs.pcs.jim,
      ' drew Whispers, hearing voices only he could hear and suffering penalties involving Wisdom. A daily saving throw was required to benefit from a long rest; the exact roll is unclear in the recording.',
    ],
    [
      'The Hunger card gave ',
      refs.pcs.cassian_veyl,
      ' a life-draining action against a creature within five feet. It deals 1d6 necrotic damage and restores half that amount as hit points. He must use it daily or suffer 2d6 necrotic damage. This is separate from the meat hunger caused by the ',
      refs.items.wolfie_tracking_ring,
      '. His later discussion with the DM confirms the recipient despite the missing announcement in the recording.',
    ],
    [
      refs.pcs.swift_starblade,
      ' initially drew an alignment change to lawful good. He spent two DM tokens and received a curse token to replace that draw with Sun. The DM substituted a magic item for the experience award because the campaign uses milestones. The ',
      refs.items.mimic_cloak,
      ' appeared on the table and ',
      refs.pcs.swift_starblade,
      ' accepted it. The alignment change did not remain in force.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiCardRandom' },
})
