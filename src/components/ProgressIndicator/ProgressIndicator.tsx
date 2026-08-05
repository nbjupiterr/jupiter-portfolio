import styles from "./ProgressIndicator.module.css";

type ProgressIndicatorProps = {
  progress: number;
  label: string;
};

export function ProgressIndicator({ progress, label }: ProgressIndicatorProps) {
  const clamped = Math.min(1, Math.max(0, progress));

  return (
    <div
      className={styles.progress}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped * 100)}
      aria-label="Portfolio scroll progress"
    >
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${clamped * 100}%` }} />
        <span
          className={styles.star}
          style={{ left: `calc(${clamped * 100}% - 0.3rem)` }}
          aria-hidden="true"
        />
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
