import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FolderOpen, ArrowRight } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

/**
 * CategoriesPage Component
 * -------------------------------------------------------------
 * Displays the list of book categories from MongoDB.
 * Clicking a category navigates to /books filtered by that category.
 */
export const CategoriesPage = () => {
  const navigate = useNavigate();
  const { categories, allBooks, setSelectedCategory } = useLibrary();

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    navigate('/books');
  };

  return (
    <div className="space-y-8 pb-16">
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Browse Categories</span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Book Categories</h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore books organized by subject, topic, and field.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const categoryBooks = allBooks.filter(
            (b) => b.category?._id === cat._id || b.category?.slug === cat.slug || b.category === cat._id
          );

          return (
            <div
              key={cat._id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <FolderOpen className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                    {categoryBooks.length} Available
                  </span>
                </div>

                <h2 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h2>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {cat.description || 'Comprehensive collection of curated publications.'}
                </p>

                {categoryBooks.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Featured in this category:
                    </span>
                    <div className="space-y-1.5">
                      {categoryBooks.slice(0, 3).map((book) => (
                        <div key={book._id} className="text-xs text-slate-700 truncate flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                          <span className="truncate">{book.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleCategorySelect(cat._id)}
                  className="w-full py-2.5 px-3 bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border border-slate-200 hover:border-indigo-600"
                >
                  Explore {cat.name} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
