import React, { useState } from 'react';
import { Plus, Edit2, Trash2, FolderOpen, Check, X, BookOpen } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';

export const ManageCategories = () => {
  const { categories, allBooks, addCategory, updateCategory, deleteCategory } = useLibrary();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCatId, setEditingCatId] = useState(null);

  const initialForm = {
    name: '',
    slug: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialForm);

  const openAddModal = () => {
    setEditingCatId(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCatId(cat._id);
    setFormData({
      name: cat.name || '',
      slug: cat.slug || '',
      description: cat.description || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Category name is required.');
      return;
    }

    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload = { ...formData, slug };

    if (editingCatId) {
      await updateCategory(editingCatId, payload);
    } else {
      await addCategory(payload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    const catBooks = allBooks.filter((b) => b.category?._id === id || b.category === id);
    if (catBooks.length > 0) {
      alert(`Cannot delete "${name}" because it contains ${catBooks.length} book(s). Please move or delete the books first.`);
      return;
    }

    if (window.confirm(`Are you sure you want to delete category "${name}"?`)) {
      deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Manage Book Categories</h2>
          <p className="text-xs text-slate-500">Add or edit book categories for the library catalog.</p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const catBooks = allBooks.filter(
            (b) => b.category?._id === cat._id || b.category?.slug === cat.slug || b.category === cat._id
          );

          return (
            <div
              key={cat._id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      <FolderOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{cat.name}</h3>
                      <p className="text-[11px] text-slate-400 font-mono">slug: {cat.slug || cat.name.toLowerCase()}</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> {catBooks.length}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {cat.description || 'No description entered for this category.'}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(cat)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(cat._id, cat.name)}
                  className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900">
                {editingCatId ? 'Edit Category' : 'Create New Category'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Distributed Systems"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Slug (URL friendly)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. distributed-systems"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the scope of books included in this classification..."
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
                  <Check className="w-4 h-4" /> Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
