const express = require('express');
const router = express.Router();
const {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require('../controllers/authorController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getAuthors);
router.get('/:id', getAuthorById);

// Admin-protected routes
router.post('/', protect, adminOnly, createAuthor);
router.put('/:id', protect, adminOnly, updateAuthor);
router.delete('/:id', protect, adminOnly, deleteAuthor);

module.exports = router;
