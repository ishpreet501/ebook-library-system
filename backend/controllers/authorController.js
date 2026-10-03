const Author = require('../models/Author');
const Book = require('../models/Book');

/**
 * Author Controller
 * -------------------------------------------------------------
 * Clean and simple CRUD operations for Authors.
 * Data for creating/updating comes directly from req.body.
 */

// 1. GET ALL AUTHORS: Fetch all authors from MongoDB
const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find().sort({ name: 1 });
    res.json({ success: true, data: authors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. GET SINGLE AUTHOR: Fetch author by ID along with their books
const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ success: false, message: 'Author not found' });
    }

    const books = await Book.find({ author: author._id }).populate('category');
    res.json({
      success: true,
      data: {
        ...author.toObject(),
        books,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. CREATE AUTHOR: Add a new author (Data comes from req.body)
const createAuthor = async (req, res) => {
  try {
    const { name, nationality, bornYear, biography, photoUrl } = req.body;

    const author = new Author({
      name,
      nationality,
      bornYear,
      biography,
      photoUrl,
    });

    await author.save();
    res.status(201).json({ success: true, data: author });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 4. UPDATE AUTHOR: Update author by ID (Data comes from req.body)
const updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!author) {
      return res.status(404).json({ success: false, message: 'Author not found' });
    }

    res.json({ success: true, data: author });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 5. DELETE AUTHOR: Delete author by ID
const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ success: false, message: 'Author not found' });
    }

    // Check if author has associated books
    const bookCount = await Book.countDocuments({ author: author._id });
    if (bookCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete author who has ${bookCount} book(s). Please delete or reassign their books first.`,
      });
    }

    await author.deleteOne();
    res.json({ success: true, message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
