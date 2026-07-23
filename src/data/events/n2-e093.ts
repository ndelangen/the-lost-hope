import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "The party boards Sylvia's flying bazaar",
  day: 17,
  location: refs.locations.sylvias_flying_bazaar,
  mark: { type: 'icon', name: 'gi/GiPassport' },
  notes: [
    [
      refs.pcs.cassian_veyl,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.jim,
      ', and ',
      refs.pcs.swift_starblade,
      ' paid 50 GP in total for passage aboard ',
      refs.locations.sylvias_flying_bazaar,
      ' with their travelling companions.',
    ],
    [
      refs.npcs.sylvia,
      ' publicly placed ',
      refs.pcs.swift_starblade,
      ' under her protection for the next few days, forbidding the crew from harming him and repeating that he was not allowed to gamble.',
    ],
    [
      'The party received shared sleeping quarters with an exception for ',
      refs.beasts.wolfie,
      ', ',
      refs.beasts.sir_fabulous,
      ', and ',
      refs.npcs.abraham,
      '. They were liable for any damage caused by the animals.',
    ],
  ],
})
