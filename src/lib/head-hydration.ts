/**
 * Netlify inserts a newline and a "hosted on Netlify" comment after `<meta charSet>` in every
 * page it serves. React hydrates the whole document and gives up on `<head>` at the first text
 * node, so that newline triggers error 418 and a full client re-render. The app never renders
 * text directly in `<head>`, so whitespace text there is always foreign and safe to remove.
 */
export function removeHeadWhitespace(head: HTMLHeadElement): void {
  for (const node of Array.from(head.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE && !node.textContent?.trim()) node.remove()
  }
}
