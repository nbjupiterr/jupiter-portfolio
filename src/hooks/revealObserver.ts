import { bindScrollDirection, getScrollDirection } from "./scrollDirection";

type Listener = (open: boolean) => void;

const listeners = new WeakMap<Element, Listener>();
const state = new WeakMap<Element, boolean>();

let observer: IntersectionObserver | null = null;

const ENTER = 0.15;
const EXIT = 0.4;

function getObserver() {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      bindScrollDirection();
      const dir = getScrollDirection();

      for (const entry of entries) {
        const notify = listeners.get(entry.target);
        if (!notify) continue;

        const ratio = entry.intersectionRatio;
        const prev = state.get(entry.target) ?? false;
        let next = prev;

        if (entry.isIntersecting && ratio >= ENTER) {
          next = true;
        } else if (dir < 0 && (!entry.isIntersecting || ratio < EXIT)) {
          next = false;
        }

        if (next !== prev) {
          state.set(entry.target, next);
          notify(next);
        }
      }
    },
    {
      root: null,
      // Few thresholds = far less callback churn while scrolling
      threshold: [0, ENTER, EXIT],
    },
  );

  return observer;
}

export function observeReveal(node: Element, onChange: Listener) {
  bindScrollDirection();
  listeners.set(node, onChange);
  getObserver().observe(node);

  // Initial sync from current geometry
  const rect = node.getBoundingClientRect();
  const vw = window.innerWidth || 1;
  const visible = Math.max(
    0,
    Math.min(rect.right, vw) - Math.max(rect.left, 0),
  );
  const ratio = rect.width > 0 ? visible / rect.width : 0;
  const open = ratio >= ENTER;
  state.set(node, open);
  onChange(open);

  return () => {
    listeners.delete(node);
    state.delete(node);
    observer?.unobserve(node);
  };
}
