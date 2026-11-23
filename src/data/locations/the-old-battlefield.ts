import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Old Battlefield',
  icon: 'gi/GiBattleMech',
  type: 'wilderness',
  parent: refs.locations.world,
  at: [1085, 610],
  notes: [
    [
      'A giant old battlefield, strewn with giant machines, mines and crashed flying ships. ',
      refs.locations.rustmoor,
      ' stands at its edge.',
    ],
  ],
  background: [['Which war was fought here is not settled. Its map position is a guess.']],
})
