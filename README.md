# 📚 E-Book Library Management System (MERN Stack)

A modern, full-stack **E-Book Library Management System** designed and built using the **MERN Stack** (MongoDB, Express.js, React, Node.js). 

This platform allows readers to browse curated digital books, read in an immersive in-browser reader, and download books for offline reading, while providing administrators with a dashboard to manage books, authors, and categories.

---

## 🌟 Feature Checklist & Implementation

| Feature Requirement | Status | Implementation Details |
| :--- | :---: | :--- |
| **Full-Stack MERN Architecture** | ✅ Completed | Built with **MongoDB** (Mongoose schemas), **Express.js** RESTful API, **React 18** with Tailwind CSS, and **Node.js** with JWT authentication. |
| **Admin Functionality (Books, Authors, Categories)** | ✅ Completed | Complete CRUD control panel for Books (with chapters), Authors (biographies & photos), and Categories (taxonomy slugs & descriptions) plus live analytics. |
| **Detailed Book Information & Browsing** | ✅ Completed | Search by title/author/ISBN, filter by categories & authors, sort by rating/downloads/publication year, and rich Book Detail Page with synopsis and metrics. |
| **Book Reading & Download Functionality** | ✅ Completed | In-browser distraction-free e-book reader with 3 themes (Day, Sepia, Night), font scaling, chapter drawer, and 1-click formatted offline downloads. |

---

## 🏗️ Project Architecture

```
ebook-library-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic
│   ├── controllers/
│   │   ├── authController.js     # JWT auth, user profile, bookmarks
│   │   ├── bookController.js     # Book CRUD, reading & download counters
│   │   ├── authorController.js   # Author CRUD & biographical data
│   │   ├── categoryController.js # Category management & slugs
│   │   └── statsController.js    # Admin dashboard analytics & metrics
│   ├── models/
│   │   ├── User.js               # User & Admin schema with bcrypt hashing
│   │   ├── Book.js               # Books schema with chapters, ratings & stats
│   │   ├── Author.js             # Author schema with photo and bio
│   │   └── Category.js           # Category taxonomies
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth
│   │   ├── bookRoutes.js         # /api/books
│   │   ├── authorRoutes.js       # /api/authors
│   │   ├── categoryRoutes.js     # /api/categories
│   │   └── statsRoutes.js        # /api/stats
│   ├── middleware/
│   │   ├── authMiddleware.js     # Protect routes & adminOnly enforcement
│   │   └── errorHandler.js       # Centralized error handler
│   ├── data/
│   │   └── seedData.js           # Pre-populated books, authors & categories
│   ├── utils/
│   │   └── seeder.js             # One-command database population script
│   ├── .env.example              # Sample environment variables
│   ├── package.json
│   └── server.js                 # Express server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation, search bar, demo switcher
│   │   │   ├── Footer.jsx        # Footer with tech details
│   │   │   ├── BookCard.jsx      # Cover, rating, read & download actions
│   │   │   ├── BookReaderModal.jsx # In-browser customizable reader modal
│   │   │   └── StatCard.jsx      # Metrics card for analytics
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Auth provider, JWT token persistence
│   │   │   └── LibraryContext.jsx# Live library store, CRUD & download triggers
│   │   ├── pages/
│   │   │   ├── HomePage.jsx      # Hero banner, featured books & metrics
│   │   │   ├── BooksPage.jsx     # Search, filter by category/author, sort
│   │   │   ├── BookDetailPage.jsx# Detailed information, author bio, synopsis
│   │   │   ├── AuthorsPage.jsx   # Directory of authors and their books
│   │   │   ├── CategoriesPage.jsx# Taxonomic category exploration
│   │   │   ├── BookmarksPage.jsx # Personal saved reading shelf
│   │   │   ├── LoginPage.jsx     # Login/Register with 1-click Demo auth
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx # Analytics KPIs & tabbed console
│   │   │       ├── ManageBooks.jsx    # Add/Edit books & chapter editor
│   │   │       ├── ManageAuthors.jsx  # Author management modal
│   │   │       └── ManageCategories.jsx # Category taxonomy CRUD
│   │   ├── services/
│   │   │   └── api.js            # Unified API fetch client
│   │   ├── App.jsx               # Main application routing
│   │   ├── main.jsx              # React DOM root
│   │   └── index.css             # Tailwind styling & typography
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── preview/
│   └── index.html                # Zero-dependency interactive live preview
└── package.json                  # Root orchestration scripts
```

---

## ⚡ Instant Standalone Preview (No Setup Required)

If you wish to test and interact with the application immediately without running Node commands:
1. Open your File Explorer to:
   `C:\Users\sishp\.gemini\antigravity\scratch\ebook-library-system\preview\`
2. Double-click **`index.html`** to open it in Chrome, Edge, or Firefox.
3. You can immediately:
   - Browse and search through e-books.
   - Filter by categories and authors.
   - View detailed book specifications and table of contents.
   - Launch the **In-Browser Reader** with font scaling and Day/Sepia/Night themes.
   - Click **Download** to get the formatted `.txt` e-book on your computer.
   - Open the **Admin Panel** to add books, edit authors, and manage categories.

---

## 🚀 Running the Full MERN Stack (Development Setup)

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB** (Local instance or MongoDB Atlas connection string)

### 2. Backend Configuration
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create `.env` file (copy from `.env.example`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/ebook_library
   JWT_SECRET=supersecret_ebook_library_jwt_key_2026
   NODE_ENV=development
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Seed the database with sample books, authors, and users:
   ```bash
   npm run seed
   ```
5. Start the backend API server:
   ```bash
   npm run dev
   ```
   *The API will start on `http://localhost:5000`.*

### 3. Frontend Configuration
1. In a separate terminal, navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   *The frontend will launch at `http://localhost:3000`.*

---

## 🔑 Pre-Seeded Evaluation Credentials

When the database is seeded or using the demo login buttons:

- **Admin Account**:
  - Email: `admin@ebooklib.com`
  - Password: `admin123password`
  - Privileges: Full CRUD permissions on Books, Authors, Categories, and Analytics.
- **Reader User Account**:
  - Email: `reader@ebooklib.com`
  - Password: `reader123password`
  - Privileges: Browse, read in-browser, download, bookmark.

---

## 📡 REST API Documentation

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - Authenticate and return JWT token
- `GET /api/auth/me` - Get profile (Protected)
- `POST /api/auth/bookmark/:bookId` - Toggle bookmark (Protected)

### Books (`/api/books`)
- `GET /api/books` - Get all books with search, filter, and pagination
- `GET /api/books/featured` - Get featured books
- `GET /api/books/:id` - Get book details & increment read counter
- `POST /api/books/:id/download` - Download e-book file & increment counter
- `POST /api/books` - Create new book *(Admin only)*
- `PUT /api/books/:id` - Update book *(Admin only)*
- `DELETE /api/books/:id` - Delete book *(Admin only)*

### Authors (`/api/authors`)
- `GET /api/authors` - Get all authors with catalog book counts
- `GET /api/authors/:id` - Get author by ID and their books
- `POST /api/authors` - Create author profile *(Admin only)*
- `PUT /api/authors/:id` - Update author profile *(Admin only)*
- `DELETE /api/authors/:id` - Delete author *(Admin only)*

### Categories (`/api/categories`)
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category *(Admin only)*
- `PUT /api/categories/:id` - Update category *(Admin only)*
- `DELETE /api/categories/:id` - Delete category *(Admin only)*

### Analytics (`/api/stats`)
- `GET /api/stats` - Total books, authors, categories, downloads, and reads
#   E - b o o k - s y s t e m  
 