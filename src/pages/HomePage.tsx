import { HeroCyber } from '../components/Hero/HeroCyber';
import { Marquee } from '../components/Marquee/Marquee';
import { Stats } from '../components/Stats/Stats';
import { TiendaExpositor } from '../components/Store/TiendaExpositor';
import { TournamentCta } from '../components/TournamentCta/TournamentCta';
import { Team } from '../components/Team/Team';

export function HomePage() {
  return (
    <>
      <HeroCyber />
      <Marquee />
      <Stats />
      <section id="store" className="relative w-full py-16 px-4">
        <TiendaExpositor />
      </section>
      <TournamentCta />
      <Team />
    </>
  );
}
