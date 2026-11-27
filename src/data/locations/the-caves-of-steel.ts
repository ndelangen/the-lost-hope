import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Caves of Steel',
  icon: 'gi/GiBaseDome',
  illustration: '/assets/locations/the-caves-of-steel-illustration.png',
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
      'It is a huge steel sphere, fully submerged and suspended over a deep ocean beside underwater cliffs, held by five chains of immense size. All of its light is artificial. Everything is ancient but well kept: clean, and repaired many times over. It is damp and humid, and everything smells of fish.',
    ],
    [
      'Ships come in from below, up ',
      refs.locations.the_abyss,
      ', the shaft that runs the length of the sphere. The lower levels hold industry, storage, power and large docks with room for the whole subship fleet: about a thousand of them would fit. Above them are rings of private dwellings and common rooms. At the top, mold farms flank the ',
      refs.locations.the_grand_hall,
      ', where everyone eats together. They live on fish, mold and seaweed. A symbol of three eyes, one above the other, is repeated in the art and decoration throughout.',
    ],
    [
      'Its people look human, but not quite: pale skin, large dark eyes, faint gill slits at the neck and webbing between the fingers. They call the Marshal their master.',
    ],
    [
      'Visitors are welcomed like royalty and asked to tell their stories and everything that is happening in the world. The people have no contact with the outside and know nothing of it. None of them has ever seen land, other than the bottom of the ocean.',
    ],
  ],
  background: [
    ['About 500,000 people live here.'],
    [
      'They are humans changed by generations under ',
      refs.npcs.the_11th_marshal,
      ', on their way to becoming skum, the fish-like servants aboleths make of humanoids. The look is a deliberate hint at the aboleth, as is the three-eyes symbol: an aboleth has three eyes stacked one above the other. Keep such hints subtle, never too clear.',
    ],
    ['Without its five chains the sphere would float away.'],
    [
      'Everyone born here is bound by the three laws of ',
      refs.npcs.the_11th_marshal,
      '. Visitors are free to leave; the people are not.',
    ],
    [
      'Its ',
      refs.items.caves_of_steel_subship,
      ' fleet, the power from its ',
      refs.locations.the_caves_of_steel_generator_room,
      ' and plenty of its machines and works run on Arcane Dust, so the Caves take deliveries of it regularly. It arrives in barrels dropped into the sea, and the fishers bring them inside. Nobody here has ever taken it as a drug: ',
      refs.npcs.the_11th_marshal,
      ' forbids it. They say so if the party asks.',
    ],
    [
      'The name is a nod to Asimov’s novel The Caves of Steel, as the laws are to his Three Laws of Robotics.',
    ],
  ],
})
