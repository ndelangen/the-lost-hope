import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim survives the Zodiac Dagger and rejects a soul bargain',
  day: 22,
  location: refs.locations.serpent_eclipse_crystal_oasis,
  mark: { type: 'avatar', url: '/assets/pcs/jim.jpg' },
  notes: [
    [
      refs.npcs.sarogarth,
      ' offered ',
      refs.pcs.jim,
      ' the ',
      refs.items.dagger_of_the_zodiac_signs,
      ", warning that accepting it would bind the dagger to him and release the accumulated force of the crystal's destruction. Despite magical preparation, the release dealt 72 damage.",
    ],
    [
      refs.pcs.jim,
      ' experienced a private vision of the ',
      refs.npcs.throne_figure_in_jim_s_vision,
      ' on a throne. The being wanted his willing surrender of body and soul, said taking him by force would only give it a hundred years in the world, and offered to kill ',
      refs.npcs.the_father,
      ' for him.',
    ],
    [
      refs.pcs.jim,
      ' rejected the offer. The being showed him his ruined body, stopped the fatal moment, and saved him anyway so it could keep pursuing the bargain. To the rest of the party, he simply survived the blast. He remained standing with the dagger and one hit point.',
    ],
  ],
})
