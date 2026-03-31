import React, { Suspense, lazy } from 'react';
import Hero from '../sections/Hero';
import Marquee from '../components/Marquee';

// Lazy-load all below-fold sections — they split into separate chunks
// and won't block the initial Hero paint.
const Collections = lazy(() => import('../sections/Collections'));
const Story = lazy(() => import('../sections/Story'));
const Featured = lazy(() => import('../sections/Featured'));
const Craftsmanship = lazy(() => import('../sections/Craftsmanship'));
const Testimonials = lazy(() => import('../sections/Testimonials'));
const Newsletter = lazy(() => import('../sections/Newsletter'));

const LazyFallback = () => (
  <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
    <div style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid var(--pink-200)', borderTopColor: 'var(--pink-400)', animation: 'spin-slow 0.8s linear infinite' }} />
  </div>
);

const HomePage = () => (
  <>
    {/* Hero is above-fold — never lazy */}
    <Hero />
    <Marquee />

    {/* Below-fold sections: lazy + content-visibility:auto skip paint when off-screen */}
    <Suspense fallback={<LazyFallback />}>
      <div className="cv-auto"><Collections /></div>
      <div className="cv-auto"><Story /></div>
      <div className="cv-auto"><Featured /></div>
      <div className="cv-auto"><Craftsmanship /></div>
      <div className="cv-auto"><Testimonials /></div>
      <div className="cv-auto"><Newsletter /></div>
    </Suspense>
  </>
);

export default HomePage;
