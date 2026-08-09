import { existsSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs.ts'
import { ENTITY_KINDS } from '#/definitions/kind.ts'
import { QUEST_TYPES } from '#/definitions/quest.ts'
import catalog from '#/icon-catalog/catalog.json'
import {
  allEntities,
  beasts,
  campaignEvents,
  COLLECTIONS,
  events,
  items,
  locationParent,
  locations,
  npcs,
  organizationMembers,
  organizations,
  pcs,
  quests,
  sessionDays,
  sessionPcs,
  sessions,
  sortedEvents,
  validateReferences,
  itemsCarriedBy,
  itemsOwnedBy,
} from '#/lib/campaign.ts'
import { EVENT_ICONS } from '#/lib/event-icons.tsx'
import { ITEM_ICONS } from '#/lib/item-icons.tsx'
import { LOCATION_ICONS } from '#/lib/location-icons.tsx'
import { ORGANIZATION_ICONS } from '#/lib/organization-icons.tsx'
import { QUEST_ICONS } from '#/lib/quest-icons.tsx'
import { SESSION_ICONS } from '#/lib/session-icons.tsx'

describe('location import order', () => {
  it('loads world directly', async () => {
    const world = await import('#/data/locations/world.ts')
    expect(world.default.slug).toBe('world')
  })

  it('loads badesh-forest directly', async () => {
    const forest = await import('#/data/locations/badesh-forest.ts')
    const parent = locationParent(forest.default)
    expect(parent?.slug).toBe('world')
  })

  it('loads locations index', async () => {
    const locationRegistry = await import('#/data/locations/_index.ts')
    expect(locationRegistry.default.world.slug).toBe('world')
  })

  it('nests Session 12 scenes beneath their physical locations', () => {
    expect(locationParent(locations.gambling_deck)?.slug).toBe(locations.sylvias_flying_bazaar.slug)
    expect(locationParent(locations.lower_stables)?.slug).toBe(locations.sylvias_flying_bazaar.slug)
    expect(locationParent(locations.bob_s_stall)?.slug).toBe(locations.sylvias_flying_bazaar.slug)
    expect(locationParent(locations.nimbus_s_second_best_inn)?.slug).toBe(locations.nimbus.slug)
  })
})

describe('registry integrity', () => {
  it('keeps typed ref keys synchronized with registries', () => {
    expect(Object.keys(beasts).toSorted()).toEqual(Object.keys(refs.beasts).toSorted())
    expect(Object.keys(events).toSorted()).toEqual(Object.keys(refs.events).toSorted())
    expect(Object.keys(items).toSorted()).toEqual(Object.keys(refs.items).toSorted())
    expect(Object.keys(locations).toSorted()).toEqual(Object.keys(refs.locations).toSorted())
    expect(Object.keys(npcs).toSorted()).toEqual(Object.keys(refs.npcs).toSorted())
    expect(Object.keys(organizations).toSorted()).toEqual(
      Object.keys(refs.organizations).toSorted(),
    )
    expect(Object.keys(pcs).toSorted()).toEqual(Object.keys(refs.pcs).toSorted())
    expect(Object.keys(quests).toSorted()).toEqual(Object.keys(refs.quests).toSorted())
    expect(Object.keys(sessions).toSorted()).toEqual(Object.keys(refs.sessions).toSorted())
  })

  it('includes every entity kind in shared collection operations', () => {
    expect(new Set(COLLECTIONS)).toEqual(new Set(ENTITY_KINDS))
  })

  it('has globally unique slugs', () => {
    const owners = new Map<string, string>()
    const collisions: string[] = []

    for (const kind of ENTITY_KINDS) {
      for (const entity of allEntities(kind)) {
        const owner = owners.get(entity.slug)
        if (owner) collisions.push(`${entity.slug}: ${owner}, ${kind}`)
        else owners.set(entity.slug, kind)
      }
    }

    expect(collisions).toEqual([])
  })
})

describe('quest taxonomy', () => {
  it('classifies every quest by its current objective', () => {
    const questValues = Object.values(quests)
    const missions = questValues
      .filter((quest) => quest.type === 'mission')
      .map((quest) => quest.name)
      .toSorted()

    expect(new Set(questValues.map((quest) => quest.type))).toEqual(new Set(QUEST_TYPES))
    expect(missions).toEqual([
      'Bring Swift’s Sister to Sylvia',
      'Help the Rare-Animal Dealer',
      'Make Abraham Known Among His Peers',
    ])
    expect(questValues.filter((quest) => quest.type === 'mystery')).toHaveLength(11)
  })
})

describe('player-character status', () => {
  it('preserves occasional and retired campaign states', () => {
    expect(pcs.mr_peace.status).toBe('occasional')
    expect(pcs.mr_peace.species).toBe('Celestial (exact species unknown)')
    expect(pcs.mr_peace.notes?.flat()).toContain('He carried a staff.')
    expect(pcs.victor_dranzig.status).toBe('retired')
  })

  it('records Victor as an Adventurers’ Guild member', () => {
    expect(
      pcs.victor_dranzig.memberships?.some(
        ({ organization }) => organization.key === refs.organizations.adventurers_guild.key,
      ),
    ).toBe(true)
  })

  it('records the party at level 5 after Session 11', () => {
    expect(
      [pcs.cassian_veyl, pcs.devan, pcs.jim, pcs.swift_starblade].map((pc) => pc.level),
    ).toEqual([5, 5, 5, 5])
  })
})

describe('items', () => {
  it('gives every item a unique icon', () => {
    const icons = Object.values(items).map((item) => item.icon)

    expect(new Set(icons).size).toBe(icons.length)
    expect(icons.every((icon) => icon in ITEM_ICONS)).toBe(true)
  })

  it('derives owned and carried PC items from item relationships', () => {
    expect(itemsOwnedBy('pc', pcs.devan.slug).map((item) => item.slug)).toEqual([
      items.flask_of_never_ending_booze.slug,
      items.rare_dragon_scales.slug,
      items.steve_mace_of_returning.slug,
    ])
    expect(itemsOwnedBy('pc', pcs.swift_starblade.slug).map((item) => item.slug)).toEqual([
      items.demon_possessed_flying_broom.slug,
      items.swifts_silver_container.slug,
    ])
    expect(itemsCarriedBy('pc', pcs.swift_starblade.slug).map((item) => item.slug)).toEqual([
      items.swifts_silver_container.slug,
    ])
    expect(itemsCarriedBy('pc', pcs.cassian_veyl.slug).map((item) => item.slug)).toEqual([
      items.bag_of_holding.slug,
      items.wolfie_tracking_ring.slug,
    ])
    expect(itemsCarriedBy('pc', pcs.jim.slug).map((item) => item.slug)).toEqual([
      items.cursed_shadow_sword.slug,
      items.dagger_of_passive_aggression.slug,
      items.jaded_amulet.slug,
      items.lights_unidentified_drops.slug,
      items.nimbus_dungeon_stamp_card.slug,
      items.robertos_map_pages.slug,
    ])
    expect(itemsCarriedBy('pc', pcs.devan.slug).map((item) => item.slug)).toEqual([
      items.flask_of_never_ending_booze.slug,
      items.rare_dragon_scales.slug,
      items.steve_mace_of_returning.slug,
    ])
    expect(
      itemsOwnedBy('organization', organizations.beasts_and_dwarf.slug).map((item) => item.slug),
    ).toEqual([items.nimbus_dungeon_stamp_card.slug])
    expect(items.nimbus_dungeon_stamp_card.carriedBy?.key).toBe(refs.pcs.jim.key)
    expect(items.nimbus_dungeon_stamp_card.quantity).toBe(1)
    expect(items.steve_mace_of_returning.craftedBy?.key).toBe(refs.npcs.bessy.key)
    expect(items.rare_dragon_scales.quantity).toBe(2)
  })
})

describe('beasts', () => {
  it('preserves Sir Fabulous before and after his divine transformation', () => {
    expect(beasts.sir_fabulous.notes?.flat()).toContainEqual(refs.beasts.sir_fabulous_divine_steed)
    expect(beasts.sir_fabulous_divine_steed.notes?.flat()).toContainEqual(refs.beasts.sir_fabulous)
  })
})

describe('entity icons', () => {
  it('gives locations, organizations, and quests unique supported icons', () => {
    const iconGroups = [
      {
        icons: Object.values(locations).map((location) => location.icon),
        registry: LOCATION_ICONS,
      },
      {
        icons: Object.values(organizations).map((organization) => organization.icon),
        registry: ORGANIZATION_ICONS,
      },
      {
        icons: Object.values(quests).map((quest) => quest.icon),
        registry: QUEST_ICONS,
      },
    ]

    for (const { icons, registry } of iconGroups) {
      expect(icons.every(Boolean)).toBe(true)
      expect(new Set(icons).size).toBe(icons.length)
      expect(icons.every((icon) => icon !== undefined && icon in registry)).toBe(true)
    }
  })

  it('uses only catalog icons classified as useful', () => {
    const catalogById = new Map(catalog.entries.map((entry) => [entry.id, entry]))
    const selectedIcons = [
      ...Object.values(events).flatMap((event) =>
        event.mark.type === 'icon' ? [event.mark.name] : [],
      ),
      ...Object.values(items).map((item) => item.icon),
      ...Object.values(locations).flatMap((location) => (location.icon ? [location.icon] : [])),
      ...Object.values(organizations).flatMap((organization) =>
        organization.icon ? [organization.icon] : [],
      ),
      ...Object.values(quests).map((quest) => quest.icon),
      ...Object.values(sessions).map((session) => session.icon),
    ]

    expect(
      selectedIcons.flatMap((icon) =>
        catalogById.get(icon)?.classification === 'useful' ? [] : [icon],
      ),
    ).toEqual([])
  })
})

describe('sessions', () => {
  it('gives every session a unique supported icon', () => {
    const icons = Object.values(sessions).map((session) => session.icon)

    expect(new Set(icons).size).toBe(icons.length)
    expect(icons.every((icon) => icon in SESSION_ICONS)).toBe(true)
  })
})

describe('Fairhaven businesses', () => {
  it('places Mortimer at his named shop', () => {
    expect(locations.mortimer_s_shop.name).toBe('Mortimer’s Shop')
    expect(npcs.mortimer_mafioso.location?.key).toBe(refs.locations.mortimer_s_shop.key)
  })
})

describe('adventuring parties', () => {
  it('derives Beasts and Dwarf members as canonical character references', () => {
    const groups = organizationMembers(organizations.beasts_and_dwarf)
    const members = groups.flatMap((group) => group.ranks.flatMap((rank) => rank.members))

    expect(groups[0]?.ranks).toEqual([
      { rank: 'Founder', members: [{ kind: 'pc', slug: 'jim' }] },
      {
        rank: 'Member',
        members: [
          { kind: 'pc', slug: 'cassian-veyl' },
          { kind: 'pc', slug: 'devan' },
          { kind: 'pc', slug: 'swift-starblade' },
        ],
      },
    ])
    expect(members).toEqual([
      { kind: 'pc', slug: 'jim' },
      { kind: 'pc', slug: 'cassian-veyl' },
      { kind: 'pc', slug: 'devan' },
      { kind: 'pc', slug: 'swift-starblade' },
      { kind: 'pc', slug: 'revin-klapper-grumblefist' },
      { kind: 'pc', slug: 'william-greenhoove' },
      { kind: 'pc', slug: 'victor-dranzig' },
    ])
  })

  it('keeps Fix in the rival party rather than Beasts and Dwarf', () => {
    expect(organizations.beasts_and_dwarf.name).toBe('Beasts and Dwarf')
    expect(
      pcs.fix.memberships?.some(
        ({ organization }) => organization.key === refs.organizations.beasts_and_dwarf.key,
      ),
    ).toBe(false)
    expect(
      pcs.jim.memberships?.some(
        ({ organization }) => organization.key === refs.organizations.beasts_and_dwarf.key,
      ),
    ).toBe(true)
  })

  it('records the Lucky Palm members and Fix’s other allegiances', () => {
    expect(pcs.fix.memberships?.map(({ organization }) => organization.key).toSorted()).toEqual(
      [
        refs.organizations.adventurers_guild.key,
        refs.organizations.lucky_palm.key,
        refs.organizations.the_eyeless_hand.key,
      ].toSorted(),
    )
    expect(
      [npcs.hex, npcs.sneeve].every((npc) =>
        npc.memberships?.some(
          ({ organization }) => organization.key === refs.organizations.lucky_palm.key,
        ),
      ),
    ).toBe(true)
    expect(organizationMembers(organizations.lucky_palm)).toEqual([
      {
        status: 'active',
        ranks: [
          {
            rank: 'Member',
            members: [
              { kind: 'pc', slug: 'fix' },
              { kind: 'npc', slug: 'hex' },
              { kind: 'npc', slug: 'sneeve' },
            ],
          },
        ],
      },
    ])
  })
})

describe('reference integrity', () => {
  it('has no dangling entity refs', async () => {
    await import('#/data/index.ts')
    const errors = validateReferences()
    expect(errors).toEqual([])
  })
})

describe('campaign chronology', () => {
  it('keeps local event avatars synchronized with existing PC assets', () => {
    const avatarMarks = Object.values(events).flatMap((event) =>
      event.mark.type === 'avatar' ? [event.mark] : [],
    )

    expect(
      avatarMarks.every(({ url }) =>
        url.startsWith('/assets/')
          ? existsSync(new URL(`../../public${url}`, import.meta.url))
          : true,
      ),
    ).toBe(true)
    expect(events.n2_e023.mark).toEqual({ type: 'avatar', url: pcs.mr_peace.avatar })
    expect(events.n2_e076.mark).toEqual({ type: 'avatar', url: pcs.devan.avatar })
  })

  it('gives every icon-backed event a supported icon unique within its session', () => {
    for (const session of Object.values(sessions)) {
      const icons = sessionDays(session)
        .flatMap((day) => day.events)
        .flatMap((event) => (event.mark.type === 'icon' ? [event.mark.name] : []))

      expect(new Set(icons).size).toBe(icons.length)
      expect(icons.every((icon) => icon in EVENT_ICONS)).toBe(true)
    }
  })

  it('uses positive integer campaign days for every event', () => {
    for (const event of Object.values(events)) {
      expect(Number.isInteger(event.day)).toBe(true)
      expect(event.day).toBeGreaterThan(0)
    }
  })

  it('groups a session by campaign day while preserving its event order', () => {
    expect(sessionDays(sessions.the_fajanet_festival)).toEqual([
      { day: 3, events: [events.n2_e023, events.n2_e024] },
      { day: 4, events: [events.n2_e025, events.n2_e103] },
    ])
    expect(sessionPcs(sessions.the_fajanet_festival).map((pc) => pc.slug)).toEqual([
      'jim',
      'mr-peace',
      'revin-klapper-grumblefist',
      'swift-starblade',
      'william-greenhoove',
    ])
  })

  it('uses explicit session numbers', () => {
    expect(sessions.arrival_in_fajanet.number).toBe(1)
    expect(sessions.escape_from_shadowpeak.number).toBe(10)
    expect(sessions.the_flying_bazaar.number).toBe(11)
    expect(sessions.the_fiddlers_game.number).toBe(12)
  })

  it('excludes absent Swift from the Session 10 party', () => {
    expect(sessionPcs(sessions.escape_from_shadowpeak).map((pc) => pc.slug)).toEqual([
      'cassian-veyl',
      'devan',
      'fix',
      'jim',
    ])
  })

  it('includes every registered event exactly once in campaign chronology', () => {
    const timelineSlugs = campaignEvents().map((event) => event.slug)
    const registrySlugs = Object.values(events).map((event) => event.slug)

    expect(new Set(timelineSlugs).size).toBe(timelineSlugs.length)
    expect(timelineSlugs.toSorted()).toEqual(registrySlugs.toSorted())
  })

  it('ends Session 4 at the Fairhaven guildhall boards and starts Session 5 with Giggles', () => {
    expect(sessions.from_fajanet_to_fairhaven.events.at(-1)?.key).toBe(refs.events.n2_e043.key)
    const session4Keys = sessions.from_fajanet_to_fairhaven.events.map(({ key }) => key)
    const shadowRealmIndex = session4Keys.indexOf(refs.events.n2_e029.key)
    expect(session4Keys.slice(shadowRealmIndex, shadowRealmIndex + 3)).toEqual([
      refs.events.n2_e029.key,
      refs.events.n2_e081.key,
      refs.events.n2_e030.key,
    ])
    const badeshIndex = session4Keys.indexOf(refs.events.n2_e040.key)
    expect(session4Keys.slice(badeshIndex, badeshIndex + 4)).toEqual([
      refs.events.n2_e040.key,
      refs.events.n2_e102.key,
      refs.events.n2_e041.key,
      refs.events.n2_e121.key,
    ])
    expect(sessions.fairhaven_shadows.events.map(({ key }) => key)).toEqual([
      refs.events.n2_e044.key,
      refs.events.n2_e060.key,
      refs.events.n2_e045.key,
      refs.events.n2_e083.key,
      refs.events.n2_e109.key,
    ])
    expect(sessionPcs(sessions.fairhaven_shadows).map((pc) => pc.slug)).toEqual([
      'devan',
      'jim',
      'swift-starblade',
      'victor-dranzig',
      'william-greenhoove',
    ])
  })

  it('keeps the Fairhaven travel sequence together in Session 4', () => {
    const session4Keys = sessions.from_fajanet_to_fairhaven.events.map(({ key }) => key)
    expect(session4Keys.slice(-11)).toEqual([
      refs.events.n2_e037.key,
      refs.events.n2_e038.key,
      refs.events.n2_e039.key,
      refs.events.n2_e040.key,
      refs.events.n2_e102.key,
      refs.events.n2_e041.key,
      refs.events.n2_e121.key,
      refs.events.n2_e042.key,
      refs.events.n2_e071.key,
      refs.events.n2_e082.key,
      refs.events.n2_e043.key,
    ])
  })

  it('starts Session 6 with Mortimer’s break-in and Session 7 with Swift taming the broom', () => {
    expect(events.n2_e043.day).toBe(12)
    expect(events.n2_e044.day).toBe(13)
    expect(events.n2_e046.day).toBe(13)
    expect(sessions.fairhaven_fallout.events.map(({ key }) => key)).toEqual([
      refs.events.n2_e086.key,
      refs.events.n2_e087.key,
      refs.events.n2_e061.key,
      refs.events.n2_e062.key,
    ])
    expect(sessions.heroes_and_rivals.events.map(({ key }) => key)).toEqual([
      refs.events.n2_e046.key,
      refs.events.n2_e063.key,
      refs.events.n2_e064.key,
      refs.events.n2_e058.key,
      refs.events.n2_e059.key,
    ])
  })

  it('records the Fall of Fairhaven as Session 8 on Campaign Day 14', () => {
    expect(sessions.the_fall_of_fairhaven.events.map(({ key }) => key)).toEqual([
      refs.events.n2_e065.key,
      refs.events.n2_e066.key,
      refs.events.n2_e067.key,
      refs.events.n2_e068.key,
      refs.events.n2_e069.key,
      refs.events.n2_e070.key,
    ])
    expect(sessionDays(sessions.the_fall_of_fairhaven)).toEqual([
      {
        day: 14,
        events: [
          events.n2_e065,
          events.n2_e066,
          events.n2_e067,
          events.n2_e068,
          events.n2_e069,
          events.n2_e070,
        ],
      },
    ])
    expect(sessionPcs(sessions.the_fall_of_fairhaven).map((pc) => pc.slug)).toEqual([
      'devan',
      'jim',
      'swift-starblade',
      'theron',
      'victor-dranzig',
    ])
  })

  it('connects Verdant Haven to the ShadowPeak elevator in Session 9', () => {
    expect(sessions.verdant_haven_to_shadowpeak.events.map(({ key }) => key)).toEqual([
      refs.events.n2_e072.key,
      refs.events.n2_e073.key,
      refs.events.n2_e088.key,
      refs.events.n2_e074.key,
      refs.events.n2_e075.key,
      refs.events.n2_e076.key,
      refs.events.n2_e077.key,
      refs.events.n2_e089.key,
      refs.events.n2_e078.key,
      refs.events.n2_e090.key,
      refs.events.n2_e079.key,
      refs.events.n2_e080.key,
    ])
    expect(sessionDays(sessions.verdant_haven_to_shadowpeak)).toEqual([
      { day: 14, events: [events.n2_e072] },
      {
        day: 15,
        events: [
          events.n2_e073,
          events.n2_e088,
          events.n2_e074,
          events.n2_e075,
          events.n2_e076,
          events.n2_e077,
          events.n2_e089,
          events.n2_e078,
        ],
      },
      { day: 16, events: [events.n2_e090, events.n2_e079, events.n2_e080] },
    ])
    expect(sessionPcs(sessions.verdant_haven_to_shadowpeak).map((pc) => pc.slug)).toEqual([
      'cassian-veyl',
      'devan',
      'jim',
      'swift-starblade',
    ])
  })

  it('starts Session 10 from the Session 9 elevator on Day 16', () => {
    expect(sessionDays(sessions.escape_from_shadowpeak)).toEqual([
      {
        day: 16,
        events: [events.n2_e047, events.n2_e084, events.n2_e048, events.n2_e049],
      },
      {
        day: 17,
        events: [
          events.n2_e050,
          events.n2_e051,
          events.n2_e085,
          events.n2_e052,
          events.n2_e053,
          events.n2_e057,
          events.n2_e054,
          events.n2_e055,
          events.n2_e056,
        ],
      },
    ])
  })

  it('continues Session 11 from the ShadowPeak escape and boards the flying bazaar', () => {
    expect(sessionDays(sessions.the_flying_bazaar)).toEqual([
      {
        day: 17,
        events: [events.n2_e091, events.n2_e092, events.n2_e093, events.n2_e094, events.n2_e095],
      },
      {
        day: 18,
        events: [events.n2_e097, events.n2_e098, events.n2_e099, events.n2_e100],
      },
      {
        day: 19,
        events: [events.n2_e096, events.n2_e101, events.n2_e110],
      },
    ])
    expect(sessionPcs(sessions.the_flying_bazaar).map((pc) => pc.slug)).toEqual([
      'cassian-veyl',
      'devan',
      'jim',
      'swift-starblade',
    ])
  })

  it('continues Session 12 through the Fiddler’s game and the arrival on Nimbus', () => {
    expect(sessionDays(sessions.the_fiddlers_game)).toEqual([
      {
        day: 20,
        events: [
          events.n2_e104,
          events.n2_e111,
          events.n2_e105,
          events.n2_e112,
          events.n2_e113,
          events.n2_e114,
          events.n2_e115,
          events.n2_e107,
          events.n2_e116,
          events.n2_e117,
          events.n2_e118,
          events.n2_e108,
          events.n2_e122,
        ],
      },
      { day: 21, events: [events.n2_e106, events.n2_e119, events.n2_e120] },
    ])
    expect(sessionPcs(sessions.the_fiddlers_game).map((pc) => pc.slug)).toEqual([
      'cassian-veyl',
      'devan',
      'jim',
      'swift-starblade',
    ])
  })

  it('returns the latest event first', () => {
    expect(sortedEvents()[0]?.data).toBe(events.n2_e120)
  })
})
