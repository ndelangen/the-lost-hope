import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "Cassian pays to remove Jim's confinement and lightning storm",
  notes: [
    [
      refs.pcs.cassian_veyl,
      ' paid 10,000 gold to remove two effects from ',
      refs.pcs.jim,
      '. The table handled this as a purchase from the DM, not a demonstrated power of ',
      refs.npcs.the_fiddler,
      '.',
    ],
    [
      'Cage was removed first, allowing ',
      refs.pcs.jim,
      ' to leave the casino. A random roll then removed his older Storm effect, ending the morning lightning strikes. Voidwalker, Whispers, and Vessel remained. His earlier permanent pain and penalty were not confirmed removed.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiLightningStorm' },
})
