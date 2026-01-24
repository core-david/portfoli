# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for an MLOps & Systems Engineer. Dark-themed, terminal-aesthetic design with a Three.js neural network animation.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (using `@import "tailwindcss"` and `@theme {}` syntax)
- **Animation:** @react-three/fiber + drei
- **Font:** JetBrains Mono (self-hosted via `next/font/local`)
- **Hosting:** Vercel

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Run ESLint
```

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

## Architecture

### Routing
- `/` - Home page (Hero + Experience + Certifications sections)
- `/projects` - Project grid page
- `/engineering-log` - Blog/articles page

### Data Layer
Content is stored in JSON files under `src/data/`:
- `site-config.json` - Name, tagline, social links
- `experience.json` - Work history with impact points and tech stack
- `certifications.json` - Credential logos and verification URLs
- `projects.json` - Project cards with GitHub/demo links
- `articles.json` - Blog post metadata

### Three.js Animation
The hero background uses `@react-three/fiber` with:
- `NeuralNetworkCanvas.tsx` - Canvas wrapper with dynamic import (SSR disabled)
- `InstancedMesh` for nodes (single draw call), `BufferGeometry` for connection lines
- 80-120 floating nodes on desktop, 40 nodes on mobile
- Subtle pulse/glow effects, gentle floating motion using sine waves
- Fallback gradient for non-WebGL browsers

## Design System

Defined in `src/app/globals.css` using `@theme {}` block:

| Token | Value | Usage |
|-------|-------|-------|
| background | #0a0a0a | `bg-background` |
| surface | #141414 | `bg-surface` |
| border | #262626 | `border-border` |
| primary | #00ff88 | `text-primary` (terminal green) |
| primary-dim | #00cc6a | `text-primary-dim` |
| text-primary | #e5e5e5 | `text-text-primary` |
| text-secondary | #a3a3a3 | `text-text-secondary` |
| text-muted | #737373 | `text-text-muted` |
| font | JetBrains Mono | `font-mono` |

## Key Conventions

- All Three.js components must be marked with `'use client'`
- Use `next/dynamic` with `{ ssr: false }` for Three.js canvas
- Prefer SVG for logos (company, certification)
- Self-host fonts via `next/font/local` (400/500/700 weights, .woff2 format)
- No `tailwind.config.ts` needed (Tailwind v4 approach)
- Navbar uses scroll position tracking for active link highlighting
- Anchor links work across pages (e.g., `/projects` → `/#experience`)

