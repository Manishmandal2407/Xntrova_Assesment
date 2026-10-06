import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { STATS } from '../data.js';

const format = ({ prefix = '', suffix = '' }, n) => `${prefix}${n}${suffix}`;

function Counter({ stat }) {
  const ref = useRef(null);
  const [value, setValue] = useState(stat.count);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || reduce || !('IntersectionObserver' in window)) return undefined;

    let raf;
    setValue(0);
    const run = () => {
      const duration = 1600;
      let start = null;
      const step = (t) => {
        if (start === null) start = t;
        const p = Math.min((t - start) / duration, 1);
        setValue(Math.round(stat.count * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run();
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [stat.count]);

  return <dd ref={ref}>{format(stat, value)}</dd>;
}

export default function Stats() {
  return (
    <section className="stats" aria-labelledby="stats-title">
      <div className="container">
        <Reveal className="stats__card">
          <div className="stats__intro">
            <h2 className="eyebrow" id="stats-title">Performance Overview</h2>
            <p className="stats__status"><span className="live-dot" aria-hidden="true"></span>Growing</p>
          </div>
          <dl className="stats__grid">
            {STATS.map((s) => (
              <div className="stat" key={s.label}><dt>{s.label}</dt><Counter stat={s} /></div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
