# Vantle 2.0 Design System

## 1. Design direction

Vantle 2.0 uses an **operational editorial** aesthetic: the confidence of a live control room, the clarity of an audited report, and the restraint of a premium intelligence product. Meuze.ai is a directional reference for scale, contrast, technical rhythm, and image treatment; the layouts, component language, copy, and interactions are original to Vantle.

The interface should feel decisive rather than futuristic. Graphite workspaces hold live operational data, warm paper surfaces make dense information readable, and cobalt appears only when the system is signalling an active state or a useful action.

- Density: 8/10 — information-rich, but organized into deliberate panels.
- Energy: 6/10 — strong contrast and asymmetry without visual noise.
- Playfulness: 4/10 — tactile interactions and motion, never novelty UI.

## 2. Principles

1. **Signal before spectacle.** Every visual treatment must clarify what changed, why it matters, or what happens next.
2. **Human authority stays visible.** Recommendations and approval states must never imply silent automation.
3. **Contrast carries hierarchy.** Use scale, spacing, rules, and surface shifts before adding color.
4. **One accent, one meaning.** Cobalt means live, selected, or actionable. It is not decoration.
5. **Motion confirms state.** Animation should communicate selection, continuity, or progress and must respect reduced-motion preferences.

## 3. Typography

The product uses Geist for display and body copy and Geist Mono for operational labels, quantities, statuses, and controls.

- Display XL: `clamp(3.8rem, 9vw, 8.8rem)`, 0.84–0.9 line height, tight tracking.
- Display L: `clamp(2.5rem, 5.7vw, 6.4rem)`, 0.9 line height.
- Heading: `clamp(1.75rem, 3vw, 3rem)`, 1.0 line height.
- Body L: 1.125–1.35rem, 1.5 line height.
- Body: 0.95–1rem, 1.55 line height.
- Label: 0.68–0.76rem, uppercase, 0.12–0.18em tracking, monospace.

Keep hero statements short enough to remain legible at large scale. Paragraphs should stay below 66 characters per line.

## 4. Color system

All values use OKLCH so contrast and chroma can be adjusted predictably.

- `--ink`: `oklch(0.17 0.01 260)` — primary dark surface and text.
- `--ink-soft`: `oklch(0.25 0.012 260)` — secondary dark surface.
- `--paper`: `oklch(0.97 0.012 86)` — primary light surface.
- `--paper-deep`: `oklch(0.92 0.018 86)` — recessed light surface.
- `--muted`: `oklch(0.62 0.015 255)` — dark-surface secondary copy.
- `--muted-ink`: `oklch(0.46 0.016 255)` — light-surface secondary copy.
- `--rule-dark`: `oklch(0.34 0.012 260)` — borders on dark surfaces.
- `--rule-light`: `oklch(0.77 0.018 86)` — borders on light surfaces.
- `--signal`: `oklch(0.57 0.22 258)` — active/actionable cobalt.
- `--positive`: `oklch(0.69 0.16 151)` — healthy/live status only.

No decorative gradients. A subtle image scrim or halftone mask is allowed when it improves foreground readability.

## 5. Spacing and layout

Use a 4px base unit with a 12-column desktop grid. Content width is capped near 1440px, while hero imagery and section rules may bleed to the viewport.

- XS: 4px
- S: 8px
- M: 16px
- L: 24px
- XL: 40px
- 2XL: 64px
- 3XL: 96px

Desktop sections use asymmetrical 4/8 or 5/7 splits. On small screens, all critical content becomes a single reading order without horizontal scrolling. The signature layout is the **Decision Queue**: a dark vertical risk selector paired with a warm-paper operational preview.

## 6. Components

- **Signal button:** squared or subtly rounded, 44px minimum target, cobalt only for primary actions.
- **Technical label:** monospace uppercase eyebrow with generous tracking.
- **Decision tab:** numbered, descriptive, keyboard-selectable, and connected to a visible panel.
- **Operational card:** bordered information surface with one dominant metric and a restrained status.
- **Live board:** dark telemetry surface for branches, signals, and timestamped state.
- **Approval workspace:** visibly separates recommendation, reason, control, and human decision.
- **Pilot dialog:** native dialog semantics, clear close action, honest local-only demo confirmation.

## 7. Motion

The motion vocabulary is **resolve, scan, and handoff**.

- Hover/press feedback: 140–180ms.
- State transitions: 260–420ms.
- Section reveals: 480–700ms, short travel distance, opacity plus transform only.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` for entrances; `cubic-bezier(0.4, 0, 0.2, 1)` for state changes.
- Stagger: 40–70ms between related items.

Never animate layout-critical dimensions when transform or opacity can communicate the same change. Under `prefers-reduced-motion: reduce`, remove travel, looping effects, and smooth scrolling while keeping state changes immediate and understandable.

## 8. Accessibility

- Meet WCAG AA contrast for text and controls.
- Keep all interactive targets at least 44 × 44px.
- Preserve logical heading order and a visible skip link.
- Use native buttons, links, forms, and dialogs.
- Expose selected tab state with `aria-selected` and connect tabs to their panels.
- Never encode operational state by color alone.
- Supply useful image alternatives; decorative video and texture remain hidden from assistive technology.

## 9. Voice and copy

Vantle sounds observant, operational, and accountable. Prefer concrete nouns and verbs: “Rain arrives,” “Dairy demand rises,” “Manager review required.” Avoid vague innovation language, exaggerated AI claims, and fabricated social proof.

- Lead with the operational outcome.
- Keep labels short and specific.
- Explain why a recommendation exists.
- Reinforce that managers retain control.
- Never imply a form submission reached an external team when it did not.

## 10. Governance

Any new component must reuse these tokens and explain its operational purpose. New accent colors, typefaces, decorative effects, or animation patterns require an explicit update to this document.

Last updated: 2026-09-02.
