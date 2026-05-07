// src/features/auth/RegisterForm.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser, registerSchema, type RegisterData } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Coffee } from 'lucide-react';

export function RegisterForm() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
    });

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            toast.success(data);
            navigate('/login');
        },
        onError: (error) => {
            toast.error(`Registration failed: ${error.message}`);
        }
    });

    const onSubmit = (data: RegisterData) => {
        mutation.mutate(data);
    };

    const inputClasses = "bg-[var(--color-surface-elevated)] border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl h-12 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20";

    return (
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8">
            <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mx-auto mb-4">
                    <Coffee className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Create an account</h2>
                <p className="text-sm text-[var(--color-text-muted)] mt-1 font-sans">
                    Enter your details below to get started
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm text-[var(--color-text-secondary)] font-sans">Username</Label>
                    <Input id="username" {...register("username")} className={inputClasses} />
                    {errors.username && <p className="text-[var(--color-error)] text-xs font-sans">{errors.username.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm text-[var(--color-text-secondary)] font-sans">Email</Label>
                    <Input id="email" type="email" {...register("email")} className={inputClasses} />
                    {errors.email && <p className="text-[var(--color-error)] text-xs font-sans">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm text-[var(--color-text-secondary)] font-sans">Password</Label>
                    <Input id="password" type="password" {...register("password")} className={inputClasses} />
                    {errors.password && <p className="text-[var(--color-error)] text-xs font-sans">{errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full btn-primary rounded-xl py-6 text-sm font-medium" disabled={mutation.isPending}>
                    {mutation.isPending ? "Creating account..." : "Create Account"}
                </Button>
            </form>

            <div className="mt-6 text-center text-sm font-sans">
                <span className="text-[var(--color-text-muted)]">Already have an account? </span>
                <Link to="/login" className="text-[var(--color-primary)] hover:underline font-medium">Log in</Link>
            </div>
        </div>
    );
}