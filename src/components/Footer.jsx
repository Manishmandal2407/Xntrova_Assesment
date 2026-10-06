import { useEffect, useState } from 'react';
import { Icon } from './Icon.jsx';
import {
  EMAIL, EMAIL_HREF, FOOTER_COMPANY, FOOTER_SERVICES, LEGAL_LINKS, PHONE, PHONE_HREF, SOCIALS,
} from '../data.js';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => { setVisible(window.scrollY > 600); ticking = false; };
    const handler = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    window.addEventListener('scroll', handler, { passive: true });
    update();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button className={`to-top${visible ? ' is-visible' : ''}`} id="toTop" type="button" aria-label="Back to top" onClick={toTop}>
      <Icon name="up" />
    </button>
  );
}

export function WhatsAppButton() {
  return (
    <a
      className="whatsapp"
      href="https://wa.me/918683828646?text=Hi%20Xntrova%2C%20I%27d%20like%20a%20free%20digital%20audit."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__about">
            <a href="#home" className="logo" aria-label="Xntrova home"><span className="logo__mark" aria-hidden="true">X</span><span>Xntrova</span></a>
            <p>India’s premier B2B digital marketing agency, delivering growth-focused solutions for businesses across Delhi and beyond.</p>
            <ul className="socials" aria-label="Xntrova on social media">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}><Icon name={s.icon} fill={s.fill} /></a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Services">
            <h2 className="footer__title">Services</h2>
            <ul>
              {FOOTER_SERVICES.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </nav>
          <nav aria-label="Company">
            <h2 className="footer__title">Company</h2>
            <ul>
              {FOOTER_COMPANY.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </nav>
          <div>
            <h2 className="footer__title">Get in touch</h2>
            <address style={{ fontStyle: 'normal' }}>
              <ul className="contact-list">
                <li><Icon name="pin" /><span>A107, 2nd Floor, Sector 8, Dwarka New Delhi - 110077</span></li>
                <li><Icon name="phone" /><a href={PHONE_HREF}>{PHONE}</a></li>
                <li><Icon name="mail" /><a href={EMAIL_HREF}>{EMAIL}</a></li>
              </ul>
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <p style={{ margin: 0 }}>© {new Date().getFullYear()} Xntrova. All rights reserved.</p>
          <ul className="footer__legal">
            {LEGAL_LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
          </ul>
        </div>
      </div>
    </footer>
  );
}
