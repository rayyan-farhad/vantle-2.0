import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("preserves the supplied decision queue content", async () => {
  const source = await read("components/VantleExperience.jsx");

  for (const phrase of [
    "Demand shift",
    "Stock risk",
    "Waste risk",
    "metric: \"+18%\"",
    "label: \"expected dairy demand\"",
    "Manager review required",
  ]) {
    assert.match(source, new RegExp(phrase.replace(/[+]/g, "\\+")));
  }
});

test("the decision queue exposes keyboard-friendly tab semantics", async () => {
  const source = await read("components/VantleExperience.jsx");

  assert.match(source, /role="tablist"/);
  assert.match(source, /role="tab"/);
  assert.match(source, /aria-selected=/);
  assert.match(source, /role="tabpanel"/);
  assert.match(source, /onKeyDown=/);
});

test("motion and focus behavior include accessibility fallbacks", async () => {
  const css = await read("app/globals.css");

  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /min-height:\s*44px/);
  assert.doesNotMatch(css, /transition:\s*all\b/);
});

test("metadata, robots, and sitemap are present", async () => {
  const [layout, robots, sitemap] = await Promise.all([
    read("app/layout.js"),
    read("app/robots.js"),
    read("app/sitemap.js"),
  ]);

  assert.match(layout, /metadataBase/);
  assert.match(layout, /alternates/);
  assert.match(layout, /openGraph/);
  assert.match(layout, /twitter/);
  assert.match(robots, /sitemap/);
  assert.match(sitemap, /vantle-2-0\.vercel\.app/);
});

test("avoids common visual and copy shortcuts", async () => {
  const [css, source] = await Promise.all([
    read("app/globals.css"),
    read("components/VantleExperience.jsx"),
  ]);

  assert.doesNotMatch(css, /#(?:000|fff)(?:\b|;)/i);
  assert.doesNotMatch(css, /\bh-screen\b/);
  assert.doesNotMatch(source, /\b(?:elevate|unleash|seamless|next-gen)\b/i);
  assert.doesNotMatch(source, /John Doe|Acme|Nexus/i);
});
