import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArtworkModal } from "./components/ArtworkModal/ArtworkModal";
import {
  HorizontalScroll,
  type HorizontalScrollHandle,
} from "./components/HorizontalScroll/HorizontalScroll";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";
import { Navigation } from "./components/Navigation/Navigation";
import { ProgressIndicator } from "./components/ProgressIndicator/ProgressIndicator";
import { artworks, artworksByCategory, type Artwork } from "./data/artworks";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { scrollPanelToSection } from "./utils/scrollPanelToSection";
import { About } from "./sections/About/About";
import { Contact } from "./sections/Contact/Contact";
import { Gallery } from "./sections/Gallery/Gallery";
import { Hero } from "./sections/Hero/Hero";
import { Process } from "./sections/Process/Process";
import "./styles/global.css";

const SECTION_LABELS: Record<string, string> = {
  hero: "I · Opening",
  about: "II · About",
  process: "III · Process",
  gallery: "IV · Gallery",
  contact: "V · Contact",
};

function App() {
  const isDesktop = useMediaQuery("(min-width: 900px)");
  const scrollRef = useRef<HorizontalScrollHandle>(null);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("hero");
  const [selected, setSelected] = useState<Artwork | null>(null);
  const [gallerySet, setGallerySet] = useState<Artwork[]>(() =>
    artworksByCategory("design"),
  );
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(12);

  useEffect(() => {
    let done = false;
    let frame = 0;
    let hideTimer = 0;
    const started = performance.now();

    const complete = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(frame);
      setLoadProgress(100);
      hideTimer = window.setTimeout(() => setLoading(false), 280);
    };

    const tick = (now: number) => {
      if (done) return;
      setLoadProgress(Math.min(92, 12 + (now - started) / 16));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    const maxWait = window.setTimeout(complete, 800);
    window.addEventListener("load", complete, { once: true });
    if (document.readyState === "complete") {
      window.setTimeout(complete, 350);
    }

    return () => {
      done = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(hideTimer);
      window.clearTimeout(maxWait);
      window.removeEventListener("load", complete);
    };
  }, []);

  const onScrollProgress = useCallback((value: number, id: string) => {
    setProgress(value);
    setActiveId(id);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const container = scrollRef.current?.element;
    if (container && container.scrollWidth > container.clientWidth + 2) {
      const align = id === "gallery" ? "start" : "center";
      scrollPanelToSection(container, target, "smooth", align);
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const navActiveId = activeId === "hero" ? "" : activeId;

  const modalSet = useMemo(() => {
    if (!selected) return gallerySet;
    if (gallerySet.some((piece) => piece.id === selected.id)) return gallerySet;
    return artworks.filter((piece) => piece.category === selected.category);
  }, [gallerySet, selected]);

  return (
    <>
      <LoadingScreen visible={loading} progress={loadProgress} />
      <div className="app-shell" aria-busy={loading}>
        <Navigation activeId={navActiveId} onNavigate={scrollToSection} />
        <ProgressIndicator
          progress={progress}
          label={SECTION_LABELS[activeId] ?? "Archive"}
        />

        <HorizontalScroll
          ref={scrollRef}
          enabled={isDesktop}
          onScrollProgress={onScrollProgress}
        >
          <Hero onExplore={() => scrollToSection("about")} />
          <About />
          <Process />
          <Gallery onSelect={setSelected} onFilterChange={setGallerySet} />
          <Contact onBackToStart={() => scrollToSection("hero")} />
        </HorizontalScroll>

        <ArtworkModal
          artwork={selected}
          artworks={modalSet}
          onClose={() => setSelected(null)}
          onNavigate={setSelected}
        />
      </div>
    </>
  );
}

export default App;
