import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * AdminLoginPage Component
 * -------------------------------------------------------------
 * Accessible directly at URL /admin.
 * Authenticates against MongoDB with admin role credentials.
 */
export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Both email and password are required.');
      setLoading(false);
      return;
    }

    const res = await login(email, password);
    if (!res.success) {
      setError(res.message || 'Invalid administrator credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 space-y-6">
        
        {/* 1. Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center mx-auto shadow-lg">
            <Shield className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block">
            Admin Portal
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Administrator Sign In
          </h1>
          <p className="text-xs text-slate-500">
            Sign in with administrator credentials to manage library books, authors, and categories.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
            {error}
          </div>
        )}

        {/* 2. Admin Login Form */}
        <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Administrator Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ebooklib.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Sign In as Administrator'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 3. Back to Library */}
        <div className="pt-2 text-center border-t border-slate-100">
          <button
            onClick={() => navigate('/')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};
