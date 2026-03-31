import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const RegisterPage = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', agree: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  if (user) { navigate('/account'); return null; }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (!form.agree) { setError('Please agree to the terms to continue.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = register(form.name, form.email, form.password);
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
        <Link to="/" className="auth-logo">
          <span className="auth-logo__script">Argos</span>
          <span className="auth-logo__sub">JEWELLERY</span>
        </Link>

        <h1 className="auth-title">Join <em className="pink-gradient-text">Argos</em></h1>
        <p className="auth-subtitle">Create your account and unlock exclusive member privileges, early access and complimentary gifts.</p>

        <div className="auth-perks">
          {['🎁 10% welcome discount', '👑 Early collection access', '📦 Free gift wrapping', '💬 Personal styling advice'].map(p => (
            <span key={p} className="auth-perk">{p}</span>
          ))}
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Isabelle Fontaine" required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="hello@example.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="auth-pass-wrap">
              <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="At least 6 characters" required />
              <button type="button" className="auth-pass-toggle" onClick={() => setShowPass(s => !s)}>{showPass ? '🙈' : '👁️'}</button>
            </div>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} placeholder="••••••••" required />
          </div>

          <label className="auth-check">
            <input type="checkbox" checked={form.agree} onChange={e => setForm(f => ({ ...f, agree: e.target.checked }))} />
            <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
          </label>

          {error && <motion.div className="auth-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>⚠️ {error}</motion.div>}

          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? <span className="auth-loading"><span />Creating account...</span> : 'Create My Account →'}
          </button>
        </form>

        <p className="auth-switch">Already a member? <Link to="/account/login">Sign in</Link></p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
