# Portfolio Website Implementation Plan

## Overview
A dark-themed, terminal-aesthetic portfolio for an MLOps & Systems Engineer built with Next.js, TypeScript, and Three.js.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (using `@import "tailwindcss"` and `@theme {}` syntax)
- **Animation:** @react-three/fiber + drei
- **Icons:** react-icons (Simple Icons), lucide-react
- **Font:** JetBrains Mono (self-hosted via `next/font/local`)
- **Hosting:** Vercel (free tier)

---

## Project Structure

```
portfolio/
├── public/
│   ├── fonts/JetBrainsMono/
│   ├── images/{companies,certifications,projects}/
│   └── documents/resume.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout + Navbar
│   │   ├── page.tsx                # Home (Hero + Education + Experience + Certs)
│   │   ├── globals.css             # Tailwind theme + animations
│   │   ├── projects/page.tsx
│   │   └── engineering-log/page.tsx
│   ├── components/
│   │   ├── layout/{Navbar,Footer,Container}.tsx
│   │   ├── home/{HeroSection,SearchPlaceholder}.tsx
│   │   ├── experience/{ExperienceSection,Timeline,TimelineItem,TechBadge}.tsx
│   │   ├── education/{EducationSection,EducationCard}.tsx
│   │   ├── certifications/{CertificationsSection,CertificationNode}.tsx
│   │   └── ui/{AnimatedSection}.tsx
│   ├── data/
│   │   ├── site-config.json
│   │   ├── experience.json
│   │   ├── education.json
│   │   ├── certifications.json
│   │   ├── projects.json
│   │   └── articles.json
│   ├── hooks/
│   │   ├── useTypewriter.ts        # Typewriter animation hook
│   │   └── useIntersectionObserver.ts  # Scroll animation hook
│   └── types/index.ts              # TypeScript interfaces
```

---

## Build Order

### Phase 1: Foundation ✅ COMPLETE
1. **[x] Initialize Next.js with TypeScript + Tailwind**
   - Created project with App Router, TypeScript, ESLint
   - Cleaned default boilerplate

