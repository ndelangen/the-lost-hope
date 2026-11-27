import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Caves of Steel Subship',
  icon: 'gi/GiSubmarine',
  category: 'Mount or Vehicle',
  currentOwner: refs.npcs.the_11th_marshal,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'A riveted iron ship of ',
      refs.locations.the_caves_of_steel,
      ' that sails on the surface and under it: a large, mixed-use vessel built for fishing, utility, repair and war alike. It has an open deck where the fishing happens, and a cargo hold.',
    ],
    [
      'They carry no ordinary cannons. Harpoon stations and strange machines stand plainly on deck.',
    ],
  ],
  background: [
    ['The subships burn Arcane Dust for fuel.'],
    [
      'The machine turns a person’s consciousness into a projectile. A skipper puts his head into it and projects his pain and suffering at the enemy, and then he dies. A hatch underneath drops the body into the hold, which can be emptied into the sea.',
    ],
    [
      'Each needs a crew of about 30, but carries about 230 people: the rest are ammunition. The cargo hold takes fish, or bodies.',
    ],
    [
      refs.pcs.auren,
      ' will find the machine fascinating, but he cannot work out how it functions. Let his player look at it first.',
    ],
    [
      'The crews find the very idea of demonstrating the machine preposterous. They are glad to show anyone how the harpoons work.',
    ],
  ],
})
