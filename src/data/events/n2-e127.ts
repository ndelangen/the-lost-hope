import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party survives the Serpent Eclipse shadow arena',
  day: 21,
  location: refs.locations.serpent_eclipse_shadow_arena,
  mark: { type: 'icon', name: 'gi/GiShadowGrasp' },
  notes: [
    [
      'Blood filled the arena and produced three hostile shadows: a hovering spellcaster, a displacer beast, and a whip-wielding figure. The party defeated all three after a prolonged fight.',
    ],
    [
      refs.pcs.jim,
      ' fell unconscious and came within one failed death save of dying. ',
      refs.pcs.devan,
      ' restored him with healing, and Jim awoke with one level of exhaustion under the table’s death rules.',
    ],
  ],
})
