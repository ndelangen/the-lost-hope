import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Two dire wolf pups are stolen from the stables',
  day: 17,
  location: refs.locations.the_blackstone,
  mark: { type: 'icon', name: 'gi/GiDirewolf' },
  notes: [
    [
      refs.pcs.cassian_veyl,
      ' decided to steal ',
      refs.beasts.wolfie,
      ' and ',
      refs.beasts.sir_fabulous,
      ' from the stables, and ',
      refs.pcs.devan,
      ' enthusiastically agreed. A concentration spell made the pups invisible while the party left the estate.',
    ],
  ],
})
