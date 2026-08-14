import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Gruumsh High Priest',
  location: refs.locations.gruumsh_war_temple,
  notes: [['Notably short, but strong enough to lift and throw a troll.']],
  memberships: [
    {
      organization: refs.organizations.church_of_gruumsh,
      status: 'active',
      rank: 'High Priest',
    },
  ],
})
