import {
  ArrowDownToLine,
  Ban,
  EarOff,
  EyeOff,
  FlaskConical,
  Ghost,
  Grip,
  Heart,
  Link,
  Moon,
  Mountain,
  Snowflake,
  Sparkles,
  VenetianMask,
} from 'lucide-react'
import type { ComponentType } from 'react'

import type { Condition } from '#/definitions/rules-glossary'

type ConditionIcon = ComponentType<{ className?: string; 'aria-hidden'?: boolean }>

/** One icon per condition, so markers read at a glance in initiative and rows. */
export const CONDITION_ICONS: Record<Condition, ConditionIcon> = {
  blinded: EyeOff,
  charmed: Heart,
  deafened: EarOff,
  frightened: Ghost,
  grappled: Grip,
  incapacitated: Ban,
  invisible: VenetianMask,
  paralyzed: Snowflake,
  petrified: Mountain,
  poisoned: FlaskConical,
  prone: ArrowDownToLine,
  restrained: Link,
  stunned: Sparkles,
  unconscious: Moon,
}
