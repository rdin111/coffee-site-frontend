// src/components/shared/Header.tsx

import { ShoppingCart, User, LogOut, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { selectTotalCartItems } from '@/features/cart/cartSlice';
import { selectIsAuthenticated, logOut } from '@/features/auth/authSlice';
import { Button } from '../ui/button';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";

export function Header() {
    const totalItems = useSelector(selectTotalCartItems);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logOut());
        setMobileMenuOpen(false); // Close menu on logout
        navigate('/login');
    };

    return (
        <header className="border-b sticky top-0 bg-white z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">

                <div className="flex items-center gap-4">
                    {/* --- HAMBURGER MENU (MOBILE ONLY) --- */}
                    <div className="md:hidden">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Open menu">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            {/* This SheetContent now slides from the LEFT */}
                            <SheetContent side="left" className="w-[300px]">
                                <nav className="flex flex-col gap-6 text-lg font-medium mt-8">
                                    <SheetClose asChild>
                                        <Link to="/products">Shop</Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link to="/our-story">Our Story</Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link to="/contact">Contact</Link>
                                    </SheetClose>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* --- LOGO --- */}
                    <Link to="/" className="text-xl font-bold">
                        The Grind
                    </Link>
                </div>

                {/* --- DESKTOP NAVIGATION (DESKTOP ONLY) --- */}
                {/* This nav is now hidden on mobile screens */}
                <nav className="hidden md:flex gap-6">
                    <Link to="/products" className="text-sm font-medium hover:text-orange-600 transition-colors">Shop</Link>
                    <Link to="/our-story" className="text-sm font-medium hover:text-orange-600 transition-colors">Our Story</Link>
                    <Link to="/contact" className="text-sm font-medium hover:text-orange-600 transition-colors">Contact</Link>
                </nav>

                {/* --- ICONS (ALWAYS VISIBLE) --- */}
                {/* This div is no longer hidden on mobile, so the icons are always on the right */}
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
                            <LogOut className="h-5 w-5" />
                        </Button>
                    ) : (
                        <Link to="/login" aria-label="Login">
                            <User className="h-5 w-5 cursor-pointer" />
                        </Link>
                    )}

                    <Link to="/cart" className="relative" aria-label="Shopping Cart">
                        <ShoppingCart className="h-5 w-5 cursor-pointer" />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#D37A54] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
                        )}
                    </Link>
                </div>

            </div>
        </header>
    );
}