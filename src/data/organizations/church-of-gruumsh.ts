import { refs } from '#/data/generated/refs.ts'
import { create as createOrganization } from '#/definitions/organization.ts'

export default createOrganization({
  name: 'Church of Gruumsh',
  icon: 'gi/GiCrossedAxes',
  notes: [
    [
      'A faith devoted to Gruumsh that treats strength, conquest, struggle, and survival as sacred. One of its congregations worships at the ',
      refs.locations.gruumsh_war_temple,
      '.',
    ],
  ],
})
