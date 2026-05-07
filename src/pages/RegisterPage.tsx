// src/pages/RegisterPage.tsx
import { RegisterForm } from "@/features/auth/RegisterForm";

export function RegisterPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center pt-24 px-6">
            <div className="mx-auto w-full max-w-[400px] animate-fade-in-up">
                <RegisterForm />
            </div>
        </div>
    );
}