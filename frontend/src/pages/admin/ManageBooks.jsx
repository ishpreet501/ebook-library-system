import React, { useState } from 'react';
import { Plus, Edit2, Trash2, BookOpen, Search, Check, X } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';

/**
 * ManageBooks Component
 * -------------------------------------------------------------
 * Allows Admin to:
 * 1. View all books in a searchable table (direct from MongoDB)
 * 2. Add new books with chapters for the in-browser reader
 * 3. Edit existing book details
 * 4. Delete books with a confirmation prompt
 */
export const ManageBooks = ({ onSelectBook }) => {
  const { allBooks, authors, categories, addBook, updateBook, deleteBook, openReader } = useLibrary();

  // Search filter for table
  const [search, setSearch] = useState('');

  // Modal State (Used for both Adding & Editing)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookId, setEditingBookId] = useState(null);

  // Blank Form Template
  const emptyForm = {
    title: '',
    subtitle: '',
    author: authors[0]?._id || '',
    category: categories[0]?._id || '',
    description: '',
    isbn: '978-',
    publishedYear: new Date().getFullYear(),
    pageCount: 250,
    language: 'English',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    featured: false,
    chapters: [
      {
        title: 'Chapter 1: Getting Started',
        content: 'Write the chapter content here for the in-browser reader...',
      },
    ],
  };

  const [formData, setFormData] = useState(emptyForm);

  // --- Modal Open Handlers ---
  const handleOpenAdd = () => {
    setEditingBookId(null);
    setFormData({
      ...emptyForm,
      author: authors[0]?._id || '',
      category: categories[0]?._id || '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (book) => {
    setEditingBookId(book._id);
    setFormData({
      title: book.title || '',
      subtitle: book.subtitle || '',
      author: book.author?._id || book.author || '',
      category: book.category?._id || book.category || '',
      description: book.description || '',
      isbn: book.isbn || '',
      publishedYear: book.publishedYear || new Date().getFullYear(),
      pageCount: book.pageCount || 200,
      language: book.language || 'English',
      coverImage: book.coverImage || '',
      featured: !!book.featured,
      chapters: book.chapters && book.chapters.length > 0 ? book.chapters : emptyForm.chapters,
    });
    setIsModalOpen(true);
  };

  // --- Save / Submit Handler (MongoDB) ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('Please fill out both the title and description.');
      return;
    }

    if (editingBookId) {
      await updateBook(editingBookId, formData);
    } else {
      await addBook(formData);
    }

    setIsModalOpen(false);
  };

  // --- Delete Book Handler ---
  const handleDeleteBook = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}" from MongoDB?`)) {
      deleteBook(id);
    }
  };

  // --- Chapter Management in Modal ---
  const addChapter = () => {
    setFormData({
      ...formData,
      chapters: [
        ...formData.chapters,
        { title: `Chapter ${formData.chapters.length + 1}: Next Section`, content: '' },
      ],
    });
  };

  const updateChapterTitle = (index, newTitle) => {
    const updated = [...formData.chapters];
    updated[index].title = newTitle;
    setFormData({ ...formData, chapters: updated });
  };

  const updateChapterContent = (index, newContent) => {
    const updated = [...formData.chapters];
    updated[index].content = newContent;
    setFormData({ ...formData, chapters: updated });
  };

  const removeChapter = (index) => {
    if (formData.chapters.length <= 1) {
      alert('A book must have at least one chapter.');
      return;
    }
    const updated = formData.chapters.filter((_, i) => i !== index);
    setFormData({ ...formData, chapters: updated });
  };

  // --- Filter Books by Search ---
  const filteredBooks = allBooks.filter((book) => {
    const q = search.toLowerCase();
    const titleMatch = book.title?.toLowerCase().includes(q);
    const authorMatch = book.author?.name?.toLowerCase().includes(q);
    const isbnMatch = book.isbn?.includes(q);
    return titleMatch || authorMatch || isbnMatch;
  });

  return (
    <div className="space-y-6">
      
      {/* 1. Action Bar: Search Input & Add Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, author, or ISBN..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <button
          onClick={handleOpenAdd}
          className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" /> Add New E-Book
        </button>
      </div>

      {/* 2. Books Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Book Title & Author</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Year & Pages</th>
                <th className="py-3.5 px-4">Reads / Downloads</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBooks.map((book) => (
                <tr key={book._id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Title & Cover */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-10 h-14 object-cover rounded shadow-sm flex-shrink-0"
                      />
                      <div className="max-w-xs">
                        <p className="font-bold text-slate-900 truncate">{book.title}</p>
                        <p className="text-slate-500 truncate">{book.author?.name || 'Unknown Author'}</p>
                        <span className="text-[10px] text-slate-400 font-mono">ISBN: {book.isbn}</span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-medium">
                      {book.category?.name || 'General'}
                    </span>
                  </td>

                  {/* Year & Pages */}
                  <td className="py-3 px-4 text-slate-600">
                    <p>{book.publishedYear}</p>
                    <p className="text-slate-400">{book.pageCount} pages</p>
                  </td>

                  {/* Reads & Downloads */}
                  <td className="py-3 px-4 text-slate-600">
                    <p className="text-indigo-600 font-semibold">{book.readsCount || 0} reads</p>
                    <p className="text-emerald-600 font-semibold">{book.downloadsCount || 0} downloads</p>
                  </td>

                  {/* Action Buttons: Read, Edit, Delete */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openReader(book)}
                        title="Read in Browser"
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <BookOpen className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(book)}
                        title="Edit Book Details"
                        className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book._id, book.title)}
                        title="Delete Book from Database"
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Add / Edit Book Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingBookId ? 'Edit E-Book' : 'Add New E-Book'}
                </h2>
                <p className="text-xs text-slate-500">Manage book details and chapters in MongoDB.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Book Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Designing Data-Intensive Applications"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. The Big Ideas Behind Scalable Systems"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Author *</label>
                  <select
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white"
                  >
                    {authors.map((auth) => (
                      <option key={auth._id} value={auth._id}>
                        {auth.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">ISBN</label>
                  <input
                    type="text"
                    value={formData.isbn}
                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Published Year</label>
                  <input
                    type="number"
                    value={formData.publishedYear}
                    onChange={(e) => setFormData({ ...formData, publishedYear: parseInt(e.target.value) || 2024 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Page Count</label>
                  <input
                    type="number"
                    value={formData.pageCount}
                    onChange={(e) => setFormData({ ...formData, pageCount: parseInt(e.target.value) || 100 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description / Summary *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white"
                />
              </div>

              {/* Chapters Section */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-800">Reading Chapters</span>
                  <button
                    type="button"
                    onClick={addChapter}
                    className="px-2.5 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Chapter
                  </button>
                </div>

                <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                  {formData.chapters.map((ch, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={ch.title}
                          onChange={(e) => updateChapterTitle(idx, e.target.value)}
                          placeholder="Chapter Title"
                          className="font-bold text-slate-800 bg-white border border-slate-200 px-2 py-1 rounded text-xs flex-1 mr-2"
                        />
                        <button
                          type="button"
                          onClick={() => removeChapter(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={ch.content}
                        onChange={(e) => updateChapterContent(idx, e.target.value)}
                        placeholder="Chapter text content..."
                        className="w-full bg-white border border-slate-200 p-2 rounded text-xs text-slate-700"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> {editingBookId ? 'Save Changes' : 'Publish Book'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
