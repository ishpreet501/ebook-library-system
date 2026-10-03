import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Download, BookOpen, Bookmark, Eye } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

/**
 * BookCard Component
 * -------------------------------------------------------------
 * Displays a realistic 3D book cover, metadata, and quick action buttons.
 * Uses react-router-dom navigate() to open book details at /book/:id.
 */
export const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const { openReader, downloadBook, bookmarks, toggleBookmark } = useLibrary();
  const isBookmarked = bookmarks.includes(book._id);

  const goToDetails = () => {
    navigate(`/book/${book._id}`);
  };

  return (
    <div className="book-card-3d glass-card rounded-3xl p-5 flex flex-col justify-between hover:border-slate-300/80 transition-all shadow-sm">
      <div>
        {/* 1. 3D Physical Book Cover */}
        <div 
          onClick={goToDetails}
          className="book-cover-3d aspect-[3/4] w-full bg-slate-100 cursor-pointer mb-4 relative"
        >
          <div className="ribbon-bookmark"></div>
          <img
            src={book.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80'}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80';
            }}
            loading="lazy"
          />
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
            {book.category?.name || 'General'}
          </div>
        </div>

        {/* 2. Book Metadata */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700 truncate max-w-[150px]">
              {book.author?.name || 'Unknown Author'}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{book.rating ? book.rating.toFixed(1) : '4.8'}</span>
            </div>
          </div>

          <h3
            onClick={goToDetails}
            className="font-serif-display font-bold text-lg text-slate-900 leading-snug cursor-pointer line-clamp-1 hover:text-indigo-600 transition-colors"
            title={book.title}
          >
            {book.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {book.description}
          </p>
        </div>
      </div>

      {/* 3. Action Buttons */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* Read in-browser */}
        <button
          onClick={() => openReader(book)}
          className="flex-1 py-2 px-3 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Read</span>
        </button>

        {/* View Details */}
        <button
          onClick={goToDetails}
          title="View Details"
          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        {/* Offline Download */}
        <button
          onClick={() => downloadBook(book)}
          title="Download Offline Copy"
          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="text-[11px] font-mono-code">{book.downloadsCount || 0}</span>
        </button>

        {/* Bookmark */}
        <button
          onClick={() => toggleBookmark(book._id)}
          title={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
          className={`p-2 rounded-xl border text-xs transition-colors ${
            isBookmarked
              ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-900'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
};
