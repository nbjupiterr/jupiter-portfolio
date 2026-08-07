import { DecoDivider } from "../../components/DecoDivider/DecoDivider";
import { RevealGroup, RevealItem } from "../../components/Reveal/Reveal";
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
      <RevealGroup className={styles.layout} stagger={0.11}>
        <RevealItem>
          <Wordmark size="section" />
        </RevealItem>
        <RevealItem>
          <DecoDivider variant="diamond" />
        </RevealItem>
        <h2 id="contact-title" className={styles.visuallyHidden}>
          Contact
        </h2>
        <RevealItem>
          <p className={styles.closing}>{site.closing}</p>
        </RevealItem>
        <RevealItem>
          <a
            className={styles.linktree}
            href={site.linktree}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
          >
            Open Linktree
          </a>
        </RevealItem>
        <RevealItem>
          <button
            type="button"
            className={styles.back}
            onClick={onBackToStart}
            data-cursor="link"
          >
            Back to start
          </button>
        </RevealItem>
      </RevealGroup>
    </SectionShell>
  );
}
