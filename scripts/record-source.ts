/**
 * Reads and edits one record inside a campaign data module, by its syntax tree. A record is the
 * object passed to the module's default-exported `create(...)` call. Edits splice the text of the
 * changed field only; the rest of the file is left byte for byte.
 */
import ts from 'typescript'

export type RecordPath = readonly (string | number)[]

/** `expected` is the value the editor saw; `undefined` means the field was absent. */
export type RecordEdit =
  | { op: 'set'; path: RecordPath; value: unknown; expected?: unknown }
  | { op: 'remove'; path: RecordPath; expected: unknown }

/** The file computes this value (a spread, a helper call), so it cannot be edited from the page. */
export class NotEditable extends Error {}

/** The file no longer holds what the editor saw: someone else changed it. */
export class Conflict extends Error {}

const CAMPAIGN_PLURALS: Readonly<Record<string, string>> = {
  beasts: 'beast',
  events: 'event',
  npcs: 'npc',
  pcs: 'pc',
  locations: 'location',
  quests: 'quest',
  sessions: 'session',
  organizations: 'organization',
  items: 'item',
  effects: 'effect',
  cards: 'card',
  arcs: 'arc',
  scenes: 'scene',
  creatures: 'creature',
  rules: 'rule',
}

const LIBRARY_PLURALS: Readonly<Record<string, string>> = {
  publications: 'publication',
  monsters: 'monster',
  spells: 'spell',
  magicItems: 'magicItem',
}

const pluralOf = (table: Readonly<Record<string, string>>, kind: string) =>
  Object.entries(table).find(([, value]) => value === kind)?.[0]

const CAMPAIGN_REFS_MODULE = '#/data/generated/refs.ts'
const LIBRARY_REFS_MODULE = '#/data/generated/library-refs.ts'

type RefImports = { campaign?: string; library?: string }

function parse(source: string) {
  return ts.createSourceFile('record.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
}

/** The local names this file imports the generated `refs` objects under. */
function refImports(file: ts.SourceFile): RefImports {
  const found: RefImports = {}
  for (const statement of file.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier))
      continue
    const from = statement.moduleSpecifier.text.replace(/\.ts$/, '')
    const bindings = statement.importClause?.namedBindings
    if (!bindings || !ts.isNamedImports(bindings)) continue
    for (const element of bindings.elements) {
      if ((element.propertyName ?? element.name).text !== 'refs') continue
      if (from === CAMPAIGN_REFS_MODULE.replace(/\.ts$/, '')) found.campaign = element.name.text
      if (from === LIBRARY_REFS_MODULE.replace(/\.ts$/, '')) found.library = element.name.text
    }
  }
  return found
}

/** The record object: the first argument of the default-exported call. */
function recordObject(file: ts.SourceFile): ts.ObjectLiteralExpression {
  for (const statement of file.statements) {
    if (!ts.isExportAssignment(statement) || statement.isExportEquals) continue
    const call = statement.expression
    const record = ts.isCallExpression(call) ? call.arguments[0] : undefined
    if (record && ts.isObjectLiteralExpression(record)) return record
  }
  throw new NotEditable('The file does not export a record as `export default create({ … })`')
}

const propertyName = (property: ts.ObjectLiteralElementLike) =>
  ts.isPropertyAssignment(property) &&
  (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))
    ? property.name.text
    : undefined

function findProperty(object: ts.ObjectLiteralExpression, name: string) {
  for (const property of object.properties) {
    if (propertyName(property) === name) return property as ts.PropertyAssignment
    if (!ts.isPropertyAssignment(property))
      throw new NotEditable(`The record computes some of its fields here: ${property.getText()}`)
  }
  return undefined
}

const unwrap = (node: ts.Expression): ts.Expression =>
  ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node)
    ? unwrap(node.expression)
    : node

