import { IconSprite } from './components/Icon.jsx';
import Header, { TopBar } from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Process from './components/Process.jsx';
import Clients from './components/Clients.jsx';
import Approach from './components/Approach.jsx';
import Testimonials from './components/Testimonials.jsx';
import CTA from './components/CTA.jsx';
import FAQ from './components/FAQ.jsx';
import Footer, { BackToTop, WhatsAppButton } from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <IconSprite />
      <a className="skip-link" href="#main">Skip to content</a>
      <TopBar />
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <About />
        <Services />
        <Process />
        <Clients />
        <Approach />
        <Testimonials />
        <CTA />
        <FAQ />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
