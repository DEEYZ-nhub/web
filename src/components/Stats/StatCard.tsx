import { useCountUp } from '../../hooks/useCountUp';
import { useReveal } from '../../hooks/useReveal';
import type { StatItem } from '../../types';
import styles from './Stats.module.css';

interface StatCardProps {
  readonly stat: StatItem;
  readonly delay?: number;
}

export function StatCard({ stat, delay = 0 }: StatCardProps) {
  const revealRef = useReveal<HTMLDivElement>();
  const { ref: countRef, value } = useCountUp<HTMLDivElement>(stat.value);

  return (
    <div
      ref={(node) => {
        revealRef.current = node;
        countRef.current = node;
      }}
      className={`reveal ${styles.card}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className={styles.num}>
        {stat.prefix}
        {value.toLocaleString('en-US')}
        <span>{stat.suffix}</span>
      </div>
      <div className={styles.label}>{stat.label}</div>
    </div>
  );
}
