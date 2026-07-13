import { IconBase, type IconBaseProps, type IconType } from 'react-icons'

/** Crescent long-rest icon for campaign-day markers on the events timeline. */
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

export const CUSTOM_ICONS = {
  'custom/LongRest': LongRestIcon,
} as const satisfies Record<string, IconType>

export const CUSTOM_ICON_METADATA = {
  'custom/LongRest': {
    label: 'Long Rest',
    description: 'A crescent moon marking a full overnight rest or the end of a campaign day.',
    keywords: ['camp', 'day', 'end', 'long rest', 'moon', 'night', 'recover', 'sleep'],
    categories: ['event', 'status', 'time'],
    useCases: ['Campaign-day boundaries', 'Long-rest events', 'Overnight recovery'],
  },
} as const satisfies Record<
  keyof typeof CUSTOM_ICONS,
  {
    label: string
    description: string
    keywords: ReadonlyArray<string>
    categories: ReadonlyArray<string>
    useCases: ReadonlyArray<string>
  }
>
