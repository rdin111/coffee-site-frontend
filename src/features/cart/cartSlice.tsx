import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;

}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<any>) => {
            const productToAdd = action.payload;
            const existingItem = state.items.find(item => item.id === productToAdd.id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ ...productToAdd, quantity: 1 });
            }
        },
        // NEW: Action to increase an item's quantity
        incrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity++;
            }
        },
        // NEW: Action to decrease an item's quantity
        decrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity--;
            } else if (item && item.quantity === 1) {
                // If quantity is 1, decrementing removes the item
                state.items = state.items.filter(i => i.id !== action.payload);
            }
        },
        // NEW: Action to remove an item from the cart completely
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },

    },
});

// Export the new actions
export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart,clearCart  } = cartSlice.actions;

// --- NEW SELECTORS ---
// Selector to get the full list of cart items
export const selectCartItems = (state: RootState) => state.cart.items;

// Selector to calculate the total quantity of all items
export const selectTotalCartItems = (state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);

// Selector to calculate the subtotal price of all items
export const selectCartSubtotal = (state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);


export default cartSlice.reducer;
