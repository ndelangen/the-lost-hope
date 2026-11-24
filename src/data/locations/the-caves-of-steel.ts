import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Caves of Steel',
  icon: 'gi/GiBaseDome',
  type: 'settlement',
  parent: refs.locations.the_marshal_s_waters,
  at: [525, 350],
  notes: [
    [
      'A whole nation living in a giant cave of steel beneath the surface of ',
      refs.locations.the_marshal_s_waters,
      '. The only way in is underwater, aboard its subships. An airship cannot follow.',
    ],
    [
      'Its people look human, but not quite: pale skin, large dark eyes, faint gill slits at the neck and webbing between the fingers. They call the Marshal their master.',
    ],
    [
      'Visitors are welcomed like royalty and asked to tell their stories and everything that is happening in the world. The people have no contact with the outside and know nothing of it.',
    ],
  ],
  background: [
    ['About 500,000 people live here.'],
    [
      'They are humans changed by generations under ',
      refs.npcs.the_11th_marshal,
      ', on their way to becoming skum, the fish-like servants aboleths make of humanoids. The look is a deliberate hint at the aboleth.',
    ],
    ['Giant chains hold it to the seabed. Without them it would float away.'],
    [
      'Everyone born here is bound by the three laws of ',
      refs.npcs.the_11th_marshal,
      '. Visitors are free to leave; the people are not.',
    ],
    [
      'Its ',
      refs.items.caves_of_steel_subship,
      ' fleet and plenty of its machines and works run on Arcane Dust, so the Caves take deliveries of it regularly. It arrives in barrels dropped into the sea, and the fishers bring them inside. Nobody here has ever taken it as a drug: ',
      refs.npcs.the_11th_marshal,
      ' forbids it. They say so if the party asks.',
    ],
    [
      'The name is a nod to Asimov’s novel The Caves of Steel, as the laws are to his Three Laws of Robotics.',
    ],
  ],
})
