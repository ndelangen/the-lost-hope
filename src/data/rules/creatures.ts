import { create } from '#/definitions/rule.ts'

const glossary = (anchor: string) => ({ page: 'rules-glossary', anchor }) as const

export const tiny = create({
  name: 'Tiny',
  category: 'size',
  summary: ['2½ by 2½ ft. space, like a cat or a pixie.'],
  source: glossary('Size'),
})

export const small = create({
  name: 'Small',
  category: 'size',
  summary: ['5 by 5 ft. space, like a halfling or a goblin.'],
  source: glossary('Size'),
})

export const medium = create({
  name: 'Medium',
  category: 'size',
  summary: ['5 by 5 ft. space, like a human.'],
  source: glossary('Size'),
})

export const large = create({
  name: 'Large',
  category: 'size',
  summary: ['10 by 10 ft. space, like a horse or an ogre.'],
  source: glossary('Size'),
})

export const huge = create({
  name: 'Huge',
  category: 'size',
  summary: ['15 by 15 ft. space, like a giant or a young dragon.'],
  source: glossary('Size'),
})

export const gargantuan = create({
  name: 'Gargantuan',
  category: 'size',
  summary: ['20 by 20 ft. space or more, like an ancient dragon.'],
  source: glossary('Size'),
})

export const aberration = create({
  name: 'Aberration',
  category: 'creatureType',
  summary: ['Utterly alien beings, like beholders and mind flayers.'],
  source: glossary('CreatureType'),
})

export const beast = create({
  name: 'Beast',
  category: 'creatureType',
  summary: ['Natural animals and their giant cousins.'],
  source: glossary('CreatureType'),
})

export const celestial = create({
  name: 'Celestial',
  category: 'creatureType',
  summary: ['Beings of the Upper Planes, like angels.'],
  source: glossary('CreatureType'),
})

export const construct = create({
  name: 'Construct',
  category: 'creatureType',
  summary: ['Made, not born: golems, animated objects.'],
  source: glossary('CreatureType'),
})

export const dragon = create({
  name: 'Dragon',
  category: 'creatureType',
  summary: ['Dragons and their close kin.'],
  source: glossary('CreatureType'),
})

export const elemental = create({
  name: 'Elemental',
  category: 'creatureType',
  summary: ['Beings of pure elemental matter.'],
  source: glossary('CreatureType'),
})

export const fey = create({
  name: 'Fey',
  category: 'creatureType',
  summary: ['Magical creatures tied to nature and the Feywild.'],
  source: glossary('CreatureType'),
})

export const fiend = create({
  name: 'Fiend',
  category: 'creatureType',
  summary: ['Creatures of the Lower Planes: demons and devils.'],
  source: glossary('CreatureType'),
})

export const giant = create({
  name: 'Giant',
  category: 'creatureType',
  summary: ['Towering humanoid-shaped beings like giants and ogres.'],
  source: glossary('CreatureType'),
})

export const humanoid = create({
  name: 'Humanoid',
  category: 'creatureType',
  summary: ['People: humans, elves, dwarves, goblins, and the like.'],
  source: glossary('CreatureType'),
})

export const monstrosity = create({
  name: 'Monstrosity',
  category: 'creatureType',
  summary: ['Unnatural monsters, often made by magic or curses.'],
  source: glossary('CreatureType'),
})

export const ooze = create({
  name: 'Ooze',
  category: 'creatureType',
  summary: ['Shapeless, gelatinous creatures.'],
  source: glossary('CreatureType'),
})

export const plant = create({
  name: 'Plant',
  category: 'creatureType',
  summary: ['Living plants and fungi that act on their own.'],
  source: glossary('CreatureType'),
})

export const undead = create({
  name: 'Undead',
  category: 'creatureType',
  summary: ['Once alive, now animated by dark magic: zombies, ghosts, vampires.'],
  source: glossary('CreatureType'),
})
