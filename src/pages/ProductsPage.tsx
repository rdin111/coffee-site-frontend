import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import { ProductCard } from '../components/shared/ProductCard';
import { ProductPagination } from '../components/shared/ProductPagination';
import { Input } from "@/components/ui/input";
import { useDebounce } from '@/hooks/useDebounce'; // <-- Use our custom hook
import { useState, useRef } from "react";

export function ProductsPage() {
    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState("");
    const debouncedKeyword = useDebounce(keyword, 500); // Debounce the keyword

    // Correctly type the ref for an HTML Input Element
    const inputRef = useRef<HTMLInputElement>(null);

    const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
        // The queryKey now correctly uses the debounced keyword
        queryKey: ['products', page, debouncedKeyword],

        // The queryFn now correctly passes the debounced keyword
        queryFn: () => fetchProducts({ page, keyword: debouncedKeyword }),

        // This is the correct property name for TanStack Query v5
        placeholderData: (previousData) => previousData,
    });

    // Handle loading state
    if (isLoading) {
        return <div className="text-center">Loading products...</div>;
    }

    // Handle error state
    if (isError) {
        return (
            <div className="text-center text-red-500">
                Error fetching products: {error.message}
            </div>
        );
    }

    // This robust check ensures `data` is defined for the rest of the component
    if (!data) {
        return <div className="text-center">No products found.</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Shop All Coffee</h1>
                <div className="w-full max-w-xs">
                    <Input
                        ref={inputRef}
                        placeholder="Search for a coffee..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
            </div>

            {/* Conditionally render based on whether we have content */}
            {data.content.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.content.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-muted-foreground">
                    No products found for "{debouncedKeyword}". Try a different search.
                </div>
            )}

            <div className="mt-12">
                <ProductPagination
                    page={page}
                    totalPages={data.totalPages}
                    setPage={setPage}
                    // Pass the loading status to the pagination component
                    isPlaceholderData={isPlaceholderData}
                />
            </div>
        </div>
    );
}