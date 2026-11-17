import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { DmHiddenReference } from '#/components/dm/dm-hidden-reference'

import { ContentRenderer, HiddenReferenceContext } from './content-renderer'

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
      <HiddenReferenceContext value={DmHiddenReference}>
        <ContentRenderer
          content={[['Rumours of ', { ref: 'location', key: 'night_mothers_church' }, '.']]}
        />
      </HiddenReferenceContext>,
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
        <HiddenReferenceContext value={DmStub}>
          <ContentRenderer content={content.map((p) => [...p])} />
        </HiddenReferenceContext>,
      ),
    ).toContain('href="#scene:the_clogged_ferry_landing"')
  })
})
