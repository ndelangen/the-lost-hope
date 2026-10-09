import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Grimgor the Bloody',
  species: 'Orc',
  memberships: [
    {
      organization: refs.organizations.church_of_gruumsh,
      status: 'former',
      rank: 'First Champion',
    },
  ],
  notes: [
    [
      "An ancient warrior celebrated in the church's holy texts. He has grey hair, extensive scars, and nine fingers. A dragon bit off his middle finger after he gave it an offensive gesture.",
    ],
    [
      'A former adventuring companion and close friend of ',
      refs.npcs.sarogarth,
      '. His remains lie in a crypt whose location is not recorded.',
    ],
  ],
})
