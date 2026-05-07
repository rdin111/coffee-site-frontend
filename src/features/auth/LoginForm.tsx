import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUser, loginSchema, type LoginData } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Coffee } from 'lucide-react';

export function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (token, variables) => {
            // Store both the token and the username used to log in
            dispatch(setCredentials({ token, username: variables.username }));
            toast.success("Login successful!");
            navigate('/');
        },
        onError: (error) => {
            toast.error(`Login failed: ${error.message}`);
        }
    });

    const onSubmit = (data: LoginData) => {
        mutation.mutate(data);
    };

    const inputClasses = "bg-[var(--color-surface-elevated)] border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl h-12 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20";

    return (
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8">
            <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mx-auto mb-4">
                    <Coffee className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Welcome back</h2>
                <p className="text-sm text-[var(--color-text-muted)] mt-1 font-sans">
                    Enter your credentials to access your account
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm text-[var(--color-text-secondary)] font-sans">Username</Label>
                    <Input id="username" {...register("username")} placeholder="testuser" className={inputClasses} />
                    {errors.username && <p className="text-[var(--color-error)] text-xs font-sans">{errors.username.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm text-[var(--color-text-secondary)] font-sans">Password</Label>
                    <Input id="password" type="password" {...register("password")} className={inputClasses} />
                    {errors.password && <p className="text-[var(--color-error)] text-xs font-sans">{errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full btn-primary rounded-xl py-6 text-sm font-medium" disabled={mutation.isPending}>
                    {mutation.isPending ? "Logging in..." : "Login"}
                </Button>
            </form>

            <div className="mt-6 text-center text-sm font-sans">
                <span className="text-[var(--color-text-muted)]">Don't have an account? </span>
                <Link to="/register" className="text-[var(--color-primary)] hover:underline font-medium">Sign up</Link>
            </div>
        </div>
    );
}