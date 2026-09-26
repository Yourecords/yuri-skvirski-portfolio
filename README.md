# Yuri Skvirski — Professional Portfolio Website

A complete, polished, and responsive personal portfolio website for **Yuri Skvirski**, Video Production Director and Head of Video Production based in Jerusalem, Israel.

The website communicates senior video production leadership across broadcast, promo campaigns, multi-camera studios, workflows, and crew direction with an understated, confident editorial tone.

---

## Key Features

1. **Senior Leadership Positioning**:
   - Focus on creative direction, broadcast-grade technical mastery, studio construction, and team leadership.
   - Restrained language free of marketing hype, buzzwords, and sales tropes.

2. **Design System & Color Balance**:
   - **70% Cinematic Black**: `--color-bg: #0b0d0f`
   - **20% Charcoal and Graphite**: `--color-bg-secondary: #15181c`, `--color-surface: #20242a`, `--color-border: #343a42`
   - **8% White and Gray Typography**: `--color-text: #f4f2ed`, `--color-text-muted: #a7adb5`
   - **2% Red Accent**: `--color-accent: #c72732`, hover: `--color-accent-hover: #e13b45`
   - **Amber only for occasional premium details**: `--color-detail: #c79a55`


3. **Interactive Editorial Portfolio**:
   - **Hero Showreel Frame**: 16:9 cinematic aspect ratio with camera viewfinder HUD markings, broadcast tally indicator, and interactive preview modal.
   - **Project 1 (i24NEWS Promotional Work)**: Channel branding, program launches, and editorial promos with video lightbox integration.
   - **Project 2 (JNS Studio Productions)**: Primary studio video montage plus interactive episode card previews (panels, interviews, podcasts, field reports).
   - **Project 3 (Building the JNS Studio)**: Interactive 5-stage case study (Studio space, BTS crew & talent, Camera rig, Multiview control room, and Finished on-air frame).
   - **Project 4 (Production Leadership)**: 6-stage workflow process model (Editorial Concept → Planning → Technical Prep → Production → Post → Delivery).
   - **Project 5 (Extensible Template)**: Ready-to-use schema for adding future projects effortlessly.

4. **Studio Capabilities & Restrained Timeline**:
   - 10 core capability areas paired with documentary-style behind-the-scenes photography.
   - Vertical timeline of leadership roles at JNS and i24NEWS with a direct "Download CV" link.

5. **Technical Understanding Matrix**:
   - 4-column balanced domain overview: Direction, Production, Technical, and Post-Production.

6. **Direct Inquiry Channel**:
   - Accessible contact form with validation, spam protection honeypot, and confirmation feedback.
   - Direct professional email and location in Jerusalem, Israel.

7. **Dual-Mode Development Specs Overlay**:
   - A floating switch ("Dev Specs ON/OFF") enables you to toggle development asset briefs on and off, or review the clean final visitor view.

8. **SEO & Performance**:
   - Fast Vite pipeline, zero third-party framework overhead.
   - OpenGraph, Twitter Cards, semantic HTML5 landmarks, and JSON-LD `Person` schema.

---

## Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm

### Installation
Open your terminal in the project directory:

```bash
# On Windows PowerShell:
npm.cmd install
```

### Running Locally (Development Server)
```bash
npm.cmd run dev
```
Open `http://localhost:3000` in your browser. Changes in `src/` or `data/` will automatically hot-reload.

### Building for Production
```bash
npm.cmd run build
```
The compiled, production-ready static assets will be output to the `dist/` directory.

To preview the production build locally:
```bash
npm.cmd run preview
```

---

## How to Customize Content & Media

### 1. Updating Text & Contact Information
Open `src/data/portfolio-data.js`:
- **Email & Socials**: Edit `profile.email` and `profile.socialLinks`.
- **Bio & Philosophy**: Edit `about.content`.
- **Timeline**: Add or modify entries in `experience.timeline`.
- **Capabilities**: Adjust points under `studioCapability.capabilities`.

