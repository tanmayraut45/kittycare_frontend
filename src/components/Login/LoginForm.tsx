import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useGoogleLogin, TokenResponse } from '@react-oauth/google';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface LoginError {
  email?: string;
  password?: string;
  general?: string;
}

interface LoginFormProps {
  error?: LoginError;
  isLoading?: boolean;
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: FC<LoginFormProps> = ({ error, isLoading, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Validate email
  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Validate password
  const validatePassword = (value: string): boolean => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  // Handle change events
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail) {
      validateEmail(newEmail);
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPass = e.target.value;
    setPassword(newPass);
    if (newPass) {
      validatePassword(newPass);
    } else {
      setPasswordError('');
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (isEmailValid && isPasswordValid) {
      onSubmit(email, password);
    }
  };

  // Toggle password visibility
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Google login using @react-oauth/google
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse: TokenResponse) => {
      console.log('Google login successful:', tokenResponse);
    },
    onError: (error) => {
      console.error('Google login failed:', error);
    },
  });

  // Placeholder for Apple login
  const handleAppleLogin = () => {
    console.log('Apple login clicked (placeholder)');
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Email and password login form"
        className="space-y-6 flex flex-col gap-4"
      >
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={email}
            onChange={handleEmailChange}
            aria-invalid={!!(emailError || error?.email)}
            className={`
              w-full px-4 py-3 rounded-md border
              focus:outline-none focus:border-blue-500
              ${emailError || error?.email ? 'border-red-500' : 'border-gray-300'}
            `}
          />
          {(emailError || error?.email) && (
            <p className="mt-1 text-red-500 text-sm" role="alert" aria-live="polite">
              {emailError || error?.email}
            </p>
          )}
        </div>

        {/* Password Field with Toggle */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password (8+ characters)"
              value={password}
              onChange={handlePasswordChange}
              aria-invalid={!!(passwordError || error?.password)}
              className={`
                w-full px-4 py-3 rounded-md border
                focus:outline-none focus:border-blue-500 pr-10
                ${passwordError || error?.password ? 'border-red-500' : 'border-gray-300'}
              `}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="w-5 h-5" />
              ) : (
                <AiOutlineEye className="w-5 h-5" />
              )}
            </button>
          </div>
          {(passwordError || error?.password) && (
            <p className="mt-1 text-red-500 text-sm" role="alert" aria-live="polite">
              {passwordError || error?.password}
            </p>
          )}
          <div className="text-right mt-1">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={() => console.log('Forgot password clicked')}
            >
              Forgot password?
            </button>
          </div>
        </div>

        {/* General Error */}
        {error?.general && (
          <div className="text-red-500 text-center text-sm" role="alert" aria-live="polite">
            {error.general}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`
            w-full h-14 bg-blue-600 text-white rounded-md
            hover:bg-blue-700 transition-colors font-medium
            disabled:bg-blue-400 disabled:cursor-not-allowed
          `}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Horizontal lines with Google & Apple icons in the middle */}
      <div className="flex items-center justify-center gap-4 my-8">
        {/* Left line */}
        <div className="flex-grow border-t border-gray-300" />

        {/* Icons container */}
        <div className="flex gap-3">
          {/* Google Circle */}
          <button
            onClick={() => googleLogin()}
            className="
              w-12 h-12 
              flex items-center justify-center
              border border-gray-300 rounded-full
              hover:bg-gray-50
              transition-colors
              cursor-pointer
            "
            aria-label="Sign in with Google"
          >
            <img
              src="/assets/png/google.png"
              alt="Google"
              className="w-6 h-6 object-contain"
            />
          </button>

          {/* Apple Circle */}
          <button
            onClick={handleAppleLogin}
            className="
              w-12 h-12
              flex items-center justify-center
              border border-gray-300 rounded-full
              hover:bg-gray-50
              transition-colors
              cursor-pointer
            "
            aria-label="Sign in with Apple"
          >
            <img
              src="/assets/png/apple.png"
              alt="Apple"
              className="w-6 h-6 object-contain"
            />
          </button>
        </div>

        {/* Right line */}
        <div className="flex-grow border-t border-gray-300" />
      </div>
    </div>
  );
};

export default LoginForm;
