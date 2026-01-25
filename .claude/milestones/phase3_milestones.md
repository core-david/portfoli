# Phase 3: Projects Enhancement - Milestones

## Overview
Phase 3 enhances the projects experience with a Featured Work section on the home page and category filtering on the projects page.

**Important:** Project cards are self-contained in this phase. Clicking a card does NOT navigate to a detail page. All relevant info (name, summary, tech stack, GitHub/Demo links) is displayed directly on the card. Project detail pages (`/projects/[slug]`) are deferred to v2.

---

## Part A: Featured Work Section (Home Page)

### Milestone 3.1: Update projects.json Schema
**Status:** ✅ Complete

**Tasks:**
- [x] Add `category` field to each project (`"mlops"` | `"data-science"`)
- [x] Add `featured: boolean` field to mark flagship projects
- [x] Update 4 projects with `featured: true`:
  - Mexico Economic Resilience Data Lake (mlops)
  - MLOps Time Series Forecasting Pipeline (mlops)
  - Gravitational Wave Detection (data-science)
  - Route Optimization System (data-science)
- [x] Update TypeScript `Project` interface in `src/types/index.ts`

**Acceptance Criteria:**
- All projects have a valid `category` field
- Exactly 4 projects marked as `featured: true`
- TypeScript compiles without errors

---

### Milestone 3.2: Create FeaturedProjectCard Component
**Status:** ✅ Complete

**Location:** `src/components/home/FeaturedProjectCard.tsx`

**Design Note:** Cards are self-contained. No click-through to detail pages (v2 feature). All project info displayed directly on card with GitHub/Demo action buttons.

**Tasks:**
- [x] Create component file with TypeScript props interface
- [x] Implement card layout:
  - Project name (heading) - NOT a link
  - Summary text (1-2 lines, truncated)
  - Category badge (color-coded)
  - Top 4 tech stack badges (reuse TechBadge component)
  - GitHub button/icon link (if githubUrl exists)
  - Live Demo button/icon link (if demoUrl exists)
- [x] Style category badge:
  - MLOps: primary green (`bg-primary/20 text-primary`)
  - Data Science: purple (`bg-purple-500/20 text-purple-400`)
- [x] Add hover animation (border glow effect) - decorative only, not clickable
- [x] Ensure responsive design (full width on mobile)

**Acceptance Criteria:**
- Component renders project data correctly
- Category badge displays correct color based on category
- Hover state shows subtle border glow (decorative)
- GitHub/Demo buttons open in new tab with proper accessibility
- Card itself is NOT clickable (no navigation)

---

### Milestone 3.3: Create FeaturedWorkSection Component
**Status:** ✅ Complete

**Location:** `src/components/home/FeaturedWorkSection.tsx`

**Tasks:**
- [x] Create section wrapper with consistent styling
- [x] Add section heading: "Featured Work" or "Featured Projects"
- [x] Import and filter projects from `projects.json` (featured === true)
- [x] Implement 2x2 grid layout:
  - `grid-cols-1 md:grid-cols-2` for responsive behavior
  - Consistent gap spacing
- [x] Add "View all projects →" link to `/projects`
- [x] Wrap with AnimatedSection for scroll animation
- [x] Add staggered animation delay for each card

**Acceptance Criteria:**
- Displays exactly 4 featured projects in 2x2 grid
- Responsive: stacks to 1 column on mobile
- "View all projects" link navigates correctly
- Scroll animation triggers on viewport entry

---

### Milestone 3.4: Integrate FeaturedWorkSection into Home Page
**Status:** ✅ Complete

**Location:** `src/app/page.tsx`

**Tasks:**
- [x] Import FeaturedWorkSection component
- [x] Add section after HeroSection, before EducationSection
- [x] Verify section ordering:
  1. HeroSection
  2. **FeaturedWorkSection** (new)
  3. EducationSection
  4. ExperienceSection
  5. CertificationsSection
- [x] Test navigation and scroll behavior

**Acceptance Criteria:**
- Featured Work section visible on home page
- Proper spacing between sections
- No layout shifts or visual bugs

---

## Part B: Projects Page Category Filter

### Milestone 3.5: Create CategoryFilter Component
**Status:** ✅ Complete

**Location:** `src/components/projects/CategoryFilter.tsx`

**Tasks:**
- [x] Create client component (`'use client'`)
- [x] Define filter options:
  - `all` - "All Projects"
  - `mlops` - "MLOps & Infrastructure"
  - `data-science` - "Data Science & Research"
