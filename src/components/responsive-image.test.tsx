// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ResponsiveImage } from './responsive-image'

describe('ResponsiveImage', () => {
  afterEach(cleanup)

  it('renders the smallest progressive derivative as src with an intrinsic responsive set', () => {
    render(
      <ResponsiveImage
        src="/assets/pcs/jim.jpg"
        alt="Jim"
        sizes="20px"
        maxWidth={64}
        loading="eager"
      />,
    )

    const image = screen.getByAltText('Jim') as HTMLImageElement
    expect(image.getAttribute('src')).toMatch(/jim\.[a-f\d]+\.w32\.jpg$/u)
    expect(image.getAttribute('srcset')).toContain('w64.jpg 64w')
    expect(image.getAttribute('srcset')).not.toContain('w128.jpg')
    expect(image.getAttribute('sizes')).toBe('20px')
    expect(image.getAttribute('width')).toBe('1024')
    expect(image.getAttribute('height')).toBe('1024')
    expect(image.getAttribute('loading')).toBe('eager')
  })
})
