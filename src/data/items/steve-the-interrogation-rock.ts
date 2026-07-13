import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Steve the Interrogation Rock',
  icon: 'gi/GiRock',
  currentOwner: refs.pcs.devan,
  carriedBy: refs.pcs.devan,
  notes: [['A rock named Steve after a memorable interrogation.']],
})
