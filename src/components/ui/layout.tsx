import { forwardRef } from 'react'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'

import { cn } from '#/lib/utils'

export const LAYOUT_GAPS = {
  none: 'gap-0',
  '3xs': 'gap-0.5',
  '2xs': 'gap-1',
  xs: 'gap-1.5',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
  xl: 'gap-6',
  '2xl': 'gap-8',
  '3xl': 'gap-10',
  '4xl': 'gap-12',
} as const

export type LayoutGap = keyof typeof LAYOUT_GAPS

const marginEndClasses: Record<LayoutGap, string> = {
  none: 'mr-0',
  '3xs': 'mr-0.5',
  '2xs': 'mr-1',
  xs: 'mr-1.5',
  sm: 'mr-2',
  md: 'mr-3',
  lg: 'mr-4',
  xl: 'mr-6',
  '2xl': 'mr-8',
  '3xl': 'mr-10',
  '4xl': 'mr-12',
}

type LayoutElementProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  as?: ElementType
  children?: ReactNode
}

type Align = 'start' | 'center' | 'end' | 'baseline' | 'stretch'
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

const alignClasses: Record<Align, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
}

const justifyClasses: Record<Justify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

type StackProps = LayoutElementProps & {
  gap?: LayoutGap
  align?: Align
  justify?: Justify
}

/** Vertical flow only: owns column direction and consistent sibling spacing. */
export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  {
    as: Component = 'div',
    gap = 'md',
    align = 'stretch',
    justify = 'start',
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(
        'flex flex-col',
        LAYOUT_GAPS[gap],
        alignClasses[align],
        justifyClasses[justify],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
})

type InlineProps = LayoutElementProps & {
  gap?: LayoutGap
  align?: Align
  justify?: Justify
  wrap?: boolean
  inline?: boolean
  marginEnd?: LayoutGap
}

/** Horizontal flow only: owns alignment, wrapping, and consistent sibling spacing. */
export function Inline({
  as: Component = 'div',
  gap = 'sm',
  align = 'center',
  justify = 'start',
  wrap = false,
  inline = false,
  marginEnd,
  className,
  children,
  ...props
}: InlineProps) {
  return (
    <Component
      className={cn(
        inline ? 'inline-flex' : 'flex',
        LAYOUT_GAPS[gap],
        alignClasses[align],
        justifyClasses[justify],
        wrap && 'flex-wrap',
        marginEnd && marginEndClasses[marginEnd],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

type ColumnCount = 1 | 2 | 3 | 4 | 5 | 6

const columnClasses: Record<ColumnCount, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
}

const smColumnClasses: Record<ColumnCount, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
}

const mdColumnClasses: Record<ColumnCount, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
}

const lgColumnClasses: Record<ColumnCount, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
}

const xlColumnClasses: Record<ColumnCount, string> = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
  5: 'xl:grid-cols-5',
  6: 'xl:grid-cols-6',
}

type GridProps = LayoutElementProps & {
  gap?: LayoutGap
  columns?: ColumnCount
  smColumns?: ColumnCount
  mdColumns?: ColumnCount
  lgColumns?: ColumnCount
  xlColumns?: ColumnCount
}

/** Two-dimensional layout only: owns columns and the shared spacing scale. */
export function Grid({
  as: Component = 'div',
  gap = 'md',
  columns = 1,
  smColumns,
  mdColumns,
  lgColumns,
  xlColumns,
  className,
  children,
  ...props
}: GridProps) {
  return (
    <Component
      className={cn(
        'grid',
        LAYOUT_GAPS[gap],
        columnClasses[columns],
        smColumns && smColumnClasses[smColumns],
        mdColumns && mdColumnClasses[mdColumns],
        lgColumns && lgColumnClasses[lgColumns],
        xlColumns && xlColumnClasses[xlColumns],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

type SwitchLayoutProps = LayoutElementProps & {
  gap?: LayoutGap
  align?: Align
  justify?: Justify
  breakpoint?: 'sm' | 'md' | 'lg'
  wrap?: boolean
}

const switchDirectionClasses = {
  sm: 'sm:flex-row',
  md: 'md:flex-row',
  lg: 'lg:flex-row',
} as const

const switchWrapClasses = {
  sm: 'sm:flex-wrap',
  md: 'md:flex-wrap',
  lg: 'lg:flex-wrap',
} as const

const switchAlignClasses: Record<
  NonNullable<SwitchLayoutProps['breakpoint']>,
  Record<Align, string>
> = {
  sm: {
    start: 'sm:items-start',
    center: 'sm:items-center',
    end: 'sm:items-end',
    baseline: 'sm:items-baseline',
    stretch: 'sm:items-stretch',
  },
  md: {
    start: 'md:items-start',
    center: 'md:items-center',
    end: 'md:items-end',
    baseline: 'md:items-baseline',
    stretch: 'md:items-stretch',
  },
  lg: {
    start: 'lg:items-start',
    center: 'lg:items-center',
    end: 'lg:items-end',
    baseline: 'lg:items-baseline',
    stretch: 'lg:items-stretch',
  },
}

/** Column-to-row responsive flow; owns only the layout switch and spacing. */
export function SwitchLayout({
  as: Component = 'div',
  gap = 'lg',
  align = 'start',
  justify = 'start',
  breakpoint = 'sm',
  wrap = false,
  className,
  children,
  ...props
}: SwitchLayoutProps) {
  return (
    <Component
      className={cn(
        'flex flex-col',
        switchDirectionClasses[breakpoint],
        LAYOUT_GAPS[gap],
        switchAlignClasses[breakpoint][align],
        justifyClasses[justify],
        wrap && switchWrapClasses[breakpoint],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

type CenterProps = LayoutElementProps & {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '7xl' | 'full'
}

const maxWidthClasses: Record<NonNullable<CenterProps['maxWidth']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
}

/** Horizontal centering and measure only. */
export function Center({
  as: Component = 'div',
  maxWidth = 'full',
  className,
  children,
  ...props
}: CenterProps) {
  return (
    <Component className={cn('mx-auto w-full', maxWidthClasses[maxWidth], className)} {...props}>
      {children}
    </Component>
  )
}
