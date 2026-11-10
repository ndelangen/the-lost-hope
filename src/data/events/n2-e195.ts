import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The Fiddler gains a knight and survives the avatar of death',
  notes: [
    [
      refs.npcs.the_fiddler,
      ' drew cards himself, gaining Dexterity, ',
      refs.npcs.the_fiddler_s_knight,
      ', tool and instrument proficiencies, languages, and a magical weapon. The Knight card summoned a woman loyal to him.',
    ],
    [
      'Skull summoned an avatar of death to fight him. The card warned that anyone intervening would summon an avatar of their own. He survived the fight. The DM said the knight had been decisive and that he would otherwise have died.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiShadowFollower' },
})
