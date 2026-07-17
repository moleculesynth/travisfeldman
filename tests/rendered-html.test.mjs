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

test("server-renders the 1.0.1 Braun-inspired work index", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Travis Feldman — Objects, Signals, Images, Language<\/title>/i);
  assert.doesNotMatch(html, /Homepage 0\.3\.5|Homepage 0\.3\.6|Homepage 1\.0\.1/);
  assert.match(html, /Objects, images, signals, language/);
  assert.match(html, /100 Trees/);
  assert.match(html, /The One Tree and the Many Trees/);
  assert.match(html, /Sleeping Giant Park, CT/);
  assert.match(html, /Selva[\s\S]*Oscura/);
  assert.match(html, /Midway in the journey, slow exposure, digital night/);
  assert.match(html, /Micrographia/);
  assert.match(html, /Night Shift/);
  assert.match(html, /Metalworks (?:&amp;|&) Design/);
  assert.match(html, /2020–2021/);
  assert.match(html, /Experiments mixing handcraft, welding, textiles, woodwork and digital fabrication/);
  assert.match(html, /ShopBot CNC machine mounted on a heavy-duty welded frame/);
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
  assert.doesNotMatch(html, /A reader among machines|id="about"|>About</);
  assert.equal((html.match(/id="pijin"/g) ?? []).length, 1);
  assert.equal((html.match(/id="shrink-circuits"/g) ?? []).length, 1);
  assert.equal((html.match(/id="metalworks"/g) ?? []).length, 1);
  assert.ok((html.match(/\[\+\] more images/g) ?? []).length >= 11);
  assert.ok((html.match(/\[rearrange\]/g) ?? []).length >= 10);
  assert.ok((html.match(/archive-image-button/g) ?? []).length >= 100);
  assert.match(html, /aria-controls="micrographia-more"/);
  assert.match(html, /id="micrographia-more"/);
  assert.match(html, /<h2>Designs \+ images<\/h2>[\s\S]*Micrographia[\s\S]*Night Shift[\s\S]*100 Trees[\s\S]*Selva Oscura[\s\S]*Metalworks (?:&amp;|&) Design[\s\S]*GANtoons[\s\S]*MoviePosterGAN[\s\S]*Consumerisms[\s\S]*Tarot TV/);
  assert.match(html, /<h2>Sounds \+ signals<\/h2>/);
  assert.match(html, /<h2>Sounds \+ signals<\/h2>[\s\S]*<h2>Writing \+ research<\/h2>/);
  assert.match(html, /Learning in makerspaces/);
  assert.match(html, /Makerspaces as social systems[\s\S]*2023[\s\S]*Learning in makerspaces[\s\S]*2022[\s\S]*Controversial Crabbe[\s\S]*2012[\s\S]*William Blake \/ The Four Zoas[\s\S]*2005[\s\S]*English Literature and Ancient Languages[\s\S]*2004[\s\S]*Sappho: Poems and Fragments[\s\S]*2002/);
  assert.match(html, /Specimens, actors, contact, reversal, scale, dimension, portrait, strange council/);
  assert.match(html, /Vacant, empty, exposed, insomniac, undead/);
  assert.match(html, /A mess hall of myths and mass culture/);
  assert.match(html, /DISCO!! Extended Play circular Shrink Circuits board design/);
  assert.match(html, /many-mansions-album\.jpg/);
  assert.match(html, /consumerisms-stream[\s\S]*consumer-more-new-04\.jpg[\s\S]*consumerisms-cosmos\.jpg[\s\S]*consumerisms-ikarus\.jpg[\s\S]*consumerisms-sungod\.jpg/);
  assert.doesNotMatch(html, /<figcaption>Speakers|<figcaption>ShopBot frame|<figcaption>Rolling classroom system|<figcaption>Material studies|<figcaption>Wood \+ sound|<figcaption>Fur \+ steel/);
  assert.match(html, />Email<\/a>[\s\S]*Kickstarter[\s\S]*Github[\s\S]*Behance[\s\S]*Bandcamp/);
  assert.doesNotMatch(html, /portrait-workshop|Between materials/);
  assert.doesNotMatch(html, /<details>/);
  assert.ok((html.match(/micro-more-/g) ?? []).length >= 9);
  assert.ok((html.match(/micro-extra-/g) ?? []).length >= 7);
  assert.ok((html.match(/night-more-/g) ?? []).length >= 6);
  assert.ok((html.match(/night-extra-/g) ?? []).length >= 12);
  assert.ok((html.match(/trees-more-new-/g) ?? []).length >= 12);
  assert.ok((html.match(/trees-extra-/g) ?? []).length >= 24);
  assert.ok((html.match(/selva-more-new-/g) ?? []).length >= 8);
  assert.ok((html.match(/selva-extra-/g) ?? []).length >= 24);
  assert.ok((html.match(/metal-more-/g) ?? []).length >= 30);
  assert.ok((html.match(/metal-extra-/g) ?? []).length >= 13);
  assert.ok((html.match(/tarot-archive-/g) ?? []).length >= 18);
  assert.ok((html.match(/tarot-extra-/g) ?? []).length >= 5);
  assert.ok((html.match(/bpow-archive-/g) ?? []).length >= 12);
  assert.ok((html.match(/prototype-extra-/g) ?? []).length >= 4);
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
    "https://github.com/moleculesynth",
    "https://www.behance.net/molecule",
    "https://www.kickstarter.com/projects/travisfeldman/molecule-synth",
    "https://www.kickstarter.com/projects/travisfeldman/pijin-the-spelling-game-of-the-spoken-word",
    "https://www.kickstarter.com/projects/travisfeldman/bpow-battery-powered-orchestra-workshop",
    "https://moleculesynth.com",
    "https://nervemaps.bandcamp.com",
    "https://themanymansions.bandcamp.com/",
    "https://www.awesomefoundation.org/en/projects/30742-shrink-circuits-nomad-lab",
    "http://shrinkcircuits.org/",
    "https://ijamm.pubpub.org/pub/o9n1tv3t",
    "https://bmcr.brynmawr.edu/2004/2004.08.11/",
    "mailto:moleculesynth@gmail.com",
  ]) {
    assert.ok(html.includes(destination), `missing direct destination: ${destination}`);
  }
  assert.doesNotMatch(html, /linkedin\.com/i);
});

