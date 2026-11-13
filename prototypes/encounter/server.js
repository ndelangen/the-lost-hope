import {
  ArrowLeft,
  Skull,
  Moon,
  Sunrise,
  Swords,
  Crown,
  ArrowRight,
  Box,
  Eye,
  UsersRound,
  Target,
  MoveUp,
  Link,
  Grip,
  Footprints,
  HeartPulse,
  Minus,
  PawPrint,
  Play,
  Plus,
  RotateCcw,
  Shield,
  UserRound,
  Zap,
} from 'lucide-react'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  GiBroadsword,
  GiHeartShield,
  GiComa,
  GiFangs,
  GiSpiderWeb,
  GiSpiderAlt,
  GiD4,
  GiD10,
  GiD12,
  GiDiceEightFacesEight,
  GiDiceSixFacesSix,
  GiDiceTwentyFacesTwenty,
} from 'react-icons/gi'

import spider from '../../src/data/beasts/giant-spider.ts'
import mimic from '../../src/data/beasts/mimic-chest.ts'
import wolfie from '../../src/data/beasts/wolfie.ts'
import fiddlerGame from '../../src/data/events/n2-e105.ts'
import { refs } from '../../src/data/generated/refs.ts'
import knight from '../../src/data/npcs/the-fiddler-s-knight.ts'
import cassian from '../../src/data/pcs/cassian-veyl.ts'
import devan from '../../src/data/pcs/devan.ts'
import swift from '../../src/data/pcs/swift-starblade.ts'
import devanMystery from '../../src/data/quests/what-did-devan-lose-to-the-fiddler.ts'

const effectSources = {
  [refs.events.n2_e105.key]: { name: fiddlerGame.name, day: fiddlerGame.day },
  [refs.quests.what_did_devan_lose_to_the_fiddler.key]: { name: devanMystery.name },
}

const effectTriggers = {
  newDay: { icon: 'Sunrise', label: 'New campaign day' },
  encounterStart: { icon: 'Swords', label: 'Encounter starts' },
  longRest: { icon: 'Moon', label: 'Long rest' },
  wouldDie: { icon: 'Skull', label: 'If the character would die' },
}

const effects = [
  {
    id: 'death-protection',
    entity: refs.pcs.devan,
    source: refs.events.n2_e105,
    name: 'Protection against death',
    icon: 'GiHeartShield',
    trigger: 'wouldDie',
    reminder: 'Check this protection if Devan would die.',
    detail:
      'Devan gained protections against death during the Fiddler’s game. The record does not specify the mechanics, number of uses, or duration.',
  },
  {
    id: 'missing-or-dormant',
    entity: refs.pcs.devan,
    source: refs.events.n2_e105,
    mystery: refs.quests.what_did_devan_lose_to_the_fiddler,
    name: 'Something missing or dormant',
    icon: 'GiComa',
    detail:
      'Devan felt that part of himself had gone missing or fallen asleep. What changed, how it affects him, and how to recover it are unresolved.',
  },
]

const profiles = {
  knight: {
    kind: 'NPC',
    maxHp: 32,
    ac: 17,
    speed: '30 ft.',
    scores: [16, 12, 14, 10, 11, 12],
    saves: { str: 5, con: 4 },
    features: [
      {
        name: 'Longsword',
        icon: 'GiBroadsword',
        intent: 'damage',
        type: 'Actions',
        text: '+5 to hit, reach 5 ft. Hit: 1d8 + 3 slashing damage.',
      },
      {
        name: 'Second Wind',
        intent: 'healing',
        icon: 'HeartPulse',
        type: 'Bonus actions',
        text: 'Regain 1d10 + 4 HP.',
        uses: 1,
      },
      {
        name: 'Action Surge',
        icon: 'Zap',
        type: 'Traits',
        text: 'On your turn, take one additional action other than the Magic action.',
        uses: 1,
      },
      {
        name: 'Guard',
        icon: 'Shield',
        type: 'Reactions',
        text: 'When an adjacent ally is attacked, impose disadvantage on the attack roll.',
      },
    ],
  },
  wolfie: {
    kind: 'Beast',
    maxHp: 24,
    ac: 14,
    speed: '50 ft.',
    scores: [16, 14, 14, 8, 12, 8],
    features: [
      {
        name: 'Bite',
        icon: 'GiFangs',
        intent: 'damage',
        type: 'Actions',
        text: '+5 to hit, reach 5 ft. Hit: 2d6 + 3 piercing damage.',
      },
      {
        name: 'Pounce',
        intent: 'damage',
        icon: 'PawPrint',
        type: 'Actions',
        text: 'After moving at least 20 ft. straight toward a target, make a Bite attack. On a hit, the target makes a DC 13 Strength save or falls prone.',
        uses: 1,
      },
      {
        name: 'Pack Tactics',
        icon: 'UsersRound',
        type: 'Traits',
        text: 'Advantage on attack rolls against a creature if a conscious ally is within 5 ft. of it.',
      },
    ],
  },
  spider: {
    kind: 'Beast',
    maxHp: 26,
    ac: 14,
    speed: '30 ft., climb 30 ft.',
    scores: [14, 16, 12, 2, 11, 4],
    saves: { dex: 5 },
    features: [
      {
        name: 'Bite',
        icon: 'GiFangs',
        intent: 'damage',
        type: 'Actions',
        text: '+5 to hit, reach 5 ft. Hit: 1d8 + 3 piercing damage. DC 11 Constitution save for half of 2d8 poison damage.',
      },
      {
        name: 'Web',
        icon: 'GiSpiderWeb',
        type: 'Actions',
        text: '+5 to hit, range 30/60 ft. On a hit, the target is restrained. It can use an action to attempt a DC 12 Strength check to escape.',
        uses: 1,
        recharge: 'Recharge 5–6',
      },
      {
        name: 'Spider Climb',
        icon: 'MoveUp',
        type: 'Traits',
        text: 'Climbs walls and ceilings without an ability check.',
      },
      {
        name: 'Web Walker',
        icon: 'Footprints',
        type: 'Traits',
        text: 'Ignores movement restrictions caused by webbing.',
      },
    ],
  },
  mimic: {
    kind: 'Beast',
    maxHp: 58,
    ac: 12,
    speed: '15 ft.',
    scores: [17, 12, 15, 5, 13, 8],
    legendaryUses: 2,
    damageImmunities: 'Acid',
    conditionImmunities: 'Prone',
    resistances: 'Cold',
    features: [
      {
        name: 'Pseudopod',
        intent: 'damage',
        icon: 'Target',
        type: 'Actions',
        text: '+5 to hit, reach 5 ft. Hit: 1d8 + 3 bludgeoning damage. In object form, the target also sticks to the mimic.',
      },
      {
        name: 'Bite',
        icon: 'GiFangs',
        intent: 'damage',
        type: 'Actions',
        text: '+5 to hit, reach 5 ft. Hit: 1d8 + 3 piercing damage plus 1d8 acid damage.',
      },
      {
        name: 'Lunging Bite',
        icon: 'GiFangs',
        intent: 'damage',
        type: 'Legendary actions',
        text: 'Move up to half your speed and make a Bite attack.',
      },
      {
        name: 'Snap Shut',
        icon: 'Box',
        type: 'Legendary actions',
        text: 'Change into object form.',
      },
      {
        name: 'Shapechange',
        icon: 'Box',
        type: 'Actions',
        text: 'Change between object form and true form. The same statistics apply in both forms.',
      },
      {
        name: 'Adhesive',
        icon: 'Link',
        type: 'Traits',
        text: 'In object form, anything that touches the mimic sticks to it. A stuck creature is grappled (escape DC 13).',
      },
      {
        name: 'False Appearance',
        icon: 'Eye',
        type: 'Traits',
        text: 'While motionless in object form, the mimic looks like an ordinary object.',
      },
      {
        name: 'Grappler',
        icon: 'Grip',
        type: 'Traits',
        text: 'Advantage on attacks against creatures it has grappled.',
      },
    ],
  },
}

