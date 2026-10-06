import { CLIENTS_ROW_1, CLIENTS_ROW_2 } from '../data.js';

/** Infinite marquee: items are rendered twice (second copy hidden from AT) for a seamless loop. */
function Marquee({ items, reverse = false }) {
  return (
    <div className={`marquee${reverse ? ' marquee--reverse' : ''}`}>
      <ul className="marquee__track">
        {items.map((name) => <li className="marquee__item" key={name}>{name}</li>)}
        {items.map((name) => <li className="marquee__item" key={`${name}-clone`} aria-hidden="true">{name}</li>)}
      </ul>
    </div>
  );
}

export default function Clients() {
  return (
    <section className="clients" id="clients" aria-labelledby="clients-title">
      <div className="container">
        <h2 className="clients__title" id="clients-title">Trusted by thousands of companies</h2>
      </div>
      <Marquee items={CLIENTS_ROW_1} />
      <Marquee items={CLIENTS_ROW_2} reverse />
    </section>
  );
}
