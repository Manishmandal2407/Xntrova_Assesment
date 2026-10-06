import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon, Stars } from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { TESTIMONIALS } from '../data.js';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Testimonials() {
  const trackRef = useRef(null);
  const timer = useRef(null);
  const [pages, setPages] = useState(TESTIMONIALS.length);
  const [index, setIndex] = useState(0);

  // Layout helpers read from the live DOM (slide width depends on breakpoint)
  const metrics = useCallback(() => {
    const track = trackRef.current;
    const first = track.children[0];
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const slideW = first.offsetWidth + gap;
    const perView = Math.max(1, Math.round((track.clientWidth + gap) / slideW));
    const count = Math.max(1, track.children.length - perView + 1);
    return { slideW, count, current: Math.round(track.scrollLeft / slideW) };
  }, []);

  const goTo = useCallback((i) => {
    const { slideW, count } = metrics();
    const target = ((i % count) + count) % count;
    trackRef.current.scrollTo({ left: target * slideW, behavior: reduceMotion() ? 'auto' : 'smooth' });
  }, [metrics]);

  const step = (delta) => goTo(metrics().current + delta);

  const stop = useCallback(() => clearInterval(timer.current), []);
  const play = useCallback(() => {
    if (reduceMotion()) return;
    stop();
    timer.current = setInterval(() => goTo(metrics().current + 1), 6000);
  }, [goTo, metrics, stop]);

  useEffect(() => {
    const track = trackRef.current;
    const sync = () => {
      const { count, current } = metrics();
      setPages(count);
      setIndex(Math.min(current, count - 1));
    };
    const onScroll = () => requestAnimationFrame(sync);
    let resizeTimer;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(sync, 200); };

    sync();
    play();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      stop();
      clearTimeout(resizeTimer);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [metrics, play, stop]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  };

  return (
    <section className="section section--soft" id="testimonials">
      <div className="container">
        <header className="section-head section-head--center">
          <Reveal as="span" className="eyebrow">Testimonials</Reveal>
          <Reveal as="h2" d={1}>Words from Our <span className="text-grad">Valued Clients</span></Reveal>
        </header>

        <Reveal
          className="slider"
          id="tSlider"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          d={2}
          onMouseEnter={stop}
          onMouseLeave={play}
          onFocus={stop}
          onBlur={play}
        >
          <div className="slider__track" tabIndex={0} ref={trackRef} onKeyDown={onKeyDown} onTouchStart={stop}>
            {TESTIMONIALS.map((t, i) => (
              <div className="slider__slide" key={i}>
                <figure className="quote">
                  <div className="quote__head">
                    <Icon name="quote" fill className="quote__mark" />
                    <Stars />
                  </div>
                  <blockquote><p>{t.text}</p></blockquote>
                  <figcaption>
                    <span className="avatar" aria-hidden="true">{t.initial}</span>
                    <span><cite>{t.name}</cite><small>{t.role}</small></span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>

          <div className="slider__controls">
            <div className="slider__dots" aria-label="Choose testimonial">
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className="slider__dot"
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <div className="slider__nav">
              <button className="icon-btn" type="button" aria-label="Previous testimonial" onClick={() => step(-1)}><Icon name="left" /></button>
              <button className="icon-btn" type="button" aria-label="Next testimonial" onClick={() => step(1)}><Icon name="right" /></button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
