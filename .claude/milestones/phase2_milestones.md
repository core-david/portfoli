# Phase 2: Home Page Sections - Milestones

## Overview
Build the four main sections for the home page using existing data files and design system from Phase 1.

**Prerequisites:** Phase 1 complete (layout components, data files, Tailwind theme, font setup)

---

## Milestone 1: HeroSection Component

### Objective
Create the hero section with personal branding, social links, and call-to-action buttons.

### Tasks
- [x] **1.1** Create `src/components/home/HeroSection.tsx`
- [x] **1.2** Import and display name + tagline from `site-config.json`
- [x] **1.3** Add social icon links (GitHub, LinkedIn, LeetCode) with hover effects
- [x] **1.4** Create three CTA buttons: "View Projects", "Contact via WhatsApp", and "Download Resume"
- [x] **1.5** Style with terminal aesthetic (primary green accent, monospace font)
- [x] **1.6** Add a entrance typing effect animation for the title, it needs to change dinamically, changing for example from Data Scientist to MLOps Engineer, to Software Engineer with the typing and deleting animation
- [x] **1.7** Ensure responsive layout (stack vertically on mobile)

### Acceptance Criteria
- Name displays in large, bold text
- Tagline displays below in secondary text color
- Social icons are clickable and open in new tabs
- "View Projects" scrolls/navigates to projects section
- "Contact via WhatsApp" opens WhatsApp chat in new tab
- "Download Resume" links to `/documents/resume.pdf`
- Section is centered and visually balanced

### Dependencies
- `src/data/site-config.json` (should include WhatsApp contact number)
- Social icons (use inline SVGs or icon library)

### ✅ Implementation Details (COMPLETE)

**Files Created:**
- `src/components/home/HeroSection.tsx` - Main hero component with typewriter effect
- `src/hooks/useTypewriter.ts` - Custom React hook for typewriter animation

**Dependencies Installed:**
- `react-icons` - Simple Icons for brand logos (GitHub, LinkedIn, LeetCode)
- `lucide-react` - Initially used but replaced with react-icons to avoid deprecated brand icons

**Technical Implementation:**

1. **Component Structure (HeroSection.tsx)**
   - Marked as `'use client'` (required for React hooks)
   - Imports: Next.js Link, react-icons/si (Simple Icons), site-config.json, useTypewriter hook
   - Layout: Centered flex container with max-width and responsive padding
   - Sections: Name (h1), Animated Title (p), Tagline (p), Social Icons (div), CTA Buttons (div)

2. **Typewriter Effect (useTypewriter.ts)**
   - Custom hook that cycles through array of titles
   - Configurable speeds: typeSpeed (100ms), deleteSpeed (50ms), delayBetweenWords (2000ms)
   - Titles cycle: "Data Scientist" → "Software Engineer" → "MLOps Engineer" → "Systems Engineer"
   - Returns current text and deleting state for external use

3. **Animations (globals.css)**
   - `fade-in` - Entrance animation for entire hero section (0.8s ease-out)
   - `cursor-blink` - Blinking cursor animation (1s infinite) with 50% opacity toggle
   - Applied via `animate-fade-in` and `animate-cursor` classes

4. **Social Icons**
   - Used `SiGithub`, `SiLinkedin`, `SiLeetcode` from react-icons/si
   - Hover effect: text-secondary → text-primary transition (200ms)
   - All links open in new tabs with `rel="noopener noreferrer"`

5. **CTA Buttons**
   - "View Projects" - Primary green button, navigates to /projects page
   - "Contact via WhatsApp" - Secondary button with border, opens WhatsApp chat (auto-formats phone number)
   - "Download Resume" - Secondary button with border, opens resume PDF in new tab
   - Responsive layout: Flex column on mobile (< 640px), row on desktop

6. **Responsive Design**
   - Text sizing: text-5xl → text-7xl (name), text-xl → text-2xl (title)
   - Button layout: Stacks vertically on mobile (flex-col), horizontal on sm+ (sm:flex-row)
   - Full width buttons on mobile (w-full), auto width on sm+ (sm:w-auto)
   - Min-height on title container prevents layout shift during typing animation

