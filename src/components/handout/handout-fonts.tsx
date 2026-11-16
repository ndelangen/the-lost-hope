const HANDOUT_FONTS =
  'https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=IM+Fell+English:ital@0;1&display=swap'

/** Loads the handwriting and print faces used on handouts; React hoists it into the head once. */
export function HandoutFonts() {
  return <link rel="stylesheet" href={HANDOUT_FONTS} precedence="default" />
}

export const HAND_FONT = { fontFamily: "'Caveat', cursive" }
export const PRINT_FONT = { fontFamily: "'IM Fell English', Georgia, serif" }
