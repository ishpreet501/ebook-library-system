import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, BookOpen } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { BookCard } from '../components/BookCard';

/**
 * BookmarksPage Component
 * -------------------------------------------------------------
 * Displays the user's saved bookmarks saved in MongoDB.
 * Uses react-router-dom for navigation.
 */
export const BookmarksPage = () => {
  const navigate = useNavigate();
  const { allBooks, bookmarks } = useLibrary();
  const bookmarkedBooks = allBooks.filter((b) => bookmarks.includes(b._id));

  return (
    <div className="space-y-8 pb-16">
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">Saved Collection</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">My Bookmarks</h1>
          <p className="text-sm text-slate-500 mt-1">
            Access your saved books for quick reading and downloads.
          </p>
        </div>
        <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full">
          {bookmarkedBooks.length} Saved Books
        </span>
      </div>

      {bookmarkedBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookmarkedBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Your bookmark shelf is empty</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the bookmark icon on any book card to save it here for fast reading access.
          </p>
          <button
            onClick={() => navigate('/books')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> Browse Catalog Now
          </button>
        </div>
      )}
    </div>
  );
};
