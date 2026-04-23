'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Login failed');
                return;
            }

            router.push('/admin');
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <div className="login-left">
                <div className="login-branding">
                    <div className="brand-icon-large">
                        <i className="fas fa-leaf"></i>
                    </div>
                    <h1>MarketingPark</h1>
                    <p>Admin Dashboard</p>
                </div>
            </div>
            
            <div className="login-right">
                <div className="login-form-wrapper">
                    <div className="login-header">
                        <h2>Welcome back</h2>
                        <p>Sign in to manage your content</p>
                    </div>
                    
                    {error && (
                        <div className="alert alert-error">
                            <i className="fas fa-exclamation-circle"></i>
                            <span>{error}</span>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <i className="fas fa-envelope"></i>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@marketingpark.com"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <i className="fas fa-lock"></i>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>
                        
                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading ? (
                                <>
                                    <div className="btn-spinner"></div>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <i className="fas fa-arrow-right"></i>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}