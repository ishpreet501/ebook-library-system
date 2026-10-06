import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

// Global Library Context
const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // --- 1. STATE MANAGEMENT (DIRECT MONGODB DATA) ---
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals & Reader state
  const [activeReaderBook, setActiveReaderBook] = useState(null);
  const [authPrompt, setAuthPrompt] = useState({ isOpen: false, action: 'read', bookTitle: '' });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // --- 2. FETCH DIRECTLY FROM MONGODB (NO LOCAL STORAGE FOR BOOKS) ---
  const fetchLibraryData = async () => {
    setLoading(true);
    try {
      const [booksRes, authorsRes, categoriesRes] = await Promise.all([
        api.getBooks(),
        api.getAuthors(),
        api.getCategories(),
      ]);

      if (booksRes.success) setBooks(booksRes.data || []);
      if (authorsRes.success) setAuthors(authorsRes.data || []);
      if (categoriesRes.success) setCategories(categoriesRes.data || []);
    } catch (err) {
      console.error('Failed to fetch library data from MongoDB:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load from MongoDB on component mount
  useEffect(() => {
    fetchLibraryData();
  }, []);

  // Sync bookmarks with current user from MongoDB
  const { user } = useAuth();
  useEffect(() => {
    if (user && user.bookmarks) {
      setBookmarks(user.bookmarks.map(b => (typeof b === 'object' ? b._id : b)));
    } else {
      setBookmarks([]);
    }
  }, [user]);

  // --- 3. BOOK READER (STRICT AUTHENTICATION REQUIRED) ---
  const openReader = (book) => {
    if (!isAuthenticated) {
      setAuthPrompt({ isOpen: true, action: 'read', bookTitle: book.title });
      return false;
    }
    // Optimistically increment read count in state and call MongoDB
    setBooks(prev => prev.map(b => b._id === book._id ? { ...b, readsCount: (b.readsCount || 0) + 1 } : b));
    setActiveReaderBook(book);
    api.getBookById(book._id).catch(() => {});
    return true;
  };

  const closeReader = () => {
    setActiveReaderBook(null);
  };

  // --- 4. BOOK DOWNLOAD (AUTHENTICATED CALL TO MONGODB) ---
  const downloadBook = async (book) => {
    if (!isAuthenticated) {
      setAuthPrompt({ isOpen: true, action: 'download', bookTitle: book.title });
      return false;
    }

    try {
      // Call protected MongoDB download endpoint
      const blob = await api.downloadBook(book._id);
      
      // Update local counter
      setBooks(prev => prev.map(b => b._id === book._id ? { ...b, downloadsCount: (b.downloadsCount || 0) + 1 } : b));

      // Trigger browser file download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${book.title.replace(/[^a-zA-Z0-9]/g, '_')}_ebook.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return true;
    } catch (err) {
      console.error('Download error:', err);
      return false;
    }
  };

  const closeAuthPrompt = () => {
    setAuthPrompt({ isOpen: false, action: 'read', bookTitle: '' });
  };

  // --- 5. BOOKMARKS (PERSISTED IN MONGODB) ---
  const toggleBookmark = async (bookId) => {
    if (!isAuthenticated) {
      setAuthPrompt({ isOpen: true, action: 'bookmark', bookTitle: 'this book' });
      return;
    }

    // Optimistically update UI
    setBookmarks(prev => prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]);

    // Send update to MongoDB
    try {
      await api.toggleBookmark(bookId);
    } catch (err) {
      console.error('Error toggling bookmark in MongoDB:', err);
    }
  };

  // --- 6. ADMIN OPERATIONS (DIRECT MONGODB MUTATIONS) ---
  const addBook = async (bookData) => {
    try {
      const res = await api.createBook(bookData);
      if (res.success && res.data) {
        await fetchLibraryData();
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const updateBook = async (id, bookData) => {
    try {
      const res = await api.updateBook(id, bookData);
      if (res.success && res.data) {
        await fetchLibraryData();
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const deleteBook = async (id) => {
    try {
      const res = await api.deleteBook(id);
      if (res.success) {
        setBooks(prev => prev.filter(b => b._id !== id));
        setBookmarks(prev => prev.filter(bookId => bookId !== id));
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Author Operations
  const addAuthor = async (authorData) => {
    try {
      const res = await api.createAuthor(authorData);
      if (res.success && res.data) {
        await fetchLibraryData();
        return { success: true };
      }
      return { success: false, message: res.message || 'Failed to create author' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const updateAuthor = async (id, authorData) => {
    try {
      const res = await api.updateAuthor(id, authorData);
      if (res.success && res.data) {
        await fetchLibraryData();
        return { success: true };
      }
      return { success: false, message: res.message || 'Failed to update author' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const deleteAuthor = async (id) => {
    try {
      const res = await api.deleteAuthor(id);
      if (res.success) {
        setAuthors(prev => prev.filter(a => a._id !== id));
        return { success: true };
      }
      return { success: false, message: res.message || 'Failed to delete author' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Category Operations
  const addCategory = async (categoryData) => {
    try {
      const res = await api.createCategory(categoryData);
      if (res.success && res.data) {
        await fetchLibraryData();
        return { success: true };
      }
      return { success: false, message: res.message || 'Failed to create category' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      const res = await api.updateCategory(id, categoryData);
      if (res.success && res.data) {
        await fetchLibraryData();
        return { success: true };
      }
      return { success: false, message: res.message || 'Failed to update category' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await api.deleteCategory(id);
      if (res.success) {
        setCategories(prev => prev.filter(c => c._id !== id));
        return { success: true };
      }
      return { success: false, message: res.message || 'Failed to delete category' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // --- 7. FILTER & SORT COMPUTATION ---
  const filteredBooks = books.filter((book) => {
    const matchesSearch = !searchQuery ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (book.author?.name && book.author.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (book.isbn && book.isbn.includes(searchQuery));

    const matchesCategory = selectedCategory === 'all' || 
      book.category?._id === selectedCategory || 
      book.category?.slug === selectedCategory;

    const matchesAuthor = selectedAuthor === 'all' || 
      book.author?._id === selectedAuthor || 
      book.author === selectedAuthor;

    return matchesSearch && matchesCategory && matchesAuthor;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'downloads') return (b.downloadsCount || 0) - (a.downloadsCount || 0);
    if (sortBy === 'reads') return (b.readsCount || 0) - (a.readsCount || 0);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  // Real-time statistics from MongoDB collections
  const stats = {
    totalBooks: books.length,
    totalAuthors: authors.length,
    totalCategories: categories.length,
    totalDownloads: books.reduce((sum, b) => sum + (b.downloadsCount || 0), 0),
    totalReads: books.reduce((sum, b) => sum + (b.readsCount || 0), 0),
  };

  return (
    <LibraryContext.Provider
      value={{
        books: sortedBooks,
        allBooks: books,
        authors,
        categories,
        bookmarks,
        loading,
        activeReaderBook,
        authPrompt,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedAuthor,
        setSelectedAuthor,
        sortBy,
        setSortBy,
        openReader,
        closeReader,
        downloadBook,
        closeAuthPrompt,
        toggleBookmark,
        addBook,
        updateBook,
        deleteBook,
        addAuthor,
        updateAuthor,
        deleteAuthor,
        addCategory,
        updateCategory,
        deleteCategory,
        refreshLibrary: fetchLibraryData,
        stats,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);
