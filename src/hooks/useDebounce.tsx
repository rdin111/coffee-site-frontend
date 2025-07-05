import { useState, useEffect } from 'react';

// This custom hook takes a value and a delay, and returns a new value
// that only updates after the specified delay has passed since the last change.
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // This cleanup function runs every time the effect is re-run,
        // clearing the previous timeout.
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}