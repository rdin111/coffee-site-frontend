// src/components/shared/GuidePageLayout.tsx

import React from 'react';
import { Link } from 'react-router-dom'; // <-- IMPORT Link
import { ChevronLeft } from 'lucide-react'; // <-- IMPORT an icon

interface GuidePageLayoutProps {
    title: string;
    description: React.ReactNode;
    imageUrl: string;
}

export function GuidePageLayout({ title, description, imageUrl }: GuidePageLayoutProps) {
    return (
        <div className="max-w-4xl mx-auto space-y-8">

            <div className="mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-orange-600"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Home
                </Link>
            </div>

            <section className="text-center">
                <h1 className="text-4xl font-bold">{title}</h1>
            </section>

            <section>
                <div className="bg-gray-100 h-96 rounded-lg mb-8">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="prose max-w-none text-gray-700 leading-relaxed">
                    {description}
                </div>
            </section>
        </div>
    );
}