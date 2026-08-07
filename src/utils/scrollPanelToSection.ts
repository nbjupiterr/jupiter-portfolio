/** Scroll a horizontal panel; center by default or align section start to viewport. */
export function scrollPanelToSection(
  scroller: HTMLElement,
  section: HTMLElement,
  behavior: ScrollBehavior = "smooth",
  align: "center" | "start" = "center",
) {
  const max = scroller.scrollWidth - scroller.clientWidth;
  const left =
    align === "start"
      ? section.offsetLeft
      : section.offsetLeft + section.clientWidth / 2 - scroller.clientWidth / 2;
  scroller.scrollTo({
    left: Math.max(0, Math.min(max, left)),
    behavior,
  });
}
