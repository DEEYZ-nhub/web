import { stats } from '../../data/stats';
import { StatCard } from './StatCard';
import styles from './Stats.module.css';

export function Stats() {
  return (
    <section id="stats" className={styles.section}>
      <div className={`shell ${styles.grid}`}>
        {stats.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} delay={index * 0.1} />
        ))}
      </div>
    </section>
  );
}
