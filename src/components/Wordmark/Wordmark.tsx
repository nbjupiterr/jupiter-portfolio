import styles from "./Wordmark.module.css";

type WordmarkProps = {
  as?: "h1" | "p" | "span";
  size?: "hero" | "section" | "compact";
  interactive?: boolean;
};

const letters = ["J", "u", "p", "i", "t", "e", "r"];

export function Wordmark({
  as: Tag = "span",
  size = "section",
  interactive = true,
}: WordmarkProps) {
  return (
    <Tag
      className={`${styles.wordmark} ${styles[size]} ${interactive ? styles.interactive : ""}`}
      aria-label="Jupiter"
    >
      <span className={styles.ornament} aria-hidden="true" />
      <span className={styles.letters}>
        {letters.map((letter, index) => (
          <span key={`${letter}-${index}`} className={styles.letter}>
            {letter}
          </span>
        ))}
      </span>
      <span className={styles.ornament} aria-hidden="true" />
    </Tag>
  );
}
