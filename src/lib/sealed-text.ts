/**
 * Seals text with a spoken password so a page can ship it without revealing it. The text is
 * encrypted with AES-GCM under a key derived from the password, and only the password unseals it.
 */

export type SealedText = {
  /** Base64 PBKDF2 salt. */
  salt: string
  /** Base64 AES-GCM nonce. */
  iv: string
  /** Base64 ciphertext with its authentication tag. */
  data: string
}

const ITERATIONS = 150_000

/** Reduces a typed password to its letters, so case, spaces and punctuation never matter. */
export function normalizePassword(password: string): string {
  return password.toUpperCase().replace(/[^A-Z]/gu, '')
}

function toBase64(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

function fromBase64(value: string): Uint8Array<ArrayBuffer> {
  const binary = atob(value)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index)
  return bytes
}

async function deriveKey(password: string, salt: Uint8Array<ArrayBuffer>): Promise<CryptoKey> {
  const material = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(normalizePassword(password)),
    'PBKDF2',
    false,
    ['deriveKey'],
  )
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITERATIONS },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  )
}

export async function sealText(text: string, password: string): Promise<SealedText> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await deriveKey(password, salt)
  const data = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(text),
  )
  return { salt: toBase64(salt), iv: toBase64(iv), data: toBase64(new Uint8Array(data)) }
}

/** Returns the sealed text, or `null` when the password is wrong. */
export async function unsealText(sealed: SealedText, password: string): Promise<string | null> {
  try {
    const key = await deriveKey(password, fromBase64(sealed.salt))
    const data = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: fromBase64(sealed.iv) },
      key,
      fromBase64(sealed.data),
    )
    return new TextDecoder().decode(data)
  } catch {
    return null
  }
}

/** The number of bytes hidden in a sealed text (AES-GCM adds a 16-byte tag). */
export function sealedLength(sealed: SealedText): number {
  const padding = sealed.data.endsWith('==') ? 2 : sealed.data.endsWith('=') ? 1 : 0
  return Math.max(0, (sealed.data.length * 3) / 4 - padding - 16)
}
