# Psyche Recommends affiliate guide prototype

This static site is prepared for publication. The supplied Cash App referral URL is configured. Ally uses its official Spending Account product page and is explicitly labeled non-affiliate until an approved personal tracking URL is supplied.

## Product direction

The visual and content system combines:

- the focused referral-page structure of Psyche Recommends / Babel;
- the live-show context and direct language of the Psycheverse;
- a restrained violet-and-gold trust layer suited to financial information.

The financial pages stay independent and plainspoken. Cult lore is part of the parent identity, not part of the product claims.

## Search-worthy jobs

- `cash-app-streamers.html` helps livestreamers create one copy-ready payment panel for tips, moderator payments, or giveaways.
- `ally-creator-cashflow.html` helps creators understand Ally CoverDraft eligibility, exclusions, and recovery timing.
- `index.html` is a small routing hub, not the primary SEO landing page.

## Link gate

Add approved tracking URLs only in `app.js`:

```js
const affiliateLinks = {
  cashApp: 'https://cash.app/refer/91M4MR9',
  ally: 'https://www.ally.com/bank/interest-checking-account/'
};
```

Configured links open in a new tab. The Cash App referral receives `rel="sponsored noopener"`; the non-compensated official Ally link receives `rel="noopener"`. If a personal Ally tracking URL is supplied later, replace the URL, add `sponsored` to its relationship, and restore an affiliate disclosure before republishing.

## Current facts represented

- Cash App referral conditions and reward amounts can change and must be refreshed immediately before publication.
- Ally currently describes basic CoverDraft as up to $100 in temporary coverage, generally after a total of $100 has been deposited and 30 days have passed, subject to eligibility and transaction approval.
- Ally currently describes a path to expanded coverage up to $250 after qualifying direct deposits of at least $250 for two consecutive months, generally maintained with a qualifying direct deposit every 45 days.
- Ally says future deposits apply to a negative balance and generally provides 14 days to restore it.
- CoverDraft is not a line of credit or a guarantee, and several transaction types are not covered.

Provider-language review date in page copy: September 11, 2026.

## Verification gate

1. Run `node --check app.js`.
2. Serve this folder with `python -m http.server 4173`.
3. Check all three pages in a real browser at desktop and 375px mobile widths.
4. Confirm no horizontal overflow, no console errors, working goal/eligibility controls, working copy utility, correct sponsored attributes for configured links, and disabled behavior for remaining placeholders.
5. Re-check current Cash App and Ally terms immediately before publication.
6. Replace placeholders only with approved tracking URLs and re-run the checks.

The information architecture also follows the public LandingForge Kimi/Codex workflow: outcome-first hero, one target action, a useful product surface, objection handling, conspicuous disclosure, and an explicit verification loop.
