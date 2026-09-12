import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(import.meta.dirname, '..');
const publicPages = [
  'index.html',
  'cash-app-streamers.html',
  'ally-creator-cashflow.html',
  'how-to-add-cash-app-to-twitch.html',
  'about.html',
  'editorial-standards.html'
];

const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

for (const page of publicPages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/is)?.[1]?.trim() || '';
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1]?.trim() || '';
  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] || '';
  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];

  check(title.length >= 25 && title.length <= 65, `${page}: title length is ${title.length}`);
  check(description.length >= 110 && description.length <= 165, `${page}: description length is ${description.length}`);
  check(h1Count === 1, `${page}: expected one H1, found ${h1Count}`);
  check(canonical.startsWith('https://fratercem-design.github.io/psyche-recommends-money-tools/'), `${page}: canonical is missing or incorrect`);
  check(html.includes('property="og:image"'), `${page}: Open Graph image is missing`);
  check(html.includes('name="twitter:card"'), `${page}: Twitter card is missing`);
  check(jsonLdBlocks.length > 0, `${page}: JSON-LD is missing`);

  for (const [, block] of jsonLdBlocks) {
    try {
      JSON.parse(block);
    } catch (error) {
      failures.push(`${page}: invalid JSON-LD (${error.message})`);
    }
  }

  const hrefs = [...html.matchAll(/href="([^"]+)"/gi)].map((match) => match[1]);
  for (const href of hrefs) {
    if (/^(?:https?:|mailto:|#)/i.test(href)) continue;
    const localPath = href.split('#')[0].split('?')[0];
    check(fs.existsSync(path.join(root, localPath)), `${page}: missing local link target ${localPath}`);
  }
}

const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
const socialCard = path.join(root, 'social-card.png');

check(app.includes('https://cash.app/refer/91M4MR9'), 'Cash App referral URL is missing');
check(app.includes('https://ally.com/referral?code=2J5X2J2J7B&CP=WebAppReferFriend'), 'Ally referral URL is missing');
check(app.includes("link.rel = 'sponsored noopener'"), 'Sponsored link relationship is missing');
check(!publicPages.some((page) => /not currently an affiliate|not a compensated affiliate/i.test(fs.readFileSync(path.join(root, page), 'utf8'))), 'Stale non-affiliate copy remains');
check(robots.includes('Sitemap: https://fratercem-design.github.io/psyche-recommends-money-tools/sitemap.xml'), 'robots.txt sitemap is incorrect');
check(fs.existsSync(socialCard) && fs.statSync(socialCard).size > 50000, 'Social card is missing or unexpectedly small');

for (const page of publicPages) {
  const url = page === 'index.html' ? 'https://fratercem-design.github.io/psyche-recommends-money-tools/' : `https://fratercem-design.github.io/psyche-recommends-money-tools/${page}`;
  check(sitemap.includes(`<loc>${url}</loc>`), `sitemap.xml is missing ${url}`);
}

if (failures.length) {
  console.error(`Verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Verified ${publicPages.length} public pages, referral URLs, structured data, internal links, sitemap, robots.txt, and social card.`);
