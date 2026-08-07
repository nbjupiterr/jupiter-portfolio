import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type ReactNode,
} from "react";
import { bindScrollDirection } from "../../hooks/scrollDirection";
import { ScrollRootContext } from "../../hooks/useScrollRoot";
import styles from "./HorizontalScroll.module.css";

type HorizontalScrollProps = {
  enabled: boolean;
  children: ReactNode;
  onScrollProgress: (progress: number, activeId: string) => void;
};

export type HorizontalScrollHandle = {
  element: HTMLElement | null;
};

const SECTION_IDS = [
  "hero",
  "about",
  "process",
  "gallery",
  "contact",
] as const;

export const HorizontalScroll = forwardRef<
  HorizontalScrollHandle,
  HorizontalScrollProps
>(function HorizontalScroll({ enabled, children, onScrollProgress }, ref) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    get element() {
      return scrollerRef.current;
    },
  }));

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let raf = 0;

    const update = () => {
      if (enabled) {
        const max = scroller.scrollWidth - scroller.clientWidth;
        const progress = max > 0 ? scroller.scrollLeft / max : 0;
        let activeId: string = "hero";
        let closest = Number.POSITIVE_INFINITY;

        for (const id of SECTION_IDS) {
          const section = document.getElementById(id);
          if (!section) continue;
          const center = section.offsetLeft + section.clientWidth / 2;
          const distance = Math.abs(
            center - (scroller.scrollLeft + scroller.clientWidth / 2),
          );
          if (distance < closest) {
            closest = distance;
            activeId = id;
          }
        }

        onScrollProgress(progress, activeId);
        return;
      }

      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      let activeId: string = "hero";
      let closest = Number.POSITIVE_INFINITY;

      for (const id of SECTION_IDS) {
        const section = document.getElementById(id);
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(
          rect.top + rect.height / 2 - window.innerHeight / 2,
        );
        if (distance < closest) {
          closest = distance;
          activeId = id;
        }
      }

      onScrollProgress(progress, activeId);
    };

    const scheduleUpdate = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    update();

    if (enabled) {
      const onWheel = (event: WheelEvent) => {
        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

        const target = event.target as HTMLElement | null;
        const nested = target?.closest<HTMLElement>(
          '[data-allow-vertical-scroll="true"]',
        );

        if (nested && nested.scrollHeight > nested.clientHeight + 2) {
          const overflowY = getComputedStyle(nested).overflowY;
          const canScrollNested =
            overflowY === "auto" ||
            overflowY === "scroll" ||
            overflowY === "overlay";

          if (canScrollNested) {
            const atTop = nested.scrollTop <= 0 && event.deltaY < 0;
            const atBottom =
              nested.scrollTop + nested.clientHeight >=
                nested.scrollHeight - 1 && event.deltaY > 0;
            if (!atTop && !atBottom) return;
          }
        }

        event.preventDefault();
        scroller.scrollLeft += event.deltaY;
      };

      scroller.addEventListener("scroll", scheduleUpdate, { passive: true });
      scroller.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("resize", scheduleUpdate);

      return () => {
        if (raf) window.cancelAnimationFrame(raf);
        scroller.removeEventListener("scroll", scheduleUpdate);
        scroller.removeEventListener("wheel", onWheel);
        window.removeEventListener("resize", scheduleUpdate);
      };
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [enabled, onScrollProgress]);

  useEffect(() => {
    bindScrollDirection();
    const id = window.requestAnimationFrame(() => bindScrollDirection());
    return () => window.cancelAnimationFrame(id);
  }, [enabled]);

  return (
    <ScrollRootContext.Provider value={enabled ? scrollerRef : null}>
      <div
        ref={scrollerRef}
        className={`${styles.scroller} ${enabled ? styles.horizontal : styles.vertical}`}
        data-horizontal-scroller={enabled ? "true" : undefined}
      >
        <div className={styles.track}>{children}</div>
      </div>
    </ScrollRootContext.Provider>
  );
});
