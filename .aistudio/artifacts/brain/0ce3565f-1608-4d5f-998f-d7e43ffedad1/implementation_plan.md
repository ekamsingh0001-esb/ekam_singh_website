# Netlify Deployment Fix: Production Build & White Screen Resolution

Resolve the blank white screen issue occurring upon Netlify deployment by auditing production build configurations, SPA routing rules, WebGL resilience fallbacks, React 19 Error Boundary protections, and dark theme pre-styling while preserving all existing visual design, animations, and functionality.

## User Review & Critical Decisions

> [!IMPORTANT]
> The project currently builds cleanly with Vite, but when deployed to Netlify's static hosting environment, missing SPA redirect files, unhandled WebGL context failures on unsupported client devices, lack of a React Error Boundary, and unstyled root HTML defaults cause a blank white screen.

- **Confirmed Decision 1**: Project is deployed via Git repository build executing `npm run build` with the `dist/` publish directory.
- **Confirmed Decision 2**: Blank screen appears immediately upon page load in production on Netlify.
- **Architectural Strategy**:
  - Add `public/_redirects` alongside `netlify.toml` so Netlify correctly routes all client paths to `/index.html` without 404 or MIME-type mismatch.
  - Implement a dedicated React `ErrorBoundary` in `src/components/ErrorBoundary.tsx` wrapping the application root in `src/main.tsx` to prevent silent unmounting.
  - Bulletproof `FluidShaderCanvas.tsx` with comprehensive `try/catch` guards and automatic CSS gradient fallback so WebGL failures (e.g. mobile Safari, battery-saver mode, headless browsers) never crash the React render tree.
  - Pre-style `index.html` and `body` with native inline dark background colors (`#07080d`) so the page canvas is never white even before CSS assets load.
  - Ensure client-side API requests (`/api/chat` and `/api/contact`) gracefully detect static Netlify environments without throwing unexpected token errors when HTML is returned.

---

## 1. Overview & Core Concept

- **What It Does**: Hardens Ekam Singh's engineering portfolio for production static hosting on Netlify, eliminating all failure modes that lead to a blank white screen while preserving the fluid shader background, frosted glass aesthetic, project case studies, and interactive features.
- **Target Audience / Persona**: Recruiters, hiring managers, engineering peers, and hackathon collaborators viewing the portfolio on live Netlify URLs across mobile, tablet, and desktop browsers.
- **Key Value**: Guarantees 100% uptime and immediate visual rendering on Netlify regardless of client GPU capabilities, direct deep-link page refreshes, or network conditions.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  - *Direct Visit / Refresh*: User navigates to any URL (e.g., `/`, `/about`, `/projects`, `/certificates`, `/contact`). Netlify serves `index.html` with status 200. The dark canvas (`#07080d`) renders instantly with zero white flash.
  - *Fluid Background & Fallback*: On devices with WebGL support, the fluid displacement shader runs smoothly at 60 FPS. On devices where WebGL is disabled or blocked, a deep obsidian mesh gradient renders seamlessly without UI interruption.
  - *Interactive Controls & Routing*: Client-side navigation between pages continues to update browser history and scroll position smoothly.
  - *Error Resilience*: If any edge-case exception occurs, the Error Boundary displays a branded cybernetic recovery panel with a "Reload Portfolio" button instead of a blank white screen.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Cybernetic engineering portfolio with frosted glass panels, obsidian backgrounds, and cyan/indigo accents.
  - *Palette*: Dominant obsidian background (`#07080d`), structural frosted glass (`rgba(13, 16, 28, 0.78)`), vivid cyan accent (`#22d3ee`), and electric indigo (`#6366f1`).
  - *Typography*: Space Grotesk (display headings), Inter (body prose), and JetBrains Mono (code/telemetry).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual Redirection Specification (`public/_redirects` + `netlify.toml`)**
  - *Chosen Approach*: Maintain both `netlify.toml` at repository root and create `public/_redirects` (which Vite copies directly to `dist/_redirects`).
  - *Why*: Netlify build pipelines and drag-and-drop deployments prioritize `_redirects` inside the publish directory (`dist/`). Having both guarantees SPA route handling across all Netlify deployment methods.
  - *Alternatives Considered*: Relying solely on `netlify.toml`, which can fail if Netlify project settings override redirect rules.

- **Decision 2: React 19 Error Boundary at Application Entry**
  - *Chosen Approach*: Wrap `<App />` inside a class-based `ErrorBoundary` in `src/main.tsx`.
  - *Why*: React 19 unmounts the entire DOM if an uncaught error occurs in any child component. An Error Boundary catches runtime issues and prevents the white screen of death.
  - *Alternatives Considered*: Relying on `window.onerror`, which does not prevent React from tearing down the DOM.

- **Decision 3: Safe Static Environment Handling for API Endpoints**
  - *Chosen Approach*: Update client fetch calls in `ContactPage.tsx` and `AiPortfolioChatbot.tsx` to verify `response.headers.get('content-type')?.includes('application/json')` before calling `response.json()`.
  - *Why*: On static Netlify hosting without a custom serverless function, `/api/*` requests get rewritten to `/index.html` (status 200). Calling `response.json()` on HTML causes a JSON parse syntax error. Safe content-type checking activates local smart fallbacks and direct mailto/Gmail links seamlessly.

- **Decision 4: Hardened WebGL Lifecycle in `FluidShaderCanvas.tsx`**
  - *Chosen Approach*: Wrap WebGL context acquisition, shader compilation, program linking, and resize handlers in a resilient `try/catch` block.
  - *Why*: Context loss or unsupported WebGL features in low-power mobile or privacy-restricted browsers will not throw unhandled exceptions.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Netlify Edge / CDN                              │
│                                                                        │
│   Incoming Request  ──►  dist/_redirects / netlify.toml               │
│                          Rewrites (/* ──► /index.html 200)             │
│                          Serves dist/assets/* with immutable cache     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         index.html (HTML5)                             │
│   Inline style: background #07080d (Zero white flash)                 │
│   Loads /src/main.tsx via ES Module script                            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         src/main.tsx                                   │
│   ErrorBoundary (Catches runtime errors, prevents white screen)        │
│     └─► App.tsx                                                        │
│           ├─► FluidShaderCanvas (Safe WebGL with fallback gradient)    │
│           ├─► Navbar & NavDrawer                                       │
│           ├─► Page Views (HomePage, AboutPage, ProjectsPage, etc.)     │
│           ├─► AiPortfolioChatbot (Safe client fallback on static host) │
│           └─► ContactPage (Direct mail / Gmail fallback on static host)│
└────────────────────────────────────────────────────────────────────────┘
```

### Planned File Adjustments
1. **`public/_redirects`**: Create directory and file containing `/*    /index.html   200`.
2. **`index.html`**: Add inline background styles and fallback `<noscript>` warning.
3. **`src/components/ErrorBoundary.tsx`**: Create graceful React error recovery component.
4. **`src/main.tsx`**: Wrap `<App />` in `<ErrorBoundary>`.
5. **`src/components/FluidShaderCanvas.tsx`**: Add `try/catch` WebGL protection and CSS fallback.
6. **`vite.config.ts`**: Clean up `import.meta.dirname` and verify production build options.
7. **`src/pages/ContactPage.tsx` & `src/components/AiPortfolioChatbot.tsx`**: Harden static JSON response handling.
