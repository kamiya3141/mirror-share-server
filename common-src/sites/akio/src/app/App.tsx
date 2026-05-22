import { AkioHeader } from './components/akio/AkioHeader';
import { AkioHero } from './components/akio/AkioHero';
import { AkioProfile } from './components/akio/AkioProfile';
import { AkioBattles } from './components/akio/AkioBattles';
import { AkioSkills } from './components/akio/AkioSkills';
import { AkioGallery } from './components/akio/AkioGallery';
import { AkioContact } from './components/akio/AkioContact';
import { AkioFooter } from './components/akio/AkioFooter';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-950">
      <AkioHeader />
      <main>
        <AkioHero />
        <AkioProfile />
        <AkioBattles />
        <AkioSkills />
        <AkioGallery />
        <AkioContact />
      </main>
      <AkioFooter />
    </div>
  );
}