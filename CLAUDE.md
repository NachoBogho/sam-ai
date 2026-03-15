# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured.

## Architecture

Single-page marketing site for SAM-AI (an AI services company), built with Next.js App Router.

**Key files:**
- `src/app/page.tsx` — Entire landing page (~800 lines, client component). Contains all sections: hero, stats, benefits, services, ROI calculator, testimonials, FAQ, contact form, footer. Bilingual (ES/EN) via a `language` state toggle.
- `src/app/layout.tsx` — Root layout. Wraps all pages with `ParticlesBackground`. Fonts: `Space_Grotesk` (body), `Syne` (logo/headings).
- `src/app/globals.css` — Theme definitions. Primary accent is Electric Volt (`#C6FF00`). Dark mode is the default.
- `src/components/particles-background.tsx` — Animated tsparticles canvas, rendered in the layout behind all content.
- `src/components/roi-calculator.tsx` — Interactive slider calculating annual cost savings (hours × 52 × $25).
- `src/components/ui/` — shadcn/ui components (button, card, input, label, slider).
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge).

**Tech stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, shadcn/ui (new-york style), Framer Motion, Radix UI, Lucide icons, tsparticles.

**shadcn/ui:** Configured in `components.json`. Add new components via `npx shadcn add <component>`. Path alias `@/*` maps to `src/*`.

**Design system:** Dark background (`#030712`), Electric Volt (`#C6FF00`) as primary accent, glow utilities defined in `globals.css`. No light mode support.

There are no API routes, backend, or environment variables currently.
