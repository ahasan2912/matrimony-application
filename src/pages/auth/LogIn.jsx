import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import AuthSidebar from '../../components/authSidebar/AuthSidebar';
import { images } from '../../../public/image';
import { useHandleLoginMutation } from '../../features/auth/authApi';

const LogIn = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [handleLogin, { isLoading }] = useHandleLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await handleLogin(data).unwrap();
            navigate('/');
        } catch (err) {
            const message = err?.data?.message || 'Invalid email or password.';
            setError('root', { message });
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen relative">
            <AuthSidebar />

            <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-2 sm:p-6 relative">
                <img src={images.loveIcon} alt="" className="hidden sm:block absolute top-10 left-10 text-pink-100 text-6xl" />
                <img src={images.loveIcon} alt="" className="hidden sm:block absolute bottom-20 right-20 text-pink-100 text-4xl" />

                <div className="w-full max-w-lg bg-[#FFEFF1] rounded-2xl px-4 py-8 md:px-12 md:py-12 border border-pink-100 mt-5 sm:mt-0">
                    <div className="text-center mb-8">
                        <h2 className="text-[32px] font-bold text-[#B6003F]">Welcome Back</h2>
                        <p className="text-[#737373] text-base font-medium mt-2">
                            Sign in to continue finding your perfect match.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                        {/* Email */}
                        <div>
                            <label className="block text-[#58001C] text-sm font-semibold mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className={`w-full h-13 rounded-full border px-5 text-base text-[#58001C] bg-white outline-none transition-colors placeholder:text-[#c4a4af]
                                    ${errors.email
                                        ? 'border-red-400 focus:border-red-400'
                                        : 'border-pink-200 focus:border-[#B30042]'
                                    }`}
                                {...register('email', {
                                    required: 'Email is required.',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Enter a valid email address.',
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1.5 pl-2">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-[#58001C] text-sm font-semibold mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className={`w-full h-13 rounded-full border px-5 pr-12 text-base text-[#58001C] bg-white outline-none transition-colors placeholder:text-[#c4a4af]
                                        ${errors.password
                                            ? 'border-red-400 focus:border-red-400'
                                            : 'border-pink-200 focus:border-[#B30042]'
                                        }`}
                                    {...register('password', {
                                        required: 'Password is required.',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters.',
                                        },
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B6003F] cursor-pointer"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1.5 pl-2">{errors.password.message}</p>
                            )}
                        </div>

                        {/* API error */}
                        {errors.root && (
                            <p className="text-red-500 text-sm text-center">{errors.root.message}</p>
                        )}

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#B30042] hover:bg-[#900035] disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 sm:py-4 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer outline-0"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        <span className="font-medium text-lg">Signing in...</span>
                                    </>
                                ) : (
                                    <span className="font-medium text-lg">Sign In</span>
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-[#58001C] text-center">
                        Don&apos;t have an account?{' '}
                        <Link to="/phone-number" className="text-[#FF225E] font-bold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