- [x] Implement pill/button UI for each category
- [x] Style active state with primary color
- [x] Handle click to update selected category
- [x] Emit category change via callback prop

**Acceptance Criteria:**
- Three filter pills displayed horizontally
- Active pill has distinct styling (primary color)
- Click changes active state
- Component is accessible (keyboard navigation)

---

### Milestone 3.6: Implement URL-based Filtering (Optional)
**Status:** ✅ Complete

**Tasks:**
- [x] Use `useSearchParams` from `next/navigation`
- [x] Read `?category=` param on page load
- [x] Update URL when filter changes (shallow routing)
- [x] Support direct links: `/projects?category=mlops`

**Acceptance Criteria:**
- Filter state persists in URL
- Shareable URLs work correctly
- Browser back/forward works with filters

---

### Milestone 3.7: Update Projects Page with Filtering
**Status:** ✅ Complete

**Location:** `src/app/projects/page.tsx`

**Tasks:**
- [x] Convert to client component or use client wrapper
- [x] Import CategoryFilter component
- [x] Add filter state management
- [x] Filter projects based on selected category
- [x] Implement smooth transition animation:
  - Fade out filtered-out cards
  - Fade in matching cards
  - Use CSS transitions or Framer Motion (optional)
- [x] Show "No projects found" if filter returns empty

**Acceptance Criteria:**
- Filter pills appear above project grid
- Clicking filter shows only matching projects
- Transition animation is smooth (not jarring)
- Default shows all projects

---

### Milestone 3.8: Add Filter Transition Animations
**Status:** ✅ Complete

**Tasks:**
- [x] Add CSS transition classes for filter changes
- [x] Option A: Pure CSS with opacity/transform transitions
- [x] Option B: Install framer-motion for AnimatePresence
- [x] Ensure layout doesn't jump during transitions
- [x] Test performance on mobile

**Acceptance Criteria:**
- Cards animate smoothly when filtering
- No layout shift during animation
- Performance remains smooth (60fps)

---

## Verification Checklist

### Part A - Featured Work Section
- [x] 4 projects display on home page in 2x2 grid
- [x] Category badges show correct colors
- [x] Tech badges display (max 4 per card)
- [x] GitHub/Demo buttons work (open in new tab)
- [x] Cards are NOT clickable (no navigation to detail pages)
- [x] "View all projects" navigates to /projects
- [x] Responsive layout works on mobile/tablet/desktop
- [x] Scroll animation triggers correctly

### Part B - Category Filter
- [x] All three filter pills visible
- [x] Active filter has primary color styling
- [x] Clicking "MLOps" shows only MLOps projects
- [x] Clicking "Data Science" shows only Data Science projects
- [x] Clicking "All" shows all projects
- [x] Filter transitions are smooth
- [x] URL updates with filter (if implemented)

### General
- [x] `npm run build` succeeds with no errors
- [x] `npm run lint` passes
- [x] No TypeScript errors
- [x] No console errors in browser
- [x] Lighthouse performance score maintained (90+)

---

## Dependencies

**No new npm packages required** (unless adding framer-motion for animations)

Optional:
- `framer-motion` - For AnimatePresence filter transitions

---

## Estimated Component Tree

```
Home Page (/)
├── HeroSection
├── FeaturedWorkSection (NEW)
│   └── FeaturedProjectCard (×4)
│       └── TechBadge (reused)
├── EducationSection
├── ExperienceSection
└── CertificationsSection

Projects Page (/projects)
├── CategoryFilter (NEW)
│   └── FilterPill (×3)
└── ProjectGrid
    └── ProjectCard (filtered)
```

---

## Files to Create/Modify

### New Files
- `src/components/home/FeaturedWorkSection.tsx`
- `src/components/home/FeaturedProjectCard.tsx`
- `src/components/projects/CategoryFilter.tsx`

### Modified Files
- `src/data/projects.json` - Add category and featured fields
- `src/types/index.ts` - Update Project interface
- `src/app/page.tsx` - Add FeaturedWorkSection
- `src/app/projects/page.tsx` - Add CategoryFilter and filtering logic

---

## Deferred to v2

### Project Detail Pages
**Route:** `/projects/[slug]`

The following features are NOT part of Phase 3 and will be implemented in v2:
- Clickable project cards that navigate to detail pages
- Full project descriptions with rich content
- Screenshots and demo GIFs
- Architecture diagrams
- Detailed tech stack breakdown
- Challenges and solutions section
- MDX support for rich content