test("ships the restrained design system and deep archives without the source library", async () => {
  const [packageJson, layout, page, styles, gitignore, ogImage, treeImage, selvaImage, ganImage, consumerImage, metalImage, archiveImage, manyMansionsImage, shrinkImage, prototypeImage] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../.gitignore", import.meta.url), "utf8"),
    readFile(new URL("../public/og-visual.png", import.meta.url)),
    readFile(new URL("../public/art/trees-35.jpg", import.meta.url)),
    readFile(new URL("../public/art/selva-moon-trees.jpg", import.meta.url)),
    readFile(new URL("../public/art/gantoons-movie-posters.jpg", import.meta.url)),
    readFile(new URL("../public/art/consumerisms-view-1.jpg", import.meta.url)),
    readFile(new URL("../public/art/metal-shopbot.jpg", import.meta.url)),
    readFile(new URL("../public/art/metal-more-30.jpg", import.meta.url)),
    readFile(new URL("../public/art/many-mansions-album.jpg", import.meta.url)),
    readFile(new URL("../public/art/shrink-workshop.jpg", import.meta.url)),
    readFile(new URL("../public/art/prototype-extra-04.jpg", import.meta.url)),
  ]);

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview/);
  assert.match(page, /archive-lightbox/);
  assert.match(page, /aria-modal="true"/);
  assert.match(page, /ArrowLeft/);
  assert.match(page, /ArrowRight/);
  assert.match(page, /hashString\(`\$\{day\}\|\$\{archiveKey\}`\)/);
  assert.match(page, /className="archive-trees" shuffle=\{false\}/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project/);
  assert.match(styles, /--mono:/);
  assert.match(styles, /--accent: #e6532f/);
  assert.doesNotMatch(styles, /\.version::before|\.about-panel|\.metalworks-stream figcaption/);
  assert.doesNotMatch(styles, /--serif:|--acid:|--blue:|--violet:/);
  assert.match(gitignore, /\/source-assets\//);
  assert.ok(ogImage.byteLength > 100_000);
  assert.ok(treeImage.byteLength > 100_000);
  assert.ok(selvaImage.byteLength > 100_000);
  assert.ok(ganImage.byteLength > 10_000);
  assert.ok(consumerImage.byteLength > 100_000);
  assert.ok(metalImage.byteLength > 100_000);
  assert.ok(archiveImage.byteLength > 50_000);
  assert.ok(manyMansionsImage.byteLength > 50_000);
  assert.ok(shrinkImage.byteLength > 50_000);
  assert.ok(prototypeImage.byteLength > 50_000);
});
