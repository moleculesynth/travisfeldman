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

test("server-renders the finished Travis Feldman portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Travis Feldman — Scholar, Maker, Composer &amp; Educator<\/title>/i,
  );
  assert.match(html, /I build things that invite people in\./);
  assert.match(html, /Molecule Synth/);
  assert.match(html, /Choate i\.d\.Lab/);
  assert.match(html, /Nerve Maps/);
  assert.match(html, /Controversial Crabbe/);
  assert.match(html, /The Four Zoas/);
  assert.match(html, /og:image/);
  assert.match(html, /https:\/\/travisfeldman\.org\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Codex is working/i);
});

test("keeps important destinations direct and independent of LinkedIn", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /https:\/\/moleculesynth\.com/);
  assert.match(html, /https:\/\/nervemaps\.bandcamp\.com/);
  assert.match(html, /https:\/\/www\.behance\.net\/molecule/);
  assert.match(html, /https:\/\/ijamm\.pubpub\.org\/pub\/o9n1tv3t/);
  assert.match(html, /https:\/\/bmcr\.brynmawr\.edu\/2002\/2002\.09\.37/);
  assert.match(html, /mailto:moleculesynth@gmail\.com/);
  assert.doesNotMatch(html, /linkedin\.com/i);
});

test("ships the custom share card and removes starter dependencies", async () => {
  const [packageJson, layout, page, ogImage] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/og.png", import.meta.url)),
  ]);

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project/);
  assert.ok(ogImage.byteLength > 100_000);
});
