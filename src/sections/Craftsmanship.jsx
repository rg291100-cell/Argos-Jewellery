import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Craftsmanship.css';

const steps = [
  {
    step: '01',
    icon: '✏️',
    title: 'Design & Conception',
    desc: 'Every piece begins as a sketch — our designers translate emotion and vision into precision blueprints that guide the entire creation process.',
  },
  {
    step: '02',
    icon: '⚒️',
    title: 'Master Smithing',
    desc: 'Skilled goldsmiths hand-forge each mount and setting from precious metals, shaping the very skeleton of your future jewel.',
  },
  {
    step: '03',
    icon: '💎',
    title: 'Gem Selection',
    desc: 'Our gemologists travel the world to hand-select stones of the finest colour, clarity, and cut — every gem chosen by eye and heart.',
  },
  {
    step: '04',
    icon: '🔬',
    title: 'Precision Setting',
    desc: 'Stone setters work under microscopes, placing each gem with millimetre accuracy so light dances through it perfectly.',
  },
  {
    step: '05',
    icon: '✨',
    title: 'Polish & Quality',
    desc: 'After a final mirror-polish, every piece passes a 47-point quality check before it is gently wrapped for its new guardian.',
  },
];

const Craftsmanship = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="craftsmanship" className="craft">
      {/* Pink gradient background */}
      <div className="craft__bg" />

      <div className="container">
        <motion.div
          ref={ref}
          className="craft__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">The Argos Method</span>
          <h2 className="craft__title">
            Five Steps to
            <br />
            <em className="pink-gradient-text">Pure Perfection</em>
          </h2>
          <div className="diamond-divider"><span /></div>
          <p className="craft__subtitle">
            From the first sketch to the final polish, every Argos jewel is born 
            through a meticulous process refined over fifteen years.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="craft__steps">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              className="craft__step"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
            >
              {/* Number */}
              <div className="craft__step-num gradient-text">{step.step}</div>

              {/* Icon ring */}
              <div className="craft__icon-wrap">
                <div className="craft__icon-ring" />
              {/* CSS float animation — no framer-motion loop */}
              <div className="craft__icon float-anim">
                  {step.icon}
                </div>
              </div>

              {/* Connector line */}
              {i < steps.length - 1 && <div className="craft__connector" />}

              {/* Text */}
              <h3 className="craft__step-title">{step.title}</h3>
              <p className="craft__step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          className="craft__banner glass-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="craft__banner-left">
            <div className="craft__banner-icon float-anim">
              🏅
            </div>
            <div>
              <h3 className="craft__banner-title">Certified Excellence</h3>
              <p className="craft__banner-sub">
                All our diamonds are GIA certified. Every piece comes with a lifetime 
                warranty and free annual maintenance service.
              </p>
            </div>
          </div>
          <a href="#" className="btn-primary">Book a Private Consultation</a>
        </motion.div>
      </div>
    </section>
  );
};

export default Craftsmanship;
