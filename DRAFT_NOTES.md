# Psyche Recommends affiliate guide prototype

This static site is published. The supplied Cash App and Ally referral URLs are configured, and every referral call to action carries a nearby disclosure.

## Product direction

The visual and content system combines:

- the focused referral-page structure of Psyche Recommends / Babel;
- the live-show context and direct language of the Psycheverse;
- a restrained violet-and-gold trust layer suited to financial information.

The financial pages stay independent and plainspoken. Cult lore is part of the parent identity, not part of the product claims.

## Search-worthy jobs

- `cash-app-streamers.html` helps livestreamers create one copy-ready payment panel for tips, moderator payments, or giveaways.
- `ally-creator-cashflow.html` helps creators understand Ally CoverDraft eligibility, exclusions, and recovery timing.
- `how-to-add-cash-app-to-twitch.html` targets a specific setup question with official Twitch instructions and a custom panel-copy generator.
- `index.html` routes readers to the focused search landing pages.
- `about.html` and `editorial-standards.html` explain authorship, sourcing, referral compensation, updates, and corrections.

## Link gate

Add approved tracking URLs only in `app.js`:

```js
const affiliateLinks = {
  cashApp: 'https://cash.app/refer/91M4MR9',
  ally: 'https://ally.com/referral?code=2J5X2J2J7B&CP=WebAppReferFriend'
};
```

Configured links open in a new tab and receive `rel="sponsored noopener"`. Each referral page discloses possible compensation directly beside both calls to action.

## Current facts represented

- Cash App referral conditions and reward amounts can change and must be refreshed immediately before publication.
- Ally currently describes basic CoverDraft as up to $100 in temporary coverage, generally after a total of $100 has been deposited and 30 days have passed, subject to eligibility and transaction approval.
- Ally currently describes a path to expanded coverage up to $250 after qualifying direct deposits of at least $250 for two consecutive months, generally maintained with a qualifying direct deposit every 45 days.
- Ally says future deposits apply to a negative balance and generally provides 14 days to restore it.
- CoverDraft is not a line of credit or a guarantee, and several transaction types are not covered.

Provider-language review date in page copy: September 12, 2026.

## Verification gate

1. Run `node --check app.js`.
2. Serve this folder with `python -m http.server 4173`.
3. Check all three pages in a real browser at desktop and 375px mobile widths.
4. Confirm no horizontal overflow, no console errors, working goal/eligibility controls, working copy utility, correct sponsored attributes for configured links, and disabled behavior for remaining placeholders.
5. Re-check current Cash App and Ally terms immediately before publication.
6. Replace placeholders only with approved tracking URLs and re-run the checks.

The information architecture also follows the public LandingForge Kimi/Codex workflow: outcome-first hero, one target action, a useful product surface, objection handling, conspicuous disclosure, and an explicit verification loop.

## Traffic foundation added September 12, 2026

- Search-matched titles, descriptions, and H1s on the hub and product guides.
- A standalone Twitch panel setup guide and in-browser copy generator.
- Visible editorial authorship and current provider-review dates.
- About and editorial/referral standards pages.
- Article, breadcrumb, site, and trust-page structured data.
- Open Graph and Twitter card metadata using `social-card.png`.
- Accurate sitemap modification dates for every public page.

## Topic cluster prepared September 12, 2026

- `twitch-donation-panel-text-examples.html` targets copy-and-template intent without duplicating the Twitch setup guide.
- `cash-app-scams-streamers.html` targets streamer payment-safety intent and uses current Cash App and FTC guidance.
- `ally-coverdraft-direct-deposit.html` targets the standard-versus-expanded CoverDraft path and warns that creator-platform payouts may not qualify.
- Existing pillar pages now link to the appropriate supporting articles, and all three articles link back to their pillar guide.
- Three relevant recovered Psyche/Kimi websites have a staged resource strip; publication remains gated on local visual QA and explicit approval.
