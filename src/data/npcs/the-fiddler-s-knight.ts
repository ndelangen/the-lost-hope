import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: "The Fiddler's Knight",
  notes: [
    [
      'An unnamed woman summoned by the Knight card of the ',
      refs.items.deck_of_many_more_things,
      '. A fourth-level fighter of the same species as ',
      refs.npcs.the_fiddler,
      ', sworn to serve him loyally until death. Her species and personal name are not recorded.',
    ],
  ],
})
