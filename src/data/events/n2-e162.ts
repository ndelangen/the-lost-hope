import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim retrieves the Shadow Sword after the temple departs',
  day: 23,
  location: refs.locations.skynet,
  mark: { type: 'icon', name: 'gi/GiShamblingZombie' },
  notes: [
    [
      refs.pcs.jim,
      ' returned to the ',
      refs.locations.gruumsh_war_temple,
      ' and found only a dent where the building had stood. A remaining worshipper said the war party had shrunk the temple and was carrying it to the cathedral with the relics. Its present destination and location were not established.',
    ],
    [
      'The worshipper returned the ',
      refs.items.cursed_shadow_sword,
      ' with instructions from the ',
      refs.npcs.gruumsh_high_priest,
      ". He explained the remaining curse and the blade's moonlight charging requirement.",
    ],
    [
      'The worshipper warned, "Careful who you kill" and "No undead." Do not use ',
      refs.items.cursed_shadow_sword,
      ' on undead. He explained the danger of bestowing a soul on an undead creature and stressed that the result had never been tested.',
    ],
    [
      'The church waived ',
      refs.pcs.jim,
      "'s outstanding 20 GP pain-removal debt because it had received the holy relics. ",
      refs.pcs.devan,
      ' was free to travel as a wandering priest.',
    ],
  ],
})
