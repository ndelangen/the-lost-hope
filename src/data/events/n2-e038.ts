import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Dinos ridden toward Fairhaven',
  date: new Date('2026-08-18T10:00'),
  location: refs.locations.badesh_forest,
  mark: { type: 'icon', name: 'gi/GiForestCamp' },
  parts: [
    [
      'The party, travelling with ',
      refs.pcs.victor_the_badesh_lumberjack,
      ' and ',
      refs.npcs.abraham,
      ', saw a large group of dinosaurs being ridden toward ',
      refs.locations.fairhaven,
      ' — the DM described it as a raid. The party assumed hostility.',
    ],
    'Open: what kind of dinos? Who was riding them? Why Fairhaven?',
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.devan],
  ],
})
