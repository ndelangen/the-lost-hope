import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "Fajanet's 5-day festival — no tentacles at night",
  day: 4,
  location: refs.locations.fajanet,
  mark: { type: 'icon', name: 'fa/FaGlassCheers' },
  notes: [
    ['A 5-day festival was happening in ', refs.locations.fajanet, '.'],
    [
      'During the festival nights: the tentacle phenomenon that hit on night 1 did not occur. The party was able to be out at night. The festival continued after nightfall. The festival seemed to ensure the night was safe.',
    ],
    [
      'The party asked ',
      refs.npcs.third_marshal_light,
      ' about the tentacles and the compelling voices. Light had no clue what they were talking about.',
    ],
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', ',
      refs.pcs.revin_grumblefist,
      ', ',
      refs.pcs.mr_peace,
    ],
  ],
})
