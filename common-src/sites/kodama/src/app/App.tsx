import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Teachings } from './components/Teachings';
import { Activities } from './components/Activities';
import { Messages } from './components/Messages';
import { Visit } from './components/Visit';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Teachings />
        <Activities />
        <Messages />
        <Visit />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}