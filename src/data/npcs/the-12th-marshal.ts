import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'The 12th Marshal',
  species: 'Dragon',
  notes: [
    [
      'Alive and worshipped as a god by a group in the snowy mountains; said to greatly extend life.',
    ],
  ],
  memberships: [
    {
      organization: refs.organizations.marshals_court,
      status: 'active',
      rank: '12th Marshal',
    },
  ],
})
