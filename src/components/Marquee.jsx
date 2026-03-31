import React from 'react';
import './Marquee.css';

const items = [
  '✦ Free Shipping Worldwide',
  '✦ Ethically Sourced Diamonds',
  '✦ Lifetime Warranty',
  '✦ 30-Day Returns',
  '✦ Bespoke Creations',
  '✦ Award-Winning Design',
  '✦ Complimentary Engraving',
];

const Marquee = () => {
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
