import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

/**
 * AuthorsPage Component
 * -------------------------------------------------------------
 * Displays the list of registered authors from MongoDB.
 * Clicking an author filters the /books catalog to that author.
 */
export const AuthorsPage = () => {
  const navigate = useNavigate();
  const { authors, allBooks, setSelectedAuthor } = useLibrary();

  const handleAuthorSelect = (authorId) => {
    setSelectedAuthor(authorId);
    navigate('/books');
  };

  return (
    <div className="space-y-8 pb-16">
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Authors List</span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Book Authors</h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore writers and creators who have published books in our library.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => {
          const authorBooks = allBooks.filter(
            (b) => b.author?._id === author._id || b.author === author._id || b.author?.name === author.name
          );

          return (
            <div
              key={author._id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={author.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                    alt={author.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100 shadow-sm"
                  />
                  <div>
                    <h2 className="font-bold text-slate-900 text-lg leading-tight">{author.name}</h2>
                    <p className="text-xs text-indigo-600 font-medium mt-1">
                      {author.nationality} • {author.bornYear ? `Born ${author.bornYear}` : 'Author'}
                    </p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {authorBooks.length} Books in Library
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {author.biography || 'Distinguished author in technical and literary disciplines.'}
                </p>

                {/* Book Titles List */}
                {authorBooks.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Available Titles:
                    </span>
                    <ul className="space-y-1">
                      {authorBooks.map((b) => (
                        <li key={b._id} className="text-xs text-slate-700 truncate flex items-center gap-1.5">
                          <BookOpen className="w-3 h-3 text-indigo-500 flex-shrink-0" />
                          <span className="truncate">{b.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleAuthorSelect(author._id)}
                  className="w-full py-2.5 px-3 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-slate-200 hover:border-indigo-200"
                >
                  Browse Books by {author.name.split(' ')[0]} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
