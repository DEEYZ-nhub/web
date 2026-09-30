import { usePreloader } from '../../hooks/usePreloader';
import { ArenaMark } from '../ArenaMark';
import styles from './Preloader.module.css';

export function Preloader() {
  const isDone = usePreloader();

  return (
    <div
      className={`${styles.overlay} ${isDone ? styles.hidden : ''}`}
      aria-hidden={isDone}
      role="status"
      aria-live="polite"
    >
      <ArenaMark size={56} className={styles.logo} />
      <div className={styles.bar}>
        <div className={styles.barFill} />
      </div>
      <span className={styles.tag}>ENTERING THE ARENA</span>
    </div>
  );
}
