import styles from "./CelestialClock.module.css";

type CelestialClockProps = {
  className?: string;
};

/** Ornate gold line-art clock — hands animate like a vintage celestial timepiece. */
export function CelestialClock({ className = "" }: CelestialClockProps) {
  return (
    <div
      className={`${styles.clock} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 240 240" fill="none" className={styles.svg}>
        <g stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter">
          <circle cx="120" cy="120" r="112" strokeWidth="1.35" />
          <circle cx="120" cy="120" r="100" strokeWidth="0.9" opacity="0.65" />
          <circle cx="120" cy="120" r="88" strokeWidth="1.1" />

          {/* sunburst ring */}
          {Array.from({ length: 24 }, (_, i) => {
            const a = (i * 15 * Math.PI) / 180;
            const outer = i % 2 === 0 ? 84 : 80;
            const inner = i % 2 === 0 ? 72 : 74;
            const x1 = 120 + Math.cos(a) * inner;
            const y1 = 120 + Math.sin(a) * inner;
            const x2 = 120 + Math.cos(a) * outer;
            const y2 = 120 + Math.sin(a) * outer;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeWidth={i % 3 === 0 ? 1.2 : 0.85}
                opacity={i % 3 === 0 ? 0.9 : 0.55}
              />
            );
          })}

          {/* hour marks + fleur tips */}
          {Array.from({ length: 12 }, (_, i) => {
            const a = ((i * 30 - 90) * Math.PI) / 180;
            const x1 = 120 + Math.cos(a) * 92;
            const y1 = 120 + Math.sin(a) * 92;
            const x2 = 120 + Math.cos(a) * 104;
            const y2 = 120 + Math.sin(a) * 104;
            return (
              <g key={`m-${i}`}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  strokeWidth={i % 3 === 0 ? 1.6 : 1.1}
                />
              </g>
            );
          })}

          {/* cardinal diamonds */}
          <path d="M120 16l4 8-4 3-4-3z" fill="currentColor" stroke="none" />
          <path d="M120 213l4 8-4 3-4-3z" fill="currentColor" stroke="none" />
          <path d="M16 120l8 4-3 4-8-4z" fill="currentColor" stroke="none" />
          <path d="M213 120l8 4-3 4-8-4z" fill="currentColor" stroke="none" />

          {/* alchemy center: circle + triangle */}
          <circle cx="120" cy="120" r="22" strokeWidth="1" opacity="0.7" />
          <path d="M120 104 L134 130 H106 Z" strokeWidth="1" />

          {/* ornate hands — CSS-rotated from center */}
          <g className={styles.hourHand}>
            <path
              d="M120 120 L120 58"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M120 62l3.5 8-3.5 2.5-3.5-2.5z"
              fill="currentColor"
              stroke="none"
            />
            <path d="M116 120h8" strokeWidth="1.4" />
          </g>

          <g className={styles.minuteHand}>
            <path
              d="M120 120 L120 36"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M120 40l2.8 7-2.8 2-2.8-2z"
              fill="currentColor"
              stroke="none"
            />
          </g>

          <g className={styles.secondHand}>
            <path d="M120 128 L120 30" strokeWidth="0.75" opacity="0.75" />
            <circle cx="120" cy="120" r="2.2" fill="currentColor" stroke="none" />
          </g>

          <circle cx="120" cy="120" r="4.5" fill="currentColor" stroke="none" />
          <circle cx="120" cy="120" r="2" fill="var(--ivory)" stroke="none" />
        </g>
      </svg>
    </div>
  );
}
