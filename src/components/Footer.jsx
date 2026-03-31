import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const footerLinks = {
  Collections: [
    { label: 'All Jewellery', to: '/collections' },
    { label: 'Rings', to: '/collections/rings' },
    { label: 'Necklaces', to: '/collections/necklaces' },
    { label: 'Earrings', to: '/collections/earrings' },
    { label: 'Bracelets', to: '/collections/bracelets' },
    { label: 'Sets & Gifts', to: '/collections/sets' },
  ],
  'Client Care': [
    { label: 'Contact Us', to: '/bespoke' },
    { label: 'Book Appointment', to: '/bespoke' },
    { label: 'Shipping & Returns', to: '/' },
    { label: 'Ring Sizing Guide', to: '/' },
    { label: 'Jewellery Care', to: '/' },
    { label: 'FAQ', to: '/' },
  ],
  Company: [
    { label: 'Our Story', to: '/#story' },
    { label: 'Craftsmanship', to: '/#craftsmanship' },
    { label: 'Lookbook', to: '/lookbook' },
    { label: 'Bespoke Service', to: '/bespoke' },
    { label: 'Sustainability', to: '/' },
    { label: 'Careers', to: '/' },
  ],
};

const socialLinks = [
  { icon: '📷', label: 'Instagram', href: 'https://instagram.com' },
  { icon: '🐦', label: 'Twitter', href: 'https://twitter.com' },
  { icon: '📌', label: 'Pinterest', href: 'https://pinterest.com' },
  { icon: '▶️', label: 'YouTube', href: 'https://youtube.com' },
];

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      {/* Top wave */}
      <div className="footer__wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#2c1a1a" />
        </svg>
      </div>

      <div className="footer__body">
        <div className="footer__main container">
          {/* Brand col */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo" onClick={scrollTop}>
              <span className="footer__logo-script">Argos</span>
              <span className="footer__logo-sub">JEWELLERY</span>
            </Link>
            <p className="footer__tagline">
              Where every gem tells a story. Handcrafted in London since 2010.
            </p>
            <div className="footer__socials">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="footer__social-link hoverable" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="footer__certificates">
              {['GIA Certified', 'RJC Member', 'Fairtrade Gold'].map((cert) => (
                <span key={cert} className="footer__cert-badge">{cert}</span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer__col">
              <h4 className="footer__col-title">{title}</h4>
              <ul className="footer__list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer__link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Visit Us</h4>
            <div className="footer__contact-items">
              {[
                { icon: '📍', text: '42 Mayfair Lane, London, W1J 8NR' },
                { icon: '📞', text: '+44 (0) 20 7946 0931' },
                { icon: '✉️', text: 'hello@argosjewellery.com' },
                { icon: '🕐', text: 'Mon–Sat: 10am – 7pm' },
              ].map((item) => (
                <div key={item.text} className="footer__contact-item">
                  <span className="footer__contact-icon">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Account links */}
            <div className="footer__account-links">
              <Link to="/account/login" className="footer__account-link">Sign In</Link>
              <span>·</span>
              <Link to="/account/register" className="footer__account-link">Register</Link>
              <span>·</span>
              <Link to="/wishlist" className="footer__account-link">Wishlist</Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer__divider container">
          <div className="footer__divider-line" />
          <button className="footer__scroll-top" onClick={scrollTop} aria-label="Back to top">
            ✦ Back to Top ✦
          </button>
          <div className="footer__divider-line" />
        </div>

        {/* Bottom */}
        <div className="footer__bottom container">
          <p className="footer__copyright">
            © 2025 Argos Jewellery Ltd. All rights reserved. Registered in England & Wales No. 12345678.
          </p>
          <div className="footer__legal-links">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
              <Link key={l} to="/" className="footer__legal-link">{l}</Link>
            ))}
          </div>
          <div className="footer__payments">
            {['💳', '🅿️', '🏦', '🔒'].map((icon, i) => (
              <span key={i} className="footer__payment-icon">{icon}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
