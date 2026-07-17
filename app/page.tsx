"use client";

import { useState } from "react";

const Arrow = () => <span aria-hidden="true">↗</span>;

const ExternalLink = ({ href, children, className = "external-link" }: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a className={className} href={href} target="_blank" rel="noreferrer">
    {children} <Arrow />
  </a>
);

const IndexLink = ({ href, children, year }: {
  href: string;
  children: React.ReactNode;
  year?: string;
}) => (
  <a href={href}>
    <span>{children}</span>
    {year ? <time>{year}</time> : null}
  </a>
);

const ArchiveGrid = ({ images, className = "" }: {
  images: ReadonlyArray<{ src: string; alt: string; className?: string }>;
  className?: string;
}) => (
  <div className={`archive-grid ${className}`.trim()}>
    {images.map(({ src, alt, className: imageClass }, index) => (
      <figure className={imageClass} key={`${src}-${index}`}>
        <img src={src} alt={alt} />
      </figure>
    ))}
  </div>
);

const numberedArchive = (prefix: string, count: number, description: string) =>
  Array.from({ length: count }, (_, index) => ({
    src: `/art/${prefix}-${String(index + 1).padStart(2, "0")}.jpg`,
    alt: `${description} ${index + 1}`,
  }));

const ProjectHeader = ({ title, year, children, links, expanded, onToggle, controlsId }: {
  title: React.ReactNode;
  year?: string;
  children: React.ReactNode;
  links?: React.ReactNode;
  expanded?: boolean;
  onToggle?: () => void;
  controlsId?: string;
}) => (
  <header className="project-header">
    <div className="project-title-row">
      {onToggle ? (
        <button
          aria-controls={controlsId}
          aria-expanded={expanded}
          className="project-title-button"
          onClick={onToggle}
          type="button"
        >
          <h2>{title}</h2>
          <span>{expanded ? "[−] close" : "[+] more images"}</span>
        </button>
      ) : <h2>{title}</h2>}
      {year ? <time>{year}</time> : null}
    </div>
    <div className="project-summary">
      <p>{children}</p>
      {links ? <div className="project-links">{links}</div> : null}
    </div>
  </header>
);

const ExpandableProject = ({ id, className, title, year, summary, links, preview, more }: {
  id: string;
  className: string;
  title: React.ReactNode;
  year?: string;
  summary: React.ReactNode;
  links?: React.ReactNode;
  preview: React.ReactNode;
  more?: React.ReactNode;
}) => {
  const [expanded, setExpanded] = useState(false);
  const controlsId = `${id}-more`;

  return (
    <section className={`gallery-project ${className}`} id={id}>
      <ProjectHeader
        title={title}
        year={year}
        links={links}
        expanded={expanded}
        onToggle={more ? () => setExpanded((value) => !value) : undefined}
        controlsId={more ? controlsId : undefined}
      >
        {summary}
      </ProjectHeader>
      {preview}
      {more ? (
        <div className="expanded-view" hidden={!expanded} id={controlsId}>
          {more}
        </div>
      ) : null}
    </section>
  );
};

const tarotFrames = [
  ["/art/tarot-conversation.jpg", "A pale blue video still of a skeletal figure"],
  ["/art/tarot-ear.jpg", "An abstract, close-cropped video image of an ear"],
  ["/art/tarot-talker.jpg", "An orange, solarized video portrait"],
  ["/art/tarot-attic.jpg", "A dim, distorted view into an attic"],
  ["/art/tarot-hope.jpg", "A luminous green figure seen through video noise"],
  ["/art/tarot-ceiling.jpg", "An arched ceiling blurred by video motion"],
] as const;

