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
      refs.effects.cage,
      ' was removed first, allowing ',
      refs.pcs.jim,
      ' to leave the casino. A random roll then removed his older ',
      refs.effects.storm,
      '. ',
      refs.effects.voidwalker,
      ', ',
      refs.effects.whispers,
      ', and ',
      refs.effects.vessel,
      ' remained. Whether his ',
      refs.effects.excruciating_pain,
      ' was really gone was not confirmed.',
    ],
  ],
  day: 24,
  location: refs.locations.borris_s_gambling_den,
  mark: { type: 'icon', name: 'gi/GiLightningStorm' },
  illustrations: [
    '/assets/scenes/cassian-pays-to-remove-jim-s-confinement-and-lightning-storm.png',
  ],
})
