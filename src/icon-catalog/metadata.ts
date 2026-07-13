import type { IconCatalogEntry, IconCatalogOverride, IconClassification, IconSource } from './types'

export type IconMetadataSeed = {
  id: string
  source: IconSource
  componentName: string
  label?: string
  description?: string
  sourceDescription?: string
  attribution?: string
  metadataConfidence?: IconCatalogEntry['metadataConfidence']
  aliases?: ReadonlyArray<string>
  associatedTerms?: ReadonlyArray<string>
  keywords?: ReadonlyArray<string>
  sourceCategories?: ReadonlyArray<string>
  categories?: ReadonlyArray<string>
  useCases?: ReadonlyArray<string>
  duplicateOf?: string
  sourceUrl?: string
}

type CategoryRule = {
  id: string
  terms: ReadonlyArray<string>
  keywords: ReadonlyArray<string>
  useCases: ReadonlyArray<string>
}

const CATEGORY_RULES: ReadonlyArray<CategoryRule> = [
  {
    id: 'ui/navigation',
    terms: [
      'arrow',
      'back',
      'caret',
      'chevron',
      'compass',
      'direction',
      'ellipsis',
      'expand',
      'forward',
      'menu',
      'move',
      'navigation',
      'redo',
      'refresh',
      'route',
      'shrink',
      'sort',
      'undo',
    ],
    keywords: ['back', 'direction', 'next', 'previous', 'wayfinding'],
    useCases: ['Navigation controls', 'Directional actions', 'Sorting or moving content'],
  },
  {
    id: 'ui/action',
    terms: [
      'add',
      'check',
      'close',
      'copy',
      'download',
      'edit',
      'filter',
      'minus',
      'paste',
      'pen',
      'pencil',
      'plus',
      'save',
      'search',
      'settings',
      'share',
      'trash',
      'upload',
      'xmark',
    ],
    keywords: ['command', 'control', 'interaction', 'operation'],
    useCases: ['Buttons and menus', 'Editing actions', 'Search and filtering'],
  },
  {
    id: 'ui/status',
    terms: [
      'alert',
      'badge',
      'ban',
      'bell',
      'check',
      'error',
      'exclamation',
      'info',
      'loading',
      'question',
      'spinner',
      'success',
      'warning',
    ],
    keywords: ['feedback', 'notification', 'state'],
    useCases: ['Status messages', 'Notifications', 'Validation feedback'],
  },
  {
    id: 'ui/content',
    terms: [
      'archive',
      'clipboard',
      'document',
      'file',
      'folder',
      'image',
      'inbox',
      'link',
      'list',
      'paperclip',
      'table',
      'tag',
      'text',
    ],
    keywords: ['content', 'data', 'record'],
    useCases: ['Content management', 'Files and records', 'Structured information'],
  },
  {
    id: 'ui/media',
    terms: [
      'audio',
      'camera',
      'eject',
      'headphones',
      'image',
      'microphone',
      'music',
      'pause',
      'play',
      'stop',
      'video',
      'volume',
    ],
    keywords: ['media', 'playback', 'sound'],
    useCases: ['Media controls', 'Audio or video content', 'Images and attachments'],
  },
  {
    id: 'ui/layout',
    terms: [
      'align',
      'border',
      'column',
      'grid',
      'layout',
      'panel',
      'sidebar',
      'spacing',
      'square',
      'window',
    ],
    keywords: ['arrange', 'container', 'position', 'view'],
    useCases: ['Layout controls', 'View selection', 'Content arrangement'],
  },
  {
    id: 'entity/person',
    terms: [
      'baby',
      'body',
      'child',
      'face',
      'hand',
      'head',
      'man',
      'person',
      'people',
      'user',
      'woman',
    ],
    keywords: ['character', 'npc', 'pc', 'person'],
    useCases: ['Characters and NPCs', 'Party members', 'People and roles'],
  },
  {
    id: 'entity/creature',
    terms: [
      'animal',
      'bat',
      'bear',
      'beast',
      'bird',
      'cat',
      'creature',
      'dinosaur',
      'dog',
      'dragon',
      'fish',
      'goblin',
      'horse',
      'monster',
      'raven',
      'snake',
      'spider',
      'troll',
      'wolf',
      'worm',
    ],
    keywords: ['beast', 'encounter', 'monster', 'species'],
    useCases: ['Beasts and monsters', 'Creature encounters', 'Animal companions'],
  },
  {
    id: 'entity/item',
    terms: [
      'backpack',
      'bag',
      'book',
      'bottle',
      'chest',
      'coin',
      'equipment',
      'flask',
      'gem',
      'gift',
      'key',
      'loot',
      'potion',
      'ring',
      'scroll',
      'tool',
      'treasure',
      'vial',
    ],
    keywords: ['artifact', 'equipment', 'inventory', 'loot'],
    useCases: ['Items and equipment', 'Inventory entries', 'Treasure and rewards'],
  },
  {
    id: 'entity/location',
    terms: [
      'building',
      'castle',
      'cave',
      'city',
      'dungeon',
      'forest',
      'house',
      'landmark',
      'map',
      'marker',
      'mountain',
      'pin',
      'road',
      'settlement',
      'tower',
      'village',
      'world',
    ],
    keywords: ['destination', 'place', 'site', 'world'],
    useCases: ['Locations and landmarks', 'Maps and destinations', 'Settlements or dungeons'],
  },
  {
    id: 'entity/organization',
    terms: ['alliance', 'banner', 'building', 'faction', 'flag', 'guild', 'handshake', 'team'],
    keywords: ['allegiance', 'faction', 'group', 'organization'],
    useCases: ['Organizations and factions', 'Alliances', 'Group identity'],
  },
  {
    id: 'event/combat',
    terms: [
      'armor',
      'axe',
      'battle',
      'bow',
      'crossbow',
      'fight',
      'fist',
      'shield',
      'spear',
      'sword',
      'target',
      'weapon',
    ],
    keywords: ['attack', 'battle', 'combat', 'damage', 'encounter'],
    useCases: ['Combat events', 'Weapons and armor', 'Threats or victories'],
  },
  {
    id: 'event/magic',
    terms: [
      'arcane',
      'crystal',
      'fairy',
      'magic',
      'potion',
      'rune',
      'sparkle',
      'spell',
      'wand',
      'witch',
      'wizard',
    ],
    keywords: ['arcane', 'enchantment', 'magic', 'spell'],
    useCases: ['Magic and spells', 'Enchantments', 'Arcane events or items'],
  },
  {
    id: 'event/social',
    terms: [
      'chat',
      'comment',
      'contract',
      'handshake',
      'message',
      'party',
      'speech',
      'talk',
      'users',
    ],
    keywords: ['conversation', 'meeting', 'negotiation', 'social'],
    useCases: ['Social encounters', 'Meetings and negotiations', 'Messages or conversations'],
  },
  {
    id: 'event/travel',
    terms: [
      'anchor',
      'boat',
      'cart',
      'compass',
      'horse',
      'journey',
      'road',
      'route',
      'sailboat',
      'ship',
      'travel',
      'wagon',
      'waypoint',
    ],
    keywords: ['journey', 'route', 'travel', 'voyage'],
    useCases: ['Travel events', 'Routes and journeys', 'Vehicles or mounts'],
  },
  {
    id: 'event/time',
    terms: ['calendar', 'clock', 'day', 'history', 'hourglass', 'moon', 'night', 'rest', 'sunrise'],
    keywords: ['date', 'duration', 'session', 'time', 'timeline'],
    useCases: ['Events and sessions', 'Dates and timelines', 'Rest or passage of time'],
  },
  {
    id: 'condition/health',
    terms: [
      'bandage',
      'blood',
      'dead',
      'death',
      'disease',
      'heart',
      'health',
      'medical',
      'poison',
      'skull',
      'sleep',
      'wound',
    ],
    keywords: ['condition', 'death', 'healing', 'health', 'injury'],
    useCases: ['Conditions and health', 'Injuries or healing', 'Death and danger'],
  },
  {
    id: 'nature/weather',
    terms: [
      'cloud',
      'earth',
      'fire',
      'flower',
      'leaf',
      'lightning',
      'moon',
      'mountain',
      'plant',
      'rain',
      'snow',
      'star',
      'sun',
      'tree',
      'water',
      'weather',
      'wind',
    ],
    keywords: ['element', 'nature', 'season', 'terrain', 'weather'],
    useCases: ['Nature and wilderness', 'Weather or seasons', 'Elemental effects'],
  },
  {
    id: 'symbol/religion',
    terms: [
      'angel',
      'church',
      'cross',
      'demon',
      'divine',
      'god',
      'holy',
      'prayer',
      'religion',
      'temple',
    ],
    keywords: ['cult', 'deity', 'divine', 'faith', 'religion'],
    useCases: ['Religions and cults', 'Holy sites', 'Divine or infernal events'],
  },
  {
    id: 'item/food',
    terms: ['apple', 'beer', 'bread', 'drink', 'food', 'fruit', 'meat', 'utensils', 'wine'],
    keywords: ['consumable', 'drink', 'feast', 'food', 'tavern'],
    useCases: ['Food and drink', 'Taverns and feasts', 'Consumable items'],
  },
  {
    id: 'modern/technology',
    terms: [
      'bluetooth',
      'browser',
      'computer',
      'database',
      'drone',
      'laptop',
      'microchip',
      'phone',
      'robot',
      'satellite',
      'server',
      'smartphone',
      'usb',
      'wifi',
    ],
    keywords: ['device', 'digital', 'modern', 'technology'],
    useCases: ['Modern technology', 'Developer or administrative UI', 'Devices and connectivity'],
  },
  {
    id: 'modern/weapon',
    terms: ['ammo', 'bomb', 'bullet', 'gun', 'missile', 'pistol', 'rifle', 'rocket'],
    keywords: ['firearm', 'modern', 'weapon'],
    useCases: ['Modern or science-fiction weapons', 'Explosions', 'Ammunition'],
  },
  {
    id: 'gameplay',
    terms: ['card', 'chess', 'dice', 'gamepad', 'puzzle', 'rank', 'score', 'trophy'],
    keywords: ['game', 'mechanic', 'rank', 'reward'],
    useCases: ['Game mechanics', 'Ranks and rewards', 'Puzzles or chance'],
  },
]

