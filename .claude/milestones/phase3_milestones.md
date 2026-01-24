# Phase 3: Projects & Engineering Log Enhancement - Milestones

## Overview
Enhance the Projects page with category filtering and integrate Substack for the Engineering Log.

**Prerequisites:** Phase 2 complete (Projects page with grid, Engineering Log with static articles)

---

## Milestone 1: Projects Data Model Update

### Objective
Add category field to projects and define category taxonomy.

### Tasks
- [ ] **1.1** Update `projects.json` - Add `category` field to each project
- [ ] **1.2** Update `src/types/index.ts` - Add category to Project interface
- [ ] **1.3** Create category constants file `src/data/categories.ts`
- [ ] **1.4** Validate all projects have valid categories assigned

### Category Assignments
| Project | Category |
|---------|----------|
| Mexico Economic Resilience Data Lake | `data-engineering` |
| MLOps Time Series Forecasting | `mlops` |
| AI-Powered Fund Allocation | `ai-llm` |
| Geospatial Crime Prediction | `data-science` |
| Gravitational Wave Detection | `deep-learning` |
| Environmental Pollution Classification | `data-science` |
| Route Optimization System | `operations-research` |
| Industrial Failure Classification | `operations-research` |

### Acceptance Criteria
- All projects have a valid category assigned
- TypeScript compiles without errors
- Build passes

---

## Milestone 2: Category Filter Component

### Objective
Create a reusable filter UI component with category pills.

### Tasks
- [ ] **2.1** Create `src/components/projects/CategoryFilter.tsx`
  - Horizontal scrollable pill/tab layout
  - "All" option always first
  - Active state with primary color
  - Click handler to set active category
- [ ] **2.2** Style filter pills with terminal aesthetic
  - Inactive: `bg-surface border-border text-text-secondary`
  - Active: `bg-primary/10 border-primary text-primary`
  - Hover: `hover:border-primary-dim`
- [ ] **2.3** Add category icons (optional, using lucide-react)
- [ ] **2.4** Ensure responsive behavior (horizontal scroll on mobile)
- [ ] **2.5** Add keyboard accessibility (arrow keys to navigate)

### Acceptance Criteria
- Filter component renders all categories
- Visual distinction between active and inactive states
- Works on mobile with touch scrolling
- Accessible via keyboard

---

## Milestone 3: Projects Page Filtering Logic

### Objective
Implement client-side filtering with URL query params.

### Tasks
- [ ] **3.1** Update `src/app/projects/page.tsx` to use `'use client'`
- [ ] **3.2** Add `useSearchParams` hook from `next/navigation`
- [ ] **3.3** Implement filter state management
  - Read category from URL: `?category=mlops`
  - Default to "all" if no param
- [ ] **3.4** Filter projects array based on selected category
- [ ] **3.5** Update URL when category changes (shallow routing)
- [ ] **3.6** Add animated transitions when filtering
  - Fade out removed cards
  - Fade in new cards
  - Use AnimatedSection or CSS transitions

### Acceptance Criteria
- URL reflects current filter state
- Shareable filtered URLs work (e.g., `/projects?category=mlops`)
- Browser back/forward works correctly
- Smooth animation when switching categories
- "No projects found" state if category is empty

---

## Milestone 4: Substack Setup & Research

### Objective
Set up Substack account and determine integration approach.

### Tasks
- [ ] **4.1** Create Substack publication (if not exists)
- [ ] **4.2** Get Substack RSS feed URL
- [ ] **4.3** Test RSS feed parsing locally
- [ ] **4.4** Decide on integration approach:
  - Option A: Build-time RSS fetch (SSG/ISR)
  - Option B: Client-side RSS fetch
  - Option C: Simple link-out with preview cards
- [ ] **4.5** Document Substack URL and configuration

### Decision Criteria
- How often will you publish? (affects caching strategy)
- Do you need real-time updates or is daily/weekly rebuild OK?
- Do you want full articles on your site or just previews?

---

## Milestone 5: Substack RSS Integration

### Objective
Create utilities and components to display Substack content.

### Tasks
- [ ] **5.1** Create `src/lib/substack.ts` - RSS parsing utility
  - Fetch RSS feed from Substack
  - Parse XML to JSON
  - Extract: title, excerpt, publishedAt, url, thumbnail
- [ ] **5.2** Create `src/components/engineering-log/SubstackArticle.tsx`
  - Article card matching existing design
  - "Read on Substack" external link
  - Published date and read time
- [ ] **5.3** Create `src/components/engineering-log/SubscribeCTA.tsx`
  - Prominent subscribe button
  - Links to Substack subscription page
  - Terminal-styled design
- [ ] **5.4** Handle loading and error states
- [ ] **5.5** Add caching strategy (ISR with revalidate)

### Technical Notes
```typescript
// Example RSS item structure
interface SubstackArticle {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publishedAt: string;
  thumbnail?: string;
}
```

### Acceptance Criteria
- Articles from Substack display on Engineering Log page
- Links open Substack in new tab
- Subscribe CTA is prominent
- Graceful fallback if RSS fetch fails
- Styling matches terminal theme

---

## Milestone 6: Engineering Log Page Update

### Objective
Integrate Substack feed into Engineering Log page.

### Tasks
- [ ] **6.1** Update `src/app/engineering-log/page.tsx`
  - Remove static articles.json import
  - Use SubstackFeed component
- [ ] **6.2** Add page header with description
- [ ] **6.3** Add SubscribeCTA component (top or sidebar)
- [ ] **6.4** Implement ISR with `revalidate` for fresh content
- [ ] **6.5** Add empty state if no articles
- [ ] **6.6** Keep scroll animations for article cards

### Page Layout
```
┌─────────────────────────────────────┐
│  Engineering Log                    │
│  Technical writing and insights     │
│                                     │
│  [Subscribe to Newsletter →]        │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │ Article Card 1              │   │
│  │ Read on Substack →          │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ Article Card 2              │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Acceptance Criteria
- Page displays Substack articles
- Subscribe CTA is visible
- Scroll animations work
- ISR updates content periodically

---

## Milestone 7: Testing & Polish

### Objective
Test all new functionality and polish UI.

### Tasks
- [ ] **7.1** Test category filtering on all viewports
- [ ] **7.2** Test filtered URL sharing
- [ ] **7.3** Test Substack RSS with real content
- [ ] **7.4** Verify build passes with ISR
- [ ] **7.5** Check Lighthouse scores
- [ ] **7.6** Fix any TypeScript/ESLint warnings

### Acceptance Criteria
- All filters work correctly
- No console errors
- Build and lint pass
- Responsive on mobile/tablet/desktop

---

## Verification Checklist

Before marking Phase 3 complete:

- [ ] `npm run build` passes without errors
- [ ] `npm run lint` passes without warnings
- [ ] Category filter shows all categories
- [ ] Clicking category filters projects correctly
- [ ] URL updates with category param
- [ ] Substack articles display on Engineering Log
- [ ] Subscribe CTA links to Substack
- [ ] Animations work smoothly
- [ ] Mobile responsive

---

## Dependencies

**No new packages required for filtering.**

**For Substack RSS (if using server-side parsing):**
```bash
npm install rss-parser  # Popular RSS parsing library
```

Or use native `fetch` + `DOMParser` for client-side.

---

## Questions to Answer Before Starting

1. **Substack URL:** What is your Substack publication URL?
2. **Update frequency:** How often do you publish? (affects ISR revalidate time)
3. **Full articles or previews:** Do you want full article content on your site or just previews with "Read more" links?
4. **Category icons:** Do you want icons next to category names in the filter?
