import React from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const SocialLogin = () => {
  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Connect logic later
  };

  const handleGitHubLogin = () => {
    console.log('GitHub login clicked');
    // Connect logic later
  };

  return (
    <div className="mt-4 space-y-2">
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline btn-primary w-full flex items-center gap-2"
      >
        <FaGoogle />
        Continue with Google
      </button>

      <button
        onClick={handleGitHubLogin}
        className="btn btn-outline w-full flex items-center gap-2"
      >
        <FaGithub />
        Continue with GitHub
      </button>
    </div>
  );
};

export default SocialLogin;
