import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * LoginPage Component
 * -------------------------------------------------------------
 * Reader sign-in and account registration.
 * Uses react-router-dom useNavigate() to redirect after login.
 */
export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isRegister) {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all fields.');
        setLoading(false);
        return;
      }
      const res = await register(formData.name, formData.email, formData.password, 'user');
      if (res.success) {
        navigate('/');
      } else {
        setError(res.message || 'Registration failed');
      }
    } else {
      if (!formData.email || !formData.password) {
        setError('Please enter both email and password.');
        setLoading(false);
        return;
      }
      const res = await login(formData.email, formData.password);
      if (res.success) {
        if (formData.email === 'admin@ebooklib.com') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError(res.message || 'Invalid email or password');
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-200 shadow-xl space-y-6">
      
      {/* 1. Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
          <BookOpen className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          {isRegister ? 'Create Reader Account' : 'Welcome Back'}
        </h1>
        <p className="text-xs text-slate-500">
          {isRegister
            ? 'Sign up to read online, download e-books, and save personal bookmarks'
            : 'Sign in to access your reading shelf and e-book library'}
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* 2. Login / Register Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {isRegister && (
          <div>
            <label className="font-bold text-slate-700 block mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        <div>
          <label className="font-bold text-slate-700 block mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="reader@ebooklib.com"
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
        >
          {loading ? 'Please wait...' : isRegister ? 'Create Free Account' : 'Sign In'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* 3. Switch between Login and Register */}
      <div className="pt-4 border-t border-slate-100 text-center">
        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setError('');
          }}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
        >
          {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
        </button>
      </div>

    </div>
  );
};
