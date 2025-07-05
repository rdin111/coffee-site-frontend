// src/features/auth/authSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

// Define the shape of our authentication state
interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
}

// Attempt to get the token from localStorage to handle page refreshes
const token = localStorage.getItem('authToken');

const initialState: AuthState = {
    token: token,
    isAuthenticated: !!token, // If a token exists, the user is initially authenticated
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action to set the token upon successful login
        setCredentials: (state, action: PayloadAction<{ token: string }>) => {
            const { token } = action.payload;
            state.token = token;
            state.isAuthenticated = true;
            // Store the token in localStorage to persist the session
            localStorage.setItem('authToken', token);
        },
        // Action to clear credentials on logout
        logOut: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            // Remove the token from localStorage
            localStorage.removeItem('authToken');
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

// Selector to easily get the authentication status from the state
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
