# El-Shaddai Baptist School

The official website for El-Shaddai Baptist School — a premier learning institution committed to raising leaders with character and intellect through holistic education, moral integrity, and academic excellence.

## About

This project is the front-end UI for the El-Shaddai Baptist School website, built with modern web technologies and designed with a premium forest-green branded aesthetic.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Runtime**: Bun

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ or [Bun](https://bun.sh/)

### Installation

```bash
git clone https://github.com/Ireoluuwa/elshaddaibaptistschools-ui.git
cd elshaddaibaptistschools-ui
npm install
```

### Development

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
components/
  home/
    Navbar.tsx        - Responsive navigation with mobile dropdown
    Hero.tsx          - Animated hero section with gradient overlay
    Features.tsx      - School highlights and key features
    Facilities.tsx    - Campus facilities showcase
    Faculty.tsx       - Staff and faculty profiles
    Testimonials.tsx  - Student and parent testimonials
    NewsAndEvents.tsx - Latest school news and events
    CTA.tsx           - Call-to-action section
    Footer.tsx        - Site footer with contact information
app/
  page.tsx            - Landing page composition
  layout.tsx          - Root layout with fonts and metadata
  globals.css         - Global styles and design tokens
```

## Features

- Fully responsive design (mobile, tablet, desktop)
- Smooth scroll-triggered entrance animations
- Animated mobile navigation with staggered link reveals
- Premium forest-green branded color palette
- Optimized imagery with gradient overlays
- SEO-friendly semantic HTML structure

## Deployment

This project can be deployed on [Vercel](https://vercel.com) or any platform supporting Next.js.

```bash
npm run build
```

## License

All rights reserved. El-Shaddai Baptist School.
