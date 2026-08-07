import type { ReactNode } from "react";
import styles from "./SectionShell.module.css";

type SectionShellProps = {
  id: string;
  numeral?: string;
  wide?: boolean;
  /** Grow with content for single-row galleries (horizontal site scroll). */
  fluid?: boolean;
  scrollable?: boolean;
  children: ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  numeral,
  wide = false,
  fluid = false,
  scrollable = false,
  children,
  className = "",
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${wide ? styles.wide : ""} ${fluid ? styles.fluid : ""} ${scrollable ? styles.scrollable : ""} ${className}`}
      aria-labelledby={`${id}-title`}
    >
      {numeral ? (
        <span className={styles.numeral} aria-hidden="true">
          {numeral}
        </span>
      ) : null}
      <div
        className={styles.inner}
        data-allow-vertical-scroll="true"
        data-section-inner="true"
      >
        {children}
      </div>
    </section>
  );
}
