import { refs } from '#/data/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Goblin Grass-Keepers',
  avatar: '/assets/npcs/goblin-grass-keepers.png',
  location: refs.locations.fajanet,
  species: 'Goblin',
  summary: [
    'A group of friendly goblins in ',
    refs.locations.fajanet,
    ' who keep a patch of grass in absolutely perfect condition. Friendly to the city and to strangers, but fiercely protective of their turf. The location of their turf and whether they have a leader are unestablished.',
  ],
})
