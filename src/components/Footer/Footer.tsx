import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const columns: ReadonlyArray<{ readonly title: string; readonly links: ReadonlyArray<{ label: string; href: string; external?: boolean }> }> = [
  {
    title: 'Explore',
    links: [
      { label: 'Store', href: '/store' },
      { label: 'Tournaments', href: '/#tournaments' },
      { label: 'Stats', href: '/#stats' },
      { label: 'Team', href: '/#team' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Discord', href: 'https://discord.com', external: true },
      { label: 'Twitter / X', href: 'https://x.com', external: true },
      { label: 'YouTube', href: 'https://youtube.com', external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Refund Policy', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.brandWord}>
            GLOBAL<span className={styles.brandAccent}>ARENA</span>
          </span>
          <p>From the player, for the player.</p>
        </div>
        <div className={styles.cols}>
          {columns.map((col) => (
            <div key={col.title}>
              <h5>{col.title}</h5>
              {col.links.map((link) =>
                link.external || link.href.includes('#') ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} to={link.href}>
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>© {new Date().getFullYear()} Global Arena. Not affiliated with Mojang or Microsoft.</div>
    </footer>
  );
}
