import { Icon, Stars } from './Icon.jsx';
import Reveal from './Reveal.jsx';
import LeadForm from './LeadForm.jsx';
import { TRUST_PLATFORMS } from '../data.js';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__bg" aria-hidden="true">
        <span className="blob blob--1"></span>
        <span className="blob blob--2"></span>
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <Reveal as="span" className="pill"><span className="pill__dot"></span>Digital Marketing Agency · Delhi, India</Reveal>
          <Reveal as="h1" d={1}>Scale Your Business With The <span className="text-grad">Best Digital Marketing Agency</span> in Delhi</Reveal>
          <Reveal as="p" className="lead" d={2}>Unlock your business potential and connect with your targeted customers by partnering with Xntrova, the best digital marketing agency in Delhi.</Reveal>
          <Reveal className="hero__actions" d={3}>
            <a href="#audit" className="btn btn--primary">Get Free Digital Audit <Icon name="arrow" /></a>
            <a href="#services" className="btn btn--ghost">Explore Services</a>
          </Reveal>
          <Reveal className="trust" d={4}>
            <span className="trust__label">Reviews Platform</span>
            <ul className="trust__list">
              {TRUST_PLATFORMS.map((p) => (
                <li className="trust__item" key={p}>{p}<Stars /></li>
              ))}
            </ul>
          </Reveal>
        </div>

        <LeadForm />
      </div>
    </section>
  );
}
