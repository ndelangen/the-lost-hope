export type JpegFrame = {
  progressive: boolean
  width: number
  height: number
  chromaSubsampling: '4:2:0' | 'other'
}

export function jpegFrame(bytes: Buffer): JpegFrame {
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) throw new Error('Image is not a JPEG')

  let offset = 2
  while (offset < bytes.length) {
    while (bytes[offset] === 0xff) offset += 1
    const marker = bytes[offset]
    offset += 1
    if (marker === undefined || marker === 0xd9 || marker === 0xda) break
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue

    const length = bytes.readUInt16BE(offset)
    if (marker === 0xc0 || marker === 0xc2) {
      const height = bytes.readUInt16BE(offset + 3)
      const width = bytes.readUInt16BE(offset + 5)
      const components = bytes[offset + 7]
      const ySampling = bytes[offset + 9]
      const cbSampling = bytes[offset + 12]
      const crSampling = bytes[offset + 15]
      return {
        progressive: marker === 0xc2,
        width,
        height,
        chromaSubsampling:
          components === 3 && ySampling === 0x22 && cbSampling === 0x11 && crSampling === 0x11
            ? '4:2:0'
            : 'other',
      }
    }
    offset += length
  }

  throw new Error('JPEG has no supported frame marker')
}
