import { IconBase, type IconBaseProps, type IconType } from 'react-icons'
import { FaHandshake, FaMapMarkerAlt, FaToilet, FaUsersSlash } from 'react-icons/fa'
import {
  GiAngelWings,
  GiBangingGavel,
  GiBarricade,
  GiBrokenShield,
  GiCage,
  GiCardRandom,
  GiChecklist,
  GiChurch,
  GiContract,
  GiDinosaurRex,
  GiDonkey,
  GiDragonSpiral,
  GiDrinking,
  GiElevator,
  GiFairyWings,
  GiFeather,
  GiFizzingFlask,
  GiGoblinHead,
  GiHandcuffs,
  GiHutsVillage,
  GiImpLaugh,
  GiLetterBomb,
  GiLifeBuoy,
  GiMineWagon,
  GiMonsterGrasp,
  GiMountaintop,
  GiNeedleDrill,
  GiNestBirds,
  GiPartyFlags,
  GiPassport,
  GiPathDistance,
  GiPlantsAndAnimals,
  GiPuzzle,
  GiRank2,
  GiRank3,
  GiRaven,
  GiSaberToothedCatHead,
  GiSailboat,
  GiScales,
  GiSecretBook,
  GiSecretDoor,
  GiShadowFollower,
  GiShadowGrasp,
  GiShamblingZombie,
  GiShatter,
  GiSheep,
  GiShipWheel,
  GiSpiderWeb,
  GiStable,
  GiSunrise,
  GiTavernSign,
  GiTeamUpgrade,
  GiTentaclesBarrier,
  GiTroll,
  GiVelociraptorTracks,
  GiWolfTrap,
  GiWoodAxe,
  GiWoodenSign,
} from 'react-icons/gi'

/** Crescent long-rest icon for campaign-day markers on the events timeline. */
export const DAY_MARK_ICON = 'custom/LongRest'

function LongRestIcon(props: IconBaseProps) {
  return (
    <IconBase attr={{ viewBox: '0 0 443.5 443.5' }} {...props}>
      <path
        fill="currentColor"
        d="M221.75.25c122.33,0,221.5,99.17,221.5,221.5s-99.17,221.5-221.5,221.5S.25,344.08.25,221.75,99.42.25,221.75.25ZM370.58,353.13c69.03-39.84,83.21-144.48,31.66-233.72C350.7,30.17,252.96-9.88,183.92,29.97c-69.03,39.84-83.21,144.48-31.66,233.72C203.8,352.93,301.54,392.98,370.58,353.13Z"
      />
      <ellipse
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="10"
        cx="277.25"
        cy="191.55"
        rx="144.3145"
        ry="186.5974"
        transform="matrix(0.86569, -0.50058, 0.50058, 0.86569, -58.64876, 164.51324)"
      />
    </IconBase>
  )
}

/** Curated react-icons registry for timeline event marks. Keys use `set/IconName`. */
export const EVENT_ICONS: Record<string, IconType> = {
  'fa/FaHandshake': FaHandshake,
  'fa/FaMapMarkerAlt': FaMapMarkerAlt,
  'fa/FaToilet': FaToilet,
  'fa/FaUsersSlash': FaUsersSlash,
  'gi/GiAngelWings': GiAngelWings,
  'gi/GiBangingGavel': GiBangingGavel,
  'gi/GiBarricade': GiBarricade,
  'gi/GiBrokenShield': GiBrokenShield,
  'gi/GiCage': GiCage,
  'gi/GiCardRandom': GiCardRandom,
  'gi/GiChecklist': GiChecklist,
  'gi/GiChurch': GiChurch,
  'gi/GiContract': GiContract,
  'gi/GiDinosaurRex': GiDinosaurRex,
  'gi/GiDonkey': GiDonkey,
  'gi/GiDragonSpiral': GiDragonSpiral,
  'gi/GiDrinking': GiDrinking,
  'gi/GiElevator': GiElevator,
  'gi/GiFairyWings': GiFairyWings,
  'gi/GiFeather': GiFeather,
  'gi/GiFizzingFlask': GiFizzingFlask,
  'gi/GiGoblinHead': GiGoblinHead,
  'gi/GiHandcuffs': GiHandcuffs,
  'gi/GiHutsVillage': GiHutsVillage,
  'gi/GiImpLaugh': GiImpLaugh,
  'gi/GiLetterBomb': GiLetterBomb,
  'gi/GiLifeBuoy': GiLifeBuoy,
  'gi/GiMineWagon': GiMineWagon,
  'gi/GiMonsterGrasp': GiMonsterGrasp,
  'gi/GiMountaintop': GiMountaintop,
  'gi/GiNeedleDrill': GiNeedleDrill,
  'gi/GiNestBirds': GiNestBirds,
  'gi/GiPartyFlags': GiPartyFlags,
  'gi/GiPassport': GiPassport,
  'gi/GiPathDistance': GiPathDistance,
  'gi/GiPlantsAndAnimals': GiPlantsAndAnimals,
  'gi/GiPuzzle': GiPuzzle,
  'gi/GiRank2': GiRank2,
  'gi/GiRank3': GiRank3,
  'gi/GiRaven': GiRaven,
  'gi/GiSaberToothedCatHead': GiSaberToothedCatHead,
  'gi/GiSailboat': GiSailboat,
  'gi/GiScales': GiScales,
  'gi/GiSecretBook': GiSecretBook,
  'gi/GiSecretDoor': GiSecretDoor,
  'gi/GiShadowFollower': GiShadowFollower,
  'gi/GiShadowGrasp': GiShadowGrasp,
  'gi/GiShamblingZombie': GiShamblingZombie,
  'gi/GiShatter': GiShatter,
  'gi/GiSheep': GiSheep,
  'gi/GiShipWheel': GiShipWheel,
  'gi/GiSpiderWeb': GiSpiderWeb,
  'gi/GiStable': GiStable,
  'gi/GiSunrise': GiSunrise,
  'gi/GiTavernSign': GiTavernSign,
  'gi/GiTeamUpgrade': GiTeamUpgrade,
  'gi/GiTentaclesBarrier': GiTentaclesBarrier,
  'gi/GiTroll': GiTroll,
  'gi/GiVelociraptorTracks': GiVelociraptorTracks,
  'gi/GiWolfTrap': GiWolfTrap,
  'gi/GiWoodAxe': GiWoodAxe,
  'gi/GiWoodenSign': GiWoodenSign,
  [DAY_MARK_ICON]: LongRestIcon,
}

const DEFAULT_ICON = EVENT_ICONS['fa/FaMapMarkerAlt']

export function resolveEventIcon(name: string): IconType {
  return EVENT_ICONS[name] ?? DEFAULT_ICON
}

export function EventMarkIcon({ name, className }: { name: string; className?: string }) {
  const Icon = resolveEventIcon(name)
  return <Icon className={className} aria-hidden />
}
