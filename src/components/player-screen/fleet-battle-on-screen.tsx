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
  clamp01,
  curve,
  mulberry32,
  scale,
  shipPose,
  sub,
  type BattlePlan,
  type BattleShip,
  type Vec,
} from '#/lib/fleet-battle'
import type { FleetRoster } from '#/lib/fleet-roster'
import { publicAssetUrl } from '#/lib/public-media'

/**
 * The battle is drawn over the region map of the sky islands. The fleet launches from Tempest, the
 * lines meet over Skynet, and the flying fortress waits off the map's top-left corner, where the
 * battle view is zoomed out far enough to show it. Positions are in the region map's pixels.
 */
const REGION = refs.locations.three_sky_kingdoms
const HOME = refs.locations.tempest
const CENTRE = refs.locations.skynet
const FORTRESS: Vec = { x: -150, y: -95 }
/** The part of the map the radar shows: the whole region with a margin of open sky around it. */
const VIEW = { x: -330, y: -230, width: 2196, height: 1464 }

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
      drawBattle(context, plan, view, time, images.current, size)
      if (time - lastHud > 0.1 || time >= plan.times.end) {
        lastHud = time
        setHud(time)
      }
      handle = requestAnimationFrame(draw)
    }
    handle = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(handle)
  }, [plan, view, size, clock, images])

  const caption = captionAt(plan, hud)
  const counts = battleCounts(plan, hud, roster.sides.length)

  return (
    <div ref={frame} className="absolute inset-0 overflow-hidden bg-[rgb(3_10_14)]">
      <ResponsiveImage
        src={map.url}
        alt=""
        sizes="100vw"
        loading="eager"
        className="absolute max-w-none opacity-80 [filter:grayscale(1)_sepia(1)_hue-rotate(125deg)_saturate(1.4)_brightness(0.42)_contrast(1.35)]"
        style={{
          left: view.offset.x,
          top: view.offset.y,
          width: map.width * view.scale,
          height: map.height * view.scale,
        }}
      />
      <canvas ref={canvas} className="absolute inset-0 size-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgb(0_0_0/0.18)_0px,rgb(0_0_0/0.18)_1px,transparent_1px,transparent_3px)] mix-blend-multiply"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(0_0_0/0.75)_100%)]"
      />

      <div className="absolute bottom-[4vh] left-[3vw] font-mono text-teal-200/90 uppercase">
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

      <ul className="absolute top-[4vh] right-[3vw] grid gap-[0.8vh] text-right font-mono text-[clamp(0.9rem,2vh,1.6rem)] tracking-[0.15em] uppercase tabular-nums">
        {roster.sides.map((side, index) => (
          <li key={side.key} className="flex items-center justify-end gap-[0.8vw]">
            <span className="text-white/70">{side.name}</span>
            <span
              className="min-w-[2.5ch] text-[1.4em] font-bold"
              style={{ color: SIDE_COLOURS[index], textShadow: `0 0 18px ${SIDE_COLOURS[index]}` }}
            >
              {counts.flying[index]}
            </span>
          </li>
        ))}
        <li className="flex items-center justify-end gap-[0.8vw] text-white/45">
          <span>Lost</span>
          <span className="min-w-[2.5ch] text-[1.4em] font-bold">{counts.lost}</span>
        </li>
      </ul>

      {caption ? (
        <p
          key={caption.text}
          className="fleet-caption absolute inset-x-0 top-[4vh] text-center font-mono text-[clamp(1.3rem,3.6vh,3.2rem)] font-semibold tracking-[0.18em] text-amber-200 uppercase [text-shadow:0_0_30px_rgb(251_191_36/0.55)]"
        >
          {caption.text}
        </p>
      ) : null}
    </div>
  )
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
  drawFortress(context, toScreen(view, plan.geometry.target), unitPx, time)

  const poses = new Map(plan.ships.map((ship) => [ship.key, shipPose(plan, ship, time)]))

  // Wakes behind the moving ships.
  for (const ship of plan.ships) {
    const pose = poses.get(ship.key)!
    if (pose.state !== 'sailing') continue
    for (let step = 1; step <= 7; step += 1) {
      const past = shipPose(plan, ship, time - step * 0.12)
      if (past.state === 'hidden') break
      const at = toScreen(view, past.pos)
      context.fillStyle = withAlpha(SIDE_COLOURS[past.side]!, 0.28 * (1 - step / 8))
      context.beginPath()
      context.arc(at.x, at.y, Math.max(1.2, 2.2 * unitPx * 2), 0, Math.PI * 2)
      context.fill()
    }
  }

  drawVolleys(context, plan, view, time)

  for (const ship of plan.ships) drawShip(context, plan, ship, poses.get(ship.key)!, view, time)
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

