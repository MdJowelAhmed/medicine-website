import React, { useContext } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SocialLogin = () => {
  const { signInWithGoogle, signInWithGitHub } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (result?.user) {
        Swal.fire('Google Login Success!', '', 'success');
        navigate('/');
      }
    } catch (err) {
      Swal.fire('Google Login Failed', err.message, 'error');
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const result = await signInWithGitHub();
      if (result?.user) {
        Swal.fire('GitHub Login Success!', '', 'success');
        navigate('/');
      }
    } catch (err) {
      Swal.fire('GitHub Login Failed', err.message, 'error');
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <button onClick={handleGoogleLogin} className="btn btn-outline btn-primary w-full flex items-center gap-2">
        <FaGoogle />
        Continue with Google
      </button>

      <button onClick={handleGitHubLogin} className="btn btn-outline w-full flex items-center gap-2">
        <FaGithub />
        Continue with GitHub
      </button>
    </div>
  );
};

export default SocialLogin;
