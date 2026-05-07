import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartSubtotal, clearCart } from "@/features/cart/cartSlice";
import { useMutation } from '@tanstack/react-query';
import { placeOrder } from '@/api/orders';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CreditCard, Lock } from "lucide-react";

export function CheckoutPage() {
    const cartItems = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartSubtotal);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: placeOrder,
        onSuccess: () => {
            toast.success("Order placed successfully!");
            dispatch(clearCart());
            navigate('/order-confirmation');
        },
        onError: (error) => {
            toast.error(`Failed to place order: ${error.message}`);
        },
    });

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }
        const orderDto = {
            items: cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity,
            })),
        };
        mutation.mutate(orderDto);
    };

    const inputClasses = "bg-[var(--color-surface-elevated)] border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl h-12 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20";

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Side: Shipping Form */}
                <div className="lg:col-span-2 space-y-8 animate-fade-in-up">
                    <div>
                        <h1 className="text-3xl font-bold">Checkout</h1>
                        <p className="text-[var(--color-text-muted)] mt-1 font-sans">Complete your order</p>
                        <div className="section-divider mt-4" />
                    </div>

                    <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 md:p-8 space-y-6">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            Shipping Information
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="first-name" className="text-sm text-[var(--color-text-muted)] font-sans">First name</Label>
                                <Input id="first-name" placeholder="John" className={inputClasses} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name" className="text-sm text-[var(--color-text-muted)] font-sans">Last name</Label>
                                <Input id="last-name" placeholder="Doe" className={inputClasses} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-sm text-[var(--color-text-muted)] font-sans">Address</Label>
                            <Input id="address" placeholder="123 Main St" className={inputClasses} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="city" className="text-sm text-[var(--color-text-muted)] font-sans">City</Label>
                                <Input id="city" placeholder="Anytown" className={inputClasses} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="zip" className="text-sm text-[var(--color-text-muted)] font-sans">ZIP code</Label>
                                <Input id="zip" placeholder="12345" className={inputClasses} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Order Summary */}
                <div className="space-y-6 animate-fade-in-up delay-200">
                    <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sticky top-28">
                        <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

                        {/* List of items */}
                        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.imageUrl || 'https://placehold.co/100'} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm font-sans">{item.name}</p>
                                            <p className="text-xs text-[var(--color-text-muted)] font-sans">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-medium font-sans">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        {/* Price calculation */}
                        <div className="mt-6 pt-4 border-t border-[var(--color-border)] space-y-3">
                            <div className="flex justify-between text-sm font-sans">
                                <span className="text-[var(--color-text-muted)]">Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm font-sans">
                                <span className="text-[var(--color-text-muted)]">Shipping</span>
                                <span className="text-[var(--color-success)] font-medium">Free</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg mt-2 pt-3 border-t border-[var(--color-border)]">
                                <span>Total</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <Button
                            onClick={handlePlaceOrder}
                            disabled={mutation.isPending}
                            className="w-full btn-primary rounded-xl py-6 text-sm font-medium mt-6"
                        >
                            <Lock className="mr-2 h-4 w-4" />
                            {mutation.isPending ? 'Placing Order...' : 'Place Order'}
                        </Button>

                        <p className="text-[10px] text-[var(--color-text-muted)] text-center mt-3 font-sans flex items-center justify-center gap-1">
                            <Lock className="h-3 w-3" />
                            Secure checkout powered by Stripe
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}