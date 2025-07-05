// src/pages/HomePage.tsx

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api/products";
import { Link } from "react-router-dom";

export function HomePage() {
    // We can reuse our fetchProducts function to get a few products for the homepage
    const { data: productsData, isLoading } = useQuery({
        queryKey: ['featured-products'],
        queryFn: () => fetchProducts({ page: 0, size: 3 }), // Fetch just 3 products
    });

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

            {/* Featured Blends Section */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-8">Featured Blends</h2>
                {isLoading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {productsData?.content.map((product: any) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            {/* Brewing Guides Section */}
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
                        {/* --- UPDATED IMAGE --- */}
                        <div className="bg-gray-100 h-64 rounded-lg">
                            <img
                                src="/images/Pour-Over.jpg"
                                alt="Pour-over coffee setup"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    </div>
                    {/* Guide: French Press */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* --- UPDATED IMAGE --- */}
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