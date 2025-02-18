import { FC, useEffect } from 'react';
import { useGoogleLogin, TokenResponse } from '@react-oauth/google';

interface GoogleLoginIconButtonProps {
  onSuccess: (tokenResponse: TokenResponse) => void;
  onError: () => void;
}

const GoogleLoginIconButton: FC<GoogleLoginIconButtonProps> = ({ onSuccess, onError }) => {
  const login = useGoogleLogin({ onSuccess, onError });

  // Log the login function (for debugging)
  useEffect(() => {
    console.log('Google login function:', login);
  }, [login]);

  return (
    <button
      onClick={() => login()} // wrap login() in an arrow function to ignore the click event
      className="
        w-12 h-12 
        flex items-center justify-center
        border border-gray-300 rounded-full
        hover:bg-gray-50 transition-colors
      "
      aria-label="Sign in with Google"
    >
      <img
        src="/assets/png/google.png"
        alt="Google"
        className="w-6 h-6 object-contain"
      />
    </button>
  );
};

export default GoogleLoginIconButton;
