// src/components/shared/Header.tsx

import { ShoppingCart, User, Menu, Coffee } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { selectTotalCartItems } from '@/features/cart/cartSlice';
import { selectIsAuthenticated, selectUsername } from '@/features/auth/authSlice';
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
    const username = useSelector(selectUsername);
    const navigate = useNavigate();
    const location = useLocation();

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { to: '/products', label: 'Shop' },
        { to: '/our-story', label: 'Our Story' },
        { to: '/contact', label: 'Contact' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
                scrolled
                    ? 'bg-[var(--color-background)]/95 backdrop-blur-xl border-b border-[var(--color-border)] py-3'
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
                {/* Left: Mobile menu + Logo */}
                <div className="flex items-center gap-4">
                    {/* Hamburger Menu (Mobile Only) */}
                    <div className="md:hidden">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Open menu" className="text-[var(--color-text-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] bg-[var(--color-surface)] border-r border-[var(--color-border)]">
                                <div className="flex items-center gap-2 mb-10 mt-4">
                                    <Coffee className="h-5 w-5 text-[var(--color-primary)]" />
                                    <span className="font-serif text-xl font-bold text-[var(--color-text-primary)]">The Grind</span>
                                </div>
                                <nav className="flex flex-col gap-1">
                                    {navLinks.map((link) => (
                                        <SheetClose asChild key={link.to}>
                                            <Link
                                                to={link.to}
                                                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                    isActive(link.to)
                                                        ? 'bg-[var(--color-primary-muted)] text-[var(--color-primary)]'
                                                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)]'
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </SheetClose>
                                    ))}

                                    {/* Mobile: Profile/Login link */}
                                    <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                                        {isAuthenticated ? (
                                            <SheetClose asChild>
                                                <Link
                                                    to="/profile"
                                                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                                                        isActive('/profile')
                                                            ? 'bg-[var(--color-primary-muted)] text-[var(--color-primary)]'
                                                            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)]'
                                                    }`}
                                                >
                                                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                                                        <User className="h-3.5 w-3.5 text-white" />
                                                    </div>
                                                    {username || 'My Profile'}
                                                </Link>
                                            </SheetClose>
                                        ) : (
                                            <SheetClose asChild>
                                                <Link
                                                    to="/login"
                                                    className="px-4 py-3 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-all duration-200 flex items-center gap-3"
                                                >
                                                    <User className="h-4 w-4" />
                                                    Login
                                                </Link>
                                            </SheetClose>
                                        )}
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <Coffee className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-serif text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
                            The Grind
                        </span>
                    </Link>
                </div>

                {/* Center: Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1 bg-[var(--color-surface)]/50 backdrop-blur-sm rounded-full px-2 py-1.5 border border-[var(--color-border)]">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                                isActive(link.to)
                                    ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20'
                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)]'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right: Action Icons */}
                <div className="flex items-center gap-2">
                    {isAuthenticated ? (
                        <Link
                            to="/profile"
                            aria-label="Profile"
                            className={`relative flex items-center gap-2 transition-all duration-200 p-1.5 pr-3 rounded-full ${
                                isActive('/profile')
                                    ? 'bg-[var(--color-primary-muted)] text-[var(--color-primary)]'
                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]'
                            }`}
                        >
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                                <User className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="hidden sm:block text-[13px] font-medium truncate max-w-[80px]">
                                {username || 'Profile'}
                            </span>
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            aria-label="Login"
                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 p-2 rounded-full hover:bg-[var(--color-surface)]"
                        >
                            <User className="h-[18px] w-[18px]" />
                        </Link>
                    )}

                    <Link
                        to="/cart"
                        className="relative text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 p-2 rounded-full hover:bg-[var(--color-surface)]"
                        aria-label="Shopping Cart"
                    >
                        <ShoppingCart className="h-[18px] w-[18px]" />
                        {totalItems > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 bg-[var(--color-primary)] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/30 animate-scale-in">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}