const SYNONYMS: Readonly<Record<string, ReadonlyArray<string>>> = {
  angel: ['celestial', 'divine'],
  arrow: ['direction', 'navigation'],
  beer: ['ale', 'tavern'],
  book: ['codex', 'grimoire', 'journal', 'lore', 'spellbook', 'tome'],
  castle: ['fortress', 'keep', 'stronghold'],
  coin: ['currency', 'gold', 'loot', 'treasure'],
  crown: ['king', 'monarch', 'queen', 'royalty', 'ruler'],
  dragon: ['beast', 'monster', 'wyrm'],
  dungeon: ['crypt', 'lair', 'ruin', 'underground'],
  flask: ['alchemy', 'apothecary', 'potion'],
  ghost: ['haunt', 'spirit', 'undead'],
  map: ['destination', 'quest', 'travel'],
  moon: ['celestial', 'lunar', 'night'],
  raven: ['bird', 'familiar', 'omen'],
  scroll: ['document', 'lore', 'message'],
  shield: ['defense', 'protection', 'ward'],
  ship: ['harbor', 'sailing', 'sea', 'voyage'],
  skull: ['corpse', 'death', 'undead'],
  sword: ['battle', 'combat', 'weapon'],
  wand: ['arcane', 'magic', 'spell'],
}

