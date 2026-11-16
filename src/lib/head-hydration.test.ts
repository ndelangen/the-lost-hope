// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'

import { removeHeadWhitespace } from './head-hydration'

describe('removeHeadWhitespace', () => {
  it('removes the whitespace a host injects into head and keeps elements and comments', () => {
    document.head.innerHTML =
      '<meta charset="utf-8">\n<!-- This site is hosted on Netlify --><meta name="viewport" content="x">'
    removeHeadWhitespace(document.head)
    expect(Array.from(document.head.childNodes, (node) => node.nodeName)).toEqual([
      'META',
      '#comment',
      'META',
    ])
  })
})
