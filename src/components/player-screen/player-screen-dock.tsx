import {
  Captions,
  ChevronUp,
  Crosshair,
  Grid3x3,
  Images,
  ListOrdered,
  Maximize2,
  MonitorCog,
  MonitorOff,
  MonitorPlay,
  RotateCcwClock,
  ScrollText,
  X,
} from 'lucide-react'
import { type ReactNode, useRef, useState } from 'react'

import { resolvePlayerScreenImage } from '#/lib/player-screen'
import { nameOnPlayerScreen, pictureBehindBlank } from '#/lib/player-screen-dock'
import {
  canStepPlayerScreen,
  playerScreenImageId,
  samePlayerScreenImage,
} from '#/lib/player-screen-state'
import { cn } from '#/lib/utils'

import { HistoryList } from './dock/history-list'
import {
  BarDivider,
  DockTabs,
  RotationControl,
  ScreenButton,
  ScreenThumb,
  StepButtons,
  ToggleChip,
  dockButtonClass,
  dockButtonOnClass,
} from './dock/parts'
import { PicturePicker } from './dock/picture-picker'
import { ScreenMonitor } from './dock/screen-monitor'
import { useDismiss, useDockController, useDockShortcuts } from './dock/use-dock-controller'
import { GridControls } from './grid-controls'
import { JimsLetterWordsControl } from './jims-letter-words-control'
import { PointingView } from './pointing-view'

type Drawer = 'pictures' | 'history' | 'screen' | 'grid' | 'point' | 'letter'

/**
 * The DM's control for what the players' monitor shows, from any page: a small bar that says what
 * the players see, blanks it and points at it. Everything else opens in a drawer above it.
 */
