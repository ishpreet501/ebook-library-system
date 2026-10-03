const Category = require('../models/Category');
const Book = require('../models/Book');

/**
 * Category Controller
 * -------------------------------------------------------------
 * Clean and simple CRUD operations for Categories.
 * Data for creating/updating comes directly from req.body.
 */

// 1. GET ALL CATEGORIES: Fetch all categories from MongoDB
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. CREATE CATEGORY: Add new category (Data comes from req.body)
const createCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    const category = new Category({
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description,
    });

    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 3. UPDATE CATEGORY: Edit existing category by ID (Data comes from req.body)
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 4. DELETE CATEGORY: Delete category by ID
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Check if category has associated books
    const bookCount = await Book.countDocuments({ category: category._id });
    if (bookCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category containing ${bookCount} book(s). Please delete or move the books first.`,
      });
    }

    await category.deleteOne();
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
