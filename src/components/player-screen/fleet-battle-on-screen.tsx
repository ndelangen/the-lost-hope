import { useEffect, useMemo, useRef, useState } from 'react'

import { useFleetRoster } from '#/components/player-screen/use-fleet-roster'
import { ResponsiveImage } from '#/components/responsive-image'
import { refs } from '#/data/generated/refs'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import {
  add,
  battleCounts,
  battlePlan,
  captionAt,
  legendAt,
  clamp01,
  curve,
  mulberry32,
  scale,
  shipPose,
  sub,
  type BattlePlan,
  type BattleShip,
  type LegendRow,
  type LegendStatus,
  type Vec,
} from '#/lib/fleet-battle'
import type { FleetRoster } from '#/lib/fleet-roster'
import { ItemIcon, resolveItemIcon } from '#/lib/item-icons'
import { publicAssetUrl, responsiveImageFor } from '#/lib/public-media'
import { cn } from '#/lib/utils'

/**
 * The battle is drawn over the region map of the sky islands. The fleet launches from Tempest, the
 * lines meet over Skynet, and the flying fortress waits off the map's top-left corner, where the
 * battle view is zoomed out far enough to show it. Positions are in the region map's pixels.
 */
const REGION = refs.locations.three_sky_kingdoms
const HOME = refs.locations.tempest
const CENTRE = refs.locations.skynet
const FORTRESS: Vec = { x: -360, y: -230 }
/** How wide the fortress art is drawn, in map pixels. */
const FORTRESS_SIZE = 460
/** The part of the map the radar shows: the whole region with a wide margin of open sky. */
const VIEW = { x: -640, y: -430, width: 2760, height: 1840 }
const CLOUDS = '/assets/player-screen/fleet-battle-clouds.jpg'
const FORTRESS_ART = '/assets/player-screen/flying-fortress.jpg'
const RADAR_FILTER =
  '[filter:grayscale(1)_sepia(1)_hue-rotate(125deg)_saturate(1.4)_brightness(0.42)_contrast(1.35)]'

const SIDE_COLOURS = ['#38bdf8', '#f43f5e', '#f59e0b']
const RADAR = 'rgb(94 234 212'

type Located = { at?: [number, number]; map: { url: string; width: number; height: number } }

function located(key: string): Located {
  return SOURCE_REGISTRIES.location[key as keyof typeof SOURCE_REGISTRIES.location] as Located
}

function point(key: string): Vec {
  const [x, y] = located(key).at ?? [0, 0]
  return { x, y }
}

/**
 * The fleet's battle as a live radar plot on the player screen: the ships launch, change sides one
 * by one, and fight it out with cannon hails and heavy shots until only the survivors remain.
 * Press R on the player screen to play it again.
 */
export function FleetBattleOnScreen({ owner }: { owner: string }) {
  const roster = useFleetRoster(owner)
  return roster ? <FleetBattle roster={roster} /> : null
}

