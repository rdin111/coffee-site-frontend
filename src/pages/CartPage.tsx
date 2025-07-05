import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartSubtotal, selectTotalCartItems } from '@/features/cart/cartSlice';
import { CartItemRow } from '@/features/cart/CartItemRow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label"
import { CreditCard } from 'lucide-react';

export function CartPage() {
    const cartItems = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartSubtotal);
    const totalItems = useSelector(selectTotalCartItems);

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild className="bg-[#D37A54] hover:bg-[#b66a4a]">
                    <Link to="/products">Continue Shopping</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-7xl py-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Cart Items Section */}
                <div className="space-y-6 lg:col-span-2">
                    <div>
                        <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                        <p className="text-muted-foreground">
                            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
                        </p>
                    </div>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <CartItemRow key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                {/* Order Summary Section */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                            <CardDescription>
                                Review your order details before checkout.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Promo Code</Label>
                                <div className="flex gap-2">
                                    <Input placeholder="Enter promo code" />
                                    <Button variant="outline">Apply</Button>
                                </div>
                            </div>
                            <div className="space-y-2 border-t pt-4">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping</span>
                                    <span className="text-muted-foreground">Calculated at next step</span>
                                </div>
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                            </div>
                            <Button asChild className="w-full mt-6 bg-[#D37A54] hover:bg-[#b66a4a]">
                                <Link to="/checkout">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Proceed to Checkout
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}