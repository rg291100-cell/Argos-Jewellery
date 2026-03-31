import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const navItems = [
  {
    label: 'Collections',
    href: '/collections',
    dropdown: [
      { label: 'All Jewellery', href: '/collections', icon: '💎' },
      { label: 'Rings', href: '/collections/rings', icon: '💍' },
      { label: 'Necklaces', href: '/collections/necklaces', icon: '📿' },
      { label: 'Earrings', href: '/collections/earrings', icon: '✨' },
      { label: 'Bracelets', href: '/collections/bracelets', icon: '⛓️' },
      { label: 'Pendants', href: '/collections/pendants', icon: '⭐' },
      { label: 'Sets', href: '/collections/sets', icon: '👑' },
    ],
  },
  {
    label: 'Fine Jewellery',
    href: '/collections',
    dropdown: [
      { label: 'Bridal', href: '/collections/sets', icon: '👰' },
      { label: 'Engagement Rings', href: '/collections/rings', icon: '💍' },
      { label: 'Anniversary Gifts', href: '/collections', icon: '💕' },
      { label: 'Gifting', href: '/collections', icon: '🎁' },
    ],
  },
  {
    label: 'Our World',
    href: '#',
    dropdown: [
      { label: 'Our Story', href: '/#story', icon: '📖' },
      { label: 'Craftsmanship', href: '/#craftsmanship', icon: '⚒️' },
      { label: 'Lookbook', href: '/lookbook', icon: '📷' },
      { label: 'Sustainability', href: '#', icon: '🌿' },
    ],
  },
  {
    label: 'Services',
    href: '#',
    dropdown: [
      { label: 'Bespoke Creations', href: '/bespoke', icon: '✏️' },
      { label: 'Ring Sizing', href: '#', icon: '📏' },
      { label: 'Jewellery Repair', href: '#', icon: '🔧' },
      { label: 'Valuation', href: '#', icon: '🔬' },
      { label: 'Book Appointment', href: '/bespoke', icon: '📅' },
    ],
  },
  { label: 'Lookbook', href: '/lookbook', dropdown: null },
  { label: 'Sale', href: '/collections', badge: 'Up to 30% Off', dropdown: null, highlight: true },
];

const Navbar = () => {
  // No scrolled state — we mutate the nav class directly to avoid re-renders
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const dropdownTimer = useRef(null);
  const navRef = useRef(null);
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('navbar--scrolled', window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location]);

  const handleMouseEnter = (label) => {
    clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav ref={navRef} className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-script">Argos</span>
          <span className="navbar__logo-text">JEWELLERY</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="navbar__links">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="navbar__item"
              onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to={item.href}
                className={`navbar__link ${item.highlight ? 'navbar__link--sale' : ''} ${location.pathname === item.href ? 'active' : ''}`}
              >
                {item.label}
                {item.badge && <span className="navbar__badge">{item.badge}</span>}
                {item.dropdown && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '3px', transition: 'transform 0.3s', transform: activeDropdown === item.label ? 'rotate(180deg)' : 'none' }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {item.dropdown && activeDropdown === item.label && (
                  <motion.ul
                    className="navbar__dropdown"
                    initial={{ opacity: 0, y: 10, scaleY: 0.95 }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: 8, scaleY: 0.96 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.dropdown.map((sub, i) => (
                      <motion.li key={sub.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                        <Link to={sub.href} className="navbar__dropdown-link" onClick={() => setActiveDropdown(null)}>
                          <span className="navbar__dropdown-icon">{sub.icon}</span>
                          {sub.label}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          {/* Search */}
          <button className="navbar__icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="navbar__icon-btn navbar__icon-btn--badge" aria-label="Wishlist">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {wishCount > 0 && <span className="navbar__count">{wishCount}</span>}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="navbar__icon-btn navbar__icon-btn--badge" aria-label="Cart">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && <span className="navbar__count navbar__count--cart">{cartCount}</span>}
          </Link>

          {/* Account */}
          <Link to={user ? '/account' : '/account/login'} className="navbar__icon-btn" aria-label="Account">
            {user ? (
              <div className="navbar__user-avatar">{user.name.charAt(0)}</div>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            )}
          </Link>

          {/* Hamburger */}
          <button className={`navbar__hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="navbar__search-bar"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSearch} className="navbar__search-form">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="Search for rings, necklaces, diamonds..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="navbar__search-input"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="navbar__search-close">✕</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            {navItems.map((item, i) => (
              <div key={item.label}>
                <motion.div
                  className="navbar__mobile-item"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={item.href}
                    className={`navbar__mobile-link ${item.highlight ? 'navbar__mobile-link--sale' : ''}`}
                    onClick={() => !item.dropdown && setMenuOpen(false)}
                  >
                    {item.label}
                    {item.badge && <span className="navbar__badge">{item.badge}</span>}
                  </Link>
                  {item.dropdown && (
                    <button className="navbar__mobile-expand" onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                  )}
                </motion.div>
                <AnimatePresence>
                  {item.dropdown && mobileExpanded === item.label && (
                    <motion.div
                      className="navbar__mobile-sub"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      {item.dropdown.map(sub => (
                        <Link key={sub.label} to={sub.href} className="navbar__mobile-sub-link" onClick={() => setMenuOpen(false)}>
                          <span>{sub.icon}</span> {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <div className="navbar__mobile-actions">
              <Link to="/wishlist" className="navbar__mobile-action-btn" onClick={() => setMenuOpen(false)}>
                🤍 Wishlist {wishCount > 0 && `(${wishCount})`}
              </Link>
              <Link to={user ? '/account' : '/account/login'} className="navbar__mobile-action-btn" onClick={() => setMenuOpen(false)}>
                👤 {user ? user.name : 'Sign In'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
