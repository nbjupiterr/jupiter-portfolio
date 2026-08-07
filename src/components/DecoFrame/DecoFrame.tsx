import styles from "./DecoFrame.module.css";
import type { ReactNode } from "react";

type DecoFrameProps = {
  children: ReactNode;
  className?: string;
};

/** Art Deco corner brackets wrapping content — based on the ornament sheets. */
export function DecoFrame({ children, className = "" }: DecoFrameProps) {
  return (
    <div className={`${styles.frame} ${className}`}>
      <span className={`${styles.corner} ${styles.tl}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.tr}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.bl}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.br}`} aria-hidden="true" />
      {children}
    </div>
  );
}
