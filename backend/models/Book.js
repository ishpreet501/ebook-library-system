const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide book title'],
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: [true, 'Please assign an author'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please assign a category'],
    },
    description: {
      type: String,
      required: [true, 'Please provide book description'],
    },
    isbn: {
      type: String,
      trim: true,
      default: '978-0000000000',
    },
    publishedYear: {
      type: Number,
      default: new Date().getFullYear(),
    },
    pageCount: {
      type: Number,
      default: 250,
    },
    language: {
      type: String,
      default: 'English',
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    },
    fileUrl: {
      type: String,
      default: '', // direct download URL or static path
    },
    chapters: [chapterSchema], // readable content inside the reader
    rating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5,
    },
    downloadsCount: {
      type: Number,
      default: 0,
    },
    readsCount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Search indexing
bookSchema.index({ title: 'text', description: 'text', isbn: 'text' });

module.exports = mongoose.model('Book', bookSchema);
