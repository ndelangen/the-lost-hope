import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: "The Fiddler's next game",
  location: refs.locations.nimbus,
  npcs: [refs.npcs.the_fiddler],
  setup: [['', refs.npcs.the_fiddler, ' offers another game, with stakes nobody has named yet.']],
  outcomes: [
    {
      when: [['A player takes the wager.']],
      response: [['Agree on the stakes before the first card.']],
    },
    {
      when: [['Everyone declines.']],
      response: [['', refs.npcs.the_fiddler, ' leaves a card behind with tomorrow’s date.']],
    },
  ],
})
