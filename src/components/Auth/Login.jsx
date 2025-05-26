/**
 * Login component that handles user authentication
 * Uses react-hook-form for form handling and validation
 * Integrates with auth slice for state management
 * 
 * Features:
 * - Email/password validation
 * - Error handling and display
 * - Redirect on successful auth
 * - Automatic redirect if already logged in
 */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, selectAuthError, selectUser, clearError } from '../../features/auth/authSlice';

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(selectAuthError);
    const user = useSelector(selectUser);

    useEffect(() => {
        // Clear any previous auth errors
        dispatch(clearError());

        // If user is already logged in, redirect to dashboard
        if (user) {
            navigate('/dashboard');
        }
    }, [dispatch, user, navigate]);

    /**
     * Handles form submission for login
     * @param {Object} data - Form data containing email and password
     */
    const onSubmit = async (data) => {
        try {
            const result = await dispatch(login(data)).unwrap();
            if (result) {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6">
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        })}
                        className={`w-full max-w-xs px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center text-lg ${errors.email ? 'border-red-500' : ''}`}
                        autoComplete="off"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 8, message: 'Password must be at least 8 characters' }
                        })}
                        className={`w-full max-w-xs px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center text-lg ${errors.password ? 'border-red-500' : ''}`}
                        autoComplete="off"
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                    {error && (
                        <div className="bg-red-50 border border-red-500 text-red-500 rounded p-2 text-sm">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full max-w-xs bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mt-2"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
