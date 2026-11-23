import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'insetRight',
      panels: [
        { event: refs.events.n2_e135, art: { from: 'event' } },
        { event: refs.events.n2_e136, art: { from: 'event' } },
      ],
    },
    {
      layout: 'quarters',
      panels: [
        { event: refs.events.n2_e137, art: { from: 'event' } },
        { event: refs.events.n2_e138, art: { from: 'event' } },
        { event: refs.events.n2_e139, art: { from: 'event' } },
        { event: refs.events.n2_e140, art: { from: 'event' } },
      ],
    },
    { layout: 'full', panels: [{ event: refs.events.n2_e141, art: { from: 'event' } }] },
  ],
})
