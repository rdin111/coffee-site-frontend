import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import { ProductCard } from '../components/shared/ProductCard';
import { ProductPagination } from '../components/shared/ProductPagination';
import { Input } from "@/components/ui/input";
import { useDebounce } from '@/hooks/useDebounce';
import { Search } from 'lucide-react';
import { ProductSkeleton } from '../components/shared/ProductSkeleton';

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
            timer = setTimeout(() => {
                setIsSlowLoading(true);
            }, 3000);
        } else {
            setIsSlowLoading(false);
        }
        return () => clearTimeout(timer);
    }, [isLoading]);


    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
                <div className="mb-12 animate-fade-in-up">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <div className="h-3 w-20 bg-[var(--color-surface-elevated)] rounded-sm mb-4 shimmer" />
                            <div className="h-10 w-48 md:w-64 bg-[var(--color-surface-elevated)] rounded-md shimmer" />
                        </div>
                        <div className="w-full max-w-sm h-11 bg-[var(--color-surface-elevated)] rounded-full shimmer" />
                    </div>
                    <div className="section-divider mt-8" />
                </div>
                
                {isSlowLoading && (
                    <div className="text-center mb-12 animate-fade-in">
                        <h2 className="text-lg font-semibold font-serif text-[var(--color-primary)]">Waking up the roaster...</h2>
                        <p className="text-sm text-[var(--color-text-muted)] font-sans">Our free-tier server is starting up. Please wait a moment!</p>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(n => <ProductSkeleton key={n} />)}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24">
                <div className="text-center text-[var(--color-error)]">
                    Error fetching products: {error.message}
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24">
                <div className="text-center text-[var(--color-text-muted)]">No products found.</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
            {/* Page Header */}
            <div className="mb-12 animate-fade-in-up">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)] mb-3 block font-sans">
                            Collection
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold">Shop All Coffee</h1>
                    </div>
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]" />
                        <Input
                            placeholder="Search for a coffee..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="pl-10 bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-full h-11 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20"
                        />
                    </div>
                </div>
                <div className="section-divider mt-8" />
            </div>

            {/* Products Grid */}
            {data.content && data.content.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-200">
                    {data.content.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-[var(--color-text-muted)] font-sans">
                    No products found for "{debouncedKeyword}". Try a different search.
                </div>
            )}

            {/* Pagination */}
            <div className="mt-16">
                <ProductPagination
                    page={page}
                    totalPages={data.totalPages}
                    setPage={setPage}
                    isPlaceholderData={isPlaceholderData}
                    keyword={debouncedKeyword}
                />
            </div>
        </div>
    );
}