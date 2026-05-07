import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/cart/cartSlice';
import toast from 'react-hot-toast';
import { ShoppingBag } from 'lucide-react';
import React from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

interface ProductCardProps {
    product: Product;
}

export const ProductCard = React.memo(function ProductCard({ product }: ProductCardProps) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <div className="group relative bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all duration-500 hover-lift">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={product.imageUrl || 'https://placehold.co/400'}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Quick add button — appears on hover */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <Button
                        onClick={handleAddToCart}
                        className="w-full btn-primary rounded-xl py-5 text-sm font-medium"
                    >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                    </Button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-base font-semibold text-[var(--color-text-primary)] leading-tight">
                        {product.name}
                    </h3>
                    <span className="text-sm font-semibold text-[var(--color-primary)] whitespace-nowrap font-sans">
                        ${product.price.toFixed(2)}
                    </span>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mt-1.5 font-sans">
                    Single Origin · Medium Roast
                </p>
            </div>
        </div>
    );
});