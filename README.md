# Ankush Kumar — Developer Portfolio

A professional developer portfolio built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**.

> Designed to communicate: _"Ankush is a Java Backend Developer who builds real-world software applications."_

---

## Features

- ✅ **Dark/Light theme switcher** — persisted in localStorage, respects system preference
- ✅ **Fully responsive** — mobile, tablet, laptop, desktop
- ✅ **Three real project case studies** — LifeOS AI, IBM Investment Analyst Agent, Attendance System
- ✅ **Project case study modals** — problem, solution, architecture, features, challenges, learnings
- ✅ **Categorised skills section** — no fake percentage bars
- ✅ **Contact form** — full validation, Formspree integration, mailto fallback
- ✅ **Sticky navbar** with active section indicator and mobile hamburger menu
- ✅ **SEO optimised** — meta tags, Open Graph, Twitter card, robots.txt, sitemap.xml
- ✅ **Accessible** — semantic HTML, ARIA labels, keyboard navigation, focus states, reduced-motion support
- ✅ **Data-driven** — all personal info, projects, skills, and socials configurable from `src/data/`
- ✅ **Production-ready** — Vercel and Netlify deployment config included

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 (dark mode: class) |
| Animation | Framer Motion (subtle, reduced-motion aware) |
| Icons | Lucide React |
| SEO | react-helmet-async |
| Contact | Formspree (configurable) |
| Deployment | Vercel / Netlify |

---

## Prerequisites

- **Node.js 20+** (see `.nvmrc`)
- **npm 9+**
- **Git**

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file (optional)
cp .env.example .env
# Edit .env to add your Formspree ID and deployed domain URL

# 3. Start development server
npm run dev
# → http://localhost:5173
```

---

## Build & Preview

```bash
# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
# → http://localhost:4173
```

---

## Customisation

All personal content lives in `src/data/`. You never need to touch UI components to update content.

### `src/data/personal.ts`
Update your name, bio, email, resume path, and "open to work" status.

```ts
const personal: PersonalInfo = {
  name: 'Ankush Kumar',
  title: 'Java Backend Developer',
  email: 'your@email.com',          // Already updated
  resumeAvailable: false,           // Set true after adding public/resume.pdf
  openToWork: true,
  // ...
}
```

### `src/data/socials.ts`
Replace any remaining `PLACEHOLDER_*` values (LeetCode, CodeChef, GFG) with your actual usernames.

### `src/data/projects.ts`
Each project has a full data model. Add or edit projects here — the UI renders automatically.

### `src/data/skills.ts`
Add, remove, or re-categorise skills. Set `level: 'primary'` or `'secondary'` to distinguish confidence levels.

### `src/data/education.ts`
Uncomment and set `period` and `cgpa` when ready.

### Resume PDF
Place your resume at **`public/resume.pdf`**, then set `resumeAvailable: true` in `src/data/personal.ts`.

---

## Environment Variables

Copy `.env.example` to `.env` and set the following:

| Variable | Required | Description |
|---|---|---|
| `VITE_FORMSPREE_ID` | Optional | Formspree form ID for contact form email delivery |
| `VITE_SITE_URL` | Optional | Your deployed domain (used for SEO canonical URL) |

**Formspree setup:**
1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form — copy the form ID (e.g. `xpwzabcd`)
3. Set `VITE_FORMSPREE_ID=xpwzabcd` in your `.env`

If `VITE_FORMSPREE_ID` is not set, the contact form falls back to opening a pre-filled email in the user's email client.

---

## Project Structure

```
portfolio/
├── public/
│   ├── resume.pdf          ← Place your resume here (set resumeAvailable: true when done)
│   ├── favicon.svg
│   ├── robots.txt          ← Update domain from your-domain.com after deployment
│   └── sitemap.xml         ← Update domain from your-domain.com after deployment
├── src/
│   ├── components/
│   │   ├── ui/             ← Reusable primitives (Button, Badge, Tag, SectionHeading)
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── SocialLinks.tsx
│   │   ├── ProjectModal.tsx
│   │   └── ContactForm.tsx
│   ├── sections/           ← Page sections (Hero, About, Skills, Projects, ...)
│   ├── data/               ← ✏️ Edit content here
│   │   ├── personal.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   ├── socials.ts
│   │   └── education.ts
│   ├── hooks/              ← useTheme, useActiveSection, useScrolled
│   ├── lib/utils.ts        ← cn(), externalLink(), isPlaceholder()
│   ├── types/index.ts      ← TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── .gitignore
├── vercel.json             ← SPA routing config for Vercel
├── netlify.toml            ← SPA routing + build config for Netlify
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## Pushing to GitHub

### First time (new repository)

```bash
# 1. Initialise a git repository (skip if already initialised)
git init

# 2. Add all files
git add .

# 3. Make the initial commit
git commit -m "Initial commit: portfolio"

# 4. Create a new repository on GitHub (go to https://github.com/new)
#    Name it something like "portfolio" — leave it empty (no README, no .gitignore)

# 5. Add the remote origin (replace <YOUR_USERNAME> and <REPO_NAME>)
git remote add origin https://github.com/ankush-010/portfolio.git

# 6. Push to GitHub
git branch -M main
git push -u origin main
```

### Subsequent pushes (after making changes)

```bash
git add .
git commit -m "Update portfolio content"
git push
```

---

## Deployment

### Vercel (Recommended)

1. Push this repo to GitHub (see above)
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repository
3. Framework Preset will auto-detect **Vite** — leave defaults as-is
4. Under **Environment Variables**, add:
   - `VITE_FORMSPREE_ID` = your Formspree form ID
   - `VITE_SITE_URL` = `https://your-vercel-domain.vercel.app` (update after first deploy)
5. Click **Deploy**

`vercel.json` is already configured for SPA routing — all routes serve `index.html`.

### Netlify

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project**
2. Connect your GitHub repository
3. Build settings are auto-detected from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Under **Environment Variables**, add `VITE_FORMSPREE_ID` and `VITE_SITE_URL`
5. Click **Deploy**

### Manual / Other Platforms

```bash
npm run build
# Upload the contents of dist/ to your hosting provider
```

---

## After Deployment — Final Steps

Once your site is live, update these files with your real domain:

1. **`public/robots.txt`** — Replace `your-domain.com` with your actual domain
2. **`public/sitemap.xml`** — Replace `your-domain.com` with your actual domain
3. **`.env`** (or hosting platform env vars) — Set `VITE_SITE_URL=https://your-actual-domain.com`
4. **`public/og-image.png`** — Add a 1200×630px Open Graph preview image

---

## What's Still Left To Configure

Search for `PLACEHOLDER` in `src/data/socials.ts` to find remaining items:

- [ ] LeetCode username in `src/data/socials.ts`
- [ ] CodeChef username in `src/data/socials.ts`
- [ ] GeeksforGeeks username in `src/data/socials.ts`
- [ ] `public/resume.pdf` — place your actual resume here, then set `resumeAvailable: true` in `src/data/personal.ts`
- [ ] `src/data/education.ts` — uncomment `period` and `cgpa` when ready
- [ ] `public/robots.txt` and `public/sitemap.xml` — update domain after deployment
- [ ] `public/og-image.png` — add an Open Graph social preview image (1200×630px)
- [ ] `.env` — add `VITE_FORMSPREE_ID` and `VITE_SITE_URL` for production

---

## License

Personal portfolio — all rights reserved.

Built with React, Vite, Tailwind CSS, Framer Motion, and Lucide React.
