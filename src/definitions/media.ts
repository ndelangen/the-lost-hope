import { z } from 'zod'

/** Self-hosted fallback when an entity has no avatar or the asset is missing. */
export const DEFAULT_AVATAR = '/assets/pcs/placeholder.svg'

/** Self-hosted illustration shown when a location has no individual artwork. */
export const DEFAULT_LOCATION_ILLUSTRATION = '/assets/locations/placeholder.svg'

/** Accepts absolute URLs and site-relative asset paths. */
export const MediaUrl = z.string().min(1)
