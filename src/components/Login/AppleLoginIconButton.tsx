import React from 'react';

interface AppleLoginIconButtonProps {
  className?: string;
}

const AppleLoginIconButton: React.FC<AppleLoginIconButtonProps> = ({
  className = '',
}) => {
  const handleAppleLogin = () => {
    console.log('Apple login clicked (placeholder)');
    // TODO: Implement actual Apple login logic here
  };

  return (
    <button
      onClick={handleAppleLogin}
      className={`
        w-12 h-12 
        flex items-center justify-center
        border border-gray-300 rounded-full
        hover:bg-gray-50 transition-colors
        ${className}
      `}
      aria-label="Sign in with Apple"
    >
      <img
        src="/assets/apple.png"
        alt="Apple"
        className="w-6 h-6 object-contain"
      />
    </button>
  );
};

export default AppleLoginIconButton;
