import { refs } from '#/data/generated/refs.ts'
import { create as createOrganization } from '#/definitions/organization.ts'

export default createOrganization({
  name: 'Beasts and Dwarf',
  icon: 'gi/GiDwarfFace',
  notes: [
    [
      'The player party, named for the original appearances of ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', and ',
      refs.pcs.revin_grumblefist,
      '.',
    ],
    [
      'The party has repeatedly been offered a free name change, but ',
      refs.pcs.jim,
      ' refuses to give up the original name.',
    ],
  ],
})
