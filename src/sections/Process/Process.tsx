import { SectionShell } from "../../components/SectionShell/SectionShell";
import { processStages } from "../../data/process";
import styles from "./Process.module.css";

export function Process() {
  return (
    <SectionShell id="process" numeral="III" wide>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Process</p>
        <h2 id="process-title">From spark to finished sky</h2>
        <p className={styles.lede}>
          Lorem ipsum stages of a single piece — a constellation of decisions rather than a wall of text.
        </p>
      </div>

      <ol className={styles.timeline}>
        {processStages.map((stage, index) => (
          <li key={stage.id} className={styles.stage}>
            <div
              className={styles.marker}
              style={{ background: stage.accent }}
              aria-hidden="true"
            />
            <div
              className={styles.swatch}
              style={{
                background: `linear-gradient(160deg, ${stage.accent}55, #e6dccb)`,
              }}
              aria-hidden="true"
            />
            <p className={styles.index}>0{index + 1}</p>
            <h3>{stage.title}</h3>
            <p>{stage.description}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
