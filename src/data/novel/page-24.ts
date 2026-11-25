import { refs } from '#/data/generated/refs.ts'
import { create as createPage } from '#/definitions/novel.ts'

export default createPage({
  blocks: [
    {
      span: {
        side: 'right',
        width: 0.3333,
        panel: { event: refs.events.n2_e147, art: { from: 'event' } },
        rows: [
          {
            layout: 'cut',
            panels: [
              { event: refs.events.n2_e142, art: { from: 'event' } },
              { event: refs.events.n2_e143, art: { from: 'event' } },
            ],
          },
          {
            layout: 'stripBelow',
            panels: [
              { event: refs.events.n2_e144, art: { from: 'event' } },
              { event: refs.events.n2_e145, art: { from: 'event' } },
              { event: refs.events.n2_e146, art: { from: 'event' } },
            ],
          },
        ],
      },
    },
    { layout: 'bleedSplash', panels: [{ event: refs.events.n2_e148, art: { from: 'event' } }] },
  ],
})
