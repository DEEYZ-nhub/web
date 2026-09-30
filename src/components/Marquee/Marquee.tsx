import styles from './Marquee.module.css';

const items: readonly string[] = [
  'RANKED PVP',
  'WEEKLY TOURNAMENTS',
  'CUSTOM KITS',
  'GLOBAL LEADERBOARDS',
  'SEASONAL REWARDS',
];

const loopItems = [...items, ...items];

export function Marquee() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.track}>
        {loopItems.map((item, index) => (
          <span key={`${item}-${index}`} className={styles.item}>
            {item} <span className={styles.dot}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
