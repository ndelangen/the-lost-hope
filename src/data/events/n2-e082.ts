import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Meet the Lucky Palm at the Fairhaven guildhall',
  day: 12,
  location: refs.locations.fairhaven_guildhall,
  mark: { type: 'icon', name: 'gi/GiRank3' },
  notes: [
    ['Inside the city, the party made their way to the ', refs.locations.fairhaven_guildhall, '.'],
    [
      'A leaderboard ranked multiple adventuring parties. ',
      refs.organizations.beasts_and_dwarf,
      ' was dead last. The party met ',
      refs.npcs.hex,
      ' and ',
      refs.npcs.sneeve,
      ' of ',
      refs.organizations.lucky_palm,
      ', a rival party. ',
      refs.npcs.hex,
      ' was openly antagonistic toward them.',
    ],
    [refs.locations.fairhaven, ' was also preparing to host the Festival of the Heroes.'],
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.victor_dranzig,
      ' (travelling with ',
      refs.npcs.abraham,
      ').',
    ],
  ],
})
