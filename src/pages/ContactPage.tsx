// src/pages/ContactPage.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export function ContactPage() {
    return (
        <div className="pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)] mb-4 block font-sans">
                        Get in Touch
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto font-sans">
                        We'd love to hear from you. Whether you have a question about our coffee, need help with an order, or just want to say hello.
                    </p>
                    <div className="section-divider mx-auto mt-8" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 animate-fade-in-up delay-200">
                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium text-[var(--color-text-secondary)] font-sans">Your Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter your name"
                                        className="bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl h-12 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-[var(--color-text-secondary)] font-sans">Your Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl h-12 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject" className="text-sm font-medium text-[var(--color-text-secondary)] font-sans">Subject</Label>
                                <Input
                                    id="subject"
                                    placeholder="Enter the subject"
                                    className="bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl h-12 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-sm font-medium text-[var(--color-text-secondary)] font-sans">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Enter your message"
                                    className="min-h-40 bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 resize-none"
                                />
                            </div>
                            <Button type="submit" className="btn-primary rounded-xl px-8 py-6 text-sm font-medium w-full sm:w-auto">
                                <Send className="h-4 w-4 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors duration-300">
                            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-muted)] flex items-center justify-center mb-4">
                                <Mail className="h-5 w-5 text-[var(--color-primary)]" />
                            </div>
                            <h3 className="font-semibold text-sm mb-1 font-sans">Email Us</h3>
                            <a href="mailto:support@thegrind.com" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors font-sans">
                                support@thegrind.com
                            </a>
                        </div>

                        <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors duration-300">
                            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-muted)] flex items-center justify-center mb-4">
                                <Phone className="h-5 w-5 text-[var(--color-primary)]" />
                            </div>
                            <h3 className="font-semibold text-sm mb-1 font-sans">Call Us</h3>
                            <p className="text-sm text-[var(--color-text-secondary)] font-sans">(555) 123-4567</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors duration-300">
                            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-muted)] flex items-center justify-center mb-4">
                                <MapPin className="h-5 w-5 text-[var(--color-primary)]" />
                            </div>
                            <h3 className="font-semibold text-sm mb-1 font-sans">Visit Us</h3>
                            <p className="text-sm text-[var(--color-text-secondary)] font-sans">123 Roastery Lane<br/>Portland, OR 97201</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}