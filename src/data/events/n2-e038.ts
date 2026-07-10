import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Dinos ridden toward Fairhaven',
  day: 10,
  location: refs.locations.badesh_forest,
  mark: { type: 'icon', name: 'gi/GiForestCamp' },
  notes: [
    [
      'The party, travelling with ',
      refs.pcs.victor_the_badesh_lumberjack,
      ' and ',
      refs.npcs.abraham,
      ', saw a large group of dinosaurs being ridden toward ',
      refs.locations.fairhaven,
      ' — the DM described it as a raid. The party assumed hostility.',
    ],
    ['Open: what kind of dinos? Who was riding them? Why Fairhaven?'],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.devan],
  ],
})
