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
      <div className={styles.layout}>
        <Wordmark size="section" />
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
      </div>
    </SectionShell>
  );
}
