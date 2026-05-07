import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { fetchProducts } from '../../api/products';

interface ProductPaginationProps {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
    isPlaceholderData?: boolean;
    keyword: string;
}

export function ProductPagination({ page, totalPages, setPage, isPlaceholderData, keyword }: ProductPaginationProps) {
    const queryClient = useQueryClient();

    const handlePrevious = () => {
        if (!isPlaceholderData) {
            setPage(Math.max(0, page - 1));
        }
    };

    const handleNext = () => {
        if (!isPlaceholderData) {
            setPage(Math.min(totalPages - 1, page + 1));
        }
    };

    const prefetchNext = () => {
        if (page < totalPages - 1 && !isPlaceholderData) {
            queryClient.prefetchQuery({
                queryKey: ['products', page + 1, keyword],
                queryFn: () => fetchProducts({ page: page + 1, keyword }),
            });
        }
    };

    const prefetchPrev = () => {
        if (page > 0 && !isPlaceholderData) {
            queryClient.prefetchQuery({
                queryKey: ['products', page - 1, keyword],
                queryFn: () => fetchProducts({ page: page - 1, keyword }),
            });
        }
    };

    if (totalPages <= 1) {
        return null;
    }

    const isPrevDisabled = page === 0 || isPlaceholderData;
    const isNextDisabled = page >= totalPages - 1 || isPlaceholderData;

    return (
        <div className="flex items-center justify-center gap-4">
            <button
                onClick={handlePrevious}
                onMouseEnter={prefetchPrev}
                disabled={isPrevDisabled}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border font-sans ${
                    isPrevDisabled
                        ? 'opacity-30 cursor-not-allowed border-[var(--color-border)] text-[var(--color-text-muted)]'
                        : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] cursor-pointer'
                }`}
            >
                <ChevronLeft className="h-4 w-4" />
                Previous
            </button>

            <span className="px-4 py-2 text-sm text-[var(--color-text-muted)] font-sans">
                Page {page + 1} of {totalPages}
            </span>

            <button
                onClick={handleNext}
                onMouseEnter={prefetchNext}
                disabled={isNextDisabled}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border font-sans ${
                    isNextDisabled
                        ? 'opacity-30 cursor-not-allowed border-[var(--color-border)] text-[var(--color-text-muted)]'
                        : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] cursor-pointer'
                }`}
            >
                Next
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}