const LUCIDE_BRANDS = new Set([
  'Airplay',
  'Bitcoin',
  'Chromium',
  'Codepen',
  'Codesandbox',
  'Dribbble',
  'Facebook',
  'Figma',
  'Framer',
  'Github',
  'Gitlab',
  'Instagram',
  'Linkedin',
  'Pocket',
  'Slack',
  'Trello',
  'Twitch',
  'Twitter',
  'Youtube',
])

const MODERN_REVIEW_TERMS = new Set([
  'airplane',
  'ambulance',
  'barcode',
  'bitcoin',
  'bluetooth',
  'browser',
  'car',
  'code',
  'computer',
  'credit',
  'database',
  'drone',
  'fingerprint',
  'gun',
  'laptop',
  'microchip',
  'motorcycle',
  'nfc',
  'phone',
  'qr',
  'radio',
  'robot',
  'satellite',
  'server',
  'smartphone',
  'subway',
  'train',
  'truck',
  'usb',
  'wifi',
])

const GENERIC_UI_CORE_TERMS = new Set([
  'add',
  'align',
  'angle',
  'archive',
  'arrow',
  'back',
  'bell',
  'calendar',
  'caret',
  'check',
  'chevron',
  'clipboard',
  'close',
  'cog',
  'column',
  'comment',
  'compress',
  'copy',
  'download',
  'edit',
  'ellipsis',
  'envelope',
  'expand',
  'eye',
  'file',
  'filter',
  'folder',
  'forward',
  'grip',
  'home',
  'info',
  'layout',
  'link',
  'list',
  'lock',
  'menu',
  'minus',
  'pause',
  'play',
  'plus',
  'question',
  'redo',
  'refresh',
  'reply',
  'save',
  'search',
  'settings',
  'share',
  'sort',
  'spinner',
  'stop',
  'table',
  'tag',
  'times',
  'toggle',
  'trash',
  'undo',
  'unlink',
  'unlock',
  'upload',
  'user',
  'users',
  'volume',
  'window',
  'xmark',
])

