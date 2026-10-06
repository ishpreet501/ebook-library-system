import React, { useState } from 'react';
import { Plus, Edit2, Trash2, User, Globe, Calendar, Check, X, BookOpen } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';

export const ManageAuthors = () => {
  const { authors, allBooks, addAuthor, updateAuthor, deleteAuthor } = useLibrary();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthorId, setEditingAuthorId] = useState(null);

  const initialForm = {
    name: '',
    nationality: 'American',
    bornYear: '',
    biography: '',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  };

  const [formData, setFormData] = useState(initialForm);

  const openAddModal = () => {
    setEditingAuthorId(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (author) => {
    setEditingAuthorId(author._id);
    setFormData({
      name: author.name || '',
      nationality: author.nationality || '',
      bornYear: author.bornYear || '',
      biography: author.biography || '',
      photoUrl: author.photoUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Author name is required.');
      return;
    }

    let res;
    if (editingAuthorId) {
      res = await updateAuthor(editingAuthorId, formData);
    } else {
      res = await addAuthor(formData);
    }

    if (res && res.success === false) {
      alert(res.message || 'Failed to save author.');
      return;
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id, name) => {
    const authorBooks = allBooks.filter((b) => b.author?._id === id || b.author === id);
    if (authorBooks.length > 0) {
      alert(`Cannot delete ${name} because they have ${authorBooks.length} book(s) in the catalog. Please delete or reassign their books first.`);
      return;
    }

    if (window.confirm(`Are you sure you want to delete author "${name}"?`)) {
      const res = await deleteAuthor(id);
      if (res && res.success === false) {
        alert(res.message || 'Failed to delete author.');
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Manage Authors & Contributors</h2>
          <p className="text-xs text-slate-500">Configure biographical data, nationalities, and catalog attribution.</p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Author
        </button>
      </div>

      {/* Authors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => {
          const authorBooks = allBooks.filter(
            (b) => b.author?._id === author._id || b.author === author._id || b.author?.name === author.name
          );

          return (
            <div
              key={author._id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={author.photoUrl}
                      alt={author.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{author.name}</h3>
                      <p className="text-xs text-slate-500">{author.nationality} • Born {author.bornYear || 'N/A'}</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> {authorBooks.length}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {author.biography || 'No biography provided yet.'}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(author)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(author._id, author.name)}
                  className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Author Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900">
                {editingAuthorId ? 'Edit Author Profile' : 'Add New Author'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Author Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Martin Kleppmann"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nationality</label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    placeholder="e.g. British"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Birth Year</label>
                  <input
                    type="text"
                    value={formData.bornYear}
                    onChange={(e) => setFormData({ ...formData, bornYear: e.target.value })}
                    placeholder="e.g. 1980"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Photo URL</label>
                <input
                  type="text"
                  value={formData.photoUrl}
                  onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Biography</label>
                <textarea
                  rows={4}
                  value={formData.biography}
                  onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                  placeholder="Brief biography of the author's work, awards, and domain expertise..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white"
                />
              </div>

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
                  <Check className="w-4 h-4" /> Save Author
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
