import { useReveal } from '../../hooks/useReveal';
import styles from './TournamentCta.module.css';

export function TournamentCta() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="tournaments" className={styles.section}>
      <div className={styles.glow} />
      <div ref={ref} className={`shell reveal ${styles.inner}`}>
        <span className={styles.badge}>
          <span className={styles.dot} /> LIVE SEASON
        </span>
        <h2>Global Arena Championship</h2>
        <p>Weekly brackets, global rankings, real prizes. Queue up and prove it.</p>
        <a href="#" className={styles.cta} data-cursor-active>
          Register Now
        </a>
      </div>
    </section>
  );
}