function drawFortress(context: CanvasRenderingContext2D, at: Vec, unitPx: number, time: number) {
  const size = Math.max(44, 110 * unitPx)
  context.save()
  context.translate(at.x, at.y)
  context.shadowColor = 'rgb(190 242 100)'
  context.shadowBlur = 24
  context.fillStyle = 'rgb(190 242 100 / 0.12)'
  context.strokeStyle = 'rgb(190 242 100 / 0.9)'
  context.lineWidth = 2
  // A rock with a walled keep on top.
  context.beginPath()
  context.moveTo(-size, 0)
  context.lineTo(size, 0)
  context.lineTo(size * 0.55, size * 0.55)
  context.lineTo(0, size * 0.95)
  context.lineTo(-size * 0.55, size * 0.55)
  context.closePath()
  context.fill()
  context.stroke()
  context.beginPath()
  const towers = [-0.8, -0.35, 0.1, 0.55]
  context.moveTo(-size * 0.85, 0)
  for (const tower of towers) {
    context.lineTo(size * tower, -size * 0.35)
    context.lineTo(size * (tower + 0.2), -size * 0.35)
    context.lineTo(size * (tower + 0.2), -size * 0.15)
    context.lineTo(size * (tower + 0.45), -size * 0.15)
  }
  context.lineTo(size * 0.85, 0)
  context.stroke()
  context.beginPath()
  context.moveTo(-size * 0.12, -size * 0.35)
  context.lineTo(0, -size * 0.85)
  context.lineTo(size * 0.12, -size * 0.35)
  context.stroke()
  context.restore()
  drawLandmark(context, { x: at.x, y: at.y + size * 0.5 }, 'Flying fortress', time * 0.5, true)
}

function drawShip(
  context: CanvasRenderingContext2D,
  plan: BattlePlan,
  ship: BattleShip,
  pose: ReturnType<typeof shipPose>,
  view: View,
  time: number,
) {
  if (pose.state === 'hidden') return
  const at = toScreen(view, pose.pos)
  const size = Math.max(11, 20 * view.scale * 1.6)
  const colour = SIDE_COLOURS[pose.side]!
  const turning = ship.turnAt !== undefined && time >= ship.turnAt && time < ship.turnAt + 0.5
  context.save()
  context.translate(at.x, at.y)
  context.rotate(Math.atan2(pose.heading.y, pose.heading.x))
  if (pose.state === 'wreck') {
    context.globalAlpha = 1 - pose.sinking * 0.75
    context.strokeStyle = 'rgb(255 255 255 / 0.5)'
    context.lineWidth = 1.5
    context.beginPath()
    context.moveTo(-size * 0.6, -size * 0.6)
    context.lineTo(size * 0.6, size * 0.6)
    context.moveTo(size * 0.6, -size * 0.6)
    context.lineTo(-size * 0.6, size * 0.6)
    context.stroke()
    context.restore()
    return
  }
  context.shadowColor = colour
  context.shadowBlur = turning ? 30 : 14
  context.fillStyle = turning ? 'white' : colour
  context.beginPath()
  context.moveTo(size, 0)
  context.lineTo(-size * 0.7, size * 0.62)
  context.lineTo(-size * 0.35, 0)
  context.lineTo(-size * 0.7, -size * 0.62)
  context.closePath()
  context.fill()
  context.restore()
  // A muzzle flash as each volley leaves.
  for (const volley of plan.volleys) {
    if (volley.from !== ship.key) continue
    const since = time - volley.at
    if (since < 0 || since > 0.12) continue
    context.fillStyle = `rgb(253 224 71 / ${0.85 * (1 - since / 0.12)})`
    context.beginPath()
    context.arc(at.x, at.y, size * 0.45, 0, Math.PI * 2)
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
