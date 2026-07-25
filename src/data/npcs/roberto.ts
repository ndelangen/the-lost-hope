import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Roberto',
  location: refs.locations.verdant_haven_forest,
  notes: [
    ['A mapmaker who carried the book from which ', refs.items.robertos_map_pages, ' were taken.'],
  ],
  memberships: [
    {
      organization: refs.organizations.the_eyeless_hand,
      status: 'former',
      rank: 'Minor Operative',
    },
  ],
})
