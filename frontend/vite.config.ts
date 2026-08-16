import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import { join, extname } from 'node:path'

/**
 * Cache-friendly headers for the production preview (`npm run build && npm run preview`).
 *
 * Vite's preview server defaults to `Cache-Control: no-cache` on everything, so
 * repeat visits revalidate every asset. These rules give long cache lifetimes
 * where the filename is unique or content-hashed:
 *
 *  - hashed JS/CSS (dist/assets/index-*.js|css) -> immutable, 1 year
 *  - index.html                                 -> revalidate every visit (picks up new deploys)
 *  - static media/fonts/videos (public/)        -> 30 days + background revalidation
 *
 * Pre-set headers are preserved by the static file handler, and the HTML
 * handler already sends `no-cache`, so setting the header before `next()` is
 * sufficient for every path.
 */
function cacheRuleFor(url: string): string {
  if (url.startsWith('/assets/') && /\.(js|css)$/.test(url)) {
    // Built with content hashes — safe to cache forever.
    return 'public, max-age=31536000, immutable'
  }
  if (url === '/' || url.endsWith('.html')) {
    // HTML must revalidate so a new build is picked up immediately.
    return 'no-cache'
  }
  if (/\.(webp|avif|jpe?g|png|gif|svg|ico|mp4|webm|mov|woff2?|ttf|otf|eot)$/.test(url)) {
    // Static media copied from public/ — long cache with background revalidation.
    return 'public, max-age=2592000, stale-while-revalidate=86400'
  }
  return 'public, max-age=604800'
}

// Text extensions that benefit from precompression (mirrors scripts/compress-dist.mjs).
const TEXT_EXT = new Set(['.js', '.css', '.html', '.svg', '.json', '.xml', '.txt', '.webmanifest', '.map', '.mjs', '.cjs'])

const previewCachePlugin: Plugin = {
  name: 'ocean-preview-cache-headers',
  configurePreviewServer(server) {
    const distDir = server.config.build?.outDir ?? join(server.config.root, 'dist')

    server.middlewares.use((req, res, next) => {
      const query = req.url?.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''
      const pathname = (req.url ?? '').split('?')[0]

      // Cache-Control per path (kept by the file middleware's send()).
      res.setHeader('Cache-Control', cacheRuleFor(pathname))

      // Serve precompressed .br/.gz variants (sirv's own gzip/brotli support
      // is not enabled by vite preview, so rewrite the URL to the variant).
      if (TEXT_EXT.has(extname(pathname).toLowerCase())) {
        const accept = String(req.headers['accept-encoding'] ?? '')
        const candidates = []
        if (/(br|brotli)/i.test(accept)) candidates.push('.br')
        if (accept.includes('gzip')) candidates.push('.gz')
        for (const enc of candidates) {
          const file = join(distDir, decodeURIComponent(pathname.replace(/^\/+/, '')))
          if (existsSync(`${file}${enc}`)) {
            req.url = `${pathname}${enc}${query}`
            res.setHeader('Vary', 'Accept-Encoding')
            break
          }
        }
      }

      next()
    })
  },
}

// Dev/preview proxy — forwards API and GraphQL calls to the FastAPI backend.
const apiProxy = {
  '/api': {
    target: 'http://127.0.0.1:8000',
    changeOrigin: true,
  },
  '/graphql': {
    target: 'http://127.0.0.1:8000',
    changeOrigin: true,
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), previewCachePlugin],
  server: {
    proxy: apiProxy,
  },
  preview: {
    proxy: apiProxy,
  },
})
