import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { ContentRenderer } from './content-renderer'

describe('ContentRenderer', () => {
  it('renders an external link within an inline content run', () => {
    const markup = renderToStaticMarkup(
      <ContentRenderer
        content={[
          [
            'Draw from the ',
            {
              type: 'link',
              label: 'Deck of Many More Things',
              url: 'https://example.com/deck',
            },
            '.',
          ],
        ]}
      />,
    )

    expect(markup).toContain('href="https://example.com/deck"')
    expect(markup).toContain('target="_blank"')
    expect(markup).toContain('rel="noreferrer"')
    expect(markup).toContain('Deck of Many More Things')
    expect(markup).toContain('Draw from the ')
  })
})