function copies(key, entity, count) {
  return Array.from({ length: count }, (_, index) => ({
    id: key + '-' + (index + 1),
    name: entity.name + ' ' + (index + 1),
    profile: key,
    portrait: entity === wolfie ? '/portrait/wolfie' : undefined,
  }))
}

const combatants = [
  { id: 'knight', name: knight.name, profile: 'knight' },
  ...copies('wolfie', wolfie, 4),
  { id: 'devan', name: devan.name, portrait: '/portrait/devan', entity: refs.pcs.devan },
  ...copies('spider', spider, 3),
  { id: 'cassian', name: cassian.name, portrait: '/portrait/cassian' },
  ...copies('mimic', mimic, 2),
  { id: 'swift', name: swift.name, portrait: '/portrait/swift' },
]

const icons = Object.fromEntries(
  Object.entries({
    GiBroadsword,
    GiHeartShield,
    GiComa,
    GiFangs,
    GiSpiderWeb,
    GiSpiderAlt,
    d4: GiD4,
    d6: GiDiceSixFacesSix,
    d8: GiDiceEightFacesEight,
    d10: GiD10,
    d12: GiD12,
    d20: GiDiceTwentyFacesTwenty,
    ArrowLeft,
    Skull,
    Moon,
    Sunrise,
    Swords,
    Crown,
    ArrowRight,
    Box,
    Eye,
    UsersRound,
    Target,
    MoveUp,
    Link,
    Grip,
    Footprints,
    HeartPulse,
    Minus,
    PawPrint,
    Play,
    Plus,
    RotateCcw,
    Shield,
    UserRound,
    Zap,
  }).map(([name, Icon]) => [
    name,
    renderToStaticMarkup(createElement(Icon, { size: 18, 'aria-hidden': true })),
  ]),
)

const portraits = {
  wolfie: 'npcs/wolfie.png',
  devan: 'pcs/devan.png',
  cassian: 'pcs/cassian.jpg',
  swift: 'pcs/swift.jpg',
}

const prototypeDir = import.meta.dir
const server = Bun.serve({
  hostname: '127.0.0.1',
  port: Number(process.env.ENCOUNTER_PORT ?? 4317),
  routes: {
    '/dm/encounter-prototype': () => new Response(Bun.file(prototypeDir + '/index.html')),
    '/encounter.css': () => new Response(Bun.file(prototypeDir + '/encounter.css')),
    '/encounter.js': () => new Response(Bun.file(prototypeDir + '/encounter.js')),
    '/roster': () =>
      Response.json({ combatants, profiles, icons, effects, effectSources, effectTriggers }),
    '/portrait/:id': (request) => {
      const portrait = portraits[request.params.id]
      return portrait
        ? new Response(Bun.file(prototypeDir + '/../../assets/images/content/' + portrait))
        : new Response(null, { status: 404 })
    },
    '/favicon.ico': () => new Response(null, { status: 204 }),
  },
  fetch: () => new Response('Page not found', { status: 404 }),
})
console.log(server.url + 'dm/encounter-prototype')
