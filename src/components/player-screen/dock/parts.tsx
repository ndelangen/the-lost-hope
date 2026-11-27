import {
  ChevronLeft,
  ChevronRight,
  MonitorOff,
  MonitorUp,
  RectangleHorizontal,
  RotateCcw,
  RotateCw,
  ScrollText,
  Ship,
  type LucideIcon,
} from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'

import { openPlayerScreen } from '#/components/player-screen/use-player-screen'
import { ResponsiveImage } from '#/components/responsive-image'
import type { PlayerScreenGroup, ResolvedPlayerScreenImage } from '#/lib/player-screen'
import type { PlayerScreenRotation } from '#/lib/player-screen-state'
import { cn } from '#/lib/utils'

export const ROTATIONS: ReadonlyArray<{
  value: PlayerScreenRotation
  label: string
  Icon: LucideIcon
}> = [
  { value: -90, label: 'Left', Icon: RotateCcw },
  { value: 0, label: 'Upright', Icon: RectangleHorizontal },
  { value: 90, label: 'Right', Icon: RotateCw },
]

export const GROUP_LABEL: Record<PlayerScreenGroup, string> = {
  Handouts: 'Handout',
  Fleets: 'Fleet roster',
  Scenes: 'Scene',
  Events: 'Event',
  Maps: 'Map',
  Places: 'Place',
  Characters: 'Portrait',
  Creatures: 'Creature',
}

export const GROUPS: readonly PlayerScreenGroup[] = [
  'Handouts',
  'Fleets',
  'Scenes',
  'Events',
  'Maps',
  'Places',
  'Characters',
  'Creatures',
]

/**
 * A small preview of a picture; what the screen draws itself shows as a sheet of paper, or a ship
 * for a fleet roster.
 */
export function PlayerScreenThumb({
  src,
  group,
  className,
  ...props
}: Omit<ComponentProps<typeof ResponsiveImage>, 'src'> & {
  src: string | undefined
  group: PlayerScreenGroup
}) {
  if (src) return <ResponsiveImage src={src} className={className} {...props} />
  if (group === 'Fleets') {
    return (
      <span className={cn('grid place-items-center bg-slate-800 text-sky-200', className)}>
        <Ship className="size-1/2 max-h-8 max-w-8" aria-hidden />
      </span>
    )
  }
  return (
    <span className={cn('grid place-items-center bg-amber-100 text-amber-900', className)}>
      <ScrollText className="size-1/2 max-h-8 max-w-8" aria-hidden />
    </span>
  )
}

/** The shared look of a bordered control on a dock bar. */
export const dockButtonClass =
  'border-border hover:bg-muted flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border px-2.5 text-sm font-medium disabled:opacity-40 disabled:hover:bg-transparent'

export const dockButtonOnClass = 'border-primary bg-primary/10 text-foreground hover:bg-primary/15'

/** A small picture of a selection, or a dark tile for a blank screen. */
export function ScreenThumb({
  picture,
  className,
  fit = 'cover',
  maxWidth = 128,
}: {
  picture: ResolvedPlayerScreenImage | undefined
  className?: string
  fit?: 'cover' | 'contain'
  maxWidth?: number
}) {
  return (
    <span
      className={cn('grid shrink-0 place-items-center overflow-hidden bg-black', className)}
      aria-hidden
    >
      {picture ? (
        <PlayerScreenThumb
          src={picture.src}
          group={picture.group}
          alt=""
          sizes={`${maxWidth / 2}px`}
          maxWidth={maxWidth}
          loading="lazy"
          className={cn('size-full', fit === 'cover' ? 'object-cover' : 'object-contain')}
        />
      ) : (
        <MonitorOff className="size-4 text-white/60" />
      )}
    </span>
  )
}

/** An on/off switch for something on the player screen, lit while it is on. */
export function ToggleChip({
  pressed,
  onClick,
  Icon,
  label,
  title,
  disabled = false,
  labelClassName,
  className,
}: {
  pressed: boolean
  onClick: () => void
  Icon: LucideIcon
  label: string
  title?: string
  disabled?: boolean
  /** For bars that drop to icons when narrow; the label stays for screen readers. */
  labelClassName?: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      aria-label={label}
      title={title ?? label}
      disabled={disabled}
      className={cn(dockButtonClass, pressed && dockButtonOnClass, className)}
    >
      <Icon className="size-4 shrink-0" aria-hidden />
      <span className={labelClassName}>{label}</span>
    </button>
  )
}

