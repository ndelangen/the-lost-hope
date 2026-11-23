import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      span: {
        side: 'left',
        width: 0.45,
        panel: { event: refs.events.n2_e149, art: { from: 'event' } },
        rows: [
          {
            layout: 'tiltStack',
            panels: [
              { event: refs.events.n2_e150, art: { from: 'event' } },
              { event: refs.events.n2_e151, art: { from: 'event' } },
            ],
          },
          {
            layout: 'slash',
            panels: [
              { event: refs.events.n2_e152, art: { from: 'event' } },
              { event: refs.events.n2_e153, art: { from: 'event' } },
            ],
          },
          { layout: 'full', panels: [{ event: refs.events.n2_e154, art: { from: 'event' } }] },
        ],
      },
    },
    {
      layout: 'tiltStack',
      panels: [
        { event: refs.events.n2_e155, art: { from: 'event' } },
        { event: refs.events.n2_e156, art: { from: 'event' } },
      ],
    },
  ],
})
