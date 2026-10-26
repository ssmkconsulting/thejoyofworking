import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { site } from '../site.config.mjs';
const html = await readFile('dist/index.html', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate IDs');
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(id), `Broken anchor: ${id}`);
for (const [, path] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!/^https?:/.test(path)) await access(`dist/${path}`);
}
for (const image of Object.values(site.images)) {
  await access(`dist/${image.src}`);
  assert(image.alt && image.width > 0 && image.height > 0, 'Images need alt and dimensions');
}
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'One h1');
assert.equal((html.match(/<details>/g) || []).length, 4, 'Four FAQs');
for (const [, id] of html.matchAll(/<label for="([^"]+)"/g)) assert(ids.includes(id), `Missing input: ${id}`);
for (const [, interest] of html.matchAll(/data-interest="([^"]+)"/g)) assert(html.includes(`<option>${interest}</option>`), `Invalid interest: ${interest}`);
assert(html.includes(`href="${site.url}"`), 'Canonical URL');
assert(!html.includes('{{'), 'No unresolved template variables');
assert(!html.includes('A few choices I’d protect'), 'Editorial advice must not be published');
assert(site.contactEndpoint || /type="submit" disabled/.test(html), 'Unconfigured form must be disabled');
await access('dist/assets/social-card.png');
console.log('Passed: local assets, anchors, image metadata, contact states, service interests, FAQs, labels, and SEO.');
