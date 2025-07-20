import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import { ProductCard } from '../components/shared/ProductCard';
import { ProductPagination } from '../components/shared/ProductPagination';
import { Input } from "@/components/ui/input";
import { useDebounce } from '@/hooks/useDebounce';
import { Loader2 } from 'lucide-react';

export function ProductsPage() {
    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState("");
    const debouncedKeyword = useDebounce(keyword, 500);

    const [isSlowLoading, setIsSlowLoading] = useState(false);

    const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
        queryKey: ['products', page, debouncedKeyword],
        queryFn: () => fetchProducts({ page, keyword: debouncedKeyword }),
        placeholderData: (previousData) => previousData,
    });

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isLoading) {
            // After 3 seconds, assume it's a cold start
            timer = setTimeout(() => {
                setIsSlowLoading(true);
            }, 3000);
        } else {
            // If loading finishes, cancel the timer and hide the message
            setIsSlowLoading(false);
        }

        // Cleanup function to clear the timer if the component unmounts
        return () => clearTimeout(timer);

    }, [isLoading]);


    if (isLoading) {
        return (
            <div className="text-center py-20">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#D37A54] mb-4" />
                {isSlowLoading ? (
                    <>
                        <h2 className="text-xl font-semibold">Waking up the roaster...</h2>
                        <p className="text-muted-foreground">Our free-tier server is starting up. Please wait a moment!</p>
                    </>
                ) : (
                    <h2 className="text-xl font-semibold">Loading Products...</h2>
                )}
            </div>
        );
    }

    if (isError) {
        return <div className="text-center text-red-500">Error fetching products: {error.message}</div>;
    }

    if (!data) {
        return <div className="text-center">No products found.</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Shop All Coffee</h1>
                <div className="w-full max-w-xs">
                    <Input
                        placeholder="Search for a coffee..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
            </div>

            {data.content.length > 0 ? (
                <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-8">
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
                    isPlaceholderData={isPlaceholderData}
                />
            </div>
        </div>
    );
}