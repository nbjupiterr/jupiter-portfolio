import { DecoDivider } from "../../components/DecoDivider/DecoDivider";
import { Reveal } from "../../components/Reveal/Reveal";
import { Wordmark } from "../../components/Wordmark/Wordmark";
import { SectionShell } from "../../components/SectionShell/SectionShell";
import { site } from "../../data/site";
import styles from "./Contact.module.css";

type ContactProps = {
  onBackToStart: () => void;
};

export function Contact({ onBackToStart }: ContactProps) {
  return (
    <SectionShell id="contact" numeral="V">
      <Reveal className={styles.layout} y={26}>
        <Wordmark size="section" />
        <DecoDivider variant="sunburst" />
        <h2 id="contact-title" className={styles.heading}>
          Until the next orbit
        </h2>
        <p className={styles.closing}>{site.closing}</p>

        <a
          className={styles.linktree}
          href={site.linktree}
          target="_blank"
          rel="noreferrer"
          data-cursor="link"
        >
          Open Linktree
        </a>

        <button
          type="button"
          className={styles.back}
          onClick={onBackToStart}
          data-cursor="link"
        >
          Back to start
        </button>
      </Reveal>
    </SectionShell>
  );
}
