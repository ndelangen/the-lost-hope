import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The high priest frees Jim from pain and cleanses the Shadow Sword',
  day: 21,
  location: refs.locations.gruumsh_temple_ritual_room,
  mark: { type: 'avatar', url: '/assets/pcs/jim.jpg' },
  notes: [
    [
      refs.pcs.jim,
      ' incurred a 20 GP debt specifically for the pain-removal ritual performed by the ',
      refs.npcs.gruumsh_high_priest,
      '. ',
      refs.npcs.gruumsh_high_priest,
      ' removed the excruciating pain and permanent one-point penalty inflicted during ',
      refs.events.n2_e105,
      '. The lightning-storm curse from ',
      refs.events.n2_e105,
      ' remained attached to ',
      refs.pcs.jim,
      '.',
    ],
    [
      refs.pcs.jim,
      ' then asked the ',
      refs.npcs.gruumsh_high_priest,
      ' to cleanse the ',
      refs.items.cursed_shadow_sword,
      ' as a favor separate from the 20 GP debt. When the ',
      refs.npcs.gruumsh_high_priest,
      ' examined the drawn ',
      refs.items.cursed_shadow_sword,
      ', his hand began to blacken before the curse recoiled from him.',
    ],
    [
      refs.npcs.gruumsh_high_priest,
      ' removed the curse from the ',
      refs.items.cursed_shadow_sword,
      ', but did not explain what he did with the extracted curse or whether the deadly shadow bound to the ',
      refs.items.cursed_shadow_sword,
      ' survived.',
    ],
  ],
})
