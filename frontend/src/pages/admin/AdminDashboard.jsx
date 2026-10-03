import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, FolderOpen, Eye, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';
import { ManageBooks } from './ManageBooks';
import { ManageAuthors } from './ManageAuthors';
import { ManageCategories } from './ManageCategories';

/**
 * AdminDashboard Component
 * -------------------------------------------------------------
 * Accessible directly at /admin once authenticated.
 * Displays quick stats and allows managing Books, Authors, and Categories.
 */
export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { stats, allBooks, authors, categories } = useLibrary();
  
  // Tab switcher state: 'books' | 'authors' | 'categories'
  const [activeTab, setActiveTab] = useState('books');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* 1. Header: Admin Title & Logout Button */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md">
            Admin Panel
          </span>
          <h1 className="text-2xl font-bold mt-2">Library Management Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Logged in as: <span className="text-amber-300 font-medium">{user?.email || 'admin@ebooklib.com'}</span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out Admin
        </button>
      </div>

      {/* 2. Quick KPI Stats Strip (Direct MongoDB Counts) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Books Count */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Books</p>
            <p className="text-2xl font-bold text-slate-900">{allBooks.length}</p>
          </div>
        </div>

        {/* Authors Count */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Authors</p>
            <p className="text-2xl font-bold text-slate-900">{authors.length}</p>
          </div>
        </div>

        {/* Categories Count */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <FolderOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Categories</p>
            <p className="text-2xl font-bold text-slate-900">{categories.length}</p>
          </div>
        </div>

        {/* Reads Count */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Reads</p>
            <p className="text-2xl font-bold text-slate-900">{stats.totalReads || 0}</p>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('books')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'books'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Manage Books ({allBooks.length})
        </button>

        <button
          onClick={() => setActiveTab('authors')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'authors'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" /> Manage Authors ({authors.length})
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'categories'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FolderOpen className="w-4 h-4" /> Manage Categories ({categories.length})
        </button>
      </div>

      {/* 4. Active Tab Content */}
      <div className="pt-2">
        {activeTab === 'books' && <ManageBooks />}
        {activeTab === 'authors' && <ManageAuthors />}
        {activeTab === 'categories' && <ManageCategories />}
      </div>

    </div>
  );
};
