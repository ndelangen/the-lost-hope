import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim wakes William with Light’s unidentified drops',
  day: 13,
  location: refs.locations.fairhaven,
  mark: { type: 'icon', name: 'fa/FaPrescriptionBottleAlt' },
  notes: [
    [
      refs.pcs.william_greenhove,
      ' remained in an unusually long sleep and was carried with the group as a “minotaur mule.”',
    ],
    [
      refs.npcs.light_13th_marshal,
      ' instructed ',
      refs.pcs.jim,
      ' to give ',
      refs.pcs.william_greenhove,
      ' exactly two drops from ',
      refs.items.lights_unidentified_drops,
      '. ',
      refs.pcs.jim,
      ' followed the instruction and ',
      refs.pcs.william_greenhove,
      ' woke.',
    ],
    [refs.pcs.jim, ' did not return ', refs.items.lights_unidentified_drops, ' afterward.'],
  ],
})
