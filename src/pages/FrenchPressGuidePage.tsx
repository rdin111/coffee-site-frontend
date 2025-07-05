// src/pages/FrenchPressGuidePage.tsx

import { GuidePageLayout } from "@/components/shared/GuidePageLayout";

export function FrenchPressGuidePage() {
    const description = (
        <>
            <p>
                The French press is a classic brewing method that produces a rich, full-bodied cup of coffee with a wonderful texture. It's a simple process that yields consistently delicious results.
            </p>
            <h3 className="font-semibold mt-6 mb-2">What You'll Need:</h3>
            <ul>
                <li>French press brewer</li>
                <li>Kettle</li>
                <li>Your favorite coffee from The Grind, ground coarse</li>
                <li>A spoon or stirrer</li>
            </ul>
            <h3 className="font-semibold mt-6 mb-2">Steps:</h3>
            <ol>
                <li><strong>Heat Water & Preheat Press:</strong> Heat your water to just off a boil, around 200°F (93°C). Pour some hot water into your French press to preheat it, then discard the water.</li>
                <li><strong>Add Coffee Grounds:</strong> Add your coarse coffee grounds to the bottom of the empty press. A good starting ratio is about 1:15 (e.g., 30g of coffee for 450g of water).</li>
                <li><strong>Bloom the Coffee:</strong> Start a timer and add just enough hot water to saturate the grounds. Give it a gentle stir and let it sit for about 30 seconds.</li>
                <li><strong>Add Remaining Water & Steep:</strong> Pour the rest of your hot water over the grounds. Place the plunger on top, but do not press it down yet. Let the coffee steep for 4 minutes.</li>
                <li><strong>Plunge & Serve:</strong> After 4 minutes, slowly and steadily press the plunger all the way down. This separates the grounds from the brewed coffee. Serve immediately to prevent over-extraction, and enjoy!</li>
            </ol>
        </>
    );

    return (
        <GuidePageLayout
            title="French Press Mastery"
            description={description}
            imageUrl="/images/French-Press.jpg" // Reusing the image from public/images
        />
    );
}