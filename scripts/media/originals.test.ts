import { describe, expect, it } from 'vitest'

import { isOriginalRaster, objectKey, serializeLock } from './originals.ts'

describe('original artwork lock', () => {
  it('writes one sorted entry per line that parses back unchanged', () => {
    const lock = {
      'assets/images/maps/b.png': { sha256: 'b'.repeat(64), bytes: 2 },
      'assets/images/content/a.jpg': { sha256: 'a'.repeat(64), bytes: 1 },
    }
    const text = serializeLock(lock)
    expect(text.split('\n')[1]).toContain('assets/images/content/a.jpg')
    expect(text.trim().split('\n')).toHaveLength(4)
    expect(JSON.parse(text)).toEqual(lock)
  })

  it('keeps app icons in git and everything else in R2', () => {
    expect(isOriginalRaster('assets/images/app/logo512.png')).toBe(false)
    expect(isOriginalRaster('assets/images/maps/skynet.PNG')).toBe(true)
    expect(isOriginalRaster('assets/fonts/inter/Inter-Bold.ttf')).toBe(false)
  })

  it('names objects by content with a lower-case extension', () => {
    expect(objectKey('assets/images/maps/a.JPEG', 'f'.repeat(64))).toBe(
      `originals/${'f'.repeat(64)}.jpeg`,
    )
  })
})
