// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react'
import type { CSSProperties, ReactNode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { LocationHierarchyMapModel } from '#/lib/location-hierarchy-map'

import { LocationMapLegend, LocationMapPlot } from './location-hierarchy-map'

vi.mock('#/components/location-reference', () => ({
  LocationReference: ({
    slug,
    label,
    children,
    className,
    wrapperClassName,
    wrapperStyle,
  }: {
    slug: string
    label: string
    children?: () => ReactNode
    className?: string
    wrapperClassName?: string
    wrapperStyle?: CSSProperties
  }) => (
    <span className={wrapperClassName} style={wrapperStyle}>
      <a href={`/locations/detail/${slug}`} className={className}>
        {children?.() ?? label}
      </a>
    </span>
  ),
}))

const map: LocationHierarchyMapModel = {
  asset: {
    url: 'https://placehold.co/1050x700?text=Map',
    width: 1050,
    height: 700,
  },
  points: [
    {
      id: 'location:nimbus',
      slug: 'nimbus',
      name: 'Nimbus',
      icon: 'lucide/Cloud',
      left: 0,
      top: 0,
      current: true,
    },
    {
      id: 'location:tempest',
      slug: 'tempest',
      name: 'Tempest',
      left: 0,
      top: 0,
      current: false,
    },
  ],
}

describe('location hierarchy map', () => {
  afterEach(cleanup)

  it('labels outgoing portal pins and legends without presenting them as contained places', () => {
    const portalMap: LocationHierarchyMapModel = {
      ...map,
      points: [
        {
          ...map.points[1]!,
          id: 'connection:return',
          icon: 'gi/GiMagicPortal',
          connection: { type: 'portal', label: 'Return portal' },
        },
      ],
    }
    render(
      <>
        <LocationMapPlot map={portalMap} label="Arena connections" />
        <LocationMapLegend map={portalMap} />
      </>,
    )
    expect(screen.getAllByRole('link', { name: /Return portal → Tempest/u })).toHaveLength(2)
    expect(screen.getByText('Portal · Travel from this location')).toBeTruthy()
    expect(screen.queryByText('Contained location')).toBeNull()
    expect(screen.queryByText('You are here')).toBeNull()
    expect(screen.getByTitle('Return portal → Tempest').className).toContain('border-violet-500')
  })

  it('keeps icon-only pins accessible and exposes every place in the legend', () => {
    render(
      <>
        <LocationMapPlot map={map} label="Nimbus within Three Sky Kingdoms" />
        <LocationMapLegend map={map} />
      </>,
    )

    expect(screen.getByText('Schematic map')).toBeTruthy()
    expect(screen.getByTitle('Nimbus — You are here')).toBeTruthy()
    expect(screen.getByTitle('Tempest')).toBeTruthy()
    expect(screen.getByText('You are here')).toBeTruthy()
    expect(screen.getAllByRole('link')).toHaveLength(4)
    expect(screen.getAllByRole('link').every((link) => link.getAttribute('href'))).toBe(true)
  })

  it('can limit the legend to the current location', () => {
    render(<LocationMapLegend map={map} currentOnly />)

    expect(screen.getByText('Nimbus')).toBeTruthy()
    expect(screen.getByText('You are here')).toBeTruthy()
    expect(screen.queryByText('Tempest')).toBeNull()
    expect(screen.getAllByRole('link')).toHaveLength(1)
  })

  it('renders an empty location map without navigation points', () => {
    render(<LocationMapPlot map={{ ...map, points: [] }} label="Map of Tempest" />)

    expect(screen.getByLabelText('Map of Tempest')).toBeTruthy()
    expect(screen.getByText('Schematic map')).toBeTruthy()
    expect(screen.queryByRole('link')).toBeNull()
  })

  it.each([
    ['/assets/maps/serpent-eclipse-maze.jpg', 1536, 1024],
    ['/assets/maps/serpent-eclipse-three-door-chamber.jpg', 1536, 1024],
  ])('preserves the artwork proportions and pin alignment for %s', (url, width, height) => {
    const model = {
      asset: { url, width, height },
      points: [{ ...map.points[0]!, left: 25, top: 75 }],
    }
    render(<LocationMapPlot map={model} label="Dungeon map" />)
    const figure = screen.getByLabelText('Dungeon map')
    expect(figure.style.aspectRatio).toBe(`${width} / ${height}`)
    expect(figure.className).not.toContain('min-h-64')
    const image = figure.querySelector('img')
    expect(image?.className).toContain('object-contain')
    expect(image?.getAttribute('loading')).toBe('lazy')
    expect(image?.getAttribute('sizes')).toBe('auto, (min-width: 1024px) 720px, calc(100vw - 2rem)')
    expect(image?.getAttribute('srcset')).toContain(`${Math.min(width, 1280)}w`)
    expect(image?.getAttribute('width')).toBe(String(width))
    expect(image?.getAttribute('height')).toBe(String(height))
    expect(screen.queryByText('Schematic map')).toBeNull()
    const pin = screen.getByRole('link').parentElement
    expect(pin?.style.left).toBe('25%')
    expect(pin?.style.top).toBe('75%')
  })
})
