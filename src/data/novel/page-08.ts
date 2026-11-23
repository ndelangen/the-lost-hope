import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    { layout: 'bleedSplash', panels: [{ event: refs.events.n2_e102, art: { from: 'event' } }] },
    {
      span: {
        side: 'right',
        width: 0.3333,
        panel: { event: refs.events.n2_e043, art: { from: 'event' } },
        rows: [
          {
            layout: 'wideLeft',
            panels: [
              { event: refs.events.n2_e041, art: { from: 'event' } },
              { event: refs.events.n2_e121, art: { from: 'event' } },
            ],
          },
          {
            layout: 'tallLeft',
            panels: [
              { event: refs.events.n2_e042, art: { from: 'event' } },
              { event: refs.events.n2_e071, art: { from: 'event' } },
              { event: refs.events.n2_e082, art: { from: 'event' } },
            ],
          },
        ],
      },
    },
  ],
})
