import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { SERVICE_OPTIONS } from '../data.js';

const rules = {
  name: (v) => v.trim().length >= 2 || 'Please enter your name.',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Please enter a valid email address.',
  phone: (v) => !v.trim() || /^\+?[\d\s-]{8,16}$/.test(v.trim()) || 'Please enter a valid phone number.',
};

const EMPTY = { name: '', email: '', phone: '', company: '', service: '', message: '' };

export default function LeadForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);
  const successRef = useRef(null);
  const focusAfter = useRef(null); // 'success' | 'name'

  useEffect(() => {
    if (focusAfter.current === 'success') successRef.current?.focus();
    if (focusAfter.current === 'name') formRef.current?.elements.name.focus();
    focusAfter.current = null;
  }, [success]);

  const check = (name, value) => {
    const result = rules[name](value);
    setErrors((e) => ({ ...e, [name]: result === true ? '' : result }));
    return result === true;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) check(name, value); // live re-validation once a field has an error
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    if (rules[name]) check(name, value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const names = Object.keys(rules);
    const results = names.map((n) => check(n, values[n]));
    const firstBad = names.find((_, i) => !results[i]);
    if (firstBad) { formRef.current.elements[firstBad].focus(); return; }

    setLoading(true);
    // Replace this timeout with a real request, e.g.:
    // fetch('/api/lead', { method: 'POST', body: JSON.stringify(values) })
    setTimeout(() => {
      setLoading(false);
      setValues(EMPTY);
      focusAfter.current = 'success';
      setSuccess(true);
    }, 1200);
  };

  const reset = () => {
    focusAfter.current = 'name';
    setSuccess(false);
  };

  const field = (name) => ({
    id: `f-${name}`,
    name,
    value: values[name],
    onChange,
    onBlur,
  });
  const err = (name) => errors[name];
  const invalid = (name) => (rules[name] && errors[name] !== undefined ? String(!!errors[name]) : undefined);

  return (
    <Reveal className="hero__form" id="audit" d={2}>
      <form ref={formRef} className={`lead-form card${success ? ' is-success' : ''}`} id="leadForm" noValidate onSubmit={onSubmit}>
        <div className="lead-form__body">
          <h2 className="lead-form__title">Get a Free Digital Audit</h2>
          <p className="lead-form__sub">Tell us about your business and we’ll get back to you shortly.</p>

          <div className="form-grid">
            <div className={`field${err('name') ? ' has-error' : ''}`}>
              <label htmlFor="f-name">Your Name <abbr title="required">*</abbr></label>
              <input {...field('name')} type="text" placeholder="Your Name" autoComplete="name" required aria-describedby="e-name" aria-invalid={invalid('name')} />
              <span className="field__error" id="e-name" aria-live="polite">{err('name')}</span>
            </div>
            <div className={`field${err('email') ? ' has-error' : ''}`}>
              <label htmlFor="f-email">Email <abbr title="required">*</abbr></label>
              <input {...field('email')} type="email" placeholder="you@company.com" autoComplete="email" required aria-describedby="e-email" aria-invalid={invalid('email')} />
              <span className="field__error" id="e-email" aria-live="polite">{err('email')}</span>
            </div>
            <div className={`field${err('phone') ? ' has-error' : ''}`}>
              <label htmlFor="f-phone">Phone</label>
              <input {...field('phone')} type="tel" placeholder="+91 98765 43210" autoComplete="tel" aria-describedby="e-phone" aria-invalid={invalid('phone')} />
              <span className="field__error" id="e-phone" aria-live="polite">{err('phone')}</span>
            </div>
            <div className="field">
              <label htmlFor="f-company">Company Name</label>
              <input {...field('company')} type="text" placeholder="Company Name" autoComplete="organization" />
            </div>
            <div className="field field--full">
              <label htmlFor="f-service">Which service are you interested in?</label>
              <select {...field('service')}>
                <option value="">Select a service</option>
                {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="field field--full">
              <label htmlFor="f-msg">Tell us about your business goals</label>
              <textarea {...field('message')} id="f-msg" rows={3} placeholder="Tell us about your business goals" />
            </div>
          </div>

          <button type="submit" className={`btn btn--primary btn--block${loading ? ' is-loading' : ''}`} disabled={loading}>
            Submit <Icon name="arrow" />
          </button>
        </div>

        <div ref={successRef} className="lead-form__success" id="formSuccess" tabIndex={-1} role="status">
          <div className="success-icon"><Icon name="check" /></div>
          <h3>Thank you!</h3>
          <p>Tell us about your business and we’ll get back to you shortly.</p>
          <button type="button" className="btn btn--ghost btn--sm" id="formReset" onClick={reset}>Submit another request</button>
        </div>
      </form>
    </Reveal>
  );
}
