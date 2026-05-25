# Premium Portfolio Website - Harsh Pandya

This repository contains the complete, production-ready portfolio website for **Harsh Pandya**, a backend-focused Software Engineer specializing in distributed systems, REST API optimizations, database scaling, and reliability.

The application is styled with a premium, technical, modern dark aesthetic inspired by developer tools like Linear, Stripe, and Vercel.

---

## 🌟 Key Features

1. **Procedural 3D Developer Avatar**:
   - An interactive 3D avatar built in **Three.js** using WebGL.
   - Dynamically tracks cursor coordinates (head turns to follow mouse) with restricted range of movement for realism.
   - Simulates idle breathing, V-taper muscular torso mesh (broad chest/waist), biceps, forearms, shoulder joints, and triggers occasional wave gestures.
   - Includes a high-fidelity glassmorphic CSS fallback card for mobile devices or browsers without WebGL.
2. **Interactive Distributed Systems Simulator**:
   - A live in-browser architectural simulator highlighting backend concepts.
   - Users can trigger client traffic bursts to a **Spring Cloud Gateway** distributing requests to active API nodes.
   - Includes **Fault Tolerance testing** (click nodes to crash them; the API Gateway routes around them).
   - Visualizes **Redis cache hits vs. misses** (Postgres DB query fallbacks).
   - Visualizes **Apache Kafka message queuing** with asynchronous background consumer workers.
3. **Interactive Project Architectures**:
   - Features project breakdowns for **IntelliShop** and **ScaleCart** with visual request nodes.
   - Users can click nodes in the system diagram (e.g. JWT Auth, ORM, Redis LRU, Master-Replica PG) to view technical trade-offs.
4. **System Specifications Sheet**:
   - A clean specifications panel detailing your core runtime specifications (Java 21, Spring Boot 3, Redis Cache, PostgreSQL Primary-Replica, Apache Kafka).
5. **Confetti Message Form**:
   - Fully functional contact form with custom success alerts and canvas-confetti celebration triggers.
6. **Secure Email Transmissions**:
   - Integrates **Resend** via secure server-side API routing, preventing API key exposure to client-side bundles.

---

## 📁 Folder Structure

```text
Portfolio/
├── public/                 # Static assets (Favicons, images, fallbacks)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── send/
│   │   │       └── route.ts # Secure Resend Server-side API endpoint
│   │   ├── globals.css     # Tailwind CSS variables, glows, keyframes, scrollbar
│   │   ├── layout.tsx      # Root layout, Google Fonts, SEO Head configuration
│   │   └── page.tsx        # Main entrypoint stitching sections together
│   └── components/
│       ├── ui/             # Reusable UI Core elements
│       │   ├── Badge.tsx         # Modern status light badges
│       │   ├── GlassCard.tsx     # Reusable glassmorphic cards
│       │   └── SectionHeader.tsx # API REST route mimicking headers
│       └── sections/       # Feature section layouts
│           ├── Navbar.tsx               # Floating header with scroll tracker
│           ├── HeroSection.tsx          # Landing panel with metrics & 3D frame
│           ├── Avatar3D.tsx             # Three.js canvas & tracking logic
│           ├── AboutSection.tsx         # Bio details & static System Specs grid
│           ├── SkillsSection.tsx        # Interactive categorized tech matrix
│           ├── ProjectsSection.tsx      # Projects & interactive architectures
│           ├── SystemsSimulator.tsx     # Live load balancer, cache, Kafka sim
│           ├── ExperienceTimeline.tsx   # University internship & scholarships
│           ├── EngineeringDirection.tsx # Engineering manifesto write-ups
│           ├── ContactSection.tsx       # Message form with confetti triggers
│           └── Footer.tsx               # Footer with server health simulators
├── package.json            # Script triggers & npm packages
├── tsconfig.json           # TypeScript compilation presets
└── tailwind.config.ts      # (Or equivalent Tailwind v4 config in CSS)
```

---

## 🛠️ Tech Stack & Dependencies

- **Core**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Vanilla CSS variables
- **Animations**: Framer Motion, Canvas Confetti
- **3D Graphics**: Three.js
- **Communications**: Resend API SDK

---

## ⚙️ Environment Variables (Resend Integration)

For the contact form to deliver emails to your inbox:

### 1. Local Development
Create a `.env.local` file in the root directory:
```env
RESEND_API_KEY=re_your_api_key_here
```
> [!NOTE]
> If `RESEND_API_KEY` is not defined, the API route will automatically fall back to **Mock Mode**, printing email payloads directly in the local terminal console logs for testing offline.

### 2. Production Deployment
Set the `RESEND_API_KEY` variable in your Vercel or Netlify project dashboard settings under Environment Variables.

---

## 🚀 Getting Started (Local Development)

### 1. Prerequisites
Ensure you have **Node.js** (v18.0.0+ recommended) and **npm** installed.

### 2. Installation
Clone the repository and install all dependencies:
```bash
npm install
```

### 3. Running Locally
Launch the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build Check
Verify that the project compiles with no TypeScript or linting errors:
```bash
npm run build
```

---

## 📦 Deployment Guide

### Option 1: Deploy to Vercel (Recommended)
Vercel is the creator of Next.js and offers native optimization:
1. Push your code to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import this repository.
4. Set `RESEND_API_KEY` under Environment Variables.
5. Click **"Deploy"**.

### Option 2: Deploy to Netlify
1. Connect your repository to [Netlify](https://netlify.com).
2. Set build command to `npm run build`.
3. Set publish directory to `.next`.
4. Set `RESEND_API_KEY` in environment configurations.
5. Click **"Deploy Site"**.

---

## 🖼️ Profile Image Customization
If you wish to provide a physical profile image to override the 3D canvas on specific viewports:
1. Place your image file (e.g. `profile.jpg`) in the `public/` directory.
2. Update the `FallbackAvatar` component inside [src/components/sections/Avatar3D.tsx](file:///d:/Harsh_D_Pandya/Portfolio%20website/Portfolio/src/components/sections/Avatar3D.tsx) to embed the image using the Next.js `<Image />` component.
