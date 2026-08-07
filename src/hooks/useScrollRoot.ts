import { createContext, useContext, type RefObject } from "react";

export const ScrollRootContext =
  createContext<RefObject<Element | null> | null>(null);

/** Horizontal (desktop) or null for window scroll (mobile). */
export function useScrollRoot() {
  return useContext(ScrollRootContext);
}
