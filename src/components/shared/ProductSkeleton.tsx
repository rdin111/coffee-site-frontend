export function ProductSkeleton() {
    return (
        <div className="bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-border)]">
            <div className="aspect-square shimmer" />
            <div className="p-5">
                <div className="h-5 w-3/4 bg-[var(--color-surface-elevated)] rounded-md mb-2 shimmer" />
                <div className="h-4 w-1/2 bg-[var(--color-surface-elevated)] rounded-md mb-3 shimmer" />
                <div className="h-4 w-1/3 bg-[var(--color-surface-elevated)] rounded-md shimmer" />
            </div>
        </div>
    );
}
