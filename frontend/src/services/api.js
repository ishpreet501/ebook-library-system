import { API_BASE_URL } from '../config/apiConfig';

/**
 * API Service
 * -------------------------------------------------------------
 * Clean standard fetch calls to Express & MongoDB backend.
 * All requests use API_BASE_URL from ../config/apiConfig.js.
 */

// Helper: Attach JWT token to requests if logged in
const getAuthHeaders = () => {
  const token = localStorage.getItem('ebook_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // ==========================================
  // 1. AUTHENTICATION (MongoDB User Collection)
  // ==========================================
  async login(credentials) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials), // Data sent in req.body
    });
    return res.json();
  },

  async register(userData) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData), // Data sent in req.body
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  async toggleBookmark(bookId) {
    const res = await fetch(`${API_BASE_URL}/auth/bookmark/${bookId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // ==========================================
  // 2. BOOKS (MongoDB Book Collection)
  // ==========================================
  async getBooks() {
    const res = await fetch(`${API_BASE_URL}/books`);
    return res.json();
  },

  async getFeaturedBooks() {
    const res = await fetch(`${API_BASE_URL}/books/featured`);
    return res.json();
  },

  async getBookById(id) {
    const res = await fetch(`${API_BASE_URL}/books/${id}`);
    return res.json();
  },

  async createBook(bookData) {
    const res = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookData), // Data sent in req.body
    });
    return res.json();
  },

  async updateBook(id, bookData) {
    const res = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookData), // Data sent in req.body
    });
    return res.json();
  },

  async deleteBook(id) {
    const res = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  async downloadBook(id) {
    const res = await fetch(`${API_BASE_URL}/books/${id}/download`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Download failed');
    return res.blob();
  },

  // ==========================================
  // 3. AUTHORS (MongoDB Author Collection)
  // ==========================================
  async getAuthors() {
    const res = await fetch(`${API_BASE_URL}/authors`);
    return res.json();
  },

  async createAuthor(authorData) {
    const res = await fetch(`${API_BASE_URL}/authors`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(authorData), // Data sent in req.body
    });
    return res.json();
  },

  async updateAuthor(id, authorData) {
    const res = await fetch(`${API_BASE_URL}/authors/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(authorData), // Data sent in req.body
    });
    return res.json();
  },

  async deleteAuthor(id) {
    const res = await fetch(`${API_BASE_URL}/authors/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // ==========================================
  // 4. CATEGORIES (MongoDB Category Collection)
  // ==========================================
  async getCategories() {
    const res = await fetch(`${API_BASE_URL}/categories`);
    return res.json();
  },

  async createCategory(categoryData) {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(categoryData), // Data sent in req.body
    });
    return res.json();
  },

  async updateCategory(id, categoryData) {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(categoryData), // Data sent in req.body
    });
    return res.json();
  },

  async deleteCategory(id) {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.json();
  },

  // ==========================================
  // 5. STATS (MongoDB Counts)
  // ==========================================
  async getStats() {
    const res = await fetch(`${API_BASE_URL}/stats`);
    return res.json();
  },
};

export default api;
