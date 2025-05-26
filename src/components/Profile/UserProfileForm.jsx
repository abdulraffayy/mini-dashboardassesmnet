/**
 * UserProfileForm Component
 * 
 * Handles user profile management with features:
 * - Profile picture upload
 * - Basic info editing (name, email, age)
 * - Form validation
 * - Image preview
 * - Persistent storage
 */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile, updateProfile } from '../../features/profile/profileSlice';
import { addNotification } from '../../features/notifications/notificationSlice';

export default function UserProfileForm() {
    const dispatch = useDispatch();
    const profile = useSelector(selectProfile);
    const [previewImage, setPreviewImage] = useState(profile.picture);
    const fileInputRef = React.useRef();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
            email: profile.email || '',
            age: profile.age || '',
        }
    });

    // Keep form in sync with profile state
    useEffect(() => {
        reset({
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
        });
    }, [profile, reset]);

    /**
     * Handles image file selection
     * @param {Event} event - File input change event
     */
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    /**
     * Handles form submission
     * @param {Object} data - Form data
     */
    const onSubmit = (data) => {
        const updatedProfile = {
            ...profile,
            ...data,
            picture: previewImage
        };

        dispatch(updateProfile(updatedProfile));
        dispatch(addNotification('Profile updated successfully'));
    };

    return (
        <div className="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center" style={{ minWidth: 340 }}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-6">
                {/* Profile Picture (clickable, upload on click) */}
                <div className="flex flex-col items-center mb-2">
                    <span
                        className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all relative"
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        title="Change profile picture"
                    >
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Profile"
                                className="h-24 w-24 rounded-full object-cover"
                            />
                        ) : (
                            <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24">
                                <circle cx="12" cy="8" r="4" fill="#d1d5db" />
                                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="#9ca3af" />
                            </svg>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <span className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow text-xs text-gray-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 11l6 6M3 17v4h4l11-11a2.828 2.828 0 10-4-4L3 17z" /></svg>
                        </span>
                    </span>
                </div>
                {/* First Name Field */}
                <input
                    type="text"
                    placeholder="First Name"
                    {...register('firstName', {
                        required: 'First name is required',
                        minLength: { value: 2, message: 'At least 2 characters' }
                    })}
                    className={`w-full max-w-xs px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-blue-400 focus:ring-blue-400 text-lg text-gray-900 font-medium transition-all duration-150 ${errors.firstName ? 'border-red-500' : ''}`}
                    autoComplete="off"
                />
                {/* Last Name Field */}
                <input
                    type="text"
                    placeholder="Last Name"
                    {...register('lastName', {
                        required: 'Last name is required',
                        minLength: { value: 2, message: 'At least 2 characters' }
                    })}
                    className={`w-full max-w-xs px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-blue-400 focus:ring-blue-400 text-lg text-gray-900 font-medium transition-all duration-150 ${errors.lastName ? 'border-red-500' : ''}`}
                    autoComplete="off"
                />
                {/* Save Button */}
                <button
                    type="submit"
                    className="w-full max-w-xs bg-blue-500 text-white py-3 rounded-xl text-lg font-bold shadow-sm hover:bg-blue-600 transition-colors mt-2"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
