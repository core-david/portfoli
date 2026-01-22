# Portfolio Website Implementation Plan

## Overview
A dark-themed, terminal-aesthetic portfolio for an MLOps & Systems Engineer built with Next.js, TypeScript, and Three.js.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** @react-three/fiber + drei
- **Font:** JetBrains Mono
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
│   │   ├── page.tsx                # Home (Hero + Experience + Certs)
│   │   ├── globals.css
│   │   ├── projects/page.tsx
│   │   └── engineering-log/page.tsx
│   ├── components/
│   │   ├── layout/{Navbar,Footer,Container}.tsx
│   │   ├── home/{HeroSection,NeuralNetworkCanvas,SearchPlaceholder}.tsx
│   │   ├── experience/{Timeline,TimelineItem,TechBadge}.tsx
│   │   ├── certifications/{CertificationsSection,CertificationNode}.tsx
│   │   ├── projects/{ProjectGrid,ProjectCard}.tsx
│   │   └── engineering-log/{ArticleList,ArticleCard}.tsx
│   ├── data/
│   │   ├── site-config.json
│   │   ├── experience.json
│   │   ├── certifications.json
│   │   ├── projects.json
│   │   └── articles.json
│   ├── lib/three/neural-network.ts
│   ├── hooks/{useScrollSpy,useIntersectionObserver}.ts
│   └── types/index.ts
```

---

## Build Order

### Phase 1: Foundation
1. Initialize Next.js with TypeScript + Tailwind
2. Configure Tailwind theme (dark colors, JetBrains Mono, terminal green `#00ff88`)
3. Create folder structure and type definitions
4. Build layout components (Navbar, Footer, Container)
5. Create JSON data files with your content

### Phase 2: Home Page Sections
6. HeroSection - name, tagline, social icons, action buttons
7. SearchPlaceholder - styled input (non-functional for MVP)
8. ExperienceSection - vertical timeline with company logos, impact points, tech badges
9. CertificationsSection - horizontal row of circular logos with hover effects

### Phase 3: Additional Pages
10. Projects page - responsive grid of project cards
11. Engineering Log page - article list with excerpts

### Phase 4: Three.js Animation
12. Install Three.js dependencies (@react-three/fiber, drei, three)
13. Create NeuralNetworkCanvas with dynamic import (SSR disabled)
14. Implement floating nodes using InstancedMesh
15. Add connection lines with BufferGeometry
16. Add pulse/glow animation effects
17. Mobile optimization (reduce nodes, detect low-power devices)

### Phase 5: Polish & Deploy
18. Add scroll animations with Intersection Observer
19. Responsive testing across devices
20. Lighthouse optimization (images, fonts, code splitting)
21. Deploy to Vercel

---

## Data Schemas

### experience.json
```json
{
  "experiences": [{
    "id": "exp-001",
    "company": "Company Name",
    "companyLogo": "/images/companies/company.svg",
    "role": "Senior MLOps Engineer",
    "startDate": "2023-01",
    "endDate": null,
    "current": true,
    "impactPoints": ["Optimized inference latency by 40%"],
    "techStack": ["Kubernetes", "PyTorch", "Docker"]
  }]
}
```

### certifications.json
```json
{
  "certifications": [{
    "id": "cert-001",
    "name": "AWS Solutions Architect",
    "logo": "/images/certifications/aws.svg",
    "credentialUrl": "https://credly.com/..."
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
    "demoUrl": null
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

---

## Design Tokens (Tailwind)

```
Colors:
  background: #0a0a0a
  surface: #141414
  border: #262626
  primary: #00ff88 (terminal green)
  text-primary: #e5e5e5
  text-secondary: #a3a3a3

Font: JetBrains Mono (self-hosted via next/font)
```

---

## MVP Scope (What's Included)

- [x] Sticky navbar with anchor links
- [x] Hero with Three.js neural network animation
- [x] Search box UI (placeholder only)
- [x] Experience timeline
- [x] Certifications section
- [x] Projects page
- [x] Engineering Log page
- [ ] ~~Second Brain/Obsidian integration~~ (v1)
- [ ] ~~RAG-powered search backend~~ (v1)

---

## Verification Plan

1. **Visual:** Check all sections render correctly on desktop/tablet/mobile
2. **Animation:** Confirm Three.js runs smoothly (60fps target, fallback works)
3. **Navigation:** Test all navbar links and anchor scrolling
4. **Interactivity:** Hover states on certifications, project cards
5. **Performance:** Run Lighthouse, target 90+ performance score
6. **Deploy:** Verify Vercel deployment works with no build errors
