# Phase 1: Foundation

## Overview
Set up the project infrastructure, design system, and core layout components that all other phases will build upon.

---

## Milestone 1.1: Initialize Next.js Project

### Tasks
- [x] Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- [x] Verify the dev server runs with `npm run dev`
- [ ] Clean up default Next.js boilerplate (remove default page content, styles)

### Acceptance Criteria
- Project runs on `localhost:3000`
- No default Next.js branding visible
- TypeScript compiles without errors

---

## Milestone 1.2: Configure Tailwind Theme

### Tasks
- [x] Download JetBrains Mono font files (Regular, Medium, Bold weights, .woff2 format)
- [x] Place fonts in `public/fonts/JetBrainsMono/`
- [x] Configure `next/font/local` in `src/app/layout.tsx`
- [x] Update `src/app/globals.css` with Tailwind CSS v4 theme:

```css
@import "tailwindcss";

@theme {
  --font-mono: var(--font-jetbrains), monospace;

  --color-background: #0a0a0a;
  --color-surface: #141414;
  --color-border: #262626;
  --color-primary: #00ff88;
  --color-primary-dim: #00cc6a;
  --color-text-primary: #e5e5e5;
  --color-text-secondary: #a3a3a3;
  --color-text-muted: #737373;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

body {
  background-color: var(--color-background);
  color: var(--color-text-primary);
  font-family: var(--font-mono);
}
```

- [x] Configure font loading in `src/app/layout.tsx`:

```typescript
const jetbrainsMono = localFont({
  src: [
    {
      path: "../../public/fonts/JetBrainsMono/JetBrainsMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/JetBrainsMono/JetBrainsMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/JetBrainsMono/JetBrainsMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains",
});
```

- [x] Add dark class to html element: `<html lang="en" className={\`${jetbrainsMono.variable} dark\`}>`

