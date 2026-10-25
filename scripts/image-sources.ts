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
    id: 'location-illustration-serpent-eclipse-crystal-oasis',
    role: 'illustration',
    logicalSource: '/assets/locations/serpent-eclipse-crystal-oasis-illustration.png',
    repositoryPath:
      'assets/images/content/locations/serpent-eclipse-crystal-oasis-illustration.png',
  },
  {
    id: 'location-illustration-sylvias-flying-bazaar',
    role: 'illustration',
    logicalSource: '/assets/locations/sylvias-flying-bazaar-illustration.png',
    repositoryPath: 'assets/images/content/locations/sylvias-flying-bazaar-illustration.png',
  },
  {
    id: 'location-illustration-nimbus',
    role: 'illustration',
    logicalSource: '/assets/locations/nimbus-illustration.png',
    repositoryPath: 'assets/images/content/locations/nimbus-illustration.png',
  },
  {
    id: 'location-illustration-tempest',
    role: 'illustration',
    logicalSource: '/assets/locations/tempest-illustration.png',
    repositoryPath: 'assets/images/content/locations/tempest-illustration.png',
  },
  {
    id: 'location-illustration-serpent-eclipse-golden-tree-chamber',
    role: 'illustration',
    logicalSource: '/assets/locations/serpent-eclipse-golden-tree-chamber-illustration.png',
    repositoryPath:
      'assets/images/content/locations/serpent-eclipse-golden-tree-chamber-illustration.png',
  },
  {
    id: 'location-illustration-the-crater-bridge',
    role: 'illustration',
    logicalSource: '/assets/locations/the-crater-bridge-illustration.png',
    repositoryPath: 'assets/images/content/locations/the-crater-bridge-illustration.png',
  },
  {
    id: 'location-illustration-shadowpeak-mining-operation',
    role: 'illustration',
    logicalSource: '/assets/locations/shadowpeak-mining-operation-illustration.png',
    repositoryPath: 'assets/images/content/locations/shadowpeak-mining-operation-illustration.png',
  },
  {
    id: 'location-illustration-serpent-eclipse-pillar-chamber',
    role: 'illustration',
    logicalSource: '/assets/locations/serpent-eclipse-pillar-chamber-illustration.png',
    repositoryPath:
      'assets/images/content/locations/serpent-eclipse-pillar-chamber-illustration.png',
  },
  {
    id: 'location-illustration-serpent-eclipse-waterfall-descent',
    role: 'illustration',
    logicalSource: '/assets/locations/serpent-eclipse-waterfall-descent-illustration.png',
    repositoryPath:
      'assets/images/content/locations/serpent-eclipse-waterfall-descent-illustration.png',
  },
  {
    id: 'location-illustration-serpent-eclipse-three-door-chamber',
    role: 'illustration',
    logicalSource: '/assets/locations/serpent-eclipse-three-door-chamber-illustration.png',
    repositoryPath:
      'assets/images/content/locations/serpent-eclipse-three-door-chamber-illustration.png',
  },
  {
    id: 'location-illustration-serpent-eclipse-shadow-arena',
    role: 'illustration',
    logicalSource: '/assets/locations/serpent-eclipse-shadow-arena-illustration.png',
    repositoryPath: 'assets/images/content/locations/serpent-eclipse-shadow-arena-illustration.png',
  },
  {
    id: 'location-illustration-skynet-s-second-best-inn',
    role: 'illustration',
    logicalSource: '/assets/locations/skynet-s-second-best-inn-illustration.png',
    repositoryPath: 'assets/images/content/locations/skynet-s-second-best-inn-illustration.png',
  },
  {
    id: 'location-illustration-snowy-mountain-ruin',
    role: 'illustration',
    logicalSource: '/assets/locations/snowy-mountain-ruin-illustration.png',
    repositoryPath: 'assets/images/content/locations/snowy-mountain-ruin-illustration.png',
  },
  {
    id: 'location-illustration-the-nest',
    role: 'illustration',
    logicalSource: '/assets/locations/the-nest-illustration.png',
    repositoryPath: 'assets/images/content/locations/the-nest-illustration.png',
  },
  {
    id: 'location-illustration-fajanet-guildhall',
    role: 'illustration',
    logicalSource: '/assets/locations/fajanet-guildhall-illustration.png',
    repositoryPath: 'assets/images/content/locations/fajanet-guildhall-illustration.png',
  },
  {
    id: 'location-illustration-giggles-and-gadgets',
    role: 'illustration',
    logicalSource: '/assets/locations/giggles-and-gadgets-illustration.png',
    repositoryPath: 'assets/images/content/locations/giggles-and-gadgets-illustration.png',
  },
  {
    id: 'location-illustration-mortimer-s-shop',
    role: 'illustration',
    logicalSource: '/assets/locations/mortimer-s-shop-illustration.png',
    repositoryPath: 'assets/images/content/locations/mortimer-s-shop-illustration.png',
  },
  {
    id: 'location-illustration-temple-of-the-serpent-eclipse',
    role: 'illustration',
    logicalSource: '/assets/locations/temple-of-the-serpent-eclipse-illustration.png',
    repositoryPath:
      'assets/images/content/locations/temple-of-the-serpent-eclipse-illustration.png',
  },
  {
    id: 'location-illustration-the-blackstone',
    role: 'illustration',
    logicalSource: '/assets/locations/the-blackstone-illustration.png',
    repositoryPath: 'assets/images/content/locations/the-blackstone-illustration.png',
  },
  {
    id: 'location-illustration-fairhaven',
    role: 'illustration',
    logicalSource: '/assets/locations/fairhaven-illustration.png',
    repositoryPath: 'assets/images/content/locations/fairhaven-illustration.png',
  },
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
    repositoryPath: 'assets/images/content/pcs/devan.png',
  },
  {
    id: 'devan-armoured',
    role: 'avatar',
    logicalSource: '/assets/pcs/devan-armoured.jpg',
    repositoryPath: 'assets/images/content/pcs/devan-armoured.jpg',
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
