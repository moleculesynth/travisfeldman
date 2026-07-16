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

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Travis Feldman, home">
          <span className="wordmark-mark">TF</span>
          <span>Travis Feldman</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#practice">Practice</a>
          <a href="#writing">Writing</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-contact" href="mailto:moleculesynth@gmail.com">
          Say hello
        </a>
      </header>

      <div id="content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Poems · circuits · spaces · sound</p>
            <h1 className="provocation-title">
              <span>Enter the</span>
              <span>system.</span>
              <span className="title-accent">Change it.</span>
            </h1>
            <p className="hero-intro">
              I’m Travis Feldman. I work where literature, learning,
              experimental sound, and physical electronics become things other
              people can enter, question, and rearrange.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore selected work <span aria-hidden="true">↓</span>
              </a>
              <a className="button button-secondary" href="mailto:moleculesynth@gmail.com">
                Start a conversation
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Molecule Synth modules">
            <img
              src="/images/portrait-cover.jpg"
              alt="A field of translucent green hexagonal Molecule Synth modules"
            />
            <div className="hero-note hero-note-one">
              <span>Begin anywhere</span>
              There is no correct first move
            </div>
            <div className="hero-note hero-note-two">
              <span>Then notice</span>
              What changes you back
            </div>
          </div>
        </section>

        <section className="rouze" aria-labelledby="rouze-title">
          <p className="section-label">Not too explicit</p>
          <blockquote id="rouze-title">
            <span className="rouze-word rouze-word-one">rouze</span>
            <span className="rouze-word rouze-word-two">the faculties</span>
            <span className="rouze-word rouze-word-three">to act.</span>
          </blockquote>
          <p className="rouze-source">William Blake, letter to Dr. Trusler, 1799</p>
          <div className="rouze-prompts" aria-label="Ways to enter the work">
            <span>Look again</span>
            <span>Try a combination</span>
            <span>Disturb the pattern</span>
            <span>Leave a door open</span>
          </div>
        </section>

        <section className="statement section-pad">
          <p className="section-label">Working premise</p>
          <p className="statement-text">
            Leave room. Let the thing resist. Make the encounter active enough
            that its meaning cannot arrive preassembled.
          </p>
        </section>

        <section className="work section-pad" id="work">
          <div className="section-heading">
            <div>
              <p className="section-label">Selected work</p>
              <h2>Ideas made tangible.</h2>
            </div>
            <p>
              Instruments, spaces, games, gatherings, and recordings—each one
              an invitation to experiment.
            </p>
          </div>

          <div className="project-grid">
            <article className="project project-featured project-dark">
              <img
                src="/images/work-3.jpg"
                alt="A modular Molecule Synth assembled from illuminated hexagonal pieces"
              />
              <div className="project-shade" />
              <div className="project-content">
                <p className="project-type">Instrument design · physical electronics</p>
                <h3>Molecule Synth</h3>
                <p>
                  A snap-together electronic instrument that turns the building
                  blocks of synthesis into a playful, rearrangeable interface.
                </p>
                <ExternalLink href="https://moleculesynth.com" className="project-link">
                  Visit the project
                </ExternalLink>
              </div>
            </article>

            <article className="project project-cream project-idlab">
              <div className="project-image-frame">
                <img
                  src="/images/work-1.jpg"
                  alt="An interactive wall of illuminated hexagons and hand-shaped wooden controls"
                />
              </div>
              <div className="project-content">
                <p className="project-type">Learning space · shared tools · student work</p>
                <h3>A room for making</h3>
                <p>
                  For years I worked inside a school makerspace—shaping prompts,
                  tools, events, and the conditions in which students could
                  surprise themselves and one another.
                </p>
              </div>
            </article>

            <article className="project project-acid project-nerve">
              <div className="project-content">
                <p className="project-type">Experimental electronic music</p>
                <h3>Nerve Maps</h3>
                <p>
                  Electronic composition from first principles: phase-based
                  structure, emergent timbre, modulated texture, and liminal
                  pulse.
                </p>
                <ExternalLink href="https://nervemaps.bandcamp.com" className="project-link">
                  Listen on Bandcamp
                </ExternalLink>
              </div>
              <img
                src="/images/nerve-maps.jpg"
                alt="Night photograph of an illuminated red-tiled entrance, used as Nerve Maps artwork"
              />
            </article>

            <article className="project project-image project-pijin">
              <img
                src="/images/pijin.jpg"
                alt="People arranging small letter-sound tiles in a game of Pijin"
              />
              <div className="project-shade" />
              <div className="project-content">
                <p className="project-type">Game design · language</p>
                <h3>PIJIN</h3>
                <p>A future-primitive word game built from the sounds of speech.</p>
                <ExternalLink href="https://www.behance.net/gallery/14485693/Pijin" className="project-link">
                  View the project archive
                </ExternalLink>
              </div>
            </article>

            <article className="project project-blue project-bpow">
              <div className="project-content">
                <p className="project-type">Community · festival · salvaged sound</p>
                <h3>BPOW!!!</h3>
                <p>
                  The Battery Powered Orchestra Workshop brought Portland
                  together for two days of circuit bending, DIY electronics,
                  workshops, performances, and a public electronic orchestra.
                </p>
                <ExternalLink href="https://makezine.com/article/craft/music/bpow-festival-celebrates-the-art-of-salvaged-sound/" className="project-link">
                  Read the festival story
                </ExternalLink>
              </div>
              <div className="signal-lines" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </article>

            <article className="project project-photo">
              <img
                src="/images/photo-2.jpg"
                alt="Two people in conversation at a glowing table, from the Biz Photos series"
              />
              <div className="project-content">
                <p className="project-type">Photography · observation</p>
                <h3>Photo portfolios</h3>
                <p>
                  Portraits, objects, working environments, and invented scenes
                  photographed with an eye for people inside systems.
                </p>
                <ExternalLink href="https://www.behance.net/molecule" className="project-link">
                  Browse the Behance portfolio
                </ExternalLink>
              </div>
            </article>
          </div>
        </section>

        <section className="practice section-pad" id="practice">
          <div className="practice-intro">
            <p className="section-label">Learning & making</p>
            <h2>Make the conditions. Then get out of the way.</h2>
            <p>
              A good space does not prescribe an answer. It makes attention,
              agency, and unexpected combinations more likely.
            </p>
          </div>

          <div className="practice-list">
            <article>
              <span className="practice-number">01</span>
              <div>
                <h3>Begin before you understand</h3>
                <p>
                  Touch the material. Make a provisional move. Let the next
                  question come from what actually happened.
                </p>
              </div>
            </article>
            <article>
              <span className="practice-number">02</span>
              <div>
                <h3>Put abstractions in someone’s hands</h3>
                <p>
                  A shared object can join engineering, music, art, language,
                  and social questions without flattening their differences.
                </p>
              </div>
            </article>
            <article>
              <span className="practice-number">03</span>
              <div>
                <h3>Leave the system open</h3>
                <p>
                  The measure is not spectacle. It is whether someone leaves
                  more capable of asking—and pursuing—their own questions.
                </p>
              </div>
            </article>
          </div>

          <aside className="paper-callout">
            <div>
              <p className="section-label">Academic makerspaces</p>
              <h3>
                “Do We Need a New Epistemology for Learning as it Happens in
                21st-Century Makerspaces?”
              </h3>
            </div>
            <div>
              <p>
                Presented at the International Symposium on Academic Makerspaces
                at Case Western Reserve University, Cleveland.
              </p>
              <ExternalLink href="https://ijamm.pubpub.org/pub/o9n1tv3t?readingCollection=7726e307">
                Read the paper
              </ExternalLink>
              <ExternalLink href="https://ijamm.pubpub.org/isam2017">
                Explore the symposium archive
              </ExternalLink>
            </div>
          </aside>
        </section>

        <section className="writing section-pad" id="writing">
          <div className="writing-lead">
            <p className="section-label">Scholarship & writing</p>
            <h2>The unfinished is alive.</h2>
            <p>
              A poem is not a sealed object. Its revisions, contradictions,
              histories, and readers continue to make it happen.
            </p>
            <div className="subject-cloud" aria-label="Research subjects">
              <span>William Blake</span>
              <span>George Crabbe</span>
              <span>James Joyce</span>
              <span>Classical reception</span>
              <span>Literary systems</span>
            </div>
          </div>

          <div className="publication-list">
            <article className="publication-blake">
              <p className="publication-meta">Ph.D. dissertation · University of Washington · 2005</p>
              <h3>
                The Contexts and Production of William Blake’s “The Four Zoas”
              </h3>
              <p>
                A theory of Blake’s unfinished manuscript grounded in its
                material history, production, and continually changing form.
              </p>
              <ExternalLink href="https://cinema.washington.edu/people/travis-feldman">
                View the university record
              </ExternalLink>
            </article>
            <article>
              <p className="publication-meta">Studies in Romanticism · 2012</p>
              <h3>Controversial Crabbe: A “Namby-Pamby Mandeville”</h3>
              <p>
                An essay on the social realities, aesthetic controversy, and
                critical reception surrounding George Crabbe’s poetry.
              </p>
              <ExternalLink href="https://www.jstor.org/stable/24247222">
                View the publication
              </ExternalLink>
            </article>
            <article>
              <p className="publication-meta">Bryn Mawr Classical Review · 2002</p>
              <h3>Sappho, Poems and Fragments</h3>
              <p>
                A review of Stanley Lombardo’s translation and Pamela Gordon’s
                introduction, with particular attention to teaching and access.
              </p>
              <ExternalLink href="https://bmcr.brynmawr.edu/2002/2002.09.37">
                Read the review
              </ExternalLink>
            </article>
            <article>
              <p className="publication-meta">Bryn Mawr Classical Review · 2004</p>
              <h3>English Literature and Ancient Languages</h3>
              <p>
                A review of Kenneth Haynes’s study of Greek and Latin as active
                presences in English literary language.
              </p>
              <ExternalLink href="https://bmcr.brynmawr.edu/2004/2004.08.11/">
                Read the review
              </ExternalLink>
            </article>
          </div>
        </section>

        <section className="about section-pad" id="about">
          <div className="about-image">
            <img
              src="/images/work-6.jpg"
              alt="An interactive media installation responding to a raised hand"
            />
            <p>Interactive installation study, Portland</p>
          </div>
          <div className="about-copy">
            <p className="section-label">About</p>
            <h2>A humanist in the workshop.</h2>
            <p className="about-large">
              I’m a scholar, educator, designer, and musician whose path has run
              from comparative literature and classics to academic makerspaces,
              open-ended instruments, community events, and experimental sound.
            </p>
            <p>
              I hold a Ph.D. in Comparative Literature from the University of
              Washington, an M.A. in Classics from the University of Victoria,
              and a B.A. from St. John’s College. I taught literature before
              spending years directing a school makerspace. Across those
              settings, the question has remained remarkably consistent: how do
              people learn to see a system—and then gain the confidence to
              change it?
            </p>
            <p>
              I’m now based in Portland and open to thoughtful collaborations
              across learning design, creative technology, research, music, and
              community-facing projects.
            </p>
            <div className="about-links">
              <a className="button button-primary" href="mailto:moleculesynth@gmail.com">
                Email Travis
              </a>
              <ExternalLink href="https://github.com/moleculesynth" className="button button-secondary">
                GitHub
              </ExternalLink>
              <ExternalLink href="https://www.behance.net/molecule" className="button button-secondary">
                Behance
              </ExternalLink>
            </div>
          </div>
        </section>

        <section className="contact section-pad">
          <p className="section-label">Start somewhere</p>
          <h2>Bring me a problem that won’t stay in its category.</h2>
          <a href="mailto:moleculesynth@gmail.com">
            moleculesynth@gmail.com <Arrow />
          </a>
        </section>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Travis Feldman</p>
        <p>Scholar · maker · composer · educator</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
