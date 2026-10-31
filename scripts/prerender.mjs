// Generates static HTML for every route (crawlable content + per-page meta) and sitemap.xml.
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, renderHeadTags, ROUTES, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)
const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8')

if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('index.html is missing the <!--app-head--> / <!--app-html--> placeholders')
}

for (const route of ROUTES) {
  const html = template
    .replace('<!--app-head-->', renderHeadTags(route))
    .replace('<!--app-html-->', render(route))
  // `/about` -> about.html so Cloudflare serves it at /about without a trailing-slash redirect.
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`
  const out = path.join(distDir, file)
  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, html)
  console.log(`prerendered ${route} -> dist/${file}`)
}

const today = new Date().toISOString().slice(0, 10)
const urls = ROUTES.map((r) => {
  const priority = r === '/' ? '1.0' : r.startsWith('/services/') ? '0.9' : '0.8'
  return `  <url>
    <loc>${SITE_URL}${r}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority}</priority>
  </url>`
})
await fs.writeFile(
  path.join(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`,
)
console.log(`wrote dist/sitemap.xml (${ROUTES.length} urls)`)

await fs.rm(ssrDir, { recursive: true, force: true })
