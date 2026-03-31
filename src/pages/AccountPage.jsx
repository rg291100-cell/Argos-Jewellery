import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './AccountPage.css';

const mockOrders = [
  { id: 'ARG-482916', date: '15 Mar 2025', status: 'Delivered', items: ['Pink Sapphire Solitaire'], total: 412000, emoji: '💍' },
  { id: 'ARG-361074', date: '2 Feb 2025', status: 'Shipped', items: ['Diamond Rivière Necklace'], total: 663400, emoji: '📿' },
  { id: 'ARG-219835', date: '28 Dec 2024', status: 'Delivered', items: ['Pearl Cascade Earrings', 'Gold Chain Bracelet'], total: 238610, emoji: '✨' },
];

const statusColors = {
  Delivered: { bg: 'rgba(45,122,79,0.1)', color: '#2d7a4f' },
  Shipped: { bg: 'rgba(52,144,220,0.1)', color: '#2980b9' },
  Processing: { bg: 'rgba(243,156,18,0.1)', color: '#d68910' },
};

const AccountPage = () => {
  const { user, logout } = useAuth();
  const { items: cartItems } = useCart();
  const { items: wishItems } = useWishlist();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', textAlign: 'center', padding: '8rem 2rem' }}>
        <div style={{ fontSize: '4rem' }}>👤</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2rem', color: 'var(--text-dark)' }}>Please Sign In</h2>
        <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>Access your orders, wishlist and exclusive benefits.</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/account/login" className="btn-primary">Sign In</Link>
          <Link to="/account/register" className="btn-secondary">Create Account</Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => { logout(); navigate('/'); };

  const tabs = ['overview', 'orders', 'wishlist', 'settings'];

  return (
    <div className="account-page">
      <div className="container">
        {/* Header */}
        <motion.div className="account-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="account-header__left">
            <div className="account-avatar">
              <span>{user.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="account-title">Welcome, <em className="pink-gradient-text">{user.name}</em></h1>
              <span className="account-tier">⭐ {user.tier} · Member since {user.memberSince}</span>
              <p className="account-email">{user.email}</p>
            </div>
          </div>
          <button className="account-logout" onClick={handleLogout}>
            Sign Out
          </button>
        </motion.div>

        {/* Stats bar */}
        <motion.div className="account-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {[
            { label: 'Orders', value: mockOrders.length, icon: '📦' },
            { label: 'Wishlist', value: wishItems.length, icon: '❤️' },
            { label: 'In Cart', value: cartItems.length, icon: '🛍️' },
            { label: 'Points', value: '2,840', icon: '✨' },
          ].map(stat => (
            <div key={stat.label} className="account-stat glass-card">
              <span className="account-stat__icon">{stat.icon}</span>
              <span className="account-stat__value gradient-text">{stat.value}</span>
              <span className="account-stat__label">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="account-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`account-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {activeTab === 'overview' && (
            <div className="account-overview">
              <div className="account-section">
                <h2 className="account-section__title">Recent Orders</h2>
                {mockOrders.slice(0, 2).map(order => (
                  <div key={order.id} className="account-order glass-card">
                    <div className="account-order__emoji">{order.emoji}</div>
                    <div className="account-order__info">
                      <div className="account-order__ref">{order.id}</div>
                      <div className="account-order__items">{order.items.join(', ')}</div>
                      <div className="account-order__date">{order.date}</div>
                    </div>
                    <div className="account-order__right">
                      <span className="account-order__status" style={statusColors[order.status]}>
                        {order.status}
                      </span>
                      <span className="account-order__total gradient-text">₹ {order.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
                <button className="account-view-all" onClick={() => setActiveTab('orders')}>View all orders →</button>
              </div>

              <div className="account-quick-links">
                {[
                  { icon: '💍', label: 'Shop Collections', href: '/collections' },
                  { icon: '❤️', label: 'My Wishlist', href: '/wishlist' },
                  { icon: '📅', label: 'Book Appointment', href: '/bespoke' },
                  { icon: '📷', label: 'Lookbook', href: '/lookbook' },
                ].map(link => (
                  <Link key={link.label} to={link.href} className="account-quick-link glass-card">
                    <span className="account-quick-link__icon">{link.icon}</span>
                    <span>{link.label}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="account-section">
              <h2 className="account-section__title">My Orders</h2>
              {mockOrders.map(order => (
                <div key={order.id} className="account-order glass-card">
                  <div className="account-order__emoji">{order.emoji}</div>
                  <div className="account-order__info">
                    <div className="account-order__ref">{order.id}</div>
                    <div className="account-order__items">{order.items.join(', ')}</div>
                    <div className="account-order__date">{order.date}</div>
                  </div>
                  <div className="account-order__right">
                    <span className="account-order__status" style={statusColors[order.status]}>{order.status}</span>
                    <span className="account-order__total gradient-text">₹ {order.total.toLocaleString('en-IN')}</span>
                    <button className="account-order__track">Track →</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="account-section">
              <h2 className="account-section__title">My Wishlist</h2>
              {wishItems.length === 0 ? (
                <div className="account-empty">
                  <p>Your wishlist is empty. <Link to="/collections">Browse collections</Link> to add pieces you love.</p>
                </div>
              ) : (
                <div className="account-wish-grid">
                  {wishItems.map((item, i) => (
                    <motion.div key={item.id} className="account-wish-item glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                      <div className="account-wish-item__thumb" style={{ background: item.bg }}>{item.emoji}</div>
                      <div className="account-wish-item__info">
                        <div className="account-wish-item__name">{item.name}</div>
                        <div className="account-wish-item__price gradient-text">₹ {item.price.toLocaleString('en-IN')}</div>
                      </div>
                      <Link to={`/product/${item.id}`} className="btn-primary btn-sm">View</Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="account-section account-settings">
              <h2 className="account-section__title">Account Settings</h2>
              <div className="account-settings-form glass-card">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue={user.name} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue={user.email} />
                  </div>
                </div>
                <div className="form-group form-group--full">
                  <label>Phone</label>
                  <input type="tel" placeholder="+44 7700 900000" />
                </div>
                <div className="form-group form-group--full">
                  <label>Default Address</label>
                  <input type="text" placeholder="12 Belgravia Square, London" />
                </div>
                <div className="account-settings__notif">
                  <h3>Notifications</h3>
                  {['Email newsletters', 'New collection alerts', 'Order updates', 'Exclusive offers'].map(n => (
                    <label key={n} className="auth-check">
                      <input type="checkbox" defaultChecked />
                      <span>{n}</span>
                    </label>
                  ))}
                </div>
                <button className="btn-primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AccountPage;
