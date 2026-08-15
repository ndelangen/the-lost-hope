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
    url: 'https://placehold.co/1000x700?text=Map',
    width: 1000,
    height: 700,
  },
  points: [
    {
      slug: 'nimbus',
      name: 'Nimbus',
      icon: 'lucide/Cloud',
      left: 0,
      top: 0,
      current: true,
    },
    {
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
})
