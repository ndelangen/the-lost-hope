import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party repairs the crater bridge beneath an approaching shadow',
  day: 17,
  location: refs.locations.the_crater_bridge,
  mark: { type: 'icon', name: 'gi/GiBridge' },
  notes: [
    [
      'About two hours after escaping ',
      refs.locations.shadowpeak,
      ', the party reached ',
      refs.locations.the_crater_bridge,
      ' and found its central span broken above a drop of at least five hundred feet.',
    ],
    [
      'One party member used Mending for four hours while another helped secure the bridge during the first hour. The remaining travellers took a short rest. During the repair, an enormous shadow passed overhead and resolved into a descending flying warship.',
    ],
    [
      refs.pcs.cassian_veyl,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.jim,
      ', and ',
      refs.pcs.swift_starblade,
      ' rushed ',
      refs.npcs.abraham,
      ', ',
      refs.npcs.crowy,
      ', ',
      refs.beasts.wolfie,
      ', and ',
      refs.beasts.sir_fabulous,
      ' across the repaired span. The bridge collapsed again after they crossed.',
    ],
  ],
})
