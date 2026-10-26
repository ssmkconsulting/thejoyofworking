import { mkdir, readFile, writeFile, cp, rm } from 'node:fs/promises';
import { site } from '../site.config.mjs';
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
if (site.contactEndpoint && !site.contactEndpoint.startsWith('https://')) throw new Error('Contact endpoint must use HTTPS.');
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
let html = await readFile('index.html', 'utf8');
for (const [key, image] of Object.entries(site.images)) {
  for (const [field, value] of Object.entries(image)) html = html.replaceAll(`{{images.${key}.${field}}}`, escape(value));
}
html = html.replaceAll('{{site.url}}', escape(site.url));
html = html.replaceAll('{{contact.action}}', site.contactEndpoint ? `action="${escape(site.contactEndpoint)}"` : '');
html = html.replaceAll('{{contact.disabled}}', site.contactEndpoint ? '' : 'disabled');
html = html.replaceAll('{{contact.notice}}', site.contactEndpoint ? 'Your inquiry will be sent securely to our form provider.' : 'Online inquiries aren’t open yet. This form is a preview and cannot send messages. Please check back soon.');
if (/\{\{[^}]+\}\}/.test(html)) throw new Error('Unresolved template token');
await writeFile('dist/index.html', html);
for (const file of ['styles.css', 'app.js', 'assets']) await cp(file, `dist/${file}`, { recursive: true });
await writeFile('dist/.nojekyll', '');
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.url}sitemap.xml\n`);
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(site.url)}</loc></url></urlset>`);
console.log('Built static site in dist/ for ' + site.url);
