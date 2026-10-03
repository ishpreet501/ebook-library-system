import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { BookCard } from '../components/BookCard';

/**
 * HomePage Component
 * -------------------------------------------------------------
 * Clean landing page showcasing:
 * - Hero introduction and quick stats
 * - Top featured books
 * - Book categories
 */
export const HomePage = () => {
  const navigate = useNavigate();
  const { allBooks, categories, stats, setSelectedCategory } = useLibrary();
  const featuredBooks = allBooks.filter((b) => b.featured).slice(0, 4);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate('/books');
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-8 md:p-16 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-24 w-80 h-80 bg-violet-600/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Digital E-Book Library Platform</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Discover, Read & Download <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-200 to-amber-200">
              Modern Digital E-Books.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            A comprehensive digital library platform featuring an in-browser distraction-free e-book reader, chapter navigation, and one-click offline text downloads.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/books"
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 transform active:scale-95"
            >
              <BookOpen className="w-4 h-4" /> Explore All E-Books
            </Link>
            <Link
              to="/categories"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-md transition-all flex items-center gap-2"
            >
              <span>Browse Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">{stats.totalBooks}+</p>
              <p className="text-xs text-slate-400 mt-0.5">Total Books</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-300">{stats.totalReads}+</p>
              <p className="text-xs text-slate-400 mt-0.5">Book Readers</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-300">{stats.totalDownloads}+</p>
              <p className="text-xs text-slate-400 mt-0.5">Downloads</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-300">{stats.totalAuthors}+</p>
              <p className="text-xs text-slate-400 mt-0.5">Authors</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Books Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Top Picks
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">Featured Books</h2>
          </div>
          <Link
            to="/books"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
          >
            View All Books <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </section>

      {/* 3. Categories Showcase */}
      <section className="space-y-6">
        <div>
          <span className="text-indigo-600 font-semibold text-xs uppercase tracking-wider">Categories</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">Explore by Category</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => handleCategoryClick(cat._id)}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Browse Category</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-indigo-600" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
