import { useReveal } from '../../hooks/useReveal';
import { usePointerTilt } from '../../hooks/usePointerTilt';
import type { StoreItem } from '../../types';
import styles from './Store.module.css';

interface StoreCardProps {
  readonly item: StoreItem;
  readonly delay?: number;
}

export function StoreCard({ item, delay = 0 }: StoreCardProps) {
  const revealRef = useReveal<HTMLDivElement>();
  const { ref: tiltRef, onPointerMove, onPointerLeave } = usePointerTilt<HTMLDivElement>();

  return (
    <div
      ref={(node) => {
        revealRef.current = node;
        tiltRef.current = node;
      }}
      className={`reveal ${styles.card}`}
      data-variant="scale"
      style={{ transitionDelay: `${delay}s` }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {item.badge && <span className={styles.badge}>{item.badge}</span>}
      <div
        className={styles.icon}
        style={{ '--c1': item.colorFrom, '--c2': item.colorTo } as React.CSSProperties}
        aria-hidden="true"
      >
        {item.glyph}
      </div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <div className={styles.price}>{item.price}</div>
    </div>
  );
}
