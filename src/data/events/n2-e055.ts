import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Crowy directs the party toward the Feywild',
  day: 17,
  location: refs.locations.shadowpeak,
  mark: { type: 'icon', name: 'gi/GiFairyWings' },
  notes: [
    [
      refs.npcs.crowy,
      ' communicated directly with ',
      refs.npcs.light_13th_marshal,
      ' and began directing the party toward ',
      refs.locations.feywild,
      '. Crowy described the destination as the nearest village, but it is not yet clear whether that is a specific village or simply somewhere within the realm.',
    ],
    [
      'The party expects ',
      refs.npcs.lord_malachar,
      ' to pursue them once he restores order. They also suspect ',
      refs.npcs.borris,
      ' may exploit the chaos to seize control of the town; neither outcome has yet been confirmed.',
    ],
  ],
})
