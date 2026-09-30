import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import styles from './Hero.module.css';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface Word {
  readonly text: string;
  readonly accent?: boolean;
}

interface TimedWord extends Word {
  readonly delay: number;
}

const WORD_STEP_SECONDS = 0.05;

function withStaggeredDelays(lines: readonly (readonly Word[])[]): readonly (readonly TimedWord[])[] {
  let delay = 0;
  return lines.map((line) =>
    line.map((word) => {
      const timed: TimedWord = { ...word, delay };
      delay += WORD_STEP_SECONDS;
      return timed;
    }),
  );
}

const titleLines = withStaggeredDelays([
  [{ text: 'TAKE' }, { text: 'YOUR', accent: true }, { text: 'PVP' }],
  [{ text: 'EXPERIENCE' }, { text: 'TO', accent: true }, { text: 'THE' }],
  [{ text: 'NEXT' }, { text: 'LEVEL.', accent: true }],
]);

export function Hero() {
  const tagRef = useReveal<HTMLSpanElement>();
  const subRef = useReveal<HTMLParagraphElement>();
  const actionsRef = useReveal<HTMLDivElement>();
  const heroRef = useRef<HTMLElement | null>(null);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const node = heroRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const mx = ((event.clientX - rect.left) / rect.width) * 100;
    const my = ((event.clientY - rect.top) / rect.height) * 100;
    node.style.setProperty('--mx', `${mx.toFixed(1)}%`);
    node.style.setProperty('--my', `${my.toFixed(1)}%`);
  }, []);

  return (
    <section id="home" ref={heroRef} className={styles.hero} onPointerMove={onPointerMove}>
      <div className={styles.gridNoise} />
      <div className={`${styles.aurora} ${styles.aurora1}`} />
      <div className={`${styles.aurora} ${styles.aurora2}`} />
      <div className={styles.glow} />

      <div className={styles.content}>
        <span ref={tagRef} className={`reveal ${styles.tag}`}>
          OFFICIAL WEBSITE
        </span>

        <h1 className={styles.title}>
          {titleLines.map((line) => (
            <span key={line.map((w) => w.text).join('-')} className={styles.wordLine}>
              {line.map((word) => (
                <span
                  key={word.text}
                  className={`${styles.word} ${word.accent ? styles.accent : ''}`}
                  style={{ '--d': `${word.delay}s` } as React.CSSProperties}
                >
                  {word.text}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p ref={subRef} className={`reveal ${styles.sub}`} style={{ transitionDelay: '0.5s' }}>
          Built by players who know the grind. This is your arena.
        </p>

        <div ref={actionsRef} className={`reveal ${styles.actions}`} style={{ transitionDelay: '0.6s' }}>
          <Link to="/store" className={styles.primaryBtn} data-cursor-active>
            Browse the Store <ArrowIcon />
          </Link>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryBtn}
            data-cursor-active
          >
            Join our Discord
          </a>
        </div>
      </div>

      <div className={styles.scrollCue}>
        <span />
      </div>
    </section>
  );
}
