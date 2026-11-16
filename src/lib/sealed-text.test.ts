import { describe, expect, it } from 'vitest'

import { normalizePassword, sealText, sealedLength, unsealText } from '#/lib/sealed-text'

describe('sealed text', () => {
  it('ignores case, spaces and punctuation in passwords', () => {
    expect(normalizePassword(' Ink-well! ')).toBe('INKWELL')
  })

  it('unseals with the right password in any case', async () => {
    const sealed = await sealText('Meet me at dawn.', 'Inkwell')
    expect(await unsealText(sealed, ' inkwell ')).toBe('Meet me at dawn.')
  })

  it('refuses a wrong password and never ships the text', async () => {
    const sealed = await sealText('Meet me at dawn.', 'inkwell')
    expect(await unsealText(sealed, 'quill')).toBeNull()
    expect(JSON.stringify(sealed)).not.toContain('dawn')
    expect(sealedLength(sealed)).toBe('Meet me at dawn.'.length)
  })
})
