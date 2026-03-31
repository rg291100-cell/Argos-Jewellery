import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Newsletter.css';

const Newsletter = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="newsletter" ref={ref}>
      {/* Blobs — pure CSS, no JS loops */}
      <div className="newsletter__blob newsletter__blob--1" />
      <div className="newsletter__blob newsletter__blob--2" />

      <div className="container">
        <motion.div
          className="newsletter__card glass-card"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Decorative rings */}
          <div className="newsletter__ring newsletter__ring--1" />
          <div className="newsletter__ring newsletter__ring--2" />

          <div className="newsletter__inner">
            <div className="newsletter__content">
              <div
                className="float-anim"
                style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '1rem' }}
              >
                💌
              </div>
              <span className="section-label" style={{ justifyContent: 'center' }}>
                Exclusive Access
              </span>
              <h2 className="newsletter__title">
                Join the World of
                <br />
                <em className="pink-gradient-text">Argos Jewellery</em>
              </h2>
              <p className="newsletter__subtitle">
                Be the first to discover new collections, receive styling advice from our 
                jewellery experts, and enjoy exclusive member-only privileges.
              </p>

              {!submitted ? (
                <form className="newsletter__form" onSubmit={handleSubmit}>
                  <div className="newsletter__input-wrap">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="newsletter__input"
                      required
                      id="newsletter-email"
                    />
                    <button type="submit" className="btn-primary newsletter__submit">
                      Subscribe
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <p className="newsletter__privacy">
                    ✦ No spam, ever. Unsubscribe at any time. We respect your privacy.
                  </p>
                </form>
              ) : (
                <motion.div
                  className="newsletter__success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="newsletter__success-icon">✨</div>
                  <h3>Welcome to the World of Argos</h3>
                  <p>Thank you for joining. Something beautiful awaits in your inbox.</p>
                </motion.div>
              )}
            </div>

            {/* Perks */}
            <div className="newsletter__perks">
              {[
                { icon: '🎁', title: '10% Off First Order', desc: 'Exclusive welcome discount for new subscribers.' },
                { icon: '👑', title: 'VIP Early Access', desc: 'Shop new collections 48 hours before anyone else.' },
                { icon: '📦', title: 'Free Gift Wrapping', desc: 'Complimentary luxury packaging on every order.' },
                { icon: '💬', title: 'Styling Consultations', desc: 'Personal jewellery advice from our experts.' },
              ].map((perk, i) => (
                <motion.div
                  key={perk.title}
                  className="newsletter__perk"
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <span className="newsletter__perk-icon">{perk.icon}</span>
                  <div>
                    <div className="newsletter__perk-title">{perk.title}</div>
                    <div className="newsletter__perk-desc">{perk.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
