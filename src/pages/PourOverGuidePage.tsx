// src/pages/PourOverGuidePage.tsx

import { GuidePageLayout } from "@/components/shared/GuidePageLayout";

export function PourOverGuidePage() {
    const description = (
        <>
            <p>
                The pour-over method is beloved by coffee aficionados for the control it offers over the brewing process, allowing for the extraction of delicate and complex flavors. Here’s a simple guide to get you started.
            </p>
            <h3 className="font-semibold mt-6 mb-2">What You'll Need:</h3>
            <ul>
                <li>Pour-over dripper (like a V60 or Kalita Wave)</li>
                <li>Paper filter</li>
                <li>Gooseneck kettle</li>
                <li>Digital scale</li>
                <li>Your favorite coffee from The Grind, ground medium-fine</li>
            </ul>
            <h3 className="font-semibold mt-6 mb-2">Steps:</h3>
            <ol>
                <li><strong>Heat Your Water:</strong> Bring your water to a boil and let it sit for about 30 seconds to cool slightly, aiming for 195-205°F (90-96°C).</li>
                <li><strong>Rinse the Filter:</strong> Place the filter in your dripper, set it on top of your mug, and rinse it thoroughly with hot water. This removes any papery taste and preheats your equipment. Don't forget to discard the rinse water.</li>
                <li><strong>Add Coffee & Bloom:</strong> Add your ground coffee to the filter and gently shake to level the bed. Place it on your scale and tare to zero. Start a timer and pour just enough water (about twice the weight of the coffee) to saturate all the grounds. Wait for 30-45 seconds. This "bloom" releases trapped CO2 and prepares the coffee for extraction.</li>
                <li><strong>Continue Pouring:</strong> After the bloom, continue pouring the water in a slow, steady, circular motion, working from the center outwards. Try to maintain a consistent water level throughout the process.</li>
                <li><strong>Finish & Enjoy:</strong> Once you've added all your water, let it drain completely. Your total brew time should be between 2:30 and 4:00 minutes. Remove the dripper and enjoy your perfectly brewed cup!</li>
            </ol>
        </>
    );

    return (
        <GuidePageLayout
            title="The Perfect Pour-Over"
            description={description}
            imageUrl="/images/Pour-Over.jpg" // Reusing the image from public/images
        />
    );
}