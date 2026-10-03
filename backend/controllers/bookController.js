const Book = require('../models/Book');

/**
 * Book Controller
 * -------------------------------------------------------------
 * Clean and simple CRUD operations for E-Books in MongoDB.
 * All data for adding/updating comes directly from req.body.
 */

// 1. GET ALL BOOKS: Fetch all books from MongoDB
const getBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate('author')
      .populate('category')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 1b. GET FEATURED BOOKS: Fetch featured books for home showcase
const getFeaturedBooks = async (req, res) => {
  try {
    const featured = await Book.find({ featured: true })
      .populate('author')
      .populate('category')
      .limit(4);

    res.json({ success: true, data: featured });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. GET SINGLE BOOK: Fetch one book by ID and increase read count
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('author')
      .populate('category');

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Increase read counter by 1
    book.readsCount = (book.readsCount || 0) + 1;
    await book.save();

    res.json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. CREATE BOOK: Add a new book (Data comes directly from req.body)
const createBook = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      author,
      category,
      description,
      isbn,
      publishedYear,
      pageCount,
      coverImage,
      chapters,
    } = req.body;

    const newBook = new Book({
      title,
      subtitle,
      author,
      category,
      description,
      isbn,
      publishedYear,
      pageCount,
      coverImage,
      chapters,
    });

    await newBook.save();

    // Populate relations for immediate clean UI update
    const savedBook = await Book.findById(newBook._id)
      .populate('author')
      .populate('category');

    res.status(201).json({ success: true, data: savedBook });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 4. UPDATE BOOK: Edit existing book by ID (Updated fields come from req.body)
const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('author')
      .populate('category');

    if (!updatedBook) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.json({ success: true, data: updatedBook });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 5. DELETE BOOK: Remove book from MongoDB by ID
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    await book.deleteOne();
    res.json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 6. DOWNLOAD BOOK: Download formatted e-book content as a .txt file
const downloadBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Increment download counter by 1
    book.downloadsCount = (book.downloadsCount || 0) + 1;
    await book.save();

    // Prepare readable plain-text content
    let textContent = `====================================================\n`;
    textContent += `${book.title.toUpperCase()}\n`;
    textContent += `====================================================\n\n`;
    textContent += `ISBN: ${book.isbn}\n`;
    textContent += `Published Year: ${book.publishedYear}\n`;
    textContent += `Description: ${book.description}\n\n`;
    textContent += `------------------- CHAPTERS -------------------\n\n`;

    if (book.chapters && book.chapters.length > 0) {
      book.chapters.forEach((ch, idx) => {
        textContent += `\n[CHAPTER ${idx + 1}: ${ch.title}]\n\n`;
        textContent += `${ch.content}\n\n`;
      });
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${book.title.replace(/[^a-zA-Z0-9]/g, '_')}_ebook.txt"`);
    res.send(textContent);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getBooks,
  getFeaturedBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  downloadBook,
};
