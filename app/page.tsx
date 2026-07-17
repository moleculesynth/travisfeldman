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
          <span>{expanded ? "Close view ×" : "More images +"}</span>
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
          <p className="expanded-label">Extended project view</p>
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

const tarotMore = [
  ["/art/tarot-speechmaker.jpg", "A speaker transformed by analog video color"],
  ["/art/tarot-triangulation.jpg", "A figure caught in a triangular video composition"],
  ["/art/tarot-exodus.jpg", "A layered figure moving through video noise"],
  ["/art/tarot-watcher.jpg", "A watching face suspended in saturated blue"],
  ["/art/tarot-microphone.jpg", "A microphone isolated as an electronic omen"],
  ["/art/tarot-glance.jpg", "A fearful glance interrupted by scan lines"],
] as const;

export default function Home() {
  return (
    <main className="portfolio-shell">
      <a className="skip-link" href="#gallery">Skip to images</a>

      <aside className="index-panel">
        <div className="identity">
          <p className="version">Homepage 0.3.2</p>
          <h1>Travis Feldman</h1>
          <p>Objects, images, signals, language, and ways of learning together.</p>
        </div>

        <nav className="work-index" aria-label="Work index">
          <section>
            <h2>Images</h2>
            <IndexLink href="#micrographia" year="2025">Micrographia</IndexLink>
            <IndexLink href="#night-shift" year="2025">Night Shift</IndexLink>
            <IndexLink href="#hundred-trees" year="2024">100 Trees</IndexLink>
            <IndexLink href="#selva-oscura" year="2022–23">Selva Oscura</IndexLink>
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
            <h2>Sound</h2>
            <IndexLink href="#nerve-maps" year="2025–present">Nerve Maps</IndexLink>
            <IndexLink href="#many-mansions" year="2012–14">The Many Mansions</IndexLink>
          </section>
        </nav>

        <div className="index-footer">
          <a href="#about">About + writing</a>
          <a href="mailto:moleculesynth@gmail.com">Email</a>
          <ExternalLink href="https://www.kickstarter.com/profile/travisfeldman">Kickstarter</ExternalLink>
          <ExternalLink href="https://github.com/moleculesynth">GitHub</ExternalLink>
        </div>
      </aside>

      <div className="gallery-panel" id="gallery">
        <header className="gallery-banner">
          <p>Selected work · click a project title for more images</p>
          <a href="#about">Info ↓</a>
        </header>

        <ExpandableProject
          id="micrographia"
          className="project-micro"
          title="Micrographia"
          year="2025"
          summary="Specimens become actors. Contact, reversal, and scale turn small remains into portraits and strange councils."
          preview={
            <div className="micro-stream">
              <figure className="micro-a"><img src="/art/micro-cicadas.jpg" alt="Three cicada specimens arranged on white" /></figure>
              <figure className="micro-b"><img src="/art/micro-spore.jpg" alt="A thorny seed pod photographed as a specimen" /></figure>
              <figure className="micro-c"><img src="/art/micro-butterfly-ray.jpg" alt="Rayogram of a butterfly on a deep gray field" /></figure>
              <figure className="micro-d"><img src="/art/micro-town-council.jpg" alt="Three translucent insect forms facing one another" /></figure>
            </div>
          }
          more={
            <div className="more-grid more-grid-micro">
              <figure><img src="/art/micro-dreamy.jpg" alt="A luminous specimen dissolving into pale light" /></figure>
              <figure className="detail-crop"><img src="/art/micro-cicadas.jpg" alt="Detail of the cicada specimen arrangement" /></figure>
              <figure className="detail-crop"><img src="/art/micro-town-council.jpg" alt="Detail of translucent insect forms" /></figure>
            </div>
          }
        />

        <ExpandableProject
          id="night-shift"
          className="project-night"
          title="Night Shift"
          year="2025"
          summary="After-hours architecture: occupied, empty, overexposed, awake."
          preview={
            <div className="night-stream">
              <figure className="night-a"><img src="/art/night-void-color.jpg" alt="A brightly illuminated office building at night" /></figure>
              <figure className="night-b"><img src="/art/night-skyward.jpg" alt="A night building stretched into vertical trails of light" /></figure>
              <figure className="night-c"><img src="/art/night-skyward-2.jpg" alt="A high-key building dissolving into vertical streaks" /></figure>
            </div>
          }
          more={
            <div className="more-grid more-grid-night">
              <figure><img src="/art/night-still-working.jpg" alt="An office building still illuminated late at night" /></figure>
              <figure className="detail-crop"><img src="/art/night-void-color.jpg" alt="Detail of illuminated office windows" /></figure>
            </div>
          }
        />

        <ExpandableProject
          id="hundred-trees"
          className="project-trees"
          title="100 Trees"
          year="2024"
          summary="A Hegelian meditation on the one and the many: the same tree, from the same position, over the course of a year at Sleeping Giant State Park in Connecticut."
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
          more={
            <div className="trees-stream more-trees" aria-label="Additional 100 Trees photographs">
              {[13, 19, 25, 43, 58, 82].map((number) => (
                <figure key={number}><img src={`/art/trees-${number}.jpg`} alt={`The same tree at point ${number} in the yearlong sequence`} /><figcaption>{number}</figcaption></figure>
              ))}
            </div>
          }
        />

        <ExpandableProject
          id="selva-oscura"
          className="project-selva"
          title={<><em>Selva</em> Oscura</>}
          year="2022–2023"
          summary="A Dantean exploration of slow exposure and digital night photography: ordinary woods becoming strange at the edge of what the camera can see."
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
          more={
            <div className="more-grid more-grid-selva">
              <figure><img src="/art/selva-2184.jpg" alt="Trees disappearing into deep blue night" /></figure>
              <figure><img src="/art/selva-2317.jpg" alt="A long exposure through moonlit branches" /></figure>
              <figure><img src="/art/selva-2398.jpg" alt="A dark woodland gathered by the camera" /></figure>
              <figure><img src="/art/selva-2700.jpg" alt="Night foliage illuminated by slow exposure" /></figure>
            </div>
          }
        />

        <ExpandableProject
          id="gantoons"
          className="project-gantoons"
          title="GANtoons"
          year="Berlin · 2018"
          summary="GANs trained on thousands of New Yorker cartoons and comic-book covers, then left to dream new human situations of their own."
          links={<><ExternalLink href="https://youtu.be/BNb0xTEe69I">30-minute loop</ExternalLink><ExternalLink href="https://youtu.be/Ct37TbZJlrk">Comic covers</ExternalLink></>}
          preview={
            <div className="gan-stream gan-stream-two">
              <a href="https://youtu.be/BNb0xTEe69I" target="_blank" rel="noreferrer"><img src="/art/gantoons-comic-loop.jpg" alt="GAN-generated comic cover imagery" /><span className="play-badge">Play GANtoons loop ↗</span></a>
              <a href="https://youtu.be/Ct37TbZJlrk" target="_blank" rel="noreferrer"><img src="/art/gantoons-comic-covers.jpg" alt="GAN-generated comic-book cover imagery" /><span className="play-badge">Comic Book Covers ↗</span></a>
            </div>
          }
          more={
            <div className="more-grid more-grid-gan">
              {[1, 2, 3].map((number) => <figure key={number}><img src={`/art/gantoons-still-${number}.jpg`} alt={`Still ${number} from the GANtoons video loop`} /></figure>)}
            </div>
          }
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
          more={
            <div className="more-grid more-grid-gan">
              {[1, 2, 3].map((number) => <figure key={number}><img src={`/art/movieposter-still-${number}.jpg`} alt={`Still ${number} from MoviePosterGAN`} /></figure>)}
            </div>
          }
        />

        <ExpandableProject
          id="consumerisms"
          className="project-consumerisms"
          title="Consumerisms"
          year="2001–2002"
          summary="A sequence of sculptures, images, and installation views in which handmade figures meet private mythologies and mass culture."
          preview={
            <div className="consumerisms-stream">
              <figure className="consumer-a"><img src="/art/consumerisms-view-1.jpg" alt="A green handmade figure seated with a vessel" /></figure>
              <figure className="consumer-b"><img src="/art/consumerisms-sungod.jpg" alt="A many-eyed figure painted in muted earth tones" /></figure>
              <figure className="consumer-c"><img src="/art/consumerisms-view-3.jpg" alt="A side view of the green sculptural figure" /></figure>
              <figure className="consumer-d"><img src="/art/consumerisms-cosmos.jpg" alt="A black-and-white cosmological figure" /></figure>
            </div>
          }
          more={
            <div className="more-grid more-grid-consumerisms">
              <figure><img src="/art/consumerisms-view-5.jpg" alt="An installation view of a handmade figure" /></figure>
              <figure><img src="/art/consumerisms-view-6.jpg" alt="A second installation view of the sculptural figure" /></figure>
              <figure><img src="/art/consumerisms-garden.jpg" alt="A vertical garden image from Consumerisms" /></figure>
              <figure><img src="/art/consumerisms-ikarus.jpg" alt="Ikarus, a painted figure from Consumerisms" /></figure>
            </div>
          }
        />

        <ExpandableProject
          id="tarot-tv"
          className="project-tarot"
          title="Tarot TV"
          year="2001"
          summary="Video noise, found gestures, and technological divination."
          preview={<div className="tarot-stream">{tarotFrames.map(([src, alt]) => <figure key={src}><img src={src} alt={alt} /></figure>)}</div>}
          more={<div className="tarot-stream tarot-more">{tarotMore.map(([src, alt]) => <figure key={src}><img src={src} alt={alt} /></figure>)}</div>}
        />

        <section className="gallery-project project-shrink" id="shrink-circuits">
          <div className="shrink-copy">
            <p>2013–2018</p>
            <h2>Shrink Circuits Nomad Lab</h2>
            <p>Transportable DIY-electronics workshops imagined as democratic, shared learning infrastructure: tools and circuits brought to people instead of waiting for people to find the lab.</p>
            <ExternalLink href="https://www.awesomefoundation.org/en/projects/30742-shrink-circuits-nomad-lab">Project record</ExternalLink>
          </div>
          <div className="nomad-diagram" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
        </section>

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
              <figure className="molecule-c"><img src="/images/work-2.jpg" alt="Hands arranging Molecule Synth modules" /></figure>
            </div>
          }
          more={
            <div className="more-grid more-grid-molecule">
              {[1, 4, 6, 7].map((number) => <figure key={number}><img src={`/images/work-${number}.jpg`} alt={`Molecule Synth project view ${number}`} /></figure>)}
            </div>
          }
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
          more={
            <div className="more-grid more-grid-bpow">
              <figure><img src="/art/bpow-build-table.jpg" alt="Participants building instruments together at BPOW" /></figure>
              <figure><img src="/art/bpow-workshop.jpg" alt="A BPOW electronics workshop in progress" /></figure>
              <figure><img src="/art/bpow-performance-2.jpg" alt="A performer at the BPOW festival" /></figure>
              <figure><img src="/art/bpow-performance-3.jpg" alt="A second BPOW performance" /></figure>
            </div>
          }
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
          preview={<div className="many-mansions-visual" aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <span key={i} />)}</div>}
        />

        <section className="about-panel" id="about">
          <div><p className="version">About</p><h2>A reader among machines.</h2></div>
          <div className="about-copy">
            <p>Travis Feldman is an artist, scholar, educator, designer, and musician working across physical electronics, photography, experimental sound, literature, and shared learning spaces.</p>
            <details>
              <summary>Writing and research <span>+</span></summary>
              <div>
                <ExternalLink href="https://ijamm.pubpub.org/pub/o9n1tv3t?readingCollection=7726e307">Learning in makerspaces</ExternalLink>
                <ExternalLink href="https://educ-met-site.sites.olt.ubc.ca/files/2023/05/Feldman_MET_25MAY2023.pdf">Makerspaces as social systems</ExternalLink>
                <ExternalLink href="https://cinema.washington.edu/people/travis-feldman">William Blake and The Four Zoas</ExternalLink>
                <ExternalLink href="https://www.jstor.org/stable/24247222">Controversial Crabbe</ExternalLink>
                <ExternalLink href="https://bmcr.brynmawr.edu/2002/2002.09.37">Sappho, Poems and Fragments</ExternalLink>
              </div>
            </details>
            <a className="email-link" href="mailto:moleculesynth@gmail.com">moleculesynth@gmail.com <Arrow /></a>
          </div>
        </section>

        <footer className="gallery-footer">
          <p>© {new Date().getFullYear()} Travis Feldman</p>
          <p>Homepage 0.3.2</p>
          <a href="#gallery">Back to top ↑</a>
        </footer>
      </div>
    </main>
  );
}
