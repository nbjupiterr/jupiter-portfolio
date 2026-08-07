/** Scroll a horizontal panel so `section` is centered in the scroller viewport. */
export function scrollPanelToSection(
  scroller: HTMLElement,
  section: HTMLElement,
  behavior: ScrollBehavior = "smooth",
) {
  const max = scroller.scrollWidth - scroller.clientWidth;
  const left =
    section.offsetLeft + section.clientWidth / 2 - scroller.clientWidth / 2;
  scroller.scrollTo({
    left: Math.max(0, Math.min(max, left)),
    behavior,
  });
}
