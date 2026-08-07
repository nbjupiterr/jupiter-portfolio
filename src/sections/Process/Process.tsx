import { DecoDivider } from "../../components/DecoDivider/DecoDivider";
import { DecoFrame } from "../../components/DecoFrame/DecoFrame";
import { RevealGroup, RevealItem } from "../../components/Reveal/Reveal";
import { SectionShell } from "../../components/SectionShell/SectionShell";
import { processStages } from "../../data/process";
import styles from "./Process.module.css";

export function Process() {
  return (
    <SectionShell id="process" numeral="III" wide className={styles.shell}>
      <RevealGroup className={styles.stack} stagger={0.15} amount="some">
        <RevealItem className={styles.header} y={18}>
          <p className={styles.eyebrow}>Process</p>
          <h2 id="process-title">From sketch to render</h2>
          <p className={styles.lede}>
            Stages of a single piece — line, color, light, and finish.
          </p>
          <DecoDivider variant="diamond" />
        </RevealItem>

        {processStages.map((stage, index) => (
          <RevealItem key={stage.id} className={styles.stage} y={30}>
            <div
              className={styles.marker}
              style={{ background: stage.accent }}
              aria-hidden="true"
            />
            <DecoFrame className={styles.swatchFrame}>
              <div className={styles.swatch}>
                <img
                  src={stage.image}
                  alt={`${stage.title} stage`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </DecoFrame>
            <p className={styles.index}>0{index + 1}</p>
            <h3>{stage.title}</h3>
            <p>{stage.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}
