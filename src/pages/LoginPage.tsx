import { LoginForm } from "@/features/auth/LoginForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export function LoginPage() {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
                {/* The existing Login Form component */}
                <LoginForm />

                {/* The new Demo Credentials Hint */}
                <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Demo Account</AlertTitle>
                    <AlertDescription>
                        <p><strong>Username:</strong> demouser</p>
                        <p><strong>Password:</strong> password</p>
                    </AlertDescription>
                </Alert>

            </div>
        </div>
    );
}
