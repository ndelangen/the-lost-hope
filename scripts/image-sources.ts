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
    id: 'location-map-three-sky-kingdoms',
    role: 'map',
    logicalSource: '/assets/maps/three-sky-kingdoms.jpg',
    repositoryPath: 'assets/images/maps/three-sky-kingdoms.png',
  },
  {
    id: 'location-illustration-three-sky-kingdoms',
    role: 'illustration',
    logicalSource: '/assets/locations/three-sky-kingdoms-illustration.png',
    repositoryPath: 'assets/images/content/locations/three-sky-kingdoms-illustration.png',
  },
  {
    id: 'location-map-nimbus',
    role: 'map',
    logicalSource: '/assets/maps/nimbus.jpg',
    repositoryPath: 'assets/images/maps/nimbus.png',
  },
  {
    id: 'location-map-skynet',
    role: 'map',
    logicalSource: '/assets/maps/skynet.jpg',
    repositoryPath: 'assets/images/maps/skynet.png',
  },
  {
    id: 'location-illustration-skynet',
    role: 'illustration',
    logicalSource: '/assets/locations/skynet-illustration.png',
    repositoryPath: 'assets/images/content/locations/skynet-illustration.png',
  },
  {
    id: 'location-map-tempest',
    role: 'map',
    logicalSource: '/assets/maps/tempest.jpg',
    repositoryPath: 'assets/images/maps/tempest.png',
  },
  {
    id: 'location-map-gruumsh-war-temple',
    role: 'map',
    logicalSource: '/assets/maps/gruumsh-war-temple.jpg',
    repositoryPath: 'assets/images/maps/gruumsh-war-temple.png',
  },
  {
    id: 'location-illustration-gruumsh-war-temple',
    role: 'illustration',
    logicalSource: '/assets/locations/gruumsh-war-temple-illustration.png',
    repositoryPath: 'assets/images/content/locations/gruumsh-war-temple-illustration.png',
  },
  {
    id: 'location-map-skynet-s-second-best-inn',
    role: 'map',
    logicalSource: '/assets/maps/skynet-s-second-best-inn.jpg',
    repositoryPath: 'assets/images/maps/skynet-s-second-best-inn.png',
  },
  {
    id: 'location-map-temple-of-the-serpent-eclipse',
    role: 'map',
    logicalSource: '/assets/maps/temple-of-the-serpent-eclipse.jpg',
    repositoryPath: 'assets/images/maps/temple-of-the-serpent-eclipse.png',
  },
  {
    id: 'location-map-gruumsh-temple-main-hall',
    role: 'map',
    logicalSource: '/assets/maps/gruumsh-temple-main-hall.jpg',
    repositoryPath: 'assets/images/maps/gruumsh-temple-main-hall.png',
  },
  {
    id: 'location-illustration-gruumsh-temple-main-hall',
    role: 'illustration',
    logicalSource: '/assets/locations/gruumsh-temple-main-hall-illustration.png',
    repositoryPath: 'assets/images/content/locations/gruumsh-temple-main-hall-illustration.png',
  },
  {
    id: 'location-map-gruumsh-temple-library',
    role: 'map',
    logicalSource: '/assets/maps/gruumsh-temple-library.jpg',
    repositoryPath: 'assets/images/maps/gruumsh-temple-library.png',
  },
  {
    id: 'location-illustration-gruumsh-temple-library',
    role: 'illustration',
    logicalSource: '/assets/locations/gruumsh-temple-library-illustration.png',
    repositoryPath: 'assets/images/content/locations/gruumsh-temple-library-illustration.png',
  },
  {
    id: 'location-map-gruumsh-temple-ritual-room',
    role: 'map',
    logicalSource: '/assets/maps/gruumsh-temple-ritual-room.jpg',
    repositoryPath: 'assets/images/maps/gruumsh-temple-ritual-room.png',
  },
  {
    id: 'location-illustration-gruumsh-temple-ritual-room',
    role: 'illustration',
    logicalSource: '/assets/locations/gruumsh-temple-ritual-room-illustration.png',
    repositoryPath: 'assets/images/content/locations/gruumsh-temple-ritual-room-illustration.png',
  },
  {
    id: 'location-map-gruumsh-temple-blood-hall',
    role: 'map',
    logicalSource: '/assets/maps/gruumsh-temple-blood-hall.jpg',
    repositoryPath: 'assets/images/maps/gruumsh-temple-blood-hall.png',
  },
  {
    id: 'location-illustration-gruumsh-temple-blood-hall',
    role: 'illustration',
    logicalSource: '/assets/locations/gruumsh-temple-blood-hall-illustration.png',
    repositoryPath: 'assets/images/content/locations/gruumsh-temple-blood-hall-illustration.png',
  },
  {
    id: 'location-map-jim-s-room-at-skynet-s-second-best-inn',
    role: 'map',
    logicalSource: '/assets/maps/jim-s-room-at-skynet-s-second-best-inn.jpg',
    repositoryPath: 'assets/images/maps/jim-s-room-at-skynet-s-second-best-inn.png',
  },
  {
    id: 'location-illustration-jim-s-room-at-skynet-s-second-best-inn',
    role: 'illustration',
    logicalSource: '/assets/locations/jim-s-room-at-skynet-s-second-best-inn-illustration.png',
    repositoryPath:
      'assets/images/content/locations/jim-s-room-at-skynet-s-second-best-inn-illustration.png',
  },
  {
    id: 'location-map-serpent-eclipse-dungeon-entrance',
    role: 'map',
    logicalSource: '/assets/maps/serpent-eclipse-dungeon-entrance.jpg',
    repositoryPath: 'assets/images/maps/serpent-eclipse-dungeon-entrance.png',
  },
  {
    id: 'location-illustration-serpent-eclipse-dungeon-entrance',
    role: 'illustration',
    logicalSource: '/assets/locations/serpent-eclipse-dungeon-entrance-illustration.png',
    repositoryPath:
      'assets/images/content/locations/serpent-eclipse-dungeon-entrance-illustration.png',
  },
  {
    id: 'location-map-serpent-eclipse-reception-hall',
    role: 'map',
    logicalSource: '/assets/maps/serpent-eclipse-reception-hall.jpg',
    repositoryPath: 'assets/images/maps/serpent-eclipse-reception-hall.png',
  },
  {
    id: 'location-illustration-serpent-eclipse-reception-hall',
    role: 'illustration',
    logicalSource: '/assets/locations/serpent-eclipse-reception-hall-illustration.png',
    repositoryPath:
      'assets/images/content/locations/serpent-eclipse-reception-hall-illustration.png',
  },
  {
    id: 'location-map-serpent-eclipse-left-door-passage',
    role: 'map',
    logicalSource: '/assets/maps/serpent-eclipse-left-door-passage.jpg',
    repositoryPath: 'assets/images/maps/serpent-eclipse-left-door-passage.png',
  },
  {
    id: 'location-illustration-serpent-eclipse-left-door-passage',
    role: 'illustration',
    logicalSource: '/assets/locations/serpent-eclipse-left-door-passage-illustration.png',
    repositoryPath:
      'assets/images/content/locations/serpent-eclipse-left-door-passage-illustration.png',
  },
  {
    id: 'location-map-serpent-eclipse-shadow-arena',
    role: 'map',
    logicalSource: '/assets/maps/serpent-eclipse-shadow-arena.jpg',
    repositoryPath: 'assets/images/maps/serpent-eclipse-shadow-arena.png',
  },
  {
    id: 'location-illustration-serpent-eclipse-maze',
    role: 'illustration',
    logicalSource: '/assets/locations/serpent-eclipse-maze-illustration.png',
    repositoryPath: 'assets/images/content/locations/serpent-eclipse-maze-illustration.png',
  },
  {
    id: 'location-map-serpent-eclipse-crystal-oasis',
    role: 'map',
    logicalSource: '/assets/maps/serpent-eclipse-crystal-oasis.jpg',
    repositoryPath: 'assets/images/maps/serpent-eclipse-crystal-oasis.png',
  },
  {
    id: 'location-map-serpent-eclipse-far-landing',
    role: 'map',
    logicalSource: '/assets/maps/serpent-eclipse-far-landing.jpg',
    repositoryPath: 'assets/images/maps/serpent-eclipse-far-landing.png',
  },
  {
    id: 'location-illustration-serpent-eclipse-far-landing',
    role: 'illustration',
    logicalSource: '/assets/locations/serpent-eclipse-far-landing-illustration.png',
    repositoryPath: 'assets/images/content/locations/serpent-eclipse-far-landing-illustration.png',
  },
  {
    id: 'location-map-serpent-eclipse-flooded-cavern',
    role: 'map',
    logicalSource: '/assets/maps/serpent-eclipse-flooded-cavern.jpg',
    repositoryPath: 'assets/images/maps/serpent-eclipse-flooded-cavern.png',
  },
  {
    id: 'location-map-serpent-eclipse-golden-tree-chamber',
    role: 'map',
    logicalSource: '/assets/maps/serpent-eclipse-golden-tree-chamber.jpg',
    repositoryPath: 'assets/images/maps/serpent-eclipse-golden-tree-chamber.png',
  },
  {
    id: 'location-map-serpent-eclipse-pillar-chamber',
    role: 'map',
    logicalSource: '/assets/maps/serpent-eclipse-pillar-chamber.jpg',
    repositoryPath: 'assets/images/maps/serpent-eclipse-pillar-chamber.png',
  },
  {
    id: 'location-map-serpent-eclipse-rest-chamber',
    role: 'map',
    logicalSource: '/assets/maps/serpent-eclipse-rest-chamber.jpg',
    repositoryPath: 'assets/images/maps/serpent-eclipse-rest-chamber.png',
  },
  {
    id: 'location-illustration-serpent-eclipse-rest-chamber',
    role: 'illustration',
    logicalSource: '/assets/locations/serpent-eclipse-rest-chamber-illustration.png',
    repositoryPath: 'assets/images/content/locations/serpent-eclipse-rest-chamber-illustration.png',
  },
  {
    id: 'location-map-serpent-eclipse-waterfall-descent',
    role: 'map',
    logicalSource: '/assets/maps/serpent-eclipse-waterfall-descent.jpg',
    repositoryPath: 'assets/images/maps/serpent-eclipse-waterfall-descent.png',
  },
  {
    id: 'esia',
    role: 'avatar',
    logicalSource: '/assets/npcs/esia.png',
    repositoryPath: 'assets/images/content/npcs/esia.png',
  },
  {
    id: 'sarogarth',
    role: 'avatar',
    logicalSource: '/assets/npcs/sarogarth.png',
    repositoryPath: 'assets/images/content/npcs/sarogarth.png',
  },
  {
    id: 'bob-the-merchant',
    role: 'avatar',
    logicalSource: '/assets/npcs/bob-the-merchant.png',
    repositoryPath: 'assets/images/content/npcs/bob-the-merchant.png',
  },
  {
    id: 'grimgor-the-bloody',
    role: 'avatar',
    logicalSource: '/assets/npcs/grimgor-the-bloody.png',
    repositoryPath: 'assets/images/content/npcs/grimgor-the-bloody.png',
  },
  {
    id: 'sylvia',
    role: 'avatar',
    logicalSource: '/assets/npcs/sylvia.png',
    repositoryPath: 'assets/images/content/npcs/sylvia.png',
  },
  {
    id: 'knukkles',
    role: 'avatar',
    logicalSource: '/assets/npcs/knukkles.png',
    repositoryPath: 'assets/images/content/npcs/knukkles.png',
  },
  {
    id: 'bob-the-gate-troll',
    role: 'avatar',
    logicalSource: '/assets/npcs/bob-the-gate-troll.png',
    repositoryPath: 'assets/images/content/npcs/bob-the-gate-troll.png',
  },
  {
    id: 'dax',
    role: 'avatar',
    logicalSource: '/assets/npcs/dax.png',
    repositoryPath: 'assets/images/content/npcs/dax.png',
  },
  {
    id: 'sylf',
    role: 'avatar',
    logicalSource: '/assets/npcs/sylf.png',
    repositoryPath: 'assets/images/content/npcs/sylf.png',
  },
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
    id: 'jim-ghost',
    role: 'avatar',
    logicalSource: '/assets/pcs/jim-ghost.png',
    repositoryPath: 'assets/images/content/pcs/jim-ghost.png',
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
