export type QuestionItem = {
  itemNumber: number
  markdown: string
}

function isHorizontalRule(line: string): boolean {
  const compact = line.trim().replaceAll(' ', '').replaceAll('\t', '')
  return compact.length >= 3 && /^(-+|\*+|_+)$/.test(compact)
}

export function splitQuestionsMarkdown(source: string): QuestionItem[] {
  const blocks: string[] = []
  let currentLines: string[] = []

  for (const line of source.replaceAll('\r\n', '\n').replaceAll('\r', '\n').split('\n')) {
    if (isHorizontalRule(line)) {
      blocks.push(currentLines.join('\n'))
      currentLines = []
    } else {
      currentLines.push(line)
    }
  }

  blocks.push(currentLines.join('\n'))

  return blocks
    .map((markdown) => markdown.trim())
    .filter(Boolean)
    .map((markdown, index) => ({ itemNumber: index + 1, markdown }))
}
