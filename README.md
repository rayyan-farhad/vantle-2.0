# Vantle

**An AI operational layer for supermarkets.**

Vantle is being built to connect the sales, inventory, ERP, and supplier systems a supermarket already uses. It turns changing demand, stock, and waste signals into explainable recommendations while keeping consequential decisions under manager control.

[View the live prototype](https://vantle.vercel.app/) · [Read the design system](./DESIGN.md)

![Vantle operational-intelligence homepage](./public/vantle-hero-signal-poster.jpg)

## Why Vantle exists

Supermarkets generate operational data every day, but procurement and inventory decisions are often fragmented and reactive. Vantle explores a clearer operating model:

1. detect a meaningful signal;
2. compare it with store context and current inventory;
3. forecast the likely impact;
4. prepare a recommended action;
5. route financial or consequential actions for human approval.

## What this prototype demonstrates

- An interactive decision queue for demand, stock, and waste risk
- Forecast scenarios driven by weather, public holidays, and sales patterns
- Explained recommendations with impact and approval state
- A manager workspace for reviewing, approving, or adjusting actions
- A no-forced-migration integration story for POS, inventory, ERP, and supplier data
- Enterprise principles for data isolation, role-based visibility, controlled actions, and auditability
- Responsive layouts, keyboard-accessible controls, and reduced-motion support

## Product principles

| Principle | Implementation |
| --- | --- |
| Signal before spectacle | Visuals explain what changed, why it matters, and what happens next. |
| Human authority | Financial and consequential actions remain reviewable. |
| Explainable recommendations | Each action exposes its reason, expected impact, and control state. |
| Existing-system compatibility | Vantle is designed as a layer over current operational infrastructure. |
| Honest product claims | The site is explicit about its pilot stage and avoids invented proof. |

## Technology

- Next.js 16
- React 19
- Lucide React
- Node.js 22
- Native Node test runner
- Vercel deployment

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm test
npm run lint
npm run build
npm audit --omit=dev
```

## Design and accessibility

The interface uses an original operational-editorial design system: graphite control surfaces, warm paper-like reading areas, and cobalt reserved for active or actionable states. Component rules, motion, accessibility, and copy principles are documented in [DESIGN.md](./DESIGN.md).

## Current status

This repository contains a pilot-stage marketing prototype, not a production supermarket operating system. The interactive recommendations use representative scenarios, and the pilot form demonstrates the experience without transmitting a real request.

---

Built by **Rayyan Farhad** as the product and interface direction for Vantle.
