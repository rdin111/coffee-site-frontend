
// src/api/orders.ts
import apiClient from './axios';

interface CartItemDto {
    productId: number;
    quantity: number;
}

interface OrderDto {
    items: CartItemDto[];
}

// Shape of an order item returned from the backend
// The backend returns a full Product object nested inside each OrderItem
export interface OrderItemProduct {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

export interface OrderItem {
    id: number;
    product: OrderItemProduct;
    quantity: number;
    price: number; // Price at the time of purchase
}

export interface Order {
    id: number;
    orderDate: string;
    totalAmount: number;
    items: OrderItem[];
}

// This function will be called to place the order
export const placeOrder = async (orderData: OrderDto) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
};

// Fetch order history for the logged-in user
export const fetchOrders = async (): Promise<Order[]> => {
    const response = await apiClient.get('/orders');
    return response.data;
};