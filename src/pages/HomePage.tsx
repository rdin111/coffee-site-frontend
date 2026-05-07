// src/pages/HomePage.tsx

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api/products";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Loader2, ArrowRight, ChevronRight } from "lucide-react";

// Simple hook to detect when an element is in the viewport
function useInView(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isInView };
}

export function HomePage() {
    const [isSlowLoading, setIsSlowLoading] = useState(false);

    const { data: productsData, isLoading, isError } = useQuery({
        queryKey: ['featured-products'],
        queryFn: () => fetchProducts({ page: 0, size: 3 }),
        retry: 2,
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

    const featured = useInView();
    const guides = useInView();
    const cta = useInView();

    return (
        <div>
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
                {/* Background image with overlay */}
                <div className="absolute inset-0">
                    <img
                        src="/images/coffeebean.jpg"
                        alt="Premium coffee beans"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/70 via-[var(--color-background)]/50 to-[var(--color-background)]" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <div className="animate-fade-in-up">
                        <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)] mb-6 font-sans">
                            Artisan Coffee Roasters
                        </span>
                    </div>
                    <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
                        <span className="block">Crafted with</span>
                        <span className="block text-gradient">Passion</span>
                    </h1>
                    <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
                        Discover our commitment to perfect blends — from the finest single-origin beans, ethically sourced and freshly roasted to your doorstep.
                    </p>
                    <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild size="lg" className="btn-primary rounded-full px-8 py-6 text-sm font-medium tracking-wide shadow-lg shadow-[var(--color-primary)]/20">
                            <Link to="/products">
                                Shop Now
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="ghost" size="lg" className="rounded-full px-8 py-6 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]">
                            <Link to="/our-story">
                                Our Story
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in delay-600">
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[var(--color-text-muted)] to-transparent opacity-50" />
                </div>
            </section>

            {/* ===== FEATURED BLENDS ===== */}
            <section
                ref={featured.ref}
                className="max-w-7xl mx-auto px-6 lg:px-8 py-32"
            >
                <div className={`text-center mb-16 transition-all duration-700 ${featured.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)] mb-4 block font-sans">
                        Curated Selection
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Featured Blends
                    </h2>
                    <div className="section-divider mx-auto mt-6" />
                </div>

                {isLoading ? (
                    <div className="text-center py-20">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-[var(--color-primary)] mb-6" />
                        {isSlowLoading ? (
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold font-serif">Waking up the roaster...</h3>
                                <p className="text-sm text-[var(--color-text-muted)] font-sans">Our server is starting up. Please wait a moment!</p>
                            </div>
                        ) : (
                            <h3 className="text-lg font-semibold font-serif">Loading Featured Coffee...</h3>
                        )}
                    </div>
                ) : isError || !productsData ? (
                    <div className="text-center py-16">
                        <p className="text-[var(--color-text-muted)] font-sans">Our coffee catalog is warming up. Check back shortly!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {productsData?.content?.map((product: any, index: number) => (
                            <div
                                key={product.id}
                                className={`transition-all duration-700 ${featured.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}

                {/* View All Link */}
                <div className={`text-center mt-12 transition-all duration-700 delay-500 ${featured.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 link-underline font-sans"
                    >
                        View all coffee
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>

            {/* ===== BREWING GUIDES ===== */}
            <section
                ref={guides.ref}
                className="relative py-32 overflow-hidden"
            >
                {/* Background accent */}
                <div className="absolute inset-0 bg-[var(--color-surface)]/50" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[var(--color-primary)]/5 blur-[120px]" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className={`text-center mb-20 transition-all duration-700 ${guides.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)] mb-4 block font-sans">
                            Master Your Brew
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Brewing Guides & Tips
                        </h2>
                        <div className="section-divider mx-auto mt-6" />
                    </div>

                    <div className="space-y-24">
                        {/* Guide: Pour-Over */}
                        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-700 ${guides.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '200ms' }}>
                            <div className="space-y-6">
                                <span className="badge">Guide</span>
                                <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                                    The Perfect Pour-Over
                                </h3>
                                <p className="text-[var(--color-text-secondary)] leading-relaxed font-sans">
                                    Unlock the full potential of your favorite coffee with our step-by-step pour-over guide. Learn the art of controlled extraction for a clean, bright cup.
                                </p>
                                <Button asChild variant="ghost" className="rounded-full px-6 border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] text-sm font-medium transition-all duration-300 font-sans">
                                    <Link to="/guides/pour-over">
                                        Read Guide
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                            <div className="img-zoom rounded-2xl overflow-hidden aspect-[4/3]">
                                <img
                                    src="/images/Pour-Over.jpg"
                                    alt="Pour-over coffee setup"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Guide: French Press */}
                        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-700 ${guides.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '400ms' }}>
                            <div className="img-zoom rounded-2xl overflow-hidden aspect-[4/3] lg:order-first">
                                <img
                                    src="/images/French-Press.jpg"
                                    alt="French press coffee maker"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="space-y-6">
                                <span className="badge">Guide</span>
                                <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                                    French Press Mastery
                                </h3>
                                <p className="text-[var(--color-text-secondary)] leading-relaxed font-sans">
                                    Discover the rich, full-bodied flavors you can achieve with a French press. Our guide covers everything from grind size to steep time.
                                </p>
                                <Button asChild variant="ghost" className="rounded-full px-6 border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] text-sm font-medium transition-all duration-300 font-sans">
                                    <Link to="/guides/french-press">
                                        Read Guide
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== BOTTOM CTA ===== */}
            <section
                ref={cta.ref}
                className={`max-w-7xl mx-auto px-6 lg:px-8 py-32 transition-all duration-700 ${cta.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
                <div className="relative rounded-3xl overflow-hidden">
                    <img
                        src="/images/storybeans.jpg"
                        alt="Coffee beans being roasted"
                        className="w-full h-80 md:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)]/90 via-[var(--color-background)]/70 to-transparent" />
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-lg px-10 md:px-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Begin Your Coffee Journey
                            </h2>
                            <p className="text-[var(--color-text-secondary)] mb-8 font-sans">
                                Explore our curated selection of single-origin coffees from around the world.
                            </p>
                            <Button asChild size="lg" className="btn-primary rounded-full px-8 py-6 text-sm font-medium shadow-lg shadow-[var(--color-primary)]/20">
                                <Link to="/products">
                                    Explore Collection
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}