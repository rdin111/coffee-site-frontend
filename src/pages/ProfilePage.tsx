// src/pages/ProfilePage.tsx

import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectUsername, logOut } from '@/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchOrders, type Order } from '@/api/orders';
import { Button } from '@/components/ui/button';
import { User, LogOut, Package, Calendar, ShoppingBag, Coffee, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export function ProfilePage() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const username = useSelector(selectUsername);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch order history
    const { data: orders, isLoading, isError } = useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn: fetchOrders,
        enabled: isAuthenticated,
    });

    const handleLogout = () => {
        dispatch(logOut());
        toast.success('Logged out successfully');
        navigate('/');
    };

    // This shouldn't happen since we use ProtectedRoute, but just in case
    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    const formatDate = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-32 pb-20">
            {/* Profile Header */}
            <div className="animate-fade-in-up">
                <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8 md:p-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            {/* Avatar */}
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20">
                                <User className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold">
                                    {username || 'Coffee Lover'}
                                </h1>
                                <p className="text-[var(--color-text-muted)] text-sm font-sans mt-0.5">
                                    Welcome back to The Grind
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={handleLogout}
                            variant="ghost"
                            className="text-[var(--color-error)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded-xl px-5 py-2.5 text-sm font-medium gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 animate-fade-in-up delay-100">
                <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-muted)] flex items-center justify-center">
                            <Package className="h-4 w-4 text-[var(--color-primary)]" />
                        </div>
                        <span className="text-xs text-[var(--color-text-muted)] font-sans uppercase tracking-wider">Total Orders</span>
                    </div>
                    <p className="text-2xl font-bold">{orders?.length ?? 0}</p>
                </div>
                <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-subtle)] flex items-center justify-center">
                            <ShoppingBag className="h-4 w-4 text-[var(--color-accent)]" />
                        </div>
                        <span className="text-xs text-[var(--color-text-muted)] font-sans uppercase tracking-wider">Total Spent</span>
                    </div>
                    <p className="text-2xl font-bold">
                        ${orders?.reduce((sum, o) => sum + (o.totalAmount || 0), 0).toFixed(2) ?? '0.00'}
                    </p>
                </div>
                <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5 col-span-2 md:col-span-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-success)]/10 flex items-center justify-center">
                            <Coffee className="h-4 w-4 text-[var(--color-success)]" />
                        </div>
                        <span className="text-xs text-[var(--color-text-muted)] font-sans uppercase tracking-wider">Member Since</span>
                    </div>
                    <p className="text-2xl font-bold">2026</p>
                </div>
            </div>

            {/* Order History */}
            <div className="mt-10 animate-fade-in-up delay-200">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold">Order History</h2>
                        <p className="text-sm text-[var(--color-text-muted)] font-sans mt-0.5">
                            Your recent purchases
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/products')}
                        className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:bg-[var(--color-primary-muted)] rounded-xl text-sm font-medium gap-1"
                    >
                        Shop More
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                {isLoading && (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 shimmer h-28" />
                        ))}
                    </div>
                )}

                {isError && (
                    <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8 text-center">
                        <p className="text-[var(--color-text-muted)] font-sans">
                            Unable to load order history. Please try again later.
                        </p>
                    </div>
                )}

                {!isLoading && !isError && orders && orders.length === 0 && (
                    <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-10 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface-elevated)] flex items-center justify-center mx-auto mb-4">
                            <Package className="h-7 w-7 text-[var(--color-text-muted)]" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">No orders yet</h3>
                        <p className="text-sm text-[var(--color-text-muted)] font-sans mb-6">
                            Your order history will appear here once you make a purchase.
                        </p>
                        <Button
                            onClick={() => navigate('/products')}
                            className="btn-primary rounded-xl px-8 py-5 text-sm font-medium"
                        >
                            Browse Coffee
                        </Button>
                    </div>
                )}

                {!isLoading && orders && orders.length > 0 && (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 hover:border-[var(--color-border-hover)] transition-colors duration-300"
                            >
                                {/* Order Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-muted)] flex items-center justify-center">
                                            <Package className="h-4 w-4 text-[var(--color-primary)]" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm font-sans">
                                                Order #{order.id}
                                            </p>
                                            <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-sans">
                                                <Calendar className="h-3 w-3" />
                                                {formatDate(order.orderDate)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="badge">Completed</span>
                                        <span className="text-lg font-bold">
                                            ${order.totalAmount?.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="border-t border-[var(--color-border)] pt-4 space-y-3">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--color-surface-elevated)]">
                                                {item.product?.imageUrl ? (
                                                    <img
                                                        src={item.product.imageUrl}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Coffee className="h-4 w-4 text-[var(--color-text-muted)]" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium font-sans truncate">
                                                    {item.product?.name || `Product #${item.id}`}
                                                </p>
                                                <p className="text-xs text-[var(--color-text-muted)] font-sans">
                                                    Qty: {item.quantity} × ${item.price?.toFixed(2)}
                                                </p>
                                            </div>
                                            <p className="text-sm font-medium font-sans">
                                                ${(item.quantity * item.price).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
