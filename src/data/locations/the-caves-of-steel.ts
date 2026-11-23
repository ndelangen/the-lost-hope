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
      'Visitors are welcomed like royalty and asked to tell their stories and everything that is happening in the world. The people have no contact with the outside and know nothing of it.',
    ],
  ],
  background: [
    [
      'Everyone born here is bound by the three laws of ',
      refs.npcs.the_11th_marshal,
      '. Visitors are free to leave; the people are not.',
    ],
    [
      'The name is a nod to Asimov’s novel The Caves of Steel, as the laws are to his Three Laws of Robotics.',
    ],
  ],
})
