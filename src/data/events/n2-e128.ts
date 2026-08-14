import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The dragon horn becomes the Serpent Eclipse Trial Disk',
  day: 21,
  location: refs.locations.serpent_eclipse_three_door_chamber,
  mark: { type: 'icon', name: 'gi/GiMetalDisc' },
  notes: [
    [
      'Completing the first trial produced the ',
      refs.items.purple_dragon_horn,
      '. Back at the blood-fed altar, a whisper instructed the party to place the reward upon it.',
    ],
    [
      refs.items.purple_dragon_horn,
      ' spun and condensed into the ',
      refs.items.serpent_eclipse_trial_disk,
      ', which ',
      refs.pcs.jim,
      ' carried for ',
      refs.organizations.beasts_and_dwarf,
      '.',
    ],
  ],
})
