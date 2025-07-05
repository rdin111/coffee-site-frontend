// src/pages/ContactPage.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // <-- We need to add this from Shadcn
import { Label } from "@/components/ui/label";

export function ContactPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold">Contact Us</h1>
                <p className="text-lg mt-2 text-muted-foreground">We're here to help! Reach out with any questions or concerns.</p>
            </div>

            <form className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter the subject" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Enter your message" className="min-h-32" />
                </div>
                <Button type="submit" className="w-full bg-[#D37A54] hover:bg-[#b66a4a]">
                    Submit
                </Button>
            </form>

            <div className="mt-12 text-center">
                <h3 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h3>
                <div className="flex justify-center gap-8 text-muted-foreground">
                    <p><strong>Email:</strong> support@thegrind.com</p>
                    <p><strong>Phone:</strong> (555) 123-4567</p>
                </div>
            </div>
        </div>
    );
}