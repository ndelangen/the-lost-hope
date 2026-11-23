import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      span: {
        side: 'left',
        width: 0.45,
        panel: { event: refs.events.n2_e185, art: { from: 'event' } },
        rows: [
          { layout: 'full', panels: [{ event: refs.events.n2_e186, art: { from: 'event' } }] },
          {
            layout: 'wideLeft',
            panels: [
              { event: refs.events.n2_e187, art: { from: 'event' } },
              { event: refs.events.n2_e188, art: { from: 'event' } },
            ],
          },
          {
            layout: 'tiltStack',
            panels: [
              { event: refs.events.n2_e189, art: { from: 'event' } },
              { event: refs.events.n2_e190, art: { from: 'event' } },
            ],
          },
        ],
      },
    },
    { layout: 'full', panels: [{ event: refs.events.n2_e191, art: { from: 'event' } }] },
  ],
})
