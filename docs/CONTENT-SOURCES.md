# Content sources

Where each fact on the site came from. "Product repo" is `linkedin-leader`, read on 2026-11-16 (branch `feat/journey-first-post-path`, read-only). Where the product code and the old marketing copy disagreed, the code was followed.

## Product facts

| Claim on the site | Source in the product repo |
|---|---|
| First 2 posts free, no card | `apps/api/src/middleware/billing.ts` (`PRE_TRIAL_POST_LIMIT = 2`), enforced in `apps/api/src/services/ai-gate.ts` |
| 3-day free trial, card required, not charged until it ends | `apps/api/src/config/pricing.ts` (`TRIAL_DAYS = 3`), `apps/api/src/services/stripe.ts`, billing page copy |
| Billed monthly, cancel from Billing | `apps/api/src/services/stripe.ts`, `/billing/cancel` route |
| Personal plan US$145 and all regional prices; top-up prices | `apps/api/src/config/pricing.ts` (`PRICING.personal`, `OVERAGE_TIER_PRICING` / `TOKEN_PACK_PRICING`, `CURRENCY_BY_COUNTRY`) |
| India pays through Razorpay, others through Stripe | product repo `CLAUDE.md` (billing essentials), `pricing.ts` (`RAZORPAY_PRICING`) |
| "Monthly AI allowance" shown as a percentage, top-ups of 20/50/100% | `pricing.ts` (`TOKEN_PACKS`), `CLAUDE.md` (never expose raw counts) |
| Sign in with LinkedIn or email and password | `apps/web/app/(auth)/signup/page.tsx` |
| Seven setup screens and their names | `apps/web/app/(dashboard)/setup/page.tsx` |
| Profile fields, tone options, "things I never say", campaign tone override | setup page, `apps/api/src/routes/profile.ts`, `CampaignForm.tsx` |
| Knowledge bank: notes, links, text files | `apps/api/src/routes/profile.ts` (only plain text is read from files; links are stored, not fetched, so the site does not claim PDF or web-page reading) |
| Brand kit: logo and up to ten colours | setup page |
| Campaigns with their own topic, themes and schedule; daily, weekly, chosen days, monthly; time zone; draft lead time 1 to 72 hours | `apps/api/src/routes/campaigns.ts`, `PostingScheduleEditor.tsx` |
| 17 content themes and their names | `apps/api/src/services/strategy.ts` (9), `apps/web/lib/theme-baskets.ts` (8) |
| AI Studio chat | `apps/web/app/(dashboard)/chat` |
| Research, draft, second-model judge, one revision, lint, humanizer | `apps/api/src/services/agent.ts` |
| Judge criteria: novelty, groundedness, human voice, timeliness, all must pass | `agent.ts` |
| A failed draft is held for review, never auto-published, with an email | `apps/api/src/services/post-intake.ts`, `services/notifications.ts` |
| Review and approve by default; auto-publish opt-in per campaign | `CampaignForm.tsx` (`auto_post` default false), `apps/api/src/cron/scheduler.ts` |
| Edits and rejections become quality rules | `apps/api/src/routes/posts.ts` (`learnFromEdit`, `learnFromRejection`), `quality-learnings.ts` |
| Sources as a first comment, editable or removable | `agent.ts` (`first_comment`), `scheduler.ts`, `posts/page.tsx` |
| Official LinkedIn OAuth API only; browser automation removed | `apps/api/src/routes/linkedin.ts`, `services/linkedin-oauth.ts`, `CLAUDE.md` (migration 0042) |
| No auto-DMs, no engagement pods, no commenting on others' posts | absence in code, confirmed by a sweep of `apps/api/src` |
| Tokens encrypted with AES-256-GCM; disconnect from the Connect page | `apps/api/src/services/crypto.ts`, `connect/page.tsx` |
| No self-serve account deletion; email to delete | only an admin route exists; address from the privacy page |
| Emails: needs review, upcoming post, published, failed | `services/notifications.ts`, `scheduler.ts` |
| One uploaded image per post | post publishing path in `scheduler.ts` |

## Marked Coming soon, and why

| Item | Why it is not presented as live |
|---|---|
| Company pages and the add-on | `company_pages` flag seeded off; upgrade UI hidden behind it. The add-on price in `pricing.ts` is deliberately not shown |
| Designed visual cards and sourced photos | Built (`media-card.ts`, `media-sourcing.ts`) but behind `ai_images_enabled`, seeded off. Could not confirm it is on for customers |
| AI image generation and gallery | Same flag |
| Carousels, video, newsletter generation, smart timing | Not implemented |
| Learning from past LinkedIn posts | Only profile pre-fill exists |
| Performance learning, analytics dashboard | Data is collected; no user-facing page |
| Comment reply suggestions | Built behind the `company_pages` flag |

To move one to live, see the README ("Where things are").

## Not from the product repo

| Item | Source |
|---|---|
| Positioning line, audience list, voice rules, no-comparison rule | the build brief and the `tyashin-business` skill |
| Legal entity name "Aapastech Pvt Ltd" | the build brief |
| `privacy@aapastech.com`, `legal@aapastech.com` | old `privacy/page.tsx` and `sales-terms/page.tsx` |
| `hello@tyashin.com` (general contact) | help address used in the product's own emails (`services/notifications.ts`) |
| Grievance page text, response times, form and `contact@aapastech.com` | the company's grievance page on its YOM site (`yom-website-next`, `src/app/grievance`, `src/lib/grievance.ts`), with phone and address removed |
| Grievance Officer name | `yom-website-next/src/config/legal.ts` |
| Logo and OG image | `apps/web/public/logo-icon.svg`, `logo-icon.png`, `og-image.png` |
| "LinkedIn's user agreement prohibits bots and automated activity" | LinkedIn User Agreement, "Dos and Don'ts" |

## Legal text (local fallback)

`src/data/legal-fallback.ts` is generated by `scripts/migrate-legal.py` from the old site's `privacy/page.tsx`, `terms/page.tsx` and `sales-terms/page.tsx`. The text is unchanged except:

- The registered-office street address was removed from the terms (company name only on this site).
- The sales terms carried a different company number from the terms. It was replaced with the one in the terms, which matches the company's entity register.
- Internal links point to this site's slugs; the product link text reads `linkedin.tyashin.com`.

The platform legal API is the source of truth once pages exist there.

## Blog posts (local fallback)

`src/data/blog-posts.ts` is generated by `scripts/migrate-blog.py` from `apps/web/app/blog/data.ts`.

- Dropped: `ai-linkedin-content-tools-comparison` (it named other products). Its URL redirects to `/blog`.
- Rewritten: five passages in `should-you-use-ai-for-linkedin-posts` that named a product or a model family.
- Rewritten as plain advice: statistics and study citations with no source we could check (member and creator percentages, inbound multipliers, impression ranges, a survey figure, a university study, algorithm timing claims).
- Kept: worked examples that are clearly hypothetical, and the authors' opinions about what works on LinkedIn.

## Left out on purpose

Old marketing claims that the code does not support, or that we could not check: a posts-per-day limit, "saves 5 to 10 hours a week", ghostwriter price comparisons, a GBP price, "founded 2025", PDF and website reading in the knowledge bank, and every tool-by-tool comparison.
