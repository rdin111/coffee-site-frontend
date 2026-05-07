// src/pages/CartPage.tsx

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartSubtotal, selectTotalCartItems } from '@/features/cart/cartSlice';
import { CartItemRow } from '@/features/cart/CartItemRow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label"
import { CreditCard, ShoppingBag, ArrowRight } from 'lucide-react';

export function CartPage() {
    const cartItems = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartSubtotal);
    const totalItems = useSelector(selectTotalCartItems);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center pt-24">
                <div className="text-center animate-fade-in-up">
                    <div className="w-20 h-20 rounded-full bg-[var(--color-surface)] flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="h-8 w-8 text-[var(--color-text-muted)]" />
                    </div>
                    <h1 className="text-3xl font-bold mb-3">Your Cart is Empty</h1>
                    <p className="text-[var(--color-text-muted)] mb-8 font-sans">Looks like you haven't added anything to your cart yet.</p>
                    <Button asChild className="btn-primary rounded-full px-8 py-6 text-sm font-medium">
                        <Link to="/products">
                            Continue Shopping
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                {/* Main Cart Items Section */}
                <div className="space-y-6 lg:col-span-2 animate-fade-in-up">
                    <div>
                        <h1 className="text-3xl font-bold">Shopping Cart</h1>
                        <p className="text-[var(--color-text-muted)] mt-1 font-sans">
                            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
                        </p>
                        <div className="section-divider mt-4" />
                    </div>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <CartItemRow key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                {/* Order Summary Section */}
                <div className="space-y-6 animate-fade-in-up delay-200">
                    <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6">
                        <h2 className="text-lg font-semibold mb-1">Order Summary</h2>
                        <p className="text-xs text-[var(--color-text-muted)] mb-6 font-sans">
                            Review your order details before checkout.
                        </p>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs text-[var(--color-text-muted)] font-sans">Promo Code</Label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Enter promo code"
                                        className="bg-[var(--color-surface-elevated)] border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-lg h-10 text-sm focus:border-[var(--color-primary)]"
                                    />
                                    <Button variant="outline" className="border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] rounded-lg h-10 text-sm font-sans">
                                        Apply
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-3 border-t border-[var(--color-border)] pt-4">
                                <div className="flex justify-between text-sm font-sans">
                                    <span className="text-[var(--color-text-muted)]">Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-sans">
                                    <span className="text-[var(--color-text-muted)]">Shipping</span>
                                    <span className="text-[var(--color-text-muted)]">Calculated at next step</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg border-t border-[var(--color-border)] pt-3">
                                    <span>Total</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button asChild className="w-full btn-primary rounded-xl py-6 text-sm font-medium mt-2">
                                <Link to="/checkout">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Proceed to Checkout
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}