import remarkParse from 'remark-parse'
import { unified } from 'unified'

export type QuestionItem = {
  itemNumber: number
  markdown: string
}

export function splitQuestionsMarkdown(source: string): QuestionItem[] {
  const normalizedSource = source.replaceAll('\r\n', '\n').replaceAll('\r', '\n')
  const document = unified().use(remarkParse).parse(normalizedSource)
  const blocks: string[] = []
  let blockStart = 0

  for (const node of document.children) {
    const separatorStart = node.position?.start.offset
    const separatorEnd = node.position?.end.offset
    if (
      node.type !== 'thematicBreak' ||
      separatorStart === undefined ||
      separatorEnd === undefined
    ) {
      continue
    }

    const separatorLineStart = normalizedSource.lastIndexOf('\n', separatorStart - 1) + 1
    const followingLineBreak = normalizedSource.indexOf('\n', separatorEnd)
    blocks.push(normalizedSource.slice(blockStart, separatorLineStart))
    blockStart = followingLineBreak === -1 ? normalizedSource.length : followingLineBreak + 1
  }

  blocks.push(normalizedSource.slice(blockStart))

  return blocks
    .map((markdown) => markdown.trim())
    .filter(Boolean)
    .map((markdown, index) => ({ itemNumber: index + 1, markdown }))
}
