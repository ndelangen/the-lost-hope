import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Stealing a ship from the harbour',
  location: refs.locations.nimbus,
  setup: [['A skiff is moored at the end of the harbour, its owner asleep on the deck.']],
  outcomes: [
    {
      when: [['They sneak aboard.']],
      response: [['Stealth check; the owner wakes halfway across.']],
    },
    {
      when: [['They bargain.']],
      response: [['The owner wants a favour on the fortress, not coin.']],
    },
  ],
})
