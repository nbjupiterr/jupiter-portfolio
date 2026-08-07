import { CelestialClock } from "../../components/CelestialClock/CelestialClock";
import { Wordmark } from "../../components/Wordmark/Wordmark";
import { site } from "../../data/site";
import styles from "./Hero.module.css";

type HeroProps = {
  onExplore: () => void;
};

const orbits = [
  { frame: styles.frameNear, path: styles.pathNear, planet: styles.planetNear },
  { frame: styles.frameMid, path: styles.pathMid, planet: styles.planetMid },
  { frame: styles.frameFar, path: styles.pathFar, planet: styles.planetFar },
] as const;

export function Hero({ onExplore }: HeroProps) {
  return (
    <section id="hero" className={styles.hero} aria-label="Opening">
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.lattice} />
        <div className={styles.vignette} />

        <CelestialClock className={styles.clock} />

        <div className={styles.orbits}>
          {orbits.map((orbit) => (
            <div
              key={orbit.frame}
              className={`${styles.orbitFrame} ${orbit.frame}`}
            >
              <div className={`${styles.orbitPath} ${orbit.path}`}>
                <span className={`${styles.planet} ${orbit.planet}`} />
              </div>
            </div>
          ))}
        </div>

        <span className={`${styles.spark} ${styles.sparkA}`} />
        <span className={`${styles.spark} ${styles.sparkB}`} />

        <span className={`${styles.corner} ${styles.tl}`} />
        <span className={`${styles.corner} ${styles.tr}`} />
        <span className={`${styles.corner} ${styles.bl}`} />
        <span className={`${styles.corner} ${styles.br}`} />
      </div>

      <div className={styles.content}>
        <p className={styles.kicker}>
          <span className={styles.kickerMark} />
          Celestial Archive
          <span className={styles.kickerMark} />
        </p>

        <Wordmark as="h1" size="hero" interactive={false} />

        <p className={styles.role}>{site.title}</p>
        <p className={styles.support}>
          Illustrations, design, personal studies, and commissions — gathered in one golden orbit.
        </p>

        <button
          type="button"
          className={styles.cta}
          onClick={onExplore}
          data-cursor="link"
        >
          Enter the archive
        </button>

        <p className={styles.scrollHint} aria-hidden="true">
          <span className={styles.scrollLine} />
          Scroll to travel
        </p>
      </div>
    </section>
  );
}
