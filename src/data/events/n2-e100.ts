import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "Cassian ruins Sylvia's caviar and works off the damage",
  day: 18,
  location: refs.locations.sylvias_flying_bazaar,
  mark: { type: 'avatar', url: '/assets/pcs/cassian.jpg' },
  notes: [
    [
      refs.pcs.cassian_veyl,
      ' ate cheesecake believing ',
      refs.npcs.light_13th_marshal,
      ' had already fulfilled his favor from the ',
      refs.organizations.adventurers_guild,
      ' by curing his lactose intolerance. About ten minutes later, ',
      refs.pcs.cassian_veyl,
      ' failed to reach a toilet. He defecated in a bucket that turned out to contain expensive caviar, ruining it and fouling part of the deck.',
    ],
    [
      refs.npcs.sylvia,
      ' ordered him to shower and, as punishment, work as a gigolo for five women. ',
      refs.pcs.cassian_veyl,
      ' was nevertheless paid for the assignment.',
    ],
  ],
})
