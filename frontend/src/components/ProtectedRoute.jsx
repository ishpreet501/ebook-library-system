import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';

/**
 * ProtectedAdminRoute Component
 * -------------------------------------------------------------
 * Protects the /admin route.
 * If user is not logged in as admin, it shows the AdminLoginPage.
 * Once verified, it displays the AdminDashboard (children).
 */
export const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return <AdminLoginPage />;
  }

  return children;
};