### 2. Replacing Video Links (YouTube / Vimeo)
In `src/data/portfolio-data.js`:
- **i24NEWS Showreel**: Set `videoEmbedUrl` in `selectedWork.projects[0]` to your YouTube or Vimeo embed URL (e.g. `https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID` or `https://player.vimeo.com/video/YOUR_VIDEO_ID`).
- **JNS Studio Productions**: Set `videoEmbedUrl` in `selectedWork.projects[1]`.
- **Hero Video**: Provide a background loop video file or video URL in `hero.media.videoUrl`.

### 3. Replacing Images & Photography
Drop your high-resolution photographs into `public/images/` and update paths in `src/data/portfolio-data.js`:
- **Hero Background**: `public/images/hero-studio-poster.svg` (or `.jpg`/`.webp`)
- **i24NEWS Poster**: `public/images/project-i24news-poster.svg`
- **JNS Studio Poster**: `public/images/project-jns-productions.svg`
- **JNS Studio Stages (1-5)**:
  - `studio-stage-wide.svg` (Complete space and screen layout)
  - `studio-stage-bts.svg` (Crew, cameras, lighting, talent)
  - `studio-stage-rig.svg` (Camera rig, teleprompter, optical setup)
  - `studio-stage-control.svg` (Multiview switcher interface)
  - `studio-stage-onair.svg` (Finished on-screen broadcast frame)
- **Documentary Studio Photo**: `public/images/studio-capability-bts.svg`
- **Portrait**: `public/images/portrait-placeholder.svg` (Environmental studio portrait)

### 4. Updating the CV File
Replace `public/cv-placeholder.pdf` with your actual CV PDF file (keep the same filename or update the link in `src/data/portfolio-data.js`).

### 5. Toggling or Removing the Development Spec Overlay Before Launch
- **Quick switch**: Toggle the floating "Dev Specs" button at the bottom right.
- **In URL**: Append `?dev=false` to test the clean view.
- **For Permanent Publication**: 
  In `src/styles/components.css`, set `.dev-spec-panel { display: none !important; }` and remove `<aside class="dev-mode-floating-control">` from `src/components/DevGuideOverlay.js`, or leave it turned off via `localStorage`.

---

## Project Structure

```
Show Reel Project/
├── index.html                   # Base HTML with SEO, OpenGraph & JSON-LD
├── package.json                 # Project configuration & scripts
├── vite.config.js               # Vite server & build configuration
├── README.md                    # This documentation file
├── public/
│   ├── favicon.svg              # Broadcast aperture favicon
│   ├── cv-placeholder.pdf       # Downloadable CV document
│   └── images/                  # High-fidelity SVG mockups & photography
└── src/
    ├── main.js                  # App bootstrap and interactive controllers
    ├── data/
    │   └── portfolio-data.js    # Centralized content and project schema
    ├── styles/
    │   ├── tokens.css           # Design tokens, color palette & typography
    │   ├── base.css             # Resets, semantic tags & accessibility
    │   ├── components.css       # Layout cards, timeline, modals & badges
    │   └── responsive.css       # Mobile & tablet breakpoints
    └── components/
        ├── Header.js            # Sticky header & mobile drawer
        ├── Hero.js              # Hero headline, copy, and 16:9 media frame
        ├── SelectedWork.js      # Project cards, episode grid & stage switchers
        ├── StudioCapability.js  # Capabilities list & documentary BTS media
        ├── ExperienceTimeline.js# Career timeline & CV action
        ├── AboutSection.js      # Director biography & portrait specification
        ├── TechnicalMatrix.js   # 4-domain technical breakdown
        ├── ContactSection.js    # Contact channels & validated form
        ├── Footer.js            # Understated signature footer
        ├── VideoModal.js        # 16:9 lightbox player
        └── DevGuideOverlay.js   # Switchable development guidance toggle
```

## Google Drive media library

You can keep photos and video exports in a private Google Drive folder and sync selected files into the website at build time. See [setup and upload instructions](docs/google-drive-media.md). This requires Node.js 22+ and build-time Google credentials. Uploading to Drive takes effect after a rebuild/redeploy.
