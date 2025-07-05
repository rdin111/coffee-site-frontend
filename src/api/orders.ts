
// src/api/orders.ts
import apiClient from './axios';

interface CartItemDto {
    productId: number;
    quantity: number;
}

interface OrderDto {
    items: CartItemDto[];
}

// This function will be called to place the order
export const placeOrder = async (orderData: OrderDto) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
};