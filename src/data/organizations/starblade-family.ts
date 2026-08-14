import { refs } from '#/data/generated/refs.ts'
import { create as createOrganization } from '#/definitions/organization.ts'

export default createOrganization({
  name: 'Starblade Family',
  icon: 'gi/GiBlackFlag',
  notes: [['A multigenerational pirate family associated with ', refs.pcs.swift_starblade, '.']],
})
