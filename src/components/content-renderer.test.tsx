import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { DmReference } from '#/components/dm/dm-reference'

import { ContentRenderer } from './content-renderer'
import { DmReferenceContext } from './dm-reference-context'

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

  it('leaves out records players have not met on player pages', () => {
    const markup = renderToStaticMarkup(
      <ContentRenderer
        content={[['Rumours of ', { ref: 'location', key: 'night_mothers_church' }, '.']]}
      />,
    )

    expect(markup).not.toContain('Night Mother')
  })

  it('names records players have not met on DM pages', () => {
    const markup = renderToStaticMarkup(
      <DmReferenceContext value={DmReference}>
        <ContentRenderer
          content={[['Rumours of ', { ref: 'location', key: 'night_mothers_church' }, '.']]}
        />
      </DmReferenceContext>,
    )

    expect(markup).toContain('Night Mother')
    expect(markup).toContain('players have not met yet')
  })

  it('shows a scene pointer only through the DM renderer for hidden records', () => {
    const content = [['Run ', { ref: 'scene', key: 'the_clogged_ferry_landing' }, '.']] as const
    const DmStub = ({ reference }: { reference: { ref: string; key: string } }) => (
      <a href={`#${reference.ref}:${reference.key}`}>scene link</a>
    )

    expect(renderToStaticMarkup(<ContentRenderer content={content.map((p) => [...p])} />)).toBe(
      renderToStaticMarkup(<ContentRenderer content={[['Run ', '.']]} />),
    )
    expect(
      renderToStaticMarkup(
        <DmReferenceContext value={DmStub}>
          <ContentRenderer content={content.map((p) => [...p])} />
        </DmReferenceContext>,
      ),
    ).toContain('href="#scene:the_clogged_ferry_landing"')
  })
})
