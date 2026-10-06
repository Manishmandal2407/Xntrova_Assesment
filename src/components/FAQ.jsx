import { useState } from 'react';
import { Icon } from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { FAQS, FAQ_LINKS } from '../data.js';

export default function FAQ() {
  const [open, setOpen] = useState(0); // one open at a time; null = all closed

  return (
    <section className="section" id="faq">
      <div className="container faq">
        <aside className="faq__aside">
          <Reveal as="span" className="eyebrow">FAQ</Reveal>
          <Reveal as="h2" d={1}>Frequently Asked Questions</Reveal>
          <Reveal as="p" d={2}>Resolve your general queries and concerns with our FAQ section below.</Reveal>

          <Reveal className="service-links" d={3}>
            <h3>Digital Marketing Services in Delhi</h3>
            <p>At Xntrova, we offer performance-driven digital marketing services to boost your brand growth and achieve success. Contact us now.</p>
            <ul>
              {FAQ_LINKS.map((l) => (
                <li key={l.href}><a href={l.href}>{l.label} <Icon name="arrow" /></a></li>
              ))}
            </ul>
          </Reveal>
        </aside>

        <Reveal className="accordion" d={2}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={`accordion__item${isOpen ? ' is-open' : ''}`} key={f.q}>
                <h3>
                  <button
                    className="accordion__trigger"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i + 1}`}
                    id={`faq-btn-${i + 1}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {f.q}
                    <span className="accordion__icon" aria-hidden="true"><Icon name="plus" /></span>
                  </button>
                </h3>
                <div className="accordion__panel" id={`faq-${i + 1}`} role="region" aria-labelledby={`faq-btn-${i + 1}`}>
                  <div><p>{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
