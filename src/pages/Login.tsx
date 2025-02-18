import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { changeMethod } from '../Redux/features/billingSlice';
import { useAppDispatch } from '../Redux/hooks';
import ReactPixel from 'react-facebook-pixel';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';

interface LoginError {
  email?: string;
  password?: string;
  general?: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<LoginError>({});
  const [isLoading, setIsLoading] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);

  // Track page view and handle plan selection
  useEffect(() => {
    ReactPixel.track('ViewContent');
    const planSelection = urlParams.get('planSelection');
    if (planSelection) {
      const isYearly = planSelection.toLowerCase() === 'yearly';
      dispatch(changeMethod({ method: isYearly }));
    }
  }, [dispatch, urlParams]);

  // Handle email/password login
  const handleLogin = async (email: string, password: string) => {
    setError({});
    setIsLoading(true);

    try {
      // Example: call your login API or Redux action
      console.log('Logging in with:', email, password);
      // e.g. await dispatch(loginUser({ email, password })).unwrap();

      // Check subscription
      const subscriptionId = localStorage.getItem('subscriptionId');
      if (!subscriptionId || subscriptionId === 'undefined') {
        navigate(`/progress?${urlParams.toString()}`);
        return;
      }

      // Check cat profile
      const catId = localStorage.getItem('catId');
      if (!catId || catId === 'undefined') {
        navigate('/progress');
        return;
      }

      // If everything is in place
      navigate('/cat-assistant');
    } catch (err: any) {
      setError({
        general: err.message || 'Login failed. Please check your credentials.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      {/* Container to center the card */}
      <div className="flex items-start justify-center min-h-screen pt-10">
        {/* Smaller Card */}
        <div className="w-full max-w-md bg-white border-2 border-[#B8B8B8] rounded-3xl px-6 py-10">
          {/* Centered heading + signup */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
              Login
            </h2>
            <p className="font-semibold text-gray-500 text-sm sm:text-base">
              New to KittyCare?{' '}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate('/progress')}
              >
                Sign up for free
              </span>
            </p>
          </div>

          {/* Login Form */}
          <div className="flex flex-col items-center">
            <LoginForm
              error={error}
              isLoading={isLoading}
              onSubmit={handleLogin}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
