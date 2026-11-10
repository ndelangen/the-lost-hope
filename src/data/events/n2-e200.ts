import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Stefanio tests a spirit cannon on Jim',
  notes: [
    [
      'While shopping, the party met ',
      refs.npcs.stefanio,
      ', who lacked the Rod of the Pact Keeper sought by ',
      refs.pcs.cassian_veyl,
      '. He said ',
      refs.npcs.bob_the_merchant,
      ' sometimes bought his stock, but had not seen him for about twenty-four years.',
    ],
    [
      'The merchant fired a spirit cannon at ',
      refs.pcs.jim,
      ', briefly shifting him to another plane of existence. ',
      refs.pcs.jim,
      ' returned still ethereal. The DM explicitly said the change would matter later.',
    ],
    [
      refs.pcs.devan,
      ' tested silver knuckles on ',
      refs.pcs.jim,
      ' and dealt seven damage, demonstrating that silver could hurt him despite his ethereal condition.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiBlast' },
})
