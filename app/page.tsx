import { minuteParticulars } from "./content";

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
            <h1>Travis Feldman.</h1>
            <p className="hero-fields">
              Literature, Learning, Experimental sound, Physical electronics.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Selected work <span aria-hidden="true">↓</span>
              </a>
              <a className="button button-secondary" href="mailto:moleculesynth@gmail.com">
                Email
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Molecule Synth modules">
            <img
              src="/images/portrait-cover.jpg"
              alt="A field of translucent green hexagonal Molecule Synth modules"
            />
          </div>
        </section>

        <section className="particulars section-pad" id="practice">
          <div className="particulars-heading">
            <p className="section-label">In practice</p>
            <p>Minute particulars · partial and ongoing</p>
          </div>
          <p className="particulars-lead">Exploring modes of</p>
          <ul className="particulars-list">
            {minuteParticulars.map((particular) => (
              <li key={particular}>{particular}</li>
            ))}
            <li>and so on</li>
          </ul>
        </section>

        <section className="work section-pad" id="work">
          <div className="section-heading">
            <div>
              <p className="section-label">Work</p>
              <h2>Make, play, revise.</h2>
            </div>
            <ul className="work-index">
              <li><strong>Molecule Synth</strong> — physical-electronics synthesizer and experimenter’s design set</li>
              <li><strong>PIJIN</strong> — spelling game of the spoken word</li>
              <li><strong>BPOW</strong> — DIY electronics as a medium of self-expression</li>
            </ul>
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
                  A physical-electronics synthesizer and experimenter’s design
                  set: snap-together building blocks for synthesis.
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
                <p className="project-type">Learning spaces · shared tools</p>
                <h3>Makerspaces</h3>
                <p>
                  I have worked in makerspaces in Shenzhen, Santiago, Chile,
                  and Portland, and designed school makerspaces in Portland
                  and Connecticut.
                </p>
              </div>
            </article>

            <article className="project project-acid project-nerve">
              <div className="project-content">
                <p className="project-type">Minute particular · Nerve Maps</p>
                <h3>Music & composition</h3>
                <p>
                  Experimental sound, percussion, phase-based structure,
                  emergent timbre, modulated texture, and liminal pulse.
                </p>
                <ExternalLink href="https://nervemaps.bandcamp.com" className="project-link">
                  Listen to Nerve Maps
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
                <p>A spelling game of the spoken word, built from the sounds of speech.</p>
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
                  DIY electronics as a medium of self-expression: circuit
                  bending, workshops, performances, and a public electronic
                  orchestra.
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
                src="/images/photo-1.jpg"
                alt="Street portrait of a woman in sunglasses caught in bright afternoon light"
              />
              <div className="project-content">
                <p className="project-type">Photography</p>
                <h3>Ways of seeing</h3>
                <p>
                  Portraits, objects, working environments, and invented scenes
                  photographed with an eye for people inside systems.
                </p>
                <ExternalLink href="https://www.behance.net/molecule" className="project-link">
                  View the work
                </ExternalLink>
              </div>
            </article>
          </div>
        </section>

        <section className="practice section-pad" id="learning">
          <div className="practice-copy">
            <p className="section-label">Learning & making</p>
            <h2>Room to find out.</h2>
            <p>
              My work with makerspaces brings a humanities practice to hands-on
              technology: prompts before prescriptions, shared objects across
              disciplines, and tools that leave people more able to pursue
              questions of their own.
            </p>
          </div>

          <ul className="practice-points">
            <li>Questions before answers</li>
            <li>Materials across disciplines</li>
            <li>Agency over novelty</li>
          </ul>

          <aside className="practice-paper">
            <p className="project-type">Related paper</p>
            <p>“Do We Need a New Epistemology for Learning as it Happens in 21st-Century Makerspaces?”</p>
            <ExternalLink href="https://ijamm.pubpub.org/pub/o9n1tv3t?readingCollection=7726e307">
              Read
            </ExternalLink>
          </aside>
        </section>

        <section className="writing section-pad" id="writing">
          <div className="writing-lead">
            <p className="section-label">Writing</p>
            <h2>Forms in motion.</h2>
            <p>Poems keep happening—in revision, transmission, and reading.</p>
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
            <h2>A reader among machines.</h2>
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
          <p className="section-label">Contact</p>
          <h2>Another arrangement?</h2>
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
