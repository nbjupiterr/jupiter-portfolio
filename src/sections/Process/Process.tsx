import { motion, useReducedMotion } from "motion/react";
import { DecoDivider } from "../../components/DecoDivider/DecoDivider";
import { DecoFrame } from "../../components/DecoFrame/DecoFrame";
import { Reveal } from "../../components/Reveal/Reveal";
import { SectionShell } from "../../components/SectionShell/SectionShell";
import { processStages } from "../../data/process";
import styles from "./Process.module.css";

export function Process() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionShell id="process" numeral="III" wide className={styles.shell}>
      <Reveal className={styles.header} y={18}>
        <p className={styles.eyebrow}>Process</p>
        <h2 id="process-title">From sketch to render</h2>
        <p className={styles.lede}>
          Stages of a single piece — line, color, light, and finish.
        </p>
        <DecoDivider variant="sunburst" />
      </Reveal>

      <ol className={styles.timeline}>
        {processStages.map((stage, index) => (
          <motion.li
            key={stage.id}
            className={styles.stage}
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.55,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
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
          </motion.li>
        ))}
      </ol>
    </SectionShell>
  );
}
