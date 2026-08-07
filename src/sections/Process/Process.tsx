import { DecoDivider } from "../../components/DecoDivider/DecoDivider";
import { SectionShell } from "../../components/SectionShell/SectionShell";
import { processStages } from "../../data/process";
import styles from "./Process.module.css";

export function Process() {
  return (
    <SectionShell id="process" numeral="III" wide className={styles.shell}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Process</p>
        <h2 id="process-title">From sketch to render</h2>
        <p className={styles.lede}>
          Stages of a single piece — line, color, light, and finish.
        </p>
        <DecoDivider variant="fan" />
      </div>

      <ol className={styles.timeline}>
        {processStages.map((stage, index) => (
          <li key={stage.id} className={styles.stage}>
            <div
              className={styles.marker}
              style={{ background: stage.accent }}
              aria-hidden="true"
            />
            <div className={styles.swatch}>
              <img
                src={stage.image}
                alt={`${stage.title} stage`}
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className={styles.index}>0{index + 1}</p>
            <h3>{stage.title}</h3>
            <p>{stage.description}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
