import styles from "./DecoDivider.module.css";

type DecoDividerProps = {
  variant?: "diamond" | "crest";
  className?: string;
};

const SRC: Record<NonNullable<DecoDividerProps["variant"]>, string> = {
  diamond: "/assets/artdeco/divider-diamond.svg",
  crest: "/assets/artdeco/divider-crest.svg",
};

export function DecoDivider({
  variant = "diamond",
  className = "",
}: DecoDividerProps) {
  return (
    <div
      className={`${styles.divider} ${variant === "crest" ? styles.crest : ""} ${className}`}
      aria-hidden="true"
    >
      <img src={SRC[variant]} alt="" className={styles.asset} />
    </div>
  );
}
