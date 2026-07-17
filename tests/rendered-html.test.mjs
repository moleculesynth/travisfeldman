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

test("server-renders the 1.2.1 restrained exhibition index", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Travis Feldman — Objects, Signals, Images, Language<\/title>/i);
  assert.doesNotMatch(html, /Homepage 0\.3\.5|Homepage 0\.3\.6|Homepage 1\.0\.1|Homepage 1\.0\.2|Homepage 1\.0\.3|Homepage 1\.2\.1/);
  assert.match(html, /Selected works, exhibitions, recordings, and writing/);
  assert.doesNotMatch(html, /2001—present/);
  assert.match(html, /100 Trees/);
  assert.match(html, /Selva[\s\S]*Oscura/);
  assert.match(html, /Micrographia/);
  assert.match(html, /Night Shift/);
  assert.match(html, /Metalworks (?:&amp;|&) Design/);
  assert.match(html, /2016–2023/);
  assert.match(html, /ShopBot CNC machine mounted on a heavy-duty welded frame/);
  assert.match(html, /Molecule Synth/);
  assert.match(html, /GANtoons/);
  assert.match(html, /MoviePosterGAN/);
  assert.match(html, /Consumerismos/);
  assert.match(html, /2001–2002/);
  assert.match(html, /PIJIN/);
  assert.match(html, /BPOW!!!/);
  assert.match(html, /Shrink Circuits Nomad Lab/);
  assert.match(html, /Playable prototypes/);
  assert.match(html, /Artworks Summer Youth Program/);
  assert.match(html, /Seattle · 2001/);
  assert.match(html, /Nerve Maps/);
  assert.match(html, /The Many Mansions/);
  assert.match(html, /Tarot TV/);
  assert.doesNotMatch(html, /A reader among machines|id="about"|>About</);
  assert.equal((html.match(/id="pijin"/g) ?? []).length, 1);
  assert.equal((html.match(/id="shrink-circuits"/g) ?? []).length, 1);
  assert.equal((html.match(/id="metalworks"/g) ?? []).length, 1);
  assert.equal((html.match(/id="artworks"/g) ?? []).length, 1);
  const chronologicalProjects = [
    "nerve-maps",
    "micrographia",
    "night-shift",
    "hundred-trees",
    "selva-oscura",
    "gantoons",
    "movieposter-gan",
    "metalworks",
    "shrink-circuits",
    "pijin",
    "bpow",
    "molecule-synth",
    "prototypes",
    "many-mansions",
    "consumerisms",
    "tarot-tv",
    "artworks",
  ];
  const chronologicalPositions = chronologicalProjects.map((id) => html.indexOf(`id="${id}"`));
  assert.ok(chronologicalPositions.every((position) => position >= 0));
  assert.deepEqual(chronologicalPositions, [...chronologicalPositions].sort((left, right) => left - right));
  assert.ok((html.match(/>\[\+\]</g) ?? []).length >= 12);
  assert.doesNotMatch(html, /more images|\[rearrange\]/i);
  assert.equal((html.match(/archive-image-button/g) ?? []).length, 0);
  assert.match(html, /loading="lazy"/);
  assert.match(html, /fetchpriority="high"/i);
  assert.match(html, /\/optimized\/full\/art\/micro-cicadas\.jpg/);
  assert.match(html, /\/optimized\/thumb\/art\/micro-cicadas\.jpg/);
  assert.doesNotMatch(html, /(?:src|srcset)="\/(?:art|artworks|images)\//);
  assert.match(html, /aria-controls="micrographia-more"/);
  assert.match(html, /id="micrographia-more"/);
  assert.match(html, /<h2>Design \/ image<\/h2>[\s\S]*Micrographia[\s\S]*Night Shift[\s\S]*100 Trees[\s\S]*Selva Oscura[\s\S]*Metalworks (?:&amp;|&) Design[\s\S]*GANtoons[\s\S]*MoviePosterGAN[\s\S]*Consumerismos[\s\S]*Tarot TV/);
  assert.match(html, /<h2>Instrument \/ system<\/h2>/);
  assert.match(html, /<h2>Instrument \/ system<\/h2>[\s\S]*Shrink Circuits[\s\S]*Molecule Synth[\s\S]*PIJIN[\s\S]*BPOW!!![\s\S]*Playable prototypes[\s\S]*Artworks/);
  assert.match(html, /<h2>Sound \/ signal<\/h2>/);
  assert.match(html, /<h2>Sound \/ signal<\/h2>[\s\S]*<h2>Writing \/ research<\/h2>/);
  assert.match(html, /Learning in makerspaces/);
  assert.match(html, /Makerspaces as social systems[\s\S]*2023[\s\S]*Learning in makerspaces[\s\S]*2022[\s\S]*Controversial Crabbe[\s\S]*2012[\s\S]*William Blake \/ The Four Zoas[\s\S]*2005[\s\S]*English Literature and Ancient Languages[\s\S]*2004[\s\S]*Sappho: Poems and Fragments[\s\S]*2002/);
  assert.match(html, /DISCO!! Extended Play circular Shrink Circuits board design/);
  assert.match(html, /many-mansions-album\.jpg/);
  assert.equal((html.match(/project-header-thumbnail/g) ?? []).length, 10);
  assert.match(html, /\/optimized\/thumb\/artworks\/view-of-the-walkway\.jpg/);
  assert.doesNotMatch(html, /consumerisms-stream|tarot-stream|gan-stream|bpow-stream|prototype-stream|sound-stream|many-mansions-cover|movieposter-hero/);
  assert.doesNotMatch(html, /<figcaption>Speakers|<figcaption>ShopBot frame|<figcaption>Rolling classroom system|<figcaption>Material studies|<figcaption>Wood \+ sound|<figcaption>Fur \+ steel/);
  assert.match(html, />Email<\/a>[\s\S]*Kickstarter[\s\S]*Github[\s\S]*Behance[\s\S]*Bandcamp/);
  assert.doesNotMatch(html, /portrait-workshop|Between materials/);
  assert.doesNotMatch(html, /<details>/);
  assert.doesNotMatch(html, /micro-more-|night-extra-|trees-extra-|selva-extra-|metal-extra-|tarot-archive-|bpow-archive-|prototype-extra-/);
  assert.match(html, /Nerve Maps[\s\S]*2025–present[\s\S]*The Many Mansions[\s\S]*2012–14/);
  assert.match(html, /Shrink Circuits[\s\S]*2013–18/);
  assert.doesNotMatch(html, />0[1-9] ·/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Codex is working/i);
  assert.doesNotMatch(html, />Selected work<\/p>/);
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
  const [packageJson, layout, page, styles, gitignore, ogImage, treeImage, selvaImage, ganImage, consumerImage, metalImage, archiveImage, manyMansionsImage, shrinkImage, prototypeImage, artworksImage] = await Promise.all([
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
    readFile(new URL("../public/optimized/full/artworks/view-of-the-walkway.jpg", import.meta.url)),
  ]);

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /"version": "1\.2\.1"/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview/);
  assert.match(page, /archive-lightbox/);
  assert.match(page, /aria-modal="true"/);
  assert.match(page, /ArrowLeft/);
  assert.match(page, /ArrowRight/);
  assert.match(page, /hashString\(`\$\{day\}\|\$\{archiveKey\}`\)/);
  assert.match(page, /className="archive-trees" shuffle=\{false\}/);
  assert.match(page, /className="project-control-row"/);
  assert.match(page, /target\.scrollIntoView/);
  assert.match(page, /\{expanded \? more : null\}/);
  assert.doesNotMatch(page, /project-rearrange-button|rearrangeSignal|summary=/);
  assert.ok(page.indexOf('className="expanded-view"') < page.indexOf("{preview}"));
  assert.doesNotMatch(page, /archive-toolbar|shuffleStep/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project/);
  assert.match(styles, /--mono:/);
  assert.match(styles, /--sans:/);
  assert.match(styles, /--accent: #00ff00/);
  assert.match(styles, /grid-template-columns: auto 72px/);
  assert.match(styles, /project-preview > \* \{ max-width: none; width: 100%; \}/);
  assert.match(styles, /gallery-project:nth-of-type\(4n \+ 1\)/);
  assert.match(styles, /height: 100svh;[\s\S]*overflow-y: auto;/);
  assert.match(styles, /content: "# "/);
  assert.doesNotMatch(styles, /content: "## "/);
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
  assert.ok(artworksImage.byteLength > 20_000);
});
