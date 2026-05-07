// src/pages/OrderConfirmationPage.tsx
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function OrderConfirmationPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center pt-24 px-6">
            <div className="text-center animate-fade-in-up">
                <div className="w-20 h-20 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-[var(--color-success)]" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Thank You For Your Order!</h1>
                <p className="text-[var(--color-text-muted)] mt-2 font-sans">A confirmation email has been sent to your inbox.</p>
                <Button asChild className="mt-8 btn-primary rounded-full px-8 py-6 text-sm font-medium">
                    <Link to="/products">
                        Continue Shopping
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}