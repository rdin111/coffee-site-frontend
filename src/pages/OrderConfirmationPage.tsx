// src/pages/OrderConfirmationPage.tsx
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function OrderConfirmationPage() {
    return (
        <div className="text-center py-20">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-3xl font-bold">Thank You For Your Order!</h1>
            <p className="text-muted-foreground mt-2">A confirmation email has been sent.</p>
            <Button asChild className="mt-8 bg-[#D37A54] hover:bg-[#b66a4a]">
                <Link to="/products">Continue Shopping</Link>
            </Button>
        </div>
    );
}