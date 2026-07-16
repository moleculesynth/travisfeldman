const Arrow = () => <span aria-hidden="true">↗</span>;

const ExternalLink = ({
  href,
  children,
  className = "external-link",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a className={className} href={href} target="_blank" rel="noreferrer">
    {children} <Arrow />
  </a>
);

const IndexLink = ({ href, children, year }: { href: string; children: React.ReactNode; year?: string }) => (
  <a href={href}>
    <span>{children}</span>
    {year ? <time>{year}</time> : null}
  </a>
);

const ProjectHeader = ({
  title,
  year,
  children,
  links,
}: {
  title: React.ReactNode;
  year?: string;
  children: React.ReactNode;
  links?: React.ReactNode;
}) => (
  <header className="project-header">
    <div className="project-title-row">
      <h2>{title}</h2>
      {year ? <time>{year}</time> : null}
    </div>
    <div className="project-summary">
      <p>{children}</p>
      {links ? <div className="project-links">{links}</div> : null}
    </div>
  </header>
);

const tarotFrames = [
  ["/art/tarot-conversation.jpg", "A pale blue video still of a skeletal figure"],
  ["/art/tarot-ear.jpg", "An abstract, close-cropped video image of an ear"],
  ["/art/tarot-talker.jpg", "An orange, solarized video portrait"],
  ["/art/tarot-attic.jpg", "A dim, distorted view into an attic"],
  ["/art/tarot-hope.jpg", "A luminous green figure seen through video noise"],
  ["/art/tarot-ceiling.jpg", "An arched ceiling blurred by video motion"],
] as const;

export default function Home() {
  return (
    <main className="portfolio-shell">
      <a className="skip-link" href="#gallery">
        Skip to images
      </a>

      <aside className="index-panel">
        <div className="identity">
          <p className="version">Homepage 0.3.1</p>
          <h1>Travis Feldman</h1>
          <p>Objects, images, signals, language, and ways of learning together.</p>
        </div>

        <nav className="work-index" aria-label="Work index">
          <section>
            <h2>Recent images</h2>
            <IndexLink href="#hundred-trees" year="2024">100 Trees</IndexLink>
            <IndexLink href="#selva-oscura" year="2022–23">Selva Oscura</IndexLink>
            <IndexLink href="#micrographia" year="2025">Micrographia</IndexLink>
            <IndexLink href="#night-shift" year="2025">Night Shift</IndexLink>
          </section>

          <section>
            <h2>Instruments + systems</h2>
            <IndexLink href="#molecule-synth" year="2012–18">Molecule Synth</IndexLink>
            <IndexLink href="#gantoons" year="2018">GANtoons + MoviePosterGAN</IndexLink>
            <IndexLink href="#pijin" year="2013">PIJIN</IndexLink>
            <IndexLink href="#bpow" year="2013">BPOW!!!</IndexLink>
            <IndexLink href="#shrink-circuits">Shrink Circuits</IndexLink>
            <IndexLink href="#prototypes" year="2013–17">Playable prototypes</IndexLink>
          </section>

          <section>
            <h2>Sound + moving image</h2>
            <IndexLink href="#sound">Nerve Maps / The Many Mansions</IndexLink>
            <IndexLink href="#tarot-tv" year="2001">Tarot TV</IndexLink>
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
          <p>Selected work · Portland · partial and ongoing</p>
          <a href="#about">Info ↓</a>
        </header>

        <section className="gallery-project project-trees" id="hundred-trees">
          <ProjectHeader title="100 Trees" year="2024">
            A Hegelian meditation on the one and the many: the same tree, from
            the same position, over the course of a year at Sleeping Giant
            State Park in Connecticut.
          </ProjectHeader>
          <div className="trees-stream" aria-label="100 Trees seasonal sequence">
            <figure><img src="/art/trees-01.jpg" alt="The tree at a rocky overlook in late autumn" /><figcaption>01</figcaption></figure>
            <figure><img src="/art/trees-07.jpg" alt="The same tree against a darkening autumn sky" /><figcaption>07</figcaption></figure>
            <figure><img src="/art/trees-35.jpg" alt="The same tree and overlook covered in snow" /><figcaption>35</figcaption></figure>
            <figure><img src="/art/trees-64.jpg" alt="The same tree as green returns to the hillside" /><figcaption>64</figcaption></figure>
            <figure><img src="/art/trees-73.jpg" alt="The same tree illuminated by warm seasonal light" /><figcaption>73</figcaption></figure>
            <figure><img src="/art/trees-95.jpg" alt="The same tree overlooking a fully green landscape" /><figcaption>95</figcaption></figure>
          </div>
        </section>

        <section className="gallery-project project-selva" id="selva-oscura">
          <ProjectHeader title={<><em>Selva</em> Oscura</>} year="2022–2023">
            A Dantean exploration of slow exposure and digital night
            photography: ordinary woods becoming strange at the edge of what
            the camera can see.
          </ProjectHeader>
          <div className="selva-stream">
            <figure className="selva-a"><img src="/art/selva-moon-trees.jpg" alt="Moonlight caught in the branches of old trees" /></figure>
            <figure className="selva-b"><img src="/art/selva-dusk-forest.jpg" alt="Dark tree trunks against the last evening light" /></figure>
            <figure className="selva-c"><img src="/art/selva-moon-sky.jpg" alt="The moon above a dark horizon in a long exposure" /></figure>
            <figure className="selva-d"><img src="/art/selva-vertical-woods.jpg" alt="A vertical view through a dim forest canopy" /></figure>
            <figure className="selva-e"><img src="/art/selva-lit-woods.jpg" alt="Dense woodland glowing with gathered evening light" /></figure>
            <figure className="selva-f"><img src="/art/selva-stars.jpg" alt="Stars recorded in a deep blue night sky" /></figure>
          </div>
        </section>

        <section className="gallery-project project-micro" id="micrographia">
          <ProjectHeader title="Micrographia" year="2025">
            Specimens become actors. Contact, reversal, and scale turn small
            remains into portraits and strange councils.
          </ProjectHeader>
          <div className="micro-stream">
            <figure className="micro-a"><img src="/art/micro-cicadas.jpg" alt="Three cicada specimens arranged on white" /></figure>
            <figure className="micro-b"><img src="/art/micro-spore.jpg" alt="A thorny seed pod photographed as a specimen" /></figure>
            <figure className="micro-c"><img src="/art/micro-butterfly-ray.jpg" alt="Rayogram of a butterfly on a deep gray field" /></figure>
            <figure className="micro-d"><img src="/art/micro-town-council.jpg" alt="Three translucent insect forms facing one another" /></figure>
          </div>
        </section>

        <section className="gallery-project project-night" id="night-shift">
          <ProjectHeader title="Night Shift" year="2025">
            After-hours architecture: occupied, empty, overexposed, awake.
          </ProjectHeader>
          <div className="night-stream">
            <figure className="night-a"><img src="/art/night-void-color.jpg" alt="A brightly illuminated office building at night" /></figure>
            <figure className="night-b"><img src="/art/night-skyward.jpg" alt="A night building stretched into vertical trails of light" /></figure>
            <figure className="night-c"><img src="/art/night-skyward-2.jpg" alt="A high-key building dissolving into vertical streaks" /></figure>
          </div>
        </section>

        <section className="gallery-project project-molecule" id="molecule-synth">
          <ProjectHeader
            title="Molecule Synth"
            year="2012–2018"
            links={<>
              <ExternalLink href="https://www.kickstarter.com/projects/travisfeldman/molecule-synth">Kickstarter</ExternalLink>
              <ExternalLink href="https://moleculesynth.com">Project site</ExternalLink>
            </>}
          >
            A musical instrument broken into its elements and handed back to
            the player as rearrangeable, color-coded hexagons.
          </ProjectHeader>
          <div className="molecule-stream">
            <figure className="molecule-a"><img src="/images/portrait-cover.jpg" alt="A field of translucent green Molecule Synth modules" /></figure>
            <figure className="molecule-b"><img src="/images/work-3.jpg" alt="An illuminated Molecule Synth assembled from hexagonal pieces" /></figure>
            <figure className="molecule-c"><img src="/images/work-2.jpg" alt="Hands arranging Molecule Synth modules" /></figure>
          </div>
        </section>

        <section className="gallery-project project-gantoons" id="gantoons">
          <ProjectHeader
            title="GANtoons + MoviePosterGAN"
            year="Berlin · 2018"
            links={<ExternalLink href="https://youtu.be/BNb0xTEe69I">Play the 30-minute loop</ExternalLink>}
          >
            How might a machine express emotion? Three GANs were trained on
            thousands of New Yorker cartoons, comic-book covers, and movie
            posters, then left to dream new human situations of their own.
          </ProjectHeader>
          <div className="gan-stream">
            <a href="https://youtu.be/BNb0xTEe69I" target="_blank" rel="noreferrer">
              <img src="/art/gantoons-comic-loop.jpg" alt="GAN-generated comic cover imagery" />
              <span className="play-badge">Play GANtoons loop ↗</span>
            </a>
            <a href="https://youtu.be/Ct37TbZJlrk" target="_blank" rel="noreferrer">
              <img src="/art/gantoons-comic-covers.jpg" alt="GAN-generated comic-book cover imagery" />
              <span className="play-badge">Comic Book Covers ↗</span>
            </a>
            <a href="https://youtu.be/lmEL5HyCGRE" target="_blank" rel="noreferrer">
              <img src="/art/gantoons-movie-posters.jpg" alt="A grid of GAN-generated movie posters" />
              <span className="play-badge">MoviePosterGAN ↗</span>
            </a>
          </div>
          <p className="project-note">Developed at the School of MA and exhibited in its Berlin graduation show.</p>
        </section>

        <section className="gallery-project project-pijin" id="pijin">
          <ProjectHeader
            title="PIJIN"
            year="2013"
            links={<>
              <ExternalLink href="https://www.kickstarter.com/projects/travisfeldman/pijin-the-spelling-game-of-the-spoken-word">Kickstarter</ExternalLink>
              <ExternalLink href="https://www.behance.net/gallery/14485693/Pijin">Visual archive</ExternalLink>
            </>}
          >
            A spelling game of the spoken word, built from the sounds people
            actually make rather than the letters they inherit.
          </ProjectHeader>
          <figure className="single-image"><img src="/images/pijin.jpg" alt="People arranging letter-sound tiles in a game of PIJIN" /></figure>
        </section>

        <section className="gallery-project project-bpow" id="bpow">
          <ProjectHeader
            title="BPOW!!!"
            year="2013"
            links={<>
              <ExternalLink href="https://www.kickstarter.com/projects/travisfeldman/bpow-battery-powered-orchestra-workshop">Kickstarter</ExternalLink>
              <ExternalLink href="https://makezine.com/article/craft/music/bpow-festival-celebrates-the-art-of-salvaged-sound/">Festival story</ExternalLink>
            </>}
          >
            A festival, workshop, and public electronic orchestra built around
            DIY electronics as a medium of self-expression.
          </ProjectHeader>
          <div className="bpow-stream">
            <figure><img src="/art/bpow-stage.jpg" alt="A performer silhouetted in saturated stage light" /></figure>
            <figure><img src="/art/bpow-table.jpg" alt="A group building electronic instruments around a worktable" /></figure>
            <figure><img src="/art/bpow-circuit.jpg" alt="Hand-wired electronic components across a table" /></figure>
            <figure><img src="/art/bpow-tv.jpg" alt="Bands of color displayed on a CRT television" /></figure>
          </div>
        </section>

        <section className="gallery-project project-shrink" id="shrink-circuits">
          <div className="shrink-copy">
            <p>Shrink Circuits Nomad Lab</p>
            <h2>A makerspace that moves.</h2>
            <p>
              Transportable DIY-electronics workshops imagined as democratic,
              shared learning infrastructure: tools and circuits brought to
              people instead of waiting for people to find the lab.
            </p>
            <ExternalLink href="https://www.awesomefoundation.org/en/projects/30742-shrink-circuits-nomad-lab">Project record</ExternalLink>
          </div>
          <div className="nomad-diagram" aria-hidden="true">
            <span /><span /><span /><span /><span /><span />
          </div>
        </section>

        <section className="gallery-project project-prototypes" id="prototypes">
          <ProjectHeader title="Playable prototypes" year="2013–2017">
            Tiles become a race. Circuits grow legs. A board becomes a behavior.
          </ProjectHeader>
          <div className="prototype-stream">
            <figure><img src="/art/prototype-swarmbots.jpg" alt="Experimental swarm robots assembled from batteries and circuit boards" /></figure>
            <figure><img src="/art/prototype-racecar.jpg" alt="A sliding-tile racecar game prototype" /></figure>
            <figure><img src="/art/prototype-swarmboard.jpg" alt="Copper circuit boards beside a small wheeled robot" /></figure>
          </div>
        </section>

        <section className="gallery-project project-sound" id="sound">
          <ProjectHeader
            title="Sound"
            links={<>
              <ExternalLink href="https://nervemaps.bandcamp.com">Nerve Maps</ExternalLink>
              <ExternalLink href="https://themanymansions.bandcamp.com/">The Many Mansions</ExternalLink>
            </>}
          >
            Phase, percussion, emergent timbre, modulated texture, and liminal pulse.
          </ProjectHeader>
          <div className="sound-stream">
            <img src="/images/nerve-maps.jpg" alt="A red-tiled entrance illuminated at night" />
            <div className="sound-lines" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <span key={i} />)}</div>
          </div>
        </section>

        <section className="gallery-project project-tarot" id="tarot-tv">
          <ProjectHeader title="Tarot TV" year="2001">
            Video noise, found gestures, and technological divination.
          </ProjectHeader>
          <div className="tarot-stream">
            {tarotFrames.map(([src, alt]) => <figure key={src}><img src={src} alt={alt} /></figure>)}
          </div>
        </section>

        <section className="about-panel" id="about">
          <div>
            <p className="version">About</p>
            <h2>A reader among machines.</h2>
          </div>
          <div className="about-copy">
            <p>
              Travis Feldman is an artist, scholar, educator, designer, and
              musician working across physical electronics, photography,
              experimental sound, literature, and shared learning spaces.
            </p>
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
          <p>Homepage 0.3.1</p>
          <a href="#gallery">Back to top ↑</a>
        </footer>
      </div>
    </main>
  );
}
