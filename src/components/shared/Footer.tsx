// src/components/shared/Footer.tsx

import { Link } from 'react-router-dom';
import { Coffee, ArrowUpRight } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/30">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                                <Coffee className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-serif text-xl font-bold">The Grind</span>
                        </div>
                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                            Artisan coffee crafted with passion. Ethically sourced, expertly roasted.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-4 font-sans">
                            Shop
                        </h4>
                        <nav className="flex flex-col gap-2.5">
                            <Link to="/products" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 inline-flex items-center gap-1 group">
                                All Coffee
                                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                            </Link>
                            <Link to="/guides/pour-over" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 inline-flex items-center gap-1 group">
                                Pour-Over Guide
                                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                            </Link>
                            <Link to="/guides/french-press" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 inline-flex items-center gap-1 group">
                                French Press Guide
                                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                            </Link>
                        </nav>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-4 font-sans">
                            Company
                        </h4>
                        <nav className="flex flex-col gap-2.5">
                            <Link to="/our-story" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 inline-flex items-center gap-1 group">
                                Our Story
                                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                            </Link>
                            <Link to="/contact" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 inline-flex items-center gap-1 group">
                                Contact
                                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                            </Link>
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-4 font-sans">
                            Get in Touch
                        </h4>
                        <div className="flex flex-col gap-2.5 text-sm text-[var(--color-text-secondary)]">
                            <a href="mailto:support@thegrind.com" className="hover:text-[var(--color-primary)] transition-colors duration-200">
                                support@thegrind.com
                            </a>
                            <span>(555) 123-4567</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[var(--color-border)]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-[var(--color-text-muted)]">
                        &copy; {currentYear} The Grind Coffee Roasters. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-xs text-[var(--color-text-muted)]">
                            Crafted with ☕ and care
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}