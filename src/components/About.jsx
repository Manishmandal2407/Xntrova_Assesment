import { Icon } from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { PILLARS } from '../data.js';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about">
        <div className="about__text">
          <Reveal as="span" className="eyebrow">About Xntrova</Reveal>
          <Reveal as="h2" d={1}>Driven By Ideas.<br /><span className="text-grad">Focused on Results</span></Reveal>
          <Reveal as="p" d={2}>At Xntrova, we believe that the key to great marketing is understanding people. Each of our strategies is rooted in fresh ideas, robust planning, and a clear focus on what truly matters. We combine creativity with data-driven decisions to create meaningful experiences that connect, engage, and inspire action.</Reveal>
          <Reveal as="p" d={3}>Whether you want to shape your brand story, improve visibility, or drive conversion, we take a creative and data-driven approach to ensure the best possible results. Standing as the best digital marketing agency in Delhi NCR, we aim to create work that delivers measurable results and helps your business climb the competitive ladder with confidence.</Reveal>
          <Reveal as="a" href="#audit" className="btn btn--primary" d={4}>Let’s Grow Together <Icon name="arrow" /></Reveal>
        </div>

        <div className="pillars">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} d={i + 1}>
              <article className="pillar">
                <div className="icon-box"><Icon name={p.icon} /></div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
