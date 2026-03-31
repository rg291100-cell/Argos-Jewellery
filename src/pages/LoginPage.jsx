import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  if (user) { navigate('/account'); return null; }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = login(form.email, form.password);
    setLoading(false);
    if (result.success) navigate('/account');
    else setError(result.error);
  };

  return (
    <div className="auth-page">
      <div className="auth-page__deco auth-page__deco--1" />
      <div className="auth-page__deco auth-page__deco--2" />

      <motion.div
        className="auth-card glass-card"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Logo */}
        <Link to="/" className="auth-logo">
          <span className="auth-logo__script">Argos</span>
          <span className="auth-logo__sub">JEWELLERY</span>
        </Link>

        <h1 className="auth-title">Welcome <em className="pink-gradient-text">Back</em></h1>
        <p className="auth-subtitle">Sign in to access your orders, wishlist and exclusive member benefits.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="hello@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="auth-pass-wrap">
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button type="button" className="auth-pass-toggle" onClick={() => setShowPass(s => !s)}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="auth-form__row">
            <label className="auth-check">
              <input type="checkbox" checked={form.remember} onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))} />
              <span>Remember me</span>
            </label>
            <a href="#" className="auth-forgot">Forgot password?</a>
          </div>

          {error && (
            <motion.div className="auth-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              ⚠️ {error}
            </motion.div>
          )}

          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? (
              <span className="auth-loading">
                <span />Signing in...
              </span>
            ) : 'Sign In →'}
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider"><span>or continue with</span></div>

        {/* Social */}
        <div className="auth-socials">
          {['🍎 Apple', '🔵 Google', '📘 Facebook'].map(s => (
            <button key={s} className="auth-social-btn">{s}</button>
          ))}
        </div>

        <p className="auth-switch">
          New to Argos? <Link to="/account/register">Create an account</Link>
        </p>

        {/* Demo notice */}
        <div className="auth-demo">
          💡 Demo: Enter any email + password (min 6 chars) to sign in
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
