// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/shared/Layout";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";
import { HomePage } from "@/pages/HomePage";
import { ProductsPage } from '@/pages/ProductsPage';
import { CartPage } from "@/pages/CartPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { OrderConfirmationPage } from "@/pages/OrderConfirmationPage";
import { OurStoryPage } from "@/pages/OurStoryPage";
import { ContactPage } from "@/pages/ContactPage";
import { PourOverGuidePage } from "@/pages/PourOverGuidePage";
import { FrenchPressGuidePage } from "@/pages/FrenchPressGuidePage";
import { ProfilePage } from "@/pages/ProfilePage";

const AppRoutes = () => {
    return (
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
    );
};

export default AppRoutes;
