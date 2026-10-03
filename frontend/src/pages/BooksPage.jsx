import React from 'react';
import { Search, Filter, SlidersHorizontal, BookOpen, X } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { BookCard } from '../components/BookCard';

export const BooksPage = () => {
  const {
    books,
    allBooks,
    categories,
    authors,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedAuthor,
    setSelectedAuthor,
    sortBy,
    setSortBy,
  } = useLibrary();

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedAuthor('all');
    setSortBy('featured');
  };

  const isFiltered = searchQuery !== '' || selectedCategory !== 'all' || selectedAuthor !== 'all' || sortBy !== 'featured';

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Library Catalog</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Browse Available E-Books</h1>
          <p className="text-sm text-slate-500 mt-1">
            Explore our curated repository of books across computer science, philosophy, fiction, and design.
          </p>
        </div>

        <div className="text-xs text-slate-500">
          Showing <span className="font-bold text-slate-800">{books.length}</span> of <span className="font-bold text-slate-800">{allBooks.length}</span> books
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        
        {/* Top bar: Search + Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, keyword, or ISBN..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="w-full py-2.5 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700"
            >
              <option value="all">All Authors</option>
              {authors.map((auth) => (
                <option key={auth._id} value={auth._id}>
                  {auth.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2.5 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 font-medium"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="rating">Sort by: Highest Rated</option>
              <option value="downloads">Sort by: Most Downloaded</option>
              <option value="reads">Sort by: Most Read</option>
              <option value="newest">Sort by: Publication Year</option>
              <option value="title">Sort by: Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat._id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="ml-auto text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 whitespace-nowrap px-2"
            >
              <X className="w-3.5 h-3.5" /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Book Grid */}
      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No books found matching your criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords, clearing selected filters, or exploring other categories.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
