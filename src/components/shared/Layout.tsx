import {Header} from "@/components/shared/Header.tsx";
import {Footer} from "@/components/shared/Footer.tsx";
import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

export function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Toaster position="top-right" reverseOrder={false}/>
            <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
            <Outlet />
        </main>
            <Footer />
        </div>
    );
}