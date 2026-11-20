import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Recover Ride the Lightning',
  icon: 'gi/GiGalleon',
  type: 'mission',
  status: 'open',
  notes: [
    ['Recover ', refs.items.ride_the_lightning, ' intact for ', refs.npcs.onana_tempest, '.'],
  ],
  clues: [
    [
      refs.events.n2_e220,
      ' describes an experimental vessel faster than any other ship. Since flying ships use crystals for propulsion, a special power crystal is a reasonable inference. Its properties have not been discovered.',
    ],
    [refs.events.n2_e220, ' records the commission.'],
    [
      refs.events.n2_e221,
      ' and ',
      refs.events.n2_e222,
      ' record boarding and clearing the initial compartments. The helm remains unreached.',
    ],
  ],
})