const microArchive = [
  ...numberedArchive("micro-more", 9, "Micrographia study"),
  ...numberedArchive("micro-extra", 7, "Additional Micrographia study"),
];
const nightArchive = [
  ...numberedArchive("night-more", 6, "Night Shift photograph"),
  ...numberedArchive("night-extra", 12, "Additional Night Shift photograph"),
];
const treeArchive = [
  ...[13, 19, 25, 43, 58, 82].map((number) => ({ src: `/art/trees-${number}.jpg`, alt: `100 Trees sequence, position ${number}` })),
  ...numberedArchive("trees-more-new", 12, "Additional 100 Trees photograph"),
  ...numberedArchive("trees-extra", 24, "Additional 100 Trees photograph"),
];
const selvaArchive = [
  ...[2184, 2317, 2398, 2700].map((number) => ({ src: `/art/selva-${number}.jpg`, alt: `Selva Oscura night study ${number}` })),
  ...numberedArchive("selva-more-new", 8, "Additional Selva Oscura photograph"),
  ...numberedArchive("selva-extra", 24, "Additional Selva Oscura photograph"),
];
const metalArchive = [
  ...numberedArchive("metal-more", 30, "Metalworks and Design study"),
  ...numberedArchive("metal-extra", 13, "Additional Metalworks and Design study"),
];
const tarotArchive = [
  ...numberedArchive("tarot-archive", 18, "Tarot TV still"),
  ...numberedArchive("tarot-extra", 5, "Additional Tarot TV still"),
];
const bpowArchive = numberedArchive("bpow-archive", 12, "BPOW workshop and performance photograph");
const consumerArchive = [
  { src: "/art/consumer-more-new-04.jpg", alt: "Quad-eyed Uranus painting" },
  { src: "/art/consumerisms-sungod.jpg", alt: "Four-eyed figure painted in muted earth tones" },
  { src: "/art/consumerisms-cosmos.jpg", alt: "New Cosmos painting" },
  { src: "/art/consumerisms-ikarus.jpg", alt: "Ikarus painting" },
  { src: "/art/consumer-more-new-03.jpg", alt: "Dark garden painting" },
  { src: "/art/consumer-more-new-05.jpg", alt: "Dark celestial landscape painting" },
  { src: "/art/consumerisms-garden.jpg", alt: "Garden work" },
  { src: "/art/consumer-more-new-01.jpg", alt: "Consumerisms sculpture view" },
  { src: "/art/consumer-more-new-02.jpg", alt: "Consumerisms sculpture study" },
  { src: "/art/consumerisms-view-5.jpg", alt: "Consumerisms installation view" },
  { src: "/art/consumerisms-view-6.jpg", alt: "Consumerisms sculpture view" },
  { src: "/art/consumerisms-view-1.jpg", alt: "Detail of a Consumerisms figure" },
];
const gantoonsArchive = [
  ...[1, 2, 3].map((number) => ({ src: `/art/gantoons-still-${number}.jpg`, alt: `GANtoons loop still ${number}` })),
  ...[1, 2, 3].map((number) => ({ src: `/art/gantoons-cover-still-${number}.jpg`, alt: `Comic Book Covers GAN still ${number}` })),
  { src: "/art/gantoons-loop-title.jpg", alt: "GANtoons generated image sequence" },
  { src: "/art/gantoons-cover-title.jpg", alt: "Comic Book Covers generated image sequence" },
  { src: "/art/gantoons-comic-covers.jpg", alt: "Detail from the comic cover GAN", className: "archive-crop crop-center" },
];
const moviePosterArchive = [
  ...[1, 2, 3].map((number) => ({ src: `/art/movieposter-still-${number}.jpg`, alt: `MoviePosterGAN still ${number}` })),
  ...Array.from({ length: 6 }, (_, index) => ({
    src: "/art/gantoons-movie-posters.jpg",
    alt: `MoviePosterGAN poster detail ${index + 1}`,
    className: `archive-crop poster-crop-${index + 1}`,
  })),
];
const moleculeArchive = [
  ...[1, 4, 6, 7].map((number) => ({ src: `/images/work-${number}.jpg`, alt: `Molecule Synth view ${number}` })),
  ...[1, 2, 3, 4].map((number) => ({ src: `/images/photo-${number}.jpg`, alt: `Molecule Synth photograph ${number}` })),
  { src: "/images/work-3.jpg", alt: "Illuminated Molecule Synth detail", className: "archive-crop crop-center" },
  { src: "/images/portrait-cover.jpg", alt: "Translucent Molecule Synth detail", className: "archive-crop crop-right" },
  { src: "/images/work-7.jpg", alt: "Molecule Synth assembly detail", className: "archive-crop crop-center" },
];
const shrinkArchive = [
  { src: "/art/shrink-forms.jpg", alt: "Colorful laser-cut forms assembled during a Shrink Circuits workshop" },
  { src: "/art/shrink-form-detail.jpg", alt: "Illuminated translucent form built during a Shrink Circuits workshop" },
  { src: "/art/shrink-lab.jpg", alt: "Shrink Circuits portable electronics lab" },
  { src: "/art/shrink-soldering.jpg", alt: "Soldering a circuit in the Shrink Circuits Nomad Lab" },
  { src: "/art/shrink-kit.jpg", alt: "Shrink Circuits workshop kit" },
  { src: "/art/shrink-event.jpg", alt: "Participants at a Shrink Circuits event" },
  { src: "/art/shrink-board.jpg", alt: "Circular Shrink Circuits circuit board" },
  { src: "/art/shrink-circuits.jpg", alt: "A collection of Shrink Circuits boards" },
];
const prototypeArchive = numberedArchive("prototype-extra", 4, "Playable prototype development photograph");

