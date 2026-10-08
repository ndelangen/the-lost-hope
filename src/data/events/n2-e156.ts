import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Sarogarth entrusts Grimgor relics to Devan',
  day: 22,
  location: refs.locations.skynet,
  mark: { type: 'icon', name: 'gi/GiSecretBook' },
  notes: [
    [
      refs.pcs.devan,
      ' recognized ',
      refs.npcs.sarogarth,
      ' as the wizard from the holy accounts of ',
      refs.npcs.grimgor_the_bloody,
      '. ',
      refs.npcs.sarogarth,
      ' described their friendship and showed the ',
      refs.items.grimgor_s_skull_breaker,
      ', which he kept.',
    ],
    [
      refs.npcs.sarogarth,
      ' gave ',
      refs.pcs.devan,
      ' the ',
      refs.items.grimgor_s_sacred_necklace,
      ' and ',
      refs.items.grimgor_s_bloodied_bandages,
      ' to take to the ',
      refs.organizations.church_of_gruumsh,
      '. ',
      refs.pcs.jim,
      ' received the ',
      refs.items.pocket_holy_text_of_grimgor,
      '.',
    ],
  ],
})
