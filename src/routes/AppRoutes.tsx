// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Layout } from "@/components/shared/Layout";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";
import { Loader2 } from "lucide-react";

// Lazy-loaded pages — each becomes its own JS chunk
const HomePage = lazy(() => import("@/pages/HomePage").then(m => ({ default: m.HomePage })));
const ProductsPage = lazy(() => import("@/pages/ProductsPage").then(m => ({ default: m.ProductsPage })));
const CartPage = lazy(() => import("@/pages/CartPage").then(m => ({ default: m.CartPage })));
const LoginPage = lazy(() => import("@/pages/LoginPage").then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import("@/pages/RegisterPage").then(m => ({ default: m.RegisterPage })));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage").then(m => ({ default: m.CheckoutPage })));
const OrderConfirmationPage = lazy(() => import("@/pages/OrderConfirmationPage").then(m => ({ default: m.OrderConfirmationPage })));
const OurStoryPage = lazy(() => import("@/pages/OurStoryPage").then(m => ({ default: m.OurStoryPage })));
const ContactPage = lazy(() => import("@/pages/ContactPage").then(m => ({ default: m.ContactPage })));
const PourOverGuidePage = lazy(() => import("@/pages/PourOverGuidePage").then(m => ({ default: m.PourOverGuidePage })));
const FrenchPressGuidePage = lazy(() => import("@/pages/FrenchPressGuidePage").then(m => ({ default: m.FrenchPressGuidePage })));
const ProfilePage = lazy(() => import("@/pages/ProfilePage").then(m => ({ default: m.ProfilePage })));

// Lightweight loading fallback
function PageLoader() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-[var(--color-primary)]" />
        </div>
    );
}

const AppRoutes = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Public Routes */}
                    <Route index element={<HomePage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="order-confirmation" element={<OrderConfirmationPage />} />
                    <Route path="our-story" element={<OurStoryPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="guides/pour-over" element={<PourOverGuidePage />} />
                    <Route path="guides/french-press" element={<FrenchPressGuidePage />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="cart" element={<CartPage />} />
                        <Route path="checkout" element={<CheckoutPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
