const express = require('express');
const router = express.Router();
const {
  getBooks,
  getFeaturedBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  downloadBook,
} = require('../controllers/bookController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public catalog exploration
router.get('/', getBooks);
router.get('/featured', getFeaturedBooks);
router.get('/:id', getBookById);

// PROTECTED: User MUST be authenticated with valid JWT to download books
router.post('/:id/download', protect, downloadBook);

// Admin-protected routes
router.post('/', protect, adminOnly, createBook);
router.put('/:id', protect, adminOnly, updateBook);
router.delete('/:id', protect, adminOnly, deleteBook);

module.exports = router;
