import type {
  EventKey,
  LocationKey,
  NpcKey,
  OrganizationKey,
  PcKey,
  QuestKey,
  SessionKey,
} from '#/data/registry-keys.ts'
import type { EntityKind, EntityRef } from '#/definitions/kind.ts'

function ns<K extends string>(kind: EntityKind): { [P in K]: EntityRef } {
  return new Proxy({} as { [P in K]: EntityRef }, {
    get(_target, prop) {
      if (typeof prop !== 'string') return undefined
      return { ref: kind, key: prop }
    },
  })
}

export const refs = {
  events: ns<EventKey>('event'),
  npcs: ns<NpcKey>('npc'),
  pcs: ns<PcKey>('pc'),
  locations: ns<LocationKey>('location'),
  quests: ns<QuestKey>('quest'),
  sessions: ns<SessionKey>('session'),
  organizations: ns<OrganizationKey>('organization'),
}
