// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/shared/Layout";
import { HomePage } from "@/pages/HomePage";
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from "@/pages/CartPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute"; // <-- IMPORT THIS
import { CheckoutPage } from "@/pages/CheckoutPage";
import { OrderConfirmationPage } from "@/pages/OrderConfirmationPage";
import { OurStoryPage } from "@/pages/OurStoryPage"; // <-- IMPORT
import { ContactPage } from "@/pages/ContactPage"; // <-- IMPORT
import { PourOverGuidePage } from "@/pages/PourOverGuidePage"; // <-- IMPORT
import { FrenchPressGuidePage } from "@/pages/FrenchPressGuidePage"; // <-- IMPORT



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
                <Route path="guides/pour-over" element={<PourOverGuidePage />} /> {/* <-- ADD */}
                <Route path="guides/french-press" element={<FrenchPressGuidePage />} /> {/* <-- ADD */}

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="cart" element={<CartPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
