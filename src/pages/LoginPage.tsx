// src/pages/LoginPage.tsx
import { LoginForm } from "@/features/auth/LoginForm";
import { Terminal } from "lucide-react";

export function LoginPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center pt-24 px-6">
            <div className="mx-auto w-full max-w-[400px] space-y-6 animate-fade-in-up">
                <LoginForm />

                {/* Demo Credentials Hint */}
                <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-muted)] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Terminal className="h-4 w-4 text-[var(--color-primary)]" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold mb-1 font-sans">Demo Account</h3>
                            <p className="text-xs text-[var(--color-text-muted)] font-sans">
                                <strong className="text-[var(--color-text-secondary)]">Username:</strong> demouser
                            </p>
                            <p className="text-xs text-[var(--color-text-muted)] font-sans">
                                <strong className="text-[var(--color-text-secondary)]">Password:</strong> password
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