function FleetBattle({ roster }: { roster: FleetRoster }) {
  const plan = useMemo(
    () =>
      battlePlan(roster, { home: point(HOME.key), centre: point(CENTRE.key), target: FORTRESS }),
    [roster],
  )
  const map = located(REGION.key).map
  const canvas = useRef<HTMLCanvasElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const size = useElementSize(frame)
  const clock = useBattleClock(plan.times.end)
  const images = useAvatarImages(plan)
  const icons = useRef(new Map<string, HTMLImageElement>())
  const [hud, setHud] = useState(0)

  const view = useMemo(() => fitView(size), [size])

  useEffect(() => {
    const element = canvas.current
    const context = element?.getContext('2d')
    if (!element || !context || size.width === 0) return
    const ratio = window.devicePixelRatio || 1
    element.width = Math.round(size.width * ratio)
    element.height = Math.round(size.height * ratio)
    let handle = 0
    let lastHud = 0
    const draw = () => {
      const time = clock.now()
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      drawBattle(context, plan, view, time, images.current, icons.current, size)
      if (time - lastHud > 0.1 || time >= plan.times.end) {
        lastHud = time
        setHud(time)
      }
      handle = requestAnimationFrame(draw)
    }
    handle = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(handle)
  }, [plan, view, size, clock, images, icons])

  const caption = captionAt(plan, hud)
  const counts = battleCounts(plan, hud, roster.sides.length)
  const legend = legendAt(plan, hud)
  const cloudsUrl = responsiveImageFor(CLOUDS)?.candidates.at(-1)?.src

  return (
    <div className="absolute inset-0 flex overflow-hidden bg-[rgb(3_10_14)]">
      <IconSprites icons={icons} plan={plan} />
      <div ref={frame} className="relative min-w-0 flex-1 overflow-hidden">
        {cloudsUrl ? (
          <div
            aria-hidden
            className={`absolute inset-0 bg-cover bg-center opacity-45 ${RADAR_FILTER}`}
            style={{ backgroundImage: `url(${cloudsUrl})` }}
          />
        ) : null}
        <ResponsiveImage
          src={map.url}
          alt=""
          sizes="70vw"
          loading="eager"
          className={`absolute max-w-none [mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_76%)] opacity-90 ${RADAR_FILTER}`}
          style={{
            left: view.offset.x,
            top: view.offset.y,
            width: map.width * view.scale,
            height: map.height * view.scale,
          }}
        />
        <ResponsiveImage
          src={FORTRESS_ART}
          alt=""
          sizes="30vw"
          loading="eager"
          className="absolute max-w-none mix-blend-lighten [filter:saturate(0.75)_brightness(0.9)]"
          style={{
            left: view.offset.x + (FORTRESS.x - FORTRESS_SIZE / 2) * view.scale,
            top: view.offset.y + (FORTRESS.y - FORTRESS_SIZE / 2) * view.scale,
            width: FORTRESS_SIZE * view.scale,
            height: FORTRESS_SIZE * view.scale,
          }}
        />
        <canvas ref={canvas} className="absolute inset-0 size-full" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgb(0_0_0/0.18)_0px,rgb(0_0_0/0.18)_1px,transparent_1px,transparent_3px)] mix-blend-multiply"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgb(0_0_0/0.7)_100%)]"
        />

        <div className="absolute bottom-[4vh] left-[2.5vw] font-mono text-teal-200/90 uppercase">
          <p className="text-[clamp(0.8rem,1.6vh,1.3rem)] tracking-[0.35em] text-teal-300/60">
            Fleet track · live
          </p>
          <p className="mt-[0.6vh] text-[clamp(1.4rem,3.6vh,3rem)] font-semibold tracking-[0.12em] [text-shadow:0_0_24px_rgb(45_212_191/0.6)]">
            {roster.owner.name}
          </p>
          <p className="mt-[0.4vh] text-[clamp(0.8rem,1.6vh,1.3rem)] tracking-[0.3em] text-teal-300/60 tabular-nums">
            T+{formatClock(hud)}
          </p>
        </div>

        {caption ? (
          <p
            key={caption.text}
            className="fleet-caption absolute inset-x-0 top-[4vh] text-center font-mono text-[clamp(1.2rem,3.2vh,2.8rem)] font-semibold tracking-[0.18em] text-amber-200 uppercase [text-shadow:0_0_30px_rgb(251_191_36/0.55)]"
          >
            {caption.text}
          </p>
        ) : null}
      </div>

      <FleetLegend roster={roster} rows={legend} counts={counts} />
    </div>
  )
}

const STATUS_LABEL: Record<LegendStatus, string> = {
  docked: 'Docked',
  'in service': 'In service',
  destroyed: 'Destroyed',
}

