import { useEffect, useState } from 'react';
import { Icon } from './Icon.jsx';
import { EMAIL, EMAIL_HREF, NAV_LINKS, PHONE, PHONE_HREF } from '../data.js';

const SPY_IDS = NAV_LINKS.filter((l) => l.href.startsWith('#')).map((l) => l.href.slice(1));

export function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__group">
          <a href={PHONE_HREF}><Icon name="phone" />{PHONE}</a>
          <a href={EMAIL_HREF}><Icon name="mail" />{EMAIL}</a>
        </div>
        <div className="topbar__group">
          <span><Icon name="pin" />India</span>
          <a href="#audit">Contact Us</a>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  // Header shadow on scroll
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      ticking = false;
    };
    const handler = () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    };
    window.addEventListener('scroll', handler, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  // Escape closes menu; leaving mobile breakpoint closes menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        document.getElementById('burger')?.focus();
      }
    };
    const mq = window.matchMedia('(min-width: 992px)');
    const onMq = (e) => { if (e.matches) setOpen(false); };
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  // Scroll-spy for active nav link
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    SPY_IDS.map((id) => document.getElementById(id)).filter(Boolean).forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' menu-open' : ''}`} id="header">
      <div className="container header__inner">
        <a href="#home" className="logo" aria-label="Xntrova home">
          <span className="logo__mark" aria-hidden="true">X</span><span>Xntrova</span>
        </a>

        <nav className={`nav${open ? ' is-open' : ''}`} id="nav" aria-label="Primary">
          <ul className="nav__list">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`nav__link${l.href === `#${active}` ? ' is-active' : ''}`}
                  onClick={close}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav__extra">
            <a href="#audit" className="btn btn--primary btn--block" onClick={close}>Contact Us <Icon name="arrow" /></a>
            <a href={PHONE_HREF} onClick={close}><Icon name="phone" />{PHONE}</a>
            <a href={EMAIL_HREF} onClick={close}><Icon name="mail" />{EMAIL}</a>
          </div>
        </nav>

        <a href="#audit" className="btn btn--primary btn--sm header__cta">Contact Us</a>

        <button
          className="burger"
          id="burger"
          type="button"
          aria-controls="nav"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
