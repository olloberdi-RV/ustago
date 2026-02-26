# UstaGo — National Digital Construction & Escrow Ecosystem

UstaGo is a comprehensive Super-App and B2B platform that digitizes the construction and repair industry, eliminating the shadow economy. The ecosystem ensures financial safety through an escrow system ("UstaGo Pay"), automates material logistics, and enforces strict quality control.

## Features

The application supports **5 distinct roles** working within a single synchronized ecosystem:

| Role | Uzbek Name | Responsibility |
|------|-----------|----------------|
| **Client** | Buyurtmachi | Funds the project and approves steps |
| **Prorab** | Prorab | Creates estimates, manages the site, controls quality |
| **Usta / Intern** | Usta / Stajyor | Executes tasks, requests advances, logs time |
| **Supplier** | Magazin | Receives automated material orders and dispatches them |
| **Driver** | Haydovchi | Delivers materials, receives automated transit pay via PIN |

### Key Capabilities

- 🔒 **UstaGo Pay (Escrow)** — Funds are frozen in escrow and released only upon approval
- 📋 **Aqlli Smeta** — Smart estimate builder with material QC (accept/return defective items)
- ⏱ **Work Timer** — Force-majeure-aware session timer for Usta
- 💰 **Kafolat Fondi** — 5% guarantee fund held for 1 month, auto-released on 85+ rating
- 📦 **Automated Order Queue** — Prorab's estimate auto-generates orders for Magazin
- 📍 **PIN Delivery Verification** — Driver receives payment only after Prorab confirms delivery with PIN

## Tech Stack

- **Framework:** React 19 (functional components, hooks)
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS v4
- **Icons:** lucide-react
- **Paradigm:** SPA with state-based view switching (no router dependency)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) and select a role to enter the corresponding dashboard.

## Project Structure

```
src/
├── data/
│   └── mockData.js           # Comprehensive mock JSON for the full project lifecycle
├── components/
│   ├── RoleSelectPage.jsx    # Landing page — pick one of 5 roles
│   ├── ClientDashboard.jsx   # Escrow wallet, timeline, approval modals
│   ├── ProrabDashboard.jsx   # Smart estimate, QC, rating slider
│   ├── UstaDashboard.jsx     # Work timer, kafolat fondi, advance request
│   ├── MagazinDashboard.jsx  # Order queue, dispatch, driver list
│   └── HaydovchiDashboard.jsx # Delivery card, PIN verification, payment
├── App.jsx                   # Global role state, view switcher
├── main.jsx
└── index.css                 # Tailwind CSS v4 entry
```

