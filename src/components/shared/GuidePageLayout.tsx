// src/components/shared/GuidePageLayout.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface GuidePageLayoutProps {
    title: string;
    description: React.ReactNode;
    imageUrl: string;
}

export function GuidePageLayout({ title, description, imageUrl }: GuidePageLayoutProps) {
    return (
        <div className="pt-24 pb-20">
            {/* Hero Image */}
            <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 pb-12 px-6">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            to="/"
                            className="inline-flex items-center text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-4 font-sans"
                        >
                            <ChevronLeft className="h-3.5 w-3.5 mr-0.5" />
                            Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold animate-fade-in-up">{title}</h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-16">
                <div className="prose prose-invert max-w-none text-[var(--color-text-secondary)] leading-relaxed font-sans
                    [&_h3]:font-serif [&_h3]:text-[var(--color-text-primary)] [&_h3]:text-xl [&_h3]:mt-10 [&_h3]:mb-4
                    [&_p]:mb-4 [&_p]:text-base
                    [&_ul]:space-y-2 [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:marker:text-[var(--color-primary)]
                    [&_ol]:space-y-3 [&_ol]:ml-4 [&_ol]:list-decimal [&_ol]:marker:text-[var(--color-primary)] [&_ol]:marker:font-semibold
                    [&_li]:text-base [&_li]:leading-relaxed
                    [&_strong]:text-[var(--color-text-primary)] [&_strong]:font-semibold
                ">
                    {description}
                </div>
            </div>
        </div>
    );
}