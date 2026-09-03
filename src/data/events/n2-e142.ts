import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Fire earth and wind open the maze passage',
  day: 22,
  location: refs.locations.serpent_eclipse_pillar_chamber,
  mark: { type: 'icon', name: 'gi/GiPuzzle' },
  notes: [
    [
      refs.organizations.beasts_and_dwarf,
      ' experimented with the three marked pillars and their separate brazier. An attempt to light the brazier directly produced a green flame that reflected damage back at the party.',
    ],
    [
      'The party eventually applied fire to the sun pillar, struck the rock pillar with ',
      refs.items.steve_mace_of_returning,
      ', and used wind on the winding-symbol pillar at the same time. The brazier lit in response and a passage opened.',
    ],
  ],
})
