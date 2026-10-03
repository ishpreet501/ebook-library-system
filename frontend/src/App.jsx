import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LibraryProvider } from './context/LibraryContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookReaderModal } from './components/BookReaderModal';
import { AuthRequiredModal } from './components/AuthRequiredModal';
import { ProtectedAdminRoute } from './components/ProtectedRoute';

// Page Views
import { HomePage } from './pages/HomePage';
import { BooksPage } from './pages/BooksPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { AuthorsPage } from './pages/AuthorsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

/**
 * Main Application Component
 * -------------------------------------------------------------
 * Uses standard react-router-dom for clean, easy-to-understand routing.
 * Routes:
 * - "/"          -> Home Page
 * - "/books"     -> All Books Catalog
 * - "/book/:id"  -> Single Book Details
 * - "/authors"   -> Authors Directory
 * - "/categories"-> Categories Directory
 * - "/bookmarks" -> Saved User Bookmarks
 * - "/login"     -> User Sign In / Register
 * - "/admin"     -> Protected Admin Dashboard (Direct URL)
 */
export default function App() {
  return (
    <AuthProvider>
      <LibraryProvider>
        <div className="min-h-screen flex flex-col font-sans text-slate-800">
          
          {/* 1. Global Navigation Bar */}
          <Navbar />

          {/* 2. Page Router */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/book/:id" element={<BookDetailPage />} />
              <Route path="/authors" element={<AuthorsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Admin Route */}
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />

              {/* Redirect any other path to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* 3. In-Browser E-Book Reader Modal */}
          <BookReaderModal />

          {/* 4. Guest Protection Auth Required Modal */}
          <AuthRequiredModal />

          {/* 5. Clean Footer */}
          <Footer />

        </div>
      </LibraryProvider>
    </AuthProvider>
  );
}
