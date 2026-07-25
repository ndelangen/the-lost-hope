import { isEntityRef, type EntityKind, type EntityRef } from '#/definitions/kind'
import { entityHref, resolveRef, type Entity } from '#/lib/campaign'

export type SnapshotScalar = string | number | boolean | null

export type SnapshotValue = SnapshotScalar | SnapshotValue[] | { [key: string]: SnapshotValue }

export type EntrySnapshotV1 = {
  snapshotVersion: 1
  entity: {
    kind: EntityKind
    slug: string
    name: string
    path: string
  }
  data: { [key: string]: SnapshotValue }
}

type ResolveReference = (reference: EntityRef) => Entity | undefined

function encodeReference(reference: EntityRef, resolveReference: ResolveReference): SnapshotValue {
  const resolved = resolveReference(reference)
  return resolved
    ? {
        $ref: {
          kind: reference.ref,
          key: reference.key,
          slug: resolved.slug,
          name: resolved.data.name,
        },
      }
    : {
        $ref: {
          kind: reference.ref,
          key: reference.key,
          unresolved: true,
        },
      }
}

function encodeValue(
  value: unknown,
  resolveReference: ResolveReference,
  path: string,
): SnapshotValue | undefined {
  if (value === undefined) return undefined
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return value
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new Error(`Cannot snapshot non-finite number at ${path}`)
    return value
  }
  if (value instanceof Date) return { $date: value.toISOString() }
  if (isEntityRef(value)) return encodeReference(value, resolveReference)
  if (Array.isArray(value)) {
    return value.map((item, index) => {
      const encoded = encodeValue(item, resolveReference, `${path}[${index}]`)
      if (encoded === undefined) throw new Error(`Cannot snapshot undefined array item at ${path}`)
      return encoded
    })
  }
  if (typeof value === 'object') {
    const encoded: { [key: string]: SnapshotValue } = {}
    for (const key of Object.keys(value).toSorted()) {
      const child = encodeValue(
        (value as Record<string, unknown>)[key],
        resolveReference,
        `${path}.${key}`,
      )
      if (child !== undefined) encoded[key] = child
    }
    return encoded
  }

  throw new Error(`Cannot snapshot ${typeof value} at ${path}`)
}

export function buildEntrySnapshot(
  entity: Entity,
  resolveReference: ResolveReference = resolveRef,
): EntrySnapshotV1 {
  const canonicalData = Object.fromEntries(
    Object.entries(entity.data).filter(([key]) => key !== 'name' && key !== 'slug'),
  )
  const data = encodeValue(canonicalData, resolveReference, 'data')
  if (!data || Array.isArray(data) || typeof data !== 'object') {
    throw new Error(`Expected object data for ${entity.kind}/${entity.slug}`)
  }

  return {
    snapshotVersion: 1,
    entity: {
      kind: entity.kind,
      slug: entity.slug,
      name: entity.data.name,
      path: entityHref(entity.kind, entity.slug),
    },
    data,
  }
}
