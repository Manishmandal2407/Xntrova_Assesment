import { Icon } from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { PHONE, PHONE_HREF } from '../data.js';

export default function CTA() {
  return (
    <section className="cta-section" id="contact">
      <div className="container">
        <Reveal className="cta">
          <div>
            <h2>Boost your brand growth with the Best Digital Marketing Company in Delhi</h2>
            <p>We aim at improving your online visibility, so you can reach your potential customers and boost conversions.</p>
          </div>
          <div className="cta__actions">
            <a href="#audit" className="btn btn--light">Get Free Digital Audit <Icon name="arrow" /></a>
            <a href={PHONE_HREF} className="btn btn--outline-light"><Icon name="phone" />{PHONE}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
