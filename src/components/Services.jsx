import { Icon } from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { SERVICES } from '../data.js';

function ServiceCard({ service, index }) {
  // Cursor-follow spotlight
  const onPointerMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  return (
    <Reveal as="li" d={index % 3}>
      <article className="service" onPointerMove={onPointerMove}>
        <div className="service__top">
          <div className="icon-box"><Icon name={service.icon} /></div>
          <span className="service__num">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3>{service.title}</h3>
        <p>{service.text}</p>
        <a href={service.href} className="link-arrow">
          Learn More<span className="sr-only"> about {service.title}</span> <Icon name="arrow" />
        </a>
      </article>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section className="section section--soft" id="services">
      <div className="container">
        <header className="section-head section-head--center">
          <Reveal as="span" className="eyebrow">Our Services</Reveal>
          <Reveal as="h2" d={1}>Best Digital Marketing Services in Delhi for <span className="text-grad">Sustainable Business Growth</span></Reveal>
          <Reveal as="p" className="lead" d={2}>Being the best creative digital marketing agency in New Delhi, we offer solutions that help you unlock long-term growth for your business.</Reveal>
        </header>

        <ul className="services-grid">
          {SERVICES.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
        </ul>

        <Reveal className="services__more">
          <a href="/services" className="btn btn--ghost">View More <Icon name="arrow" /></a>
        </Reveal>
      </div>
    </section>
  );
}
