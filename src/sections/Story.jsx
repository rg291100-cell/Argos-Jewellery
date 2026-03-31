import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Story.css';

const milestones = [
  { year: '2010', event: 'Founded in London\'s Mayfair district with a single atelier.' },
  { year: '2014', event: 'Launched the signature Eternal Rose collection, sold out in 48 hours.' },
  { year: '2017', event: 'Awarded the British Jewellery Excellence Award.' },
  { year: '2020', event: 'Expanded globally — now serving clients in 40+ countries.' },
  { year: '2024', event: 'Opened our Sustainability Lab for ethically tracked gemstones.' },
];

const Story = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="story" className="story" ref={ref}>
      {/* Background decoration */}
      <div className="story__bg-text">ARGOS</div>

      <div className="container">
        <div className="story__grid">
          {/* Left: Visual */}
          <motion.div
            className="story__visual"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Main card */}
            <div className="story__main-card glass-card">
              <div className="story__main-card-inner">
                {/* CSS float animation — no JS loop */}
                <div className="story__gem-display float-slow-anim">
                  <div className="story__gem story__gem--1">💎</div>
                  <div className="story__gem story__gem--2">✨</div>
                  <div className="story__gem story__gem--3">💍</div>
                </div>
                <div className="story__main-card-label">
                  <span className="story__main-card-value gradient-text">15+</span>
                  <span>Years of Heritage</span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            {/* CSS float animation — no framer-motion loop */}
            <div className="story__badge glass-card float-anim">
              <span className="story__badge-icon">🏆</span>
              <div>
                <div className="story__badge-title">Award Winning</div>
                <div className="story__badge-sub">British Jewellery Excellence</div>
              </div>
            </div>

            {/* Second badge */}
            <div className="story__badge story__badge--2 glass-card float-slow-anim">
              <span className="story__badge-icon">🌍</span>
              <div>
                <div className="story__badge-title">40+ Countries</div>
                <div className="story__badge-sub">Global Presence</div>
              </div>
            </div>

            {/* Decorative rings */}
            <div className="story__deco-ring story__deco-ring--1" />
            <div className="story__deco-ring story__deco-ring--2" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            className="story__content"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="section-label">Our Story</span>
            <h2 className="story__title">
              A Legacy Forged in
              <br />
              <em className="pink-gradient-text">Gold & Passion</em>
            </h2>
            <div className="diamond-divider"><span /></div>

            <p className="story__text">
              Born from a deep admiration for the art of fine jewellery, Argos was founded 
              in the heart of London's Mayfair with a singular vision: to create pieces 
              that outlast trends and transcend time.
            </p>
            <p className="story__text">
              Every jewel we craft begins its journey through the hands of our master 
              artisans — each with decades of experience, each dedicated to perfection. 
              We source only conflict-free, ethical diamonds and coloured gemstones, 
              certified by the world's most rigorous standards.
            </p>

            {/* Timeline */}
            <div className="story__timeline">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  className="story__milestone"
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                >
                  <div className="story__milestone-year gradient-text">{m.year}</div>
                  <div className="story__milestone-dot" />
                  <div className="story__milestone-event">{m.event}</div>
                </motion.div>
              ))}
            </div>

            <a href="#" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
              Discover Our Atelier
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Story;
