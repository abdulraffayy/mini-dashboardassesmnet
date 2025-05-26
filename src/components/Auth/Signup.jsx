import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup, selectAuthError, selectUser, clearError } from '../../features/auth/authSlice';

export default function Signup() {
    const {
        register,
        handleSubmit,
        watch,
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

    const onSubmit = async (data) => {
        try {
            const result = await dispatch(signup({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password
            })).unwrap();

            if (result) {
                navigate('/dashboard');
            }
        } catch (err) {
            // Error is handled by the auth slice
            console.error('Signup failed:', err);
        }
    };

    const password = watch('password');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6">
                    <input
                        type="text"
                        placeholder="First Name"
                        {...register('firstName', {
                            required: 'First name is required',
                            minLength: { value: 2, message: 'At least 2 characters' }
                        })}
                        className={`w-full max-w-xs px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center text-lg ${errors.firstName ? 'border-red-500' : ''}`}
                    />
                    {errors.firstName && (
                        <p className="text-sm text-red-500">{errors.firstName.message}</p>
                    )}
                    <input
                        type="text"
                        placeholder="Last Name"
                        {...register('lastName', {
                            required: 'Last name is required',
                            minLength: { value: 2, message: 'At least 2 characters' }
                        })}
                        className={`w-full max-w-xs px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center text-lg ${errors.lastName ? 'border-red-500' : ''}`}
                    />
                    {errors.lastName && (
                        <p className="text-sm text-red-500">{errors.lastName.message}</p>
                    )}
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
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: value => value === password || 'Passwords do not match'
                        })}
                        className={`w-full max-w-xs px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center text-lg ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
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
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
