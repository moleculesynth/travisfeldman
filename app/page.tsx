"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const Arrow = () => <span aria-hidden="true">↗</span>;

const optimizedImagePath = (src: string, size: "thumb" | "full") =>
  /^\/(art|artworks|images)\/.+\.jpe?g$/i.test(src) ? `/optimized/${size}${src}` : src;

const ArtworkImage = ({ alt, priority = false, size = "full", src, ...props }: Omit<React.ImgHTMLAttributes<HTMLImageElement>, "alt" | "src"> & {
  alt: string;
  priority?: boolean;
  size?: "thumb" | "full";
  src: string;
}) => (
  <img
    {...props}
    alt={alt}
    decoding="async"
    fetchPriority={priority ? "high" : undefined}
    loading={priority ? "eager" : "lazy"}
    src={optimizedImagePath(src, size)}
    srcSet={size === "full"
      ? `${optimizedImagePath(src, "thumb")} 1x, ${optimizedImagePath(src, "full")} 2x`
      : undefined}
  />
);

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
}) => {
  const alignLinkedProject = () => {
    if (!href.startsWith("#")) return;

    window.requestAnimationFrame(() => {
      const target = document.getElementById(href.slice(1));
      if (!target) return;

      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  return (
    <a href={href} onClick={alignLinkedProject}>
      <span>{children}</span>
      {year ? <time>{year}</time> : null}
    </a>
  );
};

type ArchiveImage = { src: string; alt: string; className?: string };
type ProjectThumbnailData = { src: string; alt: string; href?: string };
type ArchiveGridProps = {
  images: ReadonlyArray<ArchiveImage>;
  className?: string;
  shuffle?: boolean;
};

const hashString = (value: string) => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const shuffledImages = (images: ReadonlyArray<ArchiveImage>, seed: number) => {
  const result = [...images];
  let state = seed >>> 0;
  const random = () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
};

const ArchiveGrid = ({ images, className = "", shuffle = true }: ArchiveGridProps) => {
  const [dailySeed, setDailySeed] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const archiveKey = images.map(({ src }) => src).join("|");
  const orderedImages = useMemo(
    () => shuffle && dailySeed ? shuffledImages(images, dailySeed) : [...images],
    [dailySeed, images, shuffle],
  );

  useEffect(() => {
    if (!shuffle) return;
    const now = new Date();
    const day = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    setDailySeed(hashString(`${day}|${archiveKey}`));
  }, [archiveKey, shuffle]);

  const closeViewer = () => {
    setSelected(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const moveSelection = (direction: number) => {
    setSelected((current) => current === null
      ? null
      : (current + direction + orderedImages.length) % orderedImages.length);
  };

  useEffect(() => {
    if (selected === null) return;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft") moveSelection(-1);
      if (event.key === "ArrowRight") moveSelection(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [orderedImages.length, selected]);

  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const buttons = Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
    if (!buttons.length) return;
    const activeIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (event.shiftKey && activeIndex <= 0) {
      event.preventDefault();
      buttons.at(-1)?.focus();
    } else if (!event.shiftKey && activeIndex === buttons.length - 1) {
      event.preventDefault();
      buttons[0].focus();
    }
  };

  const activeImage = selected === null ? null : orderedImages[selected];

  return (
    <div className="archive-shell">
      <div className={`archive-grid ${className}`.trim()}>
        {orderedImages.map(({ src, alt, className: imageClass }, index) => (
          <figure className={imageClass} key={`${src}-${imageClass ?? index}`}>
            <button
              aria-label={`View ${alt} full screen`}
              className="archive-image-button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setSelected(index);
              }}
              type="button"
            >
              <ArtworkImage src={src} alt={alt} size="thumb" />
            </button>
          </figure>
        ))}
      </div>

      {activeImage ? (
        <div
          aria-label="Full-screen image viewer"
          aria-modal="true"
          className="archive-lightbox"
          onClick={(event) => {
            if (event.currentTarget === event.target) closeViewer();
          }}
          onKeyDown={trapFocus}
          ref={dialogRef}
          role="dialog"
        >
          <button aria-label="Close full-screen image" className="lightbox-close" onClick={closeViewer} ref={closeButtonRef} type="button">[close]</button>
          <button aria-label="Previous image" className="lightbox-previous" onClick={() => moveSelection(-1)} type="button">[←]</button>
          <figure>
            <ArtworkImage src={activeImage.src} alt={activeImage.alt} />
            <figcaption>{selected! + 1} / {orderedImages.length} · {activeImage.alt}</figcaption>
          </figure>
          <button aria-label="Next image" className="lightbox-next" onClick={() => moveSelection(1)} type="button">[→]</button>
        </div>
      ) : null}
    </div>
  );
};

const numberedArchive = (prefix: string, count: number, description: string, excluded: ReadonlyArray<number> = []) =>
  Array.from({ length: count }, (_, index) => index + 1)
    .filter((number) => !excluded.includes(number))
    .map((number) => ({
      src: `/art/${prefix}-${String(number).padStart(2, "0")}.jpg`,
      alt: `${description} ${number}`,
    }));

const ProjectThumbnail = ({ thumbnail, expanded, onToggle, controlsId }: {
  thumbnail: ProjectThumbnailData;
  expanded?: boolean;
  onToggle?: () => void;
  controlsId?: string;
}) => {
  const image = <ArtworkImage alt={thumbnail.alt} size="thumb" src={thumbnail.src} />;

  if (onToggle) {
    return (
      <button
        aria-controls={controlsId}
        aria-expanded={expanded}
        aria-label={expanded ? `Close image gallery for ${thumbnail.alt}` : `Open image gallery for ${thumbnail.alt}`}
        className="project-header-thumbnail"
        onClick={onToggle}
        type="button"
      >
        {image}
      </button>
    );
  }

  if (thumbnail.href) {
    return (
      <a aria-label={`Open ${thumbnail.alt}`} className="project-header-thumbnail" href={thumbnail.href} rel="noreferrer" target="_blank">
        {image}
      </a>
    );
  }

  return <figure className="project-header-thumbnail">{image}</figure>;
};

const ProjectHeader = ({ title, year, links, thumbnail, expanded, onToggle, controlsId }: {
  title: React.ReactNode;
  year?: string;
  links?: React.ReactNode;
  thumbnail?: ProjectThumbnailData;
  expanded?: boolean;
  onToggle?: () => void;
  controlsId?: string;
}) => (
  <header className="project-header">
    <div className={`project-heading-layout${thumbnail ? " project-heading-layout-compact" : ""}`}>
      <div className="project-heading-copy">
        <div className="project-title-row">
          {onToggle ? (
            <div className="project-title-actions">
              <button className="project-title-button" onClick={onToggle} type="button">
                <h2>{title}</h2>
              </button>
              <div className="project-control-row">
                <button
                  aria-controls={controlsId}
                  aria-expanded={expanded}
                  aria-label={expanded ? "Close image gallery" : "Open image gallery"}
                  className="project-toggle-button"
                  onClick={onToggle}
                  type="button"
                >
                  {expanded ? "[−]" : "[+]"}
                </button>
              </div>
            </div>
          ) : <h2>{title}</h2>}
          {year ? <time>{year}</time> : null}
        </div>
        {links ? <div className="project-links">{links}</div> : null}
      </div>
      {thumbnail ? <ProjectThumbnail controlsId={controlsId} expanded={expanded} onToggle={onToggle} thumbnail={thumbnail} /> : null}
    </div>
  </header>
);

const ExpandableProject = ({ id, className, title, year, links, thumbnail, preview, more }: {
  id: string;
  className: string;
  title: React.ReactNode;
  year?: string;
  links?: React.ReactNode;
  thumbnail?: ProjectThumbnailData;
  preview?: React.ReactNode;
  more?: React.ReactElement<ArchiveGridProps>;
}) => {
  const [expanded, setExpanded] = useState(false);
  const controlsId = `${id}-more`;

  return (
    <section className={`gallery-project ${className}`} id={id}>
      <ProjectHeader
        title={title}
        year={year}
        links={links}
        thumbnail={thumbnail}
        expanded={expanded}
        onToggle={more ? () => setExpanded((value) => !value) : undefined}
        controlsId={more ? controlsId : undefined}
      />
      {more ? (
        <div className="expanded-view" hidden={!expanded} id={controlsId}>
          {expanded ? more : null}
        </div>
      ) : null}
      {preview ? <div className="project-preview">{preview}</div> : null}
    </section>
  );
};

const microArchive = [
  ...numberedArchive("micro-more", 9, "Micrographia study"),
  ...numberedArchive("micro-extra", 7, "Additional Micrographia study", [1, 2, 3, 4, 5, 7]),
];
const nightArchive = [
  ...numberedArchive("night-more", 6, "Night Shift photograph", [4, 5, 6]),
  ...numberedArchive("night-extra", 12, "Additional Night Shift photograph"),
  ...[7, 1, 4, 2, 3, 5].map((number) => ({
    src: `/art/micro-extra-${String(number).padStart(2, "0")}.jpg`,
    alt: `Night Shift photograph ${number}`,
  })),
];
const treeArchive = [
  ...[13, 19, 25, 43, 58, 82].map((number) => ({ src: `/art/trees-${number}.jpg`, alt: `100 Trees sequence, position ${number}` })),
  ...numberedArchive("trees-more-new", 12, "Additional 100 Trees photograph"),
  ...numberedArchive("trees-extra", 24, "Additional 100 Trees photograph"),
];
const selvaArchive = [
  ...[2184, 2317, 2398, 2700].map((number) => ({ src: `/art/selva-${number}.jpg`, alt: `Selva Oscura night study ${number}` })),
  ...numberedArchive("selva-more-new", 8, "Additional Selva Oscura photograph", [8]),
  ...numberedArchive("selva-extra", 24, "Additional Selva Oscura photograph", [1, 3, 11, 16, 17, 18, 23, 24]),
];
const metalArchive = [
  ...numberedArchive("metal-more", 30, "Welding and Woodwork study", [4, 18, 24, 30]),
  ...numberedArchive("metal-extra", 13, "Additional Welding and Woodwork study", [4, 8]),
];
const tarotArchive = [
  ...numberedArchive("tarot-archive", 18, "Tarot TV still", [18]),
  ...numberedArchive("tarot-extra", 5, "Additional Tarot TV still", [1, 3]),
];
const bpowArchive = numberedArchive("bpow-archive", 12, "BPOW workshop and performance photograph", [1]);
const consumerArchive = [
  { src: "/art/consumerisms-sungod.jpg", alt: "Four-eyed figure painted in muted earth tones" },
  { src: "/art/consumerisms-cosmos.jpg", alt: "New Cosmos painting" },
  { src: "/art/consumerisms-ikarus.jpg", alt: "Ikarus painting" },
  { src: "/art/consumer-more-new-03.jpg", alt: "Dark garden painting" },
  { src: "/art/consumer-more-new-05.jpg", alt: "Dark celestial landscape painting" },
  { src: "/art/consumerisms-view-1.jpg", alt: "Detail of a Consumerismos figure" },
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
];
const ganArtArchive = [...gantoonsArchive, ...moviePosterArchive];
const moleculeArchive = [
  ...[1, 4].map((number) => ({ src: `/images/work-${number}.jpg`, alt: `Molecule Synth view ${number}` })),
  { src: "/images/photo-3.jpg", alt: "Molecule Synth photograph 3" },
  { src: "/images/work-3.jpg", alt: "Illuminated Molecule Synth detail", className: "archive-crop crop-center" },
  { src: "/images/portrait-cover.jpg", alt: "Translucent Molecule Synth detail", className: "archive-crop crop-right" },
];
const shrinkArchive = [
  { src: "/art/shrink-forms.jpg", alt: "Colorful laser-cut forms assembled during a Shrink Circuits workshop" },
  { src: "/art/shrink-form-detail.jpg", alt: "Illuminated translucent form built during a Shrink Circuits workshop" },
  { src: "/art/shrink-soldering.jpg", alt: "Soldering a circuit in the Shrink Circuits Nomad Lab" },
  { src: "/art/shrink-kit.jpg", alt: "Shrink Circuits workshop kit" },
  { src: "/art/shrink-event.jpg", alt: "Participants at a Shrink Circuits event" },
  { src: "/art/shrink-board.jpg", alt: "Circular Shrink Circuits circuit board" },
  { src: "/art/shrink-circuits.jpg", alt: "A collection of Shrink Circuits boards" },
];
const prototypeArchive = numberedArchive("prototype-extra", 4, "Playable prototype development photograph");
const artworksArchive = [
  { src: "/artworks/creating-a-class-room.jpg", alt: "Preparing the Artworks summer youth program classroom" },
  { src: "/artworks/new-signs-for-our-entrance.jpg", alt: "Hand-painted Artworks entrance signs drying in the studio" },
  { src: "/artworks/carol.jpg", alt: "Artworks participant Carol painting a panel" },
  { src: "/artworks/carols-panel.jpg", alt: "Carol's completed Artworks panel" },
  { src: "/artworks/fernando-scratches-his-head-what-next.jpg", alt: "Fernando considering the next step in his panel" },
  { src: "/artworks/fish.jpg", alt: "Fish mural panel from the Artworks program" },
  { src: "/artworks/snake.jpg", alt: "Snake mural panel from the Artworks program" },
  { src: "/artworks/zacs-bird.jpg", alt: "Zac's bird mural panel" },
  { src: "/artworks/the-jungle.jpg", alt: "Jungle mural panel from the Artworks program" },
  { src: "/artworks/circle.jpg", alt: "Painted circle created during the Artworks program" },
  { src: "/artworks/we-painted-a-ritual-circle.jpg", alt: "Participants painting a ritual circle" },
  { src: "/artworks/fearless.jpg", alt: "Fearless mural panel from the Artworks program" },
  { src: "/artworks/jester-1.jpg", alt: "Jester mural panel in progress" },
  { src: "/artworks/jester-2.jpg", alt: "Completed jester mural panel" },
  { src: "/artworks/laryan-and-his-son.jpg", alt: "LaRyan and his son at Artworks" },
  { src: "/artworks/hugh1.jpg", alt: "Hugh at the Artworks summer program" },
  { src: "/artworks/new-city-hall-construction-site.jpg", alt: "The new Seattle City Hall construction site in 2001" },
  { src: "/artworks/no-strange-poses-allowed.jpg", alt: "Artworks participants posing outside" },
  { src: "/artworks/view-of-the-walkway.jpg", alt: "Finished youth mural panels installed along the Artworks walkway" },
];

export default function Home() {
  return (
    <main className="portfolio-shell">
      <a className="skip-link" href="#gallery">Skip to images</a>

      <aside className="index-panel">
        <div className="identity">
          <h1>Travis Feldman</h1>
          <div className="identity-ledger">
            <p>works, exhibitions, recordings, writing</p>
          </div>
        </div>

        <nav className="work-index" aria-label="Work index">
          <section>
            <h2>IMAGE</h2>
            <IndexLink href="#micrographia" year="2025">Micrographia</IndexLink>
            <IndexLink href="#night-shift" year="2025">Night Shift</IndexLink>
            <IndexLink href="#hundred-trees" year="2024">100 Trees</IndexLink>
            <IndexLink href="#selva-oscura" year="2022–23">Selva Oscura</IndexLink>
            <IndexLink href="#gan-art" year="2018">GAN-Art</IndexLink>
            <IndexLink href="#consumerisms" year="2001–02">Consumerismos</IndexLink>
            <IndexLink href="#tarot-tv" year="2001">Tarot TV</IndexLink>
          </section>

          <section>
            <h2>SYSTEM</h2>
            <IndexLink href="#welding-woodwork" year="2016–23">Welding + Woodwork</IndexLink>
            <IndexLink href="#shrink-circuits" year="2013–18">Shrink Circuits</IndexLink>
            <IndexLink href="#molecule-synth" year="2012–18">Molecule Synth</IndexLink>
            <IndexLink href="#pijin" year="2013">PIJIN</IndexLink>
            <IndexLink href="#bpow" year="2013">BPOW!!!</IndexLink>
            <IndexLink href="#prototypes" year="2012–18">Playable prototypes</IndexLink>
            <IndexLink href="#artworks" year="2001">Artworks Summer Youth Program</IndexLink>
          </section>

          <section>
            <h2>SOUND</h2>
            <IndexLink href="#nerve-maps" year="2025–present">Nerve Maps</IndexLink>
            <IndexLink href="#many-mansions" year="2012–14">The Many Mansions</IndexLink>
          </section>

          <section>
            <h2>WRITING</h2>
            <IndexLink href="https://educ-met-site.sites.olt.ubc.ca/files/2023/05/Feldman_MET_25MAY2023.pdf" year="2023">Makerspaces as social systems</IndexLink>
            <IndexLink href="https://ijamm.pubpub.org/pub/o9n1tv3t?readingCollection=7726e307" year="2022">Learning in makerspaces</IndexLink>
            <IndexLink href="https://www.jstor.org/stable/24247222" year="2012">Controversial Crabbe</IndexLink>
            <IndexLink href="https://cinema.washington.edu/people/travis-feldman" year="2005">William Blake / The Four Zoas</IndexLink>
            <IndexLink href="https://bmcr.brynmawr.edu/2004/2004.08.11/" year="2004">English Literature and Ancient Languages</IndexLink>
            <IndexLink href="https://bmcr.brynmawr.edu/2002/2002.09.37" year="2002">Sappho: Poems and Fragments</IndexLink>
          </section>
        </nav>

        <div className="index-footer">
          <a href="mailto:moleculesynth@gmail.com">email</a>
          <ExternalLink href="https://github.com/moleculesynth">github</ExternalLink>
        </div>
      </aside>

      <div className="gallery-panel" id="gallery">
        <ExpandableProject
          id="nerve-maps"
          className="project-sound"
          title="Nerve Maps"
          year="2025–present"
          links={<ExternalLink href="https://nervemaps.bandcamp.com">Listen on Bandcamp</ExternalLink>}
          thumbnail={{ src: "/images/nerve-maps.jpg", alt: "Nerve Maps cover image", href: "https://nervemaps.bandcamp.com" }}
        />

        <ExpandableProject
          id="micrographia"
          className="project-micro"
          title="Micrographia"
          year="2025"
          preview={
            <div className="micro-stream">
              <figure className="micro-a"><ArtworkImage priority src="/art/micro-cicadas.jpg" alt="Three cicada specimens arranged on white" /></figure>
              <figure className="micro-b"><ArtworkImage src="/art/micro-spore.jpg" alt="A thorny seed pod photographed as a specimen" /></figure>
              <figure className="micro-c"><ArtworkImage src="/art/micro-butterfly-ray.jpg" alt="Rayogram of a butterfly on a deep gray field" /></figure>
              <figure className="micro-d"><ArtworkImage src="/art/micro-town-council.jpg" alt="Three translucent insect forms facing one another" /></figure>
            </div>
          }
          more={<ArchiveGrid images={microArchive} />}
        />

        <ExpandableProject
          id="night-shift"
          className="project-night"
          title="Night Shift"
          year="2025"
          preview={
            <div className="night-stream">
              <figure className="night-a"><ArtworkImage src="/art/night-void-color.jpg" alt="A brightly illuminated office building at night" /></figure>
              <figure className="night-b"><ArtworkImage src="/art/night-skyward.jpg" alt="A night building stretched into vertical trails of light" /></figure>
              <figure className="night-c"><ArtworkImage src="/art/night-skyward-2.jpg" alt="A high-key building dissolving into vertical streaks" /></figure>
            </div>
          }
          more={<ArchiveGrid images={nightArchive} />}
        />

        <ExpandableProject
          id="hundred-trees"
          className="project-trees"
          title="100 Trees"
          year="2024"
          preview={
            <div className="trees-stream" aria-label="100 Trees seasonal sequence">
              <figure><ArtworkImage src="/art/trees-01.jpg" alt="The tree at a rocky overlook in late autumn" /><figcaption>01</figcaption></figure>
              <figure><ArtworkImage src="/art/trees-07.jpg" alt="The same tree against a darkening autumn sky" /><figcaption>07</figcaption></figure>
              <figure><ArtworkImage src="/art/trees-35.jpg" alt="The same tree and overlook covered in snow" /><figcaption>35</figcaption></figure>
              <figure><ArtworkImage src="/art/trees-64.jpg" alt="The same tree as green returns to the hillside" /><figcaption>64</figcaption></figure>
              <figure><ArtworkImage src="/art/trees-73.jpg" alt="The same tree illuminated by warm seasonal light" /><figcaption>73</figcaption></figure>
              <figure><ArtworkImage src="/art/trees-95.jpg" alt="The same tree overlooking a fully green landscape" /><figcaption>95</figcaption></figure>
            </div>
          }
          more={<ArchiveGrid images={treeArchive} className="archive-trees" shuffle={false} />}
        />

        <ExpandableProject
          id="selva-oscura"
          className="project-selva"
          title={<><em>Selva</em> Oscura</>}
          year="2022–2023"
          preview={
            <div className="selva-stream">
              <figure className="selva-a"><ArtworkImage src="/art/selva-moon-trees.jpg" alt="Moonlight caught in the branches of old trees" /></figure>
              <figure className="selva-b"><ArtworkImage src="/art/selva-dusk-forest.jpg" alt="Dark tree trunks against the last evening light" /></figure>
              <figure className="selva-c"><ArtworkImage src="/art/selva-moon-sky.jpg" alt="The moon above a dark horizon in a long exposure" /></figure>
              <figure className="selva-d"><ArtworkImage src="/art/selva-vertical-woods.jpg" alt="A vertical view through a dim forest canopy" /></figure>
              <figure className="selva-e"><ArtworkImage src="/art/selva-lit-woods.jpg" alt="Dense woodland glowing with gathered evening light" /></figure>
              <figure className="selva-f"><ArtworkImage src="/art/selva-stars.jpg" alt="Stars recorded in a deep blue night sky" /></figure>
            </div>
          }
          more={<ArchiveGrid images={selvaArchive} />}
        />

        <ExpandableProject
          id="gan-art"
          className="project-gantoons"
          title="GAN-Art"
          year="Berlin · 2018"
          links={<><ExternalLink href="https://youtu.be/BNb0xTEe69I">GANtoons loop</ExternalLink><ExternalLink href="https://youtu.be/Ct37TbZJlrk">Comic Book Covers</ExternalLink><ExternalLink href="https://youtu.be/lmEL5HyCGRE">MoviePosterGAN</ExternalLink></>}
          thumbnail={{ src: "/art/gantoons-comic-loop.jpg", alt: "GAN-Art generated image sequence" }}
          more={<ArchiveGrid images={ganArtArchive} />}
        />

        <ExpandableProject
          id="welding-woodwork"
          className="project-metalworks"
          title="Welding + Woodwork"
          year="2016–2023"
          preview={
            <div className="metalworks-stream">
              <figure className="metal-a"><ArtworkImage src="/art/metal-speakers-pair.jpg" alt="A pair of handmade wooden speakers with exposed drivers" /></figure>
              <figure className="metal-b"><ArtworkImage src="/art/metal-shopbot.jpg" alt="A ShopBot CNC machine mounted on a heavy-duty welded frame" /></figure>
              <figure className="metal-c"><ArtworkImage src="/art/metal-whiteboard.jpg" alt="A large classroom whiteboard on a welded rolling base" /></figure>
              <figure className="metal-d"><ArtworkImage src="/art/metal-hex-tables.jpg" alt="Circular and hexagonal tables in fur, metal, unfinished wood, and lacquered wood" /></figure>
              <figure className="metal-e"><ArtworkImage src="/art/metal-speaker-wood.jpg" alt="A handmade wooden speaker enclosure" /></figure>
            </div>
          }
          more={<ArchiveGrid images={metalArchive} className="archive-metal" />}
        />

        <ExpandableProject
          id="shrink-circuits"
          className="project-shrink"
          title="Shrink Circuits Nomad Lab"
          year="2013–2018"
          links={<><ExternalLink href="http://shrinkcircuits.org/">Project site</ExternalLink><ExternalLink href="https://www.awesomefoundation.org/en/projects/30742-shrink-circuits-nomad-lab">Project record</ExternalLink></>}
          preview={
            <div className="shrink-stream">
              <figure className="shrink-a"><ArtworkImage src="/art/shrink-workshop.jpg" alt="A Shrink Circuits workshop gathered around a soldering station" /></figure>
              <figure><ArtworkImage src="/art/shrink-lights.jpg" alt="Small illuminated circuits built in a Shrink Circuits workshop" /></figure>
              <figure><ArtworkImage src="/images/work-2.jpg" alt="DISCO!! Extended Play circular Shrink Circuits board design" /></figure>
            </div>
          }
          more={<ArchiveGrid images={shrinkArchive} />}
        />

        <ExpandableProject
          id="pijin"
          className="project-pijin"
          title="PIJIN"
          year="2013"
          links={<><ExternalLink href="https://www.kickstarter.com/projects/travisfeldman/pijin-the-spelling-game-of-the-spoken-word">Kickstarter</ExternalLink><ExternalLink href="https://www.behance.net/gallery/14485693/Pijin">Visual archive</ExternalLink></>}
          thumbnail={{ src: "/images/pijin.jpg", alt: "PIJIN game session", href: "https://www.behance.net/gallery/14485693/Pijin" }}
        />

        <ExpandableProject
          id="bpow"
          className="project-bpow"
          title="BPOW!!!"
          year="2013"
          links={<><ExternalLink href="https://www.kickstarter.com/projects/travisfeldman/bpow-battery-powered-orchestra-workshop">Kickstarter</ExternalLink><ExternalLink href="https://makezine.com/article/craft/music/bpow-festival-celebrates-the-art-of-salvaged-sound/">Festival story</ExternalLink></>}
          thumbnail={{ src: "/art/bpow-stage.jpg", alt: "BPOW performance" }}
          more={<ArchiveGrid images={bpowArchive} />}
        />

        <ExpandableProject
          id="molecule-synth"
          className="project-molecule"
          title="Molecule Synth"
          year="2012–2018"
          links={<><ExternalLink href="https://www.kickstarter.com/projects/travisfeldman/molecule-synth">Kickstarter</ExternalLink><ExternalLink href="https://moleculesynth.com">Project site</ExternalLink></>}
          preview={
            <div className="molecule-stream">
              <figure className="molecule-a"><ArtworkImage src="/images/portrait-cover.jpg" alt="A field of translucent green Molecule Synth modules" /></figure>
              <figure className="molecule-b"><ArtworkImage src="/images/work-3.jpg" alt="An illuminated Molecule Synth assembled from hexagonal pieces" /></figure>
              <figure className="molecule-c"><ArtworkImage src="/images/work-1.jpg" alt="Wooden controllers arranged across the Molecule Synth surface" /></figure>
            </div>
          }
          more={<ArchiveGrid images={moleculeArchive} />}
        />

        <ExpandableProject
          id="prototypes"
          className="project-prototypes"
          title="Playable prototypes"
          year="2012–2018"
          thumbnail={{ src: "/art/prototype-swarmbots.jpg", alt: "Playable prototype swarm robots" }}
          more={<ArchiveGrid images={prototypeArchive} />}
        />

        <ExpandableProject
          id="many-mansions"
          className="project-many"
          title="The Many Mansions"
          year="2012–2014"
          links={<ExternalLink href="https://themanymansions.bandcamp.com/">Listen on Bandcamp</ExternalLink>}
          thumbnail={{ src: "/art/many-mansions-album.jpg", alt: "The Many Mansions — Early Retirement album artwork", href: "https://themanymansions.bandcamp.com/" }}
        />

        <ExpandableProject
          id="consumerisms"
          className="project-consumerisms"
          title="Consumerismos"
          year="2001–2002"
          thumbnail={{ src: "/art/consumerisms-sungod.jpg", alt: "Consumerismos four-eyed figure painting" }}
          more={<ArchiveGrid images={consumerArchive} />}
        />

        <ExpandableProject
          id="tarot-tv"
          className="project-tarot"
          title="Tarot TV"
          year="2001"
          thumbnail={{ src: "/art/tarot-conversation.jpg", alt: "Tarot TV video still" }}
          more={<ArchiveGrid images={tarotArchive} />}
        />

        <ExpandableProject
          id="artworks"
          className="project-artworks"
          title="Artworks Summer Youth Program"
          year="Seattle · 2001"
          thumbnail={{ src: "/artworks/view-of-the-walkway.jpg", alt: "Artworks youth mural walkway" }}
          more={<ArchiveGrid images={artworksArchive} shuffle={false} />}
        />

        <footer className="gallery-footer">
          <p>© {new Date().getFullYear()} Travis Feldman</p>
          <a href="#gallery">Back to top ↑</a>
        </footer>
      </div>
    </main>
  );
}
