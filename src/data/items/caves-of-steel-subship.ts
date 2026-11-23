import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Caves of Steel Subship',
  icon: 'gi/GiSubmarine',
  currentOwner: refs.npcs.the_11th_marshal,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'A riveted iron ship of ',
      refs.locations.the_caves_of_steel,
      ' that sails on the surface and under it. The same ships fish, carry cargo and go to war.',
    ],
    ['They carry no ordinary cannons. They are armed with harpoons and with a strange machine.'],
  ],
  background: [
    ['The subships burn Arcane Dust for fuel.'],
    [
      'The machine turns a person’s consciousness into a projectile. A skipper puts his head into it and projects his pain and suffering at the enemy, and then he dies. A hatch underneath drops the body into the fish hold, which can be emptied into the sea.',
    ],
    [refs.pcs.auren, ' will find the machine fascinating. Let his player look at it first.'],
  ],
})
