// =====================================================================
// API CONFIGURATION & BASE URL
// Centralized configuration file for backend connection
// Change this URL or use VITE_API_URL environment variable as needed
// =====================================================================

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ebook-library-system.onrender.com/api';

export default API_BASE_URL;
