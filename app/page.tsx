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

type ArchiveImage = { src: string; alt: string; caption?: string; className?: string };
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
            <figcaption>{selected! + 1} / {orderedImages.length} · {activeImage.caption ?? activeImage.alt}</figcaption>
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

const captionedArchive = (images: ReadonlyArray<readonly [src: string, alt: string, caption: string]>) =>
  images.map(([src, alt, caption]) => ({ src, alt, caption }));

const captionedImages = (images: ReadonlyArray<ArchiveImage>, captions: ReadonlyArray<string>) => {
  if (images.length !== captions.length) throw new Error("Every gallery image needs one caption");
  return images.map((image, index) => ({ ...image, caption: captions[index] }));
};

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

const ExpandableProject = ({ id, className, title, year, links, thumbnail, more }: {
  id: string;
  className: string;
  title: React.ReactNode;
  year?: string;
  links?: React.ReactNode;
  thumbnail?: ProjectThumbnailData;
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
    </section>
  );
};

const microArchive = captionedArchive([
  ["/art/micro-cicadas.jpg", "Three cicada specimens arranged on white", "Cicadidae"],
  ["/art/micro-spore.jpg", "A thorny seed pod photographed as a specimen", "Infructescence"],
  ["/art/micro-butterfly-ray.jpg", "Rayogram of a butterfly on a deep gray field", "Lepidoptera"],
  ["/art/micro-ya.jpg", "A seed pod resting in iridescent blue and pink light", "Iridescence"],
  ["/art/micro-ya-2.jpg", "A dried seed pod photographed as a specimen", "Diaspore"],
  ["/art/micro-ya-3.jpg", "A cicada specimen in a shallow white tray", "Imago"],
  ["/art/micro-ya-4.jpg", "A spherical seed head with its stem and dried leaf", "Peduncle"],
  ["/art/micro-ya-5.jpg", "Close view of the patterned surface of a spherical seed head", "Receptacle"],
  ["/art/micro-ya-6.jpg", "Two cicada shells facing one another", "Exuviae"],
  ["/art/micro-ya-74.jpg", "A whole acorn photographed as a specimen", "Quercus"],
  ["/art/micro-ya-75.jpg", "A butterfly specimen with blue and yellow wing markings", "Lepidoptera"],
  ["/art/micro-more-01.jpg", "An orange Chinese lantern husk on a pale pink field", "Calyx"],
  ["/art/micro-more-03.jpg", "An empty acorn cup photographed from above", "Cupule"],
  ["/art/micro-more-04.jpg", "An acorn showing its circular cut surface", "Cotyledon"],
  ["/art/micro-more-07.jpg", "Radiographic negative of three cicada specimens", "Radiograph"],
  ["/art/micro-more-08.jpg", "Radiographic negative of three curled cicada specimens", "Ventrad"],
  ["/art/micro-more-09.jpg", "Radiographic negative of a spiny seed pod", "Dehiscence"],
  ["/art/micro-extra-06.jpg", "Close view of a translucent membrane and its edge", "Blockade"],
]);
const nightArchive = captionedArchive([
  ["/art/night-void-color.jpg", "A brightly illuminated office building at night", "Fenestration"],
  ["/art/night-skyward.jpg", "A night building stretched into vertical trails of light", "Ascension"],
  ["/art/night-shift-1.jpg", "A tall stone entrance with a lit doorway at night", "Portal"],
  ["/art/night-shift-1-2.jpg", "A bare tree and utility lines silhouetted at dusk", "Transect"],
  ["/art/night-shift-1-3.jpg", "A low office building illuminated after dark", "Occupancy"],
  ["/art/night-shift-1-4.jpg", "An illuminated office tower seen across a road at night", "Beacon"],
  ["/art/night-shift-1-5.jpg", "A brick office building photographed at blue hour", "Crepuscule"],
  ["/art/night-shift-1-6.jpg", "Distant lights glowing beneath a dark clouded sky", "Skyglow"],
  ["/art/night-shift-1-7.jpg", "A squirrel in foliage framed by the edge of medium-format film", "Sciuridae"],
  ["/art/night-shift-1-8.jpg", "Power lines and utility structures framed by medium-format film", "Transmission"],
  ["/art/night-shift-1-10.jpg", "Tree branches rendered in high-contrast black and white", "Canopy"],
  ["/art/night-more-01.jpg", "Black-and-white medium-format view of a stop sign at an intersection", "Intersection"],
  ["/art/night-more-02.jpg", "Black-and-white medium-format view of bare branches", "Dormancy"],
  ["/art/night-more-03.jpg", "Rows of steel beams stacked along a street", "Stockpile"],
  ["/art/night-extra-02.jpg", "Black-and-white view of whitewashed street trees and houses", "Whitewash"],
  ["/art/night-extra-03.jpg", "Black-and-white street view with a passing car and utility lines", "Transit"],
  ["/art/night-extra-05.jpg", "Illuminated tiled entrance numbered 4926", "Threshold"],
  ["/art/night-extra-06.jpg", "Green utility enclosure behind a chain-link fence", "Enclosure"],
  ["/art/night-extra-07.jpg", "Low building illuminated by two streetlights at night", "Sodium"],
  ["/art/night-extra-08.jpg", "Black-and-white view of a symmetrical brick office entrance", "Symmetry"],
  ["/art/night-extra-10.jpg", "Overexposed office lawn and streetlights at night", "Bloom"],
  ["/art/night-extra-11.jpg", "Tall office buildings beneath dark storm clouds", "Front"],
  ["/art/night-extra-12.jpg", "Red brick facade with a large arched window", "Arch"],
  ["/art/micro-extra-07.jpg", "Railroad tracks and debris beneath a bridge", "Riparian"],
  ["/art/micro-extra-01.jpg", "Concrete and steel highway overpass seen from below", "Viaduct"],
  ["/art/micro-extra-04.jpg", "Bare tree and utility lines against a blue dusk sky", "Pollard"],
  ["/art/micro-extra-02.jpg", "Parallel bridge spans reflected in water", "Reflection"],
  ["/art/micro-extra-03.jpg", "Brick office and apartment buildings photographed at night", "Perimeter"],
  ["/art/micro-extra-05.jpg", "Pale stone office building at blue hour", "Institution"],
]);
const treeArchive = captionedImages([
  { src: "/art/trees-contact-sheet.jpg", alt: "Contact sheet of the 100 Trees sequence, frames 1 through 98" },
  ...[1, 7, 35, 64, 73, 95].map((number) => ({ src: `/art/trees-${String(number).padStart(2, "0")}.jpg`, alt: `100 Trees sequence, position ${number}` })),
  ...[13, 19, 25, 43, 58, 82].map((number) => ({ src: `/art/trees-${number}.jpg`, alt: `100 Trees sequence, position ${number}` })),
  ...numberedArchive("trees-more-new", 12, "Additional 100 Trees photograph"),
  ...numberedArchive("trees-extra", 24, "Additional 100 Trees photograph"),
], [
  "Index", "Sentinel", "Afterglow", "Snowpack", "Crown", "Autumn", "Vernation",
  "Sunburst", "Twilight", "Zenith", "Prospect", "Ridgeline", "Horizon",
  "Gloaming", "Overcast", "Haze", "Exposure", "Plateau", "Outlook", "Thaw",
  "Canopy", "Flush", "Rainfall", "Frondescence", "Saturation", "Weathering",
  "Lichen", "Scree", "Bedrock", "Needlefall", "Understory", "Outcrop", "Ridge",
  "Swale", "Xeric", "Montane", "Evergreen", "Rain", "Overstory", "Sunbreak",
  "Sapling", "Aperture", "Mist", "Succession", "Regrowth", "Budbreak", "Greening",
  "Vernal", "Runoff",
]);
const selvaArchive = captionedImages([
  { src: "/art/selva-moon-trees.jpg", alt: "Moonlight caught in the branches of old trees" },
  { src: "/art/selva-vertical-woods.jpg", alt: "A vertical view through a dim forest canopy" },
  { src: "/art/selva-lit-woods.jpg", alt: "Dense woodland glowing with gathered evening light" },
  { src: "/art/selva-stars.jpg", alt: "Stars recorded in a deep blue night sky" },
  ...[2184, 2317, 2398, 2700].map((number) => ({ src: `/art/selva-${number}.jpg`, alt: `Selva Oscura night study ${number}` })),
  ...numberedArchive("selva-more-new", 8, "Additional Selva Oscura photograph", [2, 5, 8]),
  ...numberedArchive("selva-extra", 24, "Additional Selva Oscura photograph", [1, 3, 5, 7, 8, 11, 12, 13, 16, 17, 18, 23, 24]),
], [
  "Lunation", "Colonnade", "Afterlight", "Firmament", "Meadow", "Entanglement",
  "Conjunction", "Thicket", "Nocturne", "Arbor", "Verge", "Lamplight", "Fallow",
  "Penumbra", "Forage", "Pasture", "Halo", "Silhouette", "Syzygy", "Dew",
  "Conifers", "Grove", "Ramification", "Constellation",
]);
const metalArchive = captionedImages([
  { src: "/art/metal-speakers-pair.jpg", alt: "A pair of handmade wooden speakers with exposed drivers" },
  { src: "/art/metal-hex-tables.jpg", alt: "Circular and hexagonal tables in fur, metal, unfinished wood, and lacquered wood" },
  ...numberedArchive("metal-more", 30, "Welding and Woodwork study", [3, 4, 6, 11, 18, 24, 30]),
  ...numberedArchive("metal-extra", 13, "Additional Welding and Woodwork study", [1, 4, 7, 8]),
], [
  "Resonance", "Tessellation", "Joinery", "Pedestal", "Enclosure", "Lacquer", "Studies",
  "Array", "Brace", "Modules", "Chassis", "Scaffold", "Grid", "Assembly", "Rack", "Cart",
  "Pairing", "Trestle", "Shelving", "Cabinetry", "Console", "Slab", "Worktable", "Partition",
  "Pegboard", "Nesting", "Upholstery", "Bench", "Amplification", "Lattice", "Sink", "Tooling",
  "Caddy", "Cobalt",
]);
const tarotArchive = captionedImages([
  { src: "/art/tarot-conversation.jpg", alt: "Tarot TV video still" },
  ...numberedArchive("tarot-archive", 18, "Tarot TV still", [18]),
  ...numberedArchive("tarot-extra", 5, "Additional Tarot TV still", [1, 3]),
], [
  "Oracle", "Assembly", "Procession", "Visage", "Gesture", "Threshold", "Countenance",
  "Apparition", "Silhouette", "Witness", "Aperture", "Interference", "Facade", "Streetscape",
  "Arcana", "Seated", "Arcade", "Static", "Phantom", "Profile", "Overlay",
]);
const bpowArchive = captionedImages([
  { src: "/art/bpow-stage.jpg", alt: "BPOW performance" },
  ...numberedArchive("bpow-archive", 12, "BPOW workshop and performance photograph", [1]),
], [
  "Performance", "Assembly", "Network", "Workshop", "Operator", "Demonstration",
  "Rehearsal", "Circuitry", "Interface", "Fabrication", "Signal", "Oscillation",
]);
const consumerArchive = [
  { src: "/art/consumerisms-sungod.jpg", alt: "Four-eyed figure painted in muted earth tones" },
  { src: "/art/consumerisms-cosmos.jpg", alt: "New Cosmos painting" },
  { src: "/art/consumerisms-ikarus.jpg", alt: "Ikarus painting" },
  { src: "/art/consumer-more-new-03.jpg", alt: "Dark garden painting" },
  { src: "/art/consumer-more-new-05.jpg", alt: "Dark celestial landscape painting" },
  { src: "/art/consumerisms-sage.jpg", alt: "Tall ink and wash Consumerismos figure on brown paper", className: "sage-thumbnail" },
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
const ganArtArchive = [
  { src: "/art/gantoons-comic-loop.jpg", alt: "GANtoons generated image sequence" },
  ...gantoonsArchive,
  ...moviePosterArchive,
];
const moleculeArchive = captionedImages([
  ...[1, 4].map((number) => ({ src: `/images/work-${number}.jpg`, alt: `Molecule Synth view ${number}` })),
  { src: "/images/photo-3.jpg", alt: "Molecule Synth photograph 3" },
  { src: "/images/work-3.jpg", alt: "Illuminated Molecule Synth detail", className: "archive-crop crop-center" },
  { src: "/images/portrait-cover.jpg", alt: "Translucent Molecule Synth detail", className: "archive-crop crop-right" },
], ["Topology", "Interface", "Dialogue", "Polyphony", "Colony"]);
const shrinkArchive = captionedImages([
  { src: "/art/shrink-workshop.jpg", alt: "A Shrink Circuits workshop gathered around a soldering station" },
  { src: "/art/shrink-lights.jpg", alt: "Small illuminated circuits built in a Shrink Circuits workshop" },
  { src: "/images/work-2.jpg", alt: "DISCO!! Extended Play circular Shrink Circuits board design" },
  { src: "/art/shrink-forms.jpg", alt: "Colorful laser-cut forms assembled during a Shrink Circuits workshop" },
  { src: "/art/shrink-form-detail.jpg", alt: "Illuminated translucent form built during a Shrink Circuits workshop" },
  { src: "/art/shrink-soldering.jpg", alt: "Soldering a circuit in the Shrink Circuits Nomad Lab" },
  { src: "/art/shrink-kit.jpg", alt: "Shrink Circuits workshop kit" },
  { src: "/art/shrink-event.jpg", alt: "Participants at a Shrink Circuits event" },
  { src: "/art/shrink-board.jpg", alt: "Circular Shrink Circuits circuit board" },
  { src: "/art/shrink-circuits.jpg", alt: "A collection of Shrink Circuits boards" },
], [
  "Assembly", "Luminescence", "Schematic", "Morphology", "Diffusion",
  "Solder", "Transfer", "Substrate", "Chromatics", "Polyhedra",
]);
const prototypeArchive = captionedImages([
  { src: "/art/prototype-swarmbots.jpg", alt: "Playable prototype swarm robots" },
  ...numberedArchive("prototype-extra", 4, "Playable prototype development photograph"),
], ["Swarm", "Etching", "Sensor", "Node", "Substrates"]);
const artworksArchive = captionedImages([
  { src: "/artworks/creating-a-class-room.jpg", alt: "Preparing the Artworks summer youth program classroom" },
  { src: "/artworks/new-signs-for-our-entrance.jpg", alt: "Hand-painted Artworks entrance signs drying in the studio" },
  { src: "/artworks/carol.jpg", alt: "Artworks participant Carol painting a panel" },
  { src: "/artworks/carols-panel.jpg", alt: "Carol's completed Artworks panel" },
  { src: "/artworks/fish.jpg", alt: "Fish mural panel from the Artworks program" },
  { src: "/artworks/snake.jpg", alt: "Snake mural panel from the Artworks program" },
  { src: "/artworks/zacs-bird.jpg", alt: "Zac's bird mural panel" },
  { src: "/artworks/the-jungle.jpg", alt: "Jungle mural panel from the Artworks program" },
  { src: "/artworks/we-painted-a-ritual-circle.jpg", alt: "Participants painting a ritual circle" },
  { src: "/artworks/fearless.jpg", alt: "Fearless mural panel from the Artworks program" },
  { src: "/artworks/jester-1.jpg", alt: "Jester mural panel in progress" },
  { src: "/artworks/jester-2.jpg", alt: "Completed jester mural panel" },
  { src: "/artworks/laryan-and-his-son.jpg", alt: "LaRyan and his son at Artworks" },
  { src: "/artworks/hugh1.jpg", alt: "Hugh at the Artworks summer program" },
  { src: "/artworks/new-city-hall-construction-site.jpg", alt: "The new Seattle City Hall construction site in 2001" },
  { src: "/artworks/no-strange-poses-allowed.jpg", alt: "Artworks participants posing outside" },
  { src: "/artworks/view-of-the-walkway.jpg", alt: "Finished youth mural panels installed along the Artworks walkway" },
], [
  "Atelier", "Wayfinding", "Preparation", "Triptych", "Ichthyology", "Serpentes",
  "Aves", "Understory", "Circumference", "Defiance", "Process", "Chimera", "Kinship",
  "Study", "Excavation", "Installation", "Promenade",
]);

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
            <IndexLink href="#selva-oscura" year="2022–23"><em>Selva Oscura</em></IndexLink>
            <IndexLink href="#gan-art" year="2018">GANtoons</IndexLink>
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
          thumbnail={{ src: "/art/micro-extra-06.jpg", alt: "Blockade: close view of a translucent membrane and its edge" }}
          more={<ArchiveGrid images={microArchive} />}
        />

        <ExpandableProject
          id="night-shift"
          className="project-night"
          title="Night Shift"
          year="2025"
          thumbnail={{ src: "/art/night-void-color.jpg", alt: "A brightly illuminated office building at night" }}
          more={<ArchiveGrid images={nightArchive} />}
        />

        <ExpandableProject
          id="hundred-trees"
          className="project-trees"
          title="100 Trees"
          year="2024"
          thumbnail={{ src: "/art/trees-contact-sheet.jpg", alt: "Contact sheet of the 100 Trees sequence, frames 1 through 98" }}
          more={<ArchiveGrid images={treeArchive} className="archive-trees" shuffle={false} />}
        />

        <ExpandableProject
          id="writing-inclusive-makerspaces"
          className="project-writing"
          title="Makerspaces as social systems"
          year="2023"
          links={<ExternalLink href="https://educ-met-site.sites.olt.ubc.ca/files/2023/05/Feldman_MET_25MAY2023.pdf">View presentation</ExternalLink>}
          thumbnail={{
            src: "/images/writing-inclusive-makerspaces.jpg",
            alt: "Students building projects together around a makerspace worktable",
            href: "https://educ-met-site.sites.olt.ubc.ca/files/2023/05/Feldman_MET_25MAY2023.pdf",
          }}
        />

        <ExpandableProject
          id="selva-oscura"
          className="project-selva"
          title={<em>Selva Oscura</em>}
          year="2022–2023"
          thumbnail={{ src: "/art/selva-moon-trees.jpg", alt: "Moonlight caught in the branches of old trees" }}
          more={<ArchiveGrid images={selvaArchive} />}
        />

        <ExpandableProject
          id="writing-learning-makerspaces"
          className="project-writing"
          title="Learning in makerspaces"
          year="2022"
          links={<ExternalLink href="https://ijamm.pubpub.org/pub/o9n1tv3t?readingCollection=7726e307">Read article</ExternalLink>}
          thumbnail={{
            src: "/images/writing-learning-makerspaces.jpg",
            alt: "Red and green LEDs wired on breadboards to a Raspberry Pi",
            href: "https://ijamm.pubpub.org/pub/o9n1tv3t?readingCollection=7726e307",
          }}
        />

        <ExpandableProject
          id="gan-art"
          className="project-gantoons"
          title="GANtoons"
          year="Berlin · 2018"
          links={<><ExternalLink href="https://youtu.be/BNb0xTEe69I">GANtoons loop</ExternalLink><ExternalLink href="https://youtu.be/Ct37TbZJlrk">Comic Book Covers</ExternalLink><ExternalLink href="https://youtu.be/lmEL5HyCGRE">MoviePosterGAN</ExternalLink></>}
          thumbnail={{ src: "/art/gantoons-comic-loop.jpg", alt: "GANtoons generated image sequence" }}
          more={<ArchiveGrid images={ganArtArchive} />}
        />

        <ExpandableProject
          id="welding-woodwork"
          className="project-metalworks"
          title="Welding + Woodwork"
          year="2016–2023"
          thumbnail={{ src: "/art/metal-speakers-pair.jpg", alt: "A pair of handmade wooden speakers with exposed drivers" }}
          more={<ArchiveGrid images={metalArchive} className="archive-metal" />}
        />

        <ExpandableProject
          id="shrink-circuits"
          className="project-shrink"
          title="Shrink Circuits Nomad Lab"
          year="2013–2018"
          links={<><ExternalLink href="http://shrinkcircuits.org/">Project site</ExternalLink><ExternalLink href="https://www.awesomefoundation.org/en/projects/30742-shrink-circuits-nomad-lab">Project record</ExternalLink></>}
          thumbnail={{ src: "/art/shrink-workshop.jpg", alt: "A Shrink Circuits workshop gathered around a soldering station" }}
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
          title="Battery Powered Orchestra Workshop (BPOW!!!)"
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
          thumbnail={{ src: "/images/portrait-cover.jpg", alt: "A field of translucent green Molecule Synth modules" }}
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
          id="writing-controversial-crabbe"
          className="project-writing"
          title="Controversial Crabbe"
          year="2012"
          links={<><ExternalLink href="https://www.jstor.org/stable/24247222">Read on JSTOR</ExternalLink><ExternalLink href="https://commons.wikimedia.org/wiki/File:George_Crabbe_by_Henry_William_Pickersgill.jpg">Image: Henry William Pickersgill · public domain</ExternalLink></>}
          thumbnail={{
            src: "/images/writing-crabbe.jpg",
            alt: "Henry William Pickersgill's portrait of George Crabbe",
            href: "https://www.jstor.org/stable/24247222",
          }}
        />

        <ExpandableProject
          id="writing-four-zoas"
          className="project-writing"
          title="William Blake / The Four Zoas"
          year="2005"
          links={<><ExternalLink href="https://cinema.washington.edu/people/travis-feldman">View research record</ExternalLink><ExternalLink href="https://commons.wikimedia.org/wiki/File:Bb209.1.3.ms.300.jpg">Image: William Blake, <em>The Four Zoas</em> · public domain</ExternalLink></>}
          thumbnail={{
            src: "/images/writing-four-zoas.jpg",
            alt: "William Blake's manuscript page for Vala, or The Four Zoas",
            href: "https://cinema.washington.edu/people/travis-feldman",
          }}
        />

        <ExpandableProject
          id="writing-ancient-languages"
          className="project-writing"
          title="English Literature and Ancient Languages"
          year="2004"
          links={<><ExternalLink href="https://bmcr.brynmawr.edu/2004/2004.08.11/">Read review</ExternalLink><ExternalLink href="https://commons.wikimedia.org/wiki/File:Milton_Dictating_to_His_Daughter,_Henry_Fuseli_1794.jpg">Image: Henry Fuseli, 1794 · public domain</ExternalLink></>}
          thumbnail={{
            src: "/images/writing-ancient-languages.jpg",
            alt: "Henry Fuseli's painting of Milton dictating Paradise Lost to his daughter",
            href: "https://bmcr.brynmawr.edu/2004/2004.08.11/",
          }}
        />

        <ExpandableProject
          id="writing-sappho"
          className="project-writing"
          title="Sappho: Poems and Fragments"
          year="2002"
          links={<><ExternalLink href="https://bmcr.brynmawr.edu/2002/2002.09.37">Read review</ExternalLink><ExternalLink href="https://commons.wikimedia.org/wiki/File:Malarz_Safony_-_Kalpis_wykonana_technik%C4%85_Six.jpg">Image: Sappho Painter kalpis · public domain</ExternalLink></>}
          thumbnail={{
            src: "/images/writing-sappho.jpg",
            alt: "Ancient black-glaze kalpis depicting Sappho with a barbitos",
            href: "https://bmcr.brynmawr.edu/2002/2002.09.37",
          }}
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