const GENERIC_UI_MODIFIERS = new Set([
  'alt',
  'big',
  'circle',
  'down',
  'horizontal',
  'left',
  'long',
  'off',
  'on',
  'outline',
  'regular',
  'right',
  'solid',
  'square',
  'up',
  'vertical',
])

const FANTASY_CATEGORY_PREFIXES = [
  'condition/',
  'entity/',
  'event/',
  'gameplay',
  'item/',
  'nature/',
  'symbol/',
]

const GAME_ICON_UI_DUPLICATES = new Set([
  'GiArrowCursor',
  'GiBookmark',
  'GiCalendar',
  'GiCheckMark',
  'GiCheckboxTree',
  'GiCloudDownload',
  'GiCloudUpload',
  'GiCog',
  'GiContract',
  'GiCrossMark',
  'GiExpand',
  'GiFastBackwardButton',
  'GiFastForwardButton',
  'GiFiles',
  'GiFullFolder',
  'GiHamburgerMenu',
  'GiHelp',
  'GiInfo',
  'GiMagnifyingGlass',
  'GiMove',
  'GiMute',
  'GiNextButton',
  'GiOpenFolder',
  'GiPaperClip',
  'GiPauseButton',
  'GiPlayButton',
  'GiPowerButton',
  'GiPreviousButton',
  'GiResize',
  'GiSave',
  'GiSaveArrow',
  'GiSettingsKnobs',
  'GiShare',
  'GiSoundOff',
  'GiSoundOn',
  'GiSpeaker',
  'GiSpeakerOff',
  'GiToggles',
  'GiTrashCan',
])

const GAME_ICON_IP_GLYPHS = new Set([
  'GiBulletBill',
  'GiDeathStar',
  'GiDekuTree',
  'GiKoholintEgg',
  'GiMetroid',
  'GiPokecog',
  'GiQuickMan',
  'GiRupee',
  'GiSamusHelmet',
  'GiSheikahEye',
  'GiSpockHand',
  'GiSuperMushroom',
  'GiThwomp',
  'GiTriforce',
  'GiWarpPipe',
])