export default function Home() {
  return (
    <main className="portfolio-shell">
      <a className="skip-link" href="#gallery">Skip to images</a>

      <aside className="index-panel">
        <div className="identity">
          <h1>Travis Feldman</h1>
          <p>Objects, images, signals, language, and ways of learning together.</p>
        </div>

        <nav className="work-index" aria-label="Work index">
          <section>
            <h2>Designs + images</h2>
            <IndexLink href="#micrographia" year="2025">Micrographia</IndexLink>
            <IndexLink href="#night-shift" year="2025">Night Shift</IndexLink>
            <IndexLink href="#hundred-trees" year="2024">100 Trees</IndexLink>
            <IndexLink href="#selva-oscura" year="2022–23">Selva Oscura</IndexLink>
            <IndexLink href="#metalworks" year="2020–21">Metalworks &amp; Design</IndexLink>
            <IndexLink href="#gantoons" year="2018">GANtoons</IndexLink>
            <IndexLink href="#movieposter-gan" year="2018">MoviePosterGAN</IndexLink>
            <IndexLink href="#consumerisms" year="2001–02">Consumerisms</IndexLink>
            <IndexLink href="#tarot-tv" year="2001">Tarot TV</IndexLink>
          </section>

          <section>
            <h2>Instruments + systems</h2>
            <IndexLink href="#shrink-circuits" year="2013–18">Shrink Circuits</IndexLink>
            <IndexLink href="#molecule-synth" year="2012–18">Molecule Synth</IndexLink>
            <IndexLink href="#prototypes" year="2013–17">Playable prototypes</IndexLink>
            <IndexLink href="#pijin" year="2013">PIJIN</IndexLink>
            <IndexLink href="#bpow" year="2013">BPOW!!!</IndexLink>
          </section>

          <section>
            <h2>Sounds + signals</h2>
            <IndexLink href="#nerve-maps" year="2025–present">Nerve Maps</IndexLink>
            <IndexLink href="#many-mansions" year="2012–14">The Many Mansions</IndexLink>
          </section>

          <section>
            <h2>Writing + research</h2>
            <IndexLink href="https://educ-met-site.sites.olt.ubc.ca/files/2023/05/Feldman_MET_25MAY2023.pdf" year="2023">Makerspaces as social systems</IndexLink>
            <IndexLink href="https://ijamm.pubpub.org/pub/o9n1tv3t?readingCollection=7726e307" year="2022">Learning in makerspaces</IndexLink>
            <IndexLink href="https://www.jstor.org/stable/24247222" year="2012">Controversial Crabbe</IndexLink>
            <IndexLink href="https://cinema.washington.edu/people/travis-feldman" year="2005">William Blake / The Four Zoas</IndexLink>
            <IndexLink href="https://bmcr.brynmawr.edu/2004/2004.08.11/" year="2004">English Literature and Ancient Languages</IndexLink>
            <IndexLink href="https://bmcr.brynmawr.edu/2002/2002.09.37" year="2002">Sappho: Poems and Fragments</IndexLink>
          </section>
        </nav>

        <div className="index-footer">
          <a href="mailto:moleculesynth@gmail.com">Email</a>
          <ExternalLink href="https://www.kickstarter.com/profile/travisfeldman">Kickstarter</ExternalLink>
          <ExternalLink href="https://github.com/moleculesynth">Github</ExternalLink>
          <ExternalLink href="https://www.behance.net/molecule">Behance</ExternalLink>
          <ExternalLink href="https://nervemaps.bandcamp.com">Bandcamp</ExternalLink>
        </div>
      </aside>

      <div className="gallery-panel" id="gallery">
        <header className="gallery-banner">
          <p>Selected work</p>
        </header>

        <ExpandableProject
          id="micrographia"
          className="project-micro"
          title="Micrographia"
          year="2025"
          summary="Specimens, actors, contact, reversal, scale, dimension, portrait, strange council."
          preview={
            <div className="micro-stream">
              <figure className="micro-a"><img src="/art/micro-cicadas.jpg" alt="Three cicada specimens arranged on white" /></figure>
              <figure className="micro-b"><img src="/art/micro-spore.jpg" alt="A thorny seed pod photographed as a specimen" /></figure>
              <figure className="micro-c"><img src="/art/micro-butterfly-ray.jpg" alt="Rayogram of a butterfly on a deep gray field" /></figure>
              <figure className="micro-d"><img src="/art/micro-town-council.jpg" alt="Three translucent insect forms facing one another" /></figure>
            </div>
          }
          more={<ArchiveGrid images={microArchive} />}
        />

        <ExpandableProject
          id="night-shift"
          className="project-night"
          title="Night Shift"
          year="2025"
          summary="Vacant, empty, exposed, insomniac, undead."
          preview={
            <div className="night-stream">
              <figure className="night-a"><img src="/art/night-void-color.jpg" alt="A brightly illuminated office building at night" /></figure>
              <figure className="night-b"><img src="/art/night-skyward.jpg" alt="A night building stretched into vertical trails of light" /></figure>
              <figure className="night-c"><img src="/art/night-skyward-2.jpg" alt="A high-key building dissolving into vertical streaks" /></figure>
            </div>
          }
          more={<ArchiveGrid images={nightArchive} />}
        />

        <ExpandableProject
          id="hundred-trees"
          className="project-trees"
          title="100 Trees"
          year="2024"
          summary="The One Tree and the Many Trees, Sleeping Giant Park, CT."
          preview={
            <div className="trees-stream" aria-label="100 Trees seasonal sequence">
              <figure><img src="/art/trees-01.jpg" alt="The tree at a rocky overlook in late autumn" /><figcaption>01</figcaption></figure>
              <figure><img src="/art/trees-07.jpg" alt="The same tree against a darkening autumn sky" /><figcaption>07</figcaption></figure>
              <figure><img src="/art/trees-35.jpg" alt="The same tree and overlook covered in snow" /><figcaption>35</figcaption></figure>
              <figure><img src="/art/trees-64.jpg" alt="The same tree as green returns to the hillside" /><figcaption>64</figcaption></figure>
              <figure><img src="/art/trees-73.jpg" alt="The same tree illuminated by warm seasonal light" /><figcaption>73</figcaption></figure>
              <figure><img src="/art/trees-95.jpg" alt="The same tree overlooking a fully green landscape" /><figcaption>95</figcaption></figure>
            </div>
          }
          more={<ArchiveGrid images={treeArchive} className="archive-trees" />}
        />

        <ExpandableProject
          id="selva-oscura"
          className="project-selva"
          title={<><em>Selva</em> Oscura</>}
          year="2022–2023"
          summary="Midway in the journey, slow exposure, digital night, creatures moving to hiding places at the edge of the visible."
          preview={
            <div className="selva-stream">
              <figure className="selva-a"><img src="/art/selva-moon-trees.jpg" alt="Moonlight caught in the branches of old trees" /></figure>
              <figure className="selva-b"><img src="/art/selva-dusk-forest.jpg" alt="Dark tree trunks against the last evening light" /></figure>
              <figure className="selva-c"><img src="/art/selva-moon-sky.jpg" alt="The moon above a dark horizon in a long exposure" /></figure>
              <figure className="selva-d"><img src="/art/selva-vertical-woods.jpg" alt="A vertical view through a dim forest canopy" /></figure>
              <figure className="selva-e"><img src="/art/selva-lit-woods.jpg" alt="Dense woodland glowing with gathered evening light" /></figure>
              <figure className="selva-f"><img src="/art/selva-stars.jpg" alt="Stars recorded in a deep blue night sky" /></figure>
            </div>
          }
          more={<ArchiveGrid images={selvaArchive} />}
        />

        <ExpandableProject
          id="metalworks"
          className="project-metalworks"
          title="Metalworks & Design"
          year="2020–2021"
          summary="Experiments mixing handcraft, welding, textiles, woodwork and digital fabrication."
          preview={
            <div className="metalworks-stream">
              <figure className="metal-a"><img src="/art/metal-speakers-pair.jpg" alt="A pair of handmade wooden speakers with exposed drivers" /></figure>
              <figure className="metal-b"><img src="/art/metal-shopbot.jpg" alt="A ShopBot CNC machine mounted on a heavy-duty welded frame" /></figure>
              <figure className="metal-c"><img src="/art/metal-whiteboard.jpg" alt="A large classroom whiteboard on a welded rolling base" /></figure>
              <figure className="metal-d"><img src="/art/metal-hex-tables.jpg" alt="Circular and hexagonal tables in fur, metal, unfinished wood, and lacquered wood" /></figure>
              <figure className="metal-e"><img src="/art/metal-speaker-wood.jpg" alt="A handmade wooden speaker enclosure" /></figure>
              <figure className="metal-f"><img src="/art/metal-fur-table.jpg" alt="A small circular table with a white furry surface" /></figure>
            </div>
          }
          more={<ArchiveGrid images={metalArchive} className="archive-metal" />}
        />

        <ExpandableProject
          id="gantoons"
          className="project-gantoons"
          title="GANtoons"
          year="Berlin · 2018"
          summary="Trained on 5000 golden- and silver-age comic-book covers: what can a machine know, and what new image of a comic-book cover can it generate?"
          links={<><ExternalLink href="https://youtu.be/BNb0xTEe69I">30-minute loop</ExternalLink><ExternalLink href="https://youtu.be/Ct37TbZJlrk">Comic covers</ExternalLink></>}
          preview={
            <div className="gan-stream gan-stream-two">
              <a href="https://youtu.be/BNb0xTEe69I" target="_blank" rel="noreferrer"><img src="/art/gantoons-comic-loop.jpg" alt="GAN-generated comic cover imagery" /><span className="play-badge">Play GANtoons loop ↗</span></a>
              <a href="https://youtu.be/Ct37TbZJlrk" target="_blank" rel="noreferrer"><img src="/art/gantoons-comic-covers.jpg" alt="GAN-generated comic-book cover imagery" /><span className="play-badge">Comic Book Covers ↗</span></a>
            </div>
          }
          more={<ArchiveGrid images={gantoonsArchive} />}
        />

        <ExpandableProject
          id="movieposter-gan"
          className="project-movieposter"
          title="MoviePosterGAN"
          year="Berlin · 2018"
          summary="A machine trained on thousands of movie posters asks how visual media might articulate emotion back to the humans who made it."
          links={<ExternalLink href="https://youtu.be/lmEL5HyCGRE">Play MoviePosterGAN</ExternalLink>}
          preview={
            <a className="movieposter-hero" href="https://youtu.be/lmEL5HyCGRE" target="_blank" rel="noreferrer">
              <img src="/art/gantoons-movie-posters.jpg" alt="A grid of GAN-generated movie posters" />
              <span className="play-badge">Play MoviePosterGAN ↗</span>
            </a>
          }
          more={<ArchiveGrid images={moviePosterArchive} />}
        />

        <ExpandableProject
          id="consumerisms"
          className="project-consumerisms"
          title="Consumerisms"
          year="2001–2002"
          summary="A mess hall of myths and mass culture."
          preview={
            <div className="consumerisms-stream">
              <figure className="consumer-a"><img src="/art/consumer-more-new-04.jpg" alt="Quad-eyed Uranus painted in earth tones" /></figure>
              <figure className="consumer-b"><img src="/art/consumerisms-cosmos.jpg" alt="A black-and-white cosmological figure" /></figure>
              <figure className="consumer-c"><img src="/art/consumerisms-ikarus.jpg" alt="Ikarus, a painted figure carrying an axe" /></figure>
              <figure className="consumer-d"><img src="/art/consumerisms-sungod.jpg" alt="A four-eyed figure painted in muted earth tones" /></figure>
            </div>
          }
          more={<ArchiveGrid images={consumerArchive} />}
        />

        <ExpandableProject
          id="tarot-tv"
          className="project-tarot"
          title="Tarot TV"
          year="2001"
          summary="Video noise, found gestures, and technological divination."
          preview={<div className="tarot-stream">{tarotFrames.map(([src, alt]) => <figure key={src}><img src={src} alt={alt} /></figure>)}</div>}
          more={<ArchiveGrid images={tarotArchive} />}
        />

        <ExpandableProject
          id="shrink-circuits"
          className="project-shrink"
          title="Shrink Circuits Nomad Lab"
          year="2013–2018"
          summary="Transportable DIY-electronics workshops imagined as democratic, shared learning infrastructure: tools and circuits brought to people instead of waiting for people to find the lab."
          links={<><ExternalLink href="http://shrinkcircuits.org/">Project site</ExternalLink><ExternalLink href="https://www.awesomefoundation.org/en/projects/30742-shrink-circuits-nomad-lab">Project record</ExternalLink></>}
          preview={
            <div className="shrink-stream">
              <figure className="shrink-a"><img src="/art/shrink-workshop.jpg" alt="A Shrink Circuits workshop gathered around a soldering station" /></figure>
              <figure><img src="/art/shrink-lights.jpg" alt="Small illuminated circuits built in a Shrink Circuits workshop" /></figure>
              <figure><img src="/images/work-2.jpg" alt="DISCO!! Extended Play circular Shrink Circuits board design" /></figure>
            </div>
          }
          more={<ArchiveGrid images={shrinkArchive} />}
        />

        <ExpandableProject
          id="molecule-synth"
          className="project-molecule"
          title="Molecule Synth"
          year="2012–2018"
          summary="A musical instrument broken into its elements and handed back to the player as rearrangeable, color-coded hexagons."
          links={<><ExternalLink href="https://www.kickstarter.com/projects/travisfeldman/molecule-synth">Kickstarter</ExternalLink><ExternalLink href="https://moleculesynth.com">Project site</ExternalLink></>}
          preview={
            <div className="molecule-stream">
              <figure className="molecule-a"><img src="/images/portrait-cover.jpg" alt="A field of translucent green Molecule Synth modules" /></figure>
              <figure className="molecule-b"><img src="/images/work-3.jpg" alt="An illuminated Molecule Synth assembled from hexagonal pieces" /></figure>
              <figure className="molecule-c"><img src="/images/work-1.jpg" alt="Wooden controllers arranged across the Molecule Synth surface" /></figure>
            </div>
          }
          more={<ArchiveGrid images={moleculeArchive} />}
        />

        <ExpandableProject
          id="prototypes"
          className="project-prototypes"
          title="Playable prototypes"
          year="2013–2017"
          summary="Tiles become a race. Circuits grow legs. A board becomes a behavior."
          preview={
            <div className="prototype-stream">
              <figure><img src="/art/prototype-swarmbots.jpg" alt="Experimental swarm robots assembled from batteries and circuit boards" /></figure>
              <figure><img src="/art/prototype-racecar.jpg" alt="A sliding-tile racecar game prototype" /></figure>
              <figure><img src="/art/prototype-swarmboard.jpg" alt="Copper circuit boards beside a small wheeled robot" /></figure>
            </div>
          }
          more={<ArchiveGrid images={prototypeArchive} />}
        />

        <ExpandableProject
          id="pijin"
          className="project-pijin"
          title="PIJIN"
          year="2013"
          summary="A spelling game of the spoken word, built from the sounds people actually make rather than the letters they inherit."
          links={<><ExternalLink href="https://www.kickstarter.com/projects/travisfeldman/pijin-the-spelling-game-of-the-spoken-word">Kickstarter</ExternalLink><ExternalLink href="https://www.behance.net/gallery/14485693/Pijin">Visual archive</ExternalLink></>}
          preview={<figure className="single-image"><img src="/images/pijin.jpg" alt="People arranging letter-sound tiles in a game of PIJIN" /></figure>}
        />

        <ExpandableProject
          id="bpow"
          className="project-bpow"
          title="BPOW!!!"
          year="2013"
          summary="A festival, workshop, and public electronic orchestra built around DIY electronics as a medium of self-expression."
          links={<><ExternalLink href="https://www.kickstarter.com/projects/travisfeldman/bpow-battery-powered-orchestra-workshop">Kickstarter</ExternalLink><ExternalLink href="https://makezine.com/article/craft/music/bpow-festival-celebrates-the-art-of-salvaged-sound/">Festival story</ExternalLink></>}
          preview={
            <div className="bpow-stream">
              <figure><img src="/art/bpow-stage.jpg" alt="A performer silhouetted in saturated stage light" /></figure>
              <figure><img src="/art/bpow-table.jpg" alt="A group building electronic instruments around a worktable" /></figure>
              <figure><img src="/art/bpow-circuit.jpg" alt="Hand-wired electronic components across a table" /></figure>
              <figure><img src="/art/bpow-tv.jpg" alt="Bands of color displayed on a CRT television" /></figure>
            </div>
          }
          more={<ArchiveGrid images={bpowArchive} />}
        />

        <ExpandableProject
          id="nerve-maps"
          className="project-sound"
          title="Nerve Maps"
          year="2025–present"
          summary="Phase, percussion, emergent timbre, modulated texture, and liminal pulse."
          links={<ExternalLink href="https://nervemaps.bandcamp.com">Listen on Bandcamp</ExternalLink>}
          preview={
            <div className="sound-stream">
              <img src="/images/nerve-maps.jpg" alt="A red-tiled entrance illuminated at night" />
              <div className="sound-lines" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <span key={i} />)}</div>
            </div>
          }
        />

        <ExpandableProject
          id="many-mansions"
          className="project-many"
          title="The Many Mansions"
          year="2012–2014"
          summary="Experimental sound gathered around pulse, repetition, saturation, and collective drift."
          links={<ExternalLink href="https://themanymansions.bandcamp.com/">Listen on Bandcamp</ExternalLink>}
          preview={
            <a className="many-mansions-cover" href="https://themanymansions.bandcamp.com/" target="_blank" rel="noreferrer">
              <img src="/art/many-mansions-album.jpg" alt="The Many Mansions — Early Retirement album artwork" />
              <span className="play-badge">Listen on Bandcamp ↗</span>
            </a>
          }
        />

        <footer className="gallery-footer">
          <p>© {new Date().getFullYear()} Travis Feldman</p>
          <a href="#gallery">Back to top ↑</a>
        </footer>
      </div>
    </main>
  );
}