/** The value a literal expression stands for; refs become `{ ref, key }`. */
export function evaluate(node: ts.Expression, imports: RefImports): unknown {
  node = unwrap(node)
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (
    ts.isPrefixUnaryExpression(node) &&
    node.operator === ts.SyntaxKind.MinusToken &&
    ts.isNumericLiteral(node.operand)
  )
    return -Number(node.operand.text)
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (node.kind === ts.SyntaxKind.NullKeyword) return null
  if (ts.isArrayLiteralExpression(node))
    return node.elements.map((element) => {
      if (ts.isSpreadElement(element)) throw new NotEditable(element.getText())
      return evaluate(element, imports)
    })
  if (ts.isObjectLiteralExpression(node)) {
    const value: Record<string, unknown> = {}
    for (const property of node.properties) {
      const name = propertyName(property)
      if (name === undefined || !ts.isPropertyAssignment(property))
        throw new NotEditable(property.getText())
      value[name] = evaluate(property.initializer, imports)
    }
    return value
  }
  if (
    ts.isPropertyAccessExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    ts.isIdentifier(node.expression.expression)
  ) {
    const root = node.expression.expression.text
    const plural = node.expression.name.text
    const table =
      root === imports.campaign
        ? CAMPAIGN_PLURALS
        : root === imports.library
          ? LIBRARY_PLURALS
          : undefined
    const kind = table?.[plural]
    if (kind) return { ref: kind, key: node.name.text }
  }
  throw new NotEditable(`Not a plain value: ${node.getText()}`)
}

const IDENTIFIER = /^[A-Za-z_$][\w$]*$/u

const quote = (text: string) =>
  `'${text.replaceAll('\\', '\\\\').replaceAll("'", "\\'").replaceAll('\n', '\\n')}'`

const isRef = (value: unknown): value is { ref: string; key: string } =>
  !!value &&
  typeof value === 'object' &&
  Object.keys(value).length === 2 &&
  typeof (value as { ref?: unknown }).ref === 'string' &&
  typeof (value as { key?: unknown }).key === 'string'

/** Prints a value as source, with refs as `refs.<kind plural>.<key>`. */
function print(value: unknown, names: Required<RefImports>, used: Set<keyof RefImports>): string {
  if (value === null) return 'null'
  if (typeof value === 'string') return quote(value)
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new TypeError(`Cannot write the number ${value}`)
    return String(value)
  }
  if (typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) return `[${value.map((item) => print(item, names, used)).join(', ')}]`
  if (isRef(value)) {
    const campaign = pluralOf(CAMPAIGN_PLURALS, value.ref)
    const library = pluralOf(LIBRARY_PLURALS, value.ref)
    const scope = campaign ? 'campaign' : library ? 'library' : undefined
    if (!scope || !IDENTIFIER.test(value.key))
      throw new TypeError(`Cannot write the reference ${value.ref} ${value.key}`)
    used.add(scope)
    return `${names[scope]}.${campaign ?? library}.${value.key}`
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value).filter(([, item]) => item !== undefined)
    if (entries.length === 0) return '{}'
    return `{ ${entries
      .map(
        ([name, item]) =>
          `${IDENTIFIER.test(name) ? name : quote(name)}: ${print(item, names, used)}`,
      )
      .join(', ')} }`
  }
  throw new TypeError(`Cannot write a ${typeof value}`)
}

function equal(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false
  if (Array.isArray(a) !== Array.isArray(b)) return false
  const keysA = Object.keys(a).filter((key) => (a as Record<string, unknown>)[key] !== undefined)
  const keysB = Object.keys(b).filter((key) => (b as Record<string, unknown>)[key] !== undefined)
  return (
    keysA.length === keysB.length &&
    keysA.every((key) =>
      equal((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]),
    )
  )
}

type Located =
  | {
      kind: 'property'
      object: ts.ObjectLiteralExpression
      name: string
      node?: ts.PropertyAssignment
    }
  | { kind: 'element'; array: ts.ArrayLiteralExpression; index: number; node?: ts.Expression }

function locate(record: ts.ObjectLiteralExpression, path: RecordPath): Located {
  if (path.length === 0) throw new NotEditable('An edit needs a field to change')
  let container: ts.Expression = record
  for (const [depth, segment] of path.entries()) {
    const last = depth === path.length - 1
    container = unwrap(container)
    if (typeof segment === 'string') {
      if (!ts.isObjectLiteralExpression(container))
        throw new NotEditable(`${path.slice(0, depth).join('.')} is not an object`)
      const property = findProperty(container, segment)
      if (last) return { kind: 'property', object: container, name: segment, node: property }
      if (!property) throw new NotEditable(`${path.slice(0, depth + 1).join('.')} is not set`)
      container = property.initializer
    } else {
      if (!ts.isArrayLiteralExpression(container))
        throw new NotEditable(`${path.slice(0, depth).join('.')} is not a list`)
      const element = container.elements[segment]
      if (element && ts.isSpreadElement(element)) throw new NotEditable(element.getText())
      if (last) return { kind: 'element', array: container, index: segment, node: element }
      if (!element) throw new NotEditable(`${path.slice(0, depth + 1).join('.')} does not exist`)
      container = element
    }
  }
  throw new Error('unreachable')
}

