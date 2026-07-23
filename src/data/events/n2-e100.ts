import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "Devan ruins Sylvia's caviar and works off the damage",
  day: 18,
  location: refs.locations.sylvias_flying_bazaar,
  mark: { type: 'avatar', url: '/assets/pcs/devan.jpg' },
  notes: [
    [
      refs.pcs.devan,
      ' ate cheesecake despite being lactose-intolerant and failed to reach a toilet. He used a bucket that turned out to contain expensive caviar, ruining it and fouling part of the deck.',
    ],
    [
      refs.npcs.sylvia,
      ' ordered him to bathe, help clean the damage, and spend three days working as adult entertainment for wealthy passengers.',
    ],
  ],
})
