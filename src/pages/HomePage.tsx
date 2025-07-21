// src/pages/HomePage.tsx

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api/products";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export function HomePage() {
    // State to track if the load is taking a while
    const [isSlowLoading, setIsSlowLoading] = useState(false);

    // Fetch just 3 products for the "Featured Blends" section
    const { data: productsData, isLoading } = useQuery({
        queryKey: ['featured-products'],
        queryFn: () => fetchProducts({ page: 0, size: 3 }),
    });

    // useEffect to manage the slow loading message timer
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isLoading) {
            // After 3 seconds, if still loading, assume it's a cold start
            timer = setTimeout(() => {
                setIsSlowLoading(true);
            }, 3000);
        } else {
            // If loading finishes, cancel the timer and hide the message
            setIsSlowLoading(false);
        }

        // Cleanup function to clear the timer if the component unmounts
        return () => clearTimeout(timer);

    }, [isLoading]); // Re-run this effect whenever isLoading changes

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center py-20 px-4 bg-cream-100 rounded-lg">
                <h1 className="text-4xl md:text-5xl font-bold text-brown-800 mb-4">
                    Crafted with Passion, Brewed with Love
                </h1>
                <p className="text-lg text-brown-700 max-w-2xl mx-auto mb-8">
                    Discover our commitment to perfect blends, from the finest beans fresh to your doorstep.
                </p>
                <Button asChild size="lg" className="bg-[#D37A54] hover:bg-[#b66a4a]">
                    <Link to="/products">Shop Now</Link>
                </Button>
            </section>

            <section>
                <h2 className="text-3xl font-bold text-center mb-8">Featured Blends</h2>
                {isLoading ? (
                    // Use the same conditional loading message component here
                    <div className="text-center py-10">
                        <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#D37A54] mb-4" />
                        {isSlowLoading ? (
                            <>
                                <h2 className="text-lg font-semibold">Waking up the roaster...</h2>
                                <p className="text-muted-foreground text-sm">Our server is starting up. Please wait a moment!</p>
                            </>
                        ) : (
                            <h2 className="text-lg font-semibold">Loading Featured Coffee...</h2>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {productsData?.content.map((product: any) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            <section>
                <h2 className="text-3xl font-bold text-center mb-12">Brewing Guides & Tips</h2>
                <div className="space-y-10">
                    {/* Guide: Pour-Over */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">The Perfect Pour-Over</h3>
                            <p className="text-muted-foreground mb-4">Unlock the full potential of your favorite coffee with our step-by-step pour-over guide.</p>
                            <Button asChild variant="outline">
                                <Link to="/guides/pour-over">Read More</Link>
                            </Button>
                        </div>
                        <div className="bg-gray-100 h-64 rounded-lg">
                            <img
                                src="/images/Pour-Over.jpg"
                                alt="Pour-over coffee setup"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="bg-gray-100 h-64 rounded-lg md:order-last">
                            <img
                                src="/images/French-Press.jpg"
                                alt="French press coffee maker"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">French Press Mastery</h3>
                            <p className="text-muted-foreground mb-4">Discover the rich, full-bodied flavors you can achieve with a French press.</p>
                            <Button asChild variant="outline">
                                <Link to="/guides/french-press">Read More</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}