/**
 * Precompresses the production build (dist/) with gzip and brotli.
 *
 * Runs after `vite build`. Every text asset (JS, CSS, HTML, SVG, JSON, …)
 * gets a sibling `.gz` and `.br` file. Static hosts and vite preview (sirv)
 * serve the precompressed variant automatically when the client supports it,
 * so first-time visitors download far fewer bytes. Binary media (images,
 * video, woff2 fonts) is already compressed and is skipped.
 */
import { fileURLToPath } from 'node:url'
import { dirname, join, extname, basename, relative } from 'node:path'
import { gzipSync, brotliCompressSync, constants as zlib } from 'node:zlib'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'

const root = dirname(fileURLToPath(import.meta.url))
const distDir = join(root, '..', 'dist')

const TEXT_EXT = new Set([
  '.js', '.css', '.html', '.svg', '.json', '.xml', '.txt',
  '.webmanifest', '.map', '.mjs', '.cjs',
])

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

let count = 0
let saved = 0
for (const file of walk(distDir)) {
  if (!TEXT_EXT.has(extname(file).toLowerCase())) continue
  if (file.endsWith('.gz') || file.endsWith('.br')) continue

  const src = readFileSync(file)
  const gz = gzipSync(src, { level: 9 })
  const br = brotliCompressSync(src, {
    params: { [zlib.BROTLI_PARAM_QUALITY]: 11 },
  })

  writeFileSync(`${file}.gz`, gz)
  writeFileSync(`${file}.br`, br)
  count++
  saved += src.length - br.length
  console.log(
    `  ${relative(distDir, file)}: ${(src.length / 1024).toFixed(0)} KB -> ` +
      `gz ${(gz.length / 1024).toFixed(0)} KB / br ${(br.length / 1024).toFixed(0)} KB`,
  )
}

console.log(`Precompressed ${count} files (saves ~${(saved / 1024).toFixed(0)} KB via brotli)`)
