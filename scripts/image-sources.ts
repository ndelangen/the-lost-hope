import { join } from 'node:path'

export const RESPONSIVE_IMAGE_WIDTHS = [
  32, 64, 128, 192, 256, 384, 512, 640, 768, 960, 1024, 1280,
] as const

export const RESPONSIVE_IMAGE_ENCODING = {
  quality: 80,
  progressive: true,
  chromaSubsampling: '4:2:0',
} as const

export const APP_ICON_BACKGROUND = '#07111f'

export type ResponsiveImageSource = {
  id: string
  role: 'avatar' | 'map' | 'illustration'
  logicalSource: string
  repositoryPath: string
}

export const RESPONSIVE_IMAGE_SOURCES: readonly ResponsiveImageSource[] = [
  {
    id: 'serpent-eclipse-flooded-cavern',
    role: 'illustration',
    logicalSource: '/assets/locations/serpent-eclipse-flooded-cavern.jpg',
    repositoryPath: 'assets/images/content/locations/serpent-eclipse-flooded-cavern.jpg',
  },
  {
    id: 'serpent-eclipse-lake-serpent',
    role: 'avatar',
    logicalSource: '/assets/beasts/serpent-eclipse-lake-serpent.jpg',
    repositoryPath: 'assets/images/content/beasts/serpent-eclipse-lake-serpent.jpg',
  },
  {
    id: 'serpent-eclipse-maze',
    role: 'map',
    logicalSource: '/assets/maps/serpent-eclipse-maze.jpg',
    repositoryPath: 'assets/images/maps/serpent-eclipse-maze.png',
  },
  {
    id: 'serpent-eclipse-three-door-chamber',
    role: 'map',
    logicalSource: '/assets/maps/serpent-eclipse-three-door-chamber.jpg',
    repositoryPath: 'assets/images/maps/serpent-eclipse-three-door-chamber.png',
  },
  {
    id: 'captain-squawk',
    role: 'avatar',
    logicalSource: '/assets/beasts/captain-squawk.jpg',
    repositoryPath: 'assets/images/content/beasts/captain-squawk.jpg',
  },
  {
    id: 'sir-fabulous-divine-steed',
    role: 'avatar',
    logicalSource: '/assets/npcs/sir-fabulous-divine-steed.png',
    repositoryPath: 'assets/images/content/npcs/sir-fabulous-divine-steed.png',
  },
  {
    id: 'wolfie',
    role: 'avatar',
    logicalSource: '/assets/npcs/wolfie.png',
    repositoryPath: 'assets/images/content/npcs/wolfie.png',
  },
  {
    id: 'cassian',
    role: 'avatar',
    logicalSource: '/assets/pcs/cassian.jpg',
    repositoryPath: 'assets/images/content/pcs/cassian.jpg',
  },
  {
    id: 'devan',
    role: 'avatar',
    logicalSource: '/assets/pcs/devan.jpg',
    repositoryPath: 'assets/images/content/pcs/devan.jpg',
  },
  {
    id: 'jim-kenku',
    role: 'avatar',
    logicalSource: '/assets/pcs/jim-kenku.jpg',
    repositoryPath: 'assets/images/content/pcs/jim-kenku.jpg',
  },
  {
    id: 'jim',
    role: 'avatar',
    logicalSource: '/assets/pcs/jim.jpg',
    repositoryPath: 'assets/images/content/pcs/jim.jpg',
  },
  {
    id: 'swift',
    role: 'avatar',
    logicalSource: '/assets/pcs/swift.jpg',
    repositoryPath: 'assets/images/content/pcs/swift.jpg',
  },
  {
    id: 'william',
    role: 'avatar',
    logicalSource: '/assets/pcs/william.jpg',
    repositoryPath: 'assets/images/content/pcs/william.jpg',
  },
  {
    id: 'theron',
    role: 'avatar',
    logicalSource: 'https://www.dndbeyond.com/avatars/52821/990/1581111423-155753427.jpeg',
    repositoryPath: 'assets/images/external/theron.jpeg',
  },
]

const SOURCE_BY_LOGICAL_PATH = new Map(
  RESPONSIVE_IMAGE_SOURCES.map((source) => [source.logicalSource, source]),
)

export function responsiveImageSourcePath(root: string, logicalSource: string): string | undefined {
  const source = SOURCE_BY_LOGICAL_PATH.get(logicalSource)
  return source ? join(root, source.repositoryPath) : undefined
}
