/** 1 = scrolling left?right (forward), -1 = right?left (back) */
let direction: 1 | -1 = 1;
let lastPos = 0;
let attached: Element | Window | null = null;

function onScroll(this: Element | Window) {
  const pos =
    this instanceof Element ? this.scrollLeft : window.scrollY;
  if (pos > lastPos + 1) direction = 1;
  else if (pos < lastPos - 1) direction = -1;
  lastPos = pos;
}

/** Bind once to the horizontal scroller (or window on mobile). */
export function bindScrollDirection() {
  if (typeof window === "undefined") return;

  const scroller = document.querySelector(
    "[data-horizontal-scroller='true']",
  );

  const next: Element | Window = scroller ?? window;
  if (attached === next) return;

  if (attached) {
    attached.removeEventListener("scroll", onScroll as EventListener);
  }

  attached = next;
  lastPos = next instanceof Element ? next.scrollLeft : window.scrollY;
  next.addEventListener("scroll", onScroll as EventListener, {
    passive: true,
  });
}

export function getScrollDirection(): 1 | -1 {
  return direction;
}
