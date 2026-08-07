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
            rel="noreferrer noopener"
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
        <RevealItem>
          <a
            className={styles.email}
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.email}`}
            data-cursor="link"
          >
            <svg
              className={styles.emailIcon}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="5.5"
                width="18"
                height="13"
                rx="1.2"
                stroke="currentColor"
                strokeWidth="1.35"
              />
              <path
                d="M3.5 6.5 L12 12.25 L20.5 6.5"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </a>
        </RevealItem>
      </RevealGroup>
    </SectionShell>
  );
}
