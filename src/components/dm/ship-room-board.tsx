import { LifeBuoy } from 'lucide-react'
import { useState, type ReactNode } from 'react'

import {
  shipSectors,
  sliceCount,
  type RoomFight,
  type ShipAboard,
  type ShipSectorView,
} from '#/lib/ship-rooms'
import { cn } from '#/lib/utils'

import { ShipRoomFight } from './ship-room-fight'
import { useShipRooms } from './use-ship-rooms'

const SIDE_LABEL = { port: 'Port', starboard: 'Starboard' } as const

/** One room of the vessel with the fights that happen in it. */
function RoomTile({ sector, children }: { sector: ShipSectorView; children?: ReactNode }) {
  return (
    <div className="bg-card border-border grid min-w-0 content-start gap-2 overflow-hidden rounded-xl border-2 p-3">
      <span className="min-w-0 leading-tight font-semibold break-words">{sector.name}</span>
      <span className="text-muted-foreground flex items-center gap-1 text-xs">
        {sector.escapePods ? (
          <>
            <LifeBuoy aria-hidden className="size-3.5" /> Escape pods
          </>
        ) : (
          'No escape pods'
        )}
      </span>
      {children ? <div className="grid content-start gap-3">{children}</div> : null}
    </div>
  )
}

/**
 * The vessel a scene is fought aboard as a board of its rooms, from bow to stern, with each fight
 * in the room where it happens and the button that runs it.
 */
export function ShipRoomBoard({
  sceneKey,
  ship,
  onNotes,
}: {
  sceneKey: string
  ship: ShipAboard
  /** Open the notes of a fight's beat, on pages that show them. */
  onNotes?: (fight: RoomFight) => void
}) {
  const { rooms, running, load } = useShipRooms(sceneKey, ship)
  const [deckKey, setDeckKey] = useState<string>()
  const deck = rooms.decks.find(({ deck: ref }) => ref.key === deckKey) ?? rooms.decks[0]
  const sectors = shipSectors(ship.hull)
  const slices = sliceCount(ship.hull)
  const roomFight = (fight: RoomFight, layout: 'tile' | 'bar') => (
    <ShipRoomFight
      key={fight.key}
      fight={fight}
      layout={layout}
      running={running}
      onLoad={(mode) => load(fight, mode)}
      onNotes={onNotes ? () => onNotes(fight) : undefined}
    />
  )

  return (
    <section
      aria-label={`Rooms of ${ship.name}`}
      className="border-border bg-card grid gap-4 rounded-2xl border-2 p-4"
    >
      <header className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <h2 className="text-lg leading-tight font-bold">{ship.name}</h2>
        {rooms.decks.length > 1 ? (
          <fieldset className="ml-auto flex flex-wrap items-center gap-x-3 gap-y-2">
            <legend className="sr-only">Deck</legend>
            <div className="border-border flex overflow-hidden rounded-xl border-2">
              {rooms.decks.map(({ deck: ref, name }) => (
                <label
                  key={ref.key}
                  className={cn(
                    'border-border has-focus-visible:ring-ring/50 grid h-12 cursor-pointer place-items-center border-l-2 px-4 text-base font-bold first:border-l-0 has-focus-visible:ring-3',
                    ref.key === deck?.deck.key
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted',
                  )}
                >
                  <input
                    type="radio"
                    name="ship-deck"
                    className="sr-only"
                    checked={ref.key === deck?.deck.key}
                    onChange={() => setDeckKey(ref.key)}
                  />
                  {name}
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}
      </header>

      <div
        className="grid items-stretch gap-2"
        style={{ gridTemplateColumns: `auto repeat(${slices}, minmax(0, 1fr))` }}
      >
        <span />
        {Array.from({ length: slices }, (_, slice) => (
          <span
            key={`slice-${slice + 1}`}
            className="text-muted-foreground text-xs font-semibold tracking-wide uppercase"
          >
            {slice === 0 ? 'Bow' : slice === slices - 1 ? 'Stern' : ''}
          </span>
        ))}
        {/* Starboard on top, as on the deck maps with the bow to the left. */}
        {(['starboard', 'port'] as const).map((side) => [
          <span
            key={side}
            className="text-muted-foreground rotate-180 self-center text-xs font-semibold tracking-wide uppercase [writing-mode:vertical-rl]"
          >
            {SIDE_LABEL[side]}
          </span>,
          ...sectors
            .filter((sector) => sector.side === side)
            .map((sector) => (
              <RoomTile key={sector.index} sector={sector}>
                {deck?.bySector.get(sector.index)?.map((fight) => roomFight(fight, 'tile'))}
              </RoomTile>
            )),
        ])}
      </div>

      {deck?.deckWide.length || rooms.anywhere.length ? (
        <div className="grid gap-2">
          {deck?.deckWide.length ? (
            <div className="grid gap-2">
              <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                Anywhere on this deck
              </p>
              {deck.deckWide.map((fight) => roomFight(fight, 'bar'))}
            </div>
          ) : null}
          {rooms.anywhere.length ? (
            <div className="grid gap-2">
              <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                Wherever the party is
              </p>
              {rooms.anywhere.map((fight) => roomFight(fight, 'bar'))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
