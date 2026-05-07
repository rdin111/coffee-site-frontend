import { Header } from "@/components/shared/Header.tsx";
import { Footer } from "@/components/shared/Footer.tsx";
import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { AiChatWidget } from "./AiChatWidget";

export function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-[var(--color-background)] grain-overlay">
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: 'var(--color-surface-elevated)',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontFamily: 'var(--font-sans)',
                    },
                    success: {
                        iconTheme: {
                            primary: 'var(--color-primary)',
                            secondary: 'white',
                        },
                    },
                }}
            />
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
            <AiChatWidget />
        </div>
    );
}