import { refs } from '#/data/generated/refs.ts'
import { create as createOrganization } from '#/definitions/organization.ts'

export default createOrganization({
  name: 'Tempest Family',
  icon: 'gi/GiCrown',
  notes: [['A noble trading family with power over the ', refs.locations.three_sky_kingdoms, '.']],
})
