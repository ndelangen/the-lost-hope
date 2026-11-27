import { Suspense, type ComponentType } from 'react'

import type { CardSuit } from '#/definitions/card'
import type { LocationType } from '#/definitions/location'
import {
  deferredModule,
  lazyFrom,
  loadAfterPageLoad,
  type DeferredModule,
} from '#/lib/deferred-module'

/**
 * The icon of each kind of entity, as the shell and every page show them beside a name. Each kind's
 * icon set (about 245 KB together) loads on its own, so no page waits for every icon before it
 * becomes interactive.
 *
 * The server loads every set before it renders (`loadEntityIcons`), so its HTML always carries
 * the icons. While the browser hydrates, React keeps that HTML until the icon set arrives, so
 * nothing flickers. Only a reference first drawn in the browser before its set has loaded shows
 * an empty square of the icon's size for that moment.
 */

const sets = {
  card: deferredModule(() => import('#/lib/card-icons')),
  effect: deferredModule(() => import('#/lib/effect-icons')),
  event: deferredModule(() => import('#/lib/event-icons')),
  item: deferredModule(() => import('#/lib/item-icons')),
  location: deferredModule(() => import('#/lib/location-icons')),
  organization: deferredModule(() => import('#/lib/organization-icons')),
  quest: deferredModule(() => import('#/lib/quest-icons')),
  session: deferredModule(() => import('#/lib/session-icons')),
}

/** Load every icon set, so a render that follows draws every icon at once. */
export async function loadEntityIcons() {
  await Promise.all(Object.values(sets).map(({ load }) => load()))
}

// The browser fetches the remaining sets once the page has loaded, so a page opened later already
// has its icons.
loadAfterPageLoad(loadEntityIcons)

/** An icon from a set, holding its place with an empty square until the set arrives. */
function lazyIcon<S, P extends { className?: string }>(
  set: DeferredModule<S>,
  pick: (loaded: S) => ComponentType<P>,
) {
  const Icon = lazyFrom(set, pick)
  return function EntityIcon(props: P) {
    return (
      <Suspense fallback={<span aria-hidden className={`inline-block ${props.className ?? ''}`} />}>
        <Icon {...props} />
      </Suspense>
    )
  }
}

type IconProps = { icon: string; className?: string }
type OptionalIconProps = { icon?: string; className?: string }

export const CardSuitIcon = lazyIcon<
  typeof import('#/lib/card-icons'),
  { suit: CardSuit; className?: string }
>(sets.card, (set) => set.CardSuitIcon)
export const EffectIcon = lazyIcon<typeof import('#/lib/effect-icons'), IconProps>(
  sets.effect,
  (set) => set.EffectIcon,
)
export const EventMarkIcon = lazyIcon<
  typeof import('#/lib/event-icons'),
  { name: string; className?: string }
>(sets.event, (set) => set.EventMarkIcon)
export const ItemIcon = lazyIcon<typeof import('#/lib/item-icons'), IconProps>(
  sets.item,
  (set) => set.ItemIcon,
)
export const LocationIcon = lazyIcon<typeof import('#/lib/location-icons'), OptionalIconProps>(
  sets.location,
  (set) => set.LocationIcon,
)
export const LocationTypeIcon = lazyIcon<
  typeof import('#/lib/location-icons'),
  { type: LocationType; className?: string }
>(sets.location, (set) => set.LocationTypeIcon)
export const OrganizationIcon = lazyIcon<
  typeof import('#/lib/organization-icons'),
  OptionalIconProps
>(sets.organization, (set) => set.OrganizationIcon)
export const QuestIcon = lazyIcon<typeof import('#/lib/quest-icons'), IconProps>(
  sets.quest,
  (set) => set.QuestIcon,
)
export const SessionIcon = lazyIcon<typeof import('#/lib/session-icons'), OptionalIconProps>(
  sets.session,
  (set) => set.SessionIcon,
)

const LocationTypeLabel = lazyFrom<typeof import('#/lib/location-icons'), { type: LocationType }>(
  sets.location,
  ({ locationTypeLabel }) =>
    function LocationTypeText({ type }) {
      return <>{locationTypeLabel(type)}</>
    },
)

/** A location type's singular name, which lives beside the location icons. */
export function LocationTypeName({ type }: { type: LocationType }) {
  return (
    <Suspense fallback={null}>
      <LocationTypeLabel type={type} />
    </Suspense>
  )
}