const GAME_ICON_HARD_MODERN = new Set([
  'GiAirplane',
  'GiAirplaneArrival',
  'GiAirplaneDeparture',
  'GiAmbulance',
  'GiBulldozer',
  'GiBus',
  'GiBusDoors',
  'GiBusStop',
  'GiCalculator',
  'GiCityCar',
  'GiCommercialAirplane',
  'GiCpu',
  'GiDatabase',
  'GiF1Car',
  'GiFoodTruck',
  'GiForklift',
  'GiGamepad',
  'GiHelicopter',
  'GiJetFighter',
  'GiKeyboard',
  'GiKickScooter',
  'GiLaptop',
  'GiMicrochip',
  'GiMilitaryAmbulance',
  'GiRaceCar',
  'GiScooter',
  'GiServerRack',
  'GiSmartphone',
  'GiTowTruck',
  'GiTv',
  'GiVhs',
  'GiWifiRouter',
])

const GAME_ICON_QUESTIONABLE_TAGS = new Set([
  'abstract',
  'cinema',
  'electronic',
  'office',
  'police',
  'science-fiction',
  'space',
  'sport',
  'steampunk',
  'western',
  'world-wars',
])

function unique(values: ReadonlyArray<string>): Array<string> {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))]
}

export function wordsFromComponentName(componentName: string, source: IconSource): Array<string> {
  let name = componentName
  if (source === 'fa') name = name.replace(/^Fa/u, '')
  if (source === 'gi') name = name.replace(/^Gi/u, '')
  if (source === 'fa' && name.startsWith('Reg')) name = `${name.slice(3)} Regular`

  return name
    .replace(/([a-z\d])([A-Z])/gu, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/gu, '$1 $2')
    .replace(/(\d)([A-Za-z])/gu, '$1 $2')
    .replace(/([A-Za-z])(\d)/gu, '$1 $2')
    .split(/[^A-Za-z\d]+/u)
    .filter(Boolean)
}

export function humanizeIconName(componentName: string, source: IconSource): string {
  return wordsFromComponentName(componentName, source)
    .map((word) => (/^\d+d$/iu.test(word) ? word.toUpperCase() : word))
    .join(' ')
}

function normalizedWords(seed: IconMetadataSeed): Array<string> {
  return unique([
    ...wordsFromComponentName(seed.componentName, seed.source),
    ...(seed.label ?? '').split(/[^A-Za-z\d]+/u),
    ...(seed.aliases ?? []).flatMap((alias) => alias.split(/[^A-Za-z\d]+/u)),
    ...(seed.keywords ?? []).flatMap((keyword) => keyword.split(/[^A-Za-z\d]+/u)),
  ]).map((word) => word.toLocaleLowerCase())
}

function matchesRule(words: ReadonlySet<string>, rule: CategoryRule): boolean {
  return rule.terms.some((term) => words.has(term))
}

function deriveCategories(seed: IconMetadataSeed, words: ReadonlySet<string>): Array<string> {
  return unique([
    ...(seed.categories ?? []),
    ...CATEGORY_RULES.filter((rule) => matchesRule(words, rule)).map((rule) => rule.id),
  ]).slice(0, 6)
}

function deriveAssociatedTerms(
  seed: IconMetadataSeed,
  words: ReadonlyArray<string>,
  matchingRules: ReadonlyArray<CategoryRule>,
): Array<string> {
  const nameWords = new Set(
    wordsFromComponentName(seed.componentName, seed.source).map((word) => word.toLocaleLowerCase()),
  )

  return unique([
    ...(seed.associatedTerms ?? []),
    ...(seed.aliases ?? []),
    ...(seed.keywords ?? []),
    ...words.flatMap((word) => SYNONYMS[word] ?? []),
    ...matchingRules.flatMap((rule) => rule.keywords),
  ])
    .map((term) => term.toLocaleLowerCase())
    .filter((term) => {
      const termWords = term.split(/[^a-z\d]+/u).filter(Boolean)
      return termWords.some((word) => !nameWords.has(word))
    })
    .slice(0, 12)
}

function listSentence(values: ReadonlyArray<string>): string {
  if (values.length <= 1) return values[0] ?? ''
  if (values.length === 2) return `${values[0]} and ${values[1]}`
  return `${values.slice(0, -1).join(', ')}, and ${values.at(-1)}`
}

