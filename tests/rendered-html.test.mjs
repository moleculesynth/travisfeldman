import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the image-first Travis Feldman portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Travis Feldman — Objects, Signals, Images, Language<\/title>/i,
  );
  assert.match(html, /Artist · designer · musician · educator/);
  assert.match(html, /Objects/);
  assert.match(html, /signals/);
  assert.match(html, /images/);
  assert.match(html, /language/);
  assert.match(html, /Molecule[\s\S]*Synth/);
  assert.match(html, /100[\s\S]*Trees/);
  assert.match(html, /Hegelian meditation on the one and the many/);
  assert.match(html, /Sleeping Giant State Park/);
  assert.match(html, /Selva[\s\S]*Oscura/);
  assert.match(html, /Dantean exploration of slow exposure and digital night/);
  assert.match(html, /Micro\/[\s\S]*graphia/);
  assert.match(html, /Night Shift/);
  assert.match(html, /Nerve[\s\S]*Maps/);
  assert.match(html, /BPOW!!!/);
  assert.match(html, /Tarot TV/);
  assert.match(html, /Things that[\s\S]*want to move/);
  assert.match(html, /PIJIN/);
  assert.match(html, /A reader among machines/);
  assert.match(html, /Let&#x27;s make contact/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Codex is working/i);
});

test("keeps Kickstarter, audio, writing, and project destinations direct", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /https:\/\/www\.kickstarter\.com\/profile\/travisfeldman/);
  assert.match(html, /https:\/\/www\.kickstarter\.com\/projects\/travisfeldman\/molecule-synth/);
  assert.match(html, /https:\/\/www\.kickstarter\.com\/projects\/travisfeldman\/pijin-the-spelling-game-of-the-spoken-word/);
  assert.match(html, /https:\/\/www\.kickstarter\.com\/projects\/travisfeldman\/bpow-battery-powered-orchestra-workshop/);
  assert.match(html, /https:\/\/moleculesynth\.com/);
  assert.match(html, /https:\/\/nervemaps\.bandcamp\.com/);
  assert.match(html, /https:\/\/themanymansions\.bandcamp\.com/);
  assert.match(html, /https:\/\/www\.awesomefoundation\.org\/en\/projects\/30742-shrink-circuits-nomad-lab/);
  assert.match(html, /https:\/\/ijamm\.pubpub\.org\/pub\/o9n1tv3t/);
  assert.match(html, /mailto:moleculesynth@gmail\.com/);
  assert.doesNotMatch(html, /linkedin\.com/i);
});

test("ships recent-project images, the custom share card, and no source library", async () => {
  const [packageJson, layout, page, gitignore, ogImage, treeImage, selvaImage] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../.gitignore", import.meta.url), "utf8"),
    readFile(new URL("../public/og-visual.png", import.meta.url)),
    readFile(new URL("../public/art/trees-35.jpg", import.meta.url)),
    readFile(new URL("../public/art/selva-moon-trees.jpg", import.meta.url)),
  ]);

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project/);
  assert.match(gitignore, /\/source-assets\//);
  assert.ok(ogImage.byteLength > 100_000);
  assert.ok(treeImage.byteLength > 100_000);
  assert.ok(selvaImage.byteLength > 100_000);
});
