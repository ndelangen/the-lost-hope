import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Little Purple breaks free of the pursuing battle-cruiser',
  day: 24,
  location: refs.locations.skynet_nimbus_crossing,
  mark: { type: 'icon', name: 'gi/GiSailboat' },
  illustrations: ['/assets/scenes/running-from-the-battle-cruiser.png'],
  notes: [
    [
      'Aboard ',
      refs.locations.little_purple_decks,
      ', the party crossed toward ',
      refs.locations.nimbus,
      '.',
    ],
    [
      'A much larger battle-cruiser intercepted ',
      refs.items.little_purple,
      '. Its first shots were warnings; it then closed to board the smaller ship.',
    ],
    [
      'At ',
      refs.pcs.auren,
      '’s direction, ',
      refs.pcs.devan,
      ' pulled out a power crystal so ',
      refs.items.little_purple,
      ' dropped below the cruiser. ',
      refs.pcs.auren,
      ' put it back, but the rough recovery hurt him. When grappling hooks caught their ship, ',
      refs.pcs.devan,
      ', ',
      refs.pcs.auren,
      ', and ',
      refs.pcs.cassian_veyl,
      ' broke them and escaped capture long enough to reach ',
      refs.locations.nimbus,
      '.',
    ],
    [
      refs.pcs.devan,
      ' threw ',
      refs.items.steve_mace_of_returning,
      ' at the cruiser’s hatch without opening or damaging it. The pursuing cruiser followed them to the harbor.',
    ],
  ],
})
