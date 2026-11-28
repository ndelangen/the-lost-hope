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
      'They carry no ordinary cannons. Their harpoons and strange machines sit inside the hull, firing out through dome-shaped blisters on its outside.',
    ],
  ],
  background: [
    [
      'How every subship looks, in any picture: a long, low, cigar-shaped hull of riveted bronze and iron plates, weathered green-gold. Aft, a wide open working deck with railings, lamp posts, a big arched crane with a net, a rope winch and an open cargo hatch. Forward and higher, a conning tower topped by a glass dome and a lighthouse-like lantern stack. A row of round portholes along the sides, dome-shaped weapon blisters bulging from the hull, and drainage spouts gushing at the waterline. The three-eyes emblem sits on the bow, the blisters and a pennant on the crane. The subship picture of the arrival scene in the Caves of Steel is the model.',
    ],
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
    [
      'Nobody is proud of the machine. The people are happy to be alive, and would rip the machines out the second they could.',
    ],
  ],
})
