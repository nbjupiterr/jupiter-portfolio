import styles from "./DecoDivider.module.css";

type DecoDividerProps = {
  variant?: "diamond" | "fan" | "hex";
  className?: string;
};

const SRC: Record<NonNullable<DecoDividerProps["variant"]>, string> = {
  diamond: "/assets/artdeco/divider-diamond.svg",
  fan: "/assets/artdeco/divider-fan.svg",
  hex: "/assets/artdeco/divider-diamond.svg",
};

export function DecoDivider({
  variant = "diamond",
  className = "",
}: DecoDividerProps) {
  return (
    <div
      className={`${styles.divider} ${className}`}
      aria-hidden="true"
    >
      <img src={SRC[variant]} alt="" className={styles.svg} />
    </div>
  );
}
