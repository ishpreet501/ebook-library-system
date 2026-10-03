import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Download, Bookmark, Star, Clock, Globe, Hash, Calendar, Layers, ShieldCheck, User } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

/**
 * BookDetailPage Component
 * -------------------------------------------------------------
 * Displays the complete details for a single book.
 * Uses react-router-dom useParams() to get the book ID from URL (/book/:id).
 */
export const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allBooks, openReader, downloadBook, bookmarks, toggleBookmark } = useLibrary();

  const book = allBooks.find((b) => b._id === id);

  if (!book) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 max-w-lg mx-auto my-12">
        <h2 className="text-xl font-bold text-slate-800">Book Not Found</h2>
        <p className="text-xs text-slate-500">The book you are looking for may have been removed or does not exist.</p>
        <button
          onClick={() => navigate('/books')}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
        >
          Back to Books Catalog
        </button>
      </div>
    );
  }

  const isBookmarked = bookmarks.includes(book._id);
  const relatedBooks = allBooks
    .filter((b) => b._id !== book._id && (b.category?._id === book.category?._id || b.author?._id === book.author?._id))
    .slice(0, 3);

  return (
    <div className="space-y-12 pb-20">
      
      {/* 1. Back button & ISBN Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/books')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Books Catalog
        </button>
        <span className="text-xs text-slate-400 font-mono">ISBN: {book.isbn}</span>
      </div>

      {/* 2. Main Book Showcase Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Book Cover & Actions */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col items-center">
            <div className="w-full max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group relative">
              <img
                src={book.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80'}
                alt={book.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold rounded-lg">
                {book.category?.name || 'General'}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-[280px] mt-6 space-y-3">
              <button
                onClick={() => openReader(book)}
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-98"
              >
                <BookOpen className="w-4 h-4" /> Read Online Now
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => downloadBook(book)}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                >
                  <Download className="w-3.5 h-3.5" /> Download TXT
                </button>

                <button
                  onClick={() => toggleBookmark(book._id)}
                  className={`py-2.5 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border ${
                    isBookmarked
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" /> {isBookmarked ? 'Saved' : 'Bookmark'}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Details & Synopsis */}
          <div className="md:col-span-8 lg:col-span-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
                <span>{book.category?.name}</span>
                <span>•</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{book.rating ? book.rating.toFixed(1) : '4.8'} / 5.0</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                {book.title}
              </h1>

              {book.subtitle && (
                <p className="text-base text-slate-500 font-medium mt-2">
                  {book.subtitle}
                </p>
              )}
            </div>

            {/* Author Attribution Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-4">
              <img
                src={book.author?.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={book.author?.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <p className="text-xs text-slate-400 font-medium">Written by</p>
                <p className="font-bold text-slate-900 text-sm">{book.author?.name || 'Authorized Contributor'}</p>
                <p className="text-[11px] text-slate-500">{book.author?.nationality || 'International'}</p>
              </div>
            </div>

            {/* Book Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Published</span>
                <span className="font-bold text-slate-800">{book.publishedYear || '2024'}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Length</span>
                <span className="font-bold text-slate-800">{book.pageCount || 280} Pages</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Language</span>
                <span className="font-bold text-slate-800">{book.language || 'English'}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Total Readers</span>
                <span className="font-bold text-indigo-600">{book.readsCount || 0} Readers</span>
              </div>
            </div>

            {/* Synopsis / Description */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-400">
                Book Summary
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {book.description}
              </p>
            </div>

            {/* Table of Chapters */}
            {book.chapters && book.chapters.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-400">
                  Included Chapters ({book.chapters.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {book.chapters.map((ch, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                      <span className="font-mono font-bold text-indigo-600 w-5">{(idx + 1).toString().padStart(2, '0')}</span>
                      <span className="font-medium text-slate-800 truncate">{ch.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* 3. Related Books Section */}
      {relatedBooks.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">More Books in this Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedBooks.map((relBook) => (
              <div
                key={relBook._id}
                onClick={() => navigate(`/book/${relBook._id}`)}
                className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
              >
                <img
                  src={relBook.coverImage}
                  alt={relBook.title}
                  className="w-14 h-20 object-cover rounded-lg shadow-sm"
                />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{relBook.title}</h4>
                  <p className="text-xs text-slate-500 truncate">{relBook.author?.name}</p>
                  <span className="text-[11px] text-indigo-600 font-semibold mt-1 inline-block">
                    View Details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
