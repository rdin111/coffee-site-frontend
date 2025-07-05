// src/api/auth.ts

import apiClient from './axios';
import { z } from 'zod';

// --- Login Schema (Existing) ---
export const loginSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginData = z.infer<typeof loginSchema>;
export const loginUser = async (data: LoginData) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
};


//  Registration Schema & API Function ---
export const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please provide a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
export type RegisterData = z.infer<typeof registerSchema>;

export const registerUser = async (data: RegisterData) => {
    // We expect a simple string message on success
    const response = await apiClient.post<string>('/auth/register', data);
    return response.data;
};