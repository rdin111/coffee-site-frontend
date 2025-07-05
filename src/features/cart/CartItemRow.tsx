// src/features/cart/CartItemRow.tsx

import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from './cartSlice';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card"; // Using the Card component

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
        <Card className="overflow-hidden p-0">
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                    {/* Product Image */}
                    <div className="relative h-40 w-full md:h-auto md:w-32">
                        <img
                            src={item.imageUrl || 'https://placehold.co/400'}
                            alt={item.name}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 p-4">
                        <div className="flex justify-between font-semibold">
                            <h3>{item.name}</h3>
                            <p>${(item.price * item.quantity).toFixed(2)}</p>
                        </div>

                        <p className="text-muted-foreground text-sm mt-1">${item.price.toFixed(2)} each</p>

                        <div className="mt-4 flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => dispatch(decrementQuantity(item.id))}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => dispatch(incrementQuantity(item.id))}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Remove Button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => dispatch(removeFromCart(item.id))}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}