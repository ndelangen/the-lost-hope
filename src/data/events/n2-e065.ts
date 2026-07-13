import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Three adventurers win a cage fight to the death',
  day: 14,
  location: refs.locations.fairhaven_town_square,
  mark: { type: 'icon', name: 'gi/GiCage' },
  notes: [
    [
      'The Festival of the Heroes began the day after the ',
      refs.npcs.mayor_of_fairhaven,
      ' announced it. Among its many activities, ',
      refs.pcs.devan,
      ' and ',
      refs.pcs.victor_dranzig,
      ' entered a cage fight and were explicitly warned that it was a fight to the death.',
    ],
    [
      'Their opponents were ',
      refs.npcs.the_mountain,
      ' and an unidentified druid. The pair needed a third contestant; ',
      refs.pcs.jim,
      ' and ',
      refs.pcs.swift_starblade,
      ' emphatically refused, but the new adventurer ',
      refs.pcs.theron,
      ' stepped in.',
    ],
    [
      refs.pcs.devan,
      ', ',
      refs.pcs.victor_dranzig,
      ', and ',
      refs.pcs.theron,
      ' won the fight. ',
      refs.npcs.the_mountain,
      ' was killed. Each contestant received personal gold, and ',
      refs.pcs.swift_starblade,
      ' also won money from a bet. ',
      refs.pcs.jim,
      ' did not participate.',
    ],
    [refs.npcs.hex, ' also entered a cage fight and was seen afterward looking severely battered.'],
  ],
})
