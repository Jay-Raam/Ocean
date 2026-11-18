# 🌊 Ocean — Luxury Web Experience

> **Escape to Ocean — a sanctuary in North Bali.**  
> An ultra-high-performance, luxury hospitality web platform engineered with **React 19**, **Vite 8**, **Tailwind CSS v4**, **Motion**, **Lenis Smooth Scroll**, and **TypeScript**.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-13.1-black?logo=framer&logoColor=white)](https://motion.dev/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-orange)](https://lenis.darkroom.engineering/)
[![Oxlint](https://img.shields.io/badge/Oxlint-1.75-blue)](https://oxc.rs/)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Architecture & Design System](#-architecture--design-system)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Performance & Build Optimization](#-performance--build-optimization)
- [API Reference](#-api-reference)
- [Contributing & License](#-contributing--license)

---

## 🌴 Overview

**Ocean** is a modern, responsive web application for a premier luxury retreat in North Bali. Designed to evoke tranquil tropical luxury while maintaining strict technical performance, the platform delivers 60 FPS inertia-based smooth scrolling, responsive touch-optimized image carousels, interactive villa configuration, and reservation inquiry workflows.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             OCEAN CLIENT                                    │
│  React 19 + TypeScript + Motion (Animations) + Lenis (Inertia Scrolling)    │
│  Tailwind CSS v4 + Swiper 14 (Touch Galleries) + React Router 7             │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTP / JSON
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             OCEAN BACKEND                                   │
│  Node.js + Express.js API Gateway · Reservation Validation & Email Engine   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏛️ Architecture & Design System

### 1. Inertia-Based Kinetic Smooth Scrolling (Lenis)
Utilizes `@studio-freight/lenis` integrated directly into React's animation frame lifecycle to achieve buttery, synchronized momentum scrolling without breaking native accessibility or keyboard tab navigation.

### 2. Micro-Interactions & Scroll-Triggered Transitions (Motion)
All section reveals, navbar morphs, and parallax media overlays are orchestrated through hardware-accelerated CSS transforms and spring physics using `motion` (`framer-motion` v13).

### 3. Modern Utility Pipeline (Tailwind CSS v4 & Vite 8)
Built with the lightning-fast `@tailwindcss/vite` engine using modern CSS cascade layers (`@layer theme, base, components, utilities`) and JIT compilation.

---

## ✨ Key Features

- **Private Villa & Suite Showcase**: Interactive villa cards featuring bed configurations, private infinity pool specifications, square footage, panoramic view tags, and touch-enabled gallery sliders powered by **Swiper 14**.
- **Gourmet Dining & Culinary Explorer**: Menus, dining reservations, farm-to-table culinary philosophy spotlights, and private chef booking workflows.
- **Holistic Wellness & Spa Sanctuary**: Interactive spa service selector with treatment durations, organic botanical ingredient lists, and appointment requests.
- **Smart Reservation Inquiry Engine**: Multi-step booking form allowing guests to select check-in/check-out dates, guest counts, room tier preferences, and bespoke concierge add-ons.
- **Automated Compression Pipeline**: Custom Post-Build script (`scripts/compress-dist.mjs`) automatically generates pre-compressed **Gzip** and **Brotli** assets for zero-latency static CDN delivery.
- **Ultra-Fast Code Quality Verification**: Integrated with **Oxlint** for sub-millisecond Rust-based static linting alongside TypeScript strict type validation.

---

## 💻 Tech Stack

### Frontend (`frontend/`)

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 19 (`react`, `react-dom`) | Declarative component UI |
| **Language** | TypeScript (~6.0) | Strict static typing and prop interfaces |
| **Build Tool** | Vite 8 (`@vitejs/plugin-react`) | Sub-second HMR & optimized production bundling |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) | Next-generation zero-config CSS framework |
| **Animations** | Motion (`motion` v13) | Spring animations and scroll-linked gestures |
| **Smooth Scroll** | Lenis (`lenis` v1.3) | Hardware-accelerated viewport momentum |
| **Carousels** | Swiper 14 (`swiper`) | Touch & swipe multi-device slider engine |
| **Routing** | React Router 7 (`react-router-dom`) | Declarative SPA client-side routing |
| **Linter** | Oxlint (`oxlint` v1.75) | High-speed Rust linter |

### Backend (`backend/`)

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | Node.js (ESM) | Server runtime |
| **Server** | Express.js | REST API routing and inquiry handling |
| **Security** | CORS, Helmet, Rate Limiter | API protection against automated spam |
| **Notifications** | Nodemailer | Automated guest reservation confirmation emails |

---

## 📂 Project Directory Structure

```text
Ocean/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Reservation & contact handlers
│   │   ├── middleware/       # Rate limiting & request validation
│   │   ├── routes/           # REST endpoints (/api/v1/reservations, /api/v1/contact)
│   │   ├── services/         # Email delivery & notification templates
│   │   └── server.js         # Express server bootstrap
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/               # Favicons, manifests, static icons
│   ├── src/
│   │   ├── assets/           # High-resolution imagery & video assets
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── VillaCard.tsx
│   │   │   ├── ImageSlider.tsx
│   │   │   └── SmoothScroll.tsx
│   │   ├── pages/            # Primary application views
│   │   │   ├── Home.tsx
│   │   │   ├── Villas.tsx
│   │   │   ├── Dining.tsx
│   │   │   ├── Wellness.tsx
│   │   │   └── Reserve.tsx
│   │   ├── styles/           # Global styles and Tailwind imports
│   │   ├── App.tsx           # Route layout & providers
│   │   └── main.tsx          # React 19 root mount script
│   ├── scripts/
│   │   └── compress-dist.mjs # Static Brotli/Gzip asset compression script
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.0.0` or higher
- **npm** or **pnpm**

---

### 1. Clone the Repository

```bash
git clone https://github.com/Jay-Raam/Ocean.git
cd Ocean
```

---

### 2. Frontend Setup & Launch

```bash
cd frontend

# Install dependencies
npm install

# Start local Vite development server
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

### 3. Backend Setup & Launch

```bash
cd ../backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Start development API server
npm run dev
```

The backend server will run on **`http://localhost:4000`**.

---

### 4. Production Build & Static Compression

To generate the production-ready optimized build with automated Brotli & Gzip compression:

```bash
cd frontend
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## ⚙️ Environment Configuration

### Backend (`backend/.env`)

```env
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Email Notifications (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=reservations@oceanretreatbali.com
SMTP_PASS=your-secure-app-password
NOTIFICATION_RECEIVER=concierge@oceanretreatbali.com
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

---

## ⚡ Performance & Build Optimization

1. **Static Asset Compression**: The custom script `scripts/compress-dist.mjs` triggers after `vite build` to compress all `.js`, `.css`, `.html`, and `.svg` files into `.br` and `.gz` formats, reducing network transfer sizes by up to **75%**.
2. **GPU-Accelerated Compositing**: All animations use `transform: translate3d()` and `opacity` properties to prevent layout recalculations and browser reflows during scroll.
3. **Asset Lazy-Loading**: Off-screen villa gallery images and hero textures are loaded asynchronously using native `loading="lazy"` and Swiper virtual slide rendering.

---

## 📡 API Reference

### 1. Create Reservation Inquiry
- **Endpoint**: `POST /api/v1/reservations`
- **Body**:
  ```json
  {
    "guestName": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1 555-019-2834",
    "villaType": "Oceanfront Pool Villa",
    "checkInDate": "2026-11-15",
    "checkOutDate": "2026-11-22",
    "guests": 2,
    "specialRequests": "Airport transfer & anniversary flower setup"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "success": true,
    "inquiryId": "OCN-2026-8839",
    "message": "Reservation inquiry received. Our concierge will contact you within 12 hours."
  }
  ```

---

### 2. General Contact & Concierge Request
- **Endpoint**: `POST /api/v1/contact`
- **Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Private Helipad Transfer",
    "message": "Can you arrange helicopter transport from Ngurah Rai Airport?"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Message sent to guest services."
  }
  ```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

*Engineered with precision by [Jayasriraam S](https://github.com/Jay-Raam)*
