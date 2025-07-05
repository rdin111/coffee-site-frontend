// src/features/auth/ProtectedRoute.tsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthenticated } from './authSlice';

export function ProtectedRoute() {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    // If the user is authenticated, render the child route content using <Outlet />.
    // Otherwise, redirect them to the /login page.
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}