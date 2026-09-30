import { Link } from 'react-router-dom';
import { storeItems } from '../../data/store';
import { useReveal } from '../../hooks/useReveal';
import { StoreCard } from './StoreCard';
import styles from './Store.module.css';

export function Store() {
  const headRef = useReveal<HTMLDivElement>();

  return (
    <section id="store" className={styles.section}>
      <div className="shell">
        <div ref={headRef} className={`reveal ${styles.head}`}>
          <span className={styles.eyebrow}>THE STORE</span>
          <h2>Gear up for battle</h2>
          <p>Ranks, kits and cosmetics — every purchase fuels the next tournament season.</p>
        </div>
        <div className={styles.grid}>
          {storeItems.map((item, index) => (
            <StoreCard key={item.id} item={item} delay={index * 0.1} />
          ))}
        </div>
        <div className={styles.viewAll}>
          <Link to="/store" className={styles.viewAllBtn} data-cursor-active>
            View Full Store
          </Link>
        </div>
      </div>
    </section>
  );
}
