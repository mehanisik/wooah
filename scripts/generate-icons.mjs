import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const svg = readFileSync(resolve(root, 'public/icon.svg'))

const sizes = [
  { name: 'pwa-64x64.png', size: 64 },
  { name: 'apple-touch-icon-180x180.png', size: 180 },
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'pwa-512x512.png', size: 512 },
]

for (const { name, size } of sizes) {
  await sharp(svg).resize(size, size).png().toFile(resolve(root, 'public', name))
  console.log(`  ${name}`)
}

const maskSvg = Buffer.from(
  readFileSync(resolve(root, 'public/icon.svg'), 'utf-8')
    .replace('rx="112"', 'rx="0"')
)
await sharp(maskSvg).resize(512, 512).png().toFile(resolve(root, 'public/maskable-icon-512x512.png'))
console.log('  maskable-icon-512x512.png')

const ico16 = await sharp(svg).resize(16, 16).png().toBuffer()
const ico32 = await sharp(svg).resize(32, 32).png().toBuffer()
const ico48 = await sharp(svg).resize(48, 48).png().toBuffer()

function createIco(buffers, sizes) {
  const count = buffers.length
  const headerSize = 6
  const dirEntrySize = 16
  const dataOffset = headerSize + count * dirEntrySize

  let totalSize = dataOffset
  for (const buf of buffers) totalSize += buf.length

  const ico = Buffer.alloc(totalSize)
  ico.writeUInt16LE(0, 0)
  ico.writeUInt16LE(1, 2)
  ico.writeUInt16LE(count, 4)

  let offset = dataOffset
  for (let i = 0; i < count; i++) {
    const s = sizes[i] >= 256 ? 0 : sizes[i]
    ico.writeUInt8(s, headerSize + i * dirEntrySize)
    ico.writeUInt8(s, headerSize + i * dirEntrySize + 1)
    ico.writeUInt8(0, headerSize + i * dirEntrySize + 2)
    ico.writeUInt8(0, headerSize + i * dirEntrySize + 3)
    ico.writeUInt16LE(1, headerSize + i * dirEntrySize + 4)
    ico.writeUInt16LE(32, headerSize + i * dirEntrySize + 6)
    ico.writeUInt32LE(buffers[i].length, headerSize + i * dirEntrySize + 8)
    ico.writeUInt32LE(offset, headerSize + i * dirEntrySize + 12)
    buffers[i].copy(ico, offset)
    offset += buffers[i].length
  }
  return ico
}

const icoBuffer = createIco([ico16, ico32, ico48], [16, 32, 48])
writeFileSync(resolve(root, 'public/favicon.ico'), icoBuffer)
console.log('  favicon.ico')
console.log('Done!')