function generatedDescription(
  seed: IconMetadataSeed,
  associatedTerms: ReadonlyArray<string>,
  useCases: ReadonlyArray<string>,
): string {
  if (seed.description) return seed.description
  if (seed.sourceDescription) return seed.sourceDescription

  if (useCases.length > 0) {
    return `Useful for ${listSentence(useCases.slice(0, 3).map((value) => value.toLocaleLowerCase()))}.`
  }

  if (associatedTerms.length > 0) {
    return `Associated with ${listSentence(associatedTerms.slice(0, 6))}.`
  }

  return 'No additional semantic associations are available; review the visual before use.'
}

function isPureGenericUi(words: ReadonlyArray<string>): boolean {
  const meaningfulWords = words.filter((word) => !/^\d+$/u.test(word))
  return (
    meaningfulWords.some((word) => GENERIC_UI_CORE_TERMS.has(word)) &&
    meaningfulWords.every(
      (word) => GENERIC_UI_CORE_TERMS.has(word) || GENERIC_UI_MODIFIERS.has(word),
    )
  )
}

function classificationFor(
  seed: IconMetadataSeed,
  words: ReadonlyArray<string>,
  categories: ReadonlyArray<string>,
): { classification: IconClassification; reason: string } {
  if (seed.source === 'custom') {
    return {
      classification: 'useful',
      reason: 'Purpose-built campaign icon with a unique meaning.',
    }
  }

  if (seed.source === 'gi' && seed.componentName === 'GiEskimo') {
    return {
      classification: 'marked-for-deletion',
      reason: 'Outdated cultural label that has been retired from the upstream collection.',
    }
  }

  if (seed.source === 'gi' && GAME_ICON_UI_DUPLICATES.has(seed.componentName)) {
    return {
      classification: 'marked-for-deletion',
      reason: 'Pure generic UI control duplicated by the canonical Lucide set.',
    }
  }

  if (seed.source === 'gi' && GAME_ICON_IP_GLYPHS.has(seed.componentName)) {
    return {
      classification: 'marked-for-deletion',
      reason: 'Recognizable third-party intellectual-property glyph rather than a generic concept.',
    }
  }

  if (
    seed.source === 'gi' &&
    (GAME_ICON_HARD_MODERN.has(seed.componentName) ||
      /^Gi(?:Ak47U?|C96|ColtM1911|Glock|M3GreaseGun|Mac10|Mp40|Mp5K?|P90|SpectreM4|Tec9|ThompsonM1(?:928)?|Uzi|WinchesterRifle)$/u.test(
        seed.componentName,
      ))
  ) {
    return {
      classification: 'marked-for-deletion',
      reason: 'Highly specific modern technology or equipment incompatible with the setting.',
    }
  }

  if (/^GiAbstract\d+$/u.test(seed.componentName)) {
    return {
      classification: 'questionable',
      reason: 'Abstract numbered glyph has no reliable semantic name and needs visual review.',
    }
  }

  if (
    seed.source === 'fa' &&
    (seed.sourceCategories?.includes('brand/logo') || seed.componentName === 'FaTripadvisor')
  ) {
    return {
      classification: 'marked-for-deletion',
      reason: 'Brand or product logo with no campaign or generic UI role.',
    }
  }

  if (seed.source === 'lucide' && LUCIDE_BRANDS.has(seed.componentName)) {
    return {
      classification: 'marked-for-deletion',
      reason: 'Brand or service logo rather than a reusable visual concept.',
    }
  }

  if (seed.source === 'fa' && seed.componentName.startsWith('FaReg')) {
    return {
      classification: 'marked-for-deletion',
      reason: 'Redundant regular-outline variant; Lucide is canonical for generic outline UI.',
    }
  }

  const nameWords = wordsFromComponentName(seed.componentName, seed.source).map((word) =>
    word.toLocaleLowerCase(),
  )
  if (seed.source !== 'lucide' && isPureGenericUi(nameWords)) {
    return {
      classification: 'marked-for-deletion',
      reason: 'Generic UI concept duplicated by the canonical Lucide set.',
    }
  }

  if (
    seed.source === 'gi' &&
    seed.sourceCategories?.some((category) => GAME_ICON_QUESTIONABLE_TAGS.has(category))
  ) {
    return {
      classification: 'questionable',
      reason: 'Upstream tags indicate an abstract, modern, technical, or setting-specific visual.',
    }
  }

  if (seed.source === 'gi' && seed.metadataConfidence === 'ambiguous-source') {
    return {
      classification: 'questionable',
      reason: 'Multiple upstream icons share this name; the installed visual needs manual review.',
    }
  }

  if (
    seed.source === 'gi' &&
    seed.metadataConfidence === 'name-derived' &&
    seed.componentName !== 'GiFemaleVampire'
  ) {
    return {
      classification: 'questionable',
      reason: 'No exact upstream metadata match; meaning was inferred from the export name.',
    }
  }

  const isModern = words.some((word) => MODERN_REVIEW_TERMS.has(word))
  if (isModern && seed.source !== 'lucide') {
    return {
      classification: 'questionable',
      reason: 'Modern or technical concept that may not fit a classical-fantasy campaign.',
    }
  }

  if (seed.source === 'lucide') {
    if (isModern) {
      return {
        classification: 'questionable',
        reason: 'Specialized modern concept retained for possible administrative UI use.',
      }
    }
    return {
      classification: 'useful',
      reason: 'Canonical generic UI icon or a broadly reusable campaign concept.',
    }
  }

  if (
    categories.some((category) =>
      FANTASY_CATEGORY_PREFIXES.some((prefix) => category.startsWith(prefix)),
    )
  ) {
    return {
      classification: 'useful',
      reason: 'Strong match for fantasy campaign entities, events, items, or game mechanics.',
    }
  }

  if (seed.source === 'gi') {
    return {
      classification: 'useful',
      reason: 'Game-oriented visual that may provide useful campaign flavor.',
    }
  }

  return {
    classification: 'questionable',
    reason: 'Not an obvious fantasy or canonical UI choice; retained for manual review.',
  }
}

