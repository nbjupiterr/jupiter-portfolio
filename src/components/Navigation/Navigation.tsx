import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navItems } from "../../data/site";
import styles from "./Navigation.module.css";

type NavigationProps = {
  activeId: string;
  onNavigate: (id: string) => void;
};

export function Navigation({ activeId, onNavigate }: NavigationProps) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.brand}
        onClick={() => handleNavigate("hero")}
        data-cursor="link"
      >
        Jupiter
      </button>

      <nav className={styles.desktop} aria-label="Portfolio chapters">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.link} ${activeId === item.id ? styles.active : ""}`}
            onClick={() => handleNavigate(item.id)}
            data-cursor="link"
          >
            <span className={styles.numeral} aria-hidden="true">
              {item.numeral}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button
        type="button"
        className={styles.menuToggle}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Index"}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            className={styles.mobile}
            aria-label="Portfolio chapters"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={styles.mobileLink}
                onClick={() => handleNavigate(item.id)}
              >
                <span>{item.numeral}</span>
                {item.label}
              </button>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