2. **[x] Configure Tailwind theme**
   - Implemented Tailwind CSS v4 with `@theme {}` syntax in globals.css
   - Dark color palette: background (#0a0a0a), surface (#141414), border (#262626), primary (#00ff88)
   - Self-hosted JetBrains Mono (Regular 400, Medium 500, Bold 700) via `next/font/local`
   - Smooth scroll behavior with 80px padding-top for sticky navbar

3. **[x] Create folder structure and type definitions**
   - Full component directory structure (layout, home, experience, certifications, projects, engineering-log, ui)
   - TypeScript interfaces: SiteConfig, Experience, Certification, Project, Article, Education
   - Data, lib, hooks, types directories created

4. **[x] Build layout components**
   - **Container:** Max-width wrapper with responsive padding
   - **Navbar:** Sticky header with backdrop blur, scroll spy for active links, mobile hamburger menu, cross-page anchor navigation
   - **Footer:** Minimal design with copyright, condensed social links (GH, LI, LC)
   - **Root Layout:** Integrated Navbar + Footer with flex layout (sticky footer at bottom)

5. **[x] Create JSON data files**
   - site-config.json, experience.json, certifications.json, projects.json, articles.json
   - All files validated against TypeScript interfaces
   - Placeholder pages created for all routes (/, /projects, /engineering-log)

**Phase 1 Technical Notes:**
- Navbar uses `'use client'` with scroll position tracking for active link highlighting
- Anchor links work across pages (e.g., `/projects` → `/#experience` navigates and scrolls)
- Design system implemented via CSS custom properties in `@theme {}` block
- No `tailwind.config.ts` needed (Tailwind v4 approach)
- Build, lint, and dev server all passing
- Dependencies installed: clsx, tailwind-merge (utility libraries)

---

### Phase 2: Home Page Sections ✅ COMPLETE

6. **[x] HeroSection** - name, tagline, social icons, action buttons
7. **[x] SearchPlaceholder** - styled input (non-functional for MVP)
8. **[x] ExperienceSection** - vertical timeline with company logos, impact points, tech badges
9. **[x] EducationSection** - education cards with institution logos, degrees, achievements
10. **[x] CertificationsSection** - horizontal row of circular logos with hover effects
11. **[x] Projects page** - responsive grid with scroll animations
12. **[x] Engineering Log page** - article list with scroll animations
13. **[x] Scroll animations** - intersection observer fade-in effects

**Phase 2 Technical Notes:**

**Dependencies Installed:**
- `react-icons` - Simple Icons for brand logos (SiGithub, SiLinkedin, SiLeetcode)
- `lucide-react` - Search icon and other UI icons

**Custom Hooks Created:**
- `useTypewriter.ts` - Cycles through titles with typing/deleting animation
  - Configurable speeds: typeSpeed (100ms), deleteSpeed (50ms), delayBetweenWords (2000ms)
  - Titles: "Data Scientist" → "Software Engineer" → "MLOps Engineer" → "Systems Engineer"
- `useIntersectionObserver.ts` - Detects viewport entry for scroll animations
  - Options: threshold (0.1), rootMargin, triggerOnce (true)
  - Returns `{ ref, isVisible }` for conditional rendering

**CSS Animations (globals.css):**
```css
@keyframes fade-in { from { opacity: 0; transform: translateY(20px); } }
@keyframes cursor-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
```
- `.animate-fade-in` - 0.8s entrance animation
- `.animate-cursor` - 1s infinite blink for typewriter cursor

**Component Architecture:**

| Component | Location | Key Features |
|-----------|----------|--------------|
| HeroSection | `home/` | Typewriter effect, social icons, CTA buttons |
| SearchPlaceholder | `home/` | Read-only input, "Coming soon" tooltip on focus |
| ExperienceSection | `experience/` | Wraps Timeline component |
| Timeline | `experience/` | Vertical line, maps TimelineItem |
| TimelineItem | `experience/` | Company logo (next/image), role, dates, impact points, tech badges |
| TechBadge | `experience/` | Pill-shaped tech stack badge with hover |
| EducationSection | `education/` | Wraps EducationCard with AnimatedSection |
| EducationCard | `education/` | Institution logo, degree, coursework, achievements |
| CertificationsSection | `certifications/` | Flex wrap layout for CertificationNode |
| CertificationNode | `certifications/` | Circular logo, tooltip on hover, links to credential |
| AnimatedSection | `ui/` | Intersection observer wrapper with configurable delay |

**Responsive Design Patterns:**
- Text scaling: `text-5xl md:text-7xl` for headings
- Button layout: `flex-col sm:flex-row` for mobile stacking
- Grid layouts: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for cards
- Section padding: `pt-20 pb-10` or `py-20` for consistent spacing

**Home Page Section Order:**
1. HeroSection (with typewriter animation)
2. EducationSection
3. ExperienceSection
4. CertificationsSection

---

### Phase 3: Projects & Engineering Log Enhancement

**Projects Page - Category Filtering:**
14. Add `category` field to projects.json schema
15. Create filter UI component with category pills/tabs
16. Implement client-side filtering with URL query params
17. Add "All" option and active state styling
18. Animate filter transitions (fade in/out cards)

**Engineering Log - Substack Integration:**
19. Evaluate integration approach (embed vs API vs RSS)
20. Create Substack embed component or RSS feed parser
21. Update Engineering Log page layout
22. Add "Subscribe" CTA linking to Substack
23. Style embedded content to match terminal theme

**Project Categories (based on current projects):**
- All
- Data Engineering (AWS, Airflow, Spark)
- MLOps (Kedro, MLflow, Docker)
- AI/LLM (OpenAI, GPT, Fine-tuning)
- Data Science (ML, Statistics, GeoPandas)
- Deep Learning (PyTorch, CNN, TDA)
- Operations Research (Optimization, GAMS)

### Phase 4: Three.js Animation
24. Install Three.js dependencies (@react-three/fiber, drei, three)
25. Create NeuralNetworkCanvas with dynamic import (SSR disabled)
26. Implement floating nodes using InstancedMesh
27. Add connection lines with BufferGeometry
28. Add pulse/glow animation effects
29. Mobile optimization (reduce nodes, detect low-power devices)
30. Add fallback gradient for non-WebGL browsers

### Phase 5: Polish & Deploy
31. Lighthouse optimization (images, fonts, code splitting)
32. SEO metadata (Open Graph, Twitter cards)
33. Deploy to Vercel
34. Final responsive testing

---

## Phase 2 Deliverables Summary

**Home Page Components:**
- ✅ HeroSection with typewriter animation and CTA buttons
- ✅ SearchPlaceholder with tooltip (future RAG integration)
- ✅ ExperienceSection with vertical timeline
- ✅ EducationSection with institution cards
- ✅ CertificationsSection with circular logo nodes

**Additional Pages:**
- ✅ Projects page with grid layout and scroll animations
- ✅ Engineering Log page with article cards and scroll animations

**Animation System:**
- ✅ useTypewriter hook for dynamic title cycling
- ✅ useIntersectionObserver hook for scroll detection
- ✅ AnimatedSection wrapper with staggered delays
- ✅ CSS keyframe animations (fade-in, cursor-blink)

**Type Definitions:**
- ✅ Education interface added to types/index.ts

**Build Status:**
- ✅ `npm run dev` works
- ✅ `npm run build` passes (zero errors)
- ✅ `npm run lint` passes (zero warnings)

---

## Data Schemas

### experience.json
```json
{
  "experiences": [{
    "id": "exp-001",
    "company": "Company Name",
    "companyLogo": "/images/companies/company.svg",
    "location": "City, Country",
    "role": "Senior MLOps Engineer",
    "startDate": "2023-01",
    "endDate": null,
    "current": true,
    "impactPoints": ["Optimized inference latency by 40%"],
    "techStack": ["Kubernetes", "PyTorch", "Docker"]
  }]
}
```

### education.json
```json
{
  "education": [{
    "id": "edu-001",
    "company": "University Name",
    "companyLogo": "/images/companies/university.svg",
    "location": "City, Country",
    "degree:": "Bachelor of Engineering",
    "major": "Data Science",
    "minor": "Mathematics",
    "startDate": "2021-08",
    "endDate": "2025-06",
    "impactPoints": ["Scholarship for Academic Excellence"],
    "Relevant Courses": ["Machine Learning", "Deep Learning", "MLOps"]
  }]
}
```

### certifications.json
```json
{
  "certifications": [{
    "id": "cert-001",
    "name": "AWS Solutions Architect",
    "issuer": "Amazon Web Services",
    "logo": "/images/certifications/aws.svg",
    "credentialUrl": "https://credly.com/...",
    "pdfUrl": null,
    "issueDate": "2024-01",
    "expiryDate": null
  }]
}
```

### projects.json
```json
{
  "projects": [{
    "id": "proj-001",
    "name": "Distributed Key-Value Store",
    "summary": "A distributed KV store built in Go with Raft consensus",
    "techStack": ["Go", "gRPC", "Raft"],
    "githubUrl": "https://github.com/...",
    "demoUrl": null,
    "featured": true,
    "order": 1
  }]
}
```

---

## Three.js Animation Details

**Approach:** Use @react-three/fiber for React integration

**Visual:**
- 80-120 floating nodes (spheres) in 3D space
- Dynamic connections between nearby nodes (lines)
- Subtle pulse/glow effects traveling along connections
- Gentle floating motion using sine waves

**Performance:**
- InstancedMesh for nodes (single draw call)
- Dynamic import with `next/dynamic` to avoid SSR issues
- Reduce to 40 nodes on mobile
- Fallback gradient for non-WebGL browsers

**Files to Create:**
- `src/components/home/NeuralNetworkCanvas.tsx` - Canvas wrapper
- `src/lib/three/neural-network.ts` - Animation logic

---

## Phase 3: Projects & Engineering Log Details

### Projects Category Filtering

**Data Model Update (projects.json):**
```json
{
  "id": "proj-001",
  "name": "Project Name",
  "category": "data-engineering",  // NEW FIELD
  "tags": ["AWS", "Airflow"],      // Optional: more granular filtering
  ...
}
```

**Category Definitions:**
| Category | Slug | Projects |
|----------|------|----------|
| All | `all` | Show all |
| Data Engineering | `data-engineering` | proj-001 |
| MLOps | `mlops` | proj-002 |
| AI/LLM | `ai-llm` | proj-003 |
| Data Science | `data-science` | proj-004, proj-006 |
| Deep Learning | `deep-learning` | proj-005 |
| Operations Research | `operations-research` | proj-007, proj-008 |

**Components to Create:**
- `src/components/projects/CategoryFilter.tsx` - Filter pills/tabs UI
- Update `src/app/projects/page.tsx` - Add filtering logic

**URL Structure:**
- `/projects` - Show all
- `/projects?category=mlops` - Filter by category

### Engineering Log - Substack Integration

**Integration Options:**

| Approach | Pros | Cons |
|----------|------|------|
| **1. Embed iframe** | Simple, auto-updates | Limited styling, slower load |
| **2. RSS Feed parsing** | Full styling control, fast | Requires build-time/runtime fetch |
| **3. Substack API** | Real-time, full control | API may be limited/unofficial |
| **4. Link out only** | Zero maintenance | Users leave site |

**Recommended: RSS Feed + Link Out Hybrid**
- Parse Substack RSS at build time (ISR) for article previews
- Style cards to match terminal theme
- "Read on Substack" CTA for full articles
- "Subscribe" button linking to Substack subscription

**Components to Create:**
- `src/components/engineering-log/SubstackFeed.tsx` - RSS parser component
- `src/lib/substack.ts` - RSS fetch/parse utility
- Update `src/app/engineering-log/page.tsx` - Use SubstackFeed

**Substack RSS URL Format:**
```
https://yourusername.substack.com/feed
```

---

## Design Tokens (Tailwind CSS v4)

Defined in `src/app/globals.css` using `@theme {}` block:

```css
@theme {
  --font-mono: var(--font-jetbrains), monospace;

  --color-background: #0a0a0a;
  --color-surface: #141414;
  --color-border: #262626;
  --color-primary: #00ff88;        /* terminal green */
  --color-primary-dim: #00cc6a;
  --color-text-primary: #e5e5e5;
  --color-text-secondary: #a3a3a3;
  --color-text-muted: #737373;
}
```

**Usage:** `bg-background`, `text-primary`, `border-border`, etc.

**Font:** JetBrains Mono loaded via `next/font/local` (400/500/700 weights, .woff2 format)

---

## MVP Scope (What's Included)

- [x] Sticky navbar with anchor links
- [x] Hero with typewriter animation
- [x] Search box UI (placeholder only)
- [x] Experience timeline
- [x] Education section
- [x] Certifications section
- [x] Projects page with grid
- [x] Engineering Log page (static)
- [x] Scroll animations (intersection observer)
- [ ] Projects category filtering (Phase 3)
- [ ] Engineering Log Substack integration (Phase 3)
- [ ] Three.js neural network animation (Phase 4)
- [ ] ~~Second Brain/Obsidian integration~~ (v2)
- [ ] ~~RAG-powered search backend~~ (v2)

---

## Verification Plan

1. **Visual:** Check all sections render correctly on desktop/tablet/mobile
2. **Animation:** Confirm Three.js runs smoothly (60fps target, fallback works)
3. **Navigation:** Test all navbar links and anchor scrolling
4. **Interactivity:** Hover states on certifications, project cards
5. **Performance:** Run Lighthouse, target 90+ performance score
6. **Deploy:** Verify Vercel deployment works with no build errors
