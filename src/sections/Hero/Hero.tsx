import { Wordmark } from "../../components/Wordmark/Wordmark";
import { site } from "../../data/site";
import styles from "./Hero.module.css";

type HeroProps = {
  onExplore: () => void;
};

export function Hero({ onExplore }: HeroProps) {
  return (
    <section id="hero" className={styles.hero} aria-label="Opening">
      <div className={styles.sky} aria-hidden="true">
        <div className={`${styles.orbit} orbit-motion`} />
        <div className={`${styles.orbitInner} orbit-motion`} />
        <span className={styles.moon} />
        <span className={`${styles.star} ${styles.starA}`} />
        <span className={`${styles.star} ${styles.starB}`} />
        <span className={`${styles.star} ${styles.starC}`} />
        <span className={`${styles.star} ${styles.starD}`} />
      </div>

      <div className={styles.content}>
        <Wordmark as="h1" size="hero" />
        <p className={styles.title}>{site.title}</p>
        <p className={styles.support}>
          A vintage celestial archive of characters, illustrations, and commissions.
        </p>
        <div className={styles.actions}>
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
      </div>
    </section>
  );
}
