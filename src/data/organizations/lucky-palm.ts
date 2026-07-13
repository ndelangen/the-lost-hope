import { refs } from '#/data/generated/refs.ts'
import { create as createOrganization } from '#/definitions/organization.ts'

export default createOrganization({
  name: 'Lucky Palm',
  notes: [
    [
      'An adventuring party that positioned itself as a rival to ',
      refs.organizations.beasts_and_dwarf,
      '.',
    ],
  ],
})
