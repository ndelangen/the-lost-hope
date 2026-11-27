import { join } from 'node:path'

import libraryImageSources from './library-image-sources.json'

export const RESPONSIVE_IMAGE_WIDTHS = [
  32, 64, 128, 192, 256, 384, 512, 640, 768, 960, 1024, 1280, 1536,
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
  maxWidth?: number
  widths?: readonly number[]
  archived?: boolean
}

export const ORIGINAL_IMAGE_SOURCES: readonly ResponsiveImageSource[] = [
  ...libraryImageSources.map((source) => ({
    ...source,
    role: 'illustration' as const,
    maxWidth: 768,
    ...(source.logicalSource.startsWith('/assets/library/worker-art/')
      ? { widths: [32, 384, 768] }
      : {}),
  })),
  {
    id: 'npcs-durgan-ashfang-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/durgan-ashfang-portrait.png',
    repositoryPath: 'assets/images/content/npcs/durgan-ashfang-portrait.png',
  },
  {
    id: 'npcs-hand-breaker-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/hand-breaker-portrait.png',
    repositoryPath: 'assets/images/content/npcs/hand-breaker-portrait.png',
  },
  {
    id: 'npcs-hand-spellbinder-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/hand-spellbinder-portrait.png',
    repositoryPath: 'assets/images/content/npcs/hand-spellbinder-portrait.png',
  },
  {
    id: 'scenes-boarding-ball-loading',
    role: 'illustration',
    logicalSource: '/assets/scenes/boarding-ball-loading.png',
    repositoryPath: 'assets/images/content/scenes/boarding-ball-loading.png',
  },
  {
    id: 'scenes-boarding-ball-impact',
    role: 'illustration',
    logicalSource: '/assets/scenes/boarding-ball-impact.png',
    repositoryPath: 'assets/images/content/scenes/boarding-ball-impact.png',
  },
  {
    id: 'scenes-chaos-on-the-sky-islands',
    role: 'illustration',
    logicalSource: '/assets/scenes/chaos-on-the-sky-islands.png',
    repositoryPath: 'assets/images/content/scenes/chaos-on-the-sky-islands.png',
  },
  {
    id: 'scenes-month-long-boat-journey',
    role: 'illustration',
    logicalSource: '/assets/scenes/month-long-boat-journey.png',
    repositoryPath: 'assets/images/content/scenes/month-long-boat-journey.png',
  },
  {
    id: 'scenes-jim-receives-a-letter-from-light',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-receives-a-letter-from-light.png',
    repositoryPath: 'assets/images/content/scenes/jim-receives-a-letter-from-light.png',
  },
  {
    id: 'scenes-william-diverts-to-a-tavern',
    role: 'illustration',
    logicalSource: '/assets/scenes/william-diverts-to-a-tavern.png',
    repositoryPath: 'assets/images/content/scenes/william-diverts-to-a-tavern.png',
  },
  {
    id: 'scenes-night-falls-tavern-closes-up',
    role: 'illustration',
    logicalSource: '/assets/scenes/night-falls-tavern-closes-up.png',
    repositoryPath: 'assets/images/content/scenes/night-falls-tavern-closes-up.png',
  },
  {
    id: 'scenes-meet-bob-the-gate-troll',
    role: 'illustration',
    logicalSource: '/assets/scenes/meet-bob-the-gate-troll.png',
    repositoryPath: 'assets/images/content/scenes/meet-bob-the-gate-troll.png',
  },
  {
    id: 'scenes-two-zombies-attack-at-the-docks',
    role: 'illustration',
    logicalSource: '/assets/scenes/two-zombies-attack-at-the-docks.png',
    repositoryPath: 'assets/images/content/scenes/two-zombies-attack-at-the-docks.png',
  },
  {
    id: 'scenes-shadowy-tentacles-grab-the-dwarf',
    role: 'illustration',
    logicalSource: '/assets/scenes/shadowy-tentacles-grab-the-dwarf.png',
    repositoryPath: 'assets/images/content/scenes/shadowy-tentacles-grab-the-dwarf.png',
  },
  {
    id: 'scenes-children-s-laughter-outside',
    role: 'illustration',
    logicalSource: '/assets/scenes/children-s-laughter-outside.png',
    repositoryPath: 'assets/images/content/scenes/children-s-laughter-outside.png',
  },
  {
    id: 'scenes-day-2-city-looks-normal',
    role: 'illustration',
    logicalSource: '/assets/scenes/day-2-city-looks-normal.png',
    repositoryPath: 'assets/images/content/scenes/day-2-city-looks-normal.png',
  },
  {
    id: 'scenes-meet-light-13th-marshal-at-the-guildhall',
    role: 'illustration',
    logicalSource: '/assets/scenes/meet-light-13th-marshal-at-the-guildhall.png',
    repositoryPath: 'assets/images/content/scenes/meet-light-13th-marshal-at-the-guildhall.png',
  },
  {
    id: 'scenes-the-guild-tattoo-ritual',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-guild-tattoo-ritual.png',
    repositoryPath: 'assets/images/content/scenes/the-guild-tattoo-ritual.png',
  },
  {
    id: 'scenes-bulletin-board-pick-a-quest',
    role: 'illustration',
    logicalSource: '/assets/scenes/bulletin-board-pick-a-quest.png',
    repositoryPath: 'assets/images/content/scenes/bulletin-board-pick-a-quest.png',
  },
  {
    id: 'scenes-visit-the-exotic-animal-dealer',
    role: 'illustration',
    logicalSource: '/assets/scenes/visit-the-exotic-animal-dealer.png',
    repositoryPath: 'assets/images/content/scenes/visit-the-exotic-animal-dealer.png',
  },
  {
    id: 'scenes-enter-the-tunnel-via-trapdoor',
    role: 'illustration',
    logicalSource: '/assets/scenes/enter-the-tunnel-via-trapdoor.png',
    repositoryPath: 'assets/images/content/scenes/enter-the-tunnel-via-trapdoor.png',
  },
  {
    id: 'scenes-find-a-phoenix-feather-in-an-offshoot',
    role: 'illustration',
    logicalSource: '/assets/scenes/find-a-phoenix-feather-in-an-offshoot.png',
    repositoryPath: 'assets/images/content/scenes/find-a-phoenix-feather-in-an-offshoot.png',
  },
  {
    id: 'scenes-giant-spider-guarding-a-young-phoenix',
    role: 'illustration',
    logicalSource: '/assets/scenes/giant-spider-guarding-a-young-phoenix.png',
    repositoryPath: 'assets/images/content/scenes/giant-spider-guarding-a-young-phoenix.png',
  },
  {
    id: 'scenes-return-phoenix-to-the-dealer-animal-1-3',
    role: 'illustration',
    logicalSource: '/assets/scenes/return-phoenix-to-the-dealer-animal-1-3.png',
    repositoryPath: 'assets/images/content/scenes/return-phoenix-to-the-dealer-animal-1-3.png',
  },
  {
    id: 'scenes-recover-a-displacer-beast-animal-2-3',
    role: 'illustration',
    logicalSource: '/assets/scenes/recover-a-displacer-beast-animal-2-3.png',
    repositoryPath: 'assets/images/content/scenes/recover-a-displacer-beast-animal-2-3.png',
  },
  {
    id: 'scenes-return-to-the-guildhall-with-2-of-3-animals',
    role: 'illustration',
    logicalSource: '/assets/scenes/return-to-the-guildhall-with-2-of-3-animals.png',
    repositoryPath: 'assets/images/content/scenes/return-to-the-guildhall-with-2-of-3-animals.png',
  },
  {
    id: 'scenes-jim-receives-a-final-warning-letter',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-receives-a-final-warning-letter.png',
    repositoryPath: 'assets/images/content/scenes/jim-receives-a-final-warning-letter.png',
  },
  {
    id: 'scenes-jim-speaks-with-light-1-1',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-speaks-with-light-1-1.png',
    repositoryPath: 'assets/images/content/scenes/jim-speaks-with-light-1-1.png',
  },
  {
    id: 'scenes-william-s-bathroom-experience',
    role: 'illustration',
    logicalSource: '/assets/scenes/william-s-bathroom-experience.png',
    repositoryPath: 'assets/images/content/scenes/william-s-bathroom-experience.png',
  },
  {
    id: 'scenes-mr-peace-joins-for-one-session',
    role: 'illustration',
    logicalSource: '/assets/scenes/mr-peace-joins-for-one-session.png',
    repositoryPath: 'assets/images/content/scenes/mr-peace-joins-for-one-session.png',
  },
  {
    id: 'scenes-friendly-goblin-grass-keepers-try-to-kidnap-mr-peace',
    role: 'illustration',
    logicalSource: '/assets/scenes/friendly-goblin-grass-keepers-try-to-kidnap-mr-peace.png',
    repositoryPath:
      'assets/images/content/scenes/friendly-goblin-grass-keepers-try-to-kidnap-mr-peace.png',
  },
  {
    id: 'scenes-fajanet-s-5-day-festival-no-tentacles-at-night',
    role: 'illustration',
    logicalSource: '/assets/scenes/fajanet-s-5-day-festival-no-tentacles-at-night.png',
    repositoryPath:
      'assets/images/content/scenes/fajanet-s-5-day-festival-no-tentacles-at-night.png',
  },
  {
    id: 'scenes-bob-gives-the-party-special-daggers',
    role: 'illustration',
    logicalSource: '/assets/scenes/bob-gives-the-party-special-daggers.png',
    repositoryPath: 'assets/images/content/scenes/bob-gives-the-party-special-daggers.png',
  },
  {
    id: 'scenes-devan-joins-while-swift-continues-with-the-party',
    role: 'illustration',
    logicalSource: '/assets/scenes/devan-joins-while-swift-continues-with-the-party.png',
    repositoryPath:
      'assets/images/content/scenes/devan-joins-while-swift-continues-with-the-party.png',
  },
  {
    id: 'scenes-meet-light-in-the-morning-and-leave-fajanet',
    role: 'illustration',
    logicalSource: '/assets/scenes/meet-light-in-the-morning-and-leave-fajanet.png',
    repositoryPath: 'assets/images/content/scenes/meet-light-in-the-morning-and-leave-fajanet.png',
  },
  {
    id: 'scenes-light-instructs-the-party-to-use-the-trapdoor',
    role: 'illustration',
    logicalSource: '/assets/scenes/light-instructs-the-party-to-use-the-trapdoor.png',
    repositoryPath:
      'assets/images/content/scenes/light-instructs-the-party-to-use-the-trapdoor.png',
  },
  {
    id: 'scenes-lost-in-the-shadow-realm',
    role: 'illustration',
    logicalSource: '/assets/scenes/lost-in-the-shadow-realm.png',
    repositoryPath: 'assets/images/content/scenes/lost-in-the-shadow-realm.png',
  },
  {
    id: 'scenes-a-phoenix-feather-guides-the-party-out-of-the-shadow-realm',
    role: 'illustration',
    logicalSource: '/assets/scenes/a-phoenix-feather-guides-the-party-out-of-the-shadow-realm.png',
    repositoryPath:
      'assets/images/content/scenes/a-phoenix-feather-guides-the-party-out-of-the-shadow-realm.png',
  },
  {
    id: 'scenes-reach-a-cliff-with-a-sign',
    role: 'illustration',
    logicalSource: '/assets/scenes/reach-a-cliff-with-a-sign.png',
    repositoryPath: 'assets/images/content/scenes/reach-a-cliff-with-a-sign.png',
  },
  {
    id: 'scenes-pass-through-a-holy-site-into-the-mountains',
    role: 'illustration',
    logicalSource: '/assets/scenes/pass-through-a-holy-site-into-the-mountains.png',
    repositoryPath: 'assets/images/content/scenes/pass-through-a-holy-site-into-the-mountains.png',
  },
  {
    id: 'scenes-puzzle-room-with-5-elements-chasing-each-other',
    role: 'illustration',
    logicalSource: '/assets/scenes/puzzle-room-with-5-elements-chasing-each-other.png',
    repositoryPath:
      'assets/images/content/scenes/puzzle-room-with-5-elements-chasing-each-other.png',
  },
  {
    id: 'scenes-meet-the-angel-and-the-dragon-husband-and-wife',
    role: 'illustration',
    logicalSource: '/assets/scenes/meet-the-angel-and-the-dragon-husband-and-wife.png',
    repositoryPath:
      'assets/images/content/scenes/meet-the-angel-and-the-dragon-husband-and-wife.png',
  },
  {
    id: 'scenes-zone-of-truth-each-pc-questioned',
    role: 'illustration',
    logicalSource: '/assets/scenes/zone-of-truth-each-pc-questioned.png',
    repositoryPath: 'assets/images/content/scenes/zone-of-truth-each-pc-questioned.png',
  },
  {
    id: 'scenes-pirate-asks-the-dragon-children-to-fly-the-party-down',
    role: 'illustration',
    logicalSource: '/assets/scenes/pirate-asks-the-dragon-children-to-fly-the-party-down.png',
    repositoryPath:
      'assets/images/content/scenes/pirate-asks-the-dragon-children-to-fly-the-party-down.png',
  },
  {
    id: 'scenes-the-dwarf-and-the-pirate-go-missing',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-dwarf-and-the-pirate-go-missing.png',
    repositoryPath: 'assets/images/content/scenes/the-dwarf-and-the-pirate-go-missing.png',
  },
  {
    id: 'scenes-meet-victor-the-lumberjack-and-abraham-the-donkey',
    role: 'illustration',
    logicalSource: '/assets/scenes/meet-victor-the-lumberjack-and-abraham-the-donkey.png',
    repositoryPath:
      'assets/images/content/scenes/meet-victor-the-lumberjack-and-abraham-the-donkey.png',
  },
  {
    id: 'scenes-dinos-ridden-toward-fairhaven',
    role: 'illustration',
    logicalSource: '/assets/scenes/dinos-ridden-toward-fairhaven.png',
    repositoryPath: 'assets/images/content/scenes/dinos-ridden-toward-fairhaven.png',
  },
  {
    id: 'scenes-hunted-by-a-small-group-of-dinos',
    role: 'illustration',
    logicalSource: '/assets/scenes/hunted-by-a-small-group-of-dinos.png',
    repositoryPath: 'assets/images/content/scenes/hunted-by-a-small-group-of-dinos.png',
  },
  {
    id: 'scenes-reach-badesh-victor-s-hometown',
    role: 'illustration',
    logicalSource: '/assets/scenes/reach-badesh-victor-s-hometown.png',
    repositoryPath: 'assets/images/content/scenes/reach-badesh-victor-s-hometown.png',
  },
  {
    id: 'scenes-the-party-is-arrested-for-reckless-donkey-driving',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-is-arrested-for-reckless-donkey-driving.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-is-arrested-for-reckless-donkey-driving.png',
  },
  {
    id: 'scenes-board-the-boat-to-fairhaven',
    role: 'illustration',
    logicalSource: '/assets/scenes/board-the-boat-to-fairhaven.png',
    repositoryPath: 'assets/images/content/scenes/board-the-boat-to-fairhaven.png',
  },
  {
    id: 'scenes-the-party-takes-celeste-from-a-shore-side-fight',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-takes-celeste-from-a-shore-side-fight.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-takes-celeste-from-a-shore-side-fight.png',
  },
  {
    id: 'scenes-guild-tattoos-pass-for-papers-at-the-gate',
    role: 'illustration',
    logicalSource: '/assets/scenes/guild-tattoos-pass-for-papers-at-the-gate.png',
    repositoryPath: 'assets/images/content/scenes/guild-tattoos-pass-for-papers-at-the-gate.png',
  },
  {
    id: 'scenes-victor-receives-his-guild-tattoo-and-asks-a-favor',
    role: 'illustration',
    logicalSource: '/assets/scenes/victor-receives-his-guild-tattoo-and-asks-a-favor.png',
    repositoryPath:
      'assets/images/content/scenes/victor-receives-his-guild-tattoo-and-asks-a-favor.png',
  },
  {
    id: 'scenes-meet-the-lucky-palm-at-the-fairhaven-guildhall',
    role: 'illustration',
    logicalSource: '/assets/scenes/meet-the-lucky-palm-at-the-fairhaven-guildhall.png',
    repositoryPath:
      'assets/images/content/scenes/meet-the-lucky-palm-at-the-fairhaven-guildhall.png',
  },
  {
    id: 'scenes-consult-the-fairhaven-guildhall-quest-board',
    role: 'illustration',
    logicalSource: '/assets/scenes/consult-the-fairhaven-guildhall-quest-board.png',
    repositoryPath: 'assets/images/content/scenes/consult-the-fairhaven-guildhall-quest-board.png',
  },
  {
    id: 'scenes-giggles-hires-the-party-against-a-rival-alchemist',
    role: 'illustration',
    logicalSource: '/assets/scenes/giggles-hires-the-party-against-a-rival-alchemist.png',
    repositoryPath:
      'assets/images/content/scenes/giggles-hires-the-party-against-a-rival-alchemist.png',
  },
  {
    id: 'scenes-penelope-shows-the-party-her-original-recipes',
    role: 'illustration',
    logicalSource: '/assets/scenes/penelope-shows-the-party-her-original-recipes.png',
    repositoryPath:
      'assets/images/content/scenes/penelope-shows-the-party-her-original-recipes.png',
  },
  {
    id: 'scenes-green-cloaked-shadows-lead-to-a-gambling-den',
    role: 'illustration',
    logicalSource: '/assets/scenes/green-cloaked-shadows-lead-to-a-gambling-den.png',
    repositoryPath: 'assets/images/content/scenes/green-cloaked-shadows-lead-to-a-gambling-den.png',
  },
  {
    id: 'scenes-devan-drinks-with-borris-and-receives-the-endless-flask',
    role: 'illustration',
    logicalSource: '/assets/scenes/devan-drinks-with-borris-and-receives-the-endless-flask.png',
    repositoryPath:
      'assets/images/content/scenes/devan-drinks-with-borris-and-receives-the-endless-flask.png',
  },
  {
    id: 'scenes-jim-wakes-william-with-light-s-unidentified-drops',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-wakes-william-with-light-s-unidentified-drops.png',
    repositoryPath:
      'assets/images/content/scenes/jim-wakes-william-with-light-s-unidentified-drops.png',
  },
  {
    id: 'scenes-the-party-breaks-into-mortimer-s-shop',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-breaks-into-mortimer-s-shop.png',
    repositoryPath: 'assets/images/content/scenes/the-party-breaks-into-mortimer-s-shop.png',
  },
  {
    id: 'scenes-the-party-escapes-mortimer-s-chimera-and-time-bomb',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-escapes-mortimer-s-chimera-and-time-bomb.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-escapes-mortimer-s-chimera-and-time-bomb.png',
  },
  {
    id: 'scenes-mortimer-s-shop-explodes-and-the-party-is-arrested',
    role: 'illustration',
    logicalSource: '/assets/scenes/mortimer-s-shop-explodes-and-the-party-is-arrested.png',
    repositoryPath:
      'assets/images/content/scenes/mortimer-s-shop-explodes-and-the-party-is-arrested.png',
  },
  {
    id: 'scenes-jim-tells-the-truth-at-the-court-hearing',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-tells-the-truth-at-the-court-hearing.png',
    repositoryPath: 'assets/images/content/scenes/jim-tells-the-truth-at-the-court-hearing.png',
  },
  {
    id: 'scenes-swift-tames-a-demon-possessed-flying-broom',
    role: 'illustration',
    logicalSource: '/assets/scenes/swift-tames-a-demon-possessed-flying-broom.png',
    repositoryPath: 'assets/images/content/scenes/swift-tames-a-demon-possessed-flying-broom.png',
  },
  {
    id: 'scenes-swift-disrupts-the-festival-of-the-heroes-announcement',
    role: 'illustration',
    logicalSource: '/assets/scenes/swift-disrupts-the-festival-of-the-heroes-announcement.png',
    repositoryPath:
      'assets/images/content/scenes/swift-disrupts-the-festival-of-the-heroes-announcement.png',
  },
  {
    id: 'scenes-swift-refuses-the-demon-broom-for-100-gp',
    role: 'illustration',
    logicalSource: '/assets/scenes/swift-refuses-the-demon-broom-for-100-gp.png',
    repositoryPath: 'assets/images/content/scenes/swift-refuses-the-demon-broom-for-100-gp.png',
  },
  {
    id: 'scenes-fix-joins-lucky-palm-and-the-guild-under-a-fake-tattoo',
    role: 'illustration',
    logicalSource: '/assets/scenes/fix-joins-lucky-palm-and-the-guild-under-a-fake-tattoo.png',
    repositoryPath:
      'assets/images/content/scenes/fix-joins-lucky-palm-and-the-guild-under-a-fake-tattoo.png',
  },
  {
    id: 'scenes-devan-drunkenly-reveals-jim-s-name-to-fix',
    role: 'illustration',
    logicalSource: '/assets/scenes/devan-drunkenly-reveals-jim-s-name-to-fix.png',
    repositoryPath: 'assets/images/content/scenes/devan-drunkenly-reveals-jim-s-name-to-fix.png',
  },
  {
    id: 'scenes-monster-summoning-wizards-destroy-fairhaven',
    role: 'illustration',
    logicalSource: '/assets/scenes/monster-summoning-wizards-destroy-fairhaven.png',
    repositoryPath: 'assets/images/content/scenes/monster-summoning-wizards-destroy-fairhaven.png',
  },
  {
    id: 'scenes-swift-frees-and-steals-the-demon-broom',
    role: 'illustration',
    logicalSource: '/assets/scenes/swift-frees-and-steals-the-demon-broom.png',
    repositoryPath: 'assets/images/content/scenes/swift-frees-and-steals-the-demon-broom.png',
  },
  {
    id: 'scenes-jim-and-victor-rescue-abraham-from-the-guildhall-stables',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-and-victor-rescue-abraham-from-the-guildhall-stables.png',
    repositoryPath:
      'assets/images/content/scenes/jim-and-victor-rescue-abraham-from-the-guildhall-stables.png',
  },
  {
    id: 'scenes-the-party-evacuates-civilians-aboard-the-third-ship',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-evacuates-civilians-aboard-the-third-ship.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-evacuates-civilians-aboard-the-third-ship.png',
  },
  {
    id: 'scenes-three-adventurers-win-a-cage-fight-to-the-death',
    role: 'illustration',
    logicalSource: '/assets/scenes/three-adventurers-win-a-cage-fight-to-the-death.png',
    repositoryPath:
      'assets/images/content/scenes/three-adventurers-win-a-cage-fight-to-the-death.png',
  },
  {
    id: 'scenes-the-survivors-sail-for-verdant-haven',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-survivors-sail-for-verdant-haven.png',
    repositoryPath: 'assets/images/content/scenes/the-survivors-sail-for-verdant-haven.png',
  },
  {
    id: 'scenes-picking-up-swift-at-nimbus',
    role: 'illustration',
    logicalSource: '/assets/scenes/picking-up-swift-at-nimbus.png',
    repositoryPath: 'assets/images/content/scenes/picking-up-swift-at-nimbus.png',
  },
  {
    id: 'scenes-the-party-reunites-on-the-docks',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-reunites-on-the-docks.png',
    repositoryPath: 'assets/images/content/scenes/the-party-reunites-on-the-docks.png',
  },
  {
    id: 'scenes-garran-comes-for-the-cruiser',
    role: 'illustration',
    logicalSource: '/assets/scenes/garran-comes-for-the-cruiser.png',
    repositoryPath: 'assets/images/content/scenes/garran-comes-for-the-cruiser.png',
  },
  {
    id: 'pcs-fix-portrait',
    role: 'avatar',
    logicalSource: '/assets/pcs/fix-portrait.png',
    repositoryPath: 'assets/images/content/pcs/fix-portrait.png',
  },
  {
    id: 'npcs-korrag-stonevow-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/korrag-stonevow-portrait.png',
    repositoryPath: 'assets/images/content/npcs/korrag-stonevow-portrait.png',
  },
  {
    id: 'npcs-ilsa-corrow-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/ilsa-corrow-portrait.png',
    repositoryPath: 'assets/images/content/npcs/ilsa-corrow-portrait.png',
  },
  {
    id: 'npcs-dust-lost-sailor-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/dust-lost-sailor-portrait.png',
    repositoryPath: 'assets/images/content/npcs/dust-lost-sailor-portrait.png',
  },
  {
    id: 'scenes-running-from-the-battle-cruiser',
    role: 'illustration',
    logicalSource: '/assets/scenes/running-from-the-battle-cruiser.png',
    repositoryPath: 'assets/images/content/scenes/running-from-the-battle-cruiser.png',
  },
  {
    id: 'scenes-boarding-ride-the-lightning',
    role: 'illustration',
    logicalSource: '/assets/scenes/boarding-ride-the-lightning.png',
    repositoryPath: 'assets/images/content/scenes/boarding-ride-the-lightning.png',
  },
  {
    id: 'location-illustration-nimbus-harbour-ferry-quay',
    role: 'illustration',
    logicalSource: '/assets/locations/nimbus-harbour-ferry-quay-illustration.png',
    repositoryPath: 'assets/images/content/locations/nimbus-harbour-ferry-quay-illustration.png',
  },
  {
    id: 'location-illustration-sky-bridge-ferry',
    role: 'illustration',
    logicalSource: '/assets/locations/sky-bridge-ferry-illustration.png',
    repositoryPath: 'assets/images/content/locations/sky-bridge-ferry-illustration.png',
  },
  {
    id: 'location-illustration-beasts-and-dwarf-s-airship-decks',
    role: 'illustration',
    logicalSource: '/assets/locations/beasts-and-dwarf-s-airship-decks-illustration.png',
    repositoryPath:
      'assets/images/content/locations/beasts-and-dwarf-s-airship-decks-illustration.png',
  },
  {
    id: 'location-illustration-skynet-nimbus-crossing',
    role: 'illustration',
    logicalSource: '/assets/locations/skynet-nimbus-crossing-illustration.png',
    repositoryPath: 'assets/images/content/locations/skynet-nimbus-crossing-illustration.png',
  },
  {
    id: 'location-map-skynet-nimbus-crossing',
    role: 'map',
    logicalSource: '/assets/maps/skynet-nimbus-crossing.jpg',
    repositoryPath: 'assets/images/maps/skynet-nimbus-crossing.png',
  },
  {
    id: 'location-illustration-master-of-puppets-commanders-office',
    role: 'illustration',
    logicalSource: '/assets/locations/master-of-puppets-commanders-office-illustration.png',
    repositoryPath:
      'assets/images/content/locations/master-of-puppets-commanders-office-illustration.png',
  },
  {
    id: 'location-map-master-of-puppets-commanders-office',
    role: 'map',
    logicalSource: '/assets/maps/master-of-puppets-commanders-office.jpg',
    repositoryPath: 'assets/images/maps/master-of-puppets-commanders-office.png',
  },
  {
    id: 'location-illustration-master-of-puppets-gun-deck',
    role: 'illustration',
    logicalSource: '/assets/locations/master-of-puppets-gun-deck-illustration.png',
    repositoryPath: 'assets/images/content/locations/master-of-puppets-gun-deck-illustration.png',
  },
  {
    id: 'location-illustration-ride-the-lightning-main-deck',
    role: 'illustration',
    logicalSource: '/assets/locations/ride-the-lightning-main-deck-illustration.png',
    repositoryPath: 'assets/images/content/locations/ride-the-lightning-main-deck-illustration.png',
  },
  {
    id: 'location-illustration-ride-the-lightning-gun-deck',
    role: 'illustration',
    logicalSource: '/assets/locations/ride-the-lightning-gun-deck-illustration.png',
    repositoryPath: 'assets/images/content/locations/ride-the-lightning-gun-deck-illustration.png',
  },
  {
    id: 'location-map-nimbus-sky-bridge-landing',
    role: 'map',
    logicalSource: '/assets/maps/nimbus-sky-bridge-landing.jpg',
    repositoryPath: 'assets/images/maps/nimbus-sky-bridge-landing.png',
  },
  {
    id: 'location-map-skynet-sky-bridge-landing',
    role: 'map',
    logicalSource: '/assets/maps/skynet-sky-bridge-landing.jpg',
    repositoryPath: 'assets/images/maps/skynet-sky-bridge-landing.png',
  },
  {
    id: 'location-illustration-skynet-sky-bridge-landing',
    role: 'illustration',
    logicalSource: '/assets/locations/skynet-sky-bridge-landing-illustration.png',
    repositoryPath: 'assets/images/content/locations/skynet-sky-bridge-landing-illustration.png',
  },
  {
    id: 'location-map-night-mothers-church',
    role: 'map',
    logicalSource: '/assets/maps/night-mothers-church.jpg',
    repositoryPath: 'assets/images/maps/night-mothers-church.png',
  },
  {
    id: 'location-illustration-night-mothers-church',
    role: 'illustration',
    logicalSource: '/assets/locations/night-mothers-church-illustration.png',
    repositoryPath: 'assets/images/content/locations/night-mothers-church-illustration.png',
  },
  {
    id: 'location-map-temple-of-the-watchers',
    role: 'map',
    logicalSource: '/assets/maps/temple-of-the-watchers.jpg',
    repositoryPath: 'assets/images/maps/temple-of-the-watchers.png',
  },
  {
    id: 'location-illustration-temple-of-the-watchers',
    role: 'illustration',
    logicalSource: '/assets/locations/temple-of-the-watchers-illustration.png',
    repositoryPath: 'assets/images/content/locations/temple-of-the-watchers-illustration.png',
  },
  {
    id: 'location-map-ride-the-lightning-main-deck',
    role: 'map',
    logicalSource: '/assets/maps/ride-the-lightning-main-deck.jpg',
    repositoryPath: 'assets/images/maps/ride-the-lightning-main-deck.png',
  },
  {
    id: 'location-map-master-of-puppets-main-deck',
    role: 'map',
    logicalSource: '/assets/maps/master-of-puppets-main-deck.jpg',
    repositoryPath: 'assets/images/maps/master-of-puppets-main-deck.png',
  },
  {
    id: 'location-map-ride-the-lightning-gun-deck',
    role: 'map',
    logicalSource: '/assets/maps/ride-the-lightning-gun-deck.jpg',
    repositoryPath: 'assets/images/maps/ride-the-lightning-gun-deck.png',
  },
  {
    id: 'location-map-master-of-puppets-gun-deck',
    role: 'map',
    logicalSource: '/assets/maps/master-of-puppets-gun-deck.jpg',
    repositoryPath: 'assets/images/maps/master-of-puppets-gun-deck.png',
  },
  {
    id: 'location-map-sky-bridge-ferry',
    role: 'map',
    logicalSource: '/assets/maps/sky-bridge-ferry.jpg',
    repositoryPath: 'assets/images/maps/sky-bridge-ferry.png',
  },
  {
    id: 'location-map-beasts-and-dwarf-s-airship',
    role: 'map',
    logicalSource: '/assets/maps/beasts-and-dwarf-s-airship.jpg',
    repositoryPath: 'assets/images/maps/beasts-and-dwarf-s-airship.png',
  },
  {
    id: 'location-map-borris-s-gambling-den',
    role: 'map',
    logicalSource: '/assets/maps/borris-s-gambling-den.jpg',
    repositoryPath: 'assets/images/maps/borris-s-gambling-den.png',
  },
  {
    id: 'location-map-nimbus-harbour-ferry-quay',
    role: 'map',
    logicalSource: '/assets/maps/nimbus-harbour-ferry-quay.jpg',
    repositoryPath: 'assets/images/maps/nimbus-harbour-ferry-quay.png',
  },
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
    id: 'location-map-nimbus-harbour',
    role: 'map',
    logicalSource: '/assets/maps/nimbus-harbour.jpg',
    repositoryPath: 'assets/images/maps/nimbus-harbour.png',
  },
  {
    id: 'location-map-skynet',
    role: 'map',
    logicalSource: '/assets/maps/skynet.jpg',
    repositoryPath: 'assets/images/maps/skynet.png',
  },
  {
    id: 'location-map-skynet-airship-shipyard',
    role: 'map',
    logicalSource: '/assets/maps/skynet-airship-shipyard.jpg',
    repositoryPath: 'assets/images/maps/skynet-airship-shipyard.png',
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
    id: 'location-map-onana-tempest-s-estate',
    role: 'map',
    logicalSource: '/assets/maps/onana-tempest-s-estate.jpg',
    repositoryPath: 'assets/images/maps/onana-tempest-s-estate.png',
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
    repositoryPath: 'assets/images/maps/skynet-s-second-best-inn-and-stables.png',
  },
  {
    id: 'location-map-dining-room-at-skynet-s-second-best-inn',
    role: 'map',
    logicalSource: '/assets/maps/dining-room-at-skynet-s-second-best-inn.jpg',
    repositoryPath: 'assets/images/maps/dining-room-at-skynet-s-second-best-inn.png',
  },
  {
    id: 'location-map-stables-at-skynet-s-second-best-inn',
    role: 'map',
    logicalSource: '/assets/maps/stables-at-skynet-s-second-best-inn.jpg',
    repositoryPath: 'assets/images/maps/stables-at-skynet-s-second-best-inn.png',
  },
  {
    id: 'location-map-swift-s-room-at-skynet-s-second-best-inn',
    role: 'map',
    logicalSource: '/assets/maps/swift-s-room-at-skynet-s-second-best-inn.jpg',
    repositoryPath: 'assets/images/maps/swift-s-room-at-skynet-s-second-best-inn.png',
  },
  {
    id: 'location-illustration-bessy-s-nimbus-stall',
    role: 'illustration',
    logicalSource: '/assets/locations/bessy-s-nimbus-stall-illustration.png',
    repositoryPath: 'assets/images/content/locations/bessy-s-nimbus-stall-illustration.png',
  },
  {
    id: 'location-illustration-borris-s-gambling-den',
    role: 'illustration',
    logicalSource: '/assets/locations/borris-s-gambling-den-illustration.png',
    repositoryPath: 'assets/images/content/locations/borris-s-gambling-den-illustration.png',
  },
  {
    id: 'location-illustration-dining-room-at-skynet-s-second-best-inn',
    role: 'illustration',
    logicalSource: '/assets/locations/dining-room-at-skynet-s-second-best-inn-illustration.png',
    repositoryPath:
      'assets/images/content/locations/dining-room-at-skynet-s-second-best-inn-illustration.png',
  },
  {
    id: 'location-illustration-nimbus-harbour',
    role: 'illustration',
    logicalSource: '/assets/locations/nimbus-harbour-illustration.png',
    repositoryPath: 'assets/images/content/locations/nimbus-harbour-illustration.png',
  },
  {
    id: 'location-illustration-nimbus-market',
    role: 'illustration',
    logicalSource: '/assets/locations/nimbus-market-illustration.png',
    repositoryPath: 'assets/images/content/locations/nimbus-market-illustration.png',
  },
  {
    id: 'location-illustration-onana-tempest-s-estate',
    role: 'illustration',
    logicalSource: '/assets/locations/onana-tempest-s-estate-illustration.png',
    repositoryPath: 'assets/images/content/locations/onana-tempest-s-estate-illustration.png',
  },
  {
    id: 'location-illustration-skynet-airship-shipyard',
    role: 'illustration',
    logicalSource: '/assets/locations/skynet-airship-shipyard-illustration.png',
    repositoryPath: 'assets/images/content/locations/skynet-airship-shipyard-illustration.png',
  },
  {
    id: 'location-illustration-skynet-coin-dealer',
    role: 'illustration',
    logicalSource: '/assets/locations/skynet-coin-dealer-illustration.png',
    repositoryPath: 'assets/images/content/locations/skynet-coin-dealer-illustration.png',
  },
  {
    id: 'location-illustration-skynet-magic-artifact-shop',
    role: 'illustration',
    logicalSource: '/assets/locations/skynet-magic-artifact-shop-illustration.png',
    repositoryPath: 'assets/images/content/locations/skynet-magic-artifact-shop-illustration.png',
  },
  {
    id: 'location-illustration-skynet-market-square',
    role: 'illustration',
    logicalSource: '/assets/locations/skynet-market-square-illustration.png',
    repositoryPath: 'assets/images/content/locations/skynet-market-square-illustration.png',
  },
  {
    id: 'location-illustration-stables-at-skynet-s-second-best-inn',
    role: 'illustration',
    logicalSource: '/assets/locations/stables-at-skynet-s-second-best-inn-illustration.png',
    repositoryPath:
      'assets/images/content/locations/stables-at-skynet-s-second-best-inn-illustration.png',
  },
  {
    id: 'location-illustration-stefanio-s-magic-shop',
    role: 'illustration',
    logicalSource: '/assets/locations/stefanio-s-magic-shop-illustration.png',
    repositoryPath: 'assets/images/content/locations/stefanio-s-magic-shop-illustration.png',
  },
  {
    id: 'location-illustration-swift-s-room-at-skynet-s-second-best-inn',
    role: 'illustration',
    logicalSource: '/assets/locations/swift-s-room-at-skynet-s-second-best-inn-illustration.png',
    repositoryPath:
      'assets/images/content/locations/swift-s-room-at-skynet-s-second-best-inn-illustration.png',
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
    id: 'auren',
    role: 'avatar',
    logicalSource: '/assets/pcs/auren.jpg',
    repositoryPath: 'assets/images/content/pcs/auren.jpg',
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
  {
    id: 'scenes-the-clogged-ferry-landing',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-clogged-ferry-landing.png',
    repositoryPath: 'assets/images/content/scenes/the-clogged-ferry-landing.png',
  },
  {
    id: 'scenes-the-ents-hold-the-shipyard',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-ents-hold-the-shipyard.png',
    repositoryPath: 'assets/images/content/scenes/the-ents-hold-the-shipyard.png',
  },
  {
    id: 'npcs-old-pell-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/old-pell-portrait.png',
    repositoryPath: 'assets/images/content/npcs/old-pell-portrait.png',
  },
  {
    id: 'npcs-hollin-slowbough-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/hollin-slowbough-portrait.png',
    repositoryPath: 'assets/images/content/npcs/hollin-slowbough-portrait.png',
  },
  {
    id: 'npcs-shipyard-ent-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/shipyard-ent-portrait.png',
    repositoryPath: 'assets/images/content/npcs/shipyard-ent-portrait.png',
  },
  {
    id: 'npcs-tempest-soldier-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/tempest-soldier-portrait.png',
    repositoryPath: 'assets/images/content/npcs/tempest-soldier-portrait.png',
  },
  {
    id: 'npcs-onana-tempest-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/onana-tempest-portrait.png',
    repositoryPath: 'assets/images/content/npcs/onana-tempest-portrait.png',
  },
  {
    id: 'locations-nimbus-ferry-worker-portrait',
    role: 'avatar',
    logicalSource: '/assets/locations/nimbus-ferry-worker-portrait.png',
    repositoryPath: 'assets/images/content/locations/nimbus-ferry-worker-portrait.png',
  },
  {
    id: 'scenes-borris-shutters-the-casino',
    role: 'illustration',
    logicalSource: '/assets/scenes/borris-shutters-the-casino.png',
    repositoryPath: 'assets/images/content/scenes/borris-shutters-the-casino.png',
  },
  {
    id: 'scenes-the-hand-comes-for-jim',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-hand-comes-for-jim.png',
    repositoryPath: 'assets/images/content/scenes/the-hand-comes-for-jim.png',
  },
  {
    id: 'scenes-the-green-beam-over-the-sky-islands',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-green-beam-over-the-sky-islands.png',
    repositoryPath: 'assets/images/content/scenes/the-green-beam-over-the-sky-islands.png',
  },
  {
    id: 'scenes-the-green-pulse-over-the-sky-islands',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-green-pulse-over-the-sky-islands.png',
    repositoryPath: 'assets/images/content/scenes/the-green-pulse-over-the-sky-islands.png',
  },
  {
    id: 'npcs-silas-wren-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/silas-wren-portrait.png',
    repositoryPath: 'assets/images/content/npcs/silas-wren-portrait.png',
  },
  {
    id: 'npcs-stefanio-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/stefanio-portrait.png',
    repositoryPath: 'assets/images/content/npcs/stefanio-portrait.png',
  },
  {
    id: 'npcs-cloaked-snatcher-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/cloaked-snatcher-portrait.png',
    repositoryPath: 'assets/images/content/npcs/cloaked-snatcher-portrait.png',
  },
  {
    id: 'npcs-brend-tempest-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/brend-tempest-portrait.png',
    repositoryPath: 'assets/images/content/npcs/brend-tempest-portrait.png',
  },
  {
    id: 'npcs-anton-tempest-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/anton-tempest-portrait.png',
    repositoryPath: 'assets/images/content/npcs/anton-tempest-portrait.png',
  },
  {
    id: 'npcs-tempest-patriarch-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/tempest-patriarch-portrait.png',
    repositoryPath: 'assets/images/content/npcs/tempest-patriarch-portrait.png',
  },
  {
    id: 'npcs-esia-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/esia-portrait.png',
    repositoryPath: 'assets/images/content/npcs/esia-portrait.png',
  },
  {
    id: 'npcs-brodus-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/brodus-portrait.png',
    repositoryPath: 'assets/images/content/npcs/brodus-portrait.png',
  },
  {
    id: 'npcs-barbara-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/barbara-portrait.png',
    repositoryPath: 'assets/images/content/npcs/barbara-portrait.png',
  },
  {
    id: 'npcs-throne-figure-in-jim-s-vision-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/throne-figure-in-jim-s-vision-portrait.png',
    repositoryPath: 'assets/images/content/npcs/throne-figure-in-jim-s-vision-portrait.png',
  },
  {
    id: 'npcs-sarogarth-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/sarogarth-portrait.png',
    repositoryPath: 'assets/images/content/npcs/sarogarth-portrait.png',
  },
  {
    id: 'npcs-sylf-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/sylf-portrait.png',
    repositoryPath: 'assets/images/content/npcs/sylf-portrait.png',
  },
  {
    id: 'npcs-dax-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/dax-portrait.png',
    repositoryPath: 'assets/images/content/npcs/dax-portrait.png',
  },
  {
    id: 'npcs-bernard-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/bernard-portrait.png',
    repositoryPath: 'assets/images/content/npcs/bernard-portrait.png',
  },
  {
    id: 'npcs-bessy-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/bessy-portrait.png',
    repositoryPath: 'assets/images/content/npcs/bessy-portrait.png',
  },
  {
    id: 'npcs-blackbeard-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/blackbeard-portrait.png',
    repositoryPath: 'assets/images/content/npcs/blackbeard-portrait.png',
  },
  {
    id: 'npcs-bob-the-gate-troll-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/bob-the-gate-troll-portrait.png',
    repositoryPath: 'assets/images/content/npcs/bob-the-gate-troll-portrait.png',
  },
  {
    id: 'npcs-borris-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/borris-portrait.png',
    repositoryPath: 'assets/images/content/npcs/borris-portrait.png',
  },
  {
    id: 'npcs-celeste-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/celeste-portrait.png',
    repositoryPath: 'assets/images/content/npcs/celeste-portrait.png',
  },
  {
    id: 'npcs-celeste-s-mother-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/celeste-s-mother-portrait.png',
    repositoryPath: 'assets/images/content/npcs/celeste-s-mother-portrait.png',
  },
  {
    id: 'npcs-dragon-of-the-mountain-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/dragon-of-the-mountain-portrait.png',
    repositoryPath: 'assets/images/content/npcs/dragon-of-the-mountain-portrait.png',
  },
  {
    id: 'npcs-faceless-shadow-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/faceless-shadow-portrait.png',
    repositoryPath: 'assets/images/content/npcs/faceless-shadow-portrait.png',
  },
  {
    id: 'npcs-frog-medicine-man-of-verdant-haven-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/frog-medicine-man-of-verdant-haven-portrait.png',
    repositoryPath: 'assets/images/content/npcs/frog-medicine-man-of-verdant-haven-portrait.png',
  },
  {
    id: 'npcs-giggles-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/giggles-portrait.png',
    repositoryPath: 'assets/images/content/npcs/giggles-portrait.png',
  },
  {
    id: 'npcs-goblin-grass-keepers-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/goblin-grass-keepers-portrait.png',
    repositoryPath: 'assets/images/content/npcs/goblin-grass-keepers-portrait.png',
  },
  {
    id: 'npcs-gridswald-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/gridswald-portrait.png',
    repositoryPath: 'assets/images/content/npcs/gridswald-portrait.png',
  },
  {
    id: 'npcs-mr-bumblefoot-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/mr-bumblefoot-portrait.png',
    repositoryPath: 'assets/images/content/npcs/mr-bumblefoot-portrait.png',
  },
  {
    id: 'npcs-penelope-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/penelope-portrait.png',
    repositoryPath: 'assets/images/content/npcs/penelope-portrait.png',
  },
  {
    id: 'npcs-rare-animal-dealer-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/rare-animal-dealer-portrait.png',
    repositoryPath: 'assets/images/content/npcs/rare-animal-dealer-portrait.png',
  },
  {
    id: 'npcs-roberto-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/roberto-portrait.png',
    repositoryPath: 'assets/images/content/npcs/roberto-portrait.png',
  },
  {
    id: 'npcs-ryan-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/ryan-portrait.png',
    repositoryPath: 'assets/images/content/npcs/ryan-portrait.png',
  },
  {
    id: 'npcs-samantha-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/samantha-portrait.png',
    repositoryPath: 'assets/images/content/npcs/samantha-portrait.png',
  },
  {
    id: 'npcs-swift-starblade-s-younger-sister-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/swift-starblade-s-younger-sister-portrait.png',
    repositoryPath: 'assets/images/content/npcs/swift-starblade-s-younger-sister-portrait.png',
  },
  {
    id: 'npcs-the-12th-marshal-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/the-12th-marshal-portrait.png',
    repositoryPath: 'assets/images/content/npcs/the-12th-marshal-portrait.png',
  },
  {
    id: 'npcs-the-mountain-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/the-mountain-portrait.png',
    repositoryPath: 'assets/images/content/npcs/the-mountain-portrait.png',
  },
  {
    id: 'npcs-verdant-haven-rangers-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/verdant-haven-rangers-portrait.png',
    repositoryPath: 'assets/images/content/npcs/verdant-haven-rangers-portrait.png',
  },
  {
    id: 'npcs-captain-blackthorn-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/captain-blackthorn-portrait.png',
    repositoryPath: 'assets/images/content/npcs/captain-blackthorn-portrait.png',
  },
  {
    id: 'npcs-the-merchant-skipper-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/the-merchant-skipper-portrait.png',
    repositoryPath: 'assets/images/content/npcs/the-merchant-skipper-portrait.png',
  },
  {
    id: 'npcs-rhys-s-parents-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/rhys-s-parents-portrait.png',
    repositoryPath: 'assets/images/content/npcs/rhys-s-parents-portrait.png',
  },
  {
    id: 'beasts-chimera-portrait',
    role: 'avatar',
    logicalSource: '/assets/beasts/chimera-portrait.png',
    repositoryPath: 'assets/images/content/beasts/chimera-portrait.png',
  },
  {
    id: 'beasts-displacer-beast-portrait',
    role: 'avatar',
    logicalSource: '/assets/beasts/displacer-beast-portrait.png',
    repositoryPath: 'assets/images/content/beasts/displacer-beast-portrait.png',
  },
  {
    id: 'beasts-dragon-children-portrait',
    role: 'avatar',
    logicalSource: '/assets/beasts/dragon-children-portrait.png',
    repositoryPath: 'assets/images/content/beasts/dragon-children-portrait.png',
  },
  {
    id: 'beasts-ent-guardians-portrait',
    role: 'avatar',
    logicalSource: '/assets/beasts/ent-guardians-portrait.png',
    repositoryPath: 'assets/images/content/beasts/ent-guardians-portrait.png',
  },
  {
    id: 'beasts-giant-spider-portrait',
    role: 'avatar',
    logicalSource: '/assets/beasts/giant-spider-portrait.png',
    repositoryPath: 'assets/images/content/beasts/giant-spider-portrait.png',
  },
  {
    id: 'beasts-mimic-chest-portrait',
    role: 'avatar',
    logicalSource: '/assets/beasts/mimic-chest-portrait.png',
    repositoryPath: 'assets/images/content/beasts/mimic-chest-portrait.png',
  },
  {
    id: 'beasts-phoenix-chick-portrait',
    role: 'avatar',
    logicalSource: '/assets/beasts/phoenix-chick-portrait.png',
    repositoryPath: 'assets/images/content/beasts/phoenix-chick-portrait.png',
  },
  {
    id: 'beasts-serpent-eclipse-lake-serpent-portrait',
    role: 'avatar',
    logicalSource: '/assets/beasts/serpent-eclipse-lake-serpent-portrait.png',
    repositoryPath: 'assets/images/content/beasts/serpent-eclipse-lake-serpent-portrait.png',
  },
  {
    id: 'beasts-captain-squawk-portrait',
    role: 'avatar',
    logicalSource: '/assets/beasts/captain-squawk-portrait.png',
    repositoryPath: 'assets/images/content/beasts/captain-squawk-portrait.png',
  },
  {
    id: 'beasts-sir-fabulous-portrait',
    role: 'avatar',
    logicalSource: '/assets/beasts/sir-fabulous-portrait.png',
    repositoryPath: 'assets/images/content/beasts/sir-fabulous-portrait.png',
  },
  {
    id: 'beasts-sir-fabulous-divine-steed-portrait',
    role: 'avatar',
    logicalSource: '/assets/beasts/sir-fabulous-divine-steed-portrait.png',
    repositoryPath: 'assets/images/content/beasts/sir-fabulous-divine-steed-portrait.png',
  },
  {
    id: 'npcs-captain-garran-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/captain-garran-portrait.png',
    repositoryPath: 'assets/images/content/npcs/captain-garran-portrait.png',
  },
  {
    id: 'npcs-corwin-hale-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/corwin-hale-portrait.png',
    repositoryPath: 'assets/images/content/npcs/corwin-hale-portrait.png',
  },
  {
    id: 'npcs-maren-of-fairhaven-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/maren-of-fairhaven-portrait.png',
    repositoryPath: 'assets/images/content/npcs/maren-of-fairhaven-portrait.png',
  },
  {
    id: 'npcs-sergeant-bruna-kell-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/sergeant-bruna-kell-portrait.png',
    repositoryPath: 'assets/images/content/npcs/sergeant-bruna-kell-portrait.png',
  },
  {
    id: 'scenes-boarded-by-the-battle-cruiser',
    role: 'illustration',
    logicalSource: '/assets/scenes/boarded-by-the-battle-cruiser.png',
    repositoryPath: 'assets/images/content/scenes/boarded-by-the-battle-cruiser.png',
  },
  {
    id: 'scenes-onana-calls-the-party-to-war',
    role: 'illustration',
    logicalSource: '/assets/scenes/onana-calls-the-party-to-war.png',
    repositoryPath: 'assets/images/content/scenes/onana-calls-the-party-to-war.png',
  },
  {
    id: 'scenes-taking-back-a-battle-cruiser',
    role: 'illustration',
    logicalSource: '/assets/scenes/taking-back-a-battle-cruiser.png',
    repositoryPath: 'assets/images/content/scenes/taking-back-a-battle-cruiser.png',
  },
  {
    id: 'npcs-the-fiddler-s-knight-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/the-fiddler-s-knight-portrait.png',
    repositoryPath: 'assets/images/content/npcs/the-fiddler-s-knight-portrait.png',
  },
  {
    id: 'npcs-charles-tempest-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/charles-tempest-portrait.png',
    repositoryPath: 'assets/images/content/npcs/charles-tempest-portrait.png',
  },
  {
    id: 'npcs-celeste-tempest-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/celeste-tempest-portrait.png',
    repositoryPath: 'assets/images/content/npcs/celeste-tempest-portrait.png',
  },
  {
    id: 'npcs-selene-tempest-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/selene-tempest-portrait.png',
    repositoryPath: 'assets/images/content/npcs/selene-tempest-portrait.png',
  },
  {
    id: 'npcs-rudolf-tempest-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/rudolf-tempest-portrait.png',
    repositoryPath: 'assets/images/content/npcs/rudolf-tempest-portrait.png',
  },
  {
    id: 'npcs-skynet-gang-leader-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/skynet-gang-leader-portrait.png',
    repositoryPath: 'assets/images/content/npcs/skynet-gang-leader-portrait.png',
  },
  {
    id: 'npcs-bart-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/bart-portrait.png',
    repositoryPath: 'assets/images/content/npcs/bart-portrait.png',
  },
  {
    id: 'npcs-abraham-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/abraham-portrait.png',
    repositoryPath: 'assets/images/content/npcs/abraham-portrait.png',
  },
  {
    id: 'npcs-alberto-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/alberto-portrait.png',
    repositoryPath: 'assets/images/content/npcs/alberto-portrait.png',
  },
  {
    id: 'npcs-misha-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/misha-portrait.png',
    repositoryPath: 'assets/images/content/npcs/misha-portrait.png',
  },
  {
    id: 'npcs-bob-the-merchant-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/bob-the-merchant-portrait.png',
    repositoryPath: 'assets/images/content/npcs/bob-the-merchant-portrait.png',
  },
  {
    id: 'npcs-crowy-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/crowy-portrait.png',
    repositoryPath: 'assets/images/content/npcs/crowy-portrait.png',
  },
  {
    id: 'npcs-gruumsh-high-priest-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/gruumsh-high-priest-portrait.png',
    repositoryPath: 'assets/images/content/npcs/gruumsh-high-priest-portrait.png',
  },
  {
    id: 'npcs-hex-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/hex-portrait.png',
    repositoryPath: 'assets/images/content/npcs/hex-portrait.png',
  },
  {
    id: 'npcs-knukkles-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/knukkles-portrait.png',
    repositoryPath: 'assets/images/content/npcs/knukkles-portrait.png',
  },
  {
    id: 'npcs-lord-malachar-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/lord-malachar-portrait.png',
    repositoryPath: 'assets/images/content/npcs/lord-malachar-portrait.png',
  },
  {
    id: 'npcs-madame-esmeralda-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/madame-esmeralda-portrait.png',
    repositoryPath: 'assets/images/content/npcs/madame-esmeralda-portrait.png',
  },
  {
    id: 'npcs-mayor-of-fairhaven-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/mayor-of-fairhaven-portrait.png',
    repositoryPath: 'assets/images/content/npcs/mayor-of-fairhaven-portrait.png',
  },
  {
    id: 'npcs-mortimer-mafioso-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/mortimer-mafioso-portrait.png',
    repositoryPath: 'assets/images/content/npcs/mortimer-mafioso-portrait.png',
  },
  {
    id: 'npcs-sneeve-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/sneeve-portrait.png',
    repositoryPath: 'assets/images/content/npcs/sneeve-portrait.png',
  },
  {
    id: 'npcs-sylvia-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/sylvia-portrait.png',
    repositoryPath: 'assets/images/content/npcs/sylvia-portrait.png',
  },
  {
    id: 'npcs-sylvia-s-brother-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/sylvia-s-brother-portrait.png',
    repositoryPath: 'assets/images/content/npcs/sylvia-s-brother-portrait.png',
  },
  {
    id: 'npcs-sering-ravenwood-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/sering-ravenwood-portrait.png',
    repositoryPath: 'assets/images/content/npcs/sering-ravenwood-portrait.png',
  },
  {
    id: 'npcs-the-father-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/the-father-portrait.png',
    repositoryPath: 'assets/images/content/npcs/the-father-portrait.png',
  },
  {
    id: 'npcs-the-fiddler-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/the-fiddler-portrait.png',
    repositoryPath: 'assets/images/content/npcs/the-fiddler-portrait.png',
  },
  {
    id: 'npcs-light-13th-marshal-portrait',
    role: 'avatar',
    logicalSource: '/assets/npcs/light-13th-marshal-portrait.png',
    repositoryPath: 'assets/images/content/npcs/light-13th-marshal-portrait.png',
  },
  {
    id: 'beasts-wolfie-upright',
    role: 'avatar',
    logicalSource: '/assets/beasts/wolfie-upright.png',
    repositoryPath: 'assets/images/content/beasts/wolfie-upright.png',
  },
  {
    id: 'handout-book-of-gruumsh-page-4',
    role: 'illustration',
    logicalSource: '/assets/handouts/book-of-gruumsh-page-4.jpg',
    repositoryPath: 'assets/images/handouts/book-of-gruumsh-page-4.png',
  },
  {
    id: 'novel-adventurers-guild-tattoo',
    role: 'illustration',
    logicalSource: '/assets/novel/adventurers-guild-tattoo.png',
    repositoryPath: 'assets/images/content/novel/adventurers-guild-tattoo.png',
  },
  {
    id: 'scenes-verdant-haven-houses-the-fairhaven-survivors',
    role: 'illustration',
    logicalSource: '/assets/scenes/verdant-haven-houses-the-fairhaven-survivors.png',
    repositoryPath: 'assets/images/content/scenes/verdant-haven-houses-the-fairhaven-survivors.png',
  },
  {
    id: 'scenes-the-party-rescues-roberto-from-a-faceless-shadow',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-rescues-roberto-from-a-faceless-shadow.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-rescues-roberto-from-a-faceless-shadow.png',
  },
  {
    id: 'scenes-the-cursed-sword-decays-verdant-haven-forest',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-cursed-sword-decays-verdant-haven-forest.png',
    repositoryPath: 'assets/images/content/scenes/the-cursed-sword-decays-verdant-haven-forest.png',
  },
  {
    id: 'scenes-the-cursed-sword-breaks-verdant-haven-s-ward',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-cursed-sword-breaks-verdant-haven-s-ward.png',
    repositoryPath: 'assets/images/content/scenes/the-cursed-sword-breaks-verdant-haven-s-ward.png',
  },
  {
    id: 'scenes-roberto-s-maps-reveal-the-father-s-order-to-find-jim-alive',
    role: 'illustration',
    logicalSource: '/assets/scenes/roberto-s-maps-reveal-the-father-s-order-to-find-jim-alive.png',
    repositoryPath:
      'assets/images/content/scenes/roberto-s-maps-reveal-the-father-s-order-to-find-jim-alive.png',
  },
  {
    id: 'scenes-devan-interrogates-and-kills-roberto',
    role: 'illustration',
    logicalSource: '/assets/scenes/devan-interrogates-and-kills-roberto.png',
    repositoryPath: 'assets/images/content/scenes/devan-interrogates-and-kills-roberto.png',
  },
  {
    id: 'scenes-light-sends-cassian-to-watch-over-the-party',
    role: 'illustration',
    logicalSource: '/assets/scenes/light-sends-cassian-to-watch-over-the-party.png',
    repositoryPath: 'assets/images/content/scenes/light-sends-cassian-to-watch-over-the-party.png',
  },
  {
    id: 'scenes-the-party-sees-fairhaven-s-smoking-crater',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-sees-fairhaven-s-smoking-crater.png',
    repositoryPath: 'assets/images/content/scenes/the-party-sees-fairhaven-s-smoking-crater.png',
  },
  {
    id: 'scenes-the-cursed-sword-s-shadow-nearly-kills-jim',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-cursed-sword-s-shadow-nearly-kills-jim.png',
    repositoryPath: 'assets/images/content/scenes/the-cursed-sword-s-shadow-nearly-kills-jim.png',
  },
  {
    id: 'scenes-the-party-spots-an-unidentified-floating-island',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-spots-an-unidentified-floating-island.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-spots-an-unidentified-floating-island.png',
  },
  {
    id: 'scenes-the-party-meets-worshippers-of-the-12th-marshal',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-meets-worshippers-of-the-12th-marshal.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-meets-worshippers-of-the-12th-marshal.png',
  },
  {
    id: 'scenes-the-party-takes-the-mountain-elevator-down',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-takes-the-mountain-elevator-down.png',
    repositoryPath: 'assets/images/content/scenes/the-party-takes-the-mountain-elevator-down.png',
  },
  {
    id: 'scenes-the-elevator-opens-into-a-slave-mine',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-elevator-opens-into-a-slave-mine.png',
    repositoryPath: 'assets/images/content/scenes/the-elevator-opens-into-a-slave-mine.png',
  },
  {
    id: 'scenes-the-party-encounters-fix-s-potion-delivery',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-encounters-fix-s-potion-delivery.png',
    repositoryPath: 'assets/images/content/scenes/the-party-encounters-fix-s-potion-delivery.png',
  },
  {
    id: 'scenes-borris-welcomes-the-party-and-delivers-crowy',
    role: 'illustration',
    logicalSource: '/assets/scenes/borris-welcomes-the-party-and-delivers-crowy.png',
    repositoryPath: 'assets/images/content/scenes/borris-welcomes-the-party-and-delivers-crowy.png',
  },
  {
    id: 'scenes-the-party-examines-crowy-s-contract',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-examines-crowy-s-contract.png',
    repositoryPath: 'assets/images/content/scenes/the-party-examines-crowy-s-contract.png',
  },
  {
    id: 'scenes-fix-delivers-potions-to-lord-malachar',
    role: 'illustration',
    logicalSource: '/assets/scenes/fix-delivers-potions-to-lord-malachar.png',
    repositoryPath: 'assets/images/content/scenes/fix-delivers-potions-to-lord-malachar.png',
  },
  {
    id: 'scenes-two-dire-wolf-pups-are-stolen-from-the-stables',
    role: 'illustration',
    logicalSource: '/assets/scenes/two-dire-wolf-pups-are-stolen-from-the-stables.png',
    repositoryPath:
      'assets/images/content/scenes/two-dire-wolf-pups-are-stolen-from-the-stables.png',
  },
  {
    id: 'scenes-devan-buys-an-enslaved-child-s-freedom',
    role: 'illustration',
    logicalSource: '/assets/scenes/devan-buys-an-enslaved-child-s-freedom.png',
    repositoryPath: 'assets/images/content/scenes/devan-buys-an-enslaved-child-s-freedom.png',
  },
  {
    id: 'scenes-devan-punches-the-foreman-and-starts-a-mine-fight',
    role: 'illustration',
    logicalSource: '/assets/scenes/devan-punches-the-foreman-and-starts-a-mine-fight.png',
    repositoryPath:
      'assets/images/content/scenes/devan-punches-the-foreman-and-starts-a-mine-fight.png',
  },
  {
    id: 'scenes-the-controlling-crystal-is-shattered',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-controlling-crystal-is-shattered.png',
    repositoryPath: 'assets/images/content/scenes/the-controlling-crystal-is-shattered.png',
  },
  {
    id: 'scenes-fix-dies-and-a-shadow-revives-her',
    role: 'illustration',
    logicalSource: '/assets/scenes/fix-dies-and-a-shadow-revives-her.png',
    repositoryPath: 'assets/images/content/scenes/fix-dies-and-a-shadow-revives-her.png',
  },
  {
    id: 'scenes-abraham-s-cart-leads-the-escape',
    role: 'illustration',
    logicalSource: '/assets/scenes/abraham-s-cart-leads-the-escape.png',
    repositoryPath: 'assets/images/content/scenes/abraham-s-cart-leads-the-escape.png',
  },
  {
    id: 'scenes-crowy-directs-the-party-toward-the-feywild',
    role: 'illustration',
    logicalSource: '/assets/scenes/crowy-directs-the-party-toward-the-feywild.png',
    repositoryPath: 'assets/images/content/scenes/crowy-directs-the-party-toward-the-feywild.png',
  },
  {
    id: 'scenes-jim-buys-abraham-and-makes-him-a-promise',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-buys-abraham-and-makes-him-a-promise.png',
    repositoryPath: 'assets/images/content/scenes/jim-buys-abraham-and-makes-him-a-promise.png',
  },
  {
    id: 'scenes-the-party-repairs-the-crater-bridge-beneath-an-approaching-shadow',
    role: 'illustration',
    logicalSource:
      '/assets/scenes/the-party-repairs-the-crater-bridge-beneath-an-approaching-shadow.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-repairs-the-crater-bridge-beneath-an-approaching-shadow.png',
  },
  {
    id: 'scenes-sylvia-offers-the-party-passage-toward-the-feywild',
    role: 'illustration',
    logicalSource: '/assets/scenes/sylvia-offers-the-party-passage-toward-the-feywild.png',
    repositoryPath:
      'assets/images/content/scenes/sylvia-offers-the-party-passage-toward-the-feywild.png',
  },
  {
    id: 'scenes-the-party-boards-the-flying-whale',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-boards-the-flying-whale.png',
    repositoryPath: 'assets/images/content/scenes/the-party-boards-the-flying-whale.png',
  },
  {
    id: 'scenes-the-party-reunites-with-bob-the-merchant',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-reunites-with-bob-the-merchant.png',
    repositoryPath: 'assets/images/content/scenes/the-party-reunites-with-bob-the-merchant.png',
  },
  {
    id: 'scenes-bob-s-bargains-change-wolfie-and-bind-jim-to-a-contract',
    role: 'illustration',
    logicalSource: '/assets/scenes/bob-s-bargains-change-wolfie-and-bind-jim-to-a-contract.png',
    repositoryPath:
      'assets/images/content/scenes/bob-s-bargains-change-wolfie-and-bind-jim-to-a-contract.png',
  },
  {
    id: 'scenes-the-party-reunites-with-bessy-and-trades-equipment',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-reunites-with-bessy-and-trades-equipment.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-reunites-with-bessy-and-trades-equipment.png',
  },
  {
    id: 'scenes-alberto-warns-swift-against-returning-to-the-sea',
    role: 'illustration',
    logicalSource: '/assets/scenes/alberto-warns-swift-against-returning-to-the-sea.png',
    repositoryPath:
      'assets/images/content/scenes/alberto-warns-swift-against-returning-to-the-sea.png',
  },
  {
    id: 'scenes-sylvia-reveals-the-starblade-family-s-bloody-history',
    role: 'illustration',
    logicalSource: '/assets/scenes/sylvia-reveals-the-starblade-family-s-bloody-history.png',
    repositoryPath:
      'assets/images/content/scenes/sylvia-reveals-the-starblade-family-s-bloody-history.png',
  },
  {
    id: 'scenes-cassian-ruins-sylvia-s-caviar-and-works-off-the-damage',
    role: 'illustration',
    logicalSource: '/assets/scenes/cassian-ruins-sylvia-s-caviar-and-works-off-the-damage.png',
    repositoryPath:
      'assets/images/content/scenes/cassian-ruins-sylvia-s-caviar-and-works-off-the-damage.png',
  },
  {
    id: 'scenes-steve-awakens-as-a-magical-mace-of-returning',
    role: 'illustration',
    logicalSource: '/assets/scenes/steve-awakens-as-a-magical-mace-of-returning.png',
    repositoryPath: 'assets/images/content/scenes/steve-awakens-as-a-magical-mace-of-returning.png',
  },
  {
    id: 'scenes-jim-poisons-forty-one-guests-and-is-fired-as-ship-s-cook',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-poisons-forty-one-guests-and-is-fired-as-ship-s-cook.png',
    repositoryPath:
      'assets/images/content/scenes/jim-poisons-forty-one-guests-and-is-fired-as-ship-s-cook.png',
  },
  {
    id: 'scenes-the-party-reaches-level-five',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-reaches-level-five.png',
    repositoryPath: 'assets/images/content/scenes/the-party-reaches-level-five.png',
  },
  {
    id: 'scenes-sylvia-sponsors-the-party-s-first-dungeon',
    role: 'illustration',
    logicalSource: '/assets/scenes/sylvia-sponsors-the-party-s-first-dungeon.png',
    repositoryPath: 'assets/images/content/scenes/sylvia-sponsors-the-party-s-first-dungeon.png',
  },
  {
    id: 'scenes-cassian-discovers-his-ring-s-hunger',
    role: 'illustration',
    logicalSource: '/assets/scenes/cassian-discovers-his-ring-s-hunger.png',
    repositoryPath: 'assets/images/content/scenes/cassian-discovers-his-ring-s-hunger.png',
  },
  {
    id: 'scenes-the-party-plays-three-rounds-with-the-fiddler',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-plays-three-rounds-with-the-fiddler.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-plays-three-rounds-with-the-fiddler.png',
  },
  {
    id: 'scenes-the-party-pays-the-fiddler-to-release-cassian',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-pays-the-fiddler-to-release-cassian.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-pays-the-fiddler-to-release-cassian.png',
  },
  {
    id: 'scenes-the-party-finds-cassian-in-the-lower-stables',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-finds-cassian-in-the-lower-stables.png',
    repositoryPath: 'assets/images/content/scenes/the-party-finds-cassian-in-the-lower-stables.png',
  },
  {
    id: 'scenes-cassian-reclaims-his-possessions-from-the-fiddler-s-table',
    role: 'illustration',
    logicalSource: '/assets/scenes/cassian-reclaims-his-possessions-from-the-fiddler-s-table.png',
    repositoryPath:
      'assets/images/content/scenes/cassian-reclaims-his-possessions-from-the-fiddler-s-table.png',
  },
  {
    id: 'scenes-cassian-buys-the-bag-of-holding-from-bob',
    role: 'illustration',
    logicalSource: '/assets/scenes/cassian-buys-the-bag-of-holding-from-bob.png',
    repositoryPath: 'assets/images/content/scenes/cassian-buys-the-bag-of-holding-from-bob.png',
  },
  {
    id: 'scenes-bob-s-skeletal-appearance-triggers-a-final-warning',
    role: 'illustration',
    logicalSource: '/assets/scenes/bob-s-skeletal-appearance-triggers-a-final-warning.png',
    repositoryPath:
      'assets/images/content/scenes/bob-s-skeletal-appearance-triggers-a-final-warning.png',
  },
  {
    id: 'scenes-sir-fabulous-becomes-devan-s-divine-steed',
    role: 'illustration',
    logicalSource: '/assets/scenes/sir-fabulous-becomes-devan-s-divine-steed.png',
    repositoryPath: 'assets/images/content/scenes/sir-fabulous-becomes-devan-s-divine-steed.png',
  },
  {
    id: 'scenes-the-party-arrives-on-nimbus',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-arrives-on-nimbus.png',
    repositoryPath: 'assets/images/content/scenes/the-party-arrives-on-nimbus.png',
  },
  {
    id: 'scenes-the-party-travels-from-nimbus-to-skynet',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-travels-from-nimbus-to-skynet.png',
    repositoryPath: 'assets/images/content/scenes/the-party-travels-from-nimbus-to-skynet.png',
  },
  {
    id: 'scenes-the-party-takes-rooms-sixty-feet-apart',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-takes-rooms-sixty-feet-apart.png',
    repositoryPath: 'assets/images/content/scenes/the-party-takes-rooms-sixty-feet-apart.png',
  },
  {
    id: 'scenes-jim-finds-the-jaded-amulet-in-a-pie',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-finds-the-jaded-amulet-in-a-pie.png',
    repositoryPath: 'assets/images/content/scenes/jim-finds-the-jaded-amulet-in-a-pie.png',
  },
  {
    id: 'scenes-the-eyeless-hand-reveals-it-can-still-find-jim',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-eyeless-hand-reveals-it-can-still-find-jim.png',
    repositoryPath:
      'assets/images/content/scenes/the-eyeless-hand-reveals-it-can-still-find-jim.png',
  },
  {
    id: 'scenes-jim-s-lightning-curse-reveals-his-human-identity',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-s-lightning-curse-reveals-his-human-identity.png',
    repositoryPath:
      'assets/images/content/scenes/jim-s-lightning-curse-reveals-his-human-identity.png',
  },
  {
    id: 'scenes-crowy-becomes-the-bird-of-gluttony',
    role: 'illustration',
    logicalSource: '/assets/scenes/crowy-becomes-the-bird-of-gluttony.png',
    repositoryPath: 'assets/images/content/scenes/crowy-becomes-the-bird-of-gluttony.png',
  },
  {
    id: 'scenes-the-party-prepares-for-its-first-dungeon',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-prepares-for-its-first-dungeon.png',
    repositoryPath: 'assets/images/content/scenes/the-party-prepares-for-its-first-dungeon.png',
  },
  {
    id: 'scenes-the-party-presents-the-dungeon-pass-at-the-serpent-eclipse-entrance',
    role: 'illustration',
    logicalSource:
      '/assets/scenes/the-party-presents-the-dungeon-pass-at-the-serpent-eclipse-entrance.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-presents-the-dungeon-pass-at-the-serpent-eclipse-entrance.png',
  },
  {
    id: 'scenes-the-serpent-eclipse-attendants-brief-the-party',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-serpent-eclipse-attendants-brief-the-party.png',
    repositoryPath:
      'assets/images/content/scenes/the-serpent-eclipse-attendants-brief-the-party.png',
  },
  {
    id: 'scenes-the-party-chooses-the-left-door-at-the-blood-fed-altar',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-chooses-the-left-door-at-the-blood-fed-altar.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-chooses-the-left-door-at-the-blood-fed-altar.png',
  },
  {
    id: 'scenes-the-party-crosses-the-silenced-left-door-passage',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-crosses-the-silenced-left-door-passage.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-crosses-the-silenced-left-door-passage.png',
  },
  {
    id: 'scenes-the-party-survives-the-serpent-eclipse-shadow-arena',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-survives-the-serpent-eclipse-shadow-arena.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-survives-the-serpent-eclipse-shadow-arena.png',
  },
  {
    id: 'scenes-the-dragon-horn-becomes-the-serpent-eclipse-trial-disk',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-dragon-horn-becomes-the-serpent-eclipse-trial-disk.png',
    repositoryPath:
      'assets/images/content/scenes/the-dragon-horn-becomes-the-serpent-eclipse-trial-disk.png',
  },
  {
    id: 'scenes-the-party-returns-to-the-serpent-eclipse-reception-hall',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-returns-to-the-serpent-eclipse-reception-hall.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-returns-to-the-serpent-eclipse-reception-hall.png',
  },
  {
    id: 'scenes-devan-brings-the-party-to-the-gruumsh-war-temple',
    role: 'illustration',
    logicalSource: '/assets/scenes/devan-brings-the-party-to-the-gruumsh-war-temple.png',
    repositoryPath:
      'assets/images/content/scenes/devan-brings-the-party-to-the-gruumsh-war-temple.png',
  },
  {
    id: 'scenes-the-high-priest-removes-cassian-s-curse',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-high-priest-removes-cassian-s-curse.png',
    repositoryPath: 'assets/images/content/scenes/the-high-priest-removes-cassian-s-curse.png',
  },
  {
    id: 'scenes-the-high-priest-frees-jim-from-pain-and-cleanses-the-shadow-sword',
    role: 'illustration',
    logicalSource:
      '/assets/scenes/the-high-priest-frees-jim-from-pain-and-cleanses-the-shadow-sword.png',
    repositoryPath:
      'assets/images/content/scenes/the-high-priest-frees-jim-from-pain-and-cleanses-the-shadow-sword.png',
  },
  {
    id: 'scenes-the-party-feasts-in-the-gruumsh-temple-blood-hall',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-feasts-in-the-gruumsh-temple-blood-hall.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-feasts-in-the-gruumsh-temple-blood-hall.png',
  },
  {
    id: 'scenes-cassian-learns-the-ring-is-turning-him-into-a-werewolf',
    role: 'illustration',
    logicalSource: '/assets/scenes/cassian-learns-the-ring-is-turning-him-into-a-werewolf.png',
    repositoryPath:
      'assets/images/content/scenes/cassian-learns-the-ring-is-turning-him-into-a-werewolf.png',
  },
  {
    id: 'scenes-jim-wakes-to-another-lightning-strike',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-wakes-to-another-lightning-strike.png',
    repositoryPath: 'assets/images/content/scenes/jim-wakes-to-another-lightning-strike.png',
  },
  {
    id: 'scenes-swift-summons-a-rainbow-parrot',
    role: 'illustration',
    logicalSource: '/assets/scenes/swift-summons-a-rainbow-parrot.png',
    repositoryPath: 'assets/images/content/scenes/swift-summons-a-rainbow-parrot.png',
  },
  {
    id: 'scenes-cassian-tests-his-luck-with-cheesecake',
    role: 'illustration',
    logicalSource: '/assets/scenes/cassian-tests-his-luck-with-cheesecake.png',
    repositoryPath: 'assets/images/content/scenes/cassian-tests-his-luck-with-cheesecake.png',
  },
  {
    id: 'scenes-cassian-understands-wolfie',
    role: 'illustration',
    logicalSource: '/assets/scenes/cassian-understands-wolfie.png',
    repositoryPath: 'assets/images/content/scenes/cassian-understands-wolfie.png',
  },
  {
    id: 'scenes-the-party-passes-the-dungeon-memorial',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-passes-the-dungeon-memorial.png',
    repositoryPath: 'assets/images/content/scenes/the-party-passes-the-dungeon-memorial.png',
  },
  {
    id: 'scenes-the-trial-disk-closes-the-first-door',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-trial-disk-closes-the-first-door.png',
    repositoryPath: 'assets/images/content/scenes/the-trial-disk-closes-the-first-door.png',
  },
  {
    id: 'scenes-jim-eats-a-golden-apple-and-cannot-stop',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-eats-a-golden-apple-and-cannot-stop.png',
    repositoryPath: 'assets/images/content/scenes/jim-eats-a-golden-apple-and-cannot-stop.png',
  },
  {
    id: 'scenes-fire-earth-and-wind-open-the-maze-passage',
    role: 'illustration',
    logicalSource: '/assets/scenes/fire-earth-and-wind-open-the-maze-passage.png',
    repositoryPath: 'assets/images/content/scenes/fire-earth-and-wind-open-the-maze-passage.png',
  },
  {
    id: 'scenes-a-safety-rope-saves-swift-when-the-vine-breaks',
    role: 'illustration',
    logicalSource: '/assets/scenes/a-safety-rope-saves-swift-when-the-vine-breaks.png',
    repositoryPath:
      'assets/images/content/scenes/a-safety-rope-saves-swift-when-the-vine-breaks.png',
  },
  {
    id: 'scenes-the-lake-serpent-disrupts-the-crossing',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-lake-serpent-disrupts-the-crossing.png',
    repositoryPath: 'assets/images/content/scenes/the-lake-serpent-disrupts-the-crossing.png',
  },
  {
    id: 'scenes-jim-briefly-incapacitates-the-serpent',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-briefly-incapacitates-the-serpent.png',
    repositoryPath: 'assets/images/content/scenes/jim-briefly-incapacitates-the-serpent.png',
  },
  {
    id: 'scenes-the-birds-help-the-party-escape-the-serpent',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-birds-help-the-party-escape-the-serpent.png',
    repositoryPath: 'assets/images/content/scenes/the-birds-help-the-party-escape-the-serpent.png',
  },
  {
    id: 'scenes-devan-seals-the-serpent-behind-a-rockfall',
    role: 'illustration',
    logicalSource: '/assets/scenes/devan-seals-the-serpent-behind-a-rockfall.png',
    repositoryPath: 'assets/images/content/scenes/devan-seals-the-serpent-behind-a-rockfall.png',
  },
  {
    id: 'scenes-the-party-takes-a-short-rest-beyond-the-serpent-pool',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-takes-a-short-rest-beyond-the-serpent-pool.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-takes-a-short-rest-beyond-the-serpent-pool.png',
  },
  {
    id: 'scenes-the-party-carries-the-sleeping-cassian-in-the-bag-of-holding',
    role: 'illustration',
    logicalSource:
      '/assets/scenes/the-party-carries-the-sleeping-cassian-in-the-bag-of-holding.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-carries-the-sleeping-cassian-in-the-bag-of-holding.png',
  },
  {
    id: 'scenes-the-party-chooses-the-anti-magic-passage',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-chooses-the-anti-magic-passage.png',
    repositoryPath: 'assets/images/content/scenes/the-party-chooses-the-anti-magic-passage.png',
  },
  {
    id: 'scenes-dax-explains-how-the-dungeon-feeds-on-souls',
    role: 'illustration',
    logicalSource: '/assets/scenes/dax-explains-how-the-dungeon-feeds-on-souls.png',
    repositoryPath: 'assets/images/content/scenes/dax-explains-how-the-dungeon-feeds-on-souls.png',
  },
  {
    id: 'scenes-the-party-breaks-the-crystal-and-wakes-sarogarth',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-breaks-the-crystal-and-wakes-sarogarth.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-breaks-the-crystal-and-wakes-sarogarth.png',
  },
  {
    id: 'scenes-jim-survives-the-zodiac-dagger-and-rejects-a-soul-bargain',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-survives-the-zodiac-dagger-and-rejects-a-soul-bargain.png',
    repositoryPath:
      'assets/images/content/scenes/jim-survives-the-zodiac-dagger-and-rejects-a-soul-bargain.png',
  },
  {
    id: 'scenes-sarogarth-opens-a-portal-back-to-the-altar',
    role: 'illustration',
    logicalSource: '/assets/scenes/sarogarth-opens-a-portal-back-to-the-altar.png',
    repositoryPath: 'assets/images/content/scenes/sarogarth-opens-a-portal-back-to-the-altar.png',
  },
  {
    id: 'scenes-the-party-kills-the-dungeon-and-escapes-with-the-green-rod',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-kills-the-dungeon-and-escapes-with-the-green-rod.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-kills-the-dungeon-and-escapes-with-the-green-rod.png',
  },
  {
    id: 'scenes-sarogarth-entrusts-grimgor-relics-to-devan',
    role: 'illustration',
    logicalSource: '/assets/scenes/sarogarth-entrusts-grimgor-relics-to-devan.png',
    repositoryPath: 'assets/images/content/scenes/sarogarth-entrusts-grimgor-relics-to-devan.png',
  },
  {
    id: 'scenes-devan-becomes-a-wandering-priest-and-meets-grimgor',
    role: 'illustration',
    logicalSource: '/assets/scenes/devan-becomes-a-wandering-priest-and-meets-grimgor.png',
    repositoryPath:
      'assets/images/content/scenes/devan-becomes-a-wandering-priest-and-meets-grimgor.png',
  },
  {
    id: 'scenes-the-party-gives-sarogarth-a-room-at-the-inn',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-gives-sarogarth-a-room-at-the-inn.png',
    repositoryPath: 'assets/images/content/scenes/the-party-gives-sarogarth-a-room-at-the-inn.png',
  },
  {
    id: 'scenes-swift-resummons-captain-squawk-after-the-dungeon',
    role: 'illustration',
    logicalSource: '/assets/scenes/swift-resummons-captain-squawk-after-the-dungeon.png',
    repositoryPath:
      'assets/images/content/scenes/swift-resummons-captain-squawk-after-the-dungeon.png',
  },
  {
    id: 'scenes-the-green-rod-protects-jim-from-the-morning-lightning',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-green-rod-protects-jim-from-the-morning-lightning.png',
    repositoryPath:
      'assets/images/content/scenes/the-green-rod-protects-jim-from-the-morning-lightning.png',
  },
  {
    id: 'scenes-sarogarth-corrects-devan-s-holy-text',
    role: 'illustration',
    logicalSource: '/assets/scenes/sarogarth-corrects-devan-s-holy-text.png',
    repositoryPath: 'assets/images/content/scenes/sarogarth-corrects-devan-s-holy-text.png',
  },
  {
    id: 'scenes-jim-retrieves-the-shadow-sword-after-the-temple-departs',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-retrieves-the-shadow-sword-after-the-temple-departs.png',
    repositoryPath:
      'assets/images/content/scenes/jim-retrieves-the-shadow-sword-after-the-temple-departs.png',
  },
  {
    id: 'scenes-the-party-plans-a-crossroads-ritual-for-swift-s-broom',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-plans-a-crossroads-ritual-for-swift-s-broom.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-plans-a-crossroads-ritual-for-swift-s-broom.png',
  },
  {
    id: 'scenes-the-party-prepares-to-travel-to-tempest-with-sarogarth',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-prepares-to-travel-to-tempest-with-sarogarth.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-prepares-to-travel-to-tempest-with-sarogarth.png',
  },
  {
    id: 'scenes-cassian-returns-from-the-bag-of-holding',
    role: 'illustration',
    logicalSource: '/assets/scenes/cassian-returns-from-the-bag-of-holding.png',
    repositoryPath: 'assets/images/content/scenes/cassian-returns-from-the-bag-of-holding.png',
  },
  {
    id: 'scenes-the-broom-ritual-calls-for-the-heart-of-an-innocent',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-broom-ritual-calls-for-the-heart-of-an-innocent.png',
    repositoryPath:
      'assets/images/content/scenes/the-broom-ritual-calls-for-the-heart-of-an-innocent.png',
  },
  {
    id: 'scenes-an-armed-escort-summons-the-party-to-tempest',
    role: 'illustration',
    logicalSource: '/assets/scenes/an-armed-escort-summons-the-party-to-tempest.png',
    repositoryPath: 'assets/images/content/scenes/an-armed-escort-summons-the-party-to-tempest.png',
  },
  {
    id: 'scenes-a-drake-carriage-carries-the-party-to-tempest',
    role: 'illustration',
    logicalSource: '/assets/scenes/a-drake-carriage-carries-the-party-to-tempest.png',
    repositoryPath:
      'assets/images/content/scenes/a-drake-carriage-carries-the-party-to-tempest.png',
  },
  {
    id: 'scenes-the-party-breakfasts-at-onana-tempest-s-estate',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-breakfasts-at-onana-tempest-s-estate.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-breakfasts-at-onana-tempest-s-estate.png',
  },
  {
    id: 'scenes-onana-rewards-the-party-and-forbids-further-dungeon-deaths',
    role: 'illustration',
    logicalSource: '/assets/scenes/onana-rewards-the-party-and-forbids-further-dungeon-deaths.png',
    repositoryPath:
      'assets/images/content/scenes/onana-rewards-the-party-and-forbids-further-dungeon-deaths.png',
  },
  {
    id: 'scenes-onana-offers-cheaper-lodging-and-pays-the-inn-bill',
    role: 'illustration',
    logicalSource: '/assets/scenes/onana-offers-cheaper-lodging-and-pays-the-inn-bill.png',
    repositoryPath:
      'assets/images/content/scenes/onana-offers-cheaper-lodging-and-pays-the-inn-bill.png',
  },
  {
    id: 'scenes-onana-describes-the-tempest-family-and-debt-slavery',
    role: 'illustration',
    logicalSource: '/assets/scenes/onana-describes-the-tempest-family-and-debt-slavery.png',
    repositoryPath:
      'assets/images/content/scenes/onana-describes-the-tempest-family-and-debt-slavery.png',
  },
  {
    id: 'scenes-sarogarth-opens-a-portal-back-to-skynet',
    role: 'illustration',
    logicalSource: '/assets/scenes/sarogarth-opens-a-portal-back-to-skynet.png',
    repositoryPath: 'assets/images/content/scenes/sarogarth-opens-a-portal-back-to-skynet.png',
  },
  {
    id: 'scenes-the-party-helps-sarogarth-sell-an-ancient-coin',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-helps-sarogarth-sell-an-ancient-coin.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-helps-sarogarth-sell-an-ancient-coin.png',
  },
  {
    id: 'scenes-cassian-buys-a-protective-cloak-and-a-spell-storing-ring',
    role: 'illustration',
    logicalSource: '/assets/scenes/cassian-buys-a-protective-cloak-and-a-spell-storing-ring.png',
    repositoryPath:
      'assets/images/content/scenes/cassian-buys-a-protective-cloak-and-a-spell-storing-ring.png',
  },
  {
    id: 'scenes-the-party-connects-the-fiddler-s-questions-to-their-future',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-connects-the-fiddler-s-questions-to-their-future.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-connects-the-fiddler-s-questions-to-their-future.png',
  },
  {
    id: 'scenes-sarogarth-s-tracking-ritual-produces-two-smoke-trails',
    role: 'illustration',
    logicalSource: '/assets/scenes/sarogarth-s-tracking-ritual-produces-two-smoke-trails.png',
    repositoryPath:
      'assets/images/content/scenes/sarogarth-s-tracking-ritual-produces-two-smoke-trails.png',
  },
  {
    id: 'scenes-the-party-commissions-an-airship-for-gold-and-two-favors',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-commissions-an-airship-for-gold-and-two-favors.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-commissions-an-airship-for-gold-and-two-favors.png',
  },
  {
    id: 'scenes-the-shipwright-explains-the-ents-final-voyages',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-shipwright-explains-the-ents-final-voyages.png',
    repositoryPath:
      'assets/images/content/scenes/the-shipwright-explains-the-ents-final-voyages.png',
  },
  {
    id: 'scenes-jim-talks-with-an-old-holly-ent',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-talks-with-an-old-holly-ent.png',
    repositoryPath: 'assets/images/content/scenes/jim-talks-with-an-old-holly-ent.png',
  },
  {
    id: 'scenes-the-shipwright-describes-grievances-against-the-tempests',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-shipwright-describes-grievances-against-the-tempests.png',
    repositoryPath:
      'assets/images/content/scenes/the-shipwright-describes-grievances-against-the-tempests.png',
  },
  {
    id: 'scenes-cassian-proposes-seeking-onana-s-backing',
    role: 'illustration',
    logicalSource: '/assets/scenes/cassian-proposes-seeking-onana-s-backing.png',
    repositoryPath: 'assets/images/content/scenes/cassian-proposes-seeking-onana-s-backing.png',
  },
  {
    id: 'scenes-a-local-gang-describes-the-tempest-siblings',
    role: 'illustration',
    logicalSource: '/assets/scenes/a-local-gang-describes-the-tempest-siblings.png',
    repositoryPath: 'assets/images/content/scenes/a-local-gang-describes-the-tempest-siblings.png',
  },
  {
    id: 'scenes-the-gang-tells-the-party-about-barbara',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-gang-tells-the-party-about-barbara.png',
    repositoryPath: 'assets/images/content/scenes/the-gang-tells-the-party-about-barbara.png',
  },
  {
    id: 'scenes-the-party-follows-the-smoke-back-to-nimbus',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-follows-the-smoke-back-to-nimbus.png',
    repositoryPath: 'assets/images/content/scenes/the-party-follows-the-smoke-back-to-nimbus.png',
  },
  {
    id: 'scenes-borris-welcomes-the-party-to-his-nimbus-casino',
    role: 'illustration',
    logicalSource: '/assets/scenes/borris-welcomes-the-party-to-his-nimbus-casino.png',
    repositoryPath:
      'assets/images/content/scenes/borris-welcomes-the-party-to-his-nimbus-casino.png',
  },
  {
    id: 'scenes-cassian-and-swift-rig-roulette-and-gain-vip-access',
    role: 'illustration',
    logicalSource: '/assets/scenes/cassian-and-swift-rig-roulette-and-gain-vip-access.png',
    repositoryPath:
      'assets/images/content/scenes/cassian-and-swift-rig-roulette-and-gain-vip-access.png',
  },
  {
    id: 'scenes-the-party-stakes-another-game-with-the-fiddler',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-stakes-another-game-with-the-fiddler.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-stakes-another-game-with-the-fiddler.png',
  },
  {
    id: 'scenes-the-first-draws-bring-flight-hunger-whispers-and-a-cloak',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-first-draws-bring-flight-hunger-whispers-and-a-cloak.png',
    repositoryPath:
      'assets/images/content/scenes/the-first-draws-bring-flight-hunger-whispers-and-a-cloak.png',
  },
  {
    id: 'scenes-jim-draws-cage-vessel-and-voidwalker',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-draws-cage-vessel-and-voidwalker.png',
    repositoryPath: 'assets/images/content/scenes/jim-draws-cage-vessel-and-voidwalker.png',
  },
  {
    id: 'scenes-swift-gains-the-mask-card',
    role: 'illustration',
    logicalSource: '/assets/scenes/swift-gains-the-mask-card.png',
    repositoryPath: 'assets/images/content/scenes/swift-gains-the-mask-card.png',
  },
  {
    id: 'scenes-cassian-loses-his-magic-items-and-wins-a-treasure-chest',
    role: 'illustration',
    logicalSource: '/assets/scenes/cassian-loses-his-magic-items-and-wins-a-treasure-chest.png',
    repositoryPath:
      'assets/images/content/scenes/cassian-loses-his-magic-items-and-wins-a-treasure-chest.png',
  },
  {
    id: 'scenes-devan-buys-cassian-a-replacement-bag-for-the-winnings',
    role: 'illustration',
    logicalSource: '/assets/scenes/devan-buys-cassian-a-replacement-bag-for-the-winnings.png',
    repositoryPath:
      'assets/images/content/scenes/devan-buys-cassian-a-replacement-bag-for-the-winnings.png',
  },
  {
    id: 'scenes-sarogarth-draws-permanent-blight-and-loses-an-attunement-slot',
    role: 'illustration',
    logicalSource:
      '/assets/scenes/sarogarth-draws-permanent-blight-and-loses-an-attunement-slot.png',
    repositoryPath:
      'assets/images/content/scenes/sarogarth-draws-permanent-blight-and-loses-an-attunement-slot.png',
  },
  {
    id: 'scenes-the-fiddler-gains-a-knight-and-survives-the-avatar-of-death',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-fiddler-gains-a-knight-and-survives-the-avatar-of-death.png',
    repositoryPath:
      'assets/images/content/scenes/the-fiddler-gains-a-knight-and-survives-the-avatar-of-death.png',
  },
  {
    id: 'scenes-cassian-pays-to-remove-jim-s-confinement-and-lightning-storm',
    role: 'illustration',
    logicalSource:
      '/assets/scenes/cassian-pays-to-remove-jim-s-confinement-and-lightning-storm.png',
    repositoryPath:
      'assets/images/content/scenes/cassian-pays-to-remove-jim-s-confinement-and-lightning-storm.png',
  },
  {
    id: 'scenes-jim-loses-his-amulet-and-sarogarth-loses-sylf',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-loses-his-amulet-and-sarogarth-loses-sylf.png',
    repositoryPath:
      'assets/images/content/scenes/jim-loses-his-amulet-and-sarogarth-loses-sylf.png',
  },
  {
    id: 'scenes-the-fiddler-leaves-more-hints-about-jim-s-future',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-fiddler-leaves-more-hints-about-jim-s-future.png',
    repositoryPath:
      'assets/images/content/scenes/the-fiddler-leaves-more-hints-about-jim-s-future.png',
  },
  {
    id: 'scenes-devan-reports-a-southern-direction-beyond-nimbus',
    role: 'illustration',
    logicalSource: '/assets/scenes/devan-reports-a-southern-direction-beyond-nimbus.png',
    repositoryPath:
      'assets/images/content/scenes/devan-reports-a-southern-direction-beyond-nimbus.png',
  },
  {
    id: 'scenes-stefanio-tests-a-spirit-cannon-on-jim',
    role: 'illustration',
    logicalSource: '/assets/scenes/stefanio-tests-a-spirit-cannon-on-jim.png',
    repositoryPath: 'assets/images/content/scenes/stefanio-tests-a-spirit-cannon-on-jim.png',
  },
  {
    id: 'scenes-cassian-funds-devan-s-new-armour-from-bessy',
    role: 'illustration',
    logicalSource: '/assets/scenes/cassian-funds-devan-s-new-armour-from-bessy.png',
    repositoryPath: 'assets/images/content/scenes/cassian-funds-devan-s-new-armour-from-bessy.png',
  },
  {
    id: 'scenes-cassian-replaces-the-meat-and-buys-ritual-goats',
    role: 'illustration',
    logicalSource: '/assets/scenes/cassian-replaces-the-meat-and-buys-ritual-goats.png',
    repositoryPath:
      'assets/images/content/scenes/cassian-replaces-the-meat-and-buys-ritual-goats.png',
  },
  {
    id: 'scenes-the-second-smoke-trail-points-to-the-flying-fortress-and-the-party-splits',
    role: 'illustration',
    logicalSource:
      '/assets/scenes/the-second-smoke-trail-points-to-the-flying-fortress-and-the-party-splits.png',
    repositoryPath:
      'assets/images/content/scenes/the-second-smoke-trail-points-to-the-flying-fortress-and-the-party-splits.png',
  },
  {
    id: 'scenes-cassian-and-devan-find-wolfie-walking-and-talking',
    role: 'illustration',
    logicalSource: '/assets/scenes/cassian-and-devan-find-wolfie-walking-and-talking.png',
    repositoryPath:
      'assets/images/content/scenes/cassian-and-devan-find-wolfie-walking-and-talking.png',
  },
  {
    id: 'scenes-the-fortress-pulse-breaks-bonds-with-jim-novel',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-fortress-pulse-breaks-bonds-with-jim-novel.png',
    repositoryPath:
      'assets/images/content/scenes/the-fortress-pulse-breaks-bonds-with-jim-novel.png',
  },
  {
    id: 'scenes-silas-offers-swift-a-place-in-the-eyeless-hand',
    role: 'illustration',
    logicalSource: '/assets/scenes/silas-offers-swift-a-place-in-the-eyeless-hand.png',
    repositoryPath:
      'assets/images/content/scenes/silas-offers-swift-a-place-in-the-eyeless-hand.png',
  },
  {
    id: 'scenes-jim-disappears-in-the-second-fortress-beam',
    role: 'illustration',
    logicalSource: '/assets/scenes/jim-disappears-in-the-second-fortress-beam.png',
    repositoryPath: 'assets/images/content/scenes/jim-disappears-in-the-second-fortress-beam.png',
  },
  {
    id: 'scenes-swift-retrieves-jim-s-pages-and-weapons',
    role: 'illustration',
    logicalSource: '/assets/scenes/swift-retrieves-jim-s-pages-and-weapons.png',
    repositoryPath: 'assets/images/content/scenes/swift-retrieves-jim-s-pages-and-weapons.png',
  },
  {
    id: 'scenes-devan-and-cassian-ride-to-the-crowded-ferry-landing-novel',
    role: 'illustration',
    logicalSource: '/assets/scenes/devan-and-cassian-ride-to-the-crowded-ferry-landing-novel.png',
    repositoryPath:
      'assets/images/content/scenes/devan-and-cassian-ride-to-the-crowded-ferry-landing-novel.png',
  },
  {
    id: 'scenes-the-party-reunites-and-helps-rescue-nimbus-residents-novel',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-reunites-and-helps-rescue-nimbus-residents-novel.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-reunites-and-helps-rescue-nimbus-residents-novel.png',
  },
  {
    id: 'scenes-auren-accepts-the-zodiac-dagger',
    role: 'illustration',
    logicalSource: '/assets/scenes/auren-accepts-the-zodiac-dagger.png',
    repositoryPath: 'assets/images/content/scenes/auren-accepts-the-zodiac-dagger.png',
  },
  {
    id: 'scenes-the-party-decodes-jim-s-farewell-and-warning-about-light',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-decodes-jim-s-farewell-and-warning-about-light.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-decodes-jim-s-farewell-and-warning-about-light.png',
  },
  {
    id: 'scenes-auren-explains-how-the-hand-s-records-led-him-to-jim',
    role: 'illustration',
    logicalSource: '/assets/scenes/auren-explains-how-the-hand-s-records-led-him-to-jim.png',
    repositoryPath:
      'assets/images/content/scenes/auren-explains-how-the-hand-s-records-led-him-to-jim.png',
  },
  {
    id: 'scenes-onana-questions-the-party-aboard-master-of-puppets-novel',
    role: 'illustration',
    logicalSource: '/assets/scenes/onana-questions-the-party-aboard-master-of-puppets-novel.png',
    repositoryPath:
      'assets/images/content/scenes/onana-questions-the-party-aboard-master-of-puppets-novel.png',
  },
  {
    id: 'scenes-onana-sends-the-party-to-recover-ride-the-lightning',
    role: 'illustration',
    logicalSource: '/assets/scenes/onana-sends-the-party-to-recover-ride-the-lightning.png',
    repositoryPath:
      'assets/images/content/scenes/onana-sends-the-party-to-recover-ride-the-lightning.png',
  },
  {
    id: 'scenes-the-party-boards-ride-the-lightning-through-two-entry-rooms-novel',
    role: 'illustration',
    logicalSource:
      '/assets/scenes/the-party-boards-ride-the-lightning-through-two-entry-rooms-novel.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-boards-ride-the-lightning-through-two-entry-rooms-novel.png',
  },
  {
    id: 'scenes-the-party-clears-ride-the-lightning-s-boarding-rooms',
    role: 'illustration',
    logicalSource: '/assets/scenes/the-party-clears-ride-the-lightning-s-boarding-rooms.png',
    repositoryPath:
      'assets/images/content/scenes/the-party-clears-ride-the-lightning-s-boarding-rooms.png',
  },
  {
    id: 'location-illustration-the-caves-of-steel',
    role: 'illustration',
    logicalSource: '/assets/locations/the-caves-of-steel-illustration.png',
    repositoryPath: 'assets/images/content/locations/the-caves-of-steel-illustration.png',
  },
  {
    id: 'location-illustration-the-grand-hall',
    role: 'illustration',
    logicalSource: '/assets/locations/the-grand-hall-illustration.png',
    repositoryPath: 'assets/images/content/locations/the-grand-hall-illustration.png',
  },
  {
    id: 'location-illustration-the-abyss',
    role: 'illustration',
    logicalSource: '/assets/locations/the-abyss-illustration.png',
    repositoryPath: 'assets/images/content/locations/the-abyss-illustration.png',
  },
  {
    id: 'location-illustration-the-marshal-s-waters',
    role: 'illustration',
    logicalSource: '/assets/locations/the-marshal-s-waters-illustration.png',
    repositoryPath: 'assets/images/content/locations/the-marshal-s-waters-illustration.png',
  },
  {
    id: 'scenes-a-fleet-on-an-empty-sea',
    role: 'illustration',
    logicalSource: '/assets/scenes/a-fleet-on-an-empty-sea.png',
    repositoryPath: 'assets/images/content/scenes/a-fleet-on-an-empty-sea.png',
  },
  {
    id: 'scenes-a-fleet-on-an-empty-sea-subship',
    role: 'illustration',
    logicalSource: '/assets/scenes/a-fleet-on-an-empty-sea-subship.png',
    repositoryPath: 'assets/images/content/scenes/a-fleet-on-an-empty-sea-subship.png',
  },
]

export const RESPONSIVE_IMAGE_SOURCES = ORIGINAL_IMAGE_SOURCES.filter((source) => !source.archived)

const SOURCE_BY_LOGICAL_PATH = new Map(
  RESPONSIVE_IMAGE_SOURCES.map((source) => [source.logicalSource, source]),
)

export function responsiveImageSourcePath(root: string, logicalSource: string): string | undefined {
  const source = SOURCE_BY_LOGICAL_PATH.get(logicalSource)
  return source ? join(root, source.repositoryPath) : undefined
}
