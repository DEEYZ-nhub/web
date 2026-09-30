import { HeroCyber } from '../components/Hero/HeroCyber';
import { TiendaExpositor } from '../components/Store/TiendaExpositor';
import styles from './HomePage.module.css';

const matches = [
  { time: 'TODAY · 20:00', teams: 'NOVA / VOID', type: 'RANKED DUO', status: 'LIVE SOON' },
  { time: 'FRI · 21:30', teams: 'EMBER / TITAN', type: 'ARENA CUP', status: 'OPEN' },
  { time: 'SAT · 19:00', teams: 'ORBIT / RAVEN', type: 'PLAYOFFS', status: 'SOLD OUT' },
];

const news = [
  { number: '01', tag: 'SEASON 04', title: 'The climb starts now', copy: 'Fresh ladders, sharper rivals, bigger rewards.' },
  { number: '02', tag: 'COMMUNITY', title: 'Built in the arena', copy: 'Find your squad and make your name count.' },
  { number: '03', tag: 'REWARDS', title: 'Win more than pride', copy: 'Unlock drops, kits and limited trophies.' },
];

export function HomePage() {
  return (
    <>
      <HeroCyber />

      <section className={styles.ticker} aria-label="Arena highlights">
        <div className={styles.tickerTrack}>
          <span>RANKED PLAY</span><i /> <span>WEEKLY BRACKETS</span><i /> <span>REAL REWARDS</span><i /> <span>NO EASY WINS</span><i />
          <span>RANKED PLAY</span><i /> <span>WEEKLY BRACKETS</span><i /> <span>REAL REWARDS</span><i /> <span>NO EASY WINS</span><i />
        </div>
      </section>

      <section className={styles.intro}>
        <div className="shell">
          <div className={styles.introGrid}>
            <p className={styles.kicker}>01 / THE ARENA</p>
            <div>
              <h2>Where pressure<br /><em>creates legends.</em></h2>
              <p className={styles.lead}>Global Arena is a competitive home for players who want more from every match. Queue up, find your level, and leave a mark.</p>
              <a className={styles.textLink} href="#tournaments">Explore the arena <span>↗</span></a>
            </div>
            <div className={styles.introAside}><strong>24/7</strong><span>always-on<br />competition</span></div>
          </div>
        </div>
      </section>

      <section id="stats" className={styles.matches}>
        <div className="shell">
          <div className={styles.sectionHead}><div><p className={styles.kicker}>02 / LIVE NOW</p><h2>Next in rotation</h2></div><a className={styles.textLink} href="#tournaments">View all matches <span>↗</span></a></div>
          <div className={styles.matchList}>
            {matches.map((match, index) => <div className={styles.matchRow} key={match.teams}><span className={styles.matchIndex}>0{index + 1}</span><span className={styles.matchTime}>{match.time}</span><strong>{match.teams}</strong><span className={styles.matchType}>{match.type}</span><span className={`${styles.matchStatus} ${match.status === 'OPEN' ? styles.active : ''}`}>{match.status}</span><span className={styles.arrow}>↗</span></div>)}
          </div>
        </div>
      </section>

      <section id="store" className="relative w-full py-16 px-4"><TiendaExpositor /></section>

      <section id="tournaments" className={styles.news}>
        <div className="shell">
          <div className={styles.sectionHead}><div><p className={styles.kicker}>03 / INTEL</p><h2>Inside the arena</h2></div><span className={styles.issue}>ISSUE 004 / 2026</span></div>
          <div className={styles.newsGrid}>{news.map(item => <article className={styles.newsCard} key={item.number}><span>{item.number}</span><div><small>{item.tag}</small><h3>{item.title}</h3><p>{item.copy}</p><a href="#team">Read story <b>↗</b></a></div></article>)}</div>
        </div>
      </section>

      <section id="team" className={styles.finalCta}><div className="shell"><p className={styles.kicker}>04 / YOUR MOVE</p><h2>Ready to<br /><em>enter?</em></h2><div className={styles.ctaBottom}><p>The next match is already waiting.</p><a href="#home">Join Global Arena <span>↗</span></a></div></div></section>
    </>
  );
}
