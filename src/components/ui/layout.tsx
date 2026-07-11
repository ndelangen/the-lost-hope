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

const insetClasses: Record<LayoutGap, string> = {
  none: 'p-0',
  '3xs': 'p-0.5',
  '2xs': 'p-1',
  xs: 'p-1.5',
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4',
  xl: 'p-6',
  '2xl': 'p-8',
  '3xl': 'p-10',
  '4xl': 'p-12',
}

const inlineInsetClasses: Record<LayoutGap, string> = {
  none: 'px-0',
  '3xs': 'px-0.5',
  '2xs': 'px-1',
  xs: 'px-1.5',
  sm: 'px-2',
  md: 'px-3',
  lg: 'px-4',
  xl: 'px-6',
  '2xl': 'px-8',
  '3xl': 'px-10',
  '4xl': 'px-12',
}

const blockInsetClasses: Record<LayoutGap, string> = {
  none: 'py-0',
  '3xs': 'py-0.5',
  '2xs': 'py-1',
  xs: 'py-1.5',
  sm: 'py-2',
  md: 'py-3',
  lg: 'py-4',
  xl: 'py-6',
  '2xl': 'py-8',
  '3xl': 'py-10',
  '4xl': 'py-12',
}

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

const responsiveAlignClasses: Record<'sm' | 'md' | 'lg' | 'xl', Record<Align, string>> = {
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
  xl: {
    start: 'xl:items-start',
    center: 'xl:items-center',
    end: 'xl:items-end',
    baseline: 'xl:items-baseline',
    stretch: 'xl:items-stretch',
  },
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

type InsetProps = LayoutElementProps & {
  space?: LayoutGap
  inline?: LayoutGap
  block?: LayoutGap
}

/** Inner spacing only: owns uniform or axis-specific padding from the shared scale. */
export function Inset({
  as: Component = 'div',
  space,
  inline,
  block,
  className,
  children,
  ...props
}: InsetProps) {
  return (
    <Component
      className={cn(
        space && insetClasses[space],
        inline && inlineInsetClasses[inline],
        block && blockInsetClasses[block],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

type GridTemplate =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 'auto-content'
  | 'content-auto'
  | 'label-content'
  | 'content-aside'

const gridTemplateClasses: Record<GridTemplate, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  'auto-content': 'grid-cols-[auto_minmax(0,1fr)]',
  'content-auto': 'grid-cols-[minmax(0,1fr)_auto]',
  'label-content': 'grid-cols-[9rem_minmax(0,1fr)]',
  'content-aside': 'grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)]',
}

const smGridTemplateClasses: Record<GridTemplate, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
  7: 'sm:grid-cols-7',
  'auto-content': 'sm:grid-cols-[auto_minmax(0,1fr)]',
  'content-auto': 'sm:grid-cols-[minmax(0,1fr)_auto]',
  'label-content': 'sm:grid-cols-[9rem_minmax(0,1fr)]',
  'content-aside': 'sm:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)]',
}

const mdGridTemplateClasses: Record<GridTemplate, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
  7: 'md:grid-cols-7',
  'auto-content': 'md:grid-cols-[auto_minmax(0,1fr)]',
  'content-auto': 'md:grid-cols-[minmax(0,1fr)_auto]',
  'label-content': 'md:grid-cols-[9rem_minmax(0,1fr)]',
  'content-aside': 'md:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)]',
}

const lgGridTemplateClasses: Record<GridTemplate, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  7: 'lg:grid-cols-7',
  'auto-content': 'lg:grid-cols-[auto_minmax(0,1fr)]',
  'content-auto': 'lg:grid-cols-[minmax(0,1fr)_auto]',
  'label-content': 'lg:grid-cols-[9rem_minmax(0,1fr)]',
  'content-aside': 'lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)]',
}

const xlGridTemplateClasses: Record<GridTemplate, string> = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
  5: 'xl:grid-cols-5',
  6: 'xl:grid-cols-6',
  7: 'xl:grid-cols-7',
  'auto-content': 'xl:grid-cols-[auto_minmax(0,1fr)]',
  'content-auto': 'xl:grid-cols-[minmax(0,1fr)_auto]',
  'label-content': 'xl:grid-cols-[9rem_minmax(0,1fr)]',
  'content-aside': 'xl:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)]',
}

type GridProps = LayoutElementProps & {
  gap?: LayoutGap
  template?: GridTemplate
  smTemplate?: GridTemplate
  mdTemplate?: GridTemplate
  lgTemplate?: GridTemplate
  xlTemplate?: GridTemplate
  align?: Align
  smAlign?: Align
  mdAlign?: Align
  lgAlign?: Align
  xlAlign?: Align
}

/** Two-dimensional layout only: owns tracks, alignment, and the shared spacing scale. */
export function Grid({
  as: Component = 'div',
  gap = 'md',
  template = 1,
  smTemplate,
  mdTemplate,
  lgTemplate,
  xlTemplate,
  align = 'stretch',
  smAlign,
  mdAlign,
  lgAlign,
  xlAlign,
  className,
  children,
  ...props
}: GridProps) {
  return (
    <Component
      className={cn(
        'grid',
        LAYOUT_GAPS[gap],
        gridTemplateClasses[template],
        smTemplate && smGridTemplateClasses[smTemplate],
        mdTemplate && mdGridTemplateClasses[mdTemplate],
        lgTemplate && lgGridTemplateClasses[lgTemplate],
        xlTemplate && xlGridTemplateClasses[xlTemplate],
        alignClasses[align],
        smAlign && responsiveAlignClasses.sm[smAlign],
        mdAlign && responsiveAlignClasses.md[mdAlign],
        lgAlign && responsiveAlignClasses.lg[lgAlign],
        xlAlign && responsiveAlignClasses.xl[xlAlign],
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
  columnAlign?: Align
  columnJustify?: Justify
  rowAlign?: Align
  rowJustify?: Justify
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

const switchJustifyClasses: Record<
  NonNullable<SwitchLayoutProps['breakpoint']>,
  Record<Justify, string>
> = {
  sm: {
    start: 'sm:justify-start',
    center: 'sm:justify-center',
    end: 'sm:justify-end',
    between: 'sm:justify-between',
    around: 'sm:justify-around',
    evenly: 'sm:justify-evenly',
  },
  md: {
    start: 'md:justify-start',
    center: 'md:justify-center',
    end: 'md:justify-end',
    between: 'md:justify-between',
    around: 'md:justify-around',
    evenly: 'md:justify-evenly',
  },
  lg: {
    start: 'lg:justify-start',
    center: 'lg:justify-center',
    end: 'lg:justify-end',
    between: 'lg:justify-between',
    around: 'lg:justify-around',
    evenly: 'lg:justify-evenly',
  },
}

/** Column-to-row responsive flow with explicit alignment for both states. */
export function SwitchLayout({
  as: Component = 'div',
  gap = 'lg',
  columnAlign = 'start',
  columnJustify = 'start',
  rowAlign = 'start',
  rowJustify = 'start',
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
        alignClasses[columnAlign],
        justifyClasses[columnJustify],
        responsiveAlignClasses[breakpoint][rowAlign],
        switchJustifyClasses[breakpoint][rowJustify],
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
