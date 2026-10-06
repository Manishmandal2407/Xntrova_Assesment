import { useEffect, useRef, useState } from 'react';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Scroll-reveal wrapper: adds `is-visible` once the element enters the viewport. */
export default function Reveal({ as: Tag = 'div', d = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (reduceMotion() || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = [className, visible && 'is-visible'].filter(Boolean).join(' ');
  return (
    <Tag ref={ref} data-reveal="" className={cls || undefined} style={{ '--d': d, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
