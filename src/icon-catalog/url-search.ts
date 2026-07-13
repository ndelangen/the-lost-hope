import { z } from 'zod'

import { ICON_CLASSIFICATIONS, ICON_SOURCES } from './types'

export const iconCatalogUrlSearchSchema = z.object({
  q: z.string().optional(),
  group: z.enum(ICON_CLASSIFICATIONS).optional().catch(undefined),
  source: z.enum(ICON_SOURCES).optional().catch(undefined),
  category: z.string().optional(),
})

export type IconCatalogUrlSearch = z.infer<typeof iconCatalogUrlSearchSchema>