/** Turns the whole player screen sideways or upright. */
export function RotationControl({
  value,
  onChange,
  labelled = false,
}: {
  value: PlayerScreenRotation
  onChange: (value: PlayerScreenRotation) => void
  /** Spell the options out; otherwise they are icons with tooltips. */
  labelled?: boolean
}) {
  return (
    <fieldset className="border-border flex h-9 shrink-0 items-center rounded-lg border p-0.5">
      <legend className="sr-only">Turn the picture</legend>
      {ROTATIONS.map(({ value: option, label, Icon }) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={value === option}
          aria-label={option === 0 ? 'Upright' : `Turned ${label.toLowerCase()}`}
          title={option === 0 ? 'Upright' : `Turn the picture ${label.toLowerCase()}`}
          className={cn(
            'flex h-full items-center justify-center gap-1.5 rounded-md text-sm font-medium',
            labelled ? 'px-2.5' : 'w-8',
            value === option
              ? 'bg-primary/15 text-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          )}
        >
          <Icon className="size-4" aria-hidden />
          {labelled ? label : null}
        </button>
      ))}
    </fieldset>
  )
}

/** Back and forward through what the player screen has shown. */
export function StepButtons({
  canBack,
  canForward,
  onStep,
  forwardTitle = 'Forward (])',
}: {
  canBack: boolean
  canForward: boolean
  onStep: (direction: -1 | 1) => void
  forwardTitle?: string
}) {
  const buttonClass =
    'hover:bg-muted grid size-9 shrink-0 place-items-center rounded-lg disabled:opacity-35 disabled:hover:bg-transparent'
  return (
    <span className="flex shrink-0 items-center">
      <button
        type="button"
        onClick={() => onStep(-1)}
        disabled={!canBack}
        aria-label="Back: show the previous picture"
        title="Back ([)"
        className={buttonClass}
      >
        <ChevronLeft className="size-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => onStep(1)}
        disabled={!canForward}
        aria-label="Forward: show the next picture"
        title={forwardTitle}
        className={buttonClass}
      >
        <ChevronRight className="size-5" aria-hidden />
      </button>
    </span>
  )
}

/** Whether a player screen window is open, and the way to open one or bring it forward. */
export function ScreenButton({
  present,
  labelClassName,
}: {
  present: boolean
  labelClassName?: string
}) {
  const label = present ? 'Screen open' : 'Open screen'
  return (
    <button
      type="button"
      onClick={() => void openPlayerScreen()}
      aria-label={present ? 'Player screen is open. Bring it forward' : 'Open the player screen'}
      title={
        present
          ? 'The player screen is open. Click to bring it forward.'
          : 'No player screen is open. Click to open it on the players’ monitor.'
      }
      className={cn(
        'flex h-9 shrink-0 items-center gap-2 rounded-lg px-2.5 text-sm font-medium',
        present
          ? 'border-border hover:bg-muted border'
          : 'bg-primary text-primary-foreground hover:bg-primary/90',
      )}
    >
      {present ? (
        <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
      ) : (
        <MonitorUp className="size-4" aria-hidden />
      )}
      <span className={labelClassName}>{label}</span>
    </button>
  )
}

export function BarDivider() {
  return <span className="bg-border mx-0.5 h-6 w-px shrink-0" aria-hidden />
}

/** A row of tabs, each opening one concern of the panel. */
export function DockTabs<T extends string>({
  tabs,
  active,
  onChange,
  label,
  trailing,
}: {
  tabs: ReadonlyArray<{ id: T; label: string; Icon: LucideIcon; badge?: ReactNode }>
  active: T
  onChange: (tab: T) => void
  label: string
  trailing?: ReactNode
}) {
  return (
    <div className="border-border flex items-center gap-1 border-b p-1.5">
      <div role="tablist" aria-label={label} className="flex min-w-0 flex-1 items-center gap-1">
        {tabs.map(({ id, label: tabLabel, Icon, badge }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active === id}
            onClick={() => onChange(id)}
            className={cn(
              'flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium',
              active === id
                ? 'bg-primary/10 text-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {tabLabel}
            {badge}
          </button>
        ))}
      </div>
      {trailing}
    </div>
  )
}
