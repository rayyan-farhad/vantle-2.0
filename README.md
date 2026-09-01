# Vantle 2.0

Vantle 2.0 is a separate, interactive marketing site for Vantle's supermarket operational-intelligence platform. It uses an original operational-editorial design system inspired by the contrast, technical rhythm, and data-led storytelling of meuze.ai.

The current Vantle website is not modified by this project.

## Highlights

- Interactive demand, stock, and waste decision queue
- Live forecast and governed approval demonstrations
- Native pilot-request dialog with honest local-only submission behavior
- Responsive desktop and mobile layouts
- Keyboard-accessible tab controls and reduced-motion support
- Metadata, Open Graph, robots, sitemap, and WebSite structured data

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm test
npm run lint
npm run build
npm audit --omit=dev
```

The visual tokens, interaction principles, and copy rules are documented in [DESIGN.md](./DESIGN.md).
