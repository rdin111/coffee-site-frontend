import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartSubtotal, clearCart } from "@/features/cart/cartSlice";
import { useMutation } from '@tanstack/react-query';
import { placeOrder } from '@/api/orders';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CreditCard } from "lucide-react";

export function CheckoutPage() {
    const cartItems = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartSubtotal);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useMutation is the React Query hook for handling the order placement API call
    const mutation = useMutation({
        mutationFn: placeOrder,
        onSuccess: () => {
            toast.success("Order placed successfully!");
            dispatch(clearCart()); // Clear the cart from Redux state after a successful order
            navigate('/order-confirmation'); // Redirect the user to a success page
        },
        onError: (error) => {
            // In a real app, you might check error.response.data for a more specific message
            toast.error(`Failed to place order: ${error.message}`);
        },
    });

    const handlePlaceOrder = () => {
        // Check if there are items in the cart before proceeding
        if (cartItems.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        // Create the Data Transfer Object (DTO) that our backend API expects
        const orderDto = {
            items: cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity,
            })),
        };

        // Trigger the API call
        mutation.mutate(orderDto);
    };

    return (
        <div className="max-w-6xl mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left Side: Shipping Form */}
                <div className="lg:col-span-2 space-y-6">
                    <h1 className="text-2xl font-semibold">Shipping Information</h1>
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First name</Label>
                                    <Input id="first-name" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last name</Label>
                                    <Input id="last-name" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" placeholder="123 Main St" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" placeholder="Anytown" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">ZIP code</Label>
                                    <Input id="zip" placeholder="12345" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Side: Order Summary */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* List of items in the cart */}
                            <div className="space-y-4 max-h-60 overflow-y-auto">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-4">
                                            <img src={item.imageUrl || 'https://placehold.co/100'} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Price calculation */}
                            <div className="mt-4 pt-4 border-t space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping</span>
                                    <span className="text-muted-foreground">Free</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg mt-2 pt-2 border-t">
                                    <span>Total</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <Button onClick={handlePlaceOrder} disabled={mutation.isPending} className="w-full mt-4 bg-[#D37A54] hover:bg-[#b66a4a]">
                                <CreditCard className="mr-2 h-4 w-4" />
                                {mutation.isPending ? 'Placing Order...' : 'Place Order'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}