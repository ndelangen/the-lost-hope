import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      layout: 'tiltStack',
      panels: [
        { event: refs.events.n2_e104, art: { from: 'event' } },
        { event: refs.events.n2_e111, art: { from: 'event' } },
      ],
    },
    {
      layout: 'quarters',
      panels: [
        { event: refs.events.n2_e105, art: { from: 'event' } },
        { event: refs.events.n2_e112, art: { from: 'event' } },
        { event: refs.events.n2_e113, art: { from: 'event' } },
        { event: refs.events.n2_e114, art: { from: 'event' } },
      ],
    },
    {
      layout: 'thirds',
      panels: [
        { event: refs.events.n2_e115, art: { from: 'event' } },
        { event: refs.events.n2_e107, art: { from: 'event' } },
        { event: refs.events.n2_e116, art: { from: 'event' } },
      ],
    },
  ],
})
