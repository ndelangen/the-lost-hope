export const ICON_SOURCES = ['lucide', 'fa', 'gi', 'custom'] as const
export type IconSource = (typeof ICON_SOURCES)[number]

export const ICON_CLASSIFICATIONS = ['useful', 'questionable', 'marked-for-deletion'] as const
export type IconClassification = (typeof ICON_CLASSIFICATIONS)[number]

export type IconCatalogEntry = {
  id: string
  source: IconSource
  componentName: string
  label: string
  description: string
  sourceDescription?: string
  attribution?: string
  metadataConfidence: 'source' | 'ambiguous-source' | 'name-derived' | 'custom'
  aliases: Array<string>
  associatedTerms: Array<string>
  keywords: Array<string>
  sourceCategories: Array<string>
  categories: Array<string>
  useCases: Array<string>
  classification: IconClassification
  classificationReason: string
  duplicateOf?: string
  sourceUrl?: string
  usedIn: Array<string>
}

export type IconCatalogSource = {
  id: IconSource
  label: string
  license: string
  url?: string
  canonicalFor?: string
}

export type IconCatalog = {
  schemaVersion: 2
  sources: Array<IconCatalogSource>
  entries: Array<IconCatalogEntry>
}

export type IconCatalogOverride = Partial<
  Pick<
    IconCatalogEntry,
    | 'classification'
    | 'classificationReason'
    | 'description'
    | 'sourceDescription'
    | 'attribution'
    | 'aliases'
    | 'associatedTerms'
    | 'keywords'
    | 'sourceCategories'
    | 'categories'
    | 'useCases'
    | 'duplicateOf'
    | 'sourceUrl'
  >
>
