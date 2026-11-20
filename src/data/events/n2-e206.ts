import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Silas distracts Swift while the Hand tries to seize Jim',
  day: 24,
  location: refs.locations.borris_s_gambling_den,
  mark: { type: 'icon', name: 'gi/GiPrisoner' },
  illustrations: ['/assets/scenes/the-hand-comes-for-jim.png'],
  notes: [
    [
      refs.pcs.jim,
      ' and ',
      refs.pcs.swift_starblade,
      ' passed ',
      refs.locations.borris_s_gambling_den,
      ' on their way through ',
      refs.locations.nimbus,
      ' toward ',
      refs.locations.nimbus_harbour,
      ', intending to steal a ship to reach the approaching flying fortress after the ferry refused passage to a ghost.',
    ],
    [
      refs.npcs.silas_wren,
      ' addressed ',
      refs.pcs.swift_starblade,
      ' as Starblade and distracted him while thirteen ',
      refs.npcs.cloaked_snatcher,
      's surrounded ',
      refs.pcs.jim,
      '. He said they were here for ',
      refs.pcs.jim,
      ', who needed to come home. ',
      refs.pcs.jim,
      ' slipped through their grasp in his ethereal state and ran toward the harbor.',
    ],
  ],
})
