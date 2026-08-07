import { useEffect, useRef, useState } from "react";
import { DecoDivider } from "../../components/DecoDivider/DecoDivider";
import { RevealGroup, RevealItem } from "../../components/Reveal/Reveal";
import { SectionShell } from "../../components/SectionShell/SectionShell";
import { site } from "../../data/site";
import styles from "./About.module.css";

const TIMELAPSE_RATIO = "1356 / 2036";
const TIMELAPSE_SRC = "/assets/video/timelapse.mp4";

export function About() {
  const shellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const shell = shellRef.current;
    const video = videoRef.current;
    if (!shell || !video) return;

    let cancelled = false;
    let attached = false;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      if (cancelled) return;
      void video.play().catch(() => {
        /* autoplay may be blocked; retries on canplay */
      });
    };

    const onError = () => {
      if (!cancelled) setFailed(true);
    };

    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("error", onError);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry || cancelled) return;

        if (entry.isIntersecting) {
          if (!attached) {
            attached = true;
            setSrc(TIMELAPSE_SRC);
            setFailed(false);
          }
          tryPlay();
        } else {
          video.pause();
        }
      },
      { root: null, rootMargin: "15% 20%", threshold: 0.08 },
    );

    io.observe(shell);

    return () => {
      cancelled = true;
      io.disconnect();
      video.pause();
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("error", onError);
    };
  }, []);

  useEffect(() => {
    if (!src) return;
    const video = videoRef.current;
    if (!video) return;
    video.load();
    void video.play().catch(() => {});
  }, [src]);

  return (
    <SectionShell id="about" numeral="II">
      <RevealGroup className={styles.layout} stagger={0.16}>
        <RevealItem className={styles.copy}>
          <p className={styles.eyebrow}>About</p>
          <h2 id="about-title" className={styles.name}>
            {site.name}
          </h2>
          <p className={styles.realName}>{site.realName}</p>
          <DecoDivider variant="crest" />
          <p className={styles.bio}>{site.bio}</p>
          <p className={styles.focus}>{site.focus}</p>
        </RevealItem>

        <RevealItem className={styles.media}>
          <div ref={shellRef} className={styles.videoShell}>
            <span className={`${styles.corner} ${styles.tl}`} aria-hidden="true" />
            <span className={`${styles.corner} ${styles.tr}`} aria-hidden="true" />
            <span className={`${styles.corner} ${styles.bl}`} aria-hidden="true" />
            <span className={`${styles.corner} ${styles.br}`} aria-hidden="true" />
            <div className={styles.videoFrame}>
              {failed ? (
                <p className={styles.videoFallback}>Timelapse unavailable</p>
              ) : (
                <video
                  ref={videoRef}
                  className={styles.timelapse}
                  src={src}
                  style={{ aspectRatio: TIMELAPSE_RATIO }}
                  width={1356}
                  height={2036}
                  muted
                  loop
                  playsInline
                  preload="none"
                  disablePictureInPicture
                  aria-label="Artwork process timelapse"
                />
              )}
            </div>
          </div>
          <p className={styles.caption}>Process timelapse</p>
        </RevealItem>
      </RevealGroup>
    </SectionShell>
  );
}
