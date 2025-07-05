import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch } from 'react-redux'; // <-- Import useDispatch
import { addToCart } from '@/features/cart/cartSlice'; // <-- Import our action
import toast from 'react-hot-toast'; // <-- Import toast for notifications

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const dispatch = useDispatch(); // Get the dispatch function

    const handleAddToCart = () => {
        // Dispatch the addToCart action with the product as the payload
        dispatch(addToCart(product));
        // Show a success notification
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>${product.price.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-0">
                <img
                    src={product.imageUrl || 'https://placehold.co/400'}
                    alt={product.name}
                    className="object-cover w-full h-full aspect-square"
                />
            </CardContent>
            <CardFooter className="p-4">
                {/* Attach the handler to the button's onClick event */}
                <Button onClick={handleAddToCart} className="w-full bg-[#D37A54] hover:bg-[#b66a4a]">
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}