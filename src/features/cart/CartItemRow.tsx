// src/features/cart/CartItemRow.tsx

import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from './cartSlice';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}

export function CartItemRow({ item }: { item: CartItem }) {
    const dispatch = useDispatch();

    return (
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-border-hover)] transition-colors duration-300">
            <div className="flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="relative h-40 w-full md:h-auto md:w-32 overflow-hidden">
                    <img
                        src={item.imageUrl || 'https://placehold.co/400'}
                        alt={item.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1 p-5">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-serif font-semibold text-base">{item.name}</h3>
                            <p className="text-sm text-[var(--color-text-muted)] mt-0.5 font-sans">${item.price.toFixed(2)} each</p>
                        </div>
                        <p className="font-semibold text-[var(--color-primary)] font-sans">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)]"
                                onClick={() => dispatch(decrementQuantity(item.id))}
                            >
                                <Minus className="h-3.5 w-3.5" />
                            </Button>
                            <span className="w-8 text-center font-semibold text-sm font-sans">{item.quantity}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)]"
                                onClick={() => dispatch(incrementQuantity(item.id))}
                            >
                                <Plus className="h-3.5 w-3.5" />
                            </Button>
                        </div>

                        {/* Remove Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors text-xs font-sans"
                        >
                            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}