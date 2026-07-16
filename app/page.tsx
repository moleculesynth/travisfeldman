const Arrow = () => <span aria-hidden="true">↗</span>;

const ExternalLink = ({
  href,
  children,
  className = "text-link",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a className={className} href={href} target="_blank" rel="noreferrer">
    {children} <Arrow />
  </a>
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
    <main>
      <a className="skip-link" href="#content">
        Skip to work
      </a>

      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Travis Feldman, home">
          Travis Feldman
        </a>
        <nav aria-label="Primary navigation">
          <a href="#molecule">Molecule</a>
          <a href="#images">Images</a>
          <a href="#sound">Sound</a>
          <a href="#archive">Archive</a>
        </nav>
        <a className="contact-dot" href="mailto:moleculesynth@gmail.com">
          Contact <Arrow />
        </a>
      </header>

      <div id="content">
        <section className="hero" id="top">
          <div className="hero-title">
            <p className="eyebrow">Artist · designer · musician · educator</p>
            <h1>
              <span>Objects</span>
              <span className="hero-indent">signals</span>
              <span>images</span>
              <span className="hero-indent">language</span>
            </h1>
            <p className="hero-note">
              Work by Travis Feldman, arranged as an open set of instruments,
              images, performances, games, and experiments.
            </p>
          </div>

          <div className="hero-collage" aria-label="Selected works">
            <figure className="hero-synth">
              <img
                src="/images/portrait-cover.jpg"
                alt="Translucent green hexagonal Molecule Synth modules"
              />
              <figcaption>Molecule Synth · physical electronics</figcaption>
            </figure>
            <figure className="hero-rayogram">
              <img
                src="/art/micro-butterfly-ray.jpg"
                alt="Rayogram of a butterfly glowing against a dark field"
              />
              <figcaption>Micrographia · 2025</figcaption>
            </figure>
            <figure className="hero-signal" aria-hidden="true">
              <img src="/art/tarot-ear.jpg" alt="" />
            </figure>
          </div>

          <a className="hero-down" href="#molecule">
            Enter the work <span aria-hidden="true">↓</span>
          </a>
        </section>

        <a
          className="campaign-strip"
          href="https://www.kickstarter.com/profile/travisfeldman"
          target="_blank"
          rel="noreferrer"
        >
          <span>Three Kickstarter projects</span>
          <strong>Molecule Synth · PIJIN · BPOW!!!</strong>
          <span>Open the creator archive <Arrow /></span>
        </a>

        <section className="molecule" id="molecule">
          <div className="project-intro">
            <p className="eyebrow">01 · Featured project</p>
            <h2>Molecule<br />Synth</h2>
            <p className="project-statement">
              A musical instrument broken into its elements, then handed back
              to the player as a set of color-coded, rearrangeable hexagons.
            </p>
            <div className="project-actions">
              <ExternalLink
                href="https://www.kickstarter.com/projects/travisfeldman/molecule-synth"
                className="pill pill-acid"
              >
                See the Kickstarter
              </ExternalLink>
              <ExternalLink href="https://moleculesynth.com" className="pill">
                Visit Molecule Synth
              </ExternalLink>
            </div>
          </div>

          <div className="synth-gallery">
            <figure className="synth-main">
              <img
                src="/images/work-3.jpg"
                alt="An illuminated Molecule Synth assembled from hexagonal pieces"
              />
            </figure>
            <figure className="synth-detail synth-detail-one">
              <img
                src="/images/work-2.jpg"
                alt="Hands arranging Molecule Synth modules on a table"
              />
            </figure>
            <figure className="synth-detail synth-detail-two">
              <img
                src="/images/work-4.jpg"
                alt="A close view of connected Molecule Synth modules"
              />
            </figure>
            <p className="synth-formula">
              LEGO-like interchangeability
              <span>+</span>
              synthesis
              <span>+</span>
              physical electronics
            </p>
          </div>
        </section>

        <section className="micrographia" id="images">
          <div className="collection-heading">
            <div>
              <p className="eyebrow">02 · Photographic collection · 2025</p>
              <h2>Micro/<br />graphia</h2>
            </div>
            <p>
              Specimens become actors. Contact, reversal, and scale turn small
              remains into portraits and strange councils.
            </p>
          </div>

          <div className="micro-grid">
            <figure className="micro-cicadas">
              <img
                src="/art/micro-cicadas.jpg"
                alt="Three cicada specimens arranged on a luminous white field"
              />
              <figcaption>three / contact</figcaption>
            </figure>
            <figure className="micro-spore">
              <img
                src="/art/micro-spore.jpg"
                alt="A thorny seed pod photographed as a specimen"
              />
              <figcaption>spore</figcaption>
            </figure>
            <figure className="micro-dreamy">
              <img
                src="/art/micro-dreamy.jpg"
                alt="A luminous rayogram of a translucent leaf"
              />
            </figure>
            <figure className="micro-butterfly">
              <img
                src="/art/micro-butterfly-ray.jpg"
                alt="Rayogram of a butterfly on a deep gray field"
              />
            </figure>
            <figure className="micro-council">
              <img
                src="/art/micro-town-council.jpg"
                alt="Three translucent insect forms facing one another"
              />
              <figcaption>town council</figcaption>
            </figure>
          </div>
        </section>

        <section className="night-shift">
          <div className="night-title">
            <p className="eyebrow">03 · Night Shift · 2025</p>
            <h2>Still<br />working</h2>
          </div>
          <figure className="night-wide">
            <img
              src="/art/night-void-color.jpg"
              alt="A brightly illuminated office building at night"
            />
          </figure>
          <figure className="night-tall">
            <img
              src="/art/night-skyward.jpg"
              alt="A night building stretched upward into vertical trails of light"
            />
          </figure>
          <figure className="night-pale">
            <img
              src="/art/night-skyward-2.jpg"
              alt="A high-key building dissolving into vertical streaks"
            />
          </figure>
          <p className="night-note">
            After-hours architecture: occupied, empty, overexposed, awake.
          </p>
        </section>

        <section className="sound" id="sound">
          <div className="sound-copy">
            <p className="eyebrow">04 · Listen</p>
            <h2>Nerve<br />Maps</h2>
            <p>
              Phase-based structures, emergent timbre, modulated texture, and
              liminal pulse.
            </p>
            <ExternalLink href="https://nervemaps.bandcamp.com" className="listen-button">
              <span className="play" aria-hidden="true">▶</span>
              Listen on Bandcamp
            </ExternalLink>
          </div>
          <div className="sound-visual">
            <img
              src="/images/nerve-maps.jpg"
              alt="A red-tiled entrance illuminated at night"
            />
            <div className="waveform" aria-hidden="true">
              {Array.from({ length: 34 }, (_, index) => (
                <span key={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="bpow">
          <div className="collection-heading bpow-heading">
            <div>
              <p className="eyebrow">05 · Performance / community / salvaged sound</p>
              <h2>BPOW!!!</h2>
            </div>
            <div>
              <p>
                A festival, workshop, and public electronic orchestra built
                around DIY electronics as a medium of self-expression.
              </p>
              <ExternalLink href="https://makezine.com/article/craft/music/bpow-festival-celebrates-the-art-of-salvaged-sound/">
                Festival story
              </ExternalLink>
              <span className="link-divider" aria-hidden="true">/</span>
              <ExternalLink href="https://www.kickstarter.com/projects/travisfeldman/bpow-battery-powered-orchestra-workshop">
                Kickstarter
              </ExternalLink>
            </div>
          </div>
          <div className="bpow-grid">
            <figure className="bpow-stage">
              <img src="/art/bpow-stage.jpg" alt="A performer silhouetted in saturated pink stage light" />
            </figure>
            <figure className="bpow-table">
              <img src="/art/bpow-table.jpg" alt="A group building electronic instruments around a worktable" />
            </figure>
            <figure className="bpow-circuit">
              <img src="/art/bpow-circuit.jpg" alt="Hand-wired electronic components spread across a black table" />
            </figure>
            <figure className="bpow-tv">
              <img src="/art/bpow-tv.jpg" alt="Diagonal bands of color displayed on a CRT television" />
            </figure>
            <figure className="bpow-live">
              <img src="/art/bpow-live.jpg" alt="A performer blurred by purple and white light" />
            </figure>
          </div>
        </section>

        <section className="archive" id="archive">
          <div className="archive-title">
            <p className="eyebrow">06 · Moving image archive · 2001</p>
            <h2>Tarot TV</h2>
            <p>Video noise, found gestures, technological divination.</p>
          </div>
          <div className="tarot-strip" aria-label="Tarot TV image sequence">
            {tarotFrames.map(([src, alt]) => (
              <figure key={src}>
                <img src={src} alt={alt} />
              </figure>
            ))}
          </div>
        </section>

        <section className="prototypes">
          <div className="prototype-heading">
            <p className="eyebrow">07 · Playable systems / prototypes</p>
            <h2>Things that<br />want to move</h2>
            <p>Tiles become a race. Circuits grow legs. A board becomes a behavior.</p>
          </div>
          <div className="prototype-images">
            <figure className="prototype-main">
              <img
                src="/art/prototype-swarmbots.jpg"
                alt="Two experimental swarm robots assembled from batteries, wires, and circuit boards"
              />
              <figcaption>Swarm bots · prototype · 2016</figcaption>
            </figure>
            <figure>
              <img
                src="/art/prototype-racecar.jpg"
                alt="A sliding-tile racecar game prototype with black and white triangles"
              />
              <figcaption>Racecar · sliding game · 2013</figcaption>
            </figure>
            <figure>
              <img
                src="/art/prototype-swarmboard.jpg"
                alt="Copper circuit boards beside a small wheeled swarm bot"
              />
              <figcaption>Swarm bot circuit · 2017</figcaption>
            </figure>
          </div>
        </section>

        <section className="more-work">
          <p className="eyebrow">Other arrangements</p>
          <div className="more-grid">
            <article className="more-card more-pijin">
              <img
                src="/images/pijin.jpg"
                alt="People arranging letter-sound tiles in a game of Pijin"
              />
              <div>
                <p>Game design · language</p>
                <h3>PIJIN</h3>
                <ExternalLink href="https://www.kickstarter.com/projects/travisfeldman/pijin-the-spelling-game-of-the-spoken-word">
                  Kickstarter
                </ExternalLink>
              </div>
            </article>
            <article className="more-card more-making">
              <img
                src="/art/metal-hex-tables.jpg"
                alt="A group of handmade tables, including a hexagonal wooden table"
              />
              <div>
                <p>Learning spaces · shared tools</p>
                <h3>Making with others</h3>
                <p>Questions before answers. Materials across disciplines. Agency over novelty.</p>
              </div>
            </article>
          </div>
          <div className="compact-projects">
            <ExternalLink href="https://www.awesomefoundation.org/en/projects/30742-shrink-circuits-nomad-lab">
              Shrink Circuits Nomad Lab — mobile DIY electronics education
            </ExternalLink>
            <ExternalLink href="https://themanymansions.bandcamp.com/">
              The Many Mansions — music
            </ExternalLink>
            <ExternalLink href="https://www.behance.net/gallery/14485693/Pijin">
              PIJIN visual archive
            </ExternalLink>
          </div>
        </section>

        <section className="context" id="about">
          <div className="context-image">
            <img
              src="/art/portrait-zoom.jpg"
              alt="Travis Feldman appearing on a laptop screen during a video conversation"
            />
          </div>
          <div className="context-copy">
            <p className="eyebrow">About / context</p>
            <h2>A reader among machines.</h2>
            <p className="context-lead">
              Travis Feldman is an artist, scholar, educator, designer, and
              musician working across physical electronics, photography,
              experimental sound, literature, and shared learning spaces.
            </p>
            <p>
              The work moves between close reading and fabrication: looking at
              how a system is assembled, then making room to rearrange it.
            </p>

            <details>
              <summary>Writing, research, and teaching <span>+</span></summary>
              <div className="context-links">
                <ExternalLink href="https://ijamm.pubpub.org/pub/o9n1tv3t?readingCollection=7726e307">
                  Learning in 21st-century makerspaces
                </ExternalLink>
                <ExternalLink href="https://educ-met-site.sites.olt.ubc.ca/files/2023/05/Feldman_MET_25MAY2023.pdf">
                  Makerspaces as social, pedagogical, and technological systems
                </ExternalLink>
                <ExternalLink href="https://cinema.washington.edu/people/travis-feldman">
                  William Blake and The Four Zoas
                </ExternalLink>
                <ExternalLink href="https://www.jstor.org/stable/24247222">
                  Controversial Crabbe
                </ExternalLink>
                <ExternalLink href="https://bmcr.brynmawr.edu/2002/2002.09.37">
                  Sappho, Poems and Fragments
                </ExternalLink>
              </div>
            </details>

            <div className="social-links">
              <a href="mailto:moleculesynth@gmail.com">Email</a>
              <ExternalLink href="https://github.com/moleculesynth">GitHub</ExternalLink>
              <ExternalLink href="https://www.behance.net/molecule">Behance</ExternalLink>
            </div>
          </div>
        </section>

        <section className="end-note">
          <p>Have a project, question, sound, object, or impossible arrangement?</p>
          <a href="mailto:moleculesynth@gmail.com">
            Let&apos;s make contact <Arrow />
          </a>
        </section>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Travis Feldman</p>
        <p>Portland · working across forms</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
