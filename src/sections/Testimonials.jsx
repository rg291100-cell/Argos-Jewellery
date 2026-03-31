import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Isabelle Fontaine',
    role: 'Bride & Loyal Client',
    location: 'Paris, France',
    rating: 5,
    text: 'My Argos engagement ring is the most beautiful thing I have ever worn. The way the sapphire catches the light makes me weak every single morning. The service was as luxurious as the jewellery itself.',
    avatar: '👸',
    purchase: 'Eternal Rose Ring',
  },
  {
    id: 2,
    name: 'Charlotte Ashworth',
    role: 'Interior Designer',
    location: 'London, UK',
    rating: 5,
    text: 'I gifted my mother the Pearl Cascade earrings for her 60th birthday. She wept with joy. The packaging alone is a work of art. Argos understands that luxury is in every detail.',
    avatar: '💁‍♀️',
    purchase: 'Pearl Cascade Earrings',
  },
  {
    id: 3,
    name: 'Priya Mehta',
    role: 'Fashion Editor',
    location: 'Mumbai, India',
    rating: 5,
    text: "Having worked with the world's finest luxury brands, I can say Argos stands in a class truly its own. The Diamond Rivière necklace has featured in three of my magazine covers this year.",
    avatar: '👩‍💼',
    purchase: 'Diamond Rivière Necklace',
  },
  {
    id: 4,
    name: 'Sofia De Luca',
    role: 'Art Collector',
    location: 'Milan, Italy',
    rating: 5,
    text: 'I have been collecting Argos pieces for six years. Each one tells a story. The bespoke consultation process is extraordinary — they truly listen and create something that feels like it was made for your soul.',
    avatar: '🎨',
    purchase: 'Bespoke Commission',
  },
];

const StarFull = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--gold)" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const Testimonials = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  const t = testimonials[active];

  return (
    <section className="testimonials">
      <div className="testimonials__bg-text">LOVE</div>
      <div className="container">
        <motion.div
          ref={ref}
          className="testimonials__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Client Stories</span>
          <h2 className="testimonials__title">
            Moments that
            <br />
            <em className="pink-gradient-text">Last a Lifetime</em>
          </h2>
          <div className="diamond-divider"><span /></div>
        </motion.div>

        <motion.div
          className="testimonials__carousel"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Main testimonial */}
          <div className="testimonials__main glass-card">
            {/* Quote mark */}
            <div className="testimonials__quote-mark">"</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="testimonials__content"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
              >
                {/* Stars */}
                <div className="testimonials__stars">
                  {[...Array(t.rating)].map((_, i) => <StarFull key={i} />)}
                </div>

                <p className="testimonials__text">{t.text}</p>

                <div className="testimonials__purchase">
                  <span className="testimonials__purchase-label">Purchased:</span>
                  <span className="testimonials__purchase-item gradient-text">{t.purchase}</span>
                </div>

                <div className="testimonials__author">
                  <div className="testimonials__avatar">{t.avatar}</div>
                  <div>
                    <div className="testimonials__name">{t.name}</div>
                    <div className="testimonials__meta">{t.role} · {t.location}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="testimonials__nav">
              <button className="testimonials__nav-btn" onClick={prev} aria-label="Previous">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <div className="testimonials__dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`testimonials__dot ${i === active ? 'active' : ''}`}
                    onClick={() => setActive(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button className="testimonials__nav-btn" onClick={next} aria-label="Next">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Side cards */}
          <div className="testimonials__side">
            {testimonials.filter((_, i) => i !== active).slice(0, 2).map((t, i) => (
              <motion.div
                key={t.id}
                className="testimonials__side-card glass-card hoverable"
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.15 }}
                onClick={() => setActive(testimonials.findIndex(x => x.id === t.id))}
                whileHover={{ x: -6 }}
              >
                <div className="testimonials__side-avatar">{t.avatar}</div>
                <div>
                  <div className="testimonials__side-name">{t.name}</div>
                  <div className="testimonials__side-text">"{t.text.substring(0, 80)}..."</div>
                  <div className="testimonials__side-item gradient-text">{t.purchase}</div>
                </div>
              </motion.div>
            ))}

            {/* Trust badge */}
            <motion.div
              className="testimonials__trust glass-card"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              <div className="testimonials__trust-row">
                {['⭐ 4.98/5', '50K+ Clients', '12 Awards'].map((item) => (
                  <div key={item} className="testimonials__trust-item">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="testimonials__trust-text">Trusted by clients in 40+ countries</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
