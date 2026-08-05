import { SectionShell } from "../../components/SectionShell/SectionShell";
import { site } from "../../data/site";
import styles from "./About.module.css";

export function About() {
  return (
    <SectionShell id="about" numeral="II">
      <div className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>About</p>
          <h2 id="about-title" className={styles.name}>
            {site.name}
          </h2>
          <p className={styles.bio}>{site.bio}</p>
          <p className={styles.focus}>{site.focus}</p>
        </div>

        <div className={styles.portrait} aria-hidden="true">
          <div className={styles.frame}>
            <div className={styles.symbol}>
              <span className={styles.ring} />
              <span className={styles.core} />
            </div>
            <p>Signature mark</p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