export function buildIconCatalogEntry(
  seed: IconMetadataSeed,
  usedIn: ReadonlyArray<string>,
  override: IconCatalogOverride = {},
): IconCatalogEntry {
  const label = seed.label ?? humanizeIconName(seed.componentName, seed.source)
  const words = normalizedWords(seed)
  const wordSet = new Set(words)
  const categories = deriveCategories(seed, wordSet)
  const matchingRules = CATEGORY_RULES.filter((rule) => categories.includes(rule.id))
  const associatedTerms = deriveAssociatedTerms(seed, words, matchingRules)
  const keywords = unique([
    ...words,
    ...(seed.keywords ?? []),
    ...words.flatMap((word) => SYNONYMS[word] ?? []),
    ...matchingRules.flatMap((rule) => rule.keywords),
  ]).toSorted()
  const useCases = unique([
    ...(seed.useCases ?? []),
    ...matchingRules.flatMap((rule) => rule.useCases),
  ]).slice(0, 8)
  const classification = classificationFor(seed, words, categories)

  return {
    id: seed.id,
    source: seed.source,
    componentName: seed.componentName,
    label,
    description: generatedDescription(seed, associatedTerms, useCases),
    ...(seed.sourceDescription ? { sourceDescription: seed.sourceDescription } : {}),
    ...(seed.attribution ? { attribution: seed.attribution } : {}),
    metadataConfidence:
      seed.metadataConfidence ?? (seed.source === 'custom' ? 'custom' : 'name-derived'),
    aliases: unique(seed.aliases ?? []).toSorted(),
    associatedTerms,
    keywords,
    sourceCategories: unique(seed.sourceCategories ?? []).toSorted(),
    categories: categories.toSorted(),
    useCases,
    classification: classification.classification,
    classificationReason: classification.reason,
    ...(seed.duplicateOf ? { duplicateOf: seed.duplicateOf } : {}),
    ...(seed.sourceUrl ? { sourceUrl: seed.sourceUrl } : {}),
    usedIn: unique(usedIn).toSorted(),
    ...override,
  }
}
