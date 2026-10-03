import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, Search, Shield, User, LogOut, Bookmark, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';

/**
 * Navbar Component
 * -------------------------------------------------------------
 * Uses standard react-router-dom Links & NavLinks for page navigation.
 */
export const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { bookmarks, searchQuery, setSearchQuery } = useLibrary();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Nav link style helper: highlights active page
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
      isActive
        ? 'text-indigo-600 font-semibold bg-indigo-50/70'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
    }`;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    navigate('/books');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* 1. Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-amber-400 shadow-sm border border-slate-800">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-serif-book font-bold text-lg tracking-tight text-slate-900 leading-none">
              BookShelf
            </span>
          </Link>

          {/* 2. Global Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search books by title, author, or ISBN..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100/80 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* 3. Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/books" className={navLinkClass}>
              Browse Books
            </NavLink>
            <NavLink to="/authors" className={navLinkClass}>
              Authors
            </NavLink>
            <NavLink to="/categories" className={navLinkClass}>
              Categories
            </NavLink>

            {/* ONLY show Admin link if logged-in user is verified as Admin */}
            {isAuthenticated && isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-amber-800 bg-amber-100 font-bold border border-amber-300'
                      : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                  }`
                }
              >
                <Shield className="w-4 h-4 text-amber-600" />
                Admin Dashboard
              </NavLink>
            )}
          </nav>

          {/* 4. Right Controls: Bookmarks & Auth State */}
          <div className="flex items-center gap-3">
            {/* Bookmarks Icon Button */}
            <Link
              to="/bookmarks"
              title="Saved Bookmarks"
              className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarks.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {/* User Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-semibold text-slate-800 leading-tight">{user.name}</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  title="Sign Out"
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                handleSearchChange(e);
                setMobileMenuOpen(false);
              }}
              placeholder="Search books..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-100 rounded-lg"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/books"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Browse All Books
            </Link>
            <Link
              to="/authors"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Authors
            </Link>
            <Link
              to="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Categories
            </Link>
            <Link
              to="/bookmarks"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              My Bookmarks
            </Link>

            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-amber-800 bg-amber-50 rounded-md flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-amber-600" /> Admin Dashboard
              </Link>
            )}

            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 rounded-md"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
