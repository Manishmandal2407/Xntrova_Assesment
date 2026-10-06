import { Icon } from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { STEPS } from '../data.js';

export default function Process() {
  return (
    <section className="section section--dark" id="process">
      <div className="container">
        <header className="section-head section-head--center">
          <Reveal as="span" className="eyebrow">How We Work</Reveal>
          <Reveal as="h2" d={1}>Xntrova — Driven by Results</Reveal>
        </header>

        <ol className="process" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {STEPS.map((s, i) => (
            <Reveal as="li" d={i} key={s.title}>
              <article className="step">
                <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="step__icon"><Icon name={s.icon} /></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