/** Every ship by name, grouped under the side it flies for now, with whether it still fights. */
function FleetLegend({
  roster,
  rows,
  counts,
}: {
  roster: FleetRoster
  rows: readonly LegendRow[]
  counts: { flying: number[]; lost: number }
}) {
  return (
    <aside
      aria-label="Legend"
      className="relative z-10 flex w-[min(30vw,34rem)] shrink-0 flex-col gap-[1.6vh] overflow-hidden border-l border-teal-400/20 bg-[rgb(4_14_20/0.92)] px-[1.4vw] py-[3vh] font-mono uppercase"
    >
      <p className="text-[clamp(0.75rem,1.5vh,1.2rem)] tracking-[0.35em] text-teal-300/60">
        Legend · lost {counts.lost}
      </p>
      {roster.sides.map((side, index) => {
        const ships = rows.filter((row) => row.side === index)
        const colour = SIDE_COLOURS[index]!
        return (
          <section key={side.key} className="flex min-h-0 flex-col gap-[0.5vh]">
            <h2
              className="flex items-baseline justify-between gap-[1vw] border-b pb-[0.4vh] text-[clamp(0.9rem,2vh,1.6rem)] font-semibold tracking-[0.14em]"
              style={{ color: colour, borderColor: withAlpha(colour, 0.35) }}
            >
              <span className="truncate">{side.name}</span>
              <span className="tabular-nums">{counts.flying[index]}</span>
            </h2>
            <ul className="grid gap-[0.25vh]">
              {ships.map((row) => (
                <li
                  key={row.key}
                  className={cn(
                    'flex items-center gap-[0.6vw] text-[clamp(0.7rem,1.45vh,1.15rem)] tracking-[0.06em] transition-opacity duration-500',
                    row.status === 'destroyed' && 'opacity-40',
                    row.status === 'docked' && 'opacity-30',
                  )}
                >
                  <span
                    className="grid size-[1.7em] shrink-0 place-items-center rounded-full border"
                    style={{ borderColor: colour, color: 'white' }}
                  >
                    <ItemIcon icon={row.icon} className="size-[1.05em]" />
                  </span>
                  <span
                    className={cn(
                      'min-w-0 flex-1 truncate text-white/90',
                      row.status === 'destroyed' && 'line-through',
                    )}
                  >
                    {row.name}
                  </span>
                  <span
                    className="shrink-0 text-[0.85em] tracking-[0.12em]"
                    style={{
                      color:
                        row.status === 'destroyed'
                          ? 'rgb(255 255 255 / 0.6)'
                          : row.status === 'docked'
                            ? 'rgb(255 255 255 / 0.5)'
                            : colour,
                    }}
                  >
                    {row.turned && row.status !== 'destroyed' ? 'Turned · ' : ''}
                    {STATUS_LABEL[row.status]}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </aside>
  )
}

/**
 * The ships' icons, rendered once off screen so the radar can paint them: each icon's SVG is turned
 * into an image the canvas can draw.
 */
function IconSprites({
  icons,
  plan,
}: {
  icons: React.RefObject<Map<string, HTMLImageElement>>
  plan: BattlePlan
}) {
  const holder = useRef<HTMLDivElement>(null)
  const unique = useMemo(() => [...new Set(plan.ships.map((ship) => ship.icon))], [plan])
  useEffect(() => {
    const element = holder.current
    if (!element) return
    for (const svg of element.querySelectorAll<SVGElement>('svg[data-icon]')) {
      const id = svg.dataset.icon!
      if (icons.current.has(id)) continue
      const clone = svg.cloneNode(true) as SVGElement
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      clone.setAttribute('width', '96')
      clone.setAttribute('height', '96')
      clone.setAttribute('fill', 'white')
      clone.setAttribute('color', 'white')
      const image = new Image()
      image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(clone.outerHTML)}`
      icons.current.set(id, image)
    }
  }, [unique, icons])
  return (
    <div ref={holder} aria-hidden className="pointer-events-none absolute size-0 overflow-hidden">
      {unique.map((icon) => (
        <SpriteIcon key={icon} icon={icon} />
      ))}
    </div>
  )
}

function SpriteIcon({ icon }: { icon: string }) {
  const Icon = resolveItemIcon(icon)
  return <Icon data-icon={icon} />
}

type View = { scale: number; offset: Vec }

function fitView(size: { width: number; height: number }): View {
  const factor = Math.min(size.width / VIEW.width, size.height / VIEW.height) || 0
  return {
    scale: factor,
    offset: {
      x: (size.width - VIEW.width * factor) / 2 - VIEW.x * factor,
      y: (size.height - VIEW.height * factor) / 2 - VIEW.y * factor,
    },
  }
}

const toScreen = (view: View, at: Vec): Vec => add(scale(at, view.scale), view.offset)

function drawBattle(
  context: CanvasRenderingContext2D,
  plan: BattlePlan,
  view: View,
  time: number,
  avatars: ReadonlyMap<string, HTMLImageElement>,
  icons: ReadonlyMap<string, HTMLImageElement>,
  size: { width: number; height: number },
) {
  context.clearRect(0, 0, size.width, size.height)
  const unitPx = view.scale
  const centre = toScreen(view, plan.geometry.centre)
  const boot = clamp01(time / 1.6)

  // Range rings, bearings and the sweep.
  context.save()
  context.globalAlpha = boot
  context.strokeStyle = `${RADAR} / 0.14)`
  context.lineWidth = 1
  for (let ring = 1; ring <= 6; ring += 1) {
    context.beginPath()
    context.arc(centre.x, centre.y, ring * 170 * unitPx, 0, Math.PI * 2)
    context.stroke()
  }
  for (let bearing = 0; bearing < 12; bearing += 1) {
    const angle = (bearing / 12) * Math.PI * 2
    context.beginPath()
    context.moveTo(centre.x, centre.y)
    context.lineTo(
      centre.x + Math.cos(angle) * 1100 * unitPx,
      centre.y + Math.sin(angle) * 1100 * unitPx,
    )
    context.stroke()
  }
  const sweep = context.createConicGradient(time * 1.4, centre.x, centre.y)
  sweep.addColorStop(0, `${RADAR} / 0.22)`)
  sweep.addColorStop(0.07, `${RADAR} / 0.04)`)
  sweep.addColorStop(0.12, `${RADAR} / 0)`)
  sweep.addColorStop(1, `${RADAR} / 0)`)
  context.fillStyle = sweep
  context.beginPath()
  context.arc(centre.x, centre.y, 1100 * unitPx, 0, Math.PI * 2)
  context.fill()
  context.restore()

  drawLandmark(context, toScreen(view, plan.geometry.home), 'Tempest', time, false)
  drawLandmark(
    context,
    add(toScreen(view, plan.geometry.target), { x: 0, y: FORTRESS_SIZE * view.scale * 0.42 }),
    'Flying fortress',
    time * 0.5,
    true,
  )

  const poses = new Map(plan.ships.map((ship) => [ship.key, shipPose(plan, ship, time)]))

  // The path each ship has sailed, fading with age.
  for (const ship of plan.ships) {
    const pose = poses.get(ship.key)!
    if (pose.state === 'hidden') continue
    drawTrail(context, plan, ship, view, time)
  }

  drawVolleys(context, plan, view, time)

  for (const ship of plan.ships) {
    drawShip(context, plan, ship, poses.get(ship.key)!, view, time, icons)
  }
  for (const ship of plan.ships) drawExplosion(context, ship, poses.get(ship.key)!, view, time)
  drawMarkers(context, plan, poses, view, time, avatars)

  // A flash across the screen as each ship goes up.
  for (const ship of plan.ships) {
    if (ship.lostAt === undefined) continue
    const since = time - ship.lostAt
    if (since < 0 || since > 0.5) continue
    context.fillStyle = `rgb(255 170 80 / ${0.16 * (1 - since / 0.5)})`
    context.fillRect(0, 0, size.width, size.height)
  }
}

function drawLandmark(
  context: CanvasRenderingContext2D,
  at: Vec,
  label: string,
  time: number,
  hostile: boolean,
) {
  const colour = hostile ? 'rgb(190 242 100' : RADAR
  context.save()
  context.strokeStyle = `${colour} / 0.7)`
  context.lineWidth = 1.5
  const pulse = (time * 0.6) % 1
  context.beginPath()
  context.arc(at.x, at.y, 10 + pulse * 30, 0, Math.PI * 2)
  context.strokeStyle = `${colour} / ${0.5 * (1 - pulse)})`
  context.stroke()
  context.font = '600 13px ui-monospace, SFMono-Regular, Menlo, monospace'
  context.fillStyle = `${colour} / 0.85)`
  context.textAlign = 'center'
  context.fillText(label.toUpperCase().split('').join(' '), at.x, at.y + 46)
  context.restore()
}

function drawTrail(
  context: CanvasRenderingContext2D,
  plan: BattlePlan,
  ship: BattleShip,
  view: View,
  time: number,
) {
  const step = 0.2
  const start = ship.launchAt
  const end = ship.lostAt === undefined ? time : Math.min(time, ship.lostAt)
  // Wrecks' trails fade away after they go down.
  const fade = ship.lostAt === undefined ? 1 : 1 - clamp01((time - ship.lostAt) / 3)
  if (end - start < step || fade <= 0) return
  context.save()
  context.lineCap = 'round'
  let previous = shipPose(plan, ship, start)
  for (let at = start + step; at <= end; at += step) {
    const pose = shipPose(plan, ship, at)
    const age = (time - at) / 14
    const alpha = 0.55 * (1 - clamp01(age)) * fade
    if (alpha > 0.01) {
      const from = toScreen(view, previous.pos)
      const to = toScreen(view, pose.pos)
      context.strokeStyle = withAlpha(SIDE_COLOURS[pose.side]!, alpha)
      context.lineWidth = Math.max(1.5, 3 * view.scale * 2)
      context.beginPath()
      context.moveTo(from.x, from.y)
      context.lineTo(to.x, to.y)
      context.stroke()
    }
    previous = pose
  }
  context.restore()
}

function drawShip(
  context: CanvasRenderingContext2D,
  plan: BattlePlan,
  ship: BattleShip,
  pose: ReturnType<typeof shipPose>,
  view: View,
  time: number,
  icons: ReadonlyMap<string, HTMLImageElement>,
) {
  if (pose.state === 'hidden') return
  const at = toScreen(view, pose.pos)
  const radius = Math.max(11, 22 * view.scale * 1.6)
  const colour = SIDE_COLOURS[pose.side]!
  const turning = ship.turnAt !== undefined && time >= ship.turnAt && time < ship.turnAt + 0.6
  const icon = icons.get(ship.icon)
  context.save()
  context.translate(at.x, at.y)
  if (pose.state === 'wreck') {
    context.globalAlpha = 1 - pose.sinking * 0.7
    context.fillStyle = 'rgb(15 23 42 / 0.8)'
    context.strokeStyle = 'rgb(255 255 255 / 0.35)'
    context.lineWidth = 1.5
    context.beginPath()
    context.arc(0, 0, radius * 0.8, 0, Math.PI * 2)
    context.fill()
    context.stroke()
    if (icon?.complete) {
      context.globalAlpha *= 0.35
      context.drawImage(icon, -radius * 0.5, -radius * 0.5, radius, radius)
    }
    context.restore()
    return
  }
  // Heading: a pointer on the rim of the badge.
  const angle = Math.atan2(pose.heading.y, pose.heading.x)
  context.save()
  context.rotate(angle)
  context.fillStyle = colour
  context.beginPath()
  context.moveTo(radius + 9, 0)
  context.lineTo(radius - 1, -6)
  context.lineTo(radius - 1, 6)
  context.closePath()
  context.fill()
  context.restore()
  context.shadowColor = turning ? 'white' : colour
  context.shadowBlur = turning ? 34 : 16
  context.fillStyle = 'rgb(8 15 28 / 0.92)'
  context.strokeStyle = turning ? 'white' : colour
  context.lineWidth = 2.5
  context.beginPath()
  context.arc(0, 0, radius, 0, Math.PI * 2)
  context.fill()
  context.stroke()
  context.shadowBlur = 0
  if (icon?.complete && icon.naturalWidth > 0) {
    context.drawImage(icon, -radius * 0.62, -radius * 0.62, radius * 1.24, radius * 1.24)
  }
  context.restore()
  // A muzzle flash as each volley leaves.
  for (const volley of plan.volleys) {
    if (volley.from !== ship.key) continue
    const since = time - volley.at
    if (since < 0 || since > 0.12) continue
    context.fillStyle = `rgb(253 224 71 / ${0.7 * (1 - since / 0.12)})`
    context.beginPath()
    context.arc(at.x, at.y, radius * 1.15, 0, Math.PI * 2)
    context.fill()
  }
}

function drawVolleys(
  context: CanvasRenderingContext2D,
  plan: BattlePlan,
  view: View,
  time: number,
) {
  const byKey = new Map(plan.ships.map((ship) => [ship.key, ship]))
  for (const volley of plan.volleys) {
    const since = time - volley.at
    if (since < 0 || since > volley.flight + 0.35) continue
    const from = shipPose(plan, byKey.get(volley.from)!, volley.at).pos
    const to = shipPose(plan, byKey.get(volley.to)!, volley.at + volley.flight).pos
    const random = mulberry32(volley.seed)
    if (volley.kind === 'heavy') {
      const progress = since / volley.flight
      if (progress <= 1) {
        for (let trail = 6; trail >= 0; trail -= 1) {
          const k = clamp01(progress - trail * 0.03)
          const at = toScreen(view, curve(from, to, k, 0.35))
          const radius = (trail === 0 ? 8 : 6 - trail * 0.6) * Math.max(1, view.scale * 1.4)
          context.fillStyle =
            trail === 0 ? 'rgb(255 247 220)' : `rgb(251 146 60 / ${0.5 * (1 - trail / 7)})`
          context.shadowColor = 'rgb(251 146 60)'
          context.shadowBlur = trail === 0 ? 26 : 0
          context.beginPath()
          context.arc(at.x, at.y, Math.max(1, radius), 0, Math.PI * 2)
          context.fill()
        }
        context.shadowBlur = 0
      } else {
        const after = (since - volley.flight) / 0.35
        const at = toScreen(view, to)
        context.strokeStyle = `rgb(253 186 116 / ${1 - after})`
        context.lineWidth = 3
        context.beginPath()
        context.arc(at.x, at.y, 6 + after * 40 * Math.max(1, view.scale * 1.5), 0, Math.PI * 2)
        context.stroke()
      }
      continue
    }
    for (let shot = 0; shot < volley.count; shot += 1) {
      const delay = shot * 0.045
      const jitter = { x: (random() - 0.5) * 46, y: (random() - 0.5) * 46 }
      const progress = (since - delay) / volley.flight
      if (progress < 0) continue
      const target = add(to, jitter)
      if (progress <= 1) {
        const head = toScreen(view, curve(from, target, progress, 0.08))
        const tail = toScreen(view, curve(from, target, Math.max(0, progress - 0.12), 0.08))
        context.strokeStyle = 'rgb(254 240 138 / 0.95)'
        context.shadowColor = 'rgb(250 204 21)'
        context.shadowBlur = 8
        context.lineWidth = 2.2
        context.beginPath()
        context.moveTo(tail.x, tail.y)
        context.lineTo(head.x, head.y)
        context.stroke()
        context.shadowBlur = 0
      } else if (progress < 1.4) {
        const spark = (progress - 1) / 0.4
        const at = toScreen(view, target)
        context.fillStyle = `rgb(254 215 170 / ${1 - spark})`
        context.beginPath()
        context.arc(at.x, at.y, 1.5 + spark * 4, 0, Math.PI * 2)
        context.fill()
      }
    }
  }
}

function drawExplosion(
  context: CanvasRenderingContext2D,
  ship: BattleShip,
  pose: ReturnType<typeof shipPose>,
  view: View,
  time: number,
) {
  if (ship.lostAt === undefined) return
  const since = time - ship.lostAt
  if (since < 0 || since > 1.6) return
  const at = toScreen(view, sub(pose.pos, { x: since * 4, y: since * since * 6 }))
  const grow = Math.max(1, view.scale * 1.5)
  const k = since / 1.6
  const fireball = context.createRadialGradient(at.x, at.y, 0, at.x, at.y, (14 + 40 * k) * grow)
  fireball.addColorStop(0, `rgb(255 255 240 / ${1 - k})`)
  fireball.addColorStop(0.35, `rgb(251 146 60 / ${0.9 * (1 - k)})`)
  fireball.addColorStop(1, 'rgb(220 38 38 / 0)')
  context.fillStyle = fireball
  context.beginPath()
  context.arc(at.x, at.y, (14 + 40 * k) * grow, 0, Math.PI * 2)
  context.fill()
  context.strokeStyle = `rgb(255 237 213 / ${0.8 * (1 - k)})`
  context.lineWidth = 2
  context.beginPath()
  context.arc(at.x, at.y, (10 + 110 * easeOutCubic(k)) * grow, 0, Math.PI * 2)
  context.stroke()
  const random = mulberry32(ship.key.length * 977 + Math.round(ship.lostAt * 100))
  for (let piece = 0; piece < 16; piece += 1) {
    const angle = random() * Math.PI * 2
    const speed = 30 + random() * 70
    const debris = {
      x: at.x + Math.cos(angle) * speed * since * grow,
      y: at.y + Math.sin(angle) * speed * since * grow + 30 * since * since * grow,
    }
    context.fillStyle = `rgb(253 186 116 / ${1 - k})`
    context.fillRect(debris.x, debris.y, 2.5, 2.5)
  }
}

function drawMarkers(
  context: CanvasRenderingContext2D,
  plan: BattlePlan,
  poses: ReadonlyMap<string, ReturnType<typeof shipPose>>,
  view: View,
  time: number,
  avatars: ReadonlyMap<string, HTMLImageElement>,
) {
  const radius = Math.max(12, 15 * view.scale * 1.6)
  // Each portrait sits on a ship, or is somewhere between two ships while it crosses.
  const aboard = new Map<string, string[]>()
  const flying: { avatar: string; at: Vec }[] = []
  for (const ship of plan.ships) {
    for (const marker of ship.markers) {
      for (const avatar of marker.avatars) {
        const crossing = plan.crossings.find(
          (entry) => entry.marker === marker.id && entry.avatar === avatar,
        )
        const progress = crossing ? (time - crossing.at) / crossing.duration : 1
        if (crossing && progress > 0 && progress < 1) {
          const from = poses.get(crossing.from)!.pos
          const to = poses.get(crossing.to)!.pos
          flying.push({ avatar, at: curve(from, to, easeInOutQuad(progress), -0.4) })
          continue
        }
        const host = crossing && progress <= 0 ? crossing.from : ship.key
        if (poses.get(host)!.state !== 'sailing') continue
        aboard.set(host, [...(aboard.get(host) ?? []), avatar])
      }
    }
  }
  for (const [host, list] of aboard) {
    const screen = toScreen(view, poses.get(host)!.pos)
    list.forEach((avatar, index) => {
      const x = screen.x + (index - (list.length - 1) / 2) * radius * 0.85
      drawPortrait(context, avatars.get(avatar), x, screen.y - radius * 1.9, radius)
    })
  }
  for (const { avatar, at } of flying) {
    const screen = toScreen(view, at)
    drawPortrait(context, avatars.get(avatar), screen.x, screen.y - radius * 1.2, radius)
  }
}

function drawPortrait(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement | undefined,
  x: number,
  y: number,
  radius: number,
) {
  if (!image?.complete || image.naturalWidth === 0) return
  context.save()
  context.shadowColor = 'rgb(52 211 153)'
  context.shadowBlur = 16
  context.fillStyle = 'rgb(52 211 153)'
  context.beginPath()
  context.arc(x, y, radius + 2.5, 0, Math.PI * 2)
  context.fill()
  context.shadowBlur = 0
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.clip()
  context.drawImage(image, x - radius, y - radius, radius * 2, radius * 2)
  context.restore()
}

function withAlpha(hex: string, alpha: number): string {
  const value = Number.parseInt(hex.slice(1), 16)
  return `rgb(${(value >> 16) & 255} ${(value >> 8) & 255} ${value & 255} / ${alpha})`
}

const easeOutCubic = (k: number) => 1 - (1 - k) ** 3
const easeInOutQuad = (k: number) => (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2)

function formatClock(seconds: number): string {
  const whole = Math.floor(seconds)
  return `${String(Math.floor(whole / 60)).padStart(2, '0')}:${String(whole % 60).padStart(2, '0')}`
}

function useElementSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setSize({ width: entry.contentRect.width, height: entry.contentRect.height })
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])
  return size
}

/** The battle's clock in seconds. R restarts it; reduced motion jumps to the end. */
function useBattleClock(end: number) {
  const [clock] = useState(() => {
    let start = performance.now()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return {
      now: () => (reduced ? end : Math.min(end, (performance.now() - start) / 1000)),
      restart: () => {
        start = performance.now()
      },
    }
  })
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'r' || event.key === 'R') clock.restart()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [clock])
  return clock
}

function useAvatarImages(plan: BattlePlan) {
  const images = useRef(new Map<string, HTMLImageElement>())
  useEffect(() => {
    for (const ship of plan.ships) {
      for (const src of ship.markers.flatMap((marker) => marker.avatars)) {
        if (images.current.has(src)) continue
        const image = new Image()
        image.src = publicAssetUrl(src)
        images.current.set(src, image)
      }
    }
  }, [plan])
  return images
}
