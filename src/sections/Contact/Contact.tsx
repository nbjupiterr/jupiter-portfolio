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
      <RevealGroup className={styles.layout} stagger={0.13} amount="some">
        <RevealItem y={18}>
          <Wordmark size="section" />
        </RevealItem>
        <RevealItem y={14}>
          <DecoDivider variant="diamond" />
        </RevealItem>
        <RevealItem y={16}>
          <h2 id="contact-title" className={styles.heading}>
            Until the next orbit
          </h2>
        </RevealItem>
        <RevealItem y={14}>
          <p className={styles.closing}>{site.closing}</p>
        </RevealItem>
        <RevealItem y={12}>
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
        <RevealItem y={10}>
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
