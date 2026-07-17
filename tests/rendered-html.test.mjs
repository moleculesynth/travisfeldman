import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the 0.3.3 chronological split work index", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Travis Feldman — Objects, Signals, Images, Language<\/title>/i);
  assert.match(html, /Homepage 0\.3\.3/);
  assert.match(html, /Objects, images, signals, language/);
  assert.match(html, /100 Trees/);
  assert.match(html, /Hegelian meditation on the one and the many/);
  assert.match(html, /Sleeping Giant State Park/);
  assert.match(html, /Selva[\s\S]*Oscura/);
  assert.match(html, /Dantean exploration of slow exposure and digital night/);
  assert.match(html, /Micrographia/);
  assert.match(html, /Night Shift/);
  assert.match(html, /Metalworks (?:&amp;|&) Design/);
  assert.match(html, /2020–2021/);
  assert.match(html, /Speakers, furniture, and classroom infrastructure/);
  assert.match(html, /ShopBot frame/);
  assert.match(html, /Rolling classroom system/);
  assert.match(html, /Fur \+ steel/);
  assert.match(html, /Molecule Synth/);
  assert.match(html, /GANtoons/);
  assert.match(html, /MoviePosterGAN/);
  assert.match(html, /Consumerisms/);
  assert.match(html, /2001–2002/);
  assert.match(html, /PIJIN/);
  assert.match(html, /BPOW!!!/);
  assert.match(html, /Shrink Circuits Nomad Lab/);
  assert.match(html, /Playable prototypes/);
  assert.match(html, /Nerve Maps/);
  assert.match(html, /The Many Mansions/);
  assert.match(html, /Tarot TV/);
  assert.match(html, /A reader among machines/);
  assert.equal((html.match(/id="pijin"/g) ?? []).length, 1);
  assert.equal((html.match(/id="shrink-circuits"/g) ?? []).length, 1);
  assert.equal((html.match(/id="metalworks"/g) ?? []).length, 1);
  assert.ok((html.match(/More images \+/g) ?? []).length >= 11);
  assert.match(html, /aria-controls="micrographia-more"/);
  assert.match(html, /id="micrographia-more"/);
  assert.match(html, /<h2>Designs \+ images<\/h2>[\s\S]*Micrographia[\s\S]*Night Shift[\s\S]*100 Trees[\s\S]*Selva Oscura[\s\S]*Metalworks (?:&amp;|&) Design[\s\S]*GANtoons[\s\S]*MoviePosterGAN[\s\S]*Consumerisms[\s\S]*Tarot TV/);
  assert.match(html, /<h2>Sounds \+ signals<\/h2>/);
  assert.match(html, /Nerve Maps[\s\S]*2025–present[\s\S]*The Many Mansions[\s\S]*2012–14/);
  assert.match(html, /Shrink Circuits[\s\S]*2013–18/);
  assert.doesNotMatch(html, />0[1-9] ·/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Codex is working/i);
});

test("keeps video, Kickstarter, audio, writing, and project links direct", async () => {
  const response = await render();
  const html = await response.text();

  for (const destination of [
    "https://youtu.be/BNb0xTEe69I",
    "https://youtu.be/Ct37TbZJlrk",
    "https://youtu.be/lmEL5HyCGRE",
    "https://www.kickstarter.com/profile/travisfeldman",
    "https://www.kickstarter.com/projects/travisfeldman/molecule-synth",
    "https://www.kickstarter.com/projects/travisfeldman/pijin-the-spelling-game-of-the-spoken-word",
    "https://www.kickstarter.com/projects/travisfeldman/bpow-battery-powered-orchestra-workshop",
    "https://moleculesynth.com",
    "https://nervemaps.bandcamp.com",
    "https://themanymansions.bandcamp.com/",
    "https://www.awesomefoundation.org/en/projects/30742-shrink-circuits-nomad-lab",
    "https://ijamm.pubpub.org/pub/o9n1tv3t",
    "mailto:moleculesynth@gmail.com",
  ]) {
    assert.ok(html.includes(destination), `missing direct destination: ${destination}`);
  }
  assert.doesNotMatch(html, /linkedin\.com/i);
});

test("ships expanded gallery imagery while excluding the source library", async () => {
  const [packageJson, layout, page, gitignore, ogImage, treeImage, selvaImage, ganImage, consumerImage, metalImage, portraitImage] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../.gitignore", import.meta.url), "utf8"),
    readFile(new URL("../public/og-visual.png", import.meta.url)),
    readFile(new URL("../public/art/trees-35.jpg", import.meta.url)),
    readFile(new URL("../public/art/selva-moon-trees.jpg", import.meta.url)),
    readFile(new URL("../public/art/gantoons-movie-posters.jpg", import.meta.url)),
    readFile(new URL("../public/art/consumerisms-view-1.jpg", import.meta.url)),
    readFile(new URL("../public/art/metal-shopbot.jpg", import.meta.url)),
    readFile(new URL("../public/art/portrait-workshop.jpg", import.meta.url)),
  ]);

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project/);
  assert.match(gitignore, /\/source-assets\//);
  assert.ok(ogImage.byteLength > 100_000);
  assert.ok(treeImage.byteLength > 100_000);
  assert.ok(selvaImage.byteLength > 100_000);
  assert.ok(ganImage.byteLength > 10_000);
  assert.ok(consumerImage.byteLength > 100_000);
  assert.ok(metalImage.byteLength > 100_000);
  assert.ok(portraitImage.byteLength > 100_000);
});
