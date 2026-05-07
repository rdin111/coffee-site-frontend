export function OurStoryPage() {
    return (
        <div className="pt-24">
            {/* Hero Section */}
            <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                <img
                    src="/images/storybeans.jpg"
                    alt="Close-up of roasted coffee beans"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 pb-16 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)] mb-4 block font-sans animate-fade-in-up">
                            Since 2019
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold animate-fade-in-up delay-100">Our Story</h1>
                    </div>
                </div>
            </section>

            {/* Intro Text */}
            <section className="max-w-3xl mx-auto px-6 py-20">
                <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed text-center font-sans animate-fade-in-up">
                    Our journey began with a simple passion: to share the world's finest coffees with fellow enthusiasts. Founded in 2019 out of a love for exceptional coffee, we embarked on a mission to source beans directly from sustainable farms and roast them to perfection.
                </p>
            </section>

            {/* Values & Sourcing */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-6">
                        <div className="section-divider" />
                        <h2 className="text-3xl md:text-4xl font-bold">Our Values</h2>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed font-sans">
                            We believe in transparency, sustainability, and the power of a great cup of coffee to bring people together. We strive to create a positive impact on the environment and the lives of our farmers.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div className="section-divider" />
                        <h2 className="text-3xl md:text-4xl font-bold">Sourcing Practices</h2>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed font-sans">
                            Our sourcing practices are rooted in direct relationships with coffee farmers around the globe. We travel to remote regions to meet the people behind the beans and ensure fair compensation for their hard work.
                        </p>
                    </div>
                </div>
            </section>

            {/* Full-Width Image */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                <div className="img-zoom rounded-3xl overflow-hidden aspect-[21/9]">
                    <img
                        src="/images/coffee-farm.jpg"
                        alt="Coffee farmer tending to plants"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* Commitment */}
            <section className="max-w-3xl mx-auto px-6 py-20">
                <div className="text-center space-y-6">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)] font-sans">
                        Our Promise
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold">Our Commitment</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed font-sans">
                        We are committed to continuous improvement. We constantly seek new ways to enhance our sustainability efforts, refine our roasting techniques, and expand our offerings. Our goal is to provide you with an ever-evolving selection of exceptional coffees.
                    </p>
                </div>
            </section>
        </div>
    );
}