## Technical details

Scale: few hundreds of visitors
Cost: Free
Tech stack:
    - Next/React
    - Typescript
    - Vercel


## Core Identity & Branding
- Primary Title: MLOps & Systems Engineer.

- Tagline: "Building Infrastructure for the Future of AI."

- Visual Style: Industrial, sleek, technical. Dark mode default with monospaced fonts (e.g., JetBrains Mono) to evoke a terminal/IDE feel.

## Site Architecture (Sitemap)

- The navigation bar should be sticky (always visible) and contain:
- Home (The Hero Section)
- Experience (Anchor link to scroll down)
- Certifications (Anchor link to scroll down)
- Projects (Dedicated page)
- Second Brain (Link to Obsidian Knowledge Base)
- Engineering Log (Articles/Blog, Dedicated page )

## Detailed Page Breakdown
### The Hero Section (Landing View)
- The "Hook" (Visual Background):
    Instead of a generic video, use a WebGL or Three.js particle simulation that forms the shape of a neural network or a server cluster.

- The Introduction:
    - Headline: Your Name.
    - Sub-headline: "Architecting distributed systems and scalable ML infrastructure."
    Action Bar:
        - Icons: LinkedIn, LeetCode (highlighting your rating/solved count if high), GitHub.

        - Primary Button: "Download Resume" (PDF).

        - Secondary Button: "Chat on WhatsApp" (Direct API link).

### The "Interactive Context" (The LLM Search)
    - Feature: "Ask the System" (RAG-powered Search Bar).

    - Functionality: A centralized search bar prominently placed below the intro.

    - Description: "I’ve trained a model on my professional history. Ask it anything: 'What is his experience with Kubernetes?' or 'Describe his toughest distributed computing challenge.'"

    - Why this works: It proves your MLOps skills immediately. You aren't just saying you build AI systems; the website is an AI system.

### The Experience Section (Scroll Down)
    - Layout: A vertical timeline connecting your roles.

    - Format:
        - Left: Company Logo & Dates.
        - Right: Role Title & "Impact Points" (e.g., "Optimized inference latency by 40% using C++").
        - Tech Stack Tags: Small badges for tools used in that role (e.g., Docker, Rust, PyTorch).

### Verified Credentials Section (Scroll Down)
    - Layout: A clean, centered heading followed by a horizontal row of floating circular nodes (logos).

    - Format:
        - Default State: A row of grayscale or muted circular logos.
        - Hover State: The logo regains full brand color, slightly enlarges (scale 1.1), and a small "Tooltip" appears above it with the Certification Name.
        - Click Action: Opens the specific PDF or Credly verification link in a new tab.



### The Projects Section (Navbar Link)
Grid Layout: Cards featuring your best builds.

Card Content:
    - Project Name.
    - One-sentence technical summary (e.g., "A distributed key-value store built in Go").
    - "View Code" (GitHub) and "Live Demo" buttons.

### The Knowledge Base (Navbar Link)
Concept: "My Digital Garden."

Integration: A direct render of your Obsidian vault (using tools like Obsidian Publish or Quartz).

Content: Raw notes on algorithms, system design patterns, and paper summaries. This shows you are a continuous learner.

### Articles / Engineering Log (Navbar Link)
Content: Long-form technical deep dives.

Examples: "Memory Management in Rust vs C++," "Setting up a Kubernetes Cluster from Scratch."

