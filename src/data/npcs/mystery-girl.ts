import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Mystery Girl',
  avatar: '/assets/npcs/mystery-girl.png',
  location: refs.locations.fajanet_guildhall,
  species: 'unknown',
  notes: [['A figure from ', refs.pcs.william_greenhove, "'s background."]],
})
