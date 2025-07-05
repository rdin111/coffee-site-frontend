import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

// Define the props our component will accept
interface ProductPaginationProps {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
    isPlaceholderData?: boolean; // <-- THE FIX (Part 1): Add the optional prop here
}

export function ProductPagination({ page, totalPages, setPage, isPlaceholderData }: ProductPaginationProps) {

    const handlePrevious = () => {
        // Prevent changing page while new data is being fetched
        if (!isPlaceholderData) {
            setPage(Math.max(0, page - 1));
        }
    };

    const handleNext = () => {
        if (!isPlaceholderData) {
            setPage(Math.min(totalPages - 1, page + 1));
        }
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={handlePrevious}
                        // THE FIX (Part 2): Also disable the button if placeholder data is being shown
                        className={(page === 0 || isPlaceholderData) ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>

                <PaginationItem>
                  <span className="px-4 py-2 text-sm">
                    Page {page + 1} of {totalPages}
                  </span>
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext
                        onClick={handleNext}
                        className={(page >= totalPages - 1 || isPlaceholderData) ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}