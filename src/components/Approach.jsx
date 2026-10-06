import { Icon } from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { CHART_BARS, TOOLS } from '../data.js';

export default function Approach() {
  return (
    <section className="section" id="approach">
      <div className="container approach">
        <Reveal className="approach__visual">
          <div className="dash" role="img" aria-label="Reviewing campaign performance and results">
            <div className="dash__card card">
              <div className="dash__head">
                <div>
                  <span className="dash__label">Campaign Performance</span>
                  <strong className="dash__value">+250%</strong>
                  <span className="dash__sub">Organic Traffic</span>
                </div>
                <span className="badge-up">▲ Growing</span>
              </div>
              <div className="dash__chart" aria-hidden="true">
                {CHART_BARS.map((h, i) => <span key={i} style={{ '--h': `${h}%`, '--i': i }}></span>)}
                <svg className="dash__line" viewBox="0 0 300 160" preserveAspectRatio="none">
                  <path pathLength="1" d="M0 140 C30 135 50 125 75 122 S120 108 150 95 210 70 240 45 285 15 300 8" />
                </svg>
              </div>
            </div>
            <div className="dash__float dash__float--1 card">
              <span className="icon-box"><Icon name="briefcase" /></span>
              <div><strong>120+</strong><small>Projects Delivered</small></div>
            </div>
            <div className="dash__float dash__float--2 card">
              <span className="icon-box"><Icon name="users" /></span>
              <div><strong>500+</strong><small>Happy Clients</small></div>
            </div>
          </div>
        </Reveal>

        <div className="approach__text">
          <Reveal as="span" className="eyebrow">Our Approach</Reveal>
          <Reveal as="h2" d={1}>Turning Potential Into <span className="text-grad">Performance</span></Reveal>
          <Reveal as="p" d={2}>Every brand has potential, but potential alone cannot drive growth. At Xntrova, we transform ideas into actions and strategies into measurable results. However, it is not our aim that makes us the best digital marketing company in Delhi NCR, but our approach.</Reveal>
          <Reveal as="p" d={3}>Moreover, we use a strategic approach that combines creativity with data. Through this, we ensure that every campaign, piece of content, and marketing effort serves a clear purpose. This is one of the key reasons that makes us the top digital marketing agency in Dwarka. In addition to this, we do not rely on guesswork and believe in complete transparency, collaboration, and continuous improvement.</Reveal>
          <Reveal as="p" d={4}>Therefore, whether your aim is to increase your business visibility, generate quality leads, or strengthen your digital presence, the best digital marketing agency in Delhi, Xntrova, will ensure that. We are committed to delivering real results and making every effort count.</Reveal>

          <Reveal className="tools" d={5}>
            <h3>Tools We Work With</h3>
            <ul>
              {TOOLS.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
