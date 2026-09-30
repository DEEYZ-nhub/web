import { teamMembers } from '../../data/team';
import { useReveal } from '../../hooks/useReveal';
import type { TeamMember } from '../../types';
import styles from './Team.module.css';

function TeamCard({ member, delay }: { readonly member: TeamMember; readonly delay: number }) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`reveal ${styles.card}`} style={{ transitionDelay: `${delay}s` }}>
      <div className={styles.avatar} style={{ '--hue': member.hue } as React.CSSProperties} aria-hidden="true" />
      <h4>{member.name}</h4>
      <span>{member.role}</span>
    </div>
  );
}

export function Team() {
  const headRef = useReveal<HTMLDivElement>();

  return (
    <section id="team" className={styles.section}>
      <div className="shell">
        <div ref={headRef} className={`reveal ${styles.head}`}>
          <span className={styles.eyebrow}>THE TEAM</span>
          <h2>Run by players, for players</h2>
        </div>
        <div className={styles.grid}>
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
