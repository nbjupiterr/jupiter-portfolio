import { createContext, useContext, type RefObject } from "react";

/** Horizontal scroller element ref (desktop), or null for window scroll. */
export const ScrollRootContext =
  createContext<RefObject<Element | null> | null>(null);

export function useScrollRoot() {
  return useContext(ScrollRootContext);
}
