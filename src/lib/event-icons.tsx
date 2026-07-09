import type { IconType } from 'react-icons'
import {
  FaBalanceScale,
  FaBeer,
  FaChurch,
  FaDoorOpen,
  FaEnvelope,
  FaGhost,
  FaGlassCheers,
  FaLandmark,
  FaMapMarkerAlt,
  FaMoon,
  FaPassport,
  FaScroll,
  FaSign,
  FaSun,
  FaUserPlus,
  FaUserTimes,
} from 'react-icons/fa'
import {
  GiCrossedSwords,
  GiFeather,
  GiFootsteps,
  GiForestCamp,
  GiGhost,
  GiPineTree,
  GiPuzzle,
  GiSailboat,
  GiWaveCrest,
} from 'react-icons/gi'
import { HiSparkles } from 'react-icons/hi'
import { TbSunrise } from 'react-icons/tb'

/** Morning sun icon for day-start markers on the events timeline. */
export const DAY_MARK_ICON = 'tb/TbSunrise'

/** Curated react-icons registry for timeline event marks. Keys use `set/IconName`. */
export const EVENT_ICONS: Record<string, IconType> = {
  'fa/FaBeer': FaBeer,
  'fa/FaMoon': FaMoon,
  'fa/FaSun': FaSun,
  'fa/FaScroll': FaScroll,
  'fa/FaDoorOpen': FaDoorOpen,
  'fa/FaLandmark': FaLandmark,
  'fa/FaEnvelope': FaEnvelope,
  'fa/FaGlassCheers': FaGlassCheers,
  'fa/FaUserPlus': FaUserPlus,
  'fa/FaSign': FaSign,
  'fa/FaChurch': FaChurch,
  'fa/FaBalanceScale': FaBalanceScale,
  'fa/FaUserTimes': FaUserTimes,
  'fa/FaGhost': FaGhost,
  'fa/FaMapMarkerAlt': FaMapMarkerAlt,
  'fa/FaPassport': FaPassport,
  'gi/GiSailboat': GiSailboat,
  'gi/GiCrossedSwords': GiCrossedSwords,
  'gi/GiGhost': GiGhost,
  'gi/GiFeather': GiFeather,
  'gi/GiFootsteps': GiFootsteps,
  'gi/GiPuzzle': GiPuzzle,
  'gi/GiForestCamp': GiForestCamp,
  'gi/GiPineTree': GiPineTree,
  'gi/GiWaveCrest': GiWaveCrest,
  'hi/HiSparkles': HiSparkles,
  [DAY_MARK_ICON]: TbSunrise,
}

const DEFAULT_ICON = EVENT_ICONS['fa/FaMapMarkerAlt']

export function resolveEventIcon(name: string): IconType {
  return EVENT_ICONS[name] ?? DEFAULT_ICON
}

export function EventMarkIcon({ name, className }: { name: string; className?: string }) {
  const Icon = resolveEventIcon(name)
  return <Icon className={className} aria-hidden />
}