export function PlayerScreenDock() {
  const dock = useDockController()
  const { state, showing, live, surface } = dock
  const [drawer, setDrawer] = useState<Drawer | null>(null)
  const [lastDrawer, setLastDrawer] = useState<Drawer>('pictures')
  const rootRef = useRef<HTMLDivElement>(null)
  useDismiss(rootRef, drawer !== null, () => setDrawer(null))
  useDockShortcuts({
    '[': () => dock.step(-1),
    ']': () => dock.step(1),
    p: () => dock.setPointing((value) => !value),
    '.': dock.toggleBlank,
  })

  const isLetter = showing?.image === 'handout' && showing.ref.key === 'jims_letter'
  // The letter's drawer goes with the letter; without it the drawer falls back to the pictures.
  const open: Drawer | null = drawer === 'letter' && !isLetter ? 'pictures' : drawer
  const openDrawer = (next: Drawer | null) => {
    if (next) setLastDrawer(next)
    setDrawer(next)
  }
  const toggle = (next: Drawer) => openDrawer(open === next ? null : next)
  const behind = pictureBehindBlank(state)
  const behindName = behind ? resolvePlayerScreenImage(behind)?.name : undefined
  const wide = open === 'grid' || open === 'point'

  return (
    <div
      ref={rootRef}
      className="fixed right-4 bottom-4 z-[150] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2"
    >
      {dock.pointing && surface ? (
        <PointingView {...surface} onClose={() => dock.setPointing(false)} />
      ) : null}

      {open ? (
        <section
          aria-label="Player screen"
          className={cn(
            'bg-card text-card-foreground border-border flex max-h-[calc(100dvh-7rem)] flex-col overflow-hidden rounded-2xl border shadow-2xl',
            wide ? 'w-[min(48rem,calc(100vw-2rem))]' : 'w-[min(36rem,calc(100vw-2rem))]',
            open === 'pictures' && 'h-[42rem]',
          )}
        >
          <DockTabs
            label="Player screen drawers"
            active={open}
            onChange={openDrawer}
            tabs={[
              { id: 'pictures', label: 'Pictures', Icon: Images },
              { id: 'history', label: 'History', Icon: RotateCcwClock },
              { id: 'screen', label: 'Screen', Icon: MonitorCog },
              { id: 'grid', label: 'Grid', Icon: Grid3x3 },
              { id: 'point', label: 'Point', Icon: Crosshair },
              ...(isLetter ? [{ id: 'letter' as const, label: 'Letter', Icon: ScrollText }] : []),
            ]}
            trailing={
              <button
                type="button"
                onClick={() => setDrawer(null)}
                aria-label="Close the drawer"
                title="Close (Esc)"
                className="hover:bg-muted grid size-9 shrink-0 place-items-center rounded-lg"
              >
                <X className="size-5" aria-hidden />
              </button>
            }
          />

          {open === 'pictures' ? (
            <PicturePicker
              mark={(selection) => (samePlayerScreenImage(selection, showing) ? 'live' : undefined)}
              onPick={dock.show}
              pickLabel={(option) =>
                `Show ${option.name} (${option.group.toLowerCase()}) to the players`
              }
              hint="A click puts the picture on the player screen."
            />
          ) : null}

          {open === 'history' ? (
            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3">
              <div className="flex items-center gap-2">
                <StepButtons
                  canBack={canStepPlayerScreen(state, -1)}
                  canForward={canStepPlayerScreen(state, 1)}
                  onStep={dock.step}
                />
                <p className="text-muted-foreground text-xs">
                  Step back and forward with [ and ], or click any picture to show it again.
                </p>
              </div>
              <HistoryList state={state} onJump={dock.jump} onClear={dock.clearHistory} />
            </div>
          ) : null}

          {open === 'screen' ? (
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3">
              <SettingRow label="Names" hint="Names show under pictures of what the party has met.">
                <ToggleChip
                  pressed={state.captions}
                  onClick={() => dock.setCaptions(!state.captions)}
                  Icon={Captions}
                  label={state.captions ? 'Names on' : 'Names off'}
                />
              </SettingRow>
              <SettingRow
                label="Turn order"
                hint="The running fight’s turn order over the picture."
              >
                <ToggleChip
                  pressed={state.turnOrder}
                  onClick={() => dock.setTurnOrder(!state.turnOrder)}
                  Icon={ListOrdered}
                  label={state.turnOrder ? 'Turn order on' : 'Turn order off'}
                />
              </SettingRow>
              <SettingRow label="Turn" hint="Turn the whole screen for a monitor lying sideways.">
                <RotationControl value={state.rotation} onChange={dock.setRotation} labelled />
              </SettingRow>
            </div>
          ) : null}

          {open === 'grid' ? (
            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              {showing && surface ? (
                <GridControls
                  key={playerScreenImageId(showing)}
                  grid={surface.grid}
                  src={surface.src}
                  width={surface.width}
                  height={surface.height}
                  onChange={(change) => dock.changeGrid(showing, change)}
                />
              ) : (
                <EmptyDrawer>Show a map or another picture to lay a grid over it.</EmptyDrawer>
              )}
            </div>
          ) : null}

          {open === 'point' ? (
            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3">
              {surface ? (
                <>
                  <div className="flex items-center gap-2">
                    <p className="text-muted-foreground min-w-0 flex-1 text-xs">
                      Click the picture to ping a spot. Hold and drag for a laser pointer.
                    </p>
                    <button
                      type="button"
                      onClick={() => dock.setPointing(true)}
                      className={dockButtonClass}
                    >
                      <Maximize2 className="size-4" aria-hidden />
                      Big view (P)
                    </button>
                  </div>
                  <ScreenMonitor
                    tone="live"
                    picture={live}
                    surface={surface}
                    name={live ? nameOnPlayerScreen(state.captions, live) : undefined}
                    rotation={state.rotation}
                    turnOrder={state.turnOrder}
                    empty="The player screen is blank."
                    className="aspect-video w-full"
                  />
                </>
              ) : (
                <EmptyDrawer>Show a map or another picture to point at it.</EmptyDrawer>
              )}
            </div>
          ) : null}

          {open === 'letter' ? (
            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              <JimsLetterWordsControl />
            </div>
          ) : null}
        </section>
      ) : null}

      <div className="bg-card text-card-foreground border-border flex max-w-full items-center gap-1.5 rounded-2xl border p-1.5 shadow-lg">
        <button
          type="button"
          onClick={() => toggle('pictures')}
          aria-expanded={open === 'pictures'}
          aria-label={`Players see ${live ? live.name : 'a blank screen'}. Pick a picture`}
          title={live ? `${live.name}. Click to pick another picture.` : 'Pick a picture to show'}
          className={cn(
            'hover:bg-muted flex h-10 min-w-0 items-center gap-2 rounded-xl pr-3 pl-1',
            open === 'pictures' && 'bg-muted',
          )}
        >
          <ScreenThumb
            picture={live}
            className={cn('h-8 w-12 rounded-lg ring-2', live ? 'ring-emerald-500' : 'ring-border')}
          />
          <span className="flex min-w-0 flex-col items-start leading-tight">
            <span className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
              Players see
            </span>
            <span className="max-w-40 truncate text-sm font-semibold">
              {live ? live.name : 'Nothing (blank)'}
            </span>
          </span>
        </button>

        <BarDivider />

        <button
          type="button"
          onClick={dock.toggleBlank}
          disabled={!showing && !behind}
          aria-pressed={!showing}
          aria-label={showing ? 'Blank the screen' : 'Bring the picture back'}
          title={
            showing
              ? 'Blank the screen (.)'
              : behindName
                ? `Bring back ${behindName} (.)`
                : 'The screen is blank'
          }
          className={cn(dockButtonClass, !showing && behind && dockButtonOnClass)}
        >
          {showing || !behind ? (
            <MonitorOff className="size-4" aria-hidden />
          ) : (
            <MonitorPlay className="size-4" aria-hidden />
          )}
          {showing || !behind ? 'Blank' : 'Bring back'}
        </button>
        <ToggleChip
          pressed={open === 'point'}
          onClick={() => toggle('point')}
          disabled={!surface}
          Icon={Crosshair}
          label="Point"
          title={surface ? 'Point at the picture (P for the big view)' : 'Show a picture to point'}
        />
        {state.turnOrder ? (
          // Shown only while it is on, so the overlay is never stuck on the players' screen unseen.
          <button
            type="button"
            onClick={() => dock.setTurnOrder(false)}
            aria-label="Take the turn order off the screen"
            title="The turn order is on the players’ screen. Click to take it off."
            className={cn(dockButtonClass, dockButtonOnClass)}
          >
            <ListOrdered className="size-4" aria-hidden />
            Turn order
            <X className="size-3.5" aria-hidden />
          </button>
        ) : null}

        <BarDivider />

        <ScreenButton
          present={dock.present}
          labelClassName={dock.present ? 'sr-only' : undefined}
        />
        <button
          type="button"
          onClick={() => openDrawer(open ? null : lastDrawer)}
          aria-expanded={open !== null}
          aria-label={open ? 'Close the player screen drawer' : 'More player screen controls'}
          title={open ? 'Close' : 'Pictures, history, names, turn order, turning and the grid'}
          className={cn(dockButtonClass, 'px-2', open && dockButtonOnClass)}
        >
          <ChevronUp
            className={cn('size-4 transition-transform', open && 'rotate-180')}
            aria-hidden
          />
        </button>
      </div>
    </div>
  )
}

/** One setting in the Screen drawer: its name, what it does, and its control. */
function SettingRow({
  label,
  hint,
  children,
}: {
  label: string
  hint: string
  children: ReactNode
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-muted-foreground text-xs">{hint}</p>
      </div>
      {children}
    </div>
  )
}

function EmptyDrawer({ children }: { children: ReactNode }) {
  return <p className="text-muted-foreground py-8 text-center text-sm">{children}</p>
}
