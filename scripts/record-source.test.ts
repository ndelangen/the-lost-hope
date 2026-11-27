import { describe, expect, it } from 'vitest'

import {
  addToIndex,
  applyRecordEdits,
  Conflict,
  definitionModule,
  NotEditable,
  readRecord,
  recordModule,
} from './record-source.ts'

const BADESH = `import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

// A comment that must survive.
export default createLocation({
  name: 'Badesh',
  icon: 'gi/GiHutsVillage',
  parent: refs.locations.world,
  at: [125, 250],
  notes: [['A small forest town — hometown of ', refs.pcs.victor_dranzig, '.']],
})
`

const potion = { ref: 'magicItem', key: 'potion_of_healing' }

describe('readRecord', () => {
  it('reads literals and refs', () => {
    expect(readRecord(BADESH)).toEqual({
      name: 'Badesh',
      icon: 'gi/GiHutsVillage',
      parent: { ref: 'location', key: 'world' },
      at: [125, 250],
      notes: [['A small forest town — hometown of ', { ref: 'pc', key: 'victor_dranzig' }, '.']],
    })
  })

  it('finds the definition module', () => {
    expect(definitionModule(BADESH)).toBe('#/definitions/location.ts')
  })
})

describe('applyRecordEdits', () => {
  it('adds a field, with the library refs import it needs, and leaves the rest alone', () => {
    const next = applyRecordEdits(BADESH, [
      {
        op: 'set',
        path: ['shop'],
        value: { type: 'alchemist', stock: [{ item: potion, quantity: 3 }] },
      },
    ])
    expect(next).toContain(
      "shop: { type: 'alchemist', stock: [{ item: libraryRefs.magicItems.potion_of_healing, quantity: 3 }] },",
    )
    expect(next).toContain("import { refs as libraryRefs } from '#/data/generated/library-refs.ts'")
    expect(next).toContain('// A comment that must survive.')
    expect(readRecord(next).shop).toEqual({
      type: 'alchemist',
      stock: [{ item: potion, quantity: 3 }],
    })
  })

  it('replaces only the edited value', () => {
    const next = applyRecordEdits(BADESH, [
      { op: 'set', path: ['at', 0], value: 130, expected: 125 },
    ])
    expect(next).toBe(BADESH.replace('[125, 250]', '[130, 250]'))
  })

  it('refuses an edit when the file changed underneath', () => {
    expect(() =>
      applyRecordEdits(BADESH, [{ op: 'set', path: ['name'], value: 'X', expected: 'Old name' }]),
    ).toThrow(Conflict)
    expect(() =>
      applyRecordEdits(BADESH, [{ op: 'set', path: ['shop'], value: {}, expected: { type: 'x' } }]),
    ).toThrow(Conflict)
  })

  it('removes a field', () => {
    const next = applyRecordEdits(BADESH, [{ op: 'remove', path: ['at'], expected: [125, 250] }])
    expect(readRecord(next)).not.toHaveProperty('at')
    expect(readRecord(next).notes).toBeDefined()
    const last = applyRecordEdits(BADESH, [
      { op: 'remove', path: ['notes'], expected: readRecord(BADESH).notes },
    ])
    expect(Object.keys(readRecord(last))).toEqual(['name', 'icon', 'parent', 'at'])
  })

  it('appends to a list', () => {
    const next = applyRecordEdits(BADESH, [{ op: 'set', path: ['at', 2], value: 9 }])
    expect(readRecord(next).at).toEqual([125, 250, 9])
  })

  it('refuses values the file computes', () => {
    const computed = BADESH.replace("icon: 'gi/GiHutsVillage',", '...base,')
    expect(() =>
      applyRecordEdits(computed, [
        { op: 'set', path: ['shop'], value: { type: 'bakery', stock: [] } },
      ]),
    ).toThrow(NotEditable)
  })
})

describe('recordModule', () => {
  it('prints a new record with the imports its refs need', () => {
    const source = recordModule('location', {
      name: 'The Gilded Flask',
      type: 'building',
      parent: { ref: 'location', key: 'fairhaven' },
      at: [100, 200],
      shop: { type: 'alchemist', stock: [{ item: { ref: 'equipment', key: 'antitoxin' } }] },
    })
    expect(source).toContain("import { create as createLocation } from '#/definitions/location.ts'")
    expect(source).toContain("import { refs } from '#/data/generated/refs.ts'")
    expect(source).toContain(
      "import { refs as libraryRefs } from '#/data/generated/library-refs.ts'",
    )
    expect(readRecord(source)).toEqual({
      name: 'The Gilded Flask',
      type: 'building',
      parent: { ref: 'location', key: 'fairhaven' },
      at: [100, 200],
      shop: { type: 'alchemist', stock: [{ item: { ref: 'equipment', key: 'antitoxin' } }] },
    })
  })
})

describe('addToIndex', () => {
  it('adds the import and the registry entry', () => {
    const index = "import a from './a.ts'\n\nexport default {\n  a,\n}\n"
    expect(addToIndex(index, { slug: 'b-c', key: 'b_c' })).toBe(
      "import a from './a.ts'\nimport b_c from './b-c.ts'\n\nexport default {\n  a,\n  b_c,\n}\n",
    )
  })
})

describe('unused ref imports', () => {
  it('drops the library refs import once the last library ref is removed', () => {
    const withShop = applyRecordEdits(BADESH, [
      { op: 'set', path: ['shop'], value: { type: 'alchemist', stock: [{ item: potion }] } },
    ])
    const removed = applyRecordEdits(withShop, [
      { op: 'remove', path: ['shop'], expected: { type: 'alchemist', stock: [{ item: potion }] } },
    ])
    expect(removed).not.toContain('library-refs')
    expect(removed).toContain("import { refs } from '#/data/generated/refs.ts'")
  })
})
