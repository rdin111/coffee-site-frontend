// src/api/products.ts
import apiClient from './axios';

// The shape of our PageDto from the backend
interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number; // current page number
    size: number;
    isLast: boolean;
}

// The shape of our Product
interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    // ... add any other product fields you have
}

// Define the shape of the fetch function's parameters
interface FetchProductsParams {
    page?: number;
    size?: number;
    keyword?: string;
}

// Update the function to accept the params object
export const fetchProducts = async ({
                                        page = 0,
                                        size = 9,
                                        keyword = '',
                                    }: FetchProductsParams): Promise<Page<Product>> => {

    const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sort: 'name,asc',
    });

    if (keyword) {
        params.append('keyword', keyword);
    }

    const response = await apiClient.get(`/products?${params.toString()}`);
    return response.data;
};