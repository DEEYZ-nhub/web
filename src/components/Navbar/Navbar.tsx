import { useState } from 'react';
import { Link } from 'react-router-dom';
import { navDropdowns, navLinks } from '../../data/navigation';
import { useCart } from '../../hooks/useCart';
import { ArenaMark } from '../ArenaMark';
import styles from './Navbar.module.css';

const ChevronIcon = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GiftIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M20 12v7a1 1 0 01-1 1H5a1 1 0 01-1-1v-7M22 7H2v5h20V7zM12 22V7M12 7c-1.5-4-6-4.5-6-2s3 2.5 6 2zM12 7c1.5-4 6-4.5 6-2s-3 2.5-6 2z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DiscordIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.3 5.4A17.6 17.6 0 0015.8 4l-.3.5a13 13 0 013.9 1.5 15.7 15.7 0 00-13.6 0A13 13 0 019.6 4.5L9.3 4a17.6 17.6 0 00-4.5 1.4C1.9 9.4 1.2 13.3 1.5 17.1a17.7 17.7 0 005.4 2.7l.7-1.2a11.5 11.5 0 01-1.9-.9l.4-.3a12.7 12.7 0 0010.8 0l.4.3a11.5 11.5 0 01-1.9.9l.7 1.2a17.6 17.6 0 005.4-2.7c.4-4.4-.6-8.3-2.6-11.7zM8.7 14.6c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8zm6.6 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8z" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

const CartIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <circle cx="9" cy="20" r="1.2" fill="currentColor" />
    <circle cx="18" cy="20" r="1.2" fill="currentColor" />
    <path d="M3 3h2l1 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalCount } = useCart();

  return (
    <header className={styles.header}>
      <div className={`shell ${styles.inner}`}>
        <Link to="/" className={styles.brand}>
          <ArenaMark size={28} className={styles.brandMark} />
          <span className={styles.brandWord}>
            GLOBAL<span className={styles.brandAccent}>ARENA</span>
          </span>
        </Link>

        <nav className={styles.links} aria-label="Primary">
          {navLinks.map((link) =>
            link.href.includes('#') ? (
              <a key={link.href} href={link.href} className={styles.link}>
                {link.label}
                {link.isLive && <span className={styles.liveDot} aria-label="live" />}
              </a>
            ) : (
              <Link key={link.href} to={link.href} className={styles.link}>
                {link.label}
                {link.isLive && <span className={styles.liveDot} aria-label="live" />}
              </Link>
            ),
          )}
          {navDropdowns.map((dropdown) => (
            <div key={dropdown.label} className={styles.dropdown}>
              <button className={`${styles.link} ${styles.dropdownBtn}`} type="button">
                {dropdown.label} <ChevronIcon />
              </button>
              <div className={styles.dropdownMenu}>
                {dropdown.items.map((item) => (
                  <a key={item.label} href={item.href}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className={styles.actions}>
          <button type="button" className={styles.wheelBtn} data-cursor-active>
            <GiftIcon /> DAILY WHEEL
          </button>
          <button type="button" className={styles.langBtn}>
            <GlobeIcon /> EN
          </button>
          <span className={styles.divider} aria-hidden="true" />
          <div className={styles.dropdown}>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.discordBtn}
              data-cursor-active
            >
              <DiscordIcon /> DISCORD
            </a>
            <div className={`${styles.dropdownMenu} ${styles.right}`}>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                Join Server
              </a>
              <a href="#">Support Ticket</a>
            </div>
          </div>
          <button type="button" className={styles.cartBtn} aria-label={`Cart, ${totalCount} items`}>
            <CartIcon />
            <span className={styles.cartCount}>{totalCount}</span>
          </button>
          <button
            type="button"
            className={`${styles.burger} ${mobileOpen ? styles.open : ''}`}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuInner}>
          {navLinks.map((link) =>
            link.href.includes('#') ? (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={styles.mobileLink}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ),
          )}
          {navDropdowns.flatMap((dropdown) => dropdown.items).map((item) => (
            <a key={item.label} href={item.href} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
