import { useEffect, useRef, useState, type ReactNode } from "react";
import { observeReveal } from "../../hooks/revealObserver";
import styles from "./Reveal.module.css";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
  as?: "div" | "li";
};

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number | "some" | "all";
};

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
};

function useOpen() {
  const ref = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return observeReveal(node, setOpen);
  }, []);

  return { ref, open };
}

/** Page blocks: CSS stagger open L?R / close R?L */
export function RevealGroup({
  children,
  className = "",
}: RevealGroupProps) {
  const { ref, open } = useOpen();

  return (
    <div
      ref={ref as never}
      className={`${styles.group} ${className}`}
      data-open={open ? "true" : "false"}
    >
      {children}
    </div>
  );
}

export function RevealItem({
  children,
  className = "",
  as = "div",
}: RevealItemProps) {
  const Tag = as;
  return <Tag className={`${styles.item} ${className}`}>{children}</Tag>;
}

/** Single block / gallery card - CSS opacity, shared IntersectionObserver */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: RevealProps) {
  const { ref, open } = useOpen();
  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={`${styles.reveal} ${className}`}
      data-open={open ? "true" : "false"}
      style={delay ? { transitionDelay: open ? `${delay}s` : "0s" } : undefined}
    >
      {children}
    </Tag>
  );
}
