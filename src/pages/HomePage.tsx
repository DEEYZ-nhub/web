import { HeroCyber } from '../components/Hero/HeroCyber';
import { TiendaExpositor } from '../components/Store/TiendaExpositor';
import styles from './HomePage.module.css';

const matches = [
  { time: '20:00', date: 'HOY', teams: 'NOVA / VOID', type: 'RANKED DUO', status: 'EN 18 MIN', tone: 'live' },
  { time: '21:30', date: 'VIERNES', teams: 'EMBER / TITAN', type: 'ARENA CUP', status: 'INSCRIPCIONES ABIERTAS', tone: 'open' },
  { time: '19:00', date: 'SÁBADO', teams: 'ORBIT / RAVEN', type: 'PLAYOFFS', status: 'COMPLETO', tone: 'full' },
];

const news = [
  { number: '01', tag: 'TEMPORADA 04', title: 'Sube de rango', copy: 'Nuevas divisiones, rivales más duros y recompensas que demuestran hasta dónde has llegado.' },
  { number: '02', tag: 'COMUNIDAD', title: 'Encuentra tu escuadra', copy: 'Forma equipo con jugadores que comparten tu ambición y entra al próximo bracket.' },
  { number: '03', tag: 'RECOMPENSAS', title: 'Juega por algo más', copy: 'Cada victoria suma puntos, desbloquea drops y te acerca a los premios de la temporada.' },
];

export function HomePage() {
  return (
    <>
      <HeroCyber />

      <section className={styles.ticker} aria-label="Actividad de Global Arena">
        <div className="shell">
          <div className={styles.tickerInner}>
            <span><i className={styles.statusDot} /> SERVIDORES ONLINE</span>
            <strong>2,481</strong>
            <span className={styles.tickerDivider} />
            <span>PRÓXIMO EVENTO</span>
            <strong className={styles.tickerAccent}>ARENA CUP // 21:30</strong>
            <a href="#tournaments">VER CALENDARIO <b>↗</b></a>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <div className="shell">
          <div className={styles.introTop}>
            <p className={styles.kicker}>01 / SISTEMA GLOBAL ARENA</p>
            <span className={styles.liveLabel}><i className={styles.statusDot} /> LIVE PLATFORM</span>
          </div>
          <div className={styles.introGrid}>
            <div className={styles.introTitle}><span>NO JUEGUES</span><strong>PARA PASAR</strong><em>EL RATO.</em></div>
            <div className={styles.introCopy}>
              <p>Entra a una competición diseñada para jugadores que quieren mejorar, competir y hacerse notar.</p>
              <div className={styles.featureList}>
                <div><b>01</b><span>RANKED PLAY</span><small>Sube. Mantén. Domina.</small></div>
                <div><b>02</b><span>LIVE EVENTS</span><small>Partidas con algo en juego.</small></div>
                <div><b>03</b><span>REAL REWARDS</span><small>Tu rendimiento tiene premio.</small></div>
              </div>
              <a className={styles.primaryLink} href="#tournaments">EXPLORAR LA ARENA <span>↗</span></a>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className={styles.matches}>
        <div className="shell">
          <div className={styles.sectionHead}>
            <div><p className={styles.kicker}>02 / ACTIVIDAD</p><h2>Ahora en juego</h2></div>
            <p className={styles.sectionNote}>Consulta los próximos enfrentamientos<br />y encuentra tu momento.</p>
          </div>
          <div className={styles.matchList}>
            {matches.map((match, index) => (
              <article className={styles.matchRow} key={match.teams}>
                <span className={styles.matchNumber}>0{index + 1}</span>
                <div className={styles.matchDate}><strong>{match.time}</strong><span>{match.date}</span></div>
                <div className={styles.matchTeams}><strong>{match.teams.split(' / ')[0]}</strong><span>VS</span><strong>{match.teams.split(' / ')[1]}</strong></div>
                <span className={styles.matchType}>{match.type}</span>
                <span className={`${styles.matchStatus} ${styles[match.tone]}`}><i />{match.status}</span>
                <span className={styles.arrow}>↗</span>
              </article>
            ))}
          </div>
          <a className={styles.outlineLink} href="#tournaments">VER TODOS LOS ENFRENTAMIENTOS <span>↗</span></a>
        </div>
      </section>

      <section id="store" className="relative w-full py-16 px-4"><TiendaExpositor /></section>

      <section id="tournaments" className={styles.news}>
        <div className="shell">
          <div className={styles.sectionHead}>
            <div><p className={styles.kicker}>03 / CENTRO DE INTELIGENCIA</p><h2>Todo listo.<br /><em>Entra.</em></h2></div>
            <div className={styles.issueBox}><span>SEASON 04</span><strong>09.30.26</strong><small>GLOBAL ARENA // HQ</small></div>
          </div>
          <div className={styles.newsGrid}>
            {news.map(item => <article className={styles.newsCard} key={item.number}><div className={styles.newsCardTop}><span>{item.number}</span><small>{item.tag}</small></div><div><h3>{item.title}</h3><p>{item.copy}</p><a href="#team">LEER MÁS <b>↗</b></a></div></article>)}
          </div>
        </div>
      </section>

      <section id="team" className={styles.finalCta}>
        <div className="shell">
          <div className={styles.ctaPanel}><p className={styles.kicker}>04 / ACCESO AL SISTEMA</p><h2>Tu siguiente<br /><em>partida empieza aquí.</em></h2><div className={styles.ctaBottom}><p><i className={styles.statusDot} /> REGISTRO ABIERTO PARA LA SEASON 04</p><a href="#home">ENTRAR EN GLOBAL ARENA <span>↗</span></a></div></div>
        </div>
      </section>
    </>
  );
}
