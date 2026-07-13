import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Faceless Shadow',
  notes: [
    ['A hovering, faceless shadowy figure seen wielding ', refs.items.cursed_shadow_sword, '.'],
  ],
})
