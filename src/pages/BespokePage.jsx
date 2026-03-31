import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './BespokePage.css';

const steps = [
  { num: '01', icon: '📅', title: 'Book a Consultation', desc: 'Schedule a private appointment at our Mayfair atelier or via video call with one of our master gemologists.' },
  { num: '02', icon: '✏️', title: 'Share Your Vision', desc: 'Describe your dream piece — or bring references, sketches and inspiration. Our designers will translate your ideas into preliminary sketches.' },
  { num: '03', icon: '💎', title: 'Select Your Stones', desc: 'Choose from our curated library of exceptional gemstones, each hand-selected from the world\'s finest sources.' },
  { num: '04', icon: '⚒️', title: 'Master Craftsmanship', desc: 'Our artisans bring your piece to life using techniques passed down over generations, refined with modern precision tools.' },
  { num: '05', icon: '🎁', title: 'Delivery & Certificate', desc: 'Receive your bespoke creation in our signature presentation box, accompanied by full documentation and a certificate of authenticity.' },
];

const faqs = [
  { q: 'How long does a bespoke piece take?', a: 'Most bespoke pieces take between 6 and 12 weeks, depending on the complexity of the design and the availability of the chosen gemstones.' },
  { q: 'What is the minimum budget for bespoke?', a: 'Our bespoke service begins at ₹2,67,500. Price depends on the choice of metal, gemstones and complexity of the design.' },
  { q: 'Can I redesign an existing piece?', a: 'Absolutely. We offer a "reimagining" service where we transform heirloom jewellery into a contemporary piece that honours the original stones and sentiment.' },
  { q: 'Do you offer video consultations?', a: 'Yes. We work with clients across 40+ countries via secure video call, offering exactly the same level of service as our in-person atelier appointments.' },
];

