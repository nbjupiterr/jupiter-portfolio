import styles from "./DecoDivider.module.css";

type DecoDividerProps = {
  variant?: "diamond" | "fan" | "hex" | "sunburst" | "crest";
  className?: string;
};

const SRC: Record<NonNullable<DecoDividerProps["variant"]>, string> = {
  diamond: "/assets/artdeco/divider-diamond.svg",
  fan: "/assets/artdeco/divider-fan.svg",
  hex: "/assets/artdeco/divider-diamond.svg",
  sunburst: "/assets/artdeco/divider-sunburst.svg",
  crest: "/assets/artdeco/divider-crest.svg",
};

export function DecoDivider({
  variant = "diamond",
  className = "",
}: DecoDividerProps) {
  return (
    <div
      className={`${styles.divider} ${styles[variant] ?? ""} ${className}`}
      aria-hidden="true"
    >
      <img src={SRC[variant]} alt="" className={styles.asset} />
    </div>
  );
}
