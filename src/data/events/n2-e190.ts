import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim draws Cage, Vessel, and Voidwalker',
  notes: [
    [
      refs.pcs.jim,
      ' drew ',
      refs.effects.cage,
      ', ',
      refs.effects.vessel,
      ', and ',
      refs.effects.voidwalker,
      '.',
    ],
  ],
  day: 24,
  location: refs.locations.borris_s_gambling_den,
  mark: { type: 'avatar', of: refs.pcs.jim },
  draws: [
    { by: refs.pcs.jim, card: refs.cards.the_cage },
    { by: refs.pcs.jim, card: refs.cards.the_vessel },
    { by: refs.pcs.jim, card: refs.cards.the_void_walker },
  ],
  illustrations: ['/assets/scenes/jim-draws-cage-vessel-and-voidwalker.png'],
})
