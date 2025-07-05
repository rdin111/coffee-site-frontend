import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

export function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
        resolver: zodResolver(loginSchema), // Use Zod for validation
    });

    // useMutation is the React Query hook for POST/PUT/DELETE requests
    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (token) => {
            // On successful API call, dispatch the credentials to Redux
            dispatch(setCredentials({ token }));
            toast.success("Login successful!");
            // Redirect the user to the homepage
            navigate('/');
        },
        onError: (error) => {
            // On error, show a toast notification
            toast.error(`Login failed: ${error.message}`);
        }
    });

    // This function is called when the form is submitted and valid
    const onSubmit = (data: LoginData) => {
        mutation.mutate(data); // Execute the mutation
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your username and password below to login.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* We use handleSubmit to wrap our onSubmit function */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        {/* We use register to link the input to our form state */}
                        <Input id="username" {...register("username")} placeholder="testuser" />
                        {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" {...register("password")} />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={mutation.isPending}>
                        {mutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="underline">Sign up</Link>
                </div>
            </CardContent>
        </Card>
    );
}