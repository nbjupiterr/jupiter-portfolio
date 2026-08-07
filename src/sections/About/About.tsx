import { useEffect, useRef, useState } from "react";
import { DecoDivider } from "../../components/DecoDivider/DecoDivider";
import { Reveal } from "../../components/Reveal/Reveal";
import { SectionShell } from "../../components/SectionShell/SectionShell";
import { site } from "../../data/site";
import styles from "./About.module.css";

/** Intrinsic size of the altered timelapse — border hugs this ratio */
const TIMELAPSE_RATIO = "1356 / 2036";
const TIMELAPSE_SRC = "/assets/video/timelapse.mp4";

export function About() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    setFailed(false);

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      if (cancelled) return;
      void video.play().catch(() => {
        /* keep trying on canplay; no controls UI */
      });
    };

    const onError = () => {
      if (!cancelled) setFailed(true);
    };

    video.load();
    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("error", onError);

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("error", onError);
    };
  }, []);

  return (
    <SectionShell id="about" numeral="II">
      <div className={styles.layout}>
        <Reveal className={styles.copy} x={-24} y={0}>
          <p className={styles.eyebrow}>About</p>
          <h2 id="about-title" className={styles.name}>
            {site.name}
          </h2>
          <DecoDivider variant="crest" />
          <p className={styles.bio}>{site.bio}</p>
          <p className={styles.focus}>{site.focus}</p>
        </Reveal>

        <Reveal className={styles.media} delay={0.12} x={24} y={0}>
          <div className={styles.videoShell}>
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
                  src={TIMELAPSE_SRC}
                  style={{ aspectRatio: TIMELAPSE_RATIO }}
                  width={1356}
                  height={2036}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  aria-label="Artwork process timelapse"
                />
              )}
            </div>
          </div>
          <p className={styles.caption}>Process timelapse</p>
        </Reveal>
      </div>
    </SectionShell>
  );
}