const BespokePage = () => {
  const [formStep, setFormStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', budget: '', timeline: '', vision: '', consultation: 'in-person' });
  const [openFaq, setOpenFaq] = useState(null);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bespoke-page">
      {/* Hero */}
      <section className="bespoke-hero">
        <div className="bespoke-hero__deco bespoke-hero__deco--1" />
        <div className="bespoke-hero__deco bespoke-hero__deco--2" />
        <div className="container bespoke-hero__inner">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <span className="section-label">Private Atelier</span>
            <h1 className="bespoke-hero__title">
              Your Story, <br />
              <em className="pink-gradient-text">Handcrafted</em>
            </h1>
            <p className="bespoke-hero__sub">
              Every great piece begins with a conversation. At Argos, our bespoke service transforms your vision into jewellery that will be worn — and treasured — for generations.
            </p>
            <div className="bespoke-hero__ctas">
              <a href="#book" className="btn-primary">Book a Consultation</a>
              <a href="#process" className="btn-secondary">Our Process</a>
            </div>
          </motion.div>
          <motion.div
            className="bespoke-hero__visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {['✏️', '💎', '⚒️', '✨', '💍'].map((e, i) => (
              <div
                key={i}
                className="bespoke-gem float-anim"
                style={{
                  left: `${[20, 75, 50, 10, 65][i]}%`,
                  top: `${[20, 15, 50, 70, 75][i]}%`,
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                {e}
              </div>
            ))}
            <div className="bespoke-hero__ring" />
            <div className="bespoke-hero__ring bespoke-hero__ring--2" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bespoke-stats">
        <div className="container bespoke-stats__grid">
          {[
            { value: '1,200+', label: 'Bespoke Pieces Created' },
            { value: '40+', label: 'Countries Served' },
            { value: '15', label: 'Master Artisans' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((s, i) => (
            <motion.div key={s.label} className="bespoke-stat" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="bespoke-stat__value gradient-text">{s.value}</div>
              <div className="bespoke-stat__label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bespoke-process container">
        <div className="bespoke-process__header">
          <span className="section-label">How It Works</span>
          <h2 className="bespoke-process__title">The <em className="pink-gradient-text">Bespoke Journey</em></h2>
        </div>
        <div className="bespoke-steps">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="bespoke-step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="bespoke-step__num">{step.num}</div>
              <div className="bespoke-step__icon">{step.icon}</div>
              <h3 className="bespoke-step__title">{step.title}</h3>
              <p className="bespoke-step__desc">{step.desc}</p>
              {i < steps.length - 1 && <div className="bespoke-step__connector" />}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Book form */}
      <section id="book" className="bespoke-form-section">
        <div className="bespoke-form-section__bg" />
        <div className="container bespoke-form-section__inner">
          <div className="bespoke-form-info">
            <span className="section-label">Private Consultation</span>
            <h2 className="bespoke-form-info__title">Begin Your <em className="pink-gradient-text">Journey</em></h2>
            <p className="bespoke-form-info__text">Complete this brief form and one of our specialists will be in touch within 24 hours to arrange your private consultation.</p>
            <div className="bespoke-contact-details">
              {[
                { icon: '📍', text: '42 Mayfair Lane, London W1J 8NR' },
                { icon: '📞', text: '+44 (0) 20 7946 0931' },
                { icon: '✉️', text: 'bespoke@argosjewellery.com' },
                { icon: '🕐', text: 'Mon–Sat: 10am – 7pm, by appointment' },
              ].map(c => (
                <div key={c.text} className="bespoke-contact-item">
                  <span>{c.icon}</span>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="bespoke-form glass-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="bespoke-success">
                <motion.div animate={{ scale: [0.5, 1.2, 1] }} transition={{ duration: 0.7 }} style={{ fontSize: '4rem' }}>✨</motion.div>
                <h3>Thank you, {form.name}!</h3>
                <p>Your consultation request has been received. Our team will contact you at <strong>{form.email}</strong> within 24 hours.</p>
                <Link to="/" className="btn-primary" style={{ display: 'inline-flex', marginTop: '1rem' }}>Return Home</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="bespoke-form__title">Book Your Consultation</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Isabelle Fontaine" required />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="hello@example.com" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+44 7700 900000" />
                  </div>
                  <div className="form-group">
                    <label>Piece Type</label>
                    <select value={form.type} onChange={e => update('type', e.target.value)}>
                      <option value="">Select type</option>
                      {['Engagement Ring', 'Wedding Band', 'Necklace', 'Earrings', 'Bracelet', 'Pendant', 'Bespoke Set', 'Reimagining Heirloom'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Budget Range</label>
                    <select value={form.budget} onChange={e => update('budget', e.target.value)}>
                      <option value="">Select budget</option>
                      {['₹2,67,500 – ₹5,35,000', '₹5,35,000 – ₹10,70,000', '₹10,70,000 – ₹26,75,000', '₹26,75,000 – ₹53,50,000', '₹53,50,000+', 'To be discussed'].map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Consultation Type</label>
                    <select value={form.consultation} onChange={e => update('consultation', e.target.value)}>
                      <option value="in-person">In-Person (London)</option>
                      <option value="video">Video Call</option>
                    </select>
                  </div>
                </div>
                <div className="form-group form-group--full">
                  <label>Tell Us About Your Vision</label>
                  <textarea
                    value={form.vision}
                    onChange={e => update('vision', e.target.value)}
                    placeholder="Describe the piece you have in mind, occasion, stones you love, any inspiration..."
                    rows={4}
                    style={{ resize: 'vertical', width: '100%', padding: '0.75rem 1rem', border: '1.5px solid rgba(200,169,110,0.3)', borderRadius: 'var(--radius-sm)', fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', outline: 'none', transition: 'border-color 0.25s' }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                  Submit Request →
                </button>
                <p style={{ fontSize: '0.68rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '0.5rem' }}>We respond within 24 hours. Your details are kept strictly confidential.</p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bespoke-faqs container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-label">Questions</span>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: 'var(--text-dark)' }}>
            Frequently Asked <em className="pink-gradient-text">Questions</em>
          </h2>
        </div>
        <div className="bespoke-faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="bespoke-faq glass-card">
              <button className="bespoke-faq__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{faq.q}</span>
                <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.3 }} style={{ fontSize: '1.3rem', color: 'var(--pink-400)', flexShrink: 0 }}>+</motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div className="bespoke-faq__a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BespokePage;