const located = (target: Located, imports: RefImports) =>
  target.node === undefined
    ? undefined
    : evaluate(target.kind === 'property' ? target.node.initializer : target.node, imports)

const splice = (source: string, start: number, end: number, text: string) =>
  source.slice(0, start) + text + source.slice(end)

/** Adds the generated-refs imports a printed value needs. */
function withImports(source: string, used: Set<keyof RefImports>, names: Required<RefImports>) {
  const imports = refImports(parse(source))
  const lines = [
    used.has('campaign') && !imports.campaign
      ? `import { refs${names.campaign === 'refs' ? '' : ` as ${names.campaign}`} } from '${CAMPAIGN_REFS_MODULE}'\n`
      : '',
    used.has('library') && !imports.library
      ? `import { refs${names.library === 'refs' ? '' : ` as ${names.library}`} } from '${LIBRARY_REFS_MODULE}'\n`
      : '',
  ].join('')
  return lines + source
}

function applyEdit(source: string, edit: RecordEdit): string {
  const file = parse(source)
  const imports = refImports(file)
  const names: Required<RefImports> = {
    campaign: imports.campaign ?? (imports.library === 'refs' ? 'campaignRefs' : 'refs'),
    library:
      imports.library ??
      (imports.campaign === 'refs' || !imports.campaign ? 'libraryRefs' : 'refs'),
  }
  if (names.campaign === names.library) names.library = 'libraryRefs'
  const target = locate(recordObject(file), edit.path)
  const current = located(target, imports)
  if (!equal(current, edit.expected))
    throw new Conflict(`${edit.path.join('.')} changed in the file since the page loaded it`)

  const used = new Set<keyof RefImports>()
  if (edit.op === 'set') {
    const text = print(edit.value, names, used)
    let next: string
    if (target.node) {
      const node = target.kind === 'property' ? target.node.initializer : target.node
      next = splice(source, node.getStart(file), node.end, text)
    } else if (target.kind === 'property') {
      const name = IDENTIFIER.test(target.name) ? target.name : quote(target.name)
      const last = target.object.properties.at(-1)
      next = last
        ? splice(source, last.end, last.end, `,\n  ${name}: ${text}`)
        : splice(
            source,
            target.object.getStart(file) + 1,
            target.object.getStart(file) + 1,
            ` ${name}: ${text} `,
          )
    } else {
      if (target.index !== target.array.elements.length)
        throw new NotEditable('Add list items at the end, one at a time')
      const elements = target.array.elements
      const close = target.array.end - 1
      const separator = elements.length > 0 && !elements.hasTrailingComma ? ', ' : ''
      next = splice(source, close, close, `${separator}${text}`)
    }
    return withImports(next, used, names)
  }

  if (!target.node) return source
  const siblings: readonly ts.Node[] =
    target.kind === 'property' ? target.object.properties : target.array.elements
  const index = siblings.indexOf(target.node)
  const following = siblings[index + 1]
  const previous = siblings[index - 1]
  if (following) return splice(source, target.node.getStart(file), following.getStart(file), '')
  if (previous) return splice(source, previous.end, target.node.end, '')
  const after = source.slice(target.node.end).match(/^\s*,/u)?.[0].length ?? 0
  return splice(source, target.node.getStart(file), target.node.end + after, '')
}

/** Applies edits in order, each against the text the previous one left. */
export function applyRecordEdits(source: string, edits: readonly RecordEdit[]): string {
  return edits.reduce(applyEdit, source)
}

/** The record the file holds, as plain values with refs as `{ ref, key }`. */
export function readRecord(source: string): Record<string, unknown> {
  const file = parse(source)
  return evaluate(recordObject(file), refImports(file)) as Record<string, unknown>
}

/** The `create` helper the file builds its record with, e.g. `#/definitions/location.ts`. */
export function definitionModule(source: string): string {
  const file = parse(source)
  const record = recordObject(file)
  const call = record.parent
  if (!ts.isCallExpression(call) || !ts.isIdentifier(call.expression))
    throw new NotEditable('The record is not built with an imported create helper')
  const helper = call.expression.text
  for (const statement of file.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier))
      continue
    const bindings = statement.importClause?.namedBindings
    if (
      bindings &&
      ts.isNamedImports(bindings) &&
      bindings.elements.some((e) => e.name.text === helper)
    )
      return statement.moduleSpecifier.text
  }
  throw new NotEditable(`Could not find where ${helper} comes from`)
}
