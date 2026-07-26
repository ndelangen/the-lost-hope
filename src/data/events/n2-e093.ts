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
      ' paid the full 50 GP passage fee for the party and their travelling companions. ',
      refs.pcs.swift_starblade,
      ' refused to contribute, frustrating the party. His presence had raised the fee from the usual 20 GP to 50 GP for passage aboard ',
      refs.locations.sylvias_flying_bazaar,
      '.',
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