**Styling:**
- Terminal aesthetic with `text-primary` (#00ff88) for animated title
- Dark backgrounds with `bg-primary` (buttons), `bg-surface` (secondary buttons)
- Border hover effects: `hover:border-primary` transition
- Shadow effects on primary button: `shadow-lg hover:shadow-primary/20`

---

## Milestone 2: SearchPlaceholder Component

### Objective
Create a styled search input that hints at future RAG-powered search functionality.

### Tasks
- [x] **2.1** Create `src/components/home/SearchPlaceholder.tsx`
- [x] **2.2** Style input with dark surface background and border
- [x] **2.3** Add search icon (magnifying glass) inside input
- [x] **2.4** Add placeholder text: "Search my experience, projects, and notes..."
- [x] **2.5** Add subtle focus state (primary green border glow)
- [x] **2.6** Make input read-only or show "Coming soon" tooltip on focus

### Acceptance Criteria
- Input is visually prominent but clearly non-functional
- Matches terminal aesthetic (dark bg, green accents)
- Responsive width (full width on mobile, max-width on desktop)
- Accessible (proper label, focus states)

### Dependencies
- None (self-contained UI component)

### ✅ Implementation Details (COMPLETE)

**Files Created:**
- `src/components/home/SearchPlaceholder.tsx` - Search input component with tooltip

**Dependencies Used:**
- `lucide-react` - Search icon component
- React useState hook - Tooltip visibility state management

**Technical Implementation:**

1. **Component Structure (SearchPlaceholder.tsx)**
   - Marked as `'use client'` (required for React hooks)
   - Imports: Search icon from lucide-react, useState from React
   - Layout: Relative positioned container for absolute children
   - State: `showTooltip` boolean to control tooltip visibility

2. **Search Input**
   - Read-only input (`readOnly` attribute) prevents text entry
   - Placeholder: "Search my experience, projects, and notes..."
   - Accessible with `aria-label="Search placeholder (coming soon)"`
   - Cursor style: `cursor-not-allowed` indicates non-functional state
   - Full width responsive design (`w-full`)

3. **Search Icon**
   - Positioned absolutely inside input (left side)
   - Vertically centered with `top-1/2 -translate-y-1/2`
   - Non-interactive with `pointer-events-none`
   - Color: `text-text-muted` (#737373)
   - Size: 20px (w-5 h-5)

4. **Focus States & Interactions**
   - Focus handler: `onFocus` shows tooltip
   - Blur handler: `onBlur` hides tooltip
   - Border transitions: `border-border` → `border-primary` on focus
   - Ring effect: `focus:ring-1 focus:ring-primary` for accessibility
   - Transition: `transition-all duration-200` for smooth state changes

5. **Coming Soon Tooltip**
   - Conditionally rendered when `showTooltip` is true
   - Positioned below input, horizontally centered
   - Content: "🚀 Coming soon - RAG-powered search"
   - Styling: Dark surface background with primary green border
   - Animation: Uses `animate-fade-in` class from globals.css
   - Auto-dismiss on blur (unfocus)

6. **Responsive Design**
   - Full width on all viewports (`w-full`)
   - Padding: `pl-12` (left, accounts for icon), `pr-4` (right), `py-3` (vertical)
   - Tooltip uses `whitespace-nowrap` to prevent text wrapping

**Styling:**
- Terminal aesthetic with `bg-surface` (#141414) background
- Border: `border-border` (#262626), transitions to `text-primary` (#00ff88) on focus
- Text colors: `text-text-primary` for input, `text-text-muted` for placeholder
- Focus ring creates subtle glow effect around input
- Tooltip shadow: `shadow-lg` for depth

---

## Milestone 3: ExperienceSection Component

### Objective
Build a vertical timeline displaying work history with company details, impact points, and tech badges.

### Sub-components
- `ExperienceSection.tsx` - Section wrapper with heading
- `Timeline.tsx` - Vertical line container
- `TimelineItem.tsx` - Individual experience card
- `TechBadge.tsx` - Reusable tech stack pill

### Tasks
- [x] **3.1** Create `src/components/experience/TechBadge.tsx`
  - Pill-shaped badge with border
  - Text color: text-secondary, hover: primary
- [x] **3.2** Create `src/components/experience/TimelineItem.tsx`
  - Company logo (circular, bordered)
  - Company name + role
  - Date range (format: "Jan 2023 - Present")
  - Impact points as bullet list
  - Tech stack as horizontal badge row
- [x] **3.3** Create `src/components/experience/Timeline.tsx`
  - Vertical line on left side
  - Dot markers at each item
  - Alternating or left-aligned layout
- [x] **3.4** Create `src/components/experience/ExperienceSection.tsx`
  - Section heading with anchor id="experience"
  - Import and map over `experience.json`
  - Wrap Timeline with Container
- [x] **3.5** Handle "current" job indicator (green dot or "Present" badge)
- [x] **3.6** Add hover effects on timeline items (subtle lift or glow)
- [x] **3.7** Ensure responsive stacking on mobile

### Acceptance Criteria
- All experiences from JSON render correctly
- Timeline is visually clear with connected line
- Company logos display (fallback for missing images)
- Impact points are scannable bullet points
- Tech badges wrap nicely on smaller screens
- Current job is visually distinguished

### Dependencies
- `src/data/experience.json`
- Company logo images in `public/images/companies/`

---

## Milestone 4: CertificationsSection Component

### Objective
Display certifications in a horizontal scrollable row with circular logos and hover interactions.

### Sub-components
- `CertificationsSection.tsx` - Section wrapper
- `CertificationNode.tsx` - Individual certification circle

### Tasks
- [x] **4.1** Create `src/components/certifications/CertificationNode.tsx`
  - Circular container with border
  - Logo image centered inside
  - Certification name tooltip on hover
  - Click opens credential URL in new tab
- [x] **4.2** Create `src/components/certifications/CertificationsSection.tsx`
  - Section heading with anchor id="certifications"
  - Horizontal flex container with gap
  - Optional: horizontal scroll on mobile overflow
- [x] **4.3** Add hover effects (scale up, border glow, name reveal)
- [ ] **4.4** Implement connection lines between nodes (optional, neural network style) - Deferred to Phase 4 (Three.js)
- [x] **4.5** Ensure keyboard accessibility (focusable, enter to open link)
- [x] **4.6** Add responsive behavior (wrap or scroll on mobile)

### Acceptance Criteria
- All certifications from JSON render as circles
- Logos are properly sized and centered
- Hover shows certification name
- Click opens Credly/verification link
- Section looks cohesive with neural network theme
- Works on touch devices

### Dependencies
- `src/data/certifications.json`
- Certification logos in `public/images/certifications/`

### ✅ Implementation Details (COMPLETE)

**Files Created:**
- `src/components/certifications/CertificationNode.tsx` - Individual certification circle with tooltip
- `src/components/certifications/CertificationsSection.tsx` - Section wrapper with heading

**Technical Implementation:**

1. **Component Structure (CertificationNode.tsx)**
   - Marked as `'use client'` (required for React hooks)
   - Imports: Next.js Image and Link, useState from React
   - State: `showTooltip` boolean to control tooltip visibility
   - Circular container: 128px diameter (w-32 h-32)
   - Logo display: 80px square (w-20 h-20) centered inside circle

2. **Interactive Features**
   - Hover handlers: `onMouseEnter`, `onMouseLeave` for tooltip display
   - Focus handlers: `onFocus`, `onBlur` for keyboard accessibility
   - Conditional rendering: Wraps in Link component if credentialUrl or pdfUrl exists
   - Fallback: Non-clickable div if no URLs provided

3. **Hover Effects**
   - Scale transformation: `hover:scale-110` (10% larger on hover)
   - Border glow: `border-border` → `hover:border-primary` transition
   - Shadow effect: `hover:shadow-lg hover:shadow-primary/20` for depth
   - Smooth transitions: `transition-all duration-300 ease-out`

4. **Tooltip Design**
   - Positioned below node: `top-full mt-4` with centered alignment
   - Content: Certification name (primary text) + Issuer (secondary text)
   - Arrow pointer: CSS triangle using border trick
   - Background: `bg-surface` with `border-primary`
   - Animation: Uses `animate-fade-in` class from globals.css
   - Non-interactive: `pointer-events-none` to prevent interference

5. **Keyboard Accessibility**
   - Focus ring: `focus-within:ring-2 focus-within:ring-primary` for visible focus state
   - Ring offset: `focus-within:ring-offset-2` for separation from element
   - Links open in new tabs with `rel="noopener noreferrer"` for security
   - Proper `aria-label` for screen readers

6. **Section Component (CertificationsSection.tsx)**
   - Section heading with anchor `id="certifications"` for navigation
   - Decorative underline: 80px wide, 4px high, primary color
   - Container: Uses existing `Container` component for consistent max-width
   - Layout: Flex with wrapping, centered on all viewports
   - Gap: 32px (gap-8) between nodes for breathing room

7. **Responsive Design**
   - Flex wrap: Nodes wrap to multiple rows on smaller screens
   - Centered layout: `justify-center items-start` for balanced appearance
   - No horizontal scroll needed due to wrapping behavior
   - Touch-friendly: Adequate spacing between nodes for mobile interaction

**Styling:**
- Terminal aesthetic with `bg-surface` (#141414) circles
- Border: `border-border` (#262626), transitions to `text-primary` (#00ff88) on hover
- Neural network theme: Circular nodes hint at upcoming Three.js visualization
- Consistent spacing: 20rem vertical padding (py-20) matches other sections

**Integration:**
- Replaced inline certifications markup in `src/app/page.tsx`
- Now using dedicated component for cleaner code
- Maintains anchor link support for navbar navigation

---

## Milestone 5: EducationSection Component

### Objective
Display educational background with institution logos, degrees, and relevant achievements.

### Sub-components
- `EducationSection.tsx` - Section wrapper with heading
- `EducationCard.tsx` - Individual education entry

### Tasks
- [x] **5.1** Create `src/components/education/EducationCard.tsx`
  - Institution logo (circular or square, bordered)
  - Degree and major/field of study
  - Institution name
  - Date range (format: "Aug 2018 - May 2022" or "Expected May 2025")
  - GPA or honors (if applicable)
  - Relevant coursework or achievements as bullet list
- [x] **5.2** Create `src/components/education/EducationSection.tsx`
  - Section heading with anchor id="education"
  - Import and map over `education.json`
  - Grid or vertical stack layout
  - Wrap with Container
- [x] **5.3** Add hover effects on education cards (subtle lift or border glow)
- [x] **5.4** Handle "in progress" degree indicator (if currently enrolled)
- [x] **5.5** Ensure responsive layout (stack on mobile, grid on desktop)
- [x] **5.6** Add optional links to institution website or transcript

### Acceptance Criteria
- All education entries from JSON render correctly
- Institution logos display (fallback for missing images)
- Degrees and majors are clearly readable
- Date ranges formatted consistently
- Achievements/coursework are scannable
- Cards are visually consistent with experience timeline style
- Responsive design works on all viewports

### Dependencies
- `src/data/education.json`
- Institution/university logo images in `public/images/education/`

---

## Milestone 6: Home Page Integration

### Objective
Assemble all sections into the home page with proper spacing and scroll behavior.

### Tasks
- [x] **6.1** Update `src/app/page.tsx` to import all section components
- [x] **6.2** Arrange sections in order: Hero → Search → Experience → Education → Certifications
- [x] **6.3** Add consistent vertical spacing between sections (py-16 or py-20)
- [x] **6.4** Verify anchor link scrolling from navbar works correctly
- [x] **6.5** Test scroll-spy highlighting in navbar for each section
- [x] **6.6** Add section dividers if needed (subtle border or gradient)

### Acceptance Criteria
- All sections render without errors
- Smooth scroll to anchors works
- Navbar highlights correct section while scrolling
- No layout shifts or overflow issues
- Page passes `npm run build` and `npm run lint`

### Dependencies
- All Milestone 1-4 components complete

---

## Milestone 7: Visual Polish & Testing

### Objective
Refine animations, test responsiveness, and ensure consistency.

### Tasks
- [x] **7.1** Add intersection observer animations (fade-in on scroll)
- [x] **7.2** Test on mobile viewport (375px)
- [x] **7.3** Test on tablet viewport (768px)
- [x] **7.4** Test on desktop viewport (1280px+)
- [x] **7.5** Verify dark theme consistency across all components
- [x] **7.6** Check color contrast for accessibility (WCAG AA)
- [x] **7.7** Run Lighthouse audit, address any critical issues
- [x] **7.8** Fix any TypeScript or ESLint warnings

### Acceptance Criteria
- All sections animate smoothly on scroll
- No horizontal overflow on any viewport
- Text is readable at all sizes
- Lighthouse accessibility score > 90
- Zero build/lint errors

---

## Estimated Component Count

| Directory | Files |
|-----------|-------|
| `components/home/` | 2 (HeroSection, SearchPlaceholder) |
| `components/experience/` | 4 (Section, Timeline, TimelineItem, TechBadge) |
| `components/education/` | 2 (Section, EducationCard) |
| `components/certifications/` | 2 (Section, CertificationNode) |
| **Total new components** | **10** |

---

## Build Order Summary

```
1. HeroSection          → Basic hero with text and buttons
2. SearchPlaceholder    → Styled input (quick win)
3. TechBadge           → Reusable badge component
4. TimelineItem        → Experience card layout
5. Timeline            → Vertical timeline wrapper
6. ExperienceSection   → Full experience section
7. EducationCard       → Individual education entry
8. EducationSection    → Full education section
9. CertificationNode   → Individual cert circle
10. CertificationsSection → Full certs section
11. Home Page Integration → Wire everything together
12. Polish & Testing    → Animations, responsiveness
```

---

## Verification Checklist

Before marking Phase 2 complete:

- [x] `npm run dev` shows all sections correctly
- [x] `npm run build` passes without errors
- [x] `npm run lint` passes without warnings
- [x] Navbar anchor links scroll to correct sections
- [x] All data from JSON files displays correctly
- [x] Responsive design works on mobile/tablet/desktop
- [x] Hover states and interactions feel polished
- [x] No placeholder text or TODO comments remain
