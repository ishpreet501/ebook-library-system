const Book = require('../models/Book');
const Author = require('../models/Author');
const Category = require('../models/Category');

/**
 * Stats Controller
 * -------------------------------------------------------------
 * Simple counts directly from MongoDB for dashboard display.
 */

// GET /api/stats: Returns total counts for Books, Authors, Categories, Reads, Downloads
const getStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalAuthors = await Author.countDocuments();
    const totalCategories = await Category.countDocuments();

    // Sum reads and downloads across books
    const books = await Book.find({}, 'readsCount downloadsCount');
    const totalReads = books.reduce((sum, b) => sum + (b.readsCount || 0), 0);
    const totalDownloads = books.reduce((sum, b) => sum + (b.downloadsCount || 0), 0);

    res.json({
      success: true,
      data: {
        totalBooks,
        totalAuthors,
        totalCategories,
        totalReads,
        totalDownloads,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getStats };
