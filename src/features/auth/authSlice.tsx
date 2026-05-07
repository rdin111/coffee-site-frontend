// src/features/auth/authSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

// Define the shape of our authentication state
interface AuthState {
    token: string | null;
    username: string | null;
    isAuthenticated: boolean;
}

// Attempt to get the token from localStorage to handle page refreshes
const token = localStorage.getItem('authToken');
const username = localStorage.getItem('authUsername');

const initialState: AuthState = {
    token: token,
    username: username,
    isAuthenticated: !!token, // If a token exists, the user is initially authenticated
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action to set the token upon successful login
        setCredentials: (state, action: PayloadAction<{ token: string; username: string }>) => {
            const { token, username } = action.payload;
            state.token = token;
            state.username = username;
            state.isAuthenticated = true;
            // Store in localStorage to persist the session
            localStorage.setItem('authToken', token);
            localStorage.setItem('authUsername', username);
        },
        // Action to clear credentials on logout
        logOut: (state) => {
            state.token = null;
            state.username = null;
            state.isAuthenticated = false;
            // Remove from localStorage
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUsername');
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUsername = (state: RootState) => state.auth.username;
export const selectToken = (state: RootState) => state.auth.token;
