export function OurStoryPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold mb-4">Our Story</h1>
                <p className="text-lg text-muted-foreground">
                    Our journey began with a simple passion: to share the world's finest coffees with fellow enthusiasts.
                </p>
            </section>

            <section>
                {/* --- UPDATED IMAGE --- */}
                <img
                    src="/images/storybeans.jpg"
                    alt="Close-up of roasted coffee beans"
                    className="w-full h-80 object-cover rounded-lg mb-6"
                />
                <p className="text-gray-700 leading-relaxed">
                    Founded in 2019 out of a love for exceptional coffee, we embarked on a mission to source beans directly from sustainable farms and roast them to perfection. Our commitment to quality, ethical sourcing, and community engagement has been the cornerstone of our growth.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
                    <p className="text-gray-700">We believe in transparency, sustainability, and the power of a great cup of coffee to bring people together. We strive to create a positive impact on the environment and the lives of our farmers.</p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Sourcing Practices</h2>
                    <p className="text-gray-700">Our sourcing practices are rooted in direct relationships with coffee farmers around the globe. We travel to remote regions to meet the people behind the beans and ensure fair compensation for their hard work.</p>
                </div>
            </section>

            <section>
                {/* --- UPDATED IMAGE --- */}
                <img
                    src="/images/coffee-farm.jpg"
                    alt="Coffee farmer tending to plants"
                    className="w-full h-80 object-cover rounded-lg mb-6"
                />
                <h2 className="text-2xl font-semibold mb-2">Our Commitment</h2>
                <p className="text-gray-700 leading-relaxed">We are committed to continuous improvement. We constantly seek new ways to enhance our sustainability efforts, refine our roasting techniques, and expand our offerings. Our goal is to provide you with an ever-evolving selection of exceptional coffees.</p>
            </section>
        </div>
    );
}