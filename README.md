# Global Arena

Official landing site for **Global Arena** — a Minecraft-style PvP community. React 19 + TypeScript + Vite, built as a set of small, typed, colocated components (CSS Modules, no global class soup).

## Stack

- **React 19 + TypeScript** (strict mode, `noUncheckedIndexedAccess`)
- **Vite 8** for dev/build
- **CSS Modules** per component, plus one small global stylesheet for design tokens, reset, and shared keyframes (`src/index.css`)
- **oxlint** for linting

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build locally
npm run lint      # oxlint
```

## Project structure

```
src/
  components/        # one folder per component: Component.tsx + Component.module.css
  hooks/              # useReveal, useCountUp, usePreloader, usePointerTilt
  data/                # typed content (nav links, store items, team, stats)
  types/               # shared TS interfaces
  index.css            # design tokens, reset, shared @keyframes
```

## Animations

All animations are hand-rolled (no animation library): scroll reveal via `IntersectionObserver`, a marquee ticker, an aurora background drift, a custom cursor dot/ring, tilt + spotlight hover cards, a shine sweep on primary buttons, a staggered word-rise hero headline, and a preloader with a progress bar.

## Security notes

- Strict `Content-Security-Policy` meta tag in `index.html` (`default-src 'self'`, no inline scripts, fonts/styles scoped to Google Fonts only).
- `referrer` meta set to `strict-origin-when-cross-origin`.
- Every external link (`target="_blank"`) carries `rel="noopener noreferrer"` to prevent reverse-tabnabbing.
- TypeScript `strict` + `noUncheckedIndexedAccess` enabled — no implicit `any`, no silently-unsafe indexed access.
- No `dangerouslySetInnerHTML` anywhere; no dynamic `eval`/`Function` usage.
- `.gitignore` excludes `node_modules`, build output, and local env files — never commit a `.env` with secrets if you add an API integration later.
