import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, X } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

/**
 * AuthRequiredModal Component
 * -------------------------------------------------------------
 * Appears when an unauthorized guest/visitor tries to read or download a book.
 * Navigates to /login upon clicking 'Sign In'.
 */
export const AuthRequiredModal = () => {
  const navigate = useNavigate();
  const { authPrompt, closeAuthPrompt } = useLibrary();

  if (!authPrompt.isOpen) return null;

  const actionText =
    authPrompt.action === 'read'
      ? 'open and read e-books in the in-browser reader'
      : authPrompt.action === 'download'
      ? 'download formatted e-books for offline reading'
      : 'save books to your personal shelf';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200 relative text-center space-y-6">
        
        {/* Close Button */}
        <button
          onClick={closeAuthPrompt}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon */}
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 inline-block">
            Member Access Only
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Sign In Required
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            You must be logged in as a registered reader to {actionText}.
            {authPrompt.bookTitle && (
              <span className="block mt-1 font-semibold text-slate-800">
                "{authPrompt.bookTitle}"
              </span>
            )}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={() => {
              closeAuthPrompt();
              navigate('/login');
            }}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In / Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={closeAuthPrompt}
            className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Continue Browsing Catalog
          </button>
        </div>

      </div>
    </div>
  );
};
