// src/pages/RegisterPage.tsx
import { RegisterForm } from "@/features/auth/RegisterForm";

export function RegisterPage() {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
                <RegisterForm />
            </div>
        </div>
    );
}