### Acceptance Criteria
- JetBrains Mono renders as the default font
- Background is dark (#0a0a0a)
- Primary green (#00ff88) is available as `text-primary` or `bg-primary`

### Notes
- This project uses **Tailwind CSS v4** which uses `@import "tailwindcss"` and `@theme {}` syntax instead of the traditional `tailwind.config.ts` file
- Colors are defined as CSS custom properties and can be accessed via `bg-*`, `text-*`, `border-*` utilities
- No `tailwind.config.ts` file is needed for basic theming in v4

---

## Milestone 1.3: Create Folder Structure

### Tasks
- [x] Create the following directory structure:

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── projects/
│   │   └── page.tsx
│   └── engineering-log/
│       └── page.tsx
├── components/
│   ├── layout/
│   ├── home/
│   ├── experience/
│   ├── certifications/
│   ├── projects/
│   ├── engineering-log/
│   └── ui/
├── data/
├── lib/
│   └── three/
├── hooks/
└── types/
```

```
public/
├── fonts/
│   └── JetBrainsMono/
├── images/
│   ├── companies/
│   ├── certifications/
│   └── projects/
└── documents/
```

### Acceptance Criteria
- All folders exist
- No empty folder errors from Git (add `.gitkeep` if needed)

---

## Milestone 1.4: Create Type Definitions

### Tasks
- [x] Create `src/types/index.ts` with all interfaces:

```typescript
export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  email: string;
  resumeUrl: string;
  whatsappNumber: string;
  social: {
    linkedin: string;
    github: string;
    leetcode: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  companyLogo: string;
  location: string;
  role: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  impactPoints: string[];
  techStack: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  logo: string;
  credentialUrl: string | null;
  pdfUrl: string | null;
  issueDate: string;
  expiryDate: string | null;
}

export interface Project {
  id: string;
  name: string;
  summary: string;
  description?: string;
  thumbnail?: string;
  techStack: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  featured: boolean;
  order: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTimeMinutes: number;
  tags: string[];
}
```

### Acceptance Criteria
- Types are importable via `@/types`
- No TypeScript errors

---

## Milestone 1.5: Build Layout Components

### 1.5.1 Container Component
- [x] Create `src/components/layout/Container.tsx`
- [x] Max width constraint with horizontal padding
- [x] Centered content

```typescript
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
```

### 1.5.2 Navbar Component
- [x] Create `src/components/layout/Navbar.tsx`
- [x] Sticky positioning (`fixed top-0`)
- [x] Backdrop blur effect
- [x] Logo/name on left
- [x] Navigation links on right:
  - Home (scroll to top)
  - Experience (`#experience`)
  - Certifications (`#certifications`)
  - Projects (`/projects`)
  - Engineering Log (`/engineering-log`)
- [x] Mobile hamburger menu (collapsed on small screens)
- [x] Active link highlighting based on scroll position or route


Key Features:
  - ✅ Sticky positioning - Fixed at top with fixed top-0 and z-50
  - ✅ Backdrop blur effect - backdrop-blur-md with semi-transparent background
  - ✅ Logo on left - Terminal-style <dev /> logo
  - ✅ Navigation links - All 5 required links (Home, Experience, Certifications, Projects, Engineering Log)
  - ✅ Mobile hamburger menu - Animated 3-line menu that transforms into an X
  - ✅ Active link highlighting - Tracks scroll position for anchor links and route for page links
  - ✅ Smooth scrolling - Anchor links scroll smoothly to sections
  - ✅ Cross-page navigation - Anchor links work even when navigating from other pages

  Technical Implementation:
  - Uses 'use client' for interactivity (mobile menu state, scroll tracking)
  - Scroll spy functionality to highlight active section
  - Responsive design (desktop horizontal menu, mobile vertical dropdown)
  - Integrated with Next.js Link and usePathname for routing
  - Design system colors (text-primary, border-border, etc.)

  Layout Integration:
  - Added Navbar to src/app/layout.tsx so it appears on all pages

### 1.5.3 Footer Component
- [x] Create `src/components/layout/Footer.tsx`
- [x] Copyright text
- [x] Condensed social links
- [x] Minimal styling

Features:
  - ✅ Copyright text - Dynamic year with "© {year} All rights reserved."
  - ✅ Condensed social links - GitHub, LinkedIn, LeetCode with minimal 2-letter icons
  - ✅ Minimal styling - Clean, simple design matching the terminal aesthetic
  - Responsive layout (stacked on mobile, horizontal on desktop)
  - Design system colors (text-muted, text-secondary, border-border)
  - Hover effects on social links (color changes to primary green)

  Root Layout Integration (Milestone 1.5.4)

  Completed:
  - ✅ Font loading with JetBrains Mono (already done)
  - ✅ Navbar integrated
  - ✅ Footer integrated
  - ✅ Dark mode class on <html> (already done)
  - ✅ Proper flex layout with sticky footer (footer always at bottom)

  Layout Structure:
  <body> - flex container with min-h-screen
    <Navbar /> - sticky at top
    <main> - flex-1 (takes remaining space)
      {children} - page content
    </main>
    <Footer /> - always at bottom
  </body>

### 1.5.4 Root Layout Integration
- [x] Update `src/app/layout.tsx` to include:
  - Font loading
  - Navbar
  - Footer
  - Dark mode class on `<html>`

### Acceptance Criteria
- Navbar is visible and sticky on scroll
- All nav links work (anchor links scroll, route links navigate)
- Mobile menu opens/closes
- Footer appears at bottom of content

---

## Milestone 1.6: Create Data Files

### Tasks
- [x] Create `src/data/site-config.json` with your personal info
- [x] Create `src/data/experience.json` with placeholder or real data
- [x] Create `src/data/certifications.json` with placeholder or real data
- [x] Create `src/data/projects.json` with placeholder or real data
- [x] Create `src/data/articles.json` with placeholder or real data

### Acceptance Criteria
- All JSON files are valid (no syntax errors)
- Data matches the TypeScript interfaces
- Can import and use data in components

---

## Milestone 1.7: Create Placeholder Pages

### Tasks
- [x] Update `src/app/page.tsx` with placeholder sections:
  - Hero section placeholder
  - Experience section placeholder (`id="experience"`)
  - Certifications section placeholder (`id="certifications"`)
- [x] Create `src/app/projects/page.tsx` with placeholder content
- [x] Create `src/app/engineering-log/page.tsx` with placeholder content

### Acceptance Criteria
- All routes are accessible
- Anchor links from navbar scroll to correct sections
- No 404 errors

---

## Phase 1 Completion Checklist

- [x] `npm run dev` works without errors
- [x] `npm run build` completes successfully
- [x] `npm run lint` passes
- [x] Dark theme is applied site-wide
- [x] JetBrains Mono font is rendering
- [x] Navbar is sticky and functional
- [x] All pages/routes are accessible
- [x] Data files exist and are importable
- [x] Types are defined and usable

---

## Dependencies to Install

```bash
# Already included with create-next-app:
# - next
# - react
# - react-dom
# - typescript
# - tailwindcss
# - eslint

# Optional utilities (install if needed):
npm install clsx tailwind-merge
```

---

## Estimated File Count After Phase 1

| Location | Files |
|----------|-------|
| `src/app/` | 5 |
| `src/components/layout/` | 3 |
| `src/data/` | 5 |
| `src/types/` | 1 |
| `public/fonts/` | 3 |
| Config files | 4 |
| **Total** | ~21 |
