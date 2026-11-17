import { describe, expect, it } from 'vitest'

import { parsePlayerScreenPointer, spotOnPicture } from './player-screen-pointer'

describe('spotOnPicture', () => {
  const box = { left: 100, top: 50, width: 400, height: 200 }

  it('gives the spot as fractions of the picture', () => {
    expect(spotOnPicture(box, 300, 100)).toEqual({ x: 0.5, y: 0.25 })
  })

  it('keeps a pointer dragged off the picture on its edge', () => {
    expect(spotOnPicture(box, 0, 400)).toEqual({ x: 0, y: 1 })
  })

  it('points at the middle of a picture with no size yet', () => {
    expect(spotOnPicture({ left: 0, top: 0, width: 0, height: 0 }, 10, 10)).toEqual({
      x: 0.5,
      y: 0.5,
    })
  })
})

describe('parsePlayerScreenPointer', () => {
  it('reads pings, the laser and letting go', () => {
    const spot = { x: 0.2, y: 0.8 }
    expect(parsePlayerScreenPointer({ kind: 'ping', picture: 'map:location:a', spot })).toEqual({
      kind: 'ping',
      picture: 'map:location:a',
      spot,
    })
    expect(parsePlayerScreenPointer({ kind: 'laser-off', picture: 'map:location:a' })).toEqual({
      kind: 'laser-off',
      picture: 'map:location:a',
    })
  })

  it('ignores anything else on the channel', () => {
    expect(parsePlayerScreenPointer('present')).toBeUndefined()
    expect(
      parsePlayerScreenPointer({ kind: 'ping', picture: 'x', spot: { x: 2, y: 0 } }),
    ).toBeUndefined()
  })
})
