require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Category = require('../models/Category');
const Author = require('../models/Author');
const Book = require('../models/Book');
const { seedCategories, seedAuthors, seedBooks } = require('../data/seedData');

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ebook_library');
    console.log(' Connected to MongoDB for database seeding...');

    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Author.deleteMany();
    await Book.deleteMany();
    console.log('🧹 Existing collections cleared.');

    // Create Admin and Reader Users
    const adminUser = await User.create({
      name: 'Library Administrator',
      email: 'admin@ebooklib.com',
      password: 'admin123password',
      role: 'admin',
    });

    const readerUser = await User.create({
      name: 'John Reader',
      email: 'reader@ebooklib.com',
      password: 'reader123password',
      role: 'user',
    });

    console.log(`👤 Users created: Admin (${adminUser.email}), User (${readerUser.email})`);

    // Insert Categories
    const createdCategories = await Category.insertMany(seedCategories);
    console.log(`📂 Created ${createdCategories.length} categories.`);

    // Insert Authors
    const createdAuthors = await Author.insertMany(seedAuthors);
    console.log(`✍️ Created ${createdAuthors.length} authors.`);

    // Map Books to their Author and Category ObjectIds
    const booksWithRefs = seedBooks.map((b) => {
      return {
        ...b,
        author: createdAuthors[b.authorIndex]._id,
        category: createdCategories[b.categoryIndex]._id,
      };
    });

    const createdBooks = await Book.insertMany(booksWithRefs);
    console.log(`📚 Created ${createdBooks.length} sample books with readable chapters.`);

    console.log(' Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ebook_library');
    await User.deleteMany();
    await Category.deleteMany();
    await Author.deleteMany();
    await Book.deleteMany();
    console.log('🗑️ All data successfully destroyed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error destroying data:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
