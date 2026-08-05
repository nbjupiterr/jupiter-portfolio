import type { ReactNode } from "react";
import styles from "./SectionShell.module.css";

type SectionShellProps = {
  id: string;
  numeral?: string;
  wide?: boolean;
  scrollable?: boolean;
  children: ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  numeral,
  wide = false,
  scrollable = false,
  children,
  className = "",
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${wide ? styles.wide : ""} ${scrollable ? styles.scrollable : ""} ${className}`}
      aria-labelledby={`${id}-title`}
    >
      {numeral ? (
        <span className={styles.numeral} aria-hidden="true">
          {numeral}
        </span>
      ) : null}
      <div className={styles.inner}>{children}</div>
    </section>
  );